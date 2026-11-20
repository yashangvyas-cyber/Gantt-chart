import { Fragment } from 'react'
import { TENANT } from '../data/tenant.js'

const RECRUITMENT_QUICK = {
  Jobs: { title: 'Add Job', path: 'jobs/add', cls: 'icon-plus-square block 2xl:p-2 2xl-to-xl:p-2 p-2 ml-auto 2xl:text-lg 2xl-to-xl:text-lg text-lg text-indigo-300 hover:text-white' },
  'Job Applications': { title: 'Add Application', path: 'job-applications/add', cls: 'icon-plus-square block 2xl:p-2 2xl-to-xl:p-2 p-2 ml-auto 2xl:text-lg 2xl-to-xl:text-lg text-lg text-indigo-300 hover:text-white' },
  'Talent Pool': { title: 'Add Talent', path: 'talent-pool/add', cls: 'icon-plus-square block 2xl:p-2 2xl-to-xl:p-2 p-2 ml-auto 2xl:text-lg 2xl-to-xl:text-lg text-lg text-indigo-300 hover:text-white' },
}

/* COPIED from modules/recruitment/dom/yop_mrp_snapshot_interview_rounds_2026-11-05.html (tojsx.py, free worker, 18 Nov 2026). Width w-[220px].
   Active item is "Job Applications"; quick-add links live in RECRUITMENT_QUICK. */
