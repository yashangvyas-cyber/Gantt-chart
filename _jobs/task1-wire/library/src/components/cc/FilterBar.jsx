// The list filter bar of People › Employees / Exit Management (FIX-LIST R2). COPIED, class strings verbatim, from
//   modules/admin/dom/helpdesk_help_menu_2026-10-05.html (the bar closed: "Filter Results..." + field menu + "Filter")
//   modules/people/dom/filterbar_last_working_date_03_field_picked / 05_next2_2026-09-25.html (a chip being built: field token, "Is" token, open menus)
// A chip = one grey box per part ("Status" · "Is not" · "Closed"), each part a white token. Menus are the real <ul>/<li> strings
// (highlighted item = `… bg-gray-100`). The ✕ in the w-8 box clears every chip; "Filter" applies the chips.
// NOT BUILT: the Σ select left of the bar (match all / any) — its options are not captured.
// DIVERGES: the per-chip ✕ is the real ✕ of the Deal Details tag chip (crm-invoice deals_id_details) — the captured bar only has clear-all.
// Logic: chips on the same field with "Is" are OR'ed, "Is not" chips all exclude; different fields are AND'ed. Typed text that is not a field
// LOOKUP ONLY (BA, 5 Oct): every field and every value is picked from a list. Typing only narrows the open list; Enter picks the top
// item. There is no free-text value — EXCEPT (BA 6 Oct) a field that lists 'Contains' in its own `ops` (Ticket ID, Subject): after
// Contains, whatever is typed becomes the value (Enter, or the 'Contains "…"' item); a field's `ops` default to Is / Is not.
import { useEffect, useRef, useState } from 'react'

const UL = 'absolute z-10 mt-2.5 left-0 rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none max-h-[300px] overflow-y-auto'
const LI = 'cursor-pointer 2xl:min-w-[260px] 2xl-to-xl:min-w-[200px] min-w-[200px] 2xl:text-sm 2xl-to-xl:text-xs text-xs font-medium whitespace-nowrap 2xl:px-3 2xl-to-xl:px-2.5 px-2.5 2xl:py-2 2xl-to-xl:py-1.5 py-1.5'
const TOKEN = '2xl:text-sm 2xl-to-xl:text-xs text-xs border border-gray-300 rounded py-0.5 px-1.5 bg-white text-gray-700 font-medium w-max'
const ICON = (i) => `icon-${i} text-gray-600 2xl:text-lg 2xl-to-xl:text-base text-base pe-2`
export const OPS = ['Is', 'Is not']

// one grey part box with its token (+ its own menu while open)
const Part = ({ children, menu }) => (
  <div className="w-max">
    <div className="w-full h-full flex items-start"><div className="flex items-center p-1 gap-0.5 bg-gray-100 rounded-md"><div className={TOKEN}>{children}</div></div></div>
    <div className="transition-opacity duration-500 scale-0 opacity-0">{menu}</div>
  </div>
)
const FieldName = ({ f }) => <span><div className="flex items-center"><span className={ICON(f.icon)} /><span>{f.label}</span></div></span>

export function matchChips(chips, fields, row) {
  const byField = {}
  chips.forEach((c) => { (byField[c.field] = byField[c.field] || []).push(c) })
  return Object.entries(byField).every(([key, cs]) => {
    const field = fields.find((f) => f.key === key); const v = field.get(row)
    const is = cs.filter((c) => c.op === 'Is').map((c) => c.value)
    const has = cs.filter((c) => c.op === 'Contains').map((c) => c.value.toLowerCase())
    const not = cs.filter((c) => c.op === 'Is not').map((c) => c.value)
    const pos = is.length || has.length ? is.includes(v) || has.some((h) => String(v ?? '').toLowerCase().includes(h)) : true   // Is / Contains are OR'ed
    return pos && !not.includes(v)
  })
}

