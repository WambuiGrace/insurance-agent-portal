import { ALL_RENEWALS } from '@/data/renewalsData'

const delay = (ms) => new Promise((r) => setTimeout(r, ms))

// In-memory mutable store — cloned from static data at startup
let cards = ALL_RENEWALS.map((c) => ({ ...c }))

export const renewalsService = {
  async getBoard() {
    await delay(700)
    return cards.map((c) => ({ ...c }))
  },

  async moveCard(cardId, newStatus) {
    await delay(250)
    cards = cards.map((c) =>
      c.id === cardId ? { ...c, status: newStatus } : c
    )
    return cards.find((c) => c.id === cardId)
  },
}
