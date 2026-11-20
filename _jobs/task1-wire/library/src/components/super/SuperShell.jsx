// Super Admin shell. Every class string below is COPIED from
// modules/super-admin/dom/email_master_list.html — not recalled, not approximated.
// Note the primary here is indigo-600; the tenant app uses indigo-800. Different app.
import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import Icon from '../Icon.jsx'
import { SUPER_NAV } from '../../data/nav.js'

/* portalSideBarData + COMMAND_PALETTE_CATALOG, verbatim from the super admin bundle */
const PORTAL_DATA = [
  { title: 'Email Master', link: '/portal/email-master' },
  { title: 'Variable Registry', link: '/portal/variable-registry' },
  { title: 'Scheduler Master', link: '/portal/scheduler-master' },
  { title: 'Modules', link: '/portal/modules' },
  { title: 'Release Notes', link: '/portal/release-notes' },
  { title: 'Broadcast Messages', link: '/portal/broadcast-messages' },
]

export default function SuperShell({ crumbs = [], scroll = false, flush = false, crumbRight = null, bar = null, active: activeItem = 'Dashboard', nav: NAV = SUPER_NAV, me = { first_name: 'Super', last_name: 'Admin' }, topRight = null, children }) {
  const nav = useNavigate()
  const location = useLocation()
  const [flyout, setFlyout] = useState(null)          // title of the parent whose sub-sidebar is open
  const [menu, setMenu] = useState(false)
  const kids = (n) => (n.title === 'Portal Data' ? PORTAL_DATA.map((pd) => ({ title: pd.title, path: pd.link })) : (n.children || []))
  const here = (path) => path && (location.pathname === path || location.pathname.startsWith(path + '/'))
  const inside = (n) => n.children?.some((c) => here(c.path))
  const open = NAV.find((n) => n.title === flyout)
  return (
    <div id="main" className="main h-full">
      <div className="h-full">
        {/* header — 2xl:h-[60px] 2xl-to-xl:h-[52px] h-[52px] */}
        <div className="sticky top-0 z-[60] 2xl:h-[60px] 2xl-to-xl:h-[52px] h-[52px] border-b border-gray-200 bg-white shadow-sm">
          <div className="flex items-center">
            <div className="2xl:py-2 2xl-to-xl:py-1 py-1 flex items-center w-full justify-between px-6">
              <div className="flex items-center xl:gap-20 gap-4">
                <div className="flex items-center">
                  <img src="/collabcrm-super-logo.svg" alt="collab people" className="cursor-pointer w-[120px] h-auto" />
                  <span className="ml-2 text-gray-500 text-base font-normal leading-tight capitalize w-full">Super Admin</span>
                </div>
                <div className="border-[#FF0000] bg-[#FF0000] text-white font-extrabold py-2 px-4 rounded-lg">STAGING</div>
              </div>
              {/* PROTOTYPE ONLY slot (not in CollabCRM) beside the real user menu: <SuperShell topRight={…}> */}
              <div className="flex items-center gap-x-3">
                {topRight}
                <div className="flex items-center">
                  <div className="relative">
                    <div>
                      <button type="submit" onClick={() => setMenu((v) => !v)} className="outline-none font-semibold rounded-lg disabled:cursor-not-allowed border disabled:opacity-100 hover:opacity-90 disabled:bg-indigo-200 text-sm border-transparent text-white bg-transparent px-0 py-0">
                        <div className="flex items-center justify-center gap-2">
                          <div className="flex items-center gap-x-2.5">
                            <div><div className="bg-gray-100 border  flex justify-center items-center w-10 h-10 rounded-full text-sm font-medium ">
                              <span className="icon-user-01 text-gray-600 text-lg" />
                            </div></div>
                            <div className="text-gray-700 2xl:text-base 2xl-to-xl:text-sm text-sm flex flex-col justify-start items-start">
                              {me.first_name} {me.last_name}
                              <span className="2xl:text-sm 2xl-to-xl:text-xs text-xs text-gray-400">Super Admin</span>
                            </div>
                            <div className="text-gray-700 text-sm transition-all duration-300 ease-in-out ml-1 arrowIcon down mb-0.5" />
                          </div>
                        </div>
                      </button>
                      {/* closed = the captured string; DIVERGES: NEW open state (only the closed state is captured) drops scale-0 opacity-0 */}
                      <div className={menu ? 'transition-opacity duration-500 relative z-50' : 'transition-opacity duration-500 scale-0 relative z-50 opacity-0'}>
                        <div className="absolute right-0 z-10 mt-1.5 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                          <div className="2xl:text-sm 2xl-to-xl:text-xs text-xs whitespace-nowrap hover:bg-gray-100"><a href="/security-settings">
                            <div className="w-full px-4 py-2 flex items-center text-gray-600 hover:text-indigo-700 hover:bg-indigo-25 font-medium">
                              <span className="icon-passcode-lock text-lg mr-2" />Security Settings</div></a></div>
                          <div className="2xl:text-sm 2xl-to-xl:text-xs text-xs whitespace-nowrap hover:bg-gray-100"><a href="/settings">
                            <div className="w-full px-4 py-2 flex items-center text-gray-600 hover:text-indigo-700 hover:bg-indigo-25 font-medium">
                              <span className="icon-settings-02 text-lg mr-2" /> Settings</div></a></div>
                          <div className="2xl:text-sm 2xl-to-xl:text-xs text-xs whitespace-nowrap hover:bg-gray-100">
                            <button type="button" className="outline-none disabled:cursor-not-allowed border disabled:opacity-100 hover:opacity-90 disabled:bg-indigo-200 text-sm border-transparent w-full text-left px-4 py-2 bg-white rounded-none text-gray-600 justify-start flex font-medium hover:text-indigo-700 hover:bg-indigo-25">
                              <div className="flex items-center justify-center gap-2"><span className="icon-log-out-012 text-lg" /> Logout</div>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <main className="relative flex h-full">
          <div className="bg-white w-[260px] duration-300 relative min-h-[calc(100vh-60px)]">
            <nav className="py-5 px-2 overflow-y-auto overflow-x-hidden sidebar-container 2xl:min-h-[calc(100vh-119px)] 2xl-to-xl:min-h-[calc(100vh-111px)] min-h-[calc(100vh-111px)] max-h-[calc(100vh-116px)] h-auto border-r">
              <ul role="list" className="space-y-2 sidebar-container">
                {NAV.map((n) => {
                  const active = n.title === activeItem
                  const ITEM = 'flex items-center gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold whitespace-nowrap'
                  const ICON = 'h-6 w-6 shrink-0 whitespace-nowrap flex items-center justify-center'
                  return (
                    <li key={n.title} title={n.title} className="group">
                      {n.chevron ? (
                        /* parent item (Billing, Support Tickets, Portal Data): a <div> with the chevron, as captured; click = its sub-sidebar */
                        <div onClick={() => setFlyout((v) => (v === n.title ? null : n.title))}
                          className={`${active || inside(n) || flyout === n.title ? 'bg-gray-100 text-black' : 'text-black hover:bg-gray-100'} relative z-2 cursor-pointer ${ITEM}`}>
                          <span className={`text-grayModern-500 group-hover:text-grayModern-500 ${ICON} text-xl icon-${n.icon}`} />
                          <p className="">{n.title}</p>
                          <span className="icon-chevron-right block ml-auto text-xl text-grayModern-500" />
                        </div>
                      ) : (
                        <Link to={n.path} className={active ? `bg-gray-100 text-black ${ITEM}` : `text-black hover:bg-gray-100 ${ITEM}`}>
                          <span className={`text-grayModern-500 ${active ? '' : 'group-hover:text-grayModern-500 '}${ICON} 2xl:text-xl text-lg icon-${n.icon}`} />
                          <p className="overflow-hidden flex items-center justify-between w-full text-ellipsis">
                            {n.title}
                            {/* DIVERGES: <span>, the capture nests an <a title="Add …"> inside the item <a> (React refuses nested anchors); same classes */}
                            {n.plus && <span title={`Add ${n.title.replace(/s$/, '')}`} className="icon-plus-square ms-2 text-grayModern-500 block ml-auto text-xl" />}
                          </p>
                        </Link>
                      )}
                    </li>
                  )
                })}
              </ul>
              {/* flyout: a child of <nav> after the <ul>, as captured. Closed = the captured markup ("title", empty list).
                  DIVERGES: NEW open state — the items below are not in any capture (the real list is empty in the DOM; it is filled from the bundle) */}
              <div className={`z-50 bg-gray-50 absolute top-0 duration-300 overflow-hidden shadow-md whitespace-nowrap left-[100%] ${open ? 'w-[240px]' : 'w-[0px]'} 2xl:h-[calc(100vh-60px)] 2xl-to-xl:h-[calc(100vh-52px)] h-[calc(100vh-52px)]`}>
                <div className="absolute top-6 right-8 flex justify-end w-full">
                  <div className="relative rounded-lg group before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:bg-gray-100 hover:before:scale-150 before:rounded-sm hover:before:opacity-100 before:opacity-0 before:transition-all before:duration-300">
                    <span onClick={() => setFlyout(null)} className="relative icon icon-x-close flex text-lg text-gray-600 group-hover:text-gray-800 cursor-pointer" />
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-black font-medium text-md capitalize">{open ? open.title : 'title'}</h3>
                  <ul className="mt-4">
                    {open && kids(open).map((c) => (
                      <li key={c.title}>
                        {c.path
                          ? <Link to={c.path} onClick={() => setFlyout(null)} className={`flex items-center justify-between rounded-md px-3 py-2 2xl:text-sm 2xl-to-xl:text-xs text-xs whitespace-nowrap ${here(c.path) ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-gray-600 hover:bg-gray-100 font-medium'}`}>{c.title}</Link>
                          : <span title="Not part of this prototype" className="flex items-center justify-between rounded-md px-3 py-2 2xl:text-sm 2xl-to-xl:text-xs text-xs whitespace-nowrap text-gray-600 font-medium">{c.title}{c.plus && <span className="icon-plus-square text-grayModern-500 text-xl" />}</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </nav>
            <div className="border group flex items-center py-[18px] px-8 gap-x-2 text-sm leading-6 font-semibold whitespace-nowrap bg-white text-indigo-200 cursor-pointer justify-start">
              <span className="icon-chevron-left-double text-xl block text-grayModern-500" />
              <p className="text-sm font-medium text-black">Collapse</p>
            </div>
          </div>

          <div className="w-full bg-gray-100 overflow-x-auto">
            <nav className="flex border-b border-gray-200 py-2 bg-white items-center justify-between px-4">
              <ol className="flex items-center space-x-2 overflow-x-auto flex-nowrap no-scrollbar scrollbar-hide sm:flex-wrap">
                <li><div><a className="hover:text-gray-700 text-gray-500 sm:whitespace-normal whitespace-nowrap"><span className="icon-home-line flex-shrink-0 text-lg flex" /></a></div></li>
                {crumbs.map((c, i) => (
                  <li key={c.label}>
                    <div className="flex items-center">
                      <span className="icon-chevron-right flex-shrink-0 text-base text-gray-300" />
                      {c.to && i < crumbs.length - 1
                        ? <Link to={c.to} className="cursor-pointer text-gray-600 hover:text-gray-800 ml-4 2xl:text-sm 2xl-to-xl:text-xs text-xs font-medium sm:whitespace-normal whitespace-nowrap">{c.label}</Link>
                        : <a className="text-indigo-700 cursor-default pointer-events-none ml-4 2xl:text-sm 2xl-to-xl:text-xs text-xs font-medium sm:whitespace-normal whitespace-nowrap">{c.label}</a>}
                    </div>
                  </li>
                ))}
              </ol>
              {/* page filters in the breadcrumb bar, as Reports › Deal Analytics does (reports/dom/yop_deal_analytics.html) */}
              {crumbRight && <div className="flex p-1.5 2xl:pr-5 gap-3 items-center pr-3">{crumbRight}</div>}
            </nav>
            {/* HEADING BAR — welded to the breadcrumb, no gap and no card, the way
                People › Add Employee does it. COPIED:
                modules/people/dom/employee_add_2026-09-21.html.
                A screen that put its title in a card inside the padded area paid
                a 16px gap, a border and the card's own padding for one line of
                text and two buttons (BA, 2026-09-30). */}
            {bar && (
              <div className="transition-all duration-300 bg-white flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 sticky z-10 w-full">
                <div className="2xl:py-3 2xl:px-5 2xl-to-xl:py-2 py-2 2xl-to-xl:px-3 px-3 flex flex-col md:flex-row justify-between items-center w-full border-b border-gray-200">
                  <div className="flex min-w-0 items-center gap-3">
                    <h1 className="2xl:text-lg 2xl-to-xl:text-base text-base flex font-semibold text-gray-900 truncate">{bar.title}</h1>
                    {bar.badge}
                  </div>
                  <div className="flex shrink-0 items-center">{bar.actions}</div>
                </div>
              </div>
            )}
            {/* the bar eats its own height out of the scroller: 2xl it is
                py-3 + text-lg + 1px border, smaller everywhere else */}
            {/* flush = a record page: the 280px field panel + content sit straight under the breadcrumb, no padding.
                COPIED: the container under the breadcrumb of crm-invoice/dom/deals_id_details.html */}
            {flush
              ? <div className="w-full flex 2xl:h-[calc(100vh-97px)] 2xl-to-xl:h-[calc(100vh-88px)] h-[calc(100vh-88px)] overflow-auto">{children}</div>
              : <div className={`p-4 ${scroll
              ? (bar ? 'overflow-y-auto 2xl:h-[calc(100vh-150px)] h-[calc(100vh-138px)]' : 'overflow-auto bg-gray-50 rounded-b-lg h-[calc(100vh-97px)]')
              : (bar ? 'overflow-hidden 2xl:max-h-[calc(100vh-150px)] max-h-[calc(100vh-138px)]' : 'overflow-hidden max-h-[calc(100vh-97px)]')}`}>
              {children}
            </div>}
          </div>
        </main>
      </div>
    </div>
  )
}
