// COPIED from the Priority cell of modules/admin/dom/helpdesk_add_ticket_drawer_2026-10-05.html
// high = icon-chevron-up text-red-500 · medium = icon-equal text-yellow-400 · low = icon-chevron-down text-violet-600 pt-0.5
const P = {
  high:   { label: 'High',   icon: 'icon-chevron-up text-lg text-red-500' },
  medium: { label: 'Medium', icon: 'icon-equal text-lg text-yellow-400' },
  low:    { label: 'Low',    icon: 'icon-chevron-down text-lg text-violet-600 pt-0.5' },
}

export default function PriorityIcon({ priority }) {
  const p = P[priority]
  if (!p) return null
  return (
    <div className="flex flex-row items-center">
      <span className={p.icon} />
      <span className="2xl:text-sm 2xl-to-xl:text-xs text-xs text-gray-700 font-normal ml-2">{p.label}</span>
    </div>
  )
}
