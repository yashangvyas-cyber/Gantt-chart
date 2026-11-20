// Settings page = People › Leave Settings › Leave Types (modules/people/dom/leave_settings_leave_types.html,
// spec docs/specs/people__leave_settings_leave_types.md). EVERY class string below is COPIED verbatim from that capture:
// the white tab bar under the breadcrumb (+ a slot on the right), the grey body, and the list card
// ("Leave Types" title + "10 Leave Types" pill + "Add Leave Type" button, then the table with edit / delete per row).
const T = '2xl:text-sm 2xl-to-xl:text-xs text-xs'
const TH = '2xl:py-2.5 2xl-to-xl:py-1.5 py-1.5 2xl:px-6 2xl-to-xl:px-4 px-4 whitespace-nowrap 2xl:text-sm 2xl-to-xl:text-xs text-xs font-medium text-gray-600 text-left bg-gray-50 top-0'
const TD = 'whitespace-nowrap 2xl:px-6 2xl-to-xl:px-4 px-4 2xl:py-2.5 2xl-to-xl:py-1.5 py-1.5 2xl:text-sm 2xl-to-xl:text-xs text-xs text-gray-600 text-left'

export const SettingsPage = ({ tabs, active, onTab, right, children }) => (
  <form className="w-full relative responsive-dropdown" onSubmit={(e) => e.preventDefault()}>
    {/* the Leave page's bar is w-[calc(100vw-125px)] (its sidebar is collapsed there) — that pushed Save off-screen here, so the bar
        is the full-width heading bar of People › Add Employee (the same strings SuperShell's `bar` uses) */}
    <div className="transition-all duration-300 bg-white flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 sticky z-10 w-full">
      <div className="2xl:py-3 2xl:px-5 2xl-to-xl:py-2 py-2 2xl-to-xl:px-3 px-3 flex flex-col md:flex-row justify-between items-center w-full border-b border-gray-200">
        <div className="flex items-center w-full justify-between px-2">
          <div className="block w-full">
            <nav className="scrollbar-hide tab flex gap-3 items-center relative overflow-x-auto overflow-y-hidden horizontal-scrollbar-hide scrollbar-hide">
              {tabs.map(([key, label]) => (
                <a key={key} onClick={() => onTab(key)} className={key === active
                  ? 'text-indigo-700 bg-indigo-50 tab-transition font-semibold relative z-[20] whitespace-nowrap 2xl:py-2 2xl-to-xl:py-1.5 py-1.5 2xl:px-3 2xl-to-xl:px-2 px-2 w-max 2xl:text-sm 2xl-to-xl:text-xs text-xs text-center rounded-md active'
                  : 'text-gray-500 tab-transition font-semibold relative z-[20] whitespace-nowrap 2xl:py-2 2xl-to-xl:py-1.5 py-1.5 2xl:px-3 2xl-to-xl:px-2 px-2 w-max 2xl:text-sm 2xl-to-xl:text-xs text-xs text-center rounded-md'}>{label}</a>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-2">{right}</div>
        </div>
      </div>
    </div>
    <div className="overflow-x-auto 2xl:h-[calc(100vh-160px)] 2xl-to-xl:h-[calc(100vh-138px)] h-[calc(100vh-138px)] 2xl:p-4 p-3">
      {/* space-y-6 + pt-4 on each list card: its sticky header paints a 24px grey band ABOVE itself (after:-top-[25px]), which hid
          the bottom of the card before it */}
      <div className="space-y-6">{children}</div>
    </div>
  </form>
)

// the list card: title + count pill + primary button, then the table. columns = [{ label, render(row, i) }]; onEdit / onDelete = the Actions column
export function ListCard({ title, count, addLabel, onAdd, columns, rows, onEdit, onDelete, empty = 'Nothing added yet' }) {
  return (
    <div className="pt-4"><div className="rounded-xl">
      <div className="2xl:py-4 2xl-to-xl:py-2 py-2 2xl:px-5 2xl-to-xl:px-3 px-3 bg-white z-2 sticky top-0 rounded-tl-lg rounded-tr-lg border after:absolute after:w-[calc(100%+16px)] after:h-6 after:-top-[25px] after:-left-2 after:bg-gray-100 after:-z-1">
        <div className="flex justify-between">
          <div className="flex gap-x-2.5 items-center">
            <p className="2xl:pl-0 2xl-to-xl:pl-1.5 pl-1.5 font-semibold text-gray-900 2xl:text-lg 2xl-to-xl:text-sm text-sm">{title}</p>
            {count != null && <div className="rounded-2xl border flex w-max font-medium items-center border-indigo-200 bg-indigo-50 text-indigo-700 2xl:!text-xs 2xl-to-xl:!text-xxs !text-xxs 2xl:!py-0.5 2xl-to-xl:!py-0 !py-0 py-0.5 px-2 text-xs"><span>{count}</span></div>}
          </div>
          <div className="flex items-center gap-3">
            {onAdd && (
              <button type="button" onClick={onAdd} className="outline-none font-semibold rounded-lg disabled:cursor-not-allowed border disabled:opacity-100 hover:opacity-90 disabled:bg-indigo-200 px-3.5 border-transparent bg-indigo-600 text-white 2xl:py-1.5 2xl-to-xl:py-1 py-1 2xl:h-9 2xl-to-xl:h-8 h-8 2xl:text-sm 2xl-to-xl:text-xs text-xs">
                <div className="flex items-center justify-center gap-2">{addLabel}</div>
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="bg-gray-100 sticky -top-1 z-1 h-4 -mt-4 w-full" />
      <div>
        <div className="flex flex-col rounded-b-lg overflow-hidden">
          <div className="inline-block w-full align-middle">
            <div className="sidebar-container border overflow-auto scrollbar-hide rounded-b-lg z-0 relative border-gray-200">
              <table className="min-w-full divide-y divide-gray-200 tableSticky">
                <thead><tr>
                  <th className={`${TH} w-[1%]`}><div>No.</div></th>
                  {columns.map((c) => <th key={c.label} className={`${TH} cursor-pointer`}><div>{c.label}</div></th>)}
                  {(onEdit || onDelete) && <th className={`${TH} w-[4%] sticky right-0`}><div>Actions</div></th>}
                </tr></thead>
                <tbody className="divide-y divide-[#EAEAEA] bg-white">
                  {rows.length === 0 && <tr className="h-[65px] group hover:bg-gray-50"><td className={TD} colSpan={columns.length + 2}><p className="text-gray-900 font-medium">{empty}</p></td></tr>}
                  {rows.map((r, i) => (
                    <tr key={r.id ?? i} className="h-[65px] group hover:bg-gray-50">
                      <td className={`${TD} w-[1%]`}><p className="text-gray-600 max-w-[160px] truncate font-medium line-clamp-1">{i + 1}</p></td>
                      {columns.map((c) => <td key={c.label} className={TD}>{c.render(r, i)}</td>)}
                      {(onEdit || onDelete) && (
                        <td className={`${TD} w-[4%] sticky right-0 border-l`}>
                          <div className="before:absolute before:w-[1px] before:h-full before:bg-gray-200 before:top-0 before:left-[-1px]">
                            <div className="flex items-center gap-x-2.5 text-gray-600 2xl:text-xl 2xl-to-xl:text-lg text-lg justify-center">
                              {onEdit && <a onClick={() => onEdit(r, i)}><div /><span className="icon-edit-01 cursor-pointer" /></a>}
                              {onDelete && <a onClick={() => onDelete(r, i)}><span className="icon-trash-01 cursor-pointer" /></a>}
                            </div>
                          </div>
                          <div className="absolute top-px left-0 right-0 bottom-0 -z-10 bg-white group-hover:bg-gray-50" />
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div></div>
  )
}
// cell contents of the capture: the bold first column, a plain cell text, the green "Active" pill
export const CellMain = ({ children }) => <p className="text-gray-900 font-medium">{children}</p>
export const CellText = ({ children }) => <p className={`${T} text-gray-600`}>{children}</p>
export const ActivePill = ({ children = 'Active' }) => (
  <div className="rounded-2xl border flex w-max font-medium items-center 2xl:!text-xs 2xl-to-xl:!text-xxs !text-xxs 2xl:!py-0.5 2xl-to-xl:!py-0 !py-0 border-success-200 bg-success-50 text-success-700 py-0.5 px-2 text-xs"><span>{children}</span></div>
)
