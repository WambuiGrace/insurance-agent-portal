import { createSlice } from '@reduxjs/toolkit'

const INITIAL_NOTIFICATIONS = [
  // ── Renewal Reminders ──────────────────────────────────────────────────────
  {
    id: 'NTF-001',
    type: 'Renewal Reminder',
    title: 'Policy renewal due in 4 days',
    message: "Rose Ochieng's Motor policy (INS-3048) expires on 06 Jun 2026. Contact client immediately to initiate renewal.",
    timestamp: '2026-06-02T08:15:00Z',
    read: false, pinned: true, dismissed: false,
    clientName: 'Rose Ochieng', policyNumber: 'INS-3048',
  },
  {
    id: 'NTF-002',
    type: 'Renewal Reminder',
    title: 'Policy renewal due in 10 days',
    message: "Sharon Maina's Medical policy (INS-3018) expires on 12 Jun 2026. Schedule a call to confirm renewal.",
    timestamp: '2026-06-02T09:30:00Z',
    read: false, pinned: false, dismissed: false,
    clientName: 'Sharon Maina', policyNumber: 'INS-3018',
  },
  {
    id: 'NTF-003',
    type: 'Renewal Reminder',
    title: 'Policy renewal due in 16 days',
    message: "Faith Njeri's Medical policy (INS-3006) expires on 18 Jun 2026. Send renewal notice to client.",
    timestamp: '2026-06-02T07:45:00Z',
    read: false, pinned: false, dismissed: false,
    clientName: 'Faith Njeri', policyNumber: 'INS-3006',
  },
  {
    id: 'NTF-004',
    type: 'Renewal Reminder',
    title: 'Policy renewal due in 18 days',
    message: "Grace Mwangi's Medical policy (INS-3004) expires on 20 Jun 2026. Renewal documents ready.",
    timestamp: '2026-06-01T14:30:00Z',
    read: true, pinned: false, dismissed: false,
    clientName: 'Grace Mwangi', policyNumber: 'INS-3004',
  },
  {
    id: 'NTF-005',
    type: 'Renewal Reminder',
    title: 'Upcoming renewal — John Otieno',
    message: "John Otieno's Medical policy (INS-3013) renewal is due 25 Jun 2026. Proposal sent and awaiting confirmation.",
    timestamp: '2026-05-31T11:00:00Z',
    read: true, pinned: false, dismissed: false,
    clientName: 'John Otieno', policyNumber: 'INS-3013',
  },
  {
    id: 'NTF-006',
    type: 'Renewal Reminder',
    title: 'Upcoming renewal — Agnes Ochieng',
    message: "Agnes Ochieng's Medical policy (INS-3024) renewal is due 28 Jun 2026. Follow up scheduled for next week.",
    timestamp: '2026-05-29T09:00:00Z',
    read: true, pinned: false, dismissed: false,
    clientName: 'Agnes Ochieng', policyNumber: 'INS-3024',
  },

  // ── Client Inquiry ─────────────────────────────────────────────────────────
  {
    id: 'NTF-007',
    type: 'Client Inquiry',
    title: 'Quote request — Life insurance',
    message: 'James Kamau is requesting a quote for a Life insurance policy. They are interested in a 20-year term plan.',
    timestamp: '2026-06-02T10:05:00Z',
    read: false, pinned: false, dismissed: false,
    clientName: 'James Kamau',
  },
  {
    id: 'NTF-008',
    type: 'Client Inquiry',
    title: 'Plan upgrade inquiry',
    message: 'Kevin Gitau wants to upgrade his current Medical plan to include dental and optical coverage. Awaiting callback.',
    timestamp: '2026-06-02T09:00:00Z',
    read: false, pinned: false, dismissed: false,
    clientName: 'Kevin Gitau',
  },
  {
    id: 'NTF-009',
    type: 'Client Inquiry',
    title: 'Follow-up — Property renewal',
    message: 'Moses Kinyua called regarding the terms of his Property policy renewal. He has questions about flood coverage.',
    timestamp: '2026-06-01T16:45:00Z',
    read: true, pinned: false, dismissed: false,
    clientName: 'Moses Kinyua',
  },
  {
    id: 'NTF-010',
    type: 'Client Inquiry',
    title: 'Coverage query — Naomi Wambui',
    message: 'Naomi Wambui submitted questions about her Medical plan coverage limits for specialist visits and maternity care.',
    timestamp: '2026-05-30T14:00:00Z',
    read: true, pinned: false, dismissed: false,
    clientName: 'Naomi Wambui',
  },

  // ── New Lead ───────────────────────────────────────────────────────────────
  {
    id: 'NTF-011',
    type: 'New Lead',
    title: 'New lead — Medical insurance',
    message: 'Emmanuel Kariuki from Westlands, Nairobi is interested in a family Medical insurance plan. Referred by James Kamau.',
    timestamp: '2026-06-02T06:20:00Z',
    read: false, pinned: true, dismissed: false,
  },
  {
    id: 'NTF-012',
    type: 'New Lead',
    title: 'New lead — Life insurance',
    message: 'Diana Njoroge submitted an inquiry form on the website for a 15-year Life insurance policy. Contact within 24 hours.',
    timestamp: '2026-06-01T11:15:00Z',
    read: false, pinned: false, dismissed: false,
  },
  {
    id: 'NTF-013',
    type: 'New Lead',
    title: 'New lead — Motor insurance',
    message: 'Victor Otieno from Kisumu is looking for comprehensive Motor insurance for a new vehicle. Budget: KSh 40,000–50,000.',
    timestamp: '2026-05-28T10:30:00Z',
    read: true, pinned: false, dismissed: false,
  },
  {
    id: 'NTF-014',
    type: 'New Lead',
    title: 'New lead — Medical family plan',
    message: 'Amina Hassan is interested in a Medical family plan covering 4 members. She was referred by a colleague at her workplace.',
    timestamp: '2026-05-26T09:15:00Z',
    read: true, pinned: false, dismissed: false,
  },

  // ── Policy Expiry ──────────────────────────────────────────────────────────
  {
    id: 'NTF-015',
    type: 'Policy Expiry',
    title: 'Policy expired — Daniel Kariuki',
    message: "Daniel Kariuki's Motor policy (INS-3009) expired on 22 Apr 2026 without renewal. Client requires immediate follow-up.",
    timestamp: '2026-06-02T08:50:00Z',
    read: false, pinned: false, dismissed: false,
    clientName: 'Daniel Kariuki', policyNumber: 'INS-3009',
  },
  {
    id: 'NTF-016',
    type: 'Policy Expiry',
    title: 'Policy expired — Oscar Ndungu',
    message: "Oscar Ndungu's Medical policy (INS-3045) expired on 02 May 2026. Multiple contact attempts made with no response.",
    timestamp: '2026-05-25T13:00:00Z',
    read: true, pinned: false, dismissed: false,
    clientName: 'Oscar Ndungu', policyNumber: 'INS-3045',
  },
  {
    id: 'NTF-017',
    type: 'Policy Expiry',
    title: 'Policy expired — Andrew Kemunto',
    message: "Andrew Kemunto's Motor policy (INS-3031) expired on 28 Feb 2026. Policy marked as lapsed. Consider re-engagement.",
    timestamp: '2026-05-20T08:45:00Z',
    read: true, pinned: false, dismissed: false,
    clientName: 'Andrew Kemunto', policyNumber: 'INS-3031',
  },

  // ── Commission Payment ─────────────────────────────────────────────────────
  {
    id: 'NTF-018',
    type: 'Commission Payment',
    title: 'Commission credited — KSh 45,000',
    message: 'KSh 45,000 commission has been credited to your account for 5 new Medical policy sales closed in May 2026.',
    timestamp: '2026-06-02T09:45:00Z',
    read: false, pinned: false, dismissed: false,
  },
  {
    id: 'NTF-019',
    type: 'Commission Payment',
    title: 'Commission credited — KSh 28,000',
    message: 'KSh 28,000 commission credited for the June renewal batch (8 policies successfully renewed). Payment reference: PAY-2026-0601.',
    timestamp: '2026-06-01T10:00:00Z',
    read: true, pinned: false, dismissed: false,
  },
  {
    id: 'NTF-020',
    type: 'Commission Payment',
    title: 'Commission pending — KSh 17,500',
    message: 'KSh 17,500 commission for 3 Property policy renewals is pending approval from the finance team. Expected by 05 Jun 2026.',
    timestamp: '2026-05-22T14:30:00Z',
    read: true, pinned: false, dismissed: false,
  },
]

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: {
    notifications: INITIAL_NOTIFICATIONS,
    filter: 'All',
  },
  reducers: {
    markRead(state, { payload: id }) {
      const n = state.notifications.find((n) => n.id === id)
      if (n) n.read = true
    },
    markAllRead(state) {
      state.notifications.forEach((n) => {
        if (!n.dismissed) n.read = true
      })
    },
    togglePin(state, { payload: id }) {
      const n = state.notifications.find((n) => n.id === id)
      if (n) n.pinned = !n.pinned
    },
    dismiss(state, { payload: id }) {
      const n = state.notifications.find((n) => n.id === id)
      if (n) {
        n.dismissed = true
        n.pinned = false
      }
    },
    setFilter(state, { payload: filter }) {
      state.filter = filter
    },
  },
})

export const { markRead, markAllRead, togglePin, dismiss, setFilter } =
  notificationsSlice.actions

export default notificationsSlice.reducer
