import { ALL_CLIENTS } from '@/data/clientsData'

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// In-memory archive store — persists within the session
const archivedIds = new Set()

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

    let results = ALL_CLIENTS.filter((c) => !archivedIds.has(c.id))

    // Search by name or policy number
    if (search.trim()) {
      const q = search.trim().toLowerCase()
      results = results.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.policyNumber.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q)
      )
    }

    // Status filter
    if (status) results = results.filter((c) => c.status === status)

    // Plan type filter
    if (planType) results = results.filter((c) => c.planType === planType)

    // Sort
    results = sortClients(results, sortField, sortOrder)

    // Paginate
    const total = results.length
    const totalPages = Math.max(1, Math.ceil(total / perPage))
    const safePage = Math.min(page, totalPages)
    const start = (safePage - 1) * perPage
    const data = results.slice(start, start + perPage)

    return { data, total, page: safePage, totalPages, perPage }
  },

  async getClientById(id) {
    await delay(400)
    const client = ALL_CLIENTS.find((c) => c.id === id)
    if (!client) throw new Error('Client not found')
    return client
  },

  async archiveClient(id) {
    await delay(500)
    archivedIds.add(id)
    return { success: true, id }
  },
}
