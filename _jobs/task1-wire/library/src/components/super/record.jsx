// Record page = CRM › Deals › Deal Details (modules/crm-invoice/dom/deals_id_details.html, spec docs/specs/crm-invoice__deals_id_details.md).
// A 280px panel of labelled fields (label above value) on the left, a tab bar with the page's buttons + stacked cards on the right.
// EVERY class string here is COPIED verbatim from that capture; the element it comes from is named on each line.
import { useEffect, useRef, useState } from 'react'
import { avatarSrc } from '../cc/Avatar.jsx'
import { tint } from './ui.jsx'

const T = '2xl:text-sm 2xl-to-xl:text-xs text-xs'

// ── left panel ───────────────────────────────────────────────────────────────────────────────
export const Panel = ({ children }) => (                                                  // the 280px panel
  <div className="bg-white border-r border-gray-200 h-full overflow-y-auto relative group min-w-[280px] max-w-[280px]"><div><div>{children}</div></div></div>
)

// "BLD-19" + "Won" pill, then the deal title
export const PanelHead = ({ id, pill, family, children }) => {
  const f = tint(family)
  return (
    <div className="2xl:gap-3 2xl-to-xl:gap-2 gap-2 flex 2xl:p-4 2xl-to-xl:p-3 p-3 flex-col border-b">
      <div className="flex items-center justify-between w-full">
        <div className="text-gray-800 font-semibold 2xl:text-xl 2xl-to-xl:text-base text-base">{id}</div>
        {pill && <p className="w-fit 2xl:text-xs 2xl-to-xl:text-xxs text-xxs border rounded-full 2xl:py-0.5 2xl-to-xl:py-0 py-0 px-2" style={{ borderColor: f.c, color: f.c, backgroundColor: f.b }}>{pill}</p>}
      </div>
      <div className="flex flex-col">{children}</div>
    </div>
  )
}
export const Subtitle = ({ children }) => <p className="text-gray-800 font-normal 2xl:text-sm 2xl-to-xl:text-xs text-xs break-words">{children}</p>

// the grey contact block (e-mail / company e-mail rows with an icon box and a copy icon)
export const Contacts = ({ children }) => <div className="bg-gray-25 border-b 2xl:p-4 2xl-to-xl:p-3 p-3 grid gap-3">{children}</div>
export const ContactRow = ({ icon, children, onCopy }) => (
  <div className="flex items-center justify-between">
    <div className="flex gap-2 items-center">
      <div className="2xl:p-2 2xl-to-xl:p-1 p-1 border flex items-center rounded-lg bg-white"><span className={`icon-${icon} 2xl:text-xl 2xl-to-xl:text-lg text-lg text-gray-700`} /></div>
      <div className="flex-1 max-w-[160px]"><div className="font-medium 2xl:text-sm 2xl-to-xl:text-xs text-xs text-gray-800 truncate whitespace-nowrap overflow-hidden text-ellipsis cursor-default" title={typeof children === 'string' ? children : undefined}>{children}</div><div /></div>
    </div>
    {onCopy && <span className="icon-copy-03 cursor-pointer 2xl:text-xl 2xl-to-xl:text-lg text-lg text-gray-400" onClick={onCopy} />}
  </div>
)

