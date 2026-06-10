import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Bell, RefreshCw, MessageSquare, UserPlus, AlertTriangle, Banknote,
  Pin, CheckCheck, X, BellOff,
} from 'lucide-react'
import {
  markRead, markAllRead, togglePin, dismiss, setFilter,
} from '@/store/slices/notificationsSlice'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

// ─── Constants ─────────────────────────────────────────────────────────────────

const NOTIFICATION_TYPES = [
  'Renewal Reminder',
  'Client Inquiry',
  'New Lead',
  'Policy Expiry',
  'Commission Payment',
]

const TYPE_CONFIG = {
  'Renewal Reminder':   { Icon: RefreshCw,    bg: 'bg-blue-100 dark:bg-blue-900/50',    color: 'text-blue-600 dark:text-blue-400',    badge: 'bg-blue-50 text-blue-700 ring-blue-200 dark:bg-blue-950/40 dark:text-blue-400 dark:ring-blue-800'    },
  'Client Inquiry':     { Icon: MessageSquare, bg: 'bg-violet-100 dark:bg-violet-900/50', color: 'text-violet-600 dark:text-violet-400', badge: 'bg-violet-50 text-violet-700 ring-violet-200 dark:bg-violet-950/40 dark:text-violet-400 dark:ring-violet-800' },
  'New Lead':           { Icon: UserPlus,      bg: 'bg-green-100 dark:bg-green-900/50',  color: 'text-green-600 dark:text-green-400',  badge: 'bg-green-50 text-green-700 ring-green-200 dark:bg-green-950/40 dark:text-green-400 dark:ring-green-800'  },
  'Policy Expiry':      { Icon: AlertTriangle, bg: 'bg-red-100 dark:bg-red-900/50',      color: 'text-red-600 dark:text-red-400',      badge: 'bg-red-50 text-red-700 ring-red-200 dark:bg-red-950/40 dark:text-red-400 dark:ring-red-800'              },
  'Commission Payment': { Icon: Banknote,      bg: 'bg-emerald-100 dark:bg-emerald-900/50', color: 'text-emerald-600 dark:text-emerald-400', badge: 'bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:ring-emerald-800' },
}

// ─── Helpers ───────────────────────────────────────────────────────────────────

function relativeTime(iso) {
  const now = new Date('2026-06-02T10:30:00Z')
  const diff = now - new Date(iso)
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'Just now'
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days === 1) return 'Yesterday'
  if (days < 7) return `${days}d ago`
  return new Date(iso).toLocaleDateString('en-KE', { day: '2-digit', month: 'short' })
}

// ─── Notification Item ──────────────────────────────────────────────────────────

