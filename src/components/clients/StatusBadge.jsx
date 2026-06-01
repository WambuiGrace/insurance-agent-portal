import { cn } from '@/lib/utils'

const STATUS_STYLES = {
  'Active':        'bg-green-50 text-green-700 ring-green-200 dark:bg-green-950/40 dark:text-green-400 dark:ring-green-800',
  'Expiring Soon': 'bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:ring-amber-800',
  'Expired':       'bg-red-50 text-red-700 ring-red-200 dark:bg-red-950/40 dark:text-red-400 dark:ring-red-800',
  'Cancelled':     'bg-gray-100 text-gray-600 ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700',
}

const DOT_STYLES = {
  'Active':        'bg-green-500',
  'Expiring Soon': 'bg-amber-500',
  'Expired':       'bg-red-500',
  'Cancelled':     'bg-gray-400',
}

export default function StatusBadge({ status }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset',
        STATUS_STYLES[status] ?? STATUS_STYLES['Cancelled']
      )}
    >
      <span className={cn('h-1.5 w-1.5 rounded-full', DOT_STYLES[status] ?? DOT_STYLES['Cancelled'])} />
      {status}
    </span>
  )
}
