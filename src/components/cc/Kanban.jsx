// COPIED from Project Management › Tasks › Board (modules/project-mgmt/dom/issue_board.html): the scrolling grid of columns, the column box
// (bg-gray-200, min-w-[362px], border-gray-300), its white header with the colour dot + name + count chip (dot / chip colours inline, as the
// real board sets them), and the card (title h2, avatar, priority chip, "|", key link). The CSS-module classes (_Container_…) are kept verbatim.
// Moved from prototypes/helpdesk-ticketing/src/components/super/Kanban.jsx (18 Nov 2026), made general: no ticket data inside.
// DIVERGES: "Show N more", the drop highlight and fit = true (columns share the page width) are new (no capture). Drag & drop = HTML5 (the real board uses dnd-kit).
//
// columns = [{ key, label, color: 'rgb(…)' }]   rows = any records   colOf(row) = its column key
// card(row) = { id, title, icon?, iconTitle?, sub?, subIcon?, subTitle?, person?: { first_name, last_name }, people?: [person…], priority?: 'high'|'medium'|'low',
//               code?, type?: { icon, title }, done?: true (key struck through, as on a Closed card), menu?: true (the ⋯ that shows on hover) }
// headerActions = true: PM › Board style — the column's + (Create Issue), ⋮ (Actions), hidden quick-create form, first card pt-0, card's sub-issue strip,
//   and the hidden "add a status column" box at the start of the grid.
// 18 Nov 2026 (graph step 5): people, type, done, menu, subTitle, headerActions COPIED from issue_board.html; all optional, old calls render as before.
// onOpen(row)   move(row, key) after a drop   allowed(row, key) → may it be dropped there (default: yes)
import { useState } from 'react'

const PRIO = { high: 'text-sm icon-chevron-up text-red-400', medium: 'text-sm icon-equal text-warning-400', low: 'text-sm icon-chevron-down text-violet-600' }
const BG = ['bg-primary-500', 'bg-error-500', 'bg-warning-500', 'bg-success-500']        // the real avatar colours on board cards
// primary = the app's indigo rgb(68, 76, 231), read off staging; inline too, for themes with no `primary` scale
const BG_RGB = ['rgb(68, 76, 231)', 'rgb(240, 68, 56)', 'rgb(247, 144, 9)', 'rgb(23, 178, 106)']
const initials = (p) => `${p.first_name?.[0] || ''}${p.last_name?.[0] || ''}`.toUpperCase()
const nm = (p) => `${p.first_name || ''} ${p.last_name || ''}`.trim()
const rgba = (rgb, a) => rgb.replace('rgb(', 'rgba(').replace(')', `, ${a})`)
const PAGE = 25

function Avatar({ a, i, first }) {
  return <div className="relative"><div title={nm(a)} className={`relative flex-shrink-0 2xl:w-6 2xl-to-xl:w-5 w-5 2xl:h-6 2xl-to-xl:h-5 h-5 cursor-pointer transition-transform duration-200 ease-in-out ${first ? 'ml-0' : '-ml-2'} hover:scale-110 hover:z-20`}>
    <div style={{ backgroundColor: BG_RGB[i % BG.length] }} className={`w-full h-full flex items-center justify-center text-white 2xl:text-xxs 2xl-to-xl:text-[8px] text-[8px] font-semibold rounded-full pt-[1px] border border-white shadow-md ${BG[i % BG.length]}`}>{initials(a)}</div>
  </div></div>
}

