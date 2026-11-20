// COPIED from the table + footer of modules/admin/dom/helpdesk_add_ticket_drawer_2026-10-05.html
// (thead cells, sort icon, tbody rows, action cell, "Records Per Page" select, Previous / 1 2 3 … / Next).
// columns = [{ key, label, sortable, narrow, render(row, index) }]  — cells that need markup (StatusPill, PriorityIcon …) use `render`.
// `actions(row)` renders the sticky "Action" column content (e.g. <span className="icon-eye cursor-pointer" />); omit for no Action column.
import Select from '../Select.jsx'

const TH = '2xl:py-2.5 2xl-to-xl:py-1.5 py-1.5 2xl:px-6 2xl-to-xl:px-4 px-4 whitespace-nowrap 2xl:text-sm 2xl-to-xl:text-xs text-xs font-medium text-gray-600 text-left bg-gray-50 top-0'
const TD = 'whitespace-nowrap 2xl:px-6 2xl-to-xl:px-4 px-4 2xl:py-2.5 2xl-to-xl:py-1.5 py-1.5 2xl:text-sm 2xl-to-xl:text-xs text-xs text-gray-600 text-left'
const PG = 'inline-flex items-center text-gray-700 hover:bg-gray-50 px-4 2xl:py-2.5 2xl-to-xl:py-1 py-1 2xl:text-sm 2xl-to-xl:text-xs text-xs font-semibold ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0'
const PG_ON = 'inline-flex items-center bg-indigo-600 text-white px-4 2xl:py-2.5 2xl-to-xl:py-1 py-1 2xl:text-sm 2xl-to-xl:text-xs text-xs font-semibold ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0'

const pageList = (page, pages) => {
  if (pages <= 7) return Array.from({ length: pages }, (_, i) => i + 1)
  const s = new Set([1, 2, 3, 4, pages - 1, pages, page - 1, page, page + 1].filter((n) => n >= 1 && n <= pages))
  const out = []; let prev = 0
  ;[...s].sort((a, b) => a - b).forEach((n) => { if (n - prev > 1) out.push('…'); out.push(n); prev = n })
  return out
}

// sort = { key, desc } (optional): the sorted column shows its direction with icon-arrow-narrow-down / -up in gray-600 (same as reports/kit Table)
export default function DataTable({ columns, rows, onSort, sort, rowKey = (r) => r.id, actions, onRowClick, page = 1, perPage = 10, total = rows.length, onPage, onPerPage, perPageOptions = ['10', '25', '50'] }) {
  const pages = Math.max(1, Math.ceil(total / perPage))
  return (
    <>
      <div className="flex flex-col">
        <div className="inline-block w-full align-middle">
          <div className="sidebar-container border overflow-auto scrollbar-hide z-0 relative border-gray-200">
            <table className="min-w-full divide-y divide-gray-200 tableSticky">
              <thead>
                <tr>
                  {columns.map((c) => (
                    <th key={c.key} scope="col" onClick={c.sortable ? () => onSort?.(c.key) : undefined} className={`${TH}${c.narrow ? ' w-[1%]' : ''}${c.sortable ? ' cursor-pointer' : ''}`}>
                      <div className="">
                        {c.sortable ? (
                          <div className="flex">
                            <span className="self-center">{c.label}</span>
                            <div className="flex items-center"><span className={sort?.key === c.key ? `text-gray-600 text-base ${sort.desc ? 'icon-arrow-narrow-down' : 'icon-arrow-narrow-up'} ml-1` : 'text-gray-300 text-base icon-sort ml-1'} /></div>
                          </div>
                        ) : c.label}
                      </div>
                    </th>
                  ))}
                  {actions && (
                    <th scope="col" className="2xl:py-2.5 2xl-to-xl:py-1.5 py-1.5 2xl:px-6 2xl-to-xl:px-4 px-4 whitespace-nowrap 2xl:text-sm 2xl-to-xl:text-xs text-xs font-medium text-gray-600 bg-gray-50 top-0 w-[8%] text-center sticky right-0">
                      <div className="">Action</div>
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAEAEA] bg-white">
                {rows.map((r, i) => (
                  <tr key={rowKey(r)} onClick={() => onRowClick?.(r)} className="h-[65px] group hover:bg-gray-50">
                    {columns.map((c) => (
                      <td key={c.key} className={`${TD}${c.narrow ? ' w-[1%]' : ''}`}>
                        {c.render ? c.render(r, i) : <p className="truncate 2xl:text-sm 2xl-to-xl:text-xs text-xs leading-5 text-gray-600 capitalize">{r[c.key]}</p>}
                      </td>
                    ))}
                    {actions && (
                      <td className="whitespace-nowrap 2xl:px-6 2xl-to-xl:px-4 px-4 2xl:py-2.5 2xl-to-xl:py-1.5 py-1.5 2xl:text-sm 2xl-to-xl:text-xs text-xs text-gray-600 w-[8%] text-center sticky right-0 border-l">
                        <div className="before:absolute before:w-[1px] before:h-full before:bg-gray-200 before:top-0 before:left-[-1px]">
                          <div className="flex justify-center text-left items-center gap-x-2.5 text-gray-600 2xl:text-xl 2xl-to-xl:text-lg text-lg">{actions(r)}</div>
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
      <div className="bg-white 2xl:px-5 2xl-to-xl:px-2 px-2 2xl:py-3 2xl-to-xl:py-2 py-2 2xl:pb-4 2xl-to-xl:pb-2 pb-2 border rounded-b-lg border-t-0 responsive-dropdown">
        <div className="flex space-x-2 justify-between">
          <div className="flex justify-center items-center gap-3">
            <p className="text-gray-700 2xl:text-sm 2xl-to-xl:text-xs text-xs font-medium">
              <span className="sm:inline hidden">Records</span> Per Page
            </p>
            <div>
              <div className="">
                {/* width not in DOM (react-select generated CSS) — approximation, drawn as inline 96px rather than a class */}
                <Select value={String(perPage)} options={perPageOptions} onChange={(v) => onPerPage?.(Number(v))} width={96} containerCls="text-bold" controlCls="css-1d2ikgd-control" id={4} />
              </div>
            </div>
          </div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <button disabled={page <= 1} onClick={() => onPage?.(page - 1)}
              className="rounded-l-lg inline-flex items-center disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 hover:bg-gray-50 px-4 2xl:py-2.5 2xl-to-xl:py-1 py-1 2xl:text-sm 2xl-to-xl:text-xs text-xs font-semibold ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0">
              <span className="icon-arrow-narrow-left text-xl me-2" />
              <span className="sm:block hidden">Previous</span>
            </button>
            {pageList(page, pages).map((n, i) => n === '…'
              ? <span key={`e${i}`} className="inline-flex items-center px-4 py-2 2xl:text-sm 2xl-to-xl:text-xs text-xs font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">...</span>
              : <button key={n} onClick={() => onPage?.(n)} className={n === page ? PG_ON : PG}>{n}</button>)}
            <button disabled={page >= pages} onClick={() => onPage?.(page + 1)}
              className="rounded-r-lg relative inline-flex items-center disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 hover:bg-gray-50 px-4 2xl:py-2.5 2xl-to-xl:py-1 py-1 2xl:text-sm 2xl-to-xl:text-xs text-xs font-semibold ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0">
              <span className="sm:block hidden">Next</span>
              <span className="icon-arrow-narrow-right text-xl ms-2" />
            </button>
          </nav>
        </div>
      </div>
    </>
  )
}
