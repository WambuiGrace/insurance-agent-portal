import { Bell } from 'lucide-react'

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Notifications</h1>
        <p className="text-sm text-muted-foreground">Stay on top of renewals, leads, and updates</p>
      </div>

      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-background py-24 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 dark:bg-red-950/40">
          <Bell className="h-8 w-8 text-red-600 dark:text-red-400" />
        </div>
        <h2 className="text-lg font-semibold text-foreground">Notifications Module</h2>
        <p className="mt-1.5 max-w-sm text-sm text-muted-foreground leading-relaxed">
          Renewal reminders, client inquiries, policy expiry alerts, and commission payment notifications.
        </p>
        <div className="mt-4 rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700 dark:bg-red-900/50 dark:text-red-300">
          Module in progress
        </div>
      </div>
    </div>
  )
}
