// COPIED from the "My Tickets / Assigned To Me" strip of modules/people/dom/rsp_tabs_support_ticket_view_01_view_request_2026-09-25.html
// (sliding indigo-600 pill). tabs = [{ key, label }]. The slider's width / offset are inline styles in the real DOM too.
import { useLayoutEffect, useRef, useState } from 'react'

export default function PillStrip({ tabs, active, onChange }) {
  const refs = useRef({})
  const [pos, setPos] = useState({ w: 0, x: 2 })
  // FIX (payroll-calculator, 15 Oct): measure again when the web font arrives or a button resizes, else the pill keeps the
  // fallback-font width and cuts the label ("Predefined Pr…").
  useLayoutEffect(() => {
    const measure = () => { const b = refs.current[active]; if (b) setPos({ w: b.offsetWidth, x: b.offsetLeft }) }
    measure()
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null
    Object.values(refs.current).forEach((el) => el && ro?.observe(el))
    document.fonts?.ready?.then(measure)
    return () => ro?.disconnect()
  }, [active, tabs.length])
  return (
    <div className="z-0 flex gap-1 text-sm bg-gray-50 2xl:p-1 2xl-to-xl:p-0.5 p-0.5 2xl-to-xl:px-1 px-1 border border-gray-200 relative overflow-hidden rounded-full">
      <div className="absolute left-0 bg-indigo-600 z-0 transition-transform duration-300 ease-ease rounded-full top-[2px] h-[calc(100%-4px)]" style={{ width: pos.w, transform: `translateX(${pos.x}px)` }} />
      {tabs.map((t) => (
        <button key={t.key} ref={(el) => { refs.current[t.key] = el }} type="button" onClick={() => onChange?.(t.key)}
          className={t.key === active
            ? 'block font-medium transition-colors ease-in-out z-1 2xl:text-sm 2xl-to-xl:text-xs text-xs rounded-full text-white 2xl:py-1 2xl-to-xl:py-1.5 py-1.5 px-3'
            : 'block font-medium transition-colors z-1 2xl:text-sm 2xl-to-xl:text-xs text-xs rounded-full 2xl:py-1 2xl-to-xl:py-1.5 py-1.5 px-3'}>
          {t.label}
        </button>
      ))}
    </div>
  )
}
