import { Users } from 'lucide-react'

export default function ClientsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Clients</h1>
        <p className="text-sm text-muted-foreground">Manage your client portfolio</p>
      </div>

      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-background py-24 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 dark:bg-emerald-950/40">
          <Users className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
        </div>
        <h2 className="text-lg font-semibold text-foreground">Clients Module</h2>
        <p className="mt-1.5 max-w-sm text-sm text-muted-foreground leading-relaxed">
          Full client management with search, filters, pagination, and detailed client profiles coming soon.
        </p>
        <div className="mt-4 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300">
          Module in progress
        </div>
      </div>
    </div>
  )
}
