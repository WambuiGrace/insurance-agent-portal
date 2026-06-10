// ── KPI Metrics (current agent, this month) ──────────────────────────────────
export const AGENT_METRICS = {
  clientsManaged:  { value: 32,    change: 4.2,   label: 'Clients Managed'   },
  policiesSold:    { value: 48,    change: 12.5,  label: 'Policies Sold'      },
  renewalRate:     { value: 87.5,  change: 2.1,   label: 'Renewal Rate'       },
  conversionRate:  { value: 64.2,  change: -1.8,  label: 'Conversion Rate'    },
  monthlyCommission: { value: 124500, change: 8.3, label: 'Monthly Commission' },
}

// ── Monthly Commissions (last 12 months, KSh) ─────────────────────────────────
export const MONTHLY_COMMISSIONS = [
  { month: 'Jul 25', amount: 78500  },
  { month: 'Aug 25', amount: 85200  },
  { month: 'Sep 25', amount: 91400  },
  { month: 'Oct 25', amount: 88700  },
  { month: 'Nov 25', amount: 102300 },
  { month: 'Dec 25', amount: 118900 },
  { month: 'Jan 26', amount: 95600  },
  { month: 'Feb 26', amount: 89300  },
  { month: 'Mar 26', amount: 108200 },
  { month: 'Apr 26', amount: 112500 },
  { month: 'May 26', amount: 119800 },
  { month: 'Jun 26', amount: 124500 },
]

// ── Sales Funnel ──────────────────────────────────────────────────────────────
export const SALES_FUNNEL = [
  { stage: 'Leads Generated', count: 120, color: '#6366f1' },
  { stage: 'Contacted',       count: 89,  color: '#8b5cf6' },
  { stage: 'Qualified',       count: 62,  color: '#a78bfa' },
  { stage: 'Proposal Sent',   count: 41,  color: '#f59e0b' },
  { stage: 'Closed / Won',    count: 28,  color: '#10b981' },
]

// ── Policy Categories (agent portfolio split) ─────────────────────────────────
export const POLICY_CATEGORIES = [
  { name: 'Medical',  value: 45, color: '#3b82f6' },
  { name: 'Life',     value: 28, color: '#8b5cf6' },
  { name: 'Motor',    value: 18, color: '#f59e0b' },
  { name: 'Property', value: 9,  color: '#10b981' },
]

// ── Performance Trend (score 0-100 per month) ─────────────────────────────────
export const PERFORMANCE_TREND = [
  { month: 'Jul 25', you: 74, target: 78, teamAvg: 68 },
  { month: 'Aug 25', you: 79, target: 78, teamAvg: 70 },
  { month: 'Sep 25', you: 82, target: 80, teamAvg: 71 },
  { month: 'Oct 25', you: 80, target: 80, teamAvg: 72 },
  { month: 'Nov 25', you: 85, target: 80, teamAvg: 73 },
  { month: 'Dec 25', you: 88, target: 82, teamAvg: 74 },
  { month: 'Jan 26', you: 84, target: 82, teamAvg: 72 },
  { month: 'Feb 26', you: 82, target: 82, teamAvg: 71 },
  { month: 'Mar 26', you: 87, target: 83, teamAvg: 73 },
  { month: 'Apr 26', you: 89, target: 83, teamAvg: 74 },
  { month: 'May 26', you: 91, target: 85, teamAvg: 75 },
  { month: 'Jun 26', you: 93, target: 85, teamAvg: 76 },
]

// ── Agent Leaderboard ─────────────────────────────────────────────────────────
export const AGENT_LEADERBOARD = [
  { rank: 1, name: 'Sarah Kamau',  initials: 'SK', clients: 32, policies: 48, renewalRate: 87.5, commission: 124500, score: 93, rankChange: 2  },
  { rank: 2, name: 'Grace Wambui', initials: 'GW', clients: 29, policies: 41, renewalRate: 91.2, commission: 108300, score: 88, rankChange: 0  },
  { rank: 3, name: 'John Mwangi',  initials: 'JM', clients: 26, policies: 38, renewalRate: 84.6, commission: 98700,  score: 82, rankChange: -1 },
  { rank: 4, name: 'Peter Otieno', initials: 'PO', clients: 24, policies: 34, renewalRate: 82.1, commission: 87200,  score: 78, rankChange: 1  },
]
