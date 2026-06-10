import { cn } from '@/lib/utils'

export default function SalesFunnelChart({ data }) {
  const max = data[0].count
  const conversionRate = Math.round((data[data.length - 1].count / max) * 100)

  return (
    <>
      <div className="mb-4 flex items-end gap-3">
        <p className="text-2xl font-bold text-foreground">{conversionRate}%</p>
        <p className="mb-0.5 text-xs text-muted-foreground">overall conversion</p>
      </div>

      <div className="space-y-2.5">
        {data.map((stage, i) => {
          const pct = Math.round((stage.count / max) * 100)
          const isLast = i === data.length - 1
          return (
            <div key={stage.stage}>
              <div className="mb-1 flex items-center justify-between">
                <span className="text-xs font-medium text-foreground">{stage.stage}</span>
                <div className="flex items-center gap-2 text-xs">
                  <span className="tabular-nums font-semibold text-foreground">{stage.count}</span>
                  <span className="text-muted-foreground">{pct}%</span>
                </div>
              </div>
              <div className="h-6 w-full overflow-hidden rounded-md bg-muted">
                <div
                  className={cn('h-full rounded-md transition-all duration-700')}
                  style={{ width: `${pct}%`, backgroundColor: stage.color }}
                />
              </div>
              {/* Drop-off indicator between stages */}
              {!isLast && (
                <p className="mt-1 text-right text-[10px] text-muted-foreground">
                  {data[i + 1] ? `−${stage.count - data[i + 1].count} drop-off` : ''}
                </p>
              )}
            </div>
          )
        })}
      </div>
    </>
  )
}