// one group of fields between two borders ("Deal Closing Date … Deal Client Type")
export const Section = ({ children }) => <div className="flex 2xl:p-4 2xl-to-xl:p-3 p-3 border-b flex-col gap-1.5">{children}</div>
// label above value. first = no top padding (pt-0), the next ones pt-4 — as in the capture
export const Label = ({ first, children }) => <p className={`text-[10px] 2xl:text-xs 2xl-to-xl:text-xxs text-gray-400 ${first ? 'pt-0' : 'pt-4'}`}>{children}</p>
export const Value = ({ children }) => <p className="text-gray-800 2xl:text-sm 2xl-to-xl:text-xs text-xs">{children}</p>
export const ValueBreak = ({ children }) => <p className="text-gray-800 2xl:text-sm 2xl-to-xl:text-xs text-xs break-all">{children}</p>      // "Deal Details"
export const LinkValue = ({ children, onClick }) => <a className="2xl:text-sm 2xl-to-xl:text-xs text-xs text-indigo-700 font-medium break-all truncate" onClick={onClick}>{children}</a>   // "Company"
// a label with a "+ Add" on its right ("Deal Tag", "Contact")
export const LabelAdd = ({ label, add, onAdd }) => (
  <div className="flex justify-between">
    <p className="text-gray-400 2xl:text-xs 2xl-to-xl:text-xxs text-xxs">{label}</p>
    {add && <p className="font-semibold text-xs w-fit text-indigo-700 cursor-pointer hover:text-indigo-800" onClick={onAdd}>{add}</p>}
  </div>
)
export const PlainLabel = ({ children }) => <p className="text-gray-400 2xl:text-xs 2xl-to-xl:text-xxs text-xxs">{children}</p>   // "Associated Lead", "Company"
// grey chips with ✕ ("Andrew Campbell ✕")
export const Chips = ({ children }) => <div className="flex gap-1 flex-wrap">{children}</div>
export const Chip = ({ children, onRemove }) => (
  <div className="max-w-full flex items-center 2xl:py-1 2xl-to-xl:py-0.5 py-0.5 px-1.5 w-fit rounded-md gap-1 bg-gray-100">
    <a className="text-gray-700 font-medium 2xl:text-sm 2xl-to-xl:text-xs text-xs hover:text-indigo-700 transition-all duration-300 whitespace-break-spaces line-clamp-1">{children}</a>
    {onRemove && <span className="icon-x text-sm text-gray-400 cursor-pointer hover:bg-error-300 hover:text-error-500" onClick={onRemove} />}
  </div>
)
// "Deal Owner": photo + "Name | Department" + designation
export const Person = ({ name, tag, sub }) => (
  <div className="grid grid-cols-[35px_1fr] gap-2 items-center">
    <div className="rounded-full overflow-hidden 2xl:h-[35px] 2xl-to-xl:h-7 h-7 2xl:w-[35px] 2xl-to-xl:w-7 w-7"><img src={avatarSrc(name)} alt={name} className="rounded-full object-cover 2xl:h-[35px] 2xl-to-xl:h-7 h-7 2xl:w-[35px] 2xl-to-xl:w-7 w-7" /></div>
    <div className="flex flex-col">
      <div className="flex"><p className="2xl:text-sm 2xl-to-xl:text-xs text-xs font-medium text-gray-900">{name}{tag && <> | <span className="text-indigo-700">{tag}</span></>}</p></div>
      {sub && <p className="2xl:text-sm 2xl-to-xl:text-xs text-xs font-normal text-gray-600">{sub}</p>}
    </div>
  </div>
)
// "Created by" / "Last Modified by": name + date
export const Stamp = ({ name, when }) => (
  <div className="inline-block w-[200px] break-all text-wrap line-clamp1 text-gray-800 font-normal 2xl:text-sm 2xl-to-xl:text-xs text-xs 2xl:mb-5 2xl-to-xl:mb-3 mb-3">
    <div className="capitalize 2xl:text-sm 2xl-to-xl:text-xs text-xs">
      <p className="truncate max-w-full 2xl:text-sm 2xl-to-xl:text-xs text-xs">{name}</p>
      <p className="2xl:text-sm 2xl-to-xl:text-xs text-xs block">{when}</p>
    </div>
  </div>
)

