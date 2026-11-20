// DIVERGES: PROTOTYPE ONLY — never part of CollabCRM. Copied from prototypes/helpdesk-ticketing/src/components/Pin.jsx.
// A numbered pin beside an element while "Show notes" is on (Demo menu); click = its note. Off by default.
// The ONLY place BA notes may appear inside a prototype (brief v2, Rule 6). Notes live in DEMO.notes (src/data/demo.js):
//   notes: { E2: [{ title, source, rule, edge, real }] }   →   <Pin s="E2" n={1} />   (n is 1-based)
// Pin = the real count-pill string (indigo-200 / 50 / 700); the note panel is an inline-styled layer (no CollabCRM class pretends
// to be it) whose text uses the real record-panel label / value strings.
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { demoConfig, useNotes } from './demo.js'

const ROWS = [['source', 'Source'], ['rule', 'Rule'], ['edge', 'Edge cases'], ['real', 'Real or new']]

export default function Pin({ s, n }) {
  const on = useNotes()
  const [box, setBox] = useState(null)
  const ref = useRef(null)
  useEffect(() => {
    if (!box) return
    const close = (e) => { if (!e.target.closest?.('[data-note-panel]') && !ref.current?.contains(e.target)) setBox(null) }
    document.addEventListener('mousedown', close, true); return () => document.removeEventListener('mousedown', close, true)
  }, [box])
  const note = demoConfig().notes?.[s]?.[n - 1]
  if (!on || !note) return null
  const open = (e) => {
    e.stopPropagation(); e.preventDefault()
    const r = ref.current.getBoundingClientRect(); const w = 360
    setBox(box ? null : { left: Math.max(8, Math.min(r.left, window.innerWidth - w - 8)), top: r.bottom + 6 > window.innerHeight - 260 ? undefined : r.bottom + 6, bottom: r.bottom + 6 > window.innerHeight - 260 ? window.innerHeight - r.top + 6 : undefined, width: w })
  }
  return (
    <span ref={ref} onClick={open} title={`Note ${s}·${n}: ${note.title}`} style={{ display: 'inline-flex', verticalAlign: 'middle', margin: '0 4px', cursor: 'pointer', zIndex: 5, position: 'relative' }}>
      <span className="rounded-2xl border flex w-max font-medium items-center border-indigo-200 bg-indigo-50 text-indigo-700 2xl:!text-xs 2xl-to-xl:!text-xxs !text-xxs 2xl:!py-0.5 2xl-to-xl:!py-0 !py-0 py-0.5 px-2 text-xs">{s}·{n}</span>
      {box && createPortal(
        <div data-note-panel style={{ position: 'fixed', zIndex: 2000, ...box, background: '#fff', border: '1px solid #c7d7fe', borderRadius: 8, boxShadow: '0 10px 30px rgba(16,24,40,.18)', padding: 12, maxHeight: 420, overflowY: 'auto' }}>
          <p className="2xl:text-sm 2xl-to-xl:text-xs text-xs font-medium text-gray-900">{s} · {n}. {note.title}</p>
          {ROWS.map(([key, label]) => note[key] && (
            <div key={key}>
              <p className="text-[10px] 2xl:text-xs 2xl-to-xl:text-xxs text-gray-400 pt-4">{label}</p>
              <p className="text-gray-800 2xl:text-sm 2xl-to-xl:text-xs text-xs">{note[key]}</p>
            </div>
          ))}
        </div>, document.body)}
    </span>
  )
}
