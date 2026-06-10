import {
  AGENT_METRICS,
  MONTHLY_COMMISSIONS,
  SALES_FUNNEL,
  POLICY_CATEGORIES,
  PERFORMANCE_TREND,
  AGENT_LEADERBOARD,
} from '@/data/performanceData'

const delay = (ms) => new Promise((r) => setTimeout(r, ms))

export const performanceService = {
  async getMetrics() {
    await delay(700)
    return AGENT_METRICS
  },

  async getChartData() {
    await delay(900)
    return {
      commissions:  MONTHLY_COMMISSIONS,
      funnel:       SALES_FUNNEL,
      categories:   POLICY_CATEGORIES,
      trend:        PERFORMANCE_TREND,
    }
  },

  async getLeaderboard() {
    await delay(800)
    return AGENT_LEADERBOARD
  },
}