export function RecruitmentSidebar({ nav, activeLabel, portal, flyout = '' }) {
  return (
    <div className="bg-indigo-700 w-[220px] duration-300 relative 2xl:min-h-[calc(100vh-60px)] 2xl-to-xl:min-h-[calc(100vh-52px)] min-h-[calc(100vh-52px)]">
      <nav className="py-5 px-2 overflow-x-hidden sidebar-container 2xl:h-[calc(100vh-116px)] 2xl-to-xl:h-[calc(100vh-108px)] h-[calc(100vh-108px)]">
        <ul role="list" className="space-y-3  sidebar-container">
          {nav.map(([label, icon, path]) => {
            const active = label === activeLabel
            const q = RECRUITMENT_QUICK[label]
            return (
              <li key={label} title={label} className="relative group cursor-pointer">
                <div className="-my-1">
                  <div className={active
                    ? 'bg-indigo-600 text-white flex items-center rounded-md h-full w-full text-sm leading-6 font-semibold whitespace-nowrap'
                    : 'text-white hover:bg-indigo-600 flex items-center rounded-md h-full w-full text-sm leading-6 font-semibold whitespace-nowrap'}>
                    <a className="flex w-full items-center gap-x-3 2xl:p-2.5 2xl-to-xl:p-2 p-2" href={`/${portal}/${TENANT}/${path}`}>
                      <span className={`${active ? 'text-white' : 'text-indigo-200 group-hover:text-white'} h-6 w-6 shrink-0 whitespace-nowrap flex items-center justify-center text-base 2xl-to-xl:text-base 2xl:text-xl icon-${icon}`} />
                      <p className="truncate">
                        {label}
                      </p>
                    </a>
                    {q && <a title={q.title} className={q.cls} href={`/${portal}/${TENANT}/${q.path}`} />}
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
        <div className="z-50 bg-gray-50 2xl:h-[calc(100vh-60px)] 2xl-to-xl:h-[calc(100vh-52px)] h-[calc(100vh-52px)] absolute top-0 duration-300 overflow-hidden shadow-md w-[0px] left-[220px]">
          <div className="p-5">
            <h3 className="text-black font-medium text-md capitalize">{flyout}</h3>
            <ul className="mt-4">
              <li className="px-3 py-2" title="Dashboard">
                <a className="flex items-center cursor-pointer" href="/recruitment/yopmail/job-applications/b50da801-4015-4ed8-83f9-3e8ac9c8f32f/interview-rounds">
                  <p className="text-gray-600 text-sm font-semibold text-nowrap">
                    Dashboard
                  </p>
                </a>
              </li>
              <li className="px-3 py-2" title="Jobs">
                <a className="flex items-center cursor-pointer" href="/recruitment/yopmail/job-applications/b50da801-4015-4ed8-83f9-3e8ac9c8f32f/interview-rounds">
                  <p className="text-gray-600 text-sm font-semibold text-nowrap">
                    Jobs
                  </p>
                  <span title="Add Job" className="icon-plus-square block ml-auto text-xl text-gray-800" />
                </a>
              </li>
              <li className="px-3 py-2" title="Job Applications">
                <a className="flex items-center cursor-pointer" href="/recruitment/yopmail/job-applications/b50da801-4015-4ed8-83f9-3e8ac9c8f32f/interview-rounds">
                  <p className="text-gray-600 text-sm font-semibold text-nowrap">
                    Job Applications
                  </p>
                  <span title="Add Application" className="icon-plus-square block ml-auto text-xl text-gray-800" />
                </a>
              </li>
              <li className="px-3 py-2" title="Interviews">
                <a className="flex items-center cursor-pointer" href="/recruitment/yopmail/job-applications/b50da801-4015-4ed8-83f9-3e8ac9c8f32f/interview-rounds">
                  <p className="text-gray-600 text-sm font-semibold text-nowrap">
                    Interviews
                  </p>
                </a>
              </li>
              <li className="px-3 py-2" title="Talent Pool">
                <a className="flex items-center cursor-pointer" href="/recruitment/yopmail/job-applications/b50da801-4015-4ed8-83f9-3e8ac9c8f32f/interview-rounds">
                  <p className="text-gray-600 text-sm font-semibold text-nowrap">
                    Talent Pool
                  </p>
                  <span title="Add Talent" className="icon-plus-square block ml-auto text-xl text-gray-800" />
                </a>
              </li>
              <li className="px-3 py-2" title="Config">
                <a className="flex items-center cursor-pointer" href="/recruitment/yopmail/job-applications/b50da801-4015-4ed8-83f9-3e8ac9c8f32f/interview-rounds">
                  <p className="text-gray-600 text-sm font-semibold text-nowrap">
                    Config
                  </p>
                </a>
              </li>
              <li className="px-3 py-2" title="Timeline">
                <a className="flex items-center cursor-pointer" href="/recruitment/yopmail/job-applications/b50da801-4015-4ed8-83f9-3e8ac9c8f32f/interview-rounds">
                  <p className="text-gray-600 text-sm font-semibold text-nowrap">
                    Timeline
                  </p>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="group flex items-center py-[18px] px-8 gap-x-2 text-sm leading-6 font-semibold whitespace-nowrap bg-indigo-800 text-indigo-200 cursor-pointer justify-start">
        <span className="icon-chevron-left-double text-xl text-white block text-indigo-300" />
        <p className="text-sm font-medium text-white">
          Collapse
        </p>
      </div>
    </div>
  )
}

/* COPIED from modules/reports/dom/yop_time_spent_report.html (tojsx.py, free worker, 18 Nov 2026). Width w-[220px].
   Active item is "Project Management"; no extras. */
export function ReportsSidebar({ nav, activeLabel, portal, flyout = '' }) {
  return (
    <div className="bg-indigo-700 w-[220px] duration-300 relative 2xl:h-[calc(100vh-60px)] 2xl-to-xl:h-[calc(100vh-52px)] h-[calc(100vh-52px)]">
      <nav className="py-5 px-2 overflow-auto overflow-x-hidden sidebar-container 2xl:h-[calc(100vh-116px)] 2xl-to-xl:h-[calc(100vh-109px)] h-[calc(100vh-109px)]">
        <ul role="list" className="space-y-3  sidebar-container">
          {nav.map(([label, icon, path]) => {
            const active = label === activeLabel
            return (
              <li key={label} title={label} className="group cursor-pointer relative ">
                <div className="-my-1">
                  <div className={active
                    ? 'bg-indigo-600 text-white flex items-center rounded-md h-full w-full text-sm leading-6 font-semibold whitespace-nowrap'
                    : 'text-white hover:bg-indigo-600 flex items-center rounded-md h-full w-full text-sm leading-6 font-semibold whitespace-nowrap'}>
                    <a className="flex w-full items-center gap-x-3 2xl:p-3 2xl-to-xl:p-2 p-2" href={`/${portal}/${TENANT}/${path}`}>
                      <span className={`${active ? 'text-white' : 'text-indigo-200 group-hover:text-white'} h-6 w-6 shrink-0 whitespace-nowrap flex items-center justify-center 2xl:text-xl 2xl-to-xl:text-base text-base icon-${icon}`} />
                      <p>
                        {label}
                      </p>
                    </a>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
        <div className="z-50 bg-gray-50 2xl:h-[calc(100vh-60px)] 2xl-to-xl:h-[calc(100vh-52px)] h-[calc(100vh-52px)] absolute top-0 duration-300 overflow-hidden shadow-md w-[0px] left-[220px]">
          <div className="p-5">
            <h3 className="text-black font-medium text-md capitalize">{flyout}</h3>
            <ul className="mt-4" />
          </div>
        </div>
      </nav>
      <div className="group overflow-hidden flex items-center py-[18px] px-8 gap-x-2 text-sm leading-6 font-semibold whitespace-nowrap bg-indigo-800 text-indigo-200 cursor-pointer justify-start">
        <span className="icon-chevron-left-double text-xl text-white text-indigo-300" />
        <p className="text-sm font-medium text-white">
          Collapse
        </p>
      </div>
    </div>
  )
}

/* COPIED from modules/payroll/dom/yop_intsweep_2026-11-04_payroll__employees-compensation.html (tojsx.py, free worker, 18 Nov 2026). Width w-[270px].
   Active item is "Employees Compensation"; "Configuration" is a flyout parent (no href). */
export function PayrollSidebar({ nav, activeLabel, portal, flyout = '' }) {
  return (
    <div className="bg-indigo-700 w-[270px] duration-300 relative 2xl:min-h-[calc(100vh-60px)] 2xl-to-xl:min-h-[calc(100vh-52px)] min-h-[calc(100vh-52px)]">
      <nav className="py-5 px-2 overflow-x-hidden sidebar-container 2xl:h-[calc(100vh-116px)] 2xl-to-xl:h-[calc(100vh-108px)] h-[calc(100vh-108px)]">
        <ul role="list" className="space-y-3 sidebar-container">
          {nav.map(([label, icon, path]) => {
            const active = label === activeLabel
            if (path === null) {
              return (
                <li key={label} title={label} className="relative group cursor-pointer">
                  <div className="text-white hover:bg-indigo-600 relative z-2 cursor-pointer flex items-center gap-x-3 rounded-md 2xl:p-3 2xl-to-xl:p-2 p-2 text-sm leading-6 font-semibold whitespace-nowrap">
                    <span className={`text-indigo-200 group-hover:text-white h-6 w-6 shrink-0 whitespace-nowrap flex items-center justify-center text-base 2xl-to-xl:text-base 2xl:text-xl icon-${icon}`} />
                    <p>
                      {label}
                    </p>
                    <span className="icon-chevron-right block ml-auto text-xl text-indigo-300" />
                  </div>
                </li>
              )
            }
            return (
              <li key={label} title={label} className="relative group cursor-pointer">
                <div className="-my-1">
                  <div className={active
                    ? 'bg-indigo-600 text-white flex items-center rounded-md h-full w-full text-sm leading-6 font-semibold whitespace-nowrap'
                    : 'text-white hover:bg-indigo-600 flex items-center rounded-md h-full w-full text-sm leading-6 font-semibold whitespace-nowrap'}>
                    <a className="flex w-full items-center gap-x-3 2xl:p-3 2xl-to-xl:p-2 p-2" href={`/${portal}/${TENANT}/${path}`}>
                      <span className={`${active ? 'text-white' : 'text-indigo-200 group-hover:text-white'} h-6 w-6 shrink-0 whitespace-nowrap flex items-center justify-center text-base 2xl-to-xl:text-base 2xl:text-xl icon-${icon}`} />
                      <p>
                        {label}
                      </p>
                    </a>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
        <div className="z-50 bg-gray-50 absolute top-0 duration-300 overflow-hidden shadow-md whitespace-nowrap left-[100%] w-[0px] 2xl:h-[calc(100vh-60px)] 2xl-to-xl:h-[calc(100vh-52px)] h-[calc(100vh-52px)]">
          <div className="absolute 2xl-to-xl:top-4 top-4 2xl:right-8 2xl-to-xl:right-3.5 right-3.5 flex justify-end w-full">
            <div role="button" className="relative rounded-lg">
              <span className="relative icon icon-x-close flex text-lg text-gray-600 cursor-pointer" />
            </div>
          </div>
          <div className="2xl:p-5 2xl-to-xl:p-3 p-3 2xl:h-[calc(100vh-60px)] 2xl-to-xl:h-[calc(100vh-52px)] h-[calc(100vh-52px)] overflow-auto">
            <h3 className="text-black font-medium 2xl:text-base 2xl-to-xl:text-sm text-sm capitalize">{flyout}</h3>
            <ul className="mt-4" />
          </div>
        </div>
      </nav>
      <div className="group flex items-center py-[18px] px-8 gap-x-2 text-sm leading-6 font-semibold whitespace-nowrap bg-indigo-800 text-indigo-200 cursor-pointer justify-start">
        <span className="icon-chevron-left-double text-xl text-white block text-indigo-300" />
        <p className="text-sm font-medium text-white">
          Collapse
        </p>
      </div>
    </div>
  )
}

const CRM_QUICK = {
  Contacts: { title: 'Add Contact', path: 'contacts/add', cls: 'icon-plus-square p-2 block ml-auto text-lg 2xl:text-xl absolute top-1/2 right-1 -translate-y-1/2 text-indigo-300' },
  Companies: { title: 'Add Company', path: 'companies/add', cls: 'icon-plus-square p-2 block ml-auto text-lg 2xl:text-xl absolute top-1/2 right-1 -translate-y-1/2 text-indigo-300' },
  Leads: { title: 'Add Lead', path: 'leads/add', cls: 'icon-plus-square p-2 block ml-auto text-lg 2xl:text-xl absolute top-1/2 right-1 -translate-y-1/2 text-indigo-300' },
  Deals: { title: 'Add Deal', path: 'deals/add', cls: 'icon-plus-square p-2 block ml-auto text-lg 2xl:text-xl absolute top-1/2 right-1 -translate-y-1/2 text-indigo-300' },
  'Client Interviews': { title: 'Add Client Interview', path: 'client-interviews/add', cls: 'icon-plus-square p-2 block ml-auto text-lg 2xl:text-xl absolute top-1/2 right-1 -translate-y-1/2 text-indigo-300' },
  Invoices: { title: 'Add Invoice', path: 'invoice-management/invoices/add', cls: 'icon-plus-square p-2 block ml-auto text-lg 2xl:text-xl absolute top-1/2 right-1 -translate-y-1/2 text-indigo-300' },
  Payments: { title: 'Add Payment', path: 'invoice-management/payments/add', cls: 'icon-plus-square p-2 block ml-auto text-lg 2xl:text-xl absolute top-1/2 right-1 -translate-y-1/2 text-indigo-300' },
}

/* COPIED from modules/crm-invoice/dom/yop_study_2026-10-12_contacts__pass2__tab_notes.html (tojsx.py, free worker, 18 Nov 2026). Width w-[226px].
   Active item is "Contacts"; quick-add links live in CRM_QUICK, with a divider li before "Invoice Dashboard". */
export function CrmSidebar({ nav, activeLabel, portal, flyout = '' }) {
  return (
    <div className="bg-indigo-700 w-[226px] duration-300 relative 2xl:min-h-[calc(100vh-60px)] 2xl-to-xl:min-h-[calc(100vh-52px)] min-h-[calc(100vh-52px)]">
      <nav className="py-5 pb-3 px-2 overflow-y-auto overflow-x-hidden sidebar-container 2xl:h-[calc(100vh-116px)] 2xl-to-xl:h-[calc(100vh-108px)] h-[calc(100vh-108px)]">
        <ul role="list" className="space-y-3 sidebar-container">
          {nav.map(([label, icon, path]) => {
            const active = label === activeLabel
            const q = CRM_QUICK[label]
            return (
              <Fragment key={label}>
                {label === 'Invoice Dashboard' && (
                  <li>
                    <div className="bg-indigo-600 2xl:h-1 2xl-to-xl:h-0.5 h-0.5" />
                  </li>
                )}
                <li title={label} className="group cursor-pointer relative">
                  <div className="-my-1">
                    <div className="flex items-center justify-between relative hover:bg-indigo-600 rounded-md">
                      <div className={active
                        ? 'bg-indigo-600 text-white flex items-center rounded-md h-full w-full text-sm leading-6 font-semibold whitespace-nowrap'
                        : 'text-white hover:bg-indigo-600 flex items-center rounded-md h-full w-full text-sm leading-6 font-semibold whitespace-nowrap'}>
                        <a className="flex w-full items-center gap-x-3 2xl:p-3 2xl-to-xl:p-2 p-2" href={`/${portal}/${TENANT}/${path}`}>
                          <span className={`${active ? 'text-white' : 'text-indigo-200 group-hover:text-white'} h-6 w-6 shrink-0 whitespace-nowrap flex items-center justify-center text-base 2xl-to-xl:text-base 2xl:text-xl icon-${icon}`} />
                          <p className={active ? 'text-white' : 'text-indigo-100 group-hover:text-white'}>
                            {label}
                          </p>
                        </a>
                      </div>
                    </div>
                    {q && <a title={q.title} className={q.cls} href={`/${portal}/${TENANT}/${q.path}`} />}
                  </div>
                </li>
              </Fragment>
            )
          })}
        </ul>
        <div className="z-[99] bg-gray-50 h-[calc(100vh-60px)] absolute top-0 duration-300 overflow-hidden shadow-md w-[0px] left-[226px]">
          <div className="p-5">
            <h3 className="text-black font-medium text-md capitalize">{flyout}</h3>
            <ul className="mt-4" />
          </div>
        </div>
      </nav>
      <div className="group flex items-center py-[18px] px-8 gap-x-2 text-sm leading-6 font-semibold whitespace-nowrap bg-indigo-800 text-indigo-200 cursor-pointer justify-start">
        <span className="icon-chevron-left-double text-xl block text-indigo-300" />
        <p className="text-sm font-medium text-white leading-5">
          Collapse
        </p>
      </div>
    </div>
  )
}
