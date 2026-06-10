import { Trophy, Medal, ChevronUp, ChevronDown, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatKSh } from '@/utils/formatters'

const RANK_CONFIG = {
  1: { bg: 'bg-amber-50 dark:bg-amber-950/40',   ring: 'ring-amber-300 dark:ring-amber-700',   text: 'text-amber-600 dark:text-amber-400' },
  2: { bg: 'bg-slate-50 dark:bg-slate-900/50',   ring: 'ring-slate-300 dark:ring-slate-600',   text: 'text-slate-500 dark:text-slate-400'  },
  3: { bg: 'bg-orange-50 dark:bg-orange-950/40', ring: 'ring-orange-300 dark:ring-orange-700', text: 'text-orange-500 dark:text-orange-400' },
}

function RankBadge({ rank }) {
  const cfg = RANK_CONFIG[rank]
  if (rank === 1) return (
    <div className={cn('flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ring-2', cfg.bg, cfg.ring)}>
      <Trophy className={cn('h-4 w-4', cfg.text)} />
    </div>
  )
  if (rank <= 3) return (
    <div className={cn('flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ring-2', cfg.bg, cfg.ring)}>
      <span className={cn('text-xs font-bold', cfg.text)}>#{rank}</span>
    </div>
  )
  return (
    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-muted">
      <span className="text-xs font-bold text-muted-foreground">#{rank}</span>
    </div>
  )
}

function RankChange({ change }) {
  if (change > 0) return (
    <span className="flex items-center gap-0.5 text-xs font-medium text-green-600 dark:text-green-400">
      <ChevronUp className="h-3.5 w-3.5" />{change}
    </span>
  )
  if (change < 0) return (
    <span className="flex items-center gap-0.5 text-xs font-medium text-red-500 dark:text-red-400">
      <ChevronDown className="h-3.5 w-3.5" />{Math.abs(change)}
    </span>
  )
  return <Minus className="h-3.5 w-3.5 text-muted-foreground/60" />
}

function SkeletonRow() {
  return (
    <tr className="border-b border-border last:border-0">
      {[32, 48, 64, 80, 56, 72, 88].map((w, i) => (
        <td key={i} className="px-4 py-3.5">
          <div className="h-4 animate-pulse rounded bg-muted" style={{ width: `${w}%` }} />
        </td>
      ))}
    </tr>
  )
}

export default function AgentLeaderboard({ agents, loading }) {
  const topScore = agents?.[0]?.score ?? 100

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            {['Rank', 'Agent', 'Clients', 'Policies Sold', 'Renewal Rate', 'Commission', 'Score'].map((h) => (
              <th key={h} className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <SkeletonRow key={i} />)
            : agents.map((agent) => (
                <tr
                  key={agent.rank}
                  className={cn(
                    'border-b border-border last:border-0 transition-colors',
                    agent.rank === 1 && 'bg-amber-50/50 dark:bg-amber-950/10'
                  )}
                >
                  {/* Rank */}
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <RankBadge rank={agent.rank} />
                      <RankChange change={agent.rankChange} />
                    </div>
                  </td>

                  {/* Agent */}
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                        {agent.initials}
                      </div>
                      <span className="font-medium text-foreground whitespace-nowrap">{agent.name}</span>
                    </div>
                  </td>

                  {/* Clients */}
                  <td className="px-4 py-3.5 tabular-nums text-foreground">{agent.clients}</td>

                  {/* Policies */}
                  <td className="px-4 py-3.5 tabular-nums text-foreground">{agent.policies}</td>

                  {/* Renewal Rate */}
                  <td className="px-4 py-3.5 tabular-nums text-foreground">{agent.renewalRate}%</td>

                  {/* Commission */}
                  <td className="px-4 py-3.5 font-medium tabular-nums text-foreground">
                    {formatKSh(agent.commission)}
                  </td>

                  {/* Score + bar */}
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <span className="w-7 text-right text-xs font-bold tabular-nums text-foreground">
                        {agent.score}
                      </span>
                      <div className="h-2 w-24 overflow-hidden rounded-full bg-muted">
                        <div
                          className={cn(
                            'h-full rounded-full transition-all duration-700',
                            agent.rank === 1 ? 'bg-amber-500' :
                            agent.rank === 2 ? 'bg-slate-400' :
                            agent.rank === 3 ? 'bg-orange-400' : 'bg-primary/60'
                          )}
                          style={{ width: `${(agent.score / topScore) * 100}%` }}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              ))
          }
        </tbody>
      </table>
    </div>
  )
}
