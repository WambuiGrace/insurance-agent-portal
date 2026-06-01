import { cn } from '@/lib/utils'

function ChartSkeleton({ height }) {
  return (
    <div
      className="animate-pulse rounded-lg bg-muted"
      style={{ height: `${height}px` }}
    />
  )
}

export default function ChartCard({ title, subtitle, loading, children, height = 240, className }) {
  return (
    <div className={cn('rounded-xl border border-border bg-background p-5 shadow-sm', className)}>
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        {subtitle && (
          <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>
        )}
      </div>
      {loading ? <ChartSkeleton height={height} /> : children}
    </div>
  )
}
