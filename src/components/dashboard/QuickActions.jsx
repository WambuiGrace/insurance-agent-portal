import { useNavigate } from 'react-router-dom'
import { UserPlus, CalendarPlus, RefreshCw, ArrowRight } from 'lucide-react'
import { ROUTES } from '@/constants'
import { cn } from '@/lib/utils'

const ACTIONS = [
  {
    icon: UserPlus,
    label: 'Add Client',
    description: 'Register a new client to your portfolio',
    href: ROUTES.CLIENTS,
    color: {
      bg: 'bg-blue-50 dark:bg-blue-950/40',
      icon: 'text-blue-600 dark:text-blue-400',
      hover: 'hover:border-blue-200 dark:hover:border-blue-800',
      arrow: 'text-blue-500',
    },
  },
  {
    icon: CalendarPlus,
    label: 'Schedule Follow-up',
    description: 'Book a call or meeting with a client',
    href: ROUTES.CLIENTS,
    color: {
      bg: 'bg-violet-50 dark:bg-violet-950/40',
      icon: 'text-violet-600 dark:text-violet-400',
      hover: 'hover:border-violet-200 dark:hover:border-violet-800',
      arrow: 'text-violet-500',
    },
  },
  {
    icon: RefreshCw,
    label: 'Create Renewal Task',
    description: 'Start a renewal workflow for a policy',
    href: ROUTES.RENEWALS,
    color: {
      bg: 'bg-emerald-50 dark:bg-emerald-950/40',
      icon: 'text-emerald-600 dark:text-emerald-400',
      hover: 'hover:border-emerald-200 dark:hover:border-emerald-800',
      arrow: 'text-emerald-500',
    },
  },
]

export default function QuickActions() {
  const navigate = useNavigate()

  return (
    <div className="rounded-xl border border-border bg-background p-5 shadow-sm">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-foreground">Quick Actions</h3>
        <p className="mt-0.5 text-xs text-muted-foreground">Common tasks to get things done fast</p>
      </div>

      <div className="space-y-2.5">
        {ACTIONS.map(({ icon: Icon, label, description, href, color }) => (
          <button
            key={label}
            onClick={() => navigate(href)}
            className={cn(
              'group flex w-full items-center gap-3 rounded-xl border border-border p-3.5',
              'transition-all duration-150 hover:shadow-sm',
              color.hover
            )}
          >
            {/* Icon */}
            <div
              className={cn(
                'flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl',
                color.bg
              )}
            >
              <Icon className={cn('h-5 w-5', color.icon)} />
            </div>

            {/* Text */}
            <div className="min-w-0 flex-1 text-left">
              <p className="text-sm font-semibold text-foreground">{label}</p>
              <p className="mt-0.5 text-xs text-muted-foreground leading-snug">{description}</p>
            </div>

            {/* Arrow */}
            <ArrowRight
              className={cn(
                'h-4 w-4 flex-shrink-0 transition-transform group-hover:translate-x-0.5',
                color.arrow
              )}
            />
          </button>
        ))}
      </div>
    </div>
  )
}
