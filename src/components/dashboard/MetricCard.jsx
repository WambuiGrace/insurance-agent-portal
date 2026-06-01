import { TrendingUp, TrendingDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatKSh, formatNumber } from '@/utils/formatters'

function MetricCardSkeleton() {
  return (
    <div className="animate-pulse rounded-xl border border-border bg-background p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="h-10 w-10 rounded-xl bg-muted" />
        <div className="h-4 w-16 rounded-full bg-muted" />
      </div>
      <div className="mt-4 h-8 w-28 rounded-md bg-muted" />
      <div className="mt-2 h-4 w-36 rounded-md bg-muted" />
    </div>
  )
}

export default function MetricCard({ metric, icon: Icon, color, isCurrency, loading }) {
  if (loading) return <MetricCardSkeleton />

  const { value, change, label } = metric
  const isPositive = change >= 0
  const displayValue = isCurrency
    ? formatKSh(value)
    : formatNumber(value)

  return (
    <div className="rounded-xl border border-border bg-background p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-2">
        {/* Icon */}
        <div className={cn('flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl', color.bg)}>
          <Icon className={cn('h-5 w-5', color.icon)} />
        </div>

        {/* Trend badge */}
        <span
          className={cn(
            'flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold',
            isPositive
              ? 'bg-green-50 text-green-700 dark:bg-green-950/50 dark:text-green-400'
              : 'bg-red-50 text-red-600 dark:bg-red-950/50 dark:text-red-400'
          )}
        >
          {isPositive ? (
            <TrendingUp className="h-3 w-3" />
          ) : (
            <TrendingDown className="h-3 w-3" />
          )}
          {Math.abs(change)}%
        </span>
      </div>

      <p className="mt-4 text-2xl font-bold tracking-tight text-foreground">
        {displayValue}
      </p>
      <p className="mt-1 text-sm text-muted-foreground">{label}</p>

      <p className="mt-2 text-xs text-muted-foreground/70">
        {isPositive ? '▲' : '▼'} vs last month
      </p>
    </div>
  )
}
