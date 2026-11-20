import { useEffect, useSyncExternalStore } from 'react'

/* CollabCRM's own confirmation dialog, in place of the browser's confirm() —
   "localhost:5173 says …" is not something the product ever shows.

   COPIED from modules/project-mgmt/dom/c2_row_action.html (the "Delete
   Resource" dialog): dimmed backdrop, centred sm:max-w-lg card, the round
   two-ring badge with an icon, title + message, and two full-width buttons —
   white Cancel, red confirm. Only the icon and the words change per use.

   Usage, anywhere:  if (await askConfirm({ title, message, confirmLabel })) …  */

let current = null            // { title, message, confirmLabel, cancelLabel, icon, resolve }
const subs = new Set()
const emit = () => subs.forEach((f) => f())

export function askConfirm({ title, message, confirmLabel = 'Confirm', cancelLabel = 'Cancel', icon = 'alert-triangle' }) {
  return new Promise((resolve) => {
    current?.resolve(false)   // a second ask replaces the first
    current = { title, message, confirmLabel, cancelLabel, icon, resolve }
    emit()
  })
}

const answer = (ok) => {
  if (!current) return
  const { resolve } = current
  current = null
  emit()
  resolve(ok)
}

/* Mounted once, in App. */
export function ConfirmHost() {
  const d = useSyncExternalStore((f) => { subs.add(f); return () => subs.delete(f) }, () => current)

  useEffect(() => {
    if (!d) return
    const onKey = (e) => { if (e.key === 'Escape') { e.preventDefault(); answer(false) } }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [d])

  if (!d) return null
  return (
    <div className="relative z-[999]" role="dialog" aria-modal="true" aria-label={d.title}>
      <div className="fixed inset-0 bg-gray-900 opacity-70" onClick={() => answer(false)} />
      <div className="fixed inset-0 overflow-y-auto pointer-events-none">
        <div className="flex min-h-full items-center justify-center p-4 ">
          <div className="w-full max-w-full sm:max-w-lg relative pointer-events-auto">
            <div className="2xl:p-4 2xl-to-xl:p-3 p-3 overflow-hidden border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className="flex justify-between items-center">
                <span className="bg-error-50 p-2 w-[55px] rounded-full flex justify-center items-center">
                  <span className="bg-error-100 p-2 rounded-full flex justify-center items-center w-10">
                    <span className={`text-xl text-error-600 icon-${d.icon}`} />
                  </span>
                </span>
                <span className="icon-x-close cursor-pointer text-2xl text-gray-500 mb-5" onClick={() => answer(false)} />
              </div>
              <div className="z-10">
                <div className="relative z-1 mt-4">
                  <p className="text-gray-900 font-semibold 2xl:text-lg 2xl-to-xl:text-base text-base pt-1">{d.title}</p>
                  {d.message && <div className="mt-1 text-gray-600 font-normal text-sm"><div className="mb-3">{d.message}</div></div>}
                </div>
              </div>
              <div className="w-full gap-x-3 flex pt-4 justify-between">
                <button type="button" onClick={() => answer(false)}
                  className="outline-none rounded-lg disabled:cursor-not-allowed disabled:opacity-100 hover:opacity-90 px-4 bg-indigo-50 text-indigo-700 hover:bg-gray-50 !bg-white border border-gray-300 !text-gray-700 2xl:py-2 2xl-to-xl:py-[7px] py-[7px] 2xl:text-sm 2xl-to-xl:text-xs text-xs font-semibold w-full">
                  <div className="flex items-center justify-center gap-2">{d.cancelLabel}</div>
                </button>
                <button type="button" autoFocus onClick={() => answer(true)}
                  className="outline-none rounded-lg disabled:cursor-not-allowed border disabled:opacity-100 hover:opacity-90 disabled:bg-indigo-200 px-4 border-transparent text-white focus:border-error-400 focus:shadow-outline-error w-full font-semibold 2xl:py-2 2xl-to-xl:py-[7px] py-[7px] 2xl:text-sm 2xl-to-xl:text-xs text-xs bg-error-600">
                  <div className="flex items-center justify-center gap-2">{d.confirmLabel}</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
