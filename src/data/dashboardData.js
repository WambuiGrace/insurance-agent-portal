import {
  UserPlus,
  RefreshCw,
  CalendarCheck,
  Banknote,
  FileText,
  PhoneCall,
} from 'lucide-react'

// ── KPI metrics ────────────────────────────────────────────────────────────
export const DASHBOARD_METRICS = {
  totalClients: { value: 2847, change: 12.4, label: 'Total Clients' },
  activePolicies: { value: 1923, change: 8.1, label: 'Active Policies' },
  expiringSoon: { value: 147, change: -5.2, label: 'Expiring in 30 Days' },
  monthlyRevenue: { value: 4285000, change: 15.3, label: 'Monthly Revenue' },
  commissionEarned: { value: 428500, change: 15.3, label: 'Commission Earned' },
}

// ── Monthly sales trend (12 months) ───────────────────────────────────────
export const MONTHLY_SALES_DATA = [
  { month: 'Jan', policies: 42, target: 50 },
  { month: 'Feb', policies: 38, target: 50 },
  { month: 'Mar', policies: 55, target: 50 },
  { month: 'Apr', policies: 61, target: 55 },
  { month: 'May', policies: 48, target: 55 },
  { month: 'Jun', policies: 70, target: 55 },
  { month: 'Jul', policies: 65, target: 60 },
  { month: 'Aug', policies: 82, target: 60 },
  { month: 'Sep', policies: 74, target: 65 },
  { month: 'Oct', policies: 88, target: 65 },
  { month: 'Nov', policies: 95, target: 70 },
  { month: 'Dec', policies: 103, target: 70 },
]

// ── Revenue & commission trend (12 months, KSh) ───────────────────────────
export const REVENUE_DATA = [
  { month: 'Jan', revenue: 285000, commission: 28500 },
  { month: 'Feb', revenue: 312000, commission: 31200 },
  { month: 'Mar', revenue: 398000, commission: 39800 },
  { month: 'Apr', revenue: 445000, commission: 44500 },
  { month: 'May', revenue: 375000, commission: 37500 },
  { month: 'Jun', revenue: 512000, commission: 51200 },
  { month: 'Jul', revenue: 478000, commission: 47800 },
  { month: 'Aug', revenue: 623000, commission: 62300 },
  { month: 'Sep', revenue: 548000, commission: 54800 },
  { month: 'Oct', revenue: 695000, commission: 69500 },
  { month: 'Nov', revenue: 742000, commission: 74200 },
  { month: 'Dec', revenue: 856000, commission: 85600 },
]

// ── Policy distribution by plan type ─────────────────────────────────────
export const POLICY_DISTRIBUTION = [
  { name: 'Medical', value: 45, color: '#3b82f6' },
  { name: 'Life', value: 25, color: '#8b5cf6' },
  { name: 'Motor', value: 15, color: '#f59e0b' },
  { name: 'Property', value: 10, color: '#10b981' },
  { name: 'Other', value: 5, color: '#6b7280' },
]

// ── Renewal success rate (%) per month ────────────────────────────────────
export const RENEWAL_SUCCESS_DATA = [
  { month: 'Jan', rate: 87, target: 90 },
  { month: 'Feb', rate: 82, target: 90 },
  { month: 'Mar', rate: 89, target: 90 },
  { month: 'Apr', rate: 91, target: 90 },
  { month: 'May', rate: 85, target: 90 },
  { month: 'Jun', rate: 93, target: 90 },
  { month: 'Jul', rate: 90, target: 90 },
  { month: 'Aug', rate: 96, target: 90 },
  { month: 'Sep', rate: 92, target: 90 },
  { month: 'Oct', rate: 94, target: 90 },
  { month: 'Nov', rate: 97, target: 90 },
  { month: 'Dec', rate: 94, target: 90 },
]

// ── Recent activities ─────────────────────────────────────────────────────
export const RECENT_ACTIVITIES = [
  {
    id: 1,
    type: 'client_added',
    icon: UserPlus,
    color: 'text-blue-600 bg-blue-50 dark:bg-blue-950/50 dark:text-blue-400',
    title: 'New client added',
    subtitle: 'Amara Osei — Medical plan',
    time: '5 min ago',
  },
  {
    id: 2,
    type: 'policy_renewed',
    icon: RefreshCw,
    color: 'text-green-600 bg-green-50 dark:bg-green-950/50 dark:text-green-400',
    title: 'Policy renewed',
    subtitle: 'INS-2847 · Wanjiku Family Health',
    time: '32 min ago',
  },
  {
    id: 3,
    type: 'followup',
    icon: CalendarCheck,
    color: 'text-violet-600 bg-violet-50 dark:bg-violet-950/50 dark:text-violet-400',
    title: 'Follow-up scheduled',
    subtitle: 'Call with Kariuki Ltd — Thu 10 AM',
    time: '2 hr ago',
  },
  {
    id: 4,
    type: 'commission',
    icon: Banknote,
    color: 'text-amber-600 bg-amber-50 dark:bg-amber-950/50 dark:text-amber-400',
    title: 'Commission payment received',
    subtitle: 'KSh 45,000 credited to account',
    time: 'Today, 9:15 AM',
  },
  {
    id: 5,
    type: 'policy_created',
    icon: FileText,
    color: 'text-cyan-600 bg-cyan-50 dark:bg-cyan-950/50 dark:text-cyan-400',
    title: 'New policy issued',
    subtitle: 'INS-3201 · Fatima Hassan — Life plan',
    time: 'Yesterday, 4:30 PM',
  },
  {
    id: 6,
    type: 'followup',
    icon: PhoneCall,
    color: 'text-rose-600 bg-rose-50 dark:bg-rose-950/50 dark:text-rose-400',
    title: 'Follow-up call completed',
    subtitle: 'Mwangi Enterprises — renewal confirmed',
    time: 'Yesterday, 2:00 PM',
  },
]
