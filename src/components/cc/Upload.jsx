// COPIED from the "Upload File" block of modules/admin/dom/helpdesk_add_ticket_drawer_2026-10-05.html
// `file` / `onFile` are optional; the real input accepts png / pdf / jpeg / jpg.
import { useRef } from 'react'

export default function Upload({ label = 'Upload File', onFile }) {
  const ref = useRef(null)
  return (
    <div className="col-span-1">
      <p className="text-gray-400 font-medium pb-2"><span className="2xl:text-xs 2xl-to-xl:text-xxs text-xxs">{label}</span></p>
      <div className="w-full">
        <div role="presentation" tabIndex={0} className="dropzone" onClick={() => ref.current?.click()}>
          <input ref={ref} type="file" tabIndex={-1} style={{ display: 'none' }} onChange={(e) => onFile?.(e.target.files?.[0])}
            accept="image/png,.png,application/pdf,.pdf,image/jpeg,.jpeg,image/jpg,.jpg" />
          <div className="flex items-center">
            <div className="py-4 px-3.5 items-center border-gray-300 focus:border-indigo-300 focus:shadow-outline-purple cursor-pointer border rounded-lg w-full flex justify-center flex-col">
              <div className="text-center flex flex-col items-center">
                <div className="p-[9px] border rounded-lg text-center">
                  <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg" className="2xl:text-lg 2xl-to-xl:text-base text-base text-gray-500 ">
                    <path d="M16.5 11V12C16.5 13.4001 16.5 14.1002 16.2275 14.635C15.9878 15.1054 15.6054 15.4878 15.135 15.7275C14.6002 16 13.9001 16 12.5 16H5.5C4.09987 16 3.3998 16 2.86502 15.7275C2.39462 15.4878 2.01217 15.1054 1.77248 14.635C1.5 14.1002 1.5 13.4001 1.5 12V11M13.1667 5.16667L9 1M9 1L4.83333 5.16667M9 1V11" stroke="#667085" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="2xl:mt-4 2xl-to-xl:mt-2 mt-2">
                  <p className="2xl:text-md 2xl-to-xl:text-xs text-xs">
                    <span className="text-indigo-700 font-semibold">Click to upload</span>
                    {' '}<span className="text-gray-600">or drag and drop</span>
                  </p>
                  <p className="text-gray-600 2xl:text-sm 2xl-to-xl:text-xs text-xs mt-0.5">PNG, JPG, or PDF (max. 2mb)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
