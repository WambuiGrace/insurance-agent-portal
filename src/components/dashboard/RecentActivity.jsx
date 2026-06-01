import { cn } from '@/lib/utils'

function ActivitySkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex animate-pulse items-start gap-3">
          <div className="h-9 w-9 flex-shrink-0 rounded-xl bg-muted" />
          <div className="flex-1 space-y-1.5 pt-1">
            <div className="h-3.5 w-3/4 rounded bg-muted" />
            <div className="h-3 w-1/2 rounded bg-muted" />
          </div>
          <div className="h-3 w-16 rounded bg-muted" />
        </div>
      ))}
    </div>
  )
}

export default function RecentActivity({ activities, loading }) {
  return (
    <div className="rounded-xl border border-border bg-background p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Recent Activity</h3>
          <p className="mt-0.5 text-xs text-muted-foreground">Latest actions across your portfolio</p>
        </div>
        <button className="text-xs font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
          View all
        </button>
      </div>

      {loading ? (
        <ActivitySkeleton />
      ) : (
        <div className="relative space-y-1">
          {/* Vertical connector line */}
          <div className="absolute left-[17px] top-5 h-[calc(100%-40px)] w-px bg-border" aria-hidden="true" />

          {activities?.map((activity, idx) => {
            const Icon = activity.icon
            return (
              <div
                key={activity.id}
                className={cn(
                  'group relative flex items-start gap-3 rounded-lg p-2 transition-colors hover:bg-muted/50',
                  idx === activities.length - 1 && 'mb-0'
                )}
              >
                {/* Icon */}
                <div
                  className={cn(
                    'relative z-10 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl text-sm',
                    activity.color
                  )}
                >
                  <Icon className="h-4 w-4" />
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground leading-snug">
                    {activity.title}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">
                    {activity.subtitle}
                  </p>
                </div>

                {/* Timestamp */}
                <span className="flex-shrink-0 text-xs text-muted-foreground/70 pt-0.5">
                  {activity.time}
                </span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
