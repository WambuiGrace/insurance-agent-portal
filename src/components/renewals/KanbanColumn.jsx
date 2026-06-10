import { useDroppable } from '@dnd-kit/core'
import { cn } from '@/lib/utils'
import RenewalCard from './RenewalCard'

const COLUMN_CONFIG = {
  Upcoming:  { dot: 'bg-slate-400',   header: 'text-slate-700 dark:text-slate-300',   badge: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'   },
  Contacted: { dot: 'bg-blue-400',    header: 'text-blue-700 dark:text-blue-300',     badge: 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'    },
  Reviewing: { dot: 'bg-amber-400',   header: 'text-amber-700 dark:text-amber-300',   badge: 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300'  },
  Approved:  { dot: 'bg-emerald-400', header: 'text-emerald-700 dark:text-emerald-300', badge: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300' },
  Renewed:   { dot: 'bg-green-500',   header: 'text-green-700 dark:text-green-300',   badge: 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300'  },
}

export default function KanbanColumn({ id, cards }) {
  const { setNodeRef, isOver } = useDroppable({ id })
  const cfg = COLUMN_CONFIG[id]

  return (
    <div className="flex w-72 flex-shrink-0 flex-col">
      {/* Column header */}
      <div className="mb-3 flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <div className={cn('h-2 w-2 rounded-full', cfg.dot)} />
          <span className={cn('text-sm font-semibold', cfg.header)}>{id}</span>
        </div>
        <span className={cn('rounded-full px-2 py-0.5 text-xs font-semibold tabular-nums', cfg.badge)}>
          {cards.length}
        </span>
      </div>

      {/* Drop zone */}
      <div
        ref={setNodeRef}
        className={cn(
          'flex flex-1 flex-col gap-2.5 rounded-xl border-2 border-dashed p-2 transition-colors min-h-[120px]',
          isOver
            ? 'border-primary bg-primary/5'
            : 'border-border bg-muted/30'
        )}
      >
        {cards.length === 0 && !isOver && (
          <div className="flex flex-1 items-center justify-center py-6">
            <p className="text-xs text-muted-foreground/60">Drop cards here</p>
          </div>
        )}
        {cards.map((card) => (
          <RenewalCard key={card.id} card={card} />
        ))}
      </div>
    </div>
  )
}
