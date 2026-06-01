import { cn } from '@/lib/utils'

const PLAN_STYLES = {
  Medical:  'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400',
  Life:     'bg-violet-50 text-violet-700 dark:bg-violet-950/40 dark:text-violet-400',
  Motor:    'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400',
  Property: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400',
}

export default function PlanTypeBadge({ planType }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium',
        PLAN_STYLES[planType] ?? 'bg-gray-100 text-gray-600'
      )}
    >
      {planType}
    </span>
  )
}
