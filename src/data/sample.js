// KIT sample data, only for the kit pages. Replace it with your screen's real API fields (modules/<module>/API.md, _api/FIELD-GLOSSARY.md).
export const STATUS = { open: ['Open', 'Open', 'indigo'], waiting: ['Waiting on Customer', 'Waiting on Customer', 'warning'], resolved: ['Resolved', 'Resolved', 'success'], closed: ['Closed', 'Closed', 'success'], cancelled: ['Cancelled', 'Cancelled', 'error'] }
export const moduleLabel = (m) => m
const NAMES = [['Bansari', 'Thakkar'], ['Pooja', 'Shah'], ['Kartik', 'Mehta'], ['Smit', 'Patel']]
const KEYS = Object.keys(STATUS)
export const SEED = Array.from({ length: 24 }, (_, i) => ({
  id: i + 1, ticket_id: `REC-${String(i + 1).padStart(4, '0')}`, subject: `Sample subject ${i + 1}`, module: ['People', 'CRM', 'Payroll'][i % 3],
  status: KEYS[i % KEYS.length], priority: ['high', 'medium', 'low'][i % 3],
  requested_by_details: { first_name: NAMES[i % 4][0], last_name: NAMES[i % 4][1] }, created_at: new Date(2026, 9, 1 + (i % 7), 10 + (i % 8), 15).toISOString(),
}))