export default function FilterBar({ fields, chips, onApply }) {
  const [draft, setDraft] = useState(chips)
  const [stage, setStage] = useState(null)          // null · { field } (pick op) · { field, op } (pick value)
  const [text, setText] = useState('')
  const [open, setOpen] = useState(false)
  const box = useRef(null)
  useEffect(() => setDraft(chips), [chips])
  useEffect(() => {
    const off = (e) => { if (box.current && !box.current.contains(e.target)) { setOpen(false); setStage(null) } }
    // capture phase: runs BEFORE React re-renders the menu (a picked item is removed from the DOM at once, so a bubbling
    // listener would see a detached target, treat it as an outside click and reset the bar — the "can't click the filter" bug)
    document.addEventListener('mousedown', off, true); return () => document.removeEventListener('mousedown', off, true)
  }, [])

  const fieldOf = (k) => fields.find((f) => f.key === k)
  const add = (chip) => { const next = [...draft, chip]; setDraft(next); setStage(null); setText(''); setOpen(false); onApply(next) }
  const remove = (i) => { const next = draft.filter((_, j) => j !== i); setDraft(next); onApply(next) }
  const shownFields = fields.filter((f) => f.label.toLowerCase().includes(text.trim().toLowerCase()))
  const q = text.trim().toLowerCase()
  const opsShown = (stage ? fieldOf(stage.field).ops || OPS : OPS).filter((o) => o.toLowerCase().includes(q))
  const free = stage?.op === 'Contains' && text.trim()
  const valuesShown = stage?.op ? fieldOf(stage.field).options.filter((o) => o.toLowerCase().includes(q)) : []
  const pickField = (f) => { setStage({ field: f.key }); setText('') }
  const pickOp = (o) => { setStage({ ...stage, op: o }); setText('') }
  const onKey = (e) => {
    if (e.key === 'Backspace' && !text && stage) { setStage(stage.op ? { field: stage.field } : null); return }
    if (e.key !== 'Enter') return
    e.preventDefault()                                     // Enter = the first item of the open list, never the typed text
    if (!stage) { if (shownFields[0]) pickField(shownFields[0]) }
    else if (!stage.op) { if (opsShown[0]) pickOp(opsShown[0]) }
    else if (free) add({ ...stage, value: text.trim() })
    else if (valuesShown[0]) add({ ...stage, value: valuesShown[0] })
  }

  // closed = the field list stays in the DOM, hidden by `scale-0 opacity-0` (as in the capture); open = the same wrapper with `opacity-100 scale-100`
  const none = <li className={LI}><span>No matching option</span></li>
  const fieldMenu = <ul className={UL}>{shownFields.length ? shownFields.map((f) => <li key={f.key} className={LI} onMouseDown={(e) => { e.preventDefault(); pickField(f) }}><FieldName f={f} /></li>) : none}</ul>
  let menu = null
  if (open && !stage) menu = fieldMenu
  else if (open && !stage.op) menu = <ul className={UL}>{opsShown.length ? opsShown.map((o, i) => <li key={o} className={i === 0 ? `${LI} bg-gray-100` : LI} onMouseDown={(e) => { e.preventDefault(); pickOp(o) }}><span>{o}</span></li>) : none}</ul>
  else if (open && stage.op === 'Contains') menu = <ul className={UL}>{free ? <li className={`${LI} bg-gray-100`} onMouseDown={(e) => { e.preventDefault(); add({ ...stage, value: text.trim() }) }}><span>Contains "{text.trim()}"</span></li> : <li className={LI}><span>Type any text, then press Enter</span></li>}
    {free && valuesShown.slice(0, 8).map((o) => <li key={o} className={LI} onMouseDown={(e) => { e.preventDefault(); add({ ...stage, op: 'Is', value: o }) }}><span>{o}</span></li>)}</ul>
  else if (open) menu = <ul className={UL}>{valuesShown.length ? valuesShown.map((o, i) => <li key={o} className={i === 0 ? `${LI} bg-gray-100` : LI} onMouseDown={(e) => { e.preventDefault(); add({ ...stage, value: o }) }}><span>{o}</span></li>) : none}</ul>

  return (
    <form ref={box} className="relative z-0 flex gap-2 p-2 border-x border-gray-200 responsive-filter" onSubmit={(e) => { e.preventDefault(); onApply(draft) }}>
      <div className="text-sm rounded-lg border border-gray-300 p-1 focus:ring-indigo-700 text-gray-800 bg-white flex w-full">
        <div className="flex w-full flex-wrap">
          <div className="flex gap-2 flex-wrap flex-grow pr-12">
            {draft.map((c, i) => (
              <div key={i} className="flex">
                <Part><FieldName f={fieldOf(c.field)} /></Part>
                <Part><span>{c.op}</span></Part>
                <Part><div className="flex items-center"><span>{c.value}</span><span className="icon-x text-sm text-gray-400 cursor-pointer hover:bg-error-300 hover:text-error-500" onClick={() => remove(i)} /></div></Part>
              </div>
            ))}
            <div className="rounded-md flex-grow flex">
              {stage && <Part><FieldName f={fieldOf(stage.field)} /></Part>}
              {stage?.op && <Part><span>{stage.op}</span></Part>}
              <div className="w-full">
                <div className="w-full h-full flex items-start">
                  <div className="flex items-center w-full">
                    {!stage && !draft.length && <span className="icon-search-lg text-xl text-gray-400 ms-2 me-1" />}
                    <input type="text" className="w-full 2xl:p-[7px] 2xl-to-xl:p-1 p-1 2xl:text-sm 2xl-to-xl:text-xs text-xs outline-none" placeholder={stage?.op === 'Contains' ? 'Type any text, then press Enter' : stage ? 'Type to find, then pick' : draft.length ? '' : 'Filter Results...'}
                      value={text} onChange={(e) => { setText(e.target.value); setOpen(true) }} onFocus={() => setOpen(true)} onClick={() => setOpen(true)} onKeyDown={onKey} />
                  </div>
                </div>
                <div className={menu ? 'transition-opacity duration-500 opacity-100 scale-100' : 'transition-opacity duration-500 scale-0 opacity-0'}>{menu || fieldMenu}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-8">
          {(draft.length > 0 || stage) && <div className="h-full flex items-center w-full px-1 cursor-pointer" onClick={() => { setDraft([]); setStage(null); setText(''); onApply([]) }}><span className="icon-x-close text-lg hover:bg-red-300 rounded-sm ms-1 hover:text-white" /></div>}
        </div>
      </div>
      <div>
        <button type="submit" className="outline-none font-semibold rounded-lg disabled:cursor-not-allowed disabled:opacity-100 py-2.5 px-4 bg-indigo-50 border border-indigo-200 text-indigo-700 disabled:bg-gray-100 disabled:text-gray-500 disabled:border-gray-400 2xl:text-sm 2xl-to-xl:text-xs text-xs 2xl:min-h-[42px] 2xl-to-xl:min-h-10 min-h-10 flex justify-center items-center">
          <div className="flex items-center justify-center gap-2">Filter</div>
        </button>
      </div>
    </form>
  )
}

