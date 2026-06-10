import { useDraggable } from '@dnd-kit/core'
import { GripVertical, Calendar, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatKSh } from '@/utils/formatters'

const PLAN_COLORS = {
  Medical:  'bg-blue-50 text-blue-700 ring-blue-200 dark:bg-blue-950/40 dark:text-blue-400 dark:ring-blue-800',
  Life:     'bg-violet-50 text-violet-700 ring-violet-200 dark:bg-violet-950/40 dark:text-violet-400 dark:ring-violet-800',
  Motor:    'bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:ring-amber-800',
  Property: 'bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:ring-emerald-800',
}

function getPriority(dueDate) {
  const diff = Math.ceil((new Date(dueDate) - new Date('2026-06-02')) / 86400000)
  if (diff < 0)  return { label: 'Overdue',   cls: 'bg-red-50 text-red-700 ring-red-200 dark:bg-red-950/40 dark:text-red-400 dark:ring-red-800',      border: 'border-l-red-400' }
  if (diff <= 7) return { label: 'This Week',  cls: 'bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:ring-amber-800', border: 'border-l-amber-400' }
  if (diff <= 30) return { label: 'This Month', cls: 'bg-blue-50 text-blue-700 ring-blue-200 dark:bg-blue-950/40 dark:text-blue-400 dark:ring-blue-800',   border: 'border-l-blue-300' }
  return { label: null, cls: null, border: 'border-l-border' }
}

const fmtDue = (d) =>
  new Date(d).toLocaleDateString('en-KE', { day: '2-digit', month: 'short', year: 'numeric' })

function agentInitials(name) {
  return name.split(' ').map((n) => n[0]).join('').toUpperCase()
}

export default function RenewalCard({ card, isDragOverlay }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id: card.id })
  const priority = getPriority(card.dueDate)

  return (
    <div
      ref={isDragOverlay ? undefined : setNodeRef}
      className={cn(
        'group relative rounded-lg border border-border bg-background shadow-sm',
        'border-l-4 transition-shadow',
        priority.border,
        isDragging && !isDragOverlay && 'opacity-40 shadow-none',
        isDragOverlay && 'rotate-1 shadow-2xl ring-2 ring-primary/30',
        !isDragging && !isDragOverlay && 'hover:shadow-md'
      )}
    >
      {/* Grip handle */}
      <div
        {...(isDragOverlay ? {} : { ...listeners, ...attributes })}
        className="absolute left-0 top-0 flex h-full w-6 cursor-grab items-center justify-center rounded-l-lg opacity-0 transition-opacity group-hover:opacity-100 active:cursor-grabbing"
        aria-label="Drag to reorder"
      >
        <GripVertical className="h-3.5 w-3.5 text-muted-foreground" />
      </div>

      <div className="p-3.5 pl-5">
        {/* Top row: plan badge + priority */}
        <div className="mb-2 flex items-center justify-between gap-2">
          <span className={cn('inline-flex rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset', PLAN_COLORS[card.planType])}>
            {card.planType}
          </span>
          {priority.label && (
            <span className={cn('inline-flex rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset', priority.cls)}>
              {priority.label}
            </span>
          )}
        </div>

        {/* Client name + policy */}
        <p className="truncate text-sm font-semibold text-foreground">{card.clientName}</p>
        <p className="mt-0.5 font-mono text-xs text-muted-foreground">{card.policyNumber}</p>

        {/* Divider */}
        <div className="my-2.5 border-t border-border" />

        {/* Amount + Due date */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm font-bold text-foreground">{formatKSh(card.renewalAmount)}</span>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3 flex-shrink-0" />
            <span className="whitespace-nowrap">{fmtDue(card.dueDate)}</span>
          </div>
        </div>

        {/* Agent */}
        <div className="mt-2 flex items-center gap-1.5">
          <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-[9px] font-bold text-primary">
            {agentInitials(card.assignedAgent)}
          </div>
          <span className="truncate text-xs text-muted-foreground">{card.assignedAgent}</span>
        </div>
      </div>
    </div>
  )
}
