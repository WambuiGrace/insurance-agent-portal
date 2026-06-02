import { ALL_CLIENTS } from '@/data/clientsData'

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const archivedIds = new Set()
const addedClients = []
const clientNotes = {}

function sortClients(clients, field, order) {
  return [...clients].sort((a, b) => {
    let aVal = a[field]
    let bVal = b[field]

    if (field === 'renewalDate' || field === 'joinedDate') {
      aVal = new Date(aVal).getTime()
      bVal = new Date(bVal).getTime()
      return order === 'asc' ? aVal - bVal : bVal - aVal
    }

    if (field === 'premium') {
      return order === 'asc' ? aVal - bVal : bVal - aVal
    }

    const cmp = String(aVal).localeCompare(String(bVal))
    return order === 'asc' ? cmp : -cmp
  })
}

function generateClaimsFor(client) {
  const num = parseInt(client.id.split('-')[1])
  const claimTypes = {
    Medical:  ['Hospitalization', 'Outpatient Consultation', 'Emergency Treatment'],
    Life:     ['Disability Benefit', 'Critical Illness', 'Accidental Benefit'],
    Motor:    ['Accident Repair', 'Theft', 'Third Party Liability'],
    Property: ['Fire Damage', 'Burglary', 'Flood Damage'],
  }
  const types = claimTypes[client.planType] || ['General Claim']
  const count = (num % 3) + 1
  const joined = new Date(client.joinedDate)
  const amounts = [25000, 48000, 15000, 80000, 32000, 55000, 22000, 67000, 38000]
  const statuses = ['Settled', 'Settled', 'Pending', 'Settled', 'Rejected', 'Settled', 'Pending', 'Settled']

  return Array.from({ length: count }, (_, i) => {
    const daysOffset = 60 + i * 150
    const filed = new Date(joined.getTime() + daysOffset * 86400000)
    const status = statuses[(num + i) % statuses.length]
    const settled = status === 'Settled'
      ? new Date(filed.getTime() + 28 * 86400000)
      : null
    return {
      id: `CLM-${num}-${i}`,
      claimNumber: `CLM-${4000 + num * 3 + i}`,
      type: types[i % types.length],
      amount: amounts[(num + i) % amounts.length],
      status,
      dateFiled: filed.toISOString().split('T')[0],
      dateSettled: settled ? settled.toISOString().split('T')[0] : null,
    }
  })
}

function generateTimelineFor(client) {
  const joined = new Date(client.joinedDate)
  const events = [
    {
      type: 'registered',
      label: 'Client registered',
      description: `${client.name} onboarded as a new client`,
      daysOffset: 0,
      actor: 'System',
    },
    {
      type: 'call',
      label: 'Phone call completed',
      description: 'Initial policy discussion and needs assessment completed',
      daysOffset: 3,
      actor: client.assignedAgent,
    },
    {
      type: 'email',
      label: 'Welcome email sent',
      description: 'Policy documents and welcome pack emailed to client',
      daysOffset: 5,
      actor: client.assignedAgent,
    },
    {
      type: 'renewal_initiated',
      label: 'Renewal initiated',
      description: `Renewal process started for policy ${client.policyNumber}`,
      daysOffset: 335,
      actor: client.assignedAgent,
    },
    {
      type: 'renewed',
      label: 'Policy renewed',
      description: `${client.planType} policy successfully renewed for another year`,
      daysOffset: 365,
      actor: client.assignedAgent,
    },
  ]

  return events
    .map((e, i) => ({
      id: `EVT-${client.id}-${i}`,
      type: e.type,
      label: e.label,
      description: e.description,
      timestamp: new Date(joined.getTime() + e.daysOffset * 86400000).toISOString(),
      actor: e.actor,
    }))
    .reverse()
}

function generateRenewalHistoryFor(client) {
  const num = parseInt(client.id.split('-')[1])
  const joined = new Date(client.joinedDate)
  const today = new Date('2026-06-02')
  const msPerYear = 365.25 * 24 * 60 * 60 * 1000
  const yearsElapsed = Math.floor((today - joined) / msPerYear)
  if (yearsElapsed === 0) return []

  const count = Math.min(yearsElapsed, 4)

  return Array.from({ length: count }, (_, i) => {
    const yearNum = i + 1
    const renewedOn = new Date(joined)
    renewedOn.setFullYear(renewedOn.getFullYear() + yearNum)
    const prevExpiry = new Date(renewedOn)
    prevExpiry.setFullYear(prevExpiry.getFullYear() - 1)
    prevExpiry.setDate(prevExpiry.getDate() - 1)
    const newExpiry = new Date(renewedOn)
    newExpiry.setFullYear(newExpiry.getFullYear() + 1)
    newExpiry.setDate(newExpiry.getDate() - 1)

    return {
      id: `RNW-${num}-${i}`,
      renewedOn: renewedOn.toISOString().split('T')[0],
      previousExpiry: prevExpiry.toISOString().split('T')[0],
      newExpiry: newExpiry.toISOString().split('T')[0],
      premium: Math.round(client.premium * Math.pow(1.05, yearNum)),
      status: 'Completed',
    }
  }).reverse()
}

export const clientsService = {
  async getClients({
    search = '',
    status = '',
    planType = '',
    sortField = 'name',
    sortOrder = 'asc',
    page = 1,
    perPage = 10,
  } = {}) {
    await delay(600)

    let results = [...ALL_CLIENTS, ...addedClients].filter((c) => !archivedIds.has(c.id))

    if (search.trim()) {
      const q = search.trim().toLowerCase()
      results = results.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.policyNumber.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q)
      )
    }

    if (status) results = results.filter((c) => c.status === status)
    if (planType) results = results.filter((c) => c.planType === planType)

    results = sortClients(results, sortField, sortOrder)

    const total = results.length
    const totalPages = Math.max(1, Math.ceil(total / perPage))
    const safePage = Math.min(page, totalPages)
    const start = (safePage - 1) * perPage
    const data = results.slice(start, start + perPage)

    return { data, total, page: safePage, totalPages, perPage }
  },

  async getClientById(id) {
    await delay(400)
    const client = [...ALL_CLIENTS, ...addedClients].find((c) => c.id === id)
    if (!client) throw new Error('Client not found')
    return client
  },

  async getClientDetail(id) {
    await delay(500)
    const client = [...ALL_CLIENTS, ...addedClients].find((c) => c.id === id)
    if (!client) throw new Error('Client not found')
    return {
      ...client,
      claims: generateClaimsFor(client),
      timeline: generateTimelineFor(client),
      renewalHistory: generateRenewalHistoryFor(client),
      notes: clientNotes[id] ? [...clientNotes[id]] : [],
    }
  },

  async addNote(clientId, { content, author }) {
    await delay(300)
    if (!clientNotes[clientId]) clientNotes[clientId] = []
    const note = {
      id: `NOTE-${Date.now()}`,
      content,
      author: author || 'You',
      createdAt: new Date().toISOString(),
    }
    clientNotes[clientId].unshift(note)
    return note
  },

  async createClient(data) {
    await delay(700)
    const total = ALL_CLIENTS.length + addedClients.length
    const num = total + 1
    const newClient = {
      id: `CLT-${String(num).padStart(3, '0')}`,
      policyNumber: `INS-${3000 + num}`,
      joinedDate: new Date().toISOString().split('T')[0],
      status: 'Active',
      ...data,
      premium: Number(data.premium),
    }
    addedClients.push(newClient)
    return newClient
  },

  async archiveClient(id) {
    await delay(500)
    archivedIds.add(id)
    return { success: true, id }
  },
}
