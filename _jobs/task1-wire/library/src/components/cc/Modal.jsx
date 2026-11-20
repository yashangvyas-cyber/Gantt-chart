// COPIED from src/components/ConfirmDialog.jsx (itself copied from modules/project-mgmt/dom/c2_row_action.html):
// same backdrop, centred sm:max-w-lg card, ✕ (with its mb-5), title. Differences, all because the body here is children, not a message:
// no round icon badge; footer = the real Add Ticket drawer footer (`pt-6 flex items-center gap-x-4`, Cancel then Submit, left-aligned).
// Omit `onConfirm` for no footer. Clicking outside the card closes it (the scroll layer sits above the backdrop, so it handles the click).
import { useEffect } from 'react'
import Button from './Button.jsx'

export default function Modal({ title, onClose, children, confirmLabel = 'Submit', cancelLabel = 'Cancel', onConfirm, confirmDisabled }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose?.() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])
  const outside = (e) => { if (e.target === e.currentTarget) onClose?.() }
  return (
    <div className="relative z-[999]" role="dialog" aria-modal="true" aria-label={title}>
      <div className="fixed inset-0 bg-gray-900 opacity-70" />
      <div className="fixed inset-0 overflow-y-auto" onMouseDown={outside}>
        <div className="flex min-h-full items-center justify-center p-4 " onMouseDown={outside}>
          <div className="w-full max-w-full sm:max-w-lg relative">
            <div className="2xl:p-4 2xl-to-xl:p-3 p-3 overflow-hidden border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className="flex justify-between items-center">
                <p className="text-gray-900 font-semibold 2xl:text-lg 2xl-to-xl:text-base text-base pt-1">{title}</p>
                <span className="icon-x-close cursor-pointer text-2xl text-gray-500 mb-5" onClick={onClose} />
              </div>
              <div className="z-10"><div className="relative z-1 mt-4">{children}</div></div>
              {onConfirm && (
                <div className="2xl:pt-8 2xl-to-xl:pt-6 pt-6 flex items-center gap-x-4">
                  <Button variant="white" onClick={onClose}>{cancelLabel}</Button>
                  <Button onClick={onConfirm} disabled={confirmDisabled}>{confirmLabel}</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
