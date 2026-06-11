import { createSlice } from '@reduxjs/toolkit'

const DEFAULT = {
  notifications: {
    renewalReminders:   true,
    clientInquiries:    true,
    newLeads:           true,
    policyExpiry:       true,
    commissionPayments: true,
    emailAlerts:        true,
    pushNotifications:  false,
  },
  dashboard: {
    showKpiCards:       true,
    showCharts:         true,
    showRecentActivity: true,
    showQuickActions:   true,
    defaultPeriod:      'This Month',
  },
}

function load() {
  try {
    const raw = localStorage.getItem('app_preferences')
    if (raw) {
      const parsed = JSON.parse(raw)
      return {
        notifications: { ...DEFAULT.notifications, ...parsed.notifications },
        dashboard:     { ...DEFAULT.dashboard,     ...parsed.dashboard     },
      }
    }
  } catch {}
  return DEFAULT
}

function persist(state) {
  try {
    localStorage.setItem('app_preferences', JSON.stringify(state))
  } catch {}
}

const settingsSlice = createSlice({
  name: 'settings',
  initialState: load(),
  reducers: {
    toggleNotificationPref(state, { payload: key }) {
      state.notifications[key] = !state.notifications[key]
      persist(state)
    },
    toggleDashboardPref(state, { payload: key }) {
      state.dashboard[key] = !state.dashboard[key]
      persist(state)
    },
    setDashboardPeriod(state, { payload: period }) {
      state.dashboard.defaultPeriod = period
      persist(state)
    },
  },
})

export const { toggleNotificationPref, toggleDashboardPref, setDashboardPeriod } =
  settingsSlice.actions

export default settingsSlice.reducer
