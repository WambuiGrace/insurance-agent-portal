import {
  Users,
  FileCheck,
  Clock,
  DollarSign,
  Banknote,
} from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import {
  useDashboardMetrics,
  useDashboardCharts,
  useDashboardActivities,
} from '@/services/queries/dashboardQueries'
import MetricCard from '@/components/dashboard/MetricCard'
import SalesTrendChart from '@/components/dashboard/SalesTrendChart'
import RevenueTrendChart from '@/components/dashboard/RevenueTrendChart'
import PolicyDistributionChart from '@/components/dashboard/PolicyDistributionChart'
import RenewalSuccessChart from '@/components/dashboard/RenewalSuccessChart'
import RecentActivity from '@/components/dashboard/RecentActivity'
import QuickActions from '@/components/dashboard/QuickActions'

// Config for each metric card
const METRIC_CARDS = [
  {
    key: 'totalClients',
    icon: Users,
    isCurrency: false,
    color: { bg: 'bg-blue-50 dark:bg-blue-950/40', icon: 'text-blue-600 dark:text-blue-400' },
  },
  {
    key: 'activePolicies',
    icon: FileCheck,
    isCurrency: false,
    color: { bg: 'bg-emerald-50 dark:bg-emerald-950/40', icon: 'text-emerald-600 dark:text-emerald-400' },
  },
  {
    key: 'expiringSoon',
    icon: Clock,
    isCurrency: false,
    color: { bg: 'bg-amber-50 dark:bg-amber-950/40', icon: 'text-amber-600 dark:text-amber-400' },
  },
  {
    key: 'monthlyRevenue',
    icon: DollarSign,
    isCurrency: true,
    color: { bg: 'bg-violet-50 dark:bg-violet-950/40', icon: 'text-violet-600 dark:text-violet-400' },
  },
  {
    key: 'commissionEarned',
    icon: Banknote,
    isCurrency: true,
    color: { bg: 'bg-rose-50 dark:bg-rose-950/40', icon: 'text-rose-600 dark:text-rose-400' },
  },
]

export default function DashboardPage() {
  const { user } = useAuth()

  const { data: metrics, isLoading: metricsLoading } = useDashboardMetrics()
  const { data: charts, isLoading: chartsLoading } = useDashboardCharts()
  const { data: activities, isLoading: activitiesLoading } = useDashboardActivities()

  const now = new Date()
  const timeGreeting =
    now.getHours() < 12 ? 'Good morning' :
    now.getHours() < 17 ? 'Good afternoon' :
    'Good evening'

  return (
    <div className="space-y-6">
      {/* ── Page header ─────────────────────────────────────────── */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {timeGreeting}, {user?.name?.split(' ')[0]} — here's your portfolio overview
          </p>
        </div>
        <p className="text-xs text-muted-foreground">
          {now.toLocaleDateString('en-KE', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>

      {/* ── Metric cards ────────────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {METRIC_CARDS.map(({ key, icon, isCurrency, color }) => (
          <MetricCard
            key={key}
            metric={metrics?.[key]}
            icon={icon}
            isCurrency={isCurrency}
            color={color}
            loading={metricsLoading}
          />
        ))}
      </div>

      {/* ── Charts row 1: Sales trend + Policy distribution ─────── */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <SalesTrendChart data={charts?.monthlySales} loading={chartsLoading} />
        </div>
        <PolicyDistributionChart data={charts?.policyDistribution} loading={chartsLoading} />
      </div>

      {/* ── Charts row 2: Revenue trend + Renewal success ────────── */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <RevenueTrendChart data={charts?.revenue} loading={chartsLoading} />
        <RenewalSuccessChart data={charts?.renewalSuccess} loading={chartsLoading} />
      </div>

      {/* ── Bottom row: Activities + Quick actions ───────────────── */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <RecentActivity activities={activities} loading={activitiesLoading} />
        </div>
        <div className="lg:col-span-2">
          <QuickActions />
        </div>
      </div>
    </div>
  )
}
