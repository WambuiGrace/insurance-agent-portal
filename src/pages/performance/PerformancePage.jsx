import { TrendingUp } from 'lucide-react'

export default function PerformancePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Performance</h1>
        <p className="text-sm text-muted-foreground">Track metrics, commissions, and leaderboards</p>
      </div>

      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-background py-24 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 dark:bg-amber-950/40">
          <TrendingUp className="h-8 w-8 text-amber-600 dark:text-amber-400" />
        </div>
        <h2 className="text-lg font-semibold text-foreground">Performance Module</h2>
        <p className="mt-1.5 max-w-sm text-sm text-muted-foreground leading-relaxed">
          Agent analytics, commission charts, sales funnel, and top-performer leaderboard coming soon.
        </p>
        <div className="mt-4 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700 dark:bg-amber-900/50 dark:text-amber-300">
          Module in progress
        </div>
      </div>
    </div>
  )
}
