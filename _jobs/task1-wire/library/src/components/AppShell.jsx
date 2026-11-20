// App shell reproduced from the crawled DOM of
// modules/admin/dom/email_configuration_email_status.html
// Every class string is COPIED from that dump — see
// modules/admin/specs/email_configuration_email_status.md
import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import Icon from './Icon.jsx'
import { HELP_MENU, HELP_APPS } from '../data/nav.js'

import { TENANT } from '../data/tenant.js'
import { RecruitmentSidebar, ReportsSidebar, PayrollSidebar, CrmSidebar } from './PortalSidebars.jsx'
export { TENANT }

const APPS = [
  ['People', 'users-02', `/people/${TENANT}/dashboard`],
  ['CRM & Invoice', 'deals', `/sales-crm/${TENANT}/dashboard`],
  ['Project Management', 'layers-three-02', `/project-management/${TENANT}/dashboard`],
  ['Recruitment', 'jobs', `/recruitment/${TENANT}/dashboard`],
  ['Reports', 'bar-chart-square-01', `/reports/${TENANT}/dashboard`],
  ['Payroll', 'currency-rupee', `/payroll/${TENANT}/`],
  ['Administration', 'administration', `/administration/${TENANT}/dashboard`],
]

/* Sidebar items are passed in per portal: [label, icon, path-or-null]. Real lists: src/data/nav.js */

/* ---- offline overlay — hidden, exactly as it ships ---- */
function OfflineOverlay() {
  return (
    <div className="fixed top-0 left-0 w-screen z-[999] 2xl:p-8 2xl-to-xl:p-4 p-4 h-screen bg-gray-100 transition-all duration-300 pointer-events-none opacity-0 invisible">
      <div className="bg-white 2xl:p-8 2xl-to-xl:p-4 p-4 flex flex-col justify-center h-full rounded-xl overflow-auto">
        <div className="mx-auto 2xl:pb-16 2xl-to-xl:pb-6 pb-6 block sec-maintenance-logo 2xl:w-[190px] 2xl-to-xl:w-[150px] w-[150px]" />
        <div className="mx-auto 2xl:pb-12 pb-5 2xl:w-[350px] 2xl-to-xl:w-[250px] w-[250px]" />
        <div className="text-center ">
          <h2 className="2xl:text-5xl 2xl-to-xl:text-3xl text-3xl font-semibold text-gray-700 mb-5">Oops!</h2>
          <p className="2xl:text-xl 2xl-to-xl:text-lg text-lg font-normal text-gray-600 mb-5">
            There is no Internet connection.<br />Please check your connection &amp; try again.
          </p>
          <button type="submit" className="outline-none font-semibold rounded-lg disabled:cursor-not-allowed border disabled:opacity-100 hover:opacity-90 disabled:bg-indigo-200 px-4 border-transparent bg-indigo-600 text-white 2xl:text-sm 2xl-to-xl:text-xs text-xs 2xl:py-1.5 2xl-to-xl:py-1 py-1 2xl:h-9 2xl-to-xl:h-8 h-8">
            <div className="flex items-center justify-center gap-2">Try Again</div>
          </button>
        </div>
      </div>
    </div>
  )
}

function BandwidthPopup() {
  return (
    <div className="scale-90 opacity-0 pointer-events-none w-[400px] shadow-custom-popup-shadow fixed z-[60] bottom-[20px] right-[20px] bg-white rounded-lg transform transition-all duration-300 ease-in-out">
      <div className="icon-x-close absolute p-2 top-2 right-2 cursor-pointer text-md text-gray-500 hover:bg-red-200 hover:text-red-600 rounded-md" />
      <div className="2xl:p-5 2xl-to-xl:p-3 p-3">
        <p className="2xl:text-lg 2xl-to-xl:text-base text-base text-gray-800 font-semibold">Internet Bandwidth Issue</p>
        <p className="2xl:text-base 2xl-to-xl:text-sm 2xl:text-sm 2xl-to-xl:text-xs text-xs text-gray-600 font-normal mt-2 mb-4">
          Your connection seems to be slow. Some features might not work as expected. Please check your internet connection ⚠️
        </p>
        <button type="submit" className="outline-none font-semibold rounded-lg disabled:cursor-not-allowed border disabled:opacity-100 hover:opacity-90 disabled:bg-indigo-200 px-4 border-transparent bg-indigo-600 text-white 2xl:py-2 2xl-to-xl:py-1 py-1 2xl:h-9 2xl-to-xl:h-8 h-8 2xl:text-sm 2xl-to-xl:text-xs text-xs">
          <div className="flex items-center justify-center gap-2">Got it</div>
        </button>
      </div>
    </div>
  )
}

