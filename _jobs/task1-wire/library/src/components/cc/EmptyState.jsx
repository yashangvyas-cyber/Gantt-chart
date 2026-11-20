// COPIED from the "No Comments added yet." block of modules/people/dom/rsp_tabs_support_ticket_view_02_comments_0_2026-09-25.html
// (CATALOGUE.md → Empty States uses the same ring/icon/text structure). `icon` defaults to icon-file-04 as in that capture.
export default function EmptyState({ text = 'No Comments added yet.', icon = 'file-04', children }) {
  return (
    <div className="w-full border border-t-0 border-gray-200 bg-white rounded-bl-lg rounded-br-lg flex justify-center items-center flex-col !p-2 h-[300px]">
      <div className="flex items-center justify-center relative">
        <div className="p-8 rounded-full bg-gray-100">
          <span className={`icon-${icon} !text-[30px] flex items-center justify-center text-[40px] text-gray-500`} />
        </div>
      </div>
      <div className="flex items-center justify-center flex-col">
        <p className="pb-6 pt-5 text-gray-900 font-semibold 2xl:text-sm 2xl-to-xl:text-xs text-xs z-[1]">{text}</p>
        {children}
      </div>
    </div>
  )
}
