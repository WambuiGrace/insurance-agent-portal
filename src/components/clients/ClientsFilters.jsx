import { Search, SlidersHorizontal, X } from 'lucide-react'
import { PLAN_TYPES, CLIENT_STATUSES } from '@/data/clientsData'
import { cn } from '@/lib/utils'

export default function ClientsFilters({
  search,
  onSearchChange,
  status,
  onStatusChange,
  planType,
  onPlanTypeChange,
  total,
  loading,
}) {
  const hasActiveFilters = search || status || planType

  const clearAll = () => {
    onSearchChange('')
    onStatusChange('')
    onPlanTypeChange('')
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      {/* Search */}
      <div className="relative flex-1 min-w-0 max-w-sm">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by name, policy or email…"
          className={cn(
            'h-9 w-full rounded-lg border border-input bg-background pl-9 pr-4 text-sm',
            'text-foreground placeholder:text-muted-foreground',
            'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 focus:ring-offset-background'
          )}
        />
        {search && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            aria-label="Clear search"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* Filters row */}
      <div className="flex flex-wrap items-center gap-2">
        <SlidersHorizontal className="h-4 w-4 flex-shrink-0 text-muted-foreground" />

        {/* Status filter */}
        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          className={cn(
            'h-9 rounded-lg border border-input bg-background px-3 text-sm text-foreground',
            'focus:outline-none focus:ring-2 focus:ring-ring',
            status && 'border-blue-400 ring-1 ring-blue-200 dark:ring-blue-800'
          )}
        >
          <option value="">All Statuses</option>
          {CLIENT_STATUSES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        {/* Plan type filter */}
        <select
          value={planType}
          onChange={(e) => onPlanTypeChange(e.target.value)}
          className={cn(
            'h-9 rounded-lg border border-input bg-background px-3 text-sm text-foreground',
            'focus:outline-none focus:ring-2 focus:ring-ring',
            planType && 'border-blue-400 ring-1 ring-blue-200 dark:ring-blue-800'
          )}
        >
          <option value="">All Plan Types</option>
          {PLAN_TYPES.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>

        {/* Clear filters */}
        {hasActiveFilters && (
          <button
            onClick={clearAll}
            className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X className="h-3.5 w-3.5" />
            Clear
          </button>
        )}

        {/* Results count */}
        <span className="ml-auto text-xs text-muted-foreground whitespace-nowrap">
          {loading ? '…' : `${total} client${total !== 1 ? 's' : ''}`}
        </span>
      </div>
    </div>
  )
}
