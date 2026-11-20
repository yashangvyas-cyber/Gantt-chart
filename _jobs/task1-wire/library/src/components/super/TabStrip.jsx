// The Open | Closed | Cancelled tab strip of modules/super-admin/dom/support_tickets.html, extended to N tabs.
// Exact strings from the capture: selected = `rounded-lg overflow-hidden text-white bg-indigo-700 <shape>`; unselected end tabs keep rounded-lg,
// the unselected middle tab drops it (`rounded-none`).
// DIVERGES: unselected FIRST tab and selected MIDDLE/LAST tab — the capture has 3 tabs; these combinations have no exact string, real pieces recombined.
const TAB = 'tab-transition font-semibold relative z-[20] whitespace-nowrap px-3.5 w-fit 2xl:text-sm 2xl-to-xl:text-xs text-xs text-center'
const cls = (on, first, last) => {
  const shape = first ? 'rounded-r-none' : last ? 'rounded-l-none' : 'rounded-none'
  if (on) return `${TAB} rounded-lg overflow-hidden text-white bg-indigo-700 ${shape} border-r py-2 active`
  return `${TAB} ${first || last ? 'rounded-lg ' : ''}overflow-hidden hover:text-white hover:bg-indigo-700 text-gray-500 ${shape} border-r py-2 active`
}

// tabs = [{ key, label }]
export default function TabStrip({ tabs, active, onChange }) {
  return (
    <div className="z-1"><div className="block"><div>
      <nav aria-label="Tabs" className="tab flex items-center relative overflow-auto rounded-lg border">
        {tabs.map((t, i) => (
          <a key={t.key} aria-current="page" onClick={() => onChange(t.key)} className={cls(t.key === active, i === 0, i === tabs.length - 1)}>{t.label}</a>
        ))}
      </nav>
    </div></div></div>
  )
}