// ── right side ───────────────────────────────────────────────────────────────────────────────
export const Main = ({ children }) => <div className="w-[calc(100%-280px)]">{children}</div>
// tab bar: "Details | Interviews | … | History" + the "Edit Deal" slot on the right
export const TabBar = ({ tabs, active, onChange, children }) => (
  <div className="bg-white py-2 px-6 flex justify-between border-b items-center">
    <div className="block w-full">
      <nav className="scrollbar-hide tab flex gap-3 items-center relative overflow-x-auto overflow-y-hidden horizontal-scrollbar-hide scrollbar-hide">
        {tabs.map((t) => (
          <a key={t.key} onClick={() => onChange(t.key)}
            className={t.key === active
              ? 'text-indigo-700 bg-indigo-50 tab-transition font-semibold relative z-[20] whitespace-nowrap 2xl:py-2 2xl-to-xl:py-1.5 py-1.5 2xl:px-3 2xl-to-xl:px-2 px-2 w-max 2xl:text-sm 2xl-to-xl:text-xs text-xs text-center rounded-md active'
              : 'text-gray-500 tab-transition font-semibold relative z-[20] whitespace-nowrap 2xl:py-2 2xl-to-xl:py-1.5 py-1.5 2xl:px-3 2xl-to-xl:px-2 px-2 w-max 2xl:text-sm 2xl-to-xl:text-xs text-xs text-center rounded-md'}>
            <div className="flex items-center gap-x-2 justify-center w-full"><p>{t.label}</p></div>
          </a>
        ))}
      </nav>
    </div>
    {/* the Estimation card's own button row string — the capture has one button here, we have several */}
    {children && <div className="flex justify-between items-center w-fit gap-x-2">{children}</div>}
  </div>
)
// DIVERGES: the icon span is the bare `<span class="icon-plus">` of the real "Add Estimation" button with another icon name.
// an action button: the real "Submit Now" button (People › Config: grey outline, turns indigo-600 + white on hover) + an icon-*
// ⋮ menu — COPIED from Project Management's checklist "More Options" menu (modules/project-mgmt/api/convert_to_ticket_code_2026-10-06.json):
// trigger span, menu box and item strings are verbatim. DIVERGES: the real menu is portalled with computed top/left; here it opens under the button.
export function MoreActions({ items }) {
  const [open, setOpen] = useState(false); const box = useRef(null)
  useEffect(() => {
    if (!open) return undefined
    const out = (e) => { if (box.current && !box.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', out); return () => document.removeEventListener('mousedown', out)
  }, [open])
  return (
    <div ref={box} style={{ position: 'relative' }}>
      <span title="More Options" onClick={() => setOpen((x) => !x)} className="icon-dots-vertical 2xl:text-base 2xl-to-xl:text-sm text-sm p-1.5 rounded-lg inline-flex justify-center items-center overflow-hidden cursor-pointer transition-colors duration-150 border bg-white text-gray-500 shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] hover:!bg-gray-50" />
      {open && (
        <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: 4, minWidth: 200 }} className="z-[1000] bg-white rounded-xl border border-gray-100 shadow-[0px_12px_24px_-6px_rgba(16,24,40,0.14),0px_4px_8px_-2px_rgba(16,24,40,0.08)] p-1.5">
          {items.map(([icon, label, go]) => (
            <button key={label} type="button" onClick={() => { setOpen(false); go() }} className="w-full flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-gray-700 hover:!bg-gray-50 transition-colors duration-100">
              <span className={`icon-${icon} text-base text-gray-500`} /><span className="text-sm font-medium whitespace-nowrap">{label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export const Action = ({ icon, children, ...props }) => (
  <button type="button" {...props} className="outline-none font-semibold disabled:cursor-not-allowed disabled:opacity-100 hover:opacity-90 disabled:bg-indigo-200 whitespace-nowrap text-xs 2xl:px-2.5 2xl-to-xl:px-2 px-2 2xl:py-1.5 2xl-to-xl:py-1 py-1 border border-gray-300 rounded-md bg-transparent text-gray-600 shadow-sm hover:bg-indigo-600 hover:text-white transition-all duration-300">
    <div className="flex items-center justify-center gap-2"><span className={`icon-${icon}`} />{children}</div>
  </button>
)
export const Body = ({ children }) => (
  <div className="2xl:h-[calc(100vh-152px)] 2xl-to-xl:h-[calc(100vh-135px)] h-[calc(100vh-135px)] overflow-auto 2xl:p-4 p-2"><div className="2xl:space-y-4 space-y-2">{children}</div></div>
)
// "Follow-Ups" card: big title, optional right slot, body. With onToggle it folds like the real one: `<span class="text-xl icon-chevron-up text-gray-400">`
// in the right slot (chevron-down when folded). DIVERGES: the header drops its border-b while folded (the capture only shows it open).
export const Card = ({ title, right, children, open = true, onToggle }) => (
  <div className="rounded-lg bg-white border border-gray-200 overflow-hidden">
    <div onClick={onToggle} className={`flex items-center justify-between gap-x-3 2xl:p-4 2xl-to-xl:p-2 p-2 2xl:pl-3 2xl-to-xl:pl-3 pl-3 cursor-pointer${open ? ' border-b' : ''}`}>
      <div className="flex gap-x-2.5 items-center"><p className="font-semibold 2xl:text-lg 2xl-to-xl:text-base text-base text-gray-900">{title}</p></div>
      {(right || onToggle) && <div className="flex justify-between items-center w-fit gap-x-4">{right}{onToggle && <span className={`text-xl ${open ? 'icon-chevron-up' : 'icon-chevron-down'} text-gray-400`} />}</div>}
    </div>
    {open && children}
  </div>
)
// "Rule Configuration" card: grey header with an h3, padded body
export const SubCard = ({ title, right, children }) => (
  <div className="bg-white border rounded-lg mb-3 last:mb-0 border-gray-200">
    <div className="flex items-center justify-between border-b 2xl:p-4 2xl-to-xl:p-3 p-3 rounded-t-lg bg-gray-25 border-gray-200 ">
      <h3 className="font-semibold text-gray-900 2xl:text-base 2xl-to-xl:text-sm text-xs">{title}</h3>
      {right}
    </div>
    <div className="2xl:p-4 2xl-to-xl:p-3 p-3">{children}</div>
  </div>
)
// "New Date/Time" label + "-" value of the Rule Configuration card
export const FormLabel = ({ children }) => <label className="label capitalize">{children}</label>
export const PreValue = ({ children }) => <div className="whitespace-pre-wrap font-normal mt-1 block 2xl:text-sm 2xl-to-xl:text-xs text-xs">{children}</div>
// "No Follow-Ups Found"
export const Empty = ({ children }) => <div className="p-2.5 flex justify-center items-center bg-white"><p className={`font-medium text-gray-900 ${T}`}>{children}</p></div>