function Card({ c, onOpen, onDrag, first, pm }) {
  const a = c.person
  const ppl = c.people || (a ? [a] : [])
  const i = (a?.first_name || '').length % BG.length
  return (
    <div className={pm && first ? 'px-1 pt-0' : 'px-1 pt-1'}>
      <li className="_Wrapper_vful1_21"><div className="_Item_vful1_40">
        <div draggable onDragStart={(e) => { e.dataTransfer.setData('text/plain', c.id); onDrag() }} onDragEnd={() => onDrag(null)} onClick={onOpen}
          className="relative rounded-[5px] shadow-sm select-none w-full max-w-md group border bg-white hover:bg-blueDark-25 hover:border-indigo-200 cursor-pointer border-gray-200">
          <a className="cursor-pointer"><div className="2xl:p-4 2xl-to-xl:p-3 p-3">
            {c.menu && <div className="absolute top-1 opacity-0 pointer-events-none right-1 bg-white 2xl:size-9 2xl-to-xl:size-7 size-7 rounded-md m-1 flex items-center justify-center shadow-custom-black cursor-pointer group-hover:opacity-100 group-hover:pointer-events-auto"><span className="icon-dots-horizontal text-gray-500 2xl:text-2xl 2xl-to-xl:text-xl text-xl" /></div>}
            <div className="flex items-start gap-1.5">
              {c.icon && <span title={c.iconTitle} className={`${c.icon} text-gray-500 text-sm leading-5 shrink-0`} />}
              <h2 className="2xl:text-sm 2xl-to-xl:text-xs text-xs font-medium w-full text-gray-700 whitespace-break-spaces break-words">{c.title}</h2>
            </div>
            {(c.sub || c.late) && (
              <div className="flex justify-between gap-2 mt-3">
                <div className="flex items-center justify-center text-gray-500 2xl:text-sm 2xl-to-xl:text-xs text-xs font-medium">
                  {c.sub && <><span className={`icon-${c.subIcon || 'building-07'} text-base mx-1.5 cursor-pointer text-gray-500`} title={c.subTitle} /><p className="text-xs text-gray-500" title={c.subTitle || c.sub}>{c.sub}</p></>}
                </div>
                <div className="h-[22px] text-xs flex items-center">{c.late && <span className="text-error-500">{c.late}</span>}</div>
              </div>
            )}
            <div className="mt-3 flex items-center justify-between">
              <div className="relative inline-block"><div><div className="flex items-center relative">
                {ppl.length ? ppl.map((p, k) => <Avatar key={k} a={p} i={c.people ? k : i} first={k === 0} />) : <p className="text-xs text-gray-500">Unassigned</p>}
              </div></div></div>
              <div className="flex justify-between items-center">
                {c.priority && <div className="relative inline-block"><div title={`${c.priority[0].toUpperCase() + c.priority.slice(1)} Priority`} className="inline-flex items-center gap-1.5 cursor-pointer rounded-md border transition-colors px-1 py-0.5 border-gray-200 bg-gray-50 hover:bg-gray-100 hover:border-gray-300"><span className={PRIO[c.priority]} /></div></div>}
                {c.code && <><span className="text-gray-500 text-xxs pt-[1px] ms-[5px] me-2">|</span>
                  {c.type && <span title={c.type.title} className={`mr-1 2xl:text-base 2xl-to-xl:text-xs text-xs ${c.type.icon}`} />}
                  <div className="text-gray-500 text-xs ml-1 flex items-center justify-center gap-1"><a className={c.done ? 'hover:text-indigo-700 font-medium line-through hover:line-through' : 'hover:text-indigo-700 hover:underline font-medium'}><span className="hover:underline 2xl:text-sm 2xl-to-xl:text-xs text-xs">{c.code}</span></a></div></>}
              </div>
            </div>
            {pm && <div className="overflow-scroll scrollbar-hide transition-[max-height,margin] duration-500 ease-in-out max-h-0" />}
          </div></a>
        </div>
      </div></li>
    </div>
  )
}

