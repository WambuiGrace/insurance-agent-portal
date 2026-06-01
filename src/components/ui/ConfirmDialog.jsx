import { useEffect } from 'react'
import { AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = 'Confirm',
  loading = false,
  onConfirm,
  onCancel,
}) {
  useEffect(() => {
    if (!open) return
    const handler = (e) => { if (e.key === 'Escape') onCancel() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open, onCancel])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onCancel}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="relative w-full max-w-sm rounded-2xl border border-border bg-background p-6 shadow-xl">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-950/50">
          <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
        </div>

        <h3 className="text-base font-semibold text-foreground">{title}</h3>
        <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{message}</p>

        <div className="mt-6 flex gap-3">
          <Button variant="outline" className="flex-1" onClick={onCancel} disabled={loading}>
            Cancel
          </Button>
          <Button
            className="flex-1 bg-red-600 text-white hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? 'Archiving…' : confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  )
}
