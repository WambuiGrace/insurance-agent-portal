import { RefreshCw } from 'lucide-react'

export default function RenewalsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Renewals</h1>
        <p className="text-sm text-muted-foreground">Track and manage policy renewals</p>
      </div>

      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-background py-24 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-50 dark:bg-violet-950/40">
          <RefreshCw className="h-8 w-8 text-violet-600 dark:text-violet-400" />
        </div>
        <h2 className="text-lg font-semibold text-foreground">Renewals Module</h2>
        <p className="mt-1.5 max-w-sm text-sm text-muted-foreground leading-relaxed">
          Kanban board with drag-and-drop renewal pipeline — Upcoming, Contacted, Reviewing, Approved, Renewed.
        </p>
        <div className="mt-4 rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700 dark:bg-violet-900/50 dark:text-violet-300">
          Module in progress
        </div>
      </div>
    </div>
  )
}