// The list header + filter bar wrapper of People › Employees: title, "1 - 10 of 539 Employees" pill, buttons on the right; then the sticky grey band.
export function ListHead({ title, from, to, total, noun, children }) {
  return (
    <div className="2xl:py-4 2xl:px-5 2xl-to-xl:py-2 py-2 2xl-to-xl:px-3 px-3 bg-white sticky top-0 z-2 border rounded-tl-lg rounded-tr-lg border-gray-200 border-b after:absolute after:w-[calc(100%+16px)] after:h-4 after:-top-[18px] after:-left-2 after:bg-gray-100 after:-z-1">
      <div className="flex justify-between">
        <div className="flex gap-x-2.5 items-center">
          <p className="font-semibold text-gray-900 2xl:text-lg 2xl-to-xl:text-base text-base">{title}</p>
          <div className="rounded-2xl border flex w-max font-medium items-center border-indigo-200 bg-indigo-50 text-indigo-700 2xl:!text-xs 2xl-to-xl:!text-xxs !text-xxs 2xl:!py-0.5 2xl-to-xl:!py-0 !py-0 py-0.5 px-2 text-xs">
            <span><span className="font-bold">{from} - {to}</span><span className="font-medium"> of {total} {noun}</span></span>
          </div>
        </div>
        <div className="flex items-center gap-x-3">{children}</div>
      </div>
    </div>
  )
}
export const FilterBand = ({ children }) => (
  <>
    <div className="bg-gray-100 sticky -top-1 z-1 h-4 -mt-4 w-full" />
    <div className="bg-gray-200 sticky 2xl:top-[70px] 2xl-to-xl:top-[54px] top-[54px] z-1 border-l border-r">{children}</div>
  </>
)