export default function Kanban({ columns, rows, colOf = (r) => r.status, card, onOpen, move, allowed = () => true, fit = false, headerActions = false }) {
  const [drag, setDrag] = useState(null)
  const [over, setOver] = useState(null)
  const [more, setMore] = useState({})
  return (
    <div className="w-full overflow-x-auto cursor-default">
      <div className={fit ? 'grid box-border p-2 ps-0 gap-2' : 'inline-grid box-border p-2 ps-0 gap-2 grid-flow-col'} style={fit ? { gridTemplateColumns: `repeat(${columns.length}, minmax(180px, 1fr))` } : undefined}>
        {headerActions && <div id="new-create-issue-list">{/* hidden "add a status column" box, first in the grid (issue_board.html) */}
          <div className="flex flex-col overflow-hidden !outline-none h-full rounded-lg transition-all transform w-0 scale-90 opacity-0 border border-none bg-transparent">
            <div className="bg-white flex items-center gap-2 px-2 py-1 outline-none cursor-default w-full">
              <div className="flex-1 rounded-[4px] px-2 py-1.5 border flex items-center border-gray-200 bg-gray-50">
                <input type="text" className="outline-none flex-1 font-semibold text-gray-900 2xl:!text-base 2xl-to-xl:!text-sm !text-sm bg-gray-50 me-1" max="35" defaultValue="" />
                <div className="relative"><div className="cursor-pointer border border-slate-400 border-none h-6 w-6 rounded-sm" style={{ background: 'rgb(43, 131, 222)' }} /></div>
              </div>
              <div className="flex items-center gap-1">
                <div className="z-1"><span className="icon-x border border-gray-300 rounded-lg bg-white flex items-center justify-center 2xl:text-xl text-lg cursor-pointer text-gray-400 h-6 w-6 !rounded-md" /></div>
                <div className="z-1"><span className="icon-check flex items-center justify-center rounded-lg text-white 2xl:text-xl text-lg relative bg-indigo-400 cursor-not-allowed h-6 w-6 !rounded-md" /></div>
              </div>
            </div>
            <ul className="bg-gray-200" />
          </div>
        </div>}
        {columns.map(({ key: k, label, color: c }) => {
          const list = rows.filter((r) => colOf(r) === k)
          const ok = drag && colOf(drag) !== k && allowed(drag, k)
          const n = more[k] || PAGE
          return (
            <div key={k}>
              <div onDragOver={(e) => { if (ok) { e.preventDefault(); setOver(k) } }} onDragLeave={() => setOver((o) => (o === k ? null : o))}
                onDrop={(e) => { e.preventDefault(); setOver(null); if (ok) move?.(drag, k); setDrag(null) }}
                style={{ opacity: drag && !ok && colOf(drag) !== k ? 0.5 : 1, outline: over === k ? `2px solid ${c}` : undefined }}
                className={`_Container_1hean_1 _scrollable_1hean_17 flex flex-col overflow-hidden bg-gray-200 !outline-none ${fit ? 'min-w-0' : 'min-w-[362px]'} h-full rounded-lg border border-gray-300`}>
                <div className="bg-white flex items-center justify-between 2xl:px-2 2xl-to-xl:px-1 px-1 2xl:py-1 2xl-to-xl:py-0.5 py-0.5 outline-none cursor-grab">
                  <div className="flex items-center gap-2"><div className="px-1 flex items-center justify-center gap-1">
                    <div className="2xl:size-2.5 2xl-to-xl:size-2 size-2 rounded-full" style={{ backgroundColor: c }} />
                    <p title={label} className="rounded py-2 px-2 mx-0.5 font-semibold max-w-[200px] truncate text-gray-900 2xl:text-base 2xl-to-xl:text-xs text-xs cursor-pointer hover:bg-gray-100">{label}</p>
                    <p title={String(list.length)} style={{ color: c, backgroundColor: rgba(c, 0.063), border: `1px solid ${rgba(c, 0.365)}` }} className="2xl:!py-0.5 2xl-to-xl:!py-0 !py-0 px-2 text-center 2xl:!text-xs 2xl-to-xl:!text-xxs !text-xxs w-fit font-semibold rounded-2xl cursor-pointer">{list.length}</p>
                  </div></div>
                  {headerActions && <div className="flex items-center justify-center cursor-pointer">
                    <div className="2xl:size-10 2xl-to-xl:size-8 size-8 flex items-center justify-center hover:bg-gray-100 rounded-md transition-all duration-300" title="Create Issue"><span className="icon-plus text-gray-700 text-lg" /></div>
                    <div className="relative" title="Actions"><div className="relative 2xl:size-10 2xl-to-xl:size-8 size-8 flex items-center justify-center hover:bg-gray-100 rounded-md transition-all duration-300"><span className="icon-dots-vertical text-gray-700 text-lg" /></div></div>
                  </div>}
                </div>
                {headerActions && <form className="overflow-hidden bg-gray-200 transition-all duration-300 ease-in-out h-0 opacity-0 scale-90">
                  <div className="w-full bg-white 2xl:p-4 2xl-to-xl:p-3 p-3 rounded-[5px] shadow-lg transform transition-transform duration-200 ease-out">
                    <div className="flex items-center 2xl:mt-4 2xl-to-xl:mt-3 mt-3">
                      <button type="button" className="outline-none disabled:cursor-not-allowed border disabled:opacity-100 hover:opacity-90 mr-2.5 2xl:py-1.5 2xl-to-xl:py-1 py-1 2xl:px-3.5 2xl-to-xl:px-2.5 px-2 2xl:text-sm 2xl-to-xl:text-xs text-xs bg-white border-gray-300 text-gray-700 font-semibold hover:!bg-gray-50 2xl:rounded-lg 2xl-to-xl:rounded-[5px] rounded-[5px]"><div className="flex items-center justify-center gap-2">Cancel</div></button>
                      <button type="submit" disabled className="outline-none font-semibold disabled:cursor-not-allowed border disabled:opacity-100 disabled:bg-indigo-200 border-transparent bg-indigo-600 text-white 2xl:py-1.5 2xl-to-xl:py-1 py-1 2xl:px-3.5 2xl-to-xl:px-2.5 px-2 2xl:text-sm 2xl-to-xl:text-xs text-xs 2xl:rounded-lg 2xl-to-xl:rounded-[5px] rounded-[5px]"><div className="flex items-center justify-center gap-2">Create</div></button>
                    </div>
                  </div>
                </form>}
                <ul className="bg-gray-200" style={{ maxHeight: 'calc(100vh - 360px)', minHeight: 120, overflowY: 'auto', paddingBottom: 4 }}>
                  {list.slice(0, n).map((r, x) => { const c2 = card(r); return <Card key={c2.id} c={c2} first={x === 0} pm={headerActions} onOpen={() => onOpen?.(r)} onDrag={(x) => setDrag(x === null ? null : r)} /> })}
                  {list.length > n && <div className="px-1 pt-1"><p className="font-semibold text-xs w-fit text-indigo-700 cursor-pointer hover:text-indigo-800" onClick={() => setMore((m) => ({ ...m, [k]: n + PAGE }))}>Show {Math.min(PAGE, list.length - n)} more of {list.length - n}</p></div>}
                </ul>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
