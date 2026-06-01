import {
  DASHBOARD_METRICS,
  MONTHLY_SALES_DATA,
  REVENUE_DATA,
  POLICY_DISTRIBUTION,
  RENEWAL_SUCCESS_DATA,
  RECENT_ACTIVITIES,
} from '@/data/dashboardData'

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const dashboardService = {
  async getMetrics() {
    await delay(800)
    return DASHBOARD_METRICS
  },

  async getChartData() {
    await delay(1100)
    return {
      monthlySales: MONTHLY_SALES_DATA,
      revenue: REVENUE_DATA,
      policyDistribution: POLICY_DISTRIBUTION,
      renewalSuccess: RENEWAL_SUCCESS_DATA,
    }
  },

  async getRecentActivities() {
    await delay(700)
    return RECENT_ACTIVITIES
  },
}
