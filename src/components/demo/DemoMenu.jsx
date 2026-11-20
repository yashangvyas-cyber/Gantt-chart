// DIVERGES: PROTOTYPE ONLY — not a CollabCRM control, so there is no real string to copy. Made general from
// prototypes/helpdesk-ticketing/src/role.jsx (RoleSwitch). Dashed border = "not part of the product".
// Goes in the shell's topRight slot only (kit rule 4):  <AppShell topRight={<DemoMenu />}>  ·  <SuperShell topRight={<DemoMenu />}>
// Menu: "Viewing as" grouped by side · open a person in a new tab (?as=) · Show notes · Reset demo data.
// Inner pieces reuse kit components: Toggle (cc/Toggle.jsx) and askConfirm (ConfirmDialog.jsx).
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { askConfirm } from '../ConfirmDialog.jsx'
import Toggle from '../cc/Toggle.jsx'
import { demoConfig, fullName, resetDemo, setNotes, setViewer, tabPinned, useNotes, useViewer } from './demo.js'

export default function DemoMenu() {
  const me = useViewer(); const notes = useNotes(); const nav = useNavigate()
  const [open, setOpen] = useState(false); const box = useRef(null)
  useEffect(() => {
    if (!open) return
    const out = (e) => { if (box.current && !box.current.contains(e.target)) setOpen(false) }
    const esc = (e) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('mousedown', out, true); document.addEventListener('keydown', esc)
    return () => { document.removeEventListener('mousedown', out, true); document.removeEventListener('keydown', esc) }
  }, [open])
  if (!me) return null
  const { sides, resetMessage } = demoConfig()
  const pick = (u) => { setOpen(false); setViewer(u.as); nav(u.home) }
  const newTab = (u) => window.open(`/?as=${encodeURIComponent(u.as)}`, '_blank')
  const reset = async () => {
    setOpen(false)
    if (await askConfirm({ title: 'Reset demo data?', message: resetMessage || 'Everything goes back to the starting demo data, in every open tab.', confirmLabel: 'Reset', cancelLabel: 'Keep' })) resetDemo()
  }
  return (
    <div ref={box} className="relative">
      <button type="button" onClick={() => setOpen((v) => !v)} aria-haspopup="menu" aria-expanded={open}
        className={`inline-flex items-center gap-2 rounded-lg border border-dashed 2xl:h-10 2xl-to-xl:h-8 h-8 pl-1.5 pr-2.5 2xl:text-sm 2xl-to-xl:text-xs text-xs ${open ? 'border-indigo-400 bg-indigo-50' : 'border-gray-300 bg-white hover:border-gray-400'}`}>
        <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-700">Demo</span>
        <span className="text-gray-500">Viewing as</span>
        <span className="font-semibold text-gray-900">{me.label}</span>
        {notes && <span title="Notes are on" className="size-1.5 rounded-full bg-indigo-600" />}
        <span className={`icon-chevron-down text-gray-500 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div role="menu" className="absolute right-0 top-full z-[80] mt-2 w-80 rounded-lg border border-gray-200 bg-white py-2 shadow-lg 2xl:text-sm 2xl-to-xl:text-xs text-xs">
          <p className="px-4 pb-2 text-gray-500">Prototype only — switch whose screens you see. In CollabCRM these are separate logins.</p>
          {sides.map((s, i) => (
            <div key={s.side}>
              <div className={`flex items-center justify-between px-4 pb-1 ${i ? 'mt-2 border-t border-gray-100 pt-3' : 'pt-1'}`}>
                <span className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">{s.side}</span>
                {s.note && <span className="text-[11px] text-gray-400">{s.note}</span>}
              </div>
              {s.users.map((u) => {
                const on = u.as === me.as
                return (
                  <div key={u.as} className={`group flex items-center gap-1 pr-2 ${on ? 'bg-indigo-50' : 'hover:bg-gray-50'}`}>
                    <button type="button" role="menuitemradio" aria-checked={on} onClick={() => pick(u)} className="flex min-w-0 flex-1 items-center gap-3 py-2 pl-4 text-left">
                      <span className={`icon-check w-4 shrink-0 ${on ? 'text-indigo-600' : 'invisible'}`} />
                      <span className="min-w-0 flex-1">
                        <span className={`block truncate font-medium ${on ? 'text-indigo-700' : 'text-gray-900'}`}>{fullName(u.person)}</span>
                        <span className="block text-gray-500">{u.label}</span>
                      </span>
                    </button>
                    <button type="button" onClick={() => newTab(u)} title={`Open ${fullName(u.person)} in a new tab (side by side)`}
                      className="shrink-0 rounded-md p-1.5 text-gray-400 opacity-0 hover:bg-gray-100 hover:text-gray-700 focus:opacity-100 group-hover:opacity-100">
                      <span className="icon-link-external-02" />
                    </button>
                  </div>
                )
              })}
            </div>
          ))}
          <div className="mt-2 border-t border-gray-100 pt-2">
            <div className="flex items-center justify-between px-4 py-2">
              <span>
                <span className="block font-medium text-gray-900">Show notes</span>
                <span className="block text-gray-500">Numbered pins explaining each screen</span>
              </span>
              <Toggle id="demo-notes" checked={notes} onChange={setNotes} />
            </div>
            <button type="button" onClick={reset} className="flex w-full items-center gap-3 px-4 py-2 text-left text-red-600 hover:bg-red-50">
              <span className="icon-refresh-cw-05" /> Reset demo data
            </button>
          </div>
          {tabPinned() && <p className="px-4 pt-2 text-[11px] text-gray-400">This tab was opened for one person (?as=); switching here changes only this tab.</p>}
        </div>
      )}
    </div>
  )
}
