import InfoTip from './InfoTip.jsx'
// COPIED from the "Total Tickets" card in modules/admin/dom/helpdesk_add_ticket_drawer_2026-10-05.html
// Put three or four of them in `grid grid-cols-3 gap-3 w-full 2xl:pb-5 pb-4`. `onAdd` shows the [+] button (only the first card has it).
// active = the card filters the list now; DIVERGES: it keeps its hover colours as an inline style (no "selected" card is captured)
export default function KpiCard({ label, value, onAdd, onClick, active }) {
  return (
    <div>
      <div role="button" tabIndex={0} onClick={onClick} style={active ? { borderColor: 'rgb(199, 215, 254)', backgroundColor: 'rgba(238, 244, 255, 0.6)' } : undefined}
        className="bg-white rounded-xl 2xl:px-6 2xl:py-5 2xl-to-xl:p-4 p-4 focus:outline-none focus-visible:outline-none border transition-colors cursor-pointer hover:border-indigo-200 hover:bg-indigo-50/60">
        <h3 className="text-gray-600 2xl:text-sm 2xl-to-xl:text-xs text-xs font-medium">{label}</h3>
        <div className="flex justify-between items-center mt-4">
          <div className="font-semibold 2xl:text-4xl 2xl-to-xl:text-2xl text-2xl truncate text-gray-900">{value}</div>
          {onAdd && (
            <div>
              <div onClick={(e) => { e.stopPropagation(); onAdd() }}>
                <span className="icon-plus 2xl:text-xl 2xl-to-xl:text-lg text-lg cursor-pointer 2xl:p-2 2xl-to-xl:p-1.5 p-1.5 rounded-lg border border-indigo-200 bg-indigo-50 text-indigo-700" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// The People › Employees stat card ("Active Employees / Confirmed / Intern …"), COPIED from modules/admin/dom/helpdesk_help_menu_2026-10-05.html.
// Six of them go in `grid grid-cols-6 gap-4 w-full pb-5 relative`. Click = filter the list below. icon: 'eye' (grey box, as "Intern"),
// 'check' (success box, as "Confirmed") or 'plus' (indigo box, as "Active Employees", with onAdd).
// DIVERGES: the picked card keeps its hover colours (border-indigo-200 / bg-indigo-50/60) as an inline style — no "selected" card is captured.
const STAT_ICON = {
  eye: 'icon-eye 2xl:text-xl 2xl-to-xl:text-lg text-lg 2xl:p-2 2xl-to-xl:p-1.5 p-1.5 rounded-lg border border-gray-300 cursor-pointer text-gray-700',
  check: 'icon-check-verified-02 2xl:text-xl 2xl-to-xl:text-lg text-lg cursor-pointer 2xl:p-2 2xl-to-xl:p-1.5 p-1.5 rounded-lg border border-success-300 bg-success-50 text-success-500',
  plus: 'icon-plus 2xl:text-xl 2xl-to-xl:text-lg text-lg 2xl:p-2 2xl-to-xl:p-1.5 p-1.5 rounded-lg border border-indigo-200 bg-indigo-50 text-indigo-700 cursor-pointer',
}
// sub = the small second line of the real first card ("(Available Licenses: 102)") — number + sub use that card's own strings
// tone (NEW, Gemini UX 6 Oct): 'red' | 'amber' tints the whole card when it needs attention (CollabCRM error / warning -25 / -200 family).
// spark (NEW): a small trend chart shown at the right of the label row.
const TONE_CARD = { red: 'bg-error-25 border-error-200', amber: 'bg-warning-25 border-warning-200', indigo: 'bg-indigo-25 border-indigo-200' }   // indigo = "you can act on this" (My day)
export function StatCard({ label, value, icon = 'eye', active, onClick, onAdd, sub, valueColor, info, tone, spark }) {
  return (
    <div className="h-full">
      <div role="button" tabIndex={0} onClick={onClick} style={active ? { borderColor: 'rgb(199, 215, 254)', backgroundColor: 'rgba(238, 244, 255, 0.6)' } : undefined}
        className={`2xl:px-6 2xl:py-5 2xl-to-xl:p-4 p-4 focus:outline-none focus-visible:outline-none h-full ${TONE_CARD[tone] || 'bg-white'} rounded-xl border transition-colors cursor-pointer hover:border-indigo-200 hover:bg-indigo-50/60`}>
        <h3 className={`text-gray-600 2xl:text-sm 2xl-to-xl:text-xs text-xs font-medium${info ? ' flex items-center gap-x-1' : ''}`}>{label}{info && <span onClick={(e) => e.stopPropagation()}><InfoTip text={info} className="icon-info-circle text-gray-400 align-text-top text-sm cursor-pointer ml-1" /></span>}</h3>
        <div className={sub != null ? 'flex justify-between items-center 2xl:mt-4 2xl-to-xl:mt-2.5 mt-2' : 'flex justify-between items-center mt-4'}>
          {sub != null
            ? <div className="flex flex-col gap-1 2xl-to-xl:gap-0.5 3xl:gap-2"><p className="2xl:leading-4 font-semibold 2xl:text-3xl 2xl-to-xl:text-2xl text-2xl" style={valueColor ? { color: valueColor } : undefined}>{value}</p><span className="2xl:text-xs 2xl-to-xl:text-[11px] text-[10px] text-gray-700">{sub}</span></div>
            : <div className="font-semibold 2xl:text-4xl 2xl-to-xl:text-2xl text-2xl truncate text-gray-900" style={valueColor ? { color: valueColor } : undefined}>{value}</div>}
          {icon === 'link'
            // FIX-LIST 24: a card that IS a link — no eye button; the queue link text (real text-indigo-700 font-semibold string)
            ? <span className="2xl:text-sm 2xl-to-xl:text-xs text-xs text-indigo-700 font-semibold">View tickets →</span>
            : icon === 'plus'
            ? <button onClick={(e) => { e.stopPropagation(); onAdd?.() }}><span className={STAT_ICON.plus} /></button>
            : icon === 'check' ? <span className={STAT_ICON.check} /> : <div><span className={STAT_ICON.eye} /></div>}
        </div>
        {spark && <div className="mt-2 flex items-center gap-2"><span className="text-[10px] text-gray-500 whitespace-nowrap">7 days</span><div className="flex-1">{spark}</div></div>}
      </div>
    </div>
  )
}
export const StatRow = ({ children }) => <div className="grid grid-cols-6 gap-4 w-full pb-5 relative">{children}</div>
