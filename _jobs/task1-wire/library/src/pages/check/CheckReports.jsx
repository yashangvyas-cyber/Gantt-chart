// CHECK page (kit-only): kit AppShell + the reports sidebar, around the page content COPIED with tojsx.py from
// modules/reports/dom/yop_time_spent_report.html (names made up). Used for verify_fidelity of the sidebar, 18 Nov 2026.
import AppShell from '../../components/AppShell.jsx'
import { REPORTS_NAV } from '../../data/nav.js'
export default function CheckReports() {
  return (
    <AppShell portal="reports" nav={REPORTS_NAV} active="Project Management" flyout="project-management">
<div className="relative">
  <nav className="flex border-b border-gray-200 py-2 bg-white items-center justify-between px-6" aria-label="Breadcrumb">
    <ol className="flex items-center space-x-2 overflow-x-auto flex-nowrap no-scrollbar scrollbar-hide sm:flex-wrap">
      <li>
        <div>
          <a className="hover:text-gray-700 text-gray-500 sm:whitespace-normal whitespace-nowrap" href="/reports/yopmail/dashboard">
            <span className="icon-home-line flex-shrink-0 text-lg flex" />
          </a>
        </div>
      </li>
      <li>
        <div className="flex items-center">
          <span className="icon-chevron-right flex-shrink-0 text-base text-gray-300" />
          <a className="text-gray-600 cursor-pointer hover:text-gray-800 ml-4 2xl:text-sm 2xl-to-xl:text-xs text-xs font-medium sm:whitespace-normal whitespace-nowrap" href="/reports/yopmail/project-management">
            Project Management
          </a>
        </div>
      </li>
      <li>
        <div className="flex items-center">
          <span className="icon-chevron-right flex-shrink-0 text-base text-gray-300" />
          <a className="text-indigo-700 cursor-default pointer-events-none ml-4 2xl:text-sm 2xl-to-xl:text-xs text-xs font-medium sm:whitespace-normal whitespace-nowrap" aria-current="page" href="/reports/yopmail/timespent-report">
            Time Spent Report
          </a>
        </div>
      </li>
    </ol>
  </nav>
  <div className="2xl:p-4 2xl-to-xl:p-3 p-3 w-full 2xl:h-[calc(100vh-97px)] 2xl-to-xl:h-[calc(100vh-88px)] h-[calc(100vh-88px)] overflow-auto">
    <div className="2xl:py-4 2xl-to-xl:py-2 py-2 2xl:px-5 2xl-to-xl:px-3 px-3 bg-white sticky z-30 border rounded-tl-lg rounded-tr-lg border-gray-200 border-b responsive-dropdown">
      <div className="flex justify-between relative">
        <div className="flex gap-x-2.5 items-center">
          <p className="font-semibold text-gray-900 2xl:text-lg 2xl-to-xl:text-sm text-sm">
            Time Spent Report
          </p>
          <div className="rounded-2xl border flex w-max font-medium items-center border-indigo-200 bg-indigo-50 2xl:!py-0.5 2xl-to-xl:!py-0 !py-0 2xl:text-sm 2xl-to-xl:text-xs text-indigo-700 py-0.5 px-2 text-xs">
            <span>
              <span className="font-bold">
                0 - 0
              </span>
              <span className="font-medium">
                of 0 Records
              </span>
            </span>
          </div>
        </div>
        <div className="flex items-center gap-x-3">
          <div className="rounded-lg flex items-center cursor-pointer relative z-50">
            <button className="cursor-pointer rounded-lg border 2xl:size-9 2xl-to-xl:size-8 size-8 flex relative z-[9999] items-center justify-center duration-300 outline-none border-gray-300">
              <div />
              <span className="2xl:text-xl 2xl-to-xl:text-lg text-lg block text-gray-700 icon-maximize-01" data-tooltip-id="collap" />
            </button>
          </div>
          <div>
            <div className="relative">
              <button className="flex items-center justify-center duration-300 outline-none rounded-lg border border-gray-300 cursor-not-allowed" disabled type="button" aria-expanded="false" style={{"width": "32px", "height": "32px"}}>
                <span className="2x:text-xl 2xl-to-xl:text-lg text-lg block icon-dots-vertical text-gray-700" />
              </button>
            </div>
            <div hidden style={{"position": "fixed", "top": "1px", "left": "1px", "width": "1px", "height": "0px", "padding": "0px", "margin": "-1px", "overflow": "hidden", "clip": "rect(0px, 0px, 0px, 0px)", "whiteSpace": "nowrap", "borderWidth": "0px", "display": "none"}} />
          </div>
        </div>
      </div>
    </div>
    <div className="relative bg-gray-200 z-2 border-l border-r">
      <form className="relative z-0 flex gap-2 p-2 border-x border-gray-200 responsive-filter">
        <div className="text-sm rounded-lg border border-gray-300 p-1 focus:ring-indigo-700 text-gray-800 bg-white flex w-full">
          <div className="flex w-full flex-wrap">
            <div className="flex gap-2 flex-wrap flex-grow pr-12 custom-skeleton">
              <div className="rounded-md flex-grow flex">
                <div className="flex items-center w-full">
                  <div className="w-full">
                    <div className="w-full h-full flex items-start">
                      <div className="flex items-center w-full">
                        <span className="icon-search-lg text-xl text-gray-400 ms-2 me-1" />
                        <input type="text" className="2xl:p-[7px] 2xl-to-xl:p-1 p-1 2xl:text-sm 2xl-to-xl:text-xs text-xs outline-none w-full" placeholder="Filter Results..." defaultValue="" />
                      </div>
                    </div>
                    <div className="transition-opacity duration-500 scale-0 opacity-0">
                      <ul className="absolute z-10 mt-2.5 left-0 top-full rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                        <li className="cursor-pointer min-w-[260px] 2xl:text-sm 2xl-to-xl:text-xs text-xs font-medium whitespace-nowrap px-3 py-2">
                          <span>
                            <div className="flex items-center">
                              <span className="icon-user-01 text-gray-600 2xl:text-lg 2xl-to-xl:text-base text-base pe-2" />
                              <span>
                                Employee Name
                              </span>
                            </div>
                          </span>
                        </li>
                        <li className="cursor-pointer min-w-[260px] 2xl:text-sm 2xl-to-xl:text-xs text-xs font-medium whitespace-nowrap px-3 py-2">
                          <span>
                            <div className="flex items-center">
                              <span className="icon-file-02 text-gray-600 2xl:text-lg 2xl-to-xl:text-base text-base pe-2" />
                              <span>
                                Project Name
                              </span>
                            </div>
                          </span>
                        </li>
                        <li className="cursor-pointer min-w-[260px] 2xl:text-sm 2xl-to-xl:text-xs text-xs font-medium whitespace-nowrap px-3 py-2">
                          <span>
                            <div className="flex items-center">
                              <span className="icon-calendar text-gray-600 2xl:text-lg 2xl-to-xl:text-base text-base pe-2" />
                              <span>
                                Date
                              </span>
                            </div>
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-8" />
        </div>
        <div>
          <button type="button" className="outline-none font-semibold rounded-lg disabled:cursor-not-allowed disabled:opacity-100 py-2.5 px-4 text-sm bg-indigo-50 border border-indigo-200 text-indigo-700 disabled:bg-gray-100 disabled:text-gray-500 disabled:border-gray-400" disabled>
            <div className="flex items-center justify-center gap-2">
              Filter
            </div>
          </button>
        </div>
      </form>
    </div>
    <div className="h-[calc(100vh-259px)] bg-white flex flex-col justify-center rounded-b-lg">
      <div className="flex items-center justify-center relative">
        <div className="p-8 rounded-full bg-gray-100">
          <span className="icon-layers-three-02 flex items-center justify-center text-[40px] text-gray-500" />
        </div>
      </div>
      <div className="flex items-center justify-center flex-col">
        <p className="pb-6 pt-5 text-gray-900 font-semibold 2xl:text-sm 2xl-to-xl:text-xs text-xs z-[1]">
          Apply filters to view results.
        </p>
      </div>
    </div>
  </div>
  <div className="fixed top-0 left-[65px] w-[calc(100vw-120px)] h-screen bg-gray-900 z-50 opacity-0 pointer-events-none xl:left-[220px] xl:w-[calc(100vw-220px)]" />
  <div className="!hidden transition-all duration-100 ease-in-out absolute inset-0 flex items-center justify-center z-50">
    <div className="transition-opacity duration-100 ease-in-out 3xl:h-[90vh] 2xl:h-[87vh] xl:h-[88vh] h-[88vh] opacity-0 pointer-events-none bg-indigo-100 relative inline-flex mx-6 w-full max-w-max max-h-max border border-white/30 rounded-[16px] shadow-lg px-10 z-10 py-12">
      <div className="flex justify-between w-full">
        <div className="opacity-100 transition-all duration-100 ease-in-out flex flex-col 3xl:gap-y-4 2xl:gap-y-[.50rem] gap-y-2 xl:w-[35%] w-[40%] pr-5 overflow-auto 3xl:mt-20">
          <div className="max-w-max">
            <div className="bg-gray-900 flex items-center justify-center text-lg rounded-full w-[46px] h-[46px] p-4">
              <span className="icon-grid-01 bg-gray-900 text-white" />
            </div>
          </div>
          <div className="text-gray-900 font-semibold xl:text-[30px] text-lg leading-[38px]">
            Dashboard
          </div>
          <div className=" text-gray-500 font-medium text-[14px] leading-[20px]">
            Get a complete overview of your organization’s administrative activities with this dashboard.
          </div>
          <div className="flex flex-col 3xl:gap-y-4 2xl:gap-y-[.50rem] xl:gap-y-4 gap-y-3">
            <div className="text-gray-500 text-[14px] font-medium !leading-[20px] flex items-start justify-start gap-x-[12px]">
              <img src="/reports/assets/check-circle-821ec0f2.svg" alt="Overlay" className="min-w-[18px] max-w-[18px]" />
              <div>
                <span className="font-extrabold" />
                Exclusive access for the organization’s administrator and authorized personnel.
              </div>
            </div>
            <div className="text-gray-500 text-[14px] font-medium !leading-[20px] flex items-start justify-start gap-x-[12px]">
              <img src="/reports/assets/check-circle-821ec0f2.svg" alt="Overlay" className="min-w-[18px] max-w-[18px]" />
              <div>
                <span className="font-extrabold" />
                Get a quick overview of all business units for informed configuration decisions.
              </div>
            </div>
            <div className="text-gray-500 text-[14px] font-medium !leading-[20px] flex items-start justify-start gap-x-[12px]">
              <img src="/reports/assets/check-circle-821ec0f2.svg" alt="Overlay" className="min-w-[18px] max-w-[18px]" />
              <div>
                <span className="font-extrabold" />
                Track key metrics like ticket statuses, billing summaries, and data migration progress.
              </div>
            </div>
            <div className="text-gray-500 text-[14px] font-medium !leading-[20px] flex items-start justify-start gap-x-[12px]">
              <img src="/reports/assets/check-circle-821ec0f2.svg" alt="Overlay" className="min-w-[18px] max-w-[18px]" />
              <div>
                <span className="font-extrabold" />
                Streamline workflows with centralized insights and quick-access shortcuts.
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-100 transition-all duration-100 ease-in-out z-5 xl:w-[65%] w-[60%] overflow-hidden flex justify-center items-center">
          <img className="h-auto w-[75%] select-none" src="/avatar-placeholder.svg" alt="Dashboard" />
        </div>
        <div className="absolute bottom-2 right-8 flex items-center gap-x-[8px]">
          <div className="flex items-baseline gap-x-1 mr-4 select-none">
            <div className="text-[22px] font-medium text-indigo-700 pt-2">
              01
            </div>
            <div className="text-gray-500 font-medium">
              /
            </div>
            <div className="text-[14px] font-medium text-gray-500">
              2
            </div>
          </div>
          <div className="flex items-center gap-x-2">
            <button className="p-2 text-lg flex items-center justify-center bg-gray-900 text-white rounded-full transition-all duration-100 icon-chevron-left ease-in-out opacity-20 cursor-not-allowed" disabled />
            <button className="p-2 text-lg flex items-center justify-center bg-gray-900 text-white rounded-full icon-chevron-right transition-all duration-100 before:translate-x-[1px] ease-in-out cursor-pointer hover:bg-white hover:text-gray-400" />
          </div>
        </div>
      </div>
      <img src="/reports/assets/tourguide-bg-logo-a18994fb.svg" alt="Overlay" className="absolute top-0 right-0 select-none" />
      <img src="/reports/assets/tourguide-bg-logo-a18994fb.svg" alt="Overlay" className="absolute bottom-0 left-0 select-none" />
      <div className="flex justify-center">
        <button className="absolute top-2 right-4 bg-none border-none cursor-pointer text-black text-xl z-50 transition-all ease-in-out hover:scale-105 duration-100">
          <img src="/reports/assets/tour-close-icon-9f05d932.svg" alt="Overlay" className="xl:w-10 w-[30px]" />
        </button>
      </div>
    </div>
  </div>
</div>
    </AppShell>
  )
}