function AllAppsMenu() {
  return (
    <div className="relative group/main">
      <div className="flex items-center justify-center box-border 2xl:h-[60px] 2xl-to-xl:h-[52px] h-[52px] w-[65px] cursor-pointer border-r-[1px] border-gray-200 pl-2.5 pr-3 py-3">
        <Icon name="grid-01" className="w-5 h-5 opacity-100 text-gray-500 text-xl" />
      </div>
      <div className="absolute bg-white top-full rounded-br-xl left-0 border-r shadow-xl border-text-gray-100 overflow-hidden transition-opacity-only group-hover/main:transition-opacity group-hover/main:duration-500 group-hover/main:opacity-100 group-hover/main:h-auto 2xl:group-hover/main:p-4 2xl-to-xl:group-hover/main:p-3 group-hover/main:p-3 group-hover/main:w-[332px] max-h-[clac(100vh-70px)] overflow-y-auto opacity-0 h-0 w-0 z-40">
        <div className="w-full">
          <h2 className="text-gray-500 2xl:text-base 2xl-to-xl:text-sm text-sm font-semibold">All Apps</h2>
          <p className="text-gray-500 2xl:text-sm 2xl-to-xl:text-xs text-xs font-normal mt-2">
            Switch between multiple apps seamlessly using this menu.
          </p>
        </div>
        <ul className="2xl:mt-4 2xl-to-xl:mt-3 mt-3 2xl:space-y-1.5 2xl-to-xl:space-y-1 space-y-1">
          {APPS.map(([label, icon, href], i) => (
            <li key={label} className={`cursor-pointer hover:bg-gray-100 rounded-md group ${label === 'Administration' ? 'bg-gray-100' : 'bg-white'}`}>
              {i === 6 && <div className="border -mx-4" />}
              <a href={href} className="flex justify-between w-full items-start 2xl:py-2.5 2xl-to-xl:py-2 py-2 2xl:px-2 2xl-to-xl:px-1.5 px-1.5">
                <div className="flex items-start gap-3">
                  <span className="flex justify-center items-center h-6 w-6">
                    <Icon name={icon} className="stroke-current group-hover:text-black 2xl:text-xl 2xl-to-xl:text-base text-base text-gray-500" />
                  </span>
                  <div className="group-hover:text-black font-semibold 2xl:text-base 2xl-to-xl:text-sm text-sm text-gray-500">{label}</div>
                </div>
                {label === 'Administration' ? (
                  <div className="flex justify-center items-center h-6 w-6">
                    <span className="icon-check text-indigo-700 text-xl"></span>
                  </div>
                ) : (
                  <div className="flex justify-center items-center h-6 w-6 transition-all duration-100 group-hover:opacity-100 opacity-0">
                    <Icon name="link-external-02" className="text-indigo-700 text-lg block" />
                  </div>
                )}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

// to = another link (Todo List); count = the number on the red dot — 0 hides it, left out = the dot as before (from helpdesk, 18 Nov)
export function NotifyChip({ icon, title, portal, to, count = null }) {
  return (
    <div className="cursor-pointer">
      <Link to={to || `/${portal || 'people'}/${TENANT}/notifications`}>
        <div title={title} className="2xl:size-10 2xl-to-xl:size-8 size-8 2xl:p-2.5 2xl-to-xl:p-1 p-1 2xl:text-sm 2xl-to-xl:text-xs text-xs rounded-lg bg-white border border-gray-200 relative flex items-center justify-center">
          <Icon name={icon} className="text-gray-500 2xl:text-xl 2xl-to-xl:text-base text-base" />
          {count !== 0 && <div title={count == null ? undefined : `${count}`} className="absolute -top-1.5 -right-1.5 flex 2xl:size-4 2xl-to-xl:size-3 size-3 bg-error-100 rounded-full items-center justify-center">
            <span className="relative flex 2xl:size-2 2xl-to-xl:size-1.5 size-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-error-400 opacity-75" />
              <span className="relative inline-flex rounded-full 2xl:size-2 2xl-to-xl:size-1.5 size-1.5 bg-error-500" />
            </span>
          </div>}
        </div>
      </Link>
    </div>
  )
}

function UserMenu() {
  const [open, setOpen] = useState(false)
  const item = '2xl:text-sm 2xl-to-xl:text-xs text-xs whitespace-nowrap hover:bg-gray-100'
  return (
    <div className="relative z-1">
      <div>
        <button className="flex items-center 2xl:text-sm 2xl-to-xl:text-xs text-xs" title="Gurpreetsingh Dhillon" onClick={() => setOpen((o) => !o)}>
          <span className="sr-only">Open user menu</span>
          <div className="rounded-full overflow-hidden 2xl:size-10 2xl-to-xl:size-8 size-8">
            <span className="rounded-full object-cover 2xl:size-10 2xl-to-xl:size-8 size-8 flex items-center justify-center bg-indigo-100 text-indigo-700 font-semibold">GD</span>
          </div>
        </button>
        <div className={`transition-opacity duration-500 relative z-50 ${open ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
          <div className="absolute right-0 z-10 mt-1.5 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
            {['My Profile', 'Preferences', 'Change Password', 'Support Tickets', 'Help Center'].map((t) => (
              <div key={t} className={item}><a className="w-full block px-4 py-2" href="#">{t}</a></div>
            ))}
            <div className={item}>
              <button type="button" className="outline-none rounded-lg disabled:cursor-not-allowed border disabled:opacity-100 hover:opacity-90 disabled:bg-indigo-200 text-sm border-transparent bg-indigo-600 w-full text-left px-4 py-2 !bg-white text-black font-normal flex justify-start hover:!bg-gray-100">
                <div className="flex items-center justify-center gap-2">Logout</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* COPIED from modules/project-mgmt/dom/issue_board.html: the header's "New ▾" quick-create button and its (closed) menu,
   between search and the Todo/Notification chips. newMenu = [{ label, path }]; PM shows one item, Add Project → project/add. */
function NewMenu({ portal, items }) {
  return (
    <div className="relative">
      <div>
        <button type="submit" className="outline-none font-semibold rounded-lg disabled:cursor-not-allowed border disabled:opacity-100 hover:opacity-90 border-indigo-200 bg-indigo-50 text-indigo-700 2xl:py-2.5 2xl-to-xl:py-1 py-1 2xl:px-4 2xl-to-xl:px-3 px-3 2xl:h-10 2xl-to-xl:h-8 h-8 2xl:text-sm 2xl-to-xl:text-xs text-xs">
          <div className="flex items-center justify-center gap-2"><div className="flex items-center gap-2"><p>New</p><span className="icon-chevron-down block text-xl" /></div></div>
        </button>
        <div className="transition-opacity duration-500 scale-0 relative z-50 opacity-0">
          <div className="absolute right-0 z-10 mt-1.5 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
            {items.map((it) => (
              <div key={it.label} className="2xl:text-sm 2xl-to-xl:text-xs text-xs whitespace-nowrap hover:bg-gray-100">
                <a className="flex gap-2 items-center px-4 py-2 text-sm whitespace-nowrap" href={`/${portal}/${TENANT}/${it.path}`}><span className="icon-plus" />{it.label}</a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* Header name next to the logo, as the live header prints it (yopmail captures, 18 Nov 2026); other portals print their slug. */
const PORTAL_TITLE = { 'sales-crm': 'Customer Relationship Management', 'project-management': 'Project Management' }
function TopBar({ portal, topRight, newMenu }) {
  return (
    <div className="sticky top-0 z-[60] 2xl:h-[60px] 2xl-to-xl:h-[52px] h-[52px] border-b border-gray-200 bg-white shadow-sm ">
      <div className="flex items-center relative">
        <div className='absolute top-0 right-0 2xl:h-[60px] 2xl-to-xl:h-[52px] h-[52px] border-4 border-b-0 border-indigo-200 transition-all duration-300 ease-in-out after:content-[""] after:absolute after:bottom-0 after:left-0 after:h-[3px] after:bg-indigo-200 w-[210px] after:w-[146px] opacity-0' />
        <AllAppsMenu />
        <div className="2xl:px-6 2xl-to-xl:px-4 2xl-to-xl:pr-2 px-4 pr-2 flex items-center w-full justify-between">
          <div className="flex items-center gap-x-11">
            <div className="flex">
              {/* the real logo, from staging-app …/administration/assets/logo-e97b90af.svg */}
              <img src="/collabcrm-logo.svg" alt={portal} className="h-5" />
              <span className="ml-2 text-gray-500 2xl:text-base 2xl-to-xl:text-sm text-sm font-normal leading-tight capitalize w-full">{PORTAL_TITLE[portal] || portal}</span>
            </div>
            <div className="border-[#FF0000] bg-[#FF0000] text-white font-extrabold 2xl:py-2 2xl-to-xl:py-1 py-1 2xl:h-10 2xl-to-xl:h-8 h-8 px-4 rounded-lg 2xl:text-base 2xl-to-xl:text-sm text-sm flex items-center justify-center">
              STAGING
            </div>
          </div>
          <div className="flex items-center justify-center gap-3 2xl-to-xl:gap-3 2xl:gap-4">
            {/* PROTOTYPE ONLY slot (not in CollabCRM): e.g. a demo role switch. Pass it as <AppShell topRight={…}> */}
            {topRight}
            <button type="button" id="searchKey" aria-label="Open command palette" title="Click to open global search bar (Ctrl/Cmd K)"
              className="group relative inline-flex items-center justify-center rounded-lg border border-indigo-200 bg-indigo-50 font-semibold text-indigo-700 transition-colors hover:border-indigo-300 2xl:h-10 2xl-to-xl:h-8 h-8 2xl:min-w-10 2xl-to-xl:min-w-8 min-w-8 2xl:px-3 2xl-to-xl:px-2.5 px-2.5">
              <span className="inline-flex items-center justify-center transition-opacity group-hover:pointer-events-none group-hover:opacity-0">
                <Icon name="search-md" className="text-base" />
              </span>
              <span className="pointer-events-none absolute inset-0 flex items-center justify-center gap-0.5 text-[11px] font-medium leading-none text-indigo-700 opacity-0 transition-opacity group-hover:opacity-100">
                <Icon name="command" className="text-xs" /><span>K</span>
              </span>
            </button>
            {newMenu && <NewMenu portal={portal} items={newMenu} />}
            <div className="relative box-border">
              <div className="flex items-center justify-center relative gap-3 2xl-to-xl:gap-3 2xl:gap-4">
                <div className="flex gap-3 2xl-to-xl:gap-3 2xl:gap-4 relative z-2">
                  <NotifyChip icon="check-square" title="Todo List" portal={portal} />
                  <NotifyChip icon="bell-01" title="Notifications" portal={portal} />
                </div>
                <UserMenu />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* COPIED from modules/admin/dom/helpdesk_help_menu_2026-10-05.html (a People page, yopmail): the People sidebar is bg-indigo-700.
   Two item kinds: a link (-my-1 wrapper, optional `icon-plus-square` quick-add link) and a parent with a chevron (flyout items NOT CAPTURED).
   No active item exists in that capture (it was taken on a parent's page), so none is drawn. nav = [label, icon, path|null, addTitle?, addPath?] */
function PeopleSidebar({ nav, portal }) {
  return (
    <div>
      <div className="bg-indigo-700 w-[220px] duration-300 relative 2xl:min-h-[calc(100vh-60px)] 2xl-to-xl:min-h-[calc(100vh-52px)] min-h-[calc(100vh-52px)]">
        <nav className="py-5 px-2 overflow-y-auto overflow-x-hidden sidebar-container 2xl:h-[calc(100vh-116px)] 2xl-to-xl:h-[calc(100vh-108px)] h-[calc(100vh-108px)]">
          <ul role="list" className="space-y-3 sidebar-container">
            {nav.map(([label, icon, path, addTitle, addPath]) => path ? (
              <li key={label} title={label} className="relative group cursor-pointer">
                <div className="-my-1">
                  <div className="text-white hover:bg-indigo-600 flex items-center rounded-md h-full w-full text-sm leading-6 font-semibold whitespace-nowrap">
                    <a className="flex w-full items-center gap-x-3 2xl:p-3 2xl-to-xl:p-2 p-2" href={`/${portal}/${TENANT}/${path}`}>
                      <span className={`text-indigo-200 group-hover:text-white h-6 w-6 shrink-0 whitespace-nowrap flex items-center justify-center 2xl:text-xl 2xl-to-xl:text-lg text-lg icon-${icon}`} />
                      <p>{label}</p>
                    </a>
                    {addPath && <a title={addTitle} className="icon-plus-square block ml-auto text-xl 2xl:p-3 2xl-to-xl:p-2 p-2 text-indigo-300" href={`/${portal}/${TENANT}/${addPath}`} />}
                  </div>
                </div>
              </li>
            ) : (
              <li key={label} title={label} className="relative group cursor-pointer">
                <div className="text-white hover:bg-indigo-600 relative z-2 cursor-pointer flex items-center gap-x-3 rounded-md 2xl:p-3 2xl-to-xl:p-2 p-2 text-sm leading-6 font-semibold whitespace-nowrap">
                  <span className={`text-indigo-200 group-hover:text-white h-6 w-6 shrink-0 whitespace-nowrap flex items-center justify-center text-base 2xl-to-xl:text-base 2xl:text-xl icon-${icon}`} />
                  <p>{label}</p>
                  <span className="icon-chevron-right block ml-auto text-xl text-indigo-300" />
                </div>
              </li>
            ))}
          </ul>
        </nav>
        <div className="z-[51] bg-gray-50 absolute top-0 duration-300 overflow-hidden shadow-md whitespace-nowrap w-[0px] left-[220px] 2xl:h-[calc(100vh-60px)] 2xl-to-xl:h-[calc(100vh-52px)] h-[calc(100vh-52px)]">
          <div className="absolute 2xl-to-xl:top-4 top-4 2xl:right-8 2xl-to-xl:right-3.5 right-3.5 flex justify-end w-full">
            <div role="button" className="relative rounded-lg group before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:bg-gray-100 hover:before:scale-150 before:rounded-sm hover:before:opacity-100 before:opacity-0 before:transition-all before:duration-300">
              <span className="relative icon icon-x-close flex text-lg text-gray-600 group-hover:text-gray-800 cursor-pointer" />
            </div>
          </div>
          <div className="2xl:p-5 2xl-to-xl:p-3 p-3 2xl:h-[calc(100vh-60px)] 2xl-to-xl:h-[calc(100vh-52px)] h-[calc(100vh-52px)] overflow-auto">
            <h3 className="text-black font-medium 2xl:text-base 2xl-to-xl:text-sm text-sm capitalize">title</h3>
            <ul className="mt-4" />
          </div>
        </div>
        <div className="group flex items-center py-[18px] px-8 gap-x-2 text-sm leading-6 font-semibold whitespace-nowrap bg-indigo-800 text-indigo-200 cursor-pointer justify-start">
          <span className="icon-chevron-left-double text-xl text-white block text-indigo-300" />
          <p className="text-sm font-medium text-white">Collapse</p>
        </div>
      </div>
    </div>
  )
}

/* COPIED from modules/project-mgmt/dom/issue_board.html (PM › Tasks › Board, 1 Sep 2026; tojsx.py, graph step 5, 18 Nov 2026).
   The PM sidebar is bg-indigo-700 like People, NOT the white Administration one. Differences from People: icon size classes,
   the active item (bg-indigo-600 + white icon), the quick links on Projects (+ Add Project) and Tasks (bell = Task Notifications),
   and the closed flyout panel (chevron-right-double button, h3 with the open parent's name).
   nav = [label, icon, path]; quick links come from PM_QUICK below (same hrefs as the capture). */
const PM_QUICK = {
  Projects: { title: 'Add Project', path: 'project/add', cls: 'icon-plus-square block ml-auto 2xl:text-xl 2xl-to-xl:text-lg text-lg 2xl:p-3 2xl-to-xl:p-2 p-2 text-indigo-300' },
  Tasks: { title: 'Task Notifications', path: 'tasks/notifications/all', cls: 'icon-bell-01 block ml-auto text-xl 2xl:p-3 2xl-to-xl:p-2 p-2 relative text-indigo-300' },
}
function PmSidebar({ nav, activeLabel, portal, flyout = '' }) {
  return (
    <div className="">
      <div className="bg-indigo-700 w-[220px] duration-300 relative 2xl:min-h-[calc(100vh-60px)] 2xl-to-xl:min-h-[calc(100vh-52px)] min-h-[calc(100vh-52px)]">
        <nav className="py-5 px-2 overflow-y-auto overflow-x-hidden sidebar-container 2xl:h-[calc(100vh-116px)] 2xl-to-xl:h-[calc(100vh-108px)] h-[calc(100vh-108px)]">
          <ul role="list" className="space-y-3 sidebar-container">
            {nav.map(([label, icon, path]) => {
              const active = label === activeLabel
              const q = PM_QUICK[label]
              return (
                <li key={label} title={label} className="group cursor-pointer relative">
                  <div className="-my-1">
                    <div className={active
                      ? 'bg-indigo-600 text-white flex items-center rounded-md h-full w-full text-sm leading-6 font-semibold whitespace-nowrap'
                      : 'text-white hover:bg-indigo-600 flex items-center rounded-md h-full w-full text-sm leading-6 font-semibold whitespace-nowrap'}>
                      <a className="flex w-full items-center 2xl:p-3 2xl-to-xl:p-2 p-2 gap-x-3" href={`/${portal}/${TENANT}/${path}`}>
                        <span className={`${active ? 'text-white' : 'text-indigo-200 group-hover:text-white'} h-6 w-6 shrink-0 whitespace-nowrap flex items-center justify-center text-base 2xl-to-xl:text-base 2xl:text-xl icon-${icon}`} />
                        <p>{label}</p>
                      </a>
                      {q && <a title={q.title} className={q.cls} href={`/${portal}/${TENANT}/${q.path}`} />}
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
          <div className="z-50 bg-gray-50 2xl:h-[calc(100vh-60px)] 2xl-to-xl:h-[calc(100vh-52px)] h-[calc(100vh-52px)] absolute top-0 duration-300 overflow-hidden shadow-md w-[0px] left-[220px]">
            <div className="flex justify-end w-full">
              <div role="button" className="bg-white hover:bg-[#EEF4FF] rounded-l-lg rounded-r-none border border-gray-200 hover:border-[#C7D7FE] group p-1.5">
                <span className="icon-chevron-right-double flex text-lg text-gray-800 group-hover:text-slate-950 cursor-pointer" />
              </div>
            </div>
            <div className="px-5 pb-5">
              <h3 className="text-black font-medium text-md capitalize">{flyout}</h3>
              <ul className="mt-4" />
            </div>
          </div>
        </nav>
        <div className="group flex items-center py-[18px] px-8 gap-x-2 text-sm leading-6 font-semibold whitespace-nowrap bg-indigo-800 text-indigo-200 cursor-pointer justify-start">
          <span className="icon-chevron-left-double text-xl text-white block text-indigo-300" />
          <p className="text-sm font-medium text-white">Collapse</p>
        </div>
      </div>
    </div>
  )
}

/* Recruitment, Reports, Payroll, CRM & Invoice: their own sidebars, copied from the captures (PortalSidebars.jsx, 18 Nov 2026).
   The capture wraps each in a class-less <div>, as PmSidebar does. */
const OWN_SIDEBAR = { recruitment: RecruitmentSidebar, reports: ReportsSidebar, payroll: PayrollSidebar, 'sales-crm': CrmSidebar }
function Sidebar(props) {
  if (props.portal === 'project-management') return <PmSidebar {...props} />
  const Own = OWN_SIDEBAR[props.portal]
  if (Own) return <div><Own {...props} /></div>
  return props.portal === 'people' ? <PeopleSidebar {...props} /> : <AdminSidebar {...props} />
}

function AdminSidebar({ nav, activeLabel, portal }) {
  return (
    <div className="">
      <div className="bg-white w-[220px] duration-300 relative 2xl:h-[calc(100vh-60px)] 2xl-to-xl:h-[calc(100vh-52px)] h-[calc(100vh-52px)]">
        <nav className="py-5 px-2 overflow-auto sidebar-container border-r 2xl:h-[calc(100vh-116px)] 2xl-to-xl:h-[calc(100vh-108px)] h-[calc(100vh-108px)]">
          <ul role="list" className="space-y-3 sidebar-container">
            {/* COPIED from admin/dom/email_status_live_default_2026-09-29.html:
                active = solid bg-indigo-600 + white; a sub-menu item (Master
                Data) is a div with a chevron, not a link. */}
            {nav.map(([label, icon, path]) => {
              const active = label === activeLabel
              if (!path) {
                return (
                  <li key={label} title={label} className="group cursor-pointer relative ">
                    <div className="text-red hover:bg-indigo-600 cursor-pointer flex items-center gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold whitespace-nowrap">
                      <span className={`text-gray-400 group-hover:text-white h-6 w-6 shrink-0 whitespace-nowrap flex items-center justify-center 2xl:text-xl 2xl-to-xl:text-base text-base icon-${icon}`}></span>
                      <p className="text-gray-500 group-hover:text-white">{label}</p>
                      <span className="icon-chevron-right block ml-auto text-xl text-gray-500 group-hover:text-white"></span>
                    </div>
                  </li>
                )
              }
              return (
                <li key={label} title={label} className="group cursor-pointer relative ">
                  <div className="-my-1">
                    <div className={active
                      ? 'bg-indigo-600 text-white flex items-center rounded-md h-full w-full text-sm leading-6 font-semibold whitespace-nowrap'
                      : 'text-white hover:bg-indigo-600 flex items-center rounded-md h-full w-full text-sm leading-6 font-semibold whitespace-nowrap'}>
                      <a className="flex w-full items-center gap-x-3 2xl:p-3 2xl-to-xl:p-2 p-2" href={`/${portal}/${TENANT}/${path}`}>
                        <span className={`${active ? 'text-white' : 'text-gray-400 group-hover:text-white'} h-6 w-6 shrink-0 whitespace-nowrap flex items-center justify-center 2xl:text-xl 2xl-to-xl:text-base text-base icon-${icon}`}></span>
                        <p className={active ? 'text-white' : 'text-gray-500 group-hover:text-white'}>{label}</p>
                      </a>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </nav>
        <div className="z-50 bg-gray-50 2xl:h-[calc(100vh-60px)] 2xl-to-xl:h-[calc(100vh-52px)] h-[calc(100vh-52px)] absolute top-0 duration-300 overflow-hidden shadow-md w-[0px] left-[220px]">
          <div className="p-5">
            <h3 className="text-black font-medium text-md capitalize"></h3>
            <ul className="mt-4" />
          </div>
        </div>
        <div className="group flex items-center py-[18px] px-8 gap-x-2 text-sm leading-6 font-semibold whitespace-nowrap bg-gray-200 text-indigo-200 cursor-pointer justify-start">
          <span className="icon-chevron-left-double text-xl block text-gray-700"></span>
          <p className="text-sm font-medium text-gray-700 leading-5">Collapse</p>
        </div>
      </div>
    </div>
  )
}

function RightRail({ portal }) {
  const [helpOpen, setHelpOpen] = useState(false)
  const ref = useRef(null)
  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setHelpOpen(false) }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])
  return (
    <div className="z-50 2xl:w-[65px] 2xl-to-xl:w-[52px] w-[52px] 2xl:flex-[0_0_65px] 2xl-to-xl:flex-[0_0_52px] flex-[0_0_52px] relative">
      <div className="absolute right-0">
        <div className="bg-gray-50 2xl:w-[65px] 2xl-to-xl:w-[52px] w-[52px] duration-300 relative min-h-full border-l border-gray-200 flex-shrink-0 flex flex-col justify-between 2xl:h-[calc(100vh-60px)] 2xl-to-xl:h-[calc(100vh-52px)] h-[calc(100vh-52px)]">
          <nav className="overflow-y-auto p-2 overflow-x-hidden h-auto">
            <ul className="space-y-1 max-h-[calc(100vh-245px)] overflow-auto flex flex-col" />
            <div className="text-indigo-700 flex items-center gap-x-3 cursor-pointer justify-center">
              <span className="icon-plus border bg-indigo-100 2xl:p-4 2xl-to-xl:p-2 p-2 rounded-lg 2xl:text-lg 2xl-to-xl:text-base text-base 2xl:size-10 2xl-to-xl:size-8 size-8 flex justify-center items-center"></span>
            </div>
            <div className="" />
          </nav>
          <div className="">
            <div ref={ref} className="mb-2 flex justify-center relative">
              <div className="" />
              {/* COPIED from helpdesk_help_menu_2026-10-05 (open state: bg-warning-500 text-white). Closed state = admin helpdesk_add_ticket_drawer_2026-10-05 (bg-warning-100 text-warning-500). */}
              <button type="button" onClick={() => setHelpOpen((o) => !o)}
                className={`outline-none font-semibold rounded-lg disabled:cursor-not-allowed border disabled:opacity-100 hover:opacity-90 text-sm overflow-hidden transition-all duration-300 2xl:py-2 2xl-to-xl:py-1 2xl:h-10 2xl-to-xl:h-8 h-8 p-0 border-warning-200 ${helpOpen ? 'bg-warning-500 text-white' : 'bg-warning-100 text-warning-500'} 2xl:w-10 2xl-to-xl:w-8 w-8`}>
                <div className="flex items-center justify-center gap-2">
                  <span className="icon-info-circle 2xl:text-xl 2xl-to-xl:text-lg text-lg" />
                  <span className="whitespace-nowrap 2xl:text-sm 2xl-to-xl:text-xs text-xs hidden">Help</span>
                </div>
              </button>
              <div className={`z-10 shadow-lg transition-all 2xl:w-80 2xl-to-xl:w-64 w-64 absolute -bottom-2 py-2 2xl:px-3 2xl-to-xl:px-2 px-2 bg-white border border-gray-200 border-r-0 rounded-l-lg 2xl:right-[65px] 2xl-to-xl:right-[52px] right-[52px] ${helpOpen ? 'opacity-100 visible pointer-events-auto' : 'pointer-events-none opacity-0 invisible'}`}>
                <ul className="pb-2 relative after:bottom-0 after:absolute after:w-[calc(100%+24px)] after:h-[1px] after:left-[-12px] after:border-b  after:bg-gray-200">
                  {HELP_MENU.map(([label, icon, href, target]) => {
                    const cls = '2xl:p-2.5 2xl-to-xl:p-1.5 p-1.5 flex gap-4 items-center transition-all duration-300 rounded-md hover:bg-gray-50 group'
                    const inner = (
                      <>
                        <span className={`${label === 'Quick Start Guide' ? '' : 'icon '}icon-${icon} 2xl:text-xl 2xl-to-xl:text-lg text-lg transition-all duration-300 text-gray-500 group-hover:text-gray-900`} />
                        <span className="2xl:text-base 2xl-to-xl:text-xs text-xs text-gray-900 font-medium">{label}</span>
                      </>
                    )
                    const to = href && href.replace('{portal}', portal).replace('{tenant}', TENANT)
                    return (
                      <li key={label}>
                        {!to ? <button type="button" className={`${cls} w-full text-left`}>{inner}</button>
                          : label === 'Help Center' ? <Link className={cls} to={to} onClick={() => setHelpOpen(false)}>{inner}</Link>
                          : <a className={cls} href={to} target={target}>{inner}</a>}
                      </li>
                    )
                  })}
                </ul>
                <div className="2xl:px-3 2xl-to-xl:px-2 px-2 pb-2">
                  <p className="2xl:min-h-[52px] 2xl-to-xl:min-h-10 min-h-10 text-gray-500 text-xs flex items-center">Stay connected to stay productive.</p>
                  <ul className="grid grid-cols-2 gap-3">
                    {HELP_APPS.map(([k, lbl, href]) => (
                      <li key={k}>
                        <a className="bg-indigo-25 hover:bg-indigo-50 transition-all flex gap-1.5 flex-col items-center justify-center p-2 rounded" href={href} target="_blank" rel="noreferrer">
                          <div className="h-8 w-8 flex justify-center items-center bg-white rounded-full">
                            <span className={`icon-${k} 2xl:text-lg 2xl-to-xl:text-base text-base text-gray-400`} />
                          </div>
                          <p className="2xl:text-base 2xl-to-xl:text-xs text-xs">{lbl}</p>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="group flex items-center 2xl:p-[18px] 2xl-to-xl:p-[13px] p-[13px] gap-x-2 2xl:text-sm 2xl-to-xl:text-xs text-xs leading-6 font-semibold whitespace-nowrap bg-gray-100 text-indigo-200 cursor-pointer justify-center">
              <span className="2xl:text-2xl 2xl-to-xl:text-xl text-xl block text-gray-500 icon-chevron-left-double"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function Breadcrumb({ trail }) {
  return (
    <nav className="flex border-b border-gray-200 py-2 bg-white items-center justify-between px-4" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2 overflow-x-auto flex-nowrap no-scrollbar scrollbar-hide sm:flex-wrap">
        <li>
          <div className="flex items-center">
            <a className="hover:text-gray-700 text-gray-500 sm:whitespace-normal whitespace-nowrap" href="#">
              <span className="icon-home-line flex-shrink-0 text-lg flex"></span>
            </a>
          </div>
        </li>
        {trail.map((t, i) => (
          <li key={t.label + i}>
            <div className="flex items-center">
              <span className="icon-chevron-right flex-shrink-0 text-base text-gray-300"></span>
              {t.to && i < trail.length - 1 ? (
                <Link className="text-gray-600 cursor-pointer hover:text-gray-800 ml-4 2xl:text-sm 2xl-to-xl:text-xs text-xs font-medium sm:whitespace-normal whitespace-nowrap" to={t.to}>{t.label}</Link>
              ) : (
                <a className="text-indigo-700 cursor-default pointer-events-none ml-4 2xl:text-sm 2xl-to-xl:text-xs text-xs font-medium sm:whitespace-normal whitespace-nowrap">{t.label}</a>
              )}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  )
}

export function Tabs({ items, active, onChange }) {
  const base = 'tab-transition font-semibold relative z-[20] whitespace-nowrap 2xl:py-2 2xl-to-xl:py-1.5 py-1.5 2xl:px-3 2xl-to-xl:px-2 px-2 w-max 2xl:text-sm 2xl-to-xl:text-xs text-xs text-center rounded-md'
  return (
    <div className="flex items-center justify-between w-full px-3 py-2">
      <div className="w-full flex items-center px-3">
        <div className="block w-full">
          <nav aria-label="Tabs" className="scrollbar-hide tab flex gap-3 items-center relative overflow-x-auto overflow-y-hidden horizontal-scrollbar-hide scrollbar-hide">
            {items.map((t, i) => (
              <a key={t} id={`tab-${i}`} aria-current={t === active ? 'page' : undefined} onClick={() => onChange && onChange(t)}
                 className={t === active ? `text-indigo-700 bg-indigo-50 ${base} active` : `text-gray-500 ${base}`}>{t}</a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}

/** Sticky white page header: breadcrumb + tabs, exactly as the app wraps them. */
export function PageHeader({ children }) {
  return (
    <div className="w-[webkit-fill-available] h-full">
      <div className="w-full relative">
        <div className="!p-0 transition-all duration-300 bg-white flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 sticky z-10 w-[calc(100vw-125px)] max-w-full">
          <div className="flex flex-col w-full">{children}</div>
        </div>
      </div>
    </div>
  )
}

/** Product tour modal — ships hidden (!hidden / opacity-0). */
/* COPIED from modules/admin/dom/helpdesk_help_menu_2026-10-05.html — the (hidden, `!hidden`) tour modal, step 1 "Menu Switcher".
   Image sources are the real ones; they are not served here, and the modal is never shown (Start Tour is a no-op in the prototype). */
const TOUR_POINTS = [
  'Access people management features under the People portal.',
  'Use CRM & Invoice portal for efficiently managing leads, deals, invoices & much more.',
  'Manage projects and task allocation under the Project Management portal.',
  'Manage a seamless hiring process under the Recruitment portal.',
  'Manage billing, customer support, emails & scheduler config under administration.',
]

function TourModal() {
  return (
    <div className="!hidden transition-all duration-100 ease-in-out absolute inset-0 flex items-center justify-center z-50">
      <div className="transition-opacity duration-100 ease-in-out 3xl:h-[90vh] 2xl:h-[87vh] xl:h-[88vh] h-[88vh] opacity-0 pointer-events-none bg-indigo-100 relative inline-flex mx-6 w-full max-w-max max-h-max border border-white/30 rounded-[16px] shadow-lg px-10 z-10 py-12">
        <div className="flex justify-between w-full">
          <div className="opacity-100 transition-all duration-100 ease-in-out flex flex-col 3xl:gap-y-4 2xl:gap-y-[.50rem] gap-y-2 xl:w-[35%] w-[40%] pr-5 overflow-auto 3xl:mt-20">
            <div className="max-w-max">
              <div className="bg-gray-900 flex items-center justify-center text-lg rounded-full w-[46px] h-[46px] p-4">
                <span className="icon-dots-grid bg-gray-900 text-white"></span>
              </div>
            </div>
            <div className="text-gray-900 font-semibold xl:text-[30px] text-lg leading-[38px]">Menu Switcher</div>
            <div className=" text-gray-500 font-medium text-[14px] leading-[20px]">
              Switch between CollabCRM modules with ease. Our smooth navigation keeps you focused and efficient by making the menu switching possible without leaving the current tab.
            </div>
            <div className="flex flex-col 3xl:gap-y-4 2xl:gap-y-[.50rem] xl:gap-y-4 gap-y-3">
              {TOUR_POINTS.map((b) => (
                <div key={b} className="text-gray-500 text-[14px] font-medium !leading-[20px] flex items-start justify-start gap-x-[12px]">
                  <img src="/assets/check-circle-821ec0f2.svg" alt="Overlay" className="min-w-[18px] max-w-[18px]" />
                  <div><span className="font-extrabold"></span>{b}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="opacity-100 transition-all duration-100 ease-in-out z-5 xl:w-[65%] w-[60%] overflow-hidden flex justify-center items-center">
            <img className="h-auto w-[75%] select-none" src="https://staging-media.collabcrm.com/collab_assets/people/tour/people-menu-switcher.webp" alt="Menu Switcher" />
          </div>
          <div className="absolute bottom-2 right-8 flex items-center gap-x-[8px]">
            <div className="flex items-baseline gap-x-1 mr-4 select-none">
              <div className="text-[22px] font-medium text-indigo-700 pt-2">01</div>
              <div className="text-gray-500 font-medium">/</div>
              <div className="text-[14px] font-medium text-gray-500">14</div>
            </div>
            <div className="flex items-center gap-x-2">
              <button className="p-2 text-lg flex items-center justify-center bg-gray-900 text-white rounded-full transition-all duration-100 icon-chevron-left ease-in-out opacity-20 cursor-not-allowed" disabled></button>
              <button className="p-2 text-lg flex items-center justify-center bg-gray-900 text-white rounded-full icon-chevron-right transition-all duration-100 before:translate-x-[1px] ease-in-out cursor-pointer hover:bg-white hover:text-gray-400"></button>
            </div>
          </div>
        </div>
        <img src="/assets/tourguide-bg-logo-a18994fb.svg" alt="Overlay" className="absolute top-0 right-0 select-none" />
        <img src="/assets/tourguide-bg-logo-a18994fb.svg" alt="Overlay" className="absolute bottom-0 left-0 select-none" />
        <div className="flex justify-center">
          <button className="absolute top-2 right-4 bg-none border-none cursor-pointer text-black text-xl z-50 transition-all ease-in-out hover:scale-105 duration-100">
            <img src="/assets/tour-close-icon-9f05d932.svg" alt="Overlay" className="xl:w-10 w-[30px]" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default function AppShell({ children, portal = 'people', nav = [], active, topRight = null, flyout = '', newMenu = null }) {
  return (
    <div className="">
      <OfflineOverlay />
      <div className="">
        <div className="main overflow-hidden">
          <BandwidthPopup />
          <div className="h-full">
            <div className="w-full">
              <TopBar portal={portal} topRight={topRight} newMenu={newMenu} />
              <main className="relative flex">
                <Sidebar nav={nav} activeLabel={active} portal={portal} flyout={flyout} />
                <div className="w-full bg-gray-100 p-0 overflow-x-auto overflow-y-hidden main-content-area">
                  <div className="relative">
                    <div className="w-[webkit-fill-available] h-full">{children}</div>
                    <div className="fixed top-0 left-[65px] w-[calc(100vw-120px)] h-screen bg-gray-900 z-40 transition-opacity duration-300 ease-in-out opacity-0 pointer-events-none xl:left-[220px] xl:w-[calc(100vw-220px)]" />
                    <TourModal />
                  </div>
                </div>
                <RightRail portal={portal} />
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