function NotificationItem({ notification }) {
  const dispatch = useDispatch()
  const cfg = TYPE_CONFIG[notification.type]
  const { Icon } = cfg

  return (
    <div
      className={cn(
        'group relative flex items-start gap-3 border-b border-border px-5 py-4 last:border-0',
        'transition-colors hover:bg-muted/30',
        !notification.read && 'bg-blue-50/40 dark:bg-blue-950/10',
        notification.pinned && !notification.read && 'bg-amber-50/40 dark:bg-amber-950/10',
        notification.pinned && notification.read && 'bg-amber-50/20 dark:bg-amber-950/5',
      )}
    >
      {/* Unread dot */}
      {!notification.read && (
        <div className="absolute left-1.5 top-6 h-2 w-2 rounded-full bg-blue-500" />
      )}

      {/* Type icon */}
      <div className={cn('mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full', cfg.bg)}>
        <Icon className={cn('h-[18px] w-[18px]', cfg.color)} />
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1 pr-20">
        <div className="flex items-start justify-between gap-3">
          <p className={cn('text-sm leading-snug', !notification.read ? 'font-semibold text-foreground' : 'font-medium text-foreground/80')}>
            {notification.title}
          </p>
          <span className="flex-shrink-0 text-xs text-muted-foreground">
            {relativeTime(notification.timestamp)}
          </span>
        </div>

        <p className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
          {notification.message}
        </p>

        <div className="mt-2 flex items-center gap-2">
          <span className={cn('inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium ring-1 ring-inset', cfg.badge)}>
            {notification.type}
          </span>
          {notification.clientName && (
            <span className="text-[10px] text-muted-foreground">· {notification.clientName}</span>
          )}
          {notification.policyNumber && (
            <span className="font-mono text-[10px] text-muted-foreground">{notification.policyNumber}</span>
          )}
        </div>
      </div>

      {/* Hover action buttons */}
      <div className="absolute right-3 top-3.5 flex items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
        <button
          onClick={() => dispatch(togglePin(notification.id))}
          title={notification.pinned ? 'Unpin' : 'Pin'}
          className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <Pin className={cn('h-3.5 w-3.5', notification.pinned && 'fill-current text-amber-500')} />
        </button>
        {!notification.read && (
          <button
            onClick={() => dispatch(markRead(notification.id))}
            title="Mark as read"
            className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-blue-600"
          >
            <CheckCheck className="h-3.5 w-3.5" />
          </button>
        )}
        <button
          onClick={() => dispatch(dismiss(notification.id))}
          title="Dismiss"
          className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-red-500"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  )
}

// ─── Section divider ───────────────────────────────────────────────────────────

function PinnedHeader() {
  return (
    <div className="flex items-center gap-2 border-b border-border bg-amber-50/60 px-5 py-2 dark:bg-amber-950/20">
      <Pin className="h-3 w-3 fill-current text-amber-500" />
      <span className="text-[10px] font-bold uppercase tracking-widest text-amber-700 dark:text-amber-400">
        Pinned
      </span>
    </div>
  )
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function NotificationsPage() {
  const dispatch = useDispatch()
  const { notifications, filter } = useSelector((state) => state.notifications)

  const visible = useMemo(
    () => notifications.filter((n) => !n.dismissed),
    [notifications]
  )

  const unreadCount = useMemo(
    () => visible.filter((n) => !n.read).length,
    [visible]
  )

  const filtered = useMemo(() => {
    const base = filter === 'All' ? visible : visible.filter((n) => n.type === filter)
    return [...base].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
  }, [visible, filter])

  const pinned  = useMemo(() => filtered.filter((n) => n.pinned),  [filtered])
  const regular = useMemo(() => filtered.filter((n) => !n.pinned), [filtered])

  const countFor = (type) =>
    type === 'All'
      ? visible.length
      : visible.filter((n) => n.type === type).length

  return (
    <div className="mx-auto max-w-3xl space-y-6">

      {/* ── Page Header ───────────────────────────────────────── */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Notifications</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Stay on top of renewals, leads, and updates
          </p>
        </div>
        {unreadCount > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => dispatch(markAllRead())}
            className="w-full sm:w-auto"
          >
            <CheckCheck className="h-4 w-4" />
            Mark All as Read
          </Button>
        )}
      </div>

      {/* ── Main Panel ────────────────────────────────────────── */}
      <div className="overflow-hidden rounded-xl border border-border bg-background shadow-sm">

        {/* Panel Header */}
        <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
          <div className="flex items-center gap-2.5">
            <Bell className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-semibold text-foreground">
              {filter === 'All' ? 'All Notifications' : filter}
            </span>
            {unreadCount > 0 && (
              <span className="rounded-full bg-blue-500 px-2 py-0.5 text-[11px] font-bold text-white">
                {unreadCount} unread
              </span>
            )}
          </div>
          <span className="text-xs text-muted-foreground">{filtered.length} shown</span>
        </div>

        {/* Filter Tabs */}
        <div className="flex overflow-x-auto border-b border-border">
          {['All', ...NOTIFICATION_TYPES].map((type) => {
            const count = countFor(type)
            const active = filter === type
            return (
              <button
                key={type}
                onClick={() => dispatch(setFilter(type))}
                className={cn(
                  'flex flex-shrink-0 items-center gap-1.5 whitespace-nowrap border-b-2 px-4 py-3 text-xs font-medium transition-colors',
                  active
                    ? 'border-primary text-foreground'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                )}
              >
                {type}
                <span className={cn(
                  'rounded-full px-1.5 py-0.5 text-[10px] font-semibold',
                  active
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                )}>
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        {/* Pinned Section */}
        {pinned.length > 0 && (
          <>
            <PinnedHeader />
            {pinned.map((n) => <NotificationItem key={n.id} notification={n} />)}
            {regular.length > 0 && <div className="border-t-4 border-border/50" />}
          </>
        )}

        {/* Regular Notifications */}
        {regular.map((n) => <NotificationItem key={n.id} notification={n} />)}

        {/* Empty State */}
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-muted">
              <BellOff className="h-6 w-6 text-muted-foreground/50" />
            </div>
            <p className="text-sm font-semibold text-foreground">No notifications</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {filter === 'All'
                ? "You're all caught up! Nothing to see here."
                : `No ${filter} notifications at the moment.`}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
