import { LayoutDashboard } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

export default function DashboardPage() {
  const { user } = useAuth()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Welcome back, {user?.name} — here's your overview
        </p>
      </div>

      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-background py-24 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-950/40">
          <LayoutDashboard className="h-8 w-8 text-blue-600 dark:text-blue-400" />
        </div>
        <h2 className="text-lg font-semibold text-foreground">Dashboard Module</h2>
        <p className="mt-1.5 max-w-sm text-sm text-muted-foreground leading-relaxed">
          KPI cards, charts, recent activity feed, and quick actions will be built in the next module.
        </p>
        <div className="mt-4 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">
          Up next
        </div>
      </div>
    </div>
  )
}
