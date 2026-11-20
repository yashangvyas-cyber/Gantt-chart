// Report widget pieces — COPIED from Reports › Deal Analytics (modules/reports/dom/yop_deal_analytics.html): widget card + header with ⓘ,
// widget table (sortable head = the real <th> of cc/DataTable), "No Data Available" block, the recharts legend markup.
// Moved from prototypes/helpdesk-ticketing/src/components/reports/kit.jsx (18 Nov 2026); the helpdesk metrics, charts and drill-down stay there.
// DIVERGES: the sorted column's arrow (icon-arrow-narrow-down / -up in gray-600) — no capture shows a sorted report column.
import InfoTip from './InfoTip.jsx'

export const T = '2xl:text-sm 2xl-to-xl:text-xs text-xs'

export function Widget({ title, info, right, span, children }) {
  const card = (
    <div className="h-full bg-white rounded-lg border border-gray-200">
      <div className="border-b border-gray-200 2xl:min-h-[60px] 2xl-to-xl:min-h-[46px] min-h-[46px] flex items-center">
        <div className="grow flex justify-between px-4">
          <div className="flex items-center gap-x-1 font-semibold text-gray-900">
            <span className="text-sm 3xl:text-base 2xl-to-xl:text-sm">{title}</span>
            {info && <InfoTip text={info} />}
            <div />
          </div>
          {right && <div className="flex items-center gap-2">{right}</div>}
        </div>
      </div>
      <div className="flex flex-col">{children}</div>
    </div>
  )
  return span ? <div className={span === 2 ? 'lg:col-span-2' : 'xl:col-span-2'}>{card}</div> : card
}
export const Pad = ({ children }) => <div className="2xl:p-4 2xl-to-xl:p-3 p-3">{children}</div>

export function NoData({ text = 'No Data Available' }) {
  return (
    <div className="h-full flex items-center flex-col"><div className="h-full text-base font-medium text-gray-900 flex flex-col items-center justify-center">
      <div className="flex items-center justify-center relative"><div className="p-8 rounded-full bg-gray-100"><span className="icon-clipboard-x flex items-center justify-center text-[40px] text-gray-500" /></div></div>
      <div className="flex items-center justify-center flex-col"><p className="pb-6 pt-5 text-gray-900 font-semibold 2xl:text-sm 2xl-to-xl:text-xs text-xs z-[1]"><span className="text-sm text-gray-600 font-normal">{text}</span></p></div>
    </div></div>
  )
}

const TH = '2xl:py-3 2xl-to-xl:py-1.5 py-1.5 2xl:px-6 2xl-to-xl:px-4 px-4 whitespace-nowrap 2xl:text-sm 2xl-to-xl:text-xs text-xs font-medium text-gray-600 text-left bg-gray-50 sticky top-0'
const TD = 'whitespace-nowrap 2xl:text-sm 2xl-to-xl:text-xs text-xs text-gray-600 text-left 2xl:py-3 2xl-to-xl:py-1.5 py-1.5 2xl:px-6 2xl-to-xl:px-4 px-4'
// sort (BA 6 Oct: "sort by clicking the column, like every CollabCRM list"): heads may be { label, key }; sort = { key, desc }; onSort(key).
// The header markup is the Help Center list's real sortable <th> (cc/DataTable): label + `text-gray-300 text-base icon-sort ml-1`;
// the sorted column shows its direction with the real `icon-arrow-narrow-down` / `-up` in gray-600 (icon-sort-down has no glyph in the
// icon font). DIVERGES: the arrow + gray-600 on the sorted column.
export function WidgetTable({ heads, rows, onRow, empty, max = 'max-h-[370px]', numbered = true, sort, onSort }) {
  if (!rows.length) return <NoData text={empty} />
  const head = (h) => {
    if (!h || typeof h !== 'object' || !h.key) return h
    const on = sort?.key === h.key
    return (
      <div className="flex">
        <span className="self-center">{h.label}</span>
        <div className="flex items-center"><span className={`${on ? 'text-gray-600' : 'text-gray-300'} text-base ${on ? (sort.desc ? 'icon-arrow-narrow-down' : 'icon-arrow-narrow-up') : 'icon-sort'} ml-1`} /></div>
      </div>
    )
  }
  return (
    <div className="inline-block w-full align-middle"><div className={`overflow-auto ${max}`}>
      <table className="min-w-full divide-y divide-gray-200 bg-gray-200 tableSticky">
        <thead><tr>{numbered && <th className={`${TH} w-[1%]`}>No.</th>}{heads.map((h, i) => <th key={i} className={`${TH}${h?.key ? ' cursor-pointer' : ''}`} onClick={h?.key ? () => onSort?.(h.key) : undefined}>{head(h)}</th>)}</tr></thead>
        <tbody className="divide-y divide-[#EAEAEA] bg-white">
          {rows.map((r, i) => (
            <tr key={i} className="h-[65px] hover:bg-gray-50 group" onClick={onRow ? () => onRow(i) : undefined} style={onRow ? { cursor: 'pointer' } : undefined}>
              {numbered && <td className={TD}><p className="text-gray-600 max-w-[160px] truncate font-medium line-clamp-1">{i + 1}</p></td>}
              {r.map((c, j) => <td key={j} className={TD}>{j === 0 ? <span className=" font-medium"><p className="max-w-56 w-fit truncate">{c}</p></span> : <div className="max-w-56 truncate">{c}</div>}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div></div>
  )
}
// a number that opens a drill-down / link
export const Num = ({ children, onClick, color }) => <a className={`${T} text-indigo-700 font-semibold`} style={color ? { color } : undefined} onClick={(e) => { e.stopPropagation(); onClick?.() }}>{children}</a>
export const Legend = ({ items, flat }) => (
  <ul className={flat ? 'flex justify-end space-x-4' : 'flex justify-end space-x-4 mb-8'}>
    {items.map(([label, color]) => <li key={label} className="flex items-center"><span className="w-2 h-2 block rounded-full mr-1" style={{ backgroundColor: color }} /><span className="text-xs text-slate-600">{label}</span></li>)}
  </ul>
)
