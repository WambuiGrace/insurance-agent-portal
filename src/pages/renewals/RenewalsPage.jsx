import { useState, useMemo } from 'react'
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  closestCenter,
} from '@dnd-kit/core'
import { Search, SlidersHorizontal, X, RefreshCw } from 'lucide-react'
import KanbanColumn from '@/components/renewals/KanbanColumn'
import RenewalCard from '@/components/renewals/RenewalCard'
import { useRenewalsBoard, useMoveCard } from '@/services/queries/renewalsQueries'
import { RENEWAL_STATUSES, RENEWAL_PLAN_TYPES, RENEWAL_AGENTS } from '@/data/renewalsData'
import { cn } from '@/lib/utils'

// ─── Filter bar ───────────────────────────────────────────────────────────────

function FiltersBar({ search, onSearch, planType, onPlanType, agent, onAgent, onClear, total }) {
  const hasFilters = search || planType || agent
  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* Search */}
      <div className="relative min-w-0 w-56">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search name or policy…"
          className="h-9 w-full rounded-lg border border-input bg-background pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
        {search && (
          <button
            onClick={() => onSearch('')}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      <SlidersHorizontal className="h-4 w-4 flex-shrink-0 text-muted-foreground" />

      {/* Plan type */}
      <select
        value={planType}
        onChange={(e) => onPlanType(e.target.value)}
        className={cn(
          'h-9 rounded-lg border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring',
          planType && 'border-blue-400 ring-1 ring-blue-200 dark:ring-blue-800'
        )}
      >
        <option value="">All Plan Types</option>
        {RENEWAL_PLAN_TYPES.map((p) => <option key={p} value={p}>{p}</option>)}
      </select>

      {/* Agent */}
      <select
        value={agent}
        onChange={(e) => onAgent(e.target.value)}
        className={cn(
          'h-9 rounded-lg border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring',
          agent && 'border-blue-400 ring-1 ring-blue-200 dark:ring-blue-800'
        )}
      >
        <option value="">All Agents</option>
        {RENEWAL_AGENTS.map((a) => <option key={a} value={a}>{a}</option>)}
      </select>

      {hasFilters && (
        <button
          onClick={onClear}
          className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <X className="h-3.5 w-3.5" />
          Clear
        </button>
      )}

      <span className="ml-auto text-xs text-muted-foreground whitespace-nowrap">
        {total} card{total !== 1 ? 's' : ''}
      </span>
    </div>
  )
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function BoardSkeleton() {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {RENEWAL_STATUSES.map((col) => (
        <div key={col} className="w-72 flex-shrink-0">
          <div className="mb-3 flex items-center justify-between px-1">
            <div className="h-4 w-24 rounded bg-muted animate-pulse" />
            <div className="h-5 w-6 rounded-full bg-muted animate-pulse" />
          </div>
          <div className="rounded-xl border-2 border-dashed border-border bg-muted/30 p-2 space-y-2.5">
            {Array.from({ length: col === 'Upcoming' ? 4 : col === 'Contacted' ? 3 : 2 }).map((_, i) => (
              <div key={i} className="h-28 rounded-lg bg-muted animate-pulse" />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── Board ────────────────────────────────────────────────────────────────────

export default function RenewalsPage() {
  const [search, setSearch]     = useState('')
  const [planType, setPlanType] = useState('')
  const [agent, setAgent]       = useState('')
  const [activeId, setActiveId] = useState(null)

  const { data: allCards, isLoading } = useRenewalsBoard()
  const { mutate: moveCard } = useMoveCard()

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor)
  )

  // Filter cards
  const filteredCards = useMemo(() => {
    if (!allCards) return []
    const q = search.trim().toLowerCase()
    return allCards.filter((c) => {
      if (q && !c.clientName.toLowerCase().includes(q) && !c.policyNumber.toLowerCase().includes(q)) return false
      if (planType && c.planType !== planType) return false
      if (agent && c.assignedAgent !== agent) return false
      return true
    })
  }, [allCards, search, planType, agent])

  // Group filtered cards by column
  const columns = useMemo(() => {
    const grouped = Object.fromEntries(RENEWAL_STATUSES.map((s) => [s, []]))
    filteredCards.forEach((c) => {
      if (grouped[c.status]) grouped[c.status].push(c)
    })
    return grouped
  }, [filteredCards])

  const activeCard = activeId ? filteredCards.find((c) => c.id === activeId) ?? allCards?.find((c) => c.id === activeId) : null

  function handleDragStart({ active }) {
    setActiveId(active.id)
  }

  function handleDragEnd({ active, over }) {
    setActiveId(null)
    if (!over) return

    const targetStatus = over.id
    if (!RENEWAL_STATUSES.includes(targetStatus)) return

    const sourceCard = allCards?.find((c) => c.id === active.id)
    if (!sourceCard || sourceCard.status === targetStatus) return

    moveCard({ cardId: active.id, newStatus: targetStatus })
  }

  function handleDragCancel() {
    setActiveId(null)
  }

  const clearFilters = () => { setSearch(''); setPlanType(''); setAgent('') }

  // Summary counts from all cards (unfiltered)
  const totalByStatus = useMemo(() => {
    if (!allCards) return {}
    return Object.fromEntries(
      RENEWAL_STATUSES.map((s) => [s, allCards.filter((c) => c.status === s).length])
    )
  }, [allCards])

  return (
    <div className="flex h-full flex-col space-y-5">
      {/* ── Header ──────────────────────────────────────────────── */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Renewals</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Drag cards between columns to advance the renewal pipeline
          </p>
        </div>

        {/* Pipeline summary chips */}
        {!isLoading && (
          <div className="flex flex-wrap gap-2">
            {RENEWAL_STATUSES.map((s) => (
              <div key={s} className="rounded-lg border border-border bg-background px-3 py-1.5 text-center shadow-sm">
                <p className="text-lg font-bold leading-none text-foreground">{totalByStatus[s] ?? 0}</p>
                <p className="mt-0.5 text-[10px] text-muted-foreground">{s}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Filters ─────────────────────────────────────────────── */}
      <FiltersBar
        search={search}
        onSearch={setSearch}
        planType={planType}
        onPlanType={setPlanType}
        agent={agent}
        onAgent={setAgent}
        onClear={clearFilters}
        total={filteredCards.length}
      />

      {/* ── Board ───────────────────────────────────────────────── */}
      {isLoading ? (
        <BoardSkeleton />
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
        >
          <div className="flex gap-4 overflow-x-auto pb-6 pt-1">
            {RENEWAL_STATUSES.map((status) => (
              <KanbanColumn
                key={status}
                id={status}
                cards={columns[status]}
              />
            ))}
          </div>

          {/* Floating drag overlay */}
          <DragOverlay dropAnimation={{ duration: 200, easing: 'cubic-bezier(0.18,0.67,0.6,1.22)' }}>
            {activeCard ? <RenewalCard card={activeCard} isDragOverlay /> : null}
          </DragOverlay>
        </DndContext>
      )}
    </div>
  )
}
