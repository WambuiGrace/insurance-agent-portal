import { Settings } from 'lucide-react'

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground">Manage your profile and preferences</p>
      </div>

      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-background py-24 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-50 dark:bg-slate-800/60">
          <Settings className="h-8 w-8 text-slate-600 dark:text-slate-400" />
        </div>
        <h2 className="text-lg font-semibold text-foreground">Settings Module</h2>
        <p className="mt-1.5 max-w-sm text-sm text-muted-foreground leading-relaxed">
          Profile management, dark mode preferences, notification settings, and dashboard customisation.
        </p>
        <div className="mt-4 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
          Module in progress
        </div>
      </div>
    </div>
  )
}
