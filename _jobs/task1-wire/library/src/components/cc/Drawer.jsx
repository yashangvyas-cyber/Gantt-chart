// COPIED from modules/admin/dom/helpdesk_add_ticket_drawer_2026-10-05.html (spec: admin__helpdesk_add_ticket_drawer_2026-10-05.md)
// The 560px right panel: dimmed backdrop, sticky header (title + ✕), body. Footer buttons are the caller's (they sit in the body in the real DOM).
// FIX (payroll-calculator, 15 Oct): `max-w-full` on the panel, so on a phone a wide table scrolls inside it and the ✕ stays on screen.
// FIX (payroll-calculator, 15 Oct): the scroll layers sit above the backdrop, so a click outside the panel never reached it. The layer now closes on its own click.
import { useEffect } from 'react'

export default function Drawer({ title, onClose, children, width = 'w-[560px]', bodyCls = 'p-4' }) {   // width: DIVERGES only for the reports drill-down (a ticket list needs room)
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose?.() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])
  return (
    <div className="relative z-[99]" data-html2canvas-ignore="true">
      <div className="fixed inset-0 bg-gray-900 opacity-70" onClick={onClose} />
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden" onClick={(e) => { if (e.target === e.currentTarget) onClose?.() }}>
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full ">
            <div className={`pointer-events-auto max-w-full ${width}`}>
              <div className="flex h-full flex-col overflow-y-auto bg-white shadow-xl">
                <div className="p-4 border-b border-gray-200 sticky top-0 bg-white z-50">
                  <h1 className="3xl:text-xl 2xl:text-lg 2xl-to-xl:text-base text-base font-semibold">
                    <div className="flex gap-x-3 item-center">{title}</div>
                  </h1>
                  <span onClick={onClose} className="icon-x-close text-xl text-gray-500 absolute 2xl:top-[22px] top-[18px] right-[22px] cursor-pointer" />
                </div>
                <div className={bodyCls || undefined}>{children}</div>   {/* bodyCls '' = the bare <div> of roles_add.html (from helpdesk, 18 Nov) */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
