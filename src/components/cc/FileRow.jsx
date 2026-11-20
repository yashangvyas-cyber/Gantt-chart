// COPIED: the "Attachment:" block of People › Leaves › view RSP (modules/people/dom/rsp_tabs_leaves_view_00_panel_without_expected_tabs_2026-09-25.html):
// label, bordered row with icon-file-04 + file name, and the eye link on the right that opens the file. Every class string is verbatim.
// Moved from prototypes/helpdesk-ticketing (18 Nov 2026). file = 'name.pdf' or { name, url }; onOpen(file) replaces the link when given.
export const FileLabel = ({ children = 'Attachment:' }) => <label className="2xl:text-xs 2xl-to-xl:text-xxs text-xxs font-normal text-gray-600">{children}</label>

export default function FileRow({ file, onOpen }) {
  const name = file?.name || file
  const open = onOpen ? (e) => { e.preventDefault(); e.stopPropagation(); onOpen(file) } : undefined
  return (
    <div className="border border-gray-200 px-2.5 mt-1.5 mb-5 rounded-lg flex items-center justify-between ">
      <div className="flex items-center">
        <div className="pr-2"><span className="icon-file-04 text-lg text-gray-500 " /></div>
        <p className="2xl:text-sm 2xl-to-xl:text-xs text-xs text-gray-800 py-2.5">{name}</p>
      </div>
      <div className="flex items-center"><a href={file?.url || '#'} title="View" onClick={open} className="icon-eye text-xl cursor-pointer text-gray-400" /></div>
    </div>
  )
}
