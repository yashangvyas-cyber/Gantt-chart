// COPIED from modules/admin/dom/helpdesk_add_ticket_drawer_2026-10-05.html: the breadcrumb bar (home icon › current page) and the
// scrolling grey content area that holds the cards / list. Put inside <AppShell>. crumbs = [{ label, to? }]; the last one is the current page.
import { Link } from 'react-router-dom'

export default function PageFrame({ crumbs, children }) {
  return (
    <>
      <nav className="flex border-b border-gray-200 py-2 bg-white items-center justify-between px-6" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2 overflow-x-auto flex-nowrap no-scrollbar scrollbar-hide sm:flex-wrap">
          <li className="">
            <div className="">
              <a className="hover:text-gray-700 text-gray-500 sm:whitespace-normal whitespace-nowrap" href="#"><span className="icon-home-line flex-shrink-0 text-lg flex" /></a>
            </div>
          </li>
          {crumbs.map((c, i) => (
            <li key={c.label}>
              <div className="flex items-center">
                <span className="icon-chevron-right flex-shrink-0 text-base text-gray-300" />
                {c.to && i < crumbs.length - 1
                  ? <Link className="text-gray-600 cursor-pointer hover:text-gray-800 ml-4 2xl:text-sm 2xl-to-xl:text-xs text-xs font-medium sm:whitespace-normal whitespace-nowrap" to={c.to}>{c.label}</Link>
                  : <a className="text-indigo-700 cursor-default pointer-events-none ml-4 2xl:text-sm 2xl-to-xl:text-xs text-xs font-medium sm:whitespace-normal whitespace-nowrap" aria-current="page">{c.label}</a>}
              </div>
            </li>
          ))}
        </ol>
      </nav>
      <div className="2xl:p-4 p-3 w-full bg-gray-100 overflow-x-auto customScrollbar 2xl:h-[calc(100vh-98px)] 2xl-to-xl:h-[calc(100vh-88px)] h-[calc(100vh-88px)]">{children}</div>
    </>
  )
}
