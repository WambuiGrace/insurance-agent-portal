import { useState } from 'react'
import { Users, FileText, RefreshCw, Target, Banknote } from 'lucide-react'
import PerformanceMetricCard from '@/components/performance/PerformanceMetricCard'
import CommissionsChart from '@/components/performance/CommissionsChart'
import SalesFunnelChart from '@/components/performance/SalesFunnelChart'
import PolicyCategoriesChart from '@/components/performance/PolicyCategoriesChart'
import PerformanceTrendChart from '@/components/performance/PerformanceTrendChart'
import AgentLeaderboard from '@/components/performance/AgentLeaderboard'
import ChartCard from '@/components/dashboard/ChartCard'
import {
  usePerformanceMetrics,
  usePerformanceCharts,
  useAgentLeaderboard,
} from '@/services/queries/performanceQueries'
import { cn } from '@/lib/utils'

// ── Metric card definitions ────────────────────────────────────────────────────
const METRIC_CARDS = [
  {
    key: 'clientsManaged',
    icon: Users,
    format: 'number',
    color: { bg: 'bg-blue-50 dark:bg-blue-950/50', icon: 'text-blue-600 dark:text-blue-400' },
  },
  {
    key: 'policiesSold',
    icon: FileText,
    format: 'number',
    color: { bg: 'bg-violet-50 dark:bg-violet-950/50', icon: 'text-violet-600 dark:text-violet-400' },
  },
  {
    key: 'renewalRate',
    icon: RefreshCw,
    format: 'percent',
    color: { bg: 'bg-emerald-50 dark:bg-emerald-950/50', icon: 'text-emerald-600 dark:text-emerald-400' },
  },
  {
    key: 'conversionRate',
    icon: Target,
    format: 'percent',
    color: { bg: 'bg-amber-50 dark:bg-amber-950/50', icon: 'text-amber-600 dark:text-amber-400' },
  },
  {
    key: 'monthlyCommission',
    icon: Banknote,
    format: 'currency',
    color: { bg: 'bg-green-50 dark:bg-green-950/50', icon: 'text-green-600 dark:text-green-400' },
  },
]

// ── Period selector ────────────────────────────────────────────────────────────
const PERIODS = ['This Month', 'Q2 2026', 'YTD']

// ── Page ──────────────────────────────────────────────────────────────────────
export default function PerformancePage() {
  const [period, setPeriod] = useState('This Month')

  const { data: metrics, isLoading: metricsLoading } = usePerformanceMetrics()
  const { data: charts,  isLoading: chartsLoading  } = usePerformanceCharts()
  const { data: leaders, isLoading: leadersLoading } = useAgentLeaderboard()

  return (
    <div className="space-y-6">

      {/* ── Header ────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Performance</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Your metrics, commissions and team leaderboard
          </p>
        </div>

        {/* Period selector */}
        <div className="flex rounded-lg border border-border bg-background p-1">
          {PERIODS.map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={cn(
                'rounded-md px-3 py-1.5 text-xs font-medium transition-colors',
                period === p
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* ── Metric Cards ──────────────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {METRIC_CARDS.map(({ key, icon, format, color }) => (
          <PerformanceMetricCard
            key={key}
            metric={metrics?.[key] ?? { value: 0, change: 0, label: '' }}
            icon={icon}
            format={format}
            color={color}
            loading={metricsLoading}
          />
        ))}
      </div>

      {/* ── Row 2: Commissions + Policy Categories ─────────────────── */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <ChartCard
          title="Monthly Commissions"
          subtitle="KSh · last 12 months"
          loading={chartsLoading}
          height={260}
          className="lg:col-span-2"
        >
          {charts && <CommissionsChart data={charts.commissions} />}
        </ChartCard>

        <ChartCard
          title="Policy Categories"
          subtitle="Portfolio split by plan type"
          loading={chartsLoading}
          height={260}
        >
          {charts && <PolicyCategoriesChart data={charts.categories} />}
        </ChartCard>
      </div>

      {/* ── Row 3: Sales Funnel + Performance Trend ────────────────── */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ChartCard
          title="Sales Funnel"
          subtitle="Lead-to-close conversion pipeline"
          loading={chartsLoading}
          height={260}
        >
          {charts && <SalesFunnelChart data={charts.funnel} />}
        </ChartCard>

        <ChartCard
          title="Performance Trend"
          subtitle="Monthly score vs. target and team average"
          loading={chartsLoading}
          height={260}
        >
          {charts && <PerformanceTrendChart data={charts.trend} />}
        </ChartCard>
      </div>

      {/* ── Row 4: Leaderboard ─────────────────────────────────────── */}
      <div className="rounded-xl border border-border bg-background shadow-sm">
        <div className="border-b border-border px-5 py-3.5">
          <h2 className="text-sm font-semibold text-foreground">Top Performing Agents</h2>
          <p className="mt-0.5 text-xs text-muted-foreground">Ranked by performance score · {period}</p>
        </div>
        <AgentLeaderboard agents={leaders ?? []} loading={leadersLoading} />
      </div>

    </div>
  )
}
