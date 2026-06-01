import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MoreHorizontal, Eye, Pencil, Archive } from 'lucide-react'
import { useClickOutside } from '@/hooks/useClickOutside'
import { cn } from '@/lib/utils'

export default function ClientActionsMenu({ client, onArchive }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const navigate = useNavigate()

  useClickOutside(ref, () => setOpen(false))

  const close = () => setOpen(false)

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors',
          'hover:bg-accent hover:text-foreground',
          open && 'bg-accent text-foreground'
        )}
        aria-label="Client actions"
      >
        <MoreHorizontal className="h-4 w-4" />
      </button>

      {open && (
        <div className="absolute right-0 z-30 mt-1 w-44 overflow-hidden rounded-xl border border-border bg-background py-1 shadow-lg ring-1 ring-black/5 dark:ring-white/10">
          <button
            onClick={() => { close(); navigate(`/clients/${client.id}`) }}
            className="flex w-full items-center gap-2.5 px-3.5 py-2 text-sm text-foreground hover:bg-accent"
          >
            <Eye className="h-4 w-4 text-muted-foreground" />
            View details
          </button>
          <button
            onClick={() => { close(); navigate(`/clients/${client.id}`) }}
            className="flex w-full items-center gap-2.5 px-3.5 py-2 text-sm text-foreground hover:bg-accent"
          >
            <Pencil className="h-4 w-4 text-muted-foreground" />
            Edit client
          </button>
          <div className="my-1 border-t border-border" />
          <button
            onClick={() => { close(); onArchive(client) }}
            className="flex w-full items-center gap-2.5 px-3.5 py-2 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30"
          >
            <Archive className="h-4 w-4" />
            Archive
          </button>
        </div>
      )}
    </div>
  )
}
