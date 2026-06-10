// 32 renewal pipeline entries — today reference: 2026-06-02
export const RENEWAL_STATUSES = ['Upcoming', 'Contacted', 'Reviewing', 'Approved', 'Renewed']

export const RENEWAL_PLAN_TYPES = ['Medical', 'Life', 'Motor', 'Property']

export const RENEWAL_AGENTS = ['Sarah Kamau', 'John Mwangi', 'Peter Otieno', 'Grace Wambui']

export const ALL_RENEWALS = [
  // ── Upcoming ────────────────────────────────────────────────────────────────
  { id: 'RNW-001', clientId: 'CLT-029', clientName: 'Joshua Makena',    policyNumber: 'INS-3029', planType: 'Medical',  renewalAmount: 50000, dueDate: '2026-06-08', assignedAgent: 'Sarah Kamau',   status: 'Upcoming' },
  { id: 'RNW-002', clientId: 'CLT-048', clientName: 'Rose Ochieng',     policyNumber: 'INS-3048', planType: 'Motor',    renewalAmount: 35000, dueDate: '2026-06-06', assignedAgent: 'Grace Wambui',  status: 'Upcoming' },
  { id: 'RNW-003', clientId: 'CLT-018', clientName: 'Sharon Maina',     policyNumber: 'INS-3018', planType: 'Medical',  renewalAmount: 49000, dueDate: '2026-06-12', assignedAgent: 'John Mwangi',   status: 'Upcoming' },
  { id: 'RNW-004', clientId: 'CLT-006', clientName: 'Faith Njeri',      policyNumber: 'INS-3006', planType: 'Medical',  renewalAmount: 44000, dueDate: '2026-06-18', assignedAgent: 'John Mwangi',   status: 'Upcoming' },
  { id: 'RNW-005', clientId: 'CLT-004', clientName: 'Grace Mwangi',     policyNumber: 'INS-3004', planType: 'Medical',  renewalAmount: 52000, dueDate: '2026-06-20', assignedAgent: 'Sarah Kamau',   status: 'Upcoming' },
  { id: 'RNW-006', clientId: 'CLT-034', clientName: 'Diana Omondi',     policyNumber: 'INS-3034', planType: 'Medical',  renewalAmount: 48000, dueDate: '2026-06-22', assignedAgent: 'John Mwangi',   status: 'Upcoming' },
  { id: 'RNW-007', clientId: 'CLT-013', clientName: 'John Otieno',      policyNumber: 'INS-3013', planType: 'Medical',  renewalAmount: 43000, dueDate: '2026-06-25', assignedAgent: 'Sarah Kamau',   status: 'Upcoming' },
  { id: 'RNW-008', clientId: 'CLT-024', clientName: 'Agnes Ochieng',    policyNumber: 'INS-3024', planType: 'Medical',  renewalAmount: 41000, dueDate: '2026-06-28', assignedAgent: 'Grace Wambui',  status: 'Upcoming' },

  // ── Contacted ───────────────────────────────────────────────────────────────
  { id: 'RNW-009', clientId: 'CLT-028', clientName: 'Joyce Akinyi',     policyNumber: 'INS-3028', planType: 'Property', renewalAmount: 81000, dueDate: '2026-07-19', assignedAgent: 'Grace Wambui',  status: 'Contacted' },
  { id: 'RNW-010', clientId: 'CLT-049', clientName: 'Stephen Mutua',    policyNumber: 'INS-3049', planType: 'Property', renewalAmount: 99000, dueDate: '2026-07-21', assignedAgent: 'Sarah Kamau',   status: 'Contacted' },
  { id: 'RNW-011', clientId: 'CLT-010', clientName: 'Esther Adhiambo',  policyNumber: 'INS-3010', planType: 'Life',     renewalAmount: 67000, dueDate: '2026-07-28', assignedAgent: 'John Mwangi',   status: 'Contacted' },
  { id: 'RNW-012', clientId: 'CLT-032', clientName: 'Beatrice Wamuyu',  policyNumber: 'INS-3032', planType: 'Medical',  renewalAmount: 44000, dueDate: '2026-08-09', assignedAgent: 'Grace Wambui',  status: 'Contacted' },
  { id: 'RNW-013', clientId: 'CLT-014', clientName: 'Lydia Kimani',     policyNumber: 'INS-3014', planType: 'Life',     renewalAmount: 71000, dueDate: '2026-08-14', assignedAgent: 'John Mwangi',   status: 'Contacted' },
  { id: 'RNW-014', clientId: 'CLT-022', clientName: 'Deborah Mugo',     policyNumber: 'INS-3022', planType: 'Life',     renewalAmount: 64000, dueDate: '2026-08-18', assignedAgent: 'John Mwangi',   status: 'Contacted' },
  { id: 'RNW-015', clientId: 'CLT-001', clientName: 'James Kamau',      policyNumber: 'INS-3001', planType: 'Medical',  renewalAmount: 48000, dueDate: '2026-09-15', assignedAgent: 'Sarah Kamau',   status: 'Contacted' },

  // ── Reviewing ───────────────────────────────────────────────────────────────
  { id: 'RNW-016', clientId: 'CLT-005', clientName: 'David Kiprop',     policyNumber: 'INS-3005', planType: 'Property', renewalAmount: 75000, dueDate: '2026-08-30', assignedAgent: 'Grace Wambui',  status: 'Reviewing' },
  { id: 'RNW-017', clientId: 'CLT-011', clientName: 'Samuel Mutua',     policyNumber: 'INS-3011', planType: 'Medical',  renewalAmount: 51000, dueDate: '2026-09-03', assignedAgent: 'Peter Otieno',  status: 'Reviewing' },
  { id: 'RNW-018', clientId: 'CLT-025', clientName: 'Simon Kariuki',    policyNumber: 'INS-3025', planType: 'Life',     renewalAmount: 59000, dueDate: '2026-10-05', assignedAgent: 'Sarah Kamau',   status: 'Reviewing' },
  { id: 'RNW-019', clientId: 'CLT-007', clientName: 'Joseph Omondi',    policyNumber: 'INS-3007', planType: 'Life',     renewalAmount: 58000, dueDate: '2026-10-12', assignedAgent: 'Peter Otieno',  status: 'Reviewing' },
  { id: 'RNW-020', clientId: 'CLT-012', clientName: 'Miriam Wairimu',   policyNumber: 'INS-3012', planType: 'Property', renewalAmount: 88000, dueDate: '2026-11-17', assignedAgent: 'Grace Wambui',  status: 'Reviewing' },
  { id: 'RNW-021', clientId: 'CLT-020', clientName: 'Naomi Wambui',     policyNumber: 'INS-3020', planType: 'Medical',  renewalAmount: 45000, dueDate: '2026-11-30', assignedAgent: 'Grace Wambui',  status: 'Reviewing' },

  // ── Approved ────────────────────────────────────────────────────────────────
  { id: 'RNW-022', clientId: 'CLT-008', clientName: 'Ruth Waweru',      policyNumber: 'INS-3008', planType: 'Medical',  renewalAmount: 46000, dueDate: '2026-12-05', assignedAgent: 'Grace Wambui',  status: 'Approved' },
  { id: 'RNW-023', clientId: 'CLT-015', clientName: 'Michael Gacheru',  policyNumber: 'INS-3015', planType: 'Motor',    renewalAmount: 38000, dueDate: '2026-10-29', assignedAgent: 'Peter Otieno',  status: 'Approved' },
  { id: 'RNW-024', clientId: 'CLT-017', clientName: 'Paul Ndungu',      policyNumber: 'INS-3017', planType: 'Life',     renewalAmount: 55000, dueDate: '2026-12-22', assignedAgent: 'Sarah Kamau',   status: 'Approved' },
  { id: 'RNW-025', clientId: 'CLT-041', clientName: 'Kevin Gitau',      policyNumber: 'INS-3041', planType: 'Property', renewalAmount: 86000, dueDate: '2026-12-09', assignedAgent: 'Sarah Kamau',   status: 'Approved' },
  { id: 'RNW-026', clientId: 'CLT-047', clientName: 'Quincy Wambui',    policyNumber: 'INS-3047', planType: 'Medical',  renewalAmount: 50000, dueDate: '2026-11-13', assignedAgent: 'Peter Otieno',  status: 'Approved' },

  // ── Renewed ─────────────────────────────────────────────────────────────────
  { id: 'RNW-027', clientId: 'CLT-040', clientName: 'Janet Auma',       policyNumber: 'INS-3040', planType: 'Medical',  renewalAmount: 52000, dueDate: '2026-08-26', assignedAgent: 'Grace Wambui',  status: 'Renewed' },
  { id: 'RNW-028', clientId: 'CLT-046', clientName: 'Priscilla Maina',  policyNumber: 'INS-3046', planType: 'Life',     renewalAmount: 65000, dueDate: '2026-09-28', assignedAgent: 'John Mwangi',   status: 'Renewed' },
  { id: 'RNW-029', clientId: 'CLT-019', clientName: 'Moses Kinyua',     policyNumber: 'INS-3019', planType: 'Property', renewalAmount: 92000, dueDate: '2026-09-07', assignedAgent: 'Peter Otieno',  status: 'Renewed' },
  { id: 'RNW-030', clientId: 'CLT-002', clientName: 'Mary Wanjiku',     policyNumber: 'INS-3002', planType: 'Life',     renewalAmount: 62000, dueDate: '2026-11-20', assignedAgent: 'John Mwangi',   status: 'Renewed' },
  { id: 'RNW-031', clientId: 'CLT-038', clientName: 'Hilda Wanjiru',    policyNumber: 'INS-3038', planType: 'Life',     renewalAmount: 61000, dueDate: '2026-11-24', assignedAgent: 'John Mwangi',   status: 'Renewed' },
  { id: 'RNW-032', clientId: 'CLT-003', clientName: 'Peter Ochieng',    policyNumber: 'INS-3003', planType: 'Motor',    renewalAmount: 35000, dueDate: '2027-01-08', assignedAgent: 'Peter Otieno',  status: 'Renewed' },
]
