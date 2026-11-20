// COPIED: the list / grid switch in the list header of People › Business Unit (modules/people/dom/business_unit_list.html): two icon buttons,
// icon-list + icon-grid-01, the active one indigo. BA 8 Oct (#14): List ⇄ Kanban on the Support Tickets header, right side.
// DIVERGES: only the "list active" state is captured; the "grid active" state is the same two strings with the indigo classes moved over.
const ON_L = 'border border-r-0 border-indigo-200 text-indigo-700 bg-indigo-50 2xl:p-2 2xl-to-xl:py-1 py-1 min-h-8 transition-all min-w-8 rounded-lg rounded-r-none 2xl:text-xl 2xl-to-xl:text-lg text-lg flex justify-center items-center icon-list'
const OFF_G = 'text-gray-700 border 2xl:p-2 2xl-to-xl:py-1 py-1 min-h-8 rounded-lg min-w-8 transition-all rounded-l-none 2xl:text-xl 2xl-to-xl:text-lg text-lg flex justify-center items-center icon-grid-01'
const OFF_L = 'text-gray-700 border border-r-0 2xl:p-2 2xl-to-xl:py-1 py-1 min-h-8 transition-all min-w-8 rounded-lg rounded-r-none 2xl:text-xl 2xl-to-xl:text-lg text-lg flex justify-center items-center icon-list'
const ON_G = 'border border-indigo-200 text-indigo-700 bg-indigo-50 2xl:p-2 2xl-to-xl:py-1 py-1 min-h-8 rounded-lg min-w-8 transition-all rounded-l-none 2xl:text-xl 2xl-to-xl:text-lg text-lg flex justify-center items-center icon-grid-01'

export default function ViewSwitch({ view, onChange, labels = ['List', 'Kanban'] }) {
  return (
    <div className="rounded-lg flex items-center cursor-pointer">
      <span data-tooltip-id="list" title={labels[0]} onClick={() => onChange('list')} className={view === 'list' ? ON_L : OFF_L} />
      <span data-tooltip-id="grid" title={labels[1]} onClick={() => onChange('kanban')} className={view === 'list' ? OFF_G : ON_G} />
    </div>
  )
}
