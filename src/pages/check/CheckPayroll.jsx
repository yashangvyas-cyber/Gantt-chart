// CHECK page (kit-only): kit AppShell + the payroll sidebar, around the page content COPIED with tojsx.py from
// modules/payroll/dom/yop_intsweep_2026-11-04_payroll__employees-compensation.html (names made up). Used for verify_fidelity of the sidebar, 18 Nov 2026.
import AppShell from '../../components/AppShell.jsx'
import { PAYROLL_NAV } from '../../data/nav.js'
export default function CheckPayroll() {
  return (
    <AppShell portal="payroll" nav={PAYROLL_NAV} active="Employees Compensation" flyout="">
<div className="w-[webkit-fill-available] h-full">
  <nav className="flex border-b border-gray-200 py-2 px-6 bg-white items-center justify-between" aria-label="Breadcrumb">
    <ol className="flex items-center space-x-2 overflow-x-auto flex-nowrap no-scrollbar scrollbar-hide sm:flex-wrap">
      <li>
        <div>
          <a className="hover:text-gray-700 text-gray-500 sm:whitespace-normal whitespace-nowrap" href="/payroll/yopmail/dashboard">
            <span className="icon-home-line flex-shrink-0 text-lg flex" />
          </a>
        </div>
      </li>
      <li>
        <div className="flex items-center">
          <span className="icon-chevron-right flex-shrink-0 text-base text-gray-300" />
          <a className="text-indigo-700 cursor-default pointer-events-none ml-4 2xl:text-sm 2xl-to-xl:text-xs text-xs font-medium sm:whitespace-normal whitespace-nowrap" aria-current="page" href="/payroll/yopmail/employees-compensation">
            Employees Compensation
          </a>
        </div>
      </li>
    </ol>
  </nav>
  <div className="2xl:p-4 p-3 w-full bg-gray-100 customScrollbar overflow-x-auto 2xl:h-[calc(100vh-97px)] 2xl-to-xl:h-[calc(100vh-87px)] h-[calc(100vh-87px)]">
    <div className="grid gap-4 w-full pb-6 relative grid-cols-1 sm:grid-cols-3">
      <div className="shadow-sm rounded-xl h-full min-w-0">
        <div className="bg-white rounded-xl 2xl:px-6 2xl:py-5 2xl-to-xl:p-4 p-4 transition-colors focus:outline-none focus-visible:outline-none h-full border">
          <h3 className="text-gray-600 2xl:text-sm 2xl-to-xl:text-xs text-xs font-medium">
            Employees on Payroll
          </h3>
          <div className="flex justify-between items-center mt-4">
            <div className="font-semibold 2xl:text-4xl 2xl-to-xl:text-2xl text-2xl truncate text-gray-900">
              434
            </div>
          </div>
        </div>
      </div>
      <div className="shadow-sm rounded-xl h-full min-w-0">
        <div role="button" tabIndex="0" className="bg-white rounded-xl 2xl:px-6 2xl:py-5 2xl-to-xl:p-4 p-4 focus:outline-none focus-visible:outline-none h-full border transition-colors cursor-pointer hover:border-indigo-200 hover:bg-indigo-50/60">
          <h3 className="text-gray-600 2xl:text-sm 2xl-to-xl:text-xs text-xs font-medium">
            Salary Structure Unassigned
          </h3>
          <div className="flex justify-between items-center mt-4">
            <div className="font-semibold 2xl:text-4xl 2xl-to-xl:text-2xl text-2xl truncate text-gray-900">
              382
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm h-full 2xl:px-6 2xl:py-5 2xl-to-xl:p-4 p-4 min-w-0">
        <h3 className="text-gray-600 2xl:text-sm text-xs font-medium 2xl:mb-3 mb-2">
          Statutory Applicability
        </h3>
        <div className="grid grid-cols-5 -mx-1.5 2xl:gap-x-2 gap-x-1 2xl:gap-y-3 gap-y-2">
          <button type="button" className="flex flex-col items-start gap-y-0.5 text-left min-w-0 w-full rounded-md px-1 py-0.5 border focus:outline-none focus-visible:outline-none border-transparent transition-colors cursor-pointer hover:border-indigo-200 hover:bg-indigo-50/60">
            <span title="PF" className="!text-xs leading-none truncate w-full text-gray-400">
              PF
            </span>
            <span className="2xl:text-base text-sm font-semibold leading-none text-gray-800">
              38
            </span>
          </button>
          <button type="button" className="flex flex-col items-start gap-y-0.5 text-left min-w-0 w-full rounded-md px-1 py-0.5 border focus:outline-none focus-visible:outline-none border-transparent transition-colors cursor-pointer hover:border-indigo-200 hover:bg-indigo-50/60">
            <span title="ESI" className="!text-xs leading-none truncate w-full text-gray-400">
              ESI
            </span>
            <span className="2xl:text-base text-sm font-semibold leading-none text-gray-800">
              25
            </span>
          </button>
          <button type="button" className="flex flex-col items-start gap-y-0.5 text-left min-w-0 w-full rounded-md px-1 py-0.5 border focus:outline-none focus-visible:outline-none border-transparent transition-colors cursor-pointer hover:border-indigo-200 hover:bg-indigo-50/60">
            <span title="LWF" className="!text-xs leading-none truncate w-full text-gray-400">
              LWF
            </span>
            <span className="2xl:text-base text-sm font-semibold leading-none text-gray-800">
              2
            </span>
          </button>
          <button type="button" className="flex flex-col items-start gap-y-0.5 text-left min-w-0 w-full rounded-md px-1 py-0.5 border focus:outline-none focus-visible:outline-none border-transparent transition-colors cursor-pointer hover:border-indigo-200 hover:bg-indigo-50/60">
            <span title="NPS" className="!text-xs leading-none truncate w-full text-gray-400">
              NPS
            </span>
            <span className="2xl:text-base text-sm font-semibold leading-none text-gray-800">
              12
            </span>
          </button>
          <button type="button" className="flex flex-col items-start gap-y-0.5 text-left min-w-0 w-full rounded-md px-1 py-0.5 border focus:outline-none focus-visible:outline-none border-transparent transition-colors cursor-pointer hover:border-indigo-200 hover:bg-indigo-50/60">
            <span title="Gratuity" className="!text-xs leading-none truncate w-full text-gray-400">
              Gratuity
            </span>
            <span className="2xl:text-base text-sm font-semibold leading-none text-gray-800">
              27
            </span>
          </button>
        </div>
      </div>
    </div>
    <div className="2xl:py-4 2xl:px-5 2xl-to-xl:py-2 py-2 2xl-to-xl:px-3 px-3 bg-white sticky top-0 border rounded-tl-lg rounded-tr-lg border-gray-200 border-b after:absolute after:w-[calc(100%+16px)] after:h-4 after:-top-[18px] after:-left-2 after:bg-gray-100 after:-z-1 z-20">
      <div className="flex justify-between items-center gap-3">
        <div className="flex gap-x-2.5 items-center shrink-0">
          <p className="font-semibold text-gray-900 2xl:text-lg 2xl-to-xl:text-base text-base">
            Employees Compensation
          </p>
          <span aria-live="polite" aria-busy="true">
            <span className="react-loading-skeleton" style={{"width": "150px", "height": "22px", "borderRadius": "99px"}}>
              ‌
            </span>
            <br />
          </span>
        </div>
        <div className="flex items-center gap-x-3 min-w-0 has-mini-multi-select-responsive">
          <div className="relative">
            <div className="cursor-pointer">
              <div className="w-[210px] p-multiselect p-component p-inputwrapper p-multiselect-chip p-multiselect-clearable" data-pc-name="multiselect" data-pc-section="root" style={{"width": "220px", "position": "relative"}}>
                <div className="p-hidden-accessible" data-p-hidden-accessible="true" data-pc-section="hiddeninputwrapper">
                  <input type="text" role="combobox" aria-expanded="false" aria-controls="pr_id_3-multi-selectbox" tabIndex="0" data-pc-section="input" readOnly defaultValue="" />
                </div>
                <div className="p-multiselect-label-container" data-pc-section="labelcontainer">
                  <div className="p-multiselect-label p-placeholder" data-pc-section="label">
                    Select Business Unit
                  </div>
                </div>
                <div className="p-multiselect-trigger" data-pc-section="trigger">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none" className="transition-transform duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] rotate-0" style={{"animation": "0.2s cubic-bezier(0.4, 0, 0.2, 1) 0s 1 normal forwards running rotateUp"}}>
                    <path fillRule="evenodd" clipRule="evenodd" d="M11.9999 13.9394L17.4696 8.46973L18.5303 9.53039L11.9999 16.0607L5.46961 9.53039L6.53027 8.46973L11.9999 13.9394Z" fill="#ccc" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="relative w-[220px] !w-[210px] !min-w-[210px] !max-w-[210px]">
            <div className="has-custom-multi-select-responsive w-full border !border-[#d1d5db] rounded-md bg-white text-sm outline-none flex items-center justify-between gap-2 cursor-pointer px-2 py-1 min-h-10">
              <div className="flex items-center flex-1 overflow-hidden">
                <span className="text-[#847f80] text-sm whitespace-nowrap truncate">
                  Select Salary Structure
                </span>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none" className="responsive-class transition-transform duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] rotate-0" style={{"animation": "auto ease 0s 1 normal none running none"}}>
                <path fillRule="evenodd" clipRule="evenodd" d="M11.9999 13.9394L17.4696 8.46973L18.5303 9.53039L11.9999 16.0607L5.46961 9.53039L6.53027 8.46973L11.9999 13.9394Z" fill="#ccc" />
              </svg>
            </div>
          </div>
          <button title="Import Employee Compensation" type="submit" className="outline-none font-semibold rounded-lg disabled:cursor-not-allowed border disabled:opacity-100 focus-visible:border-indigo-300 focus-visible:shadow-outline-purple hover:opacity-90 disabled:bg-indigo-200 px-4 border-transparent bg-indigo-600 text-white 2xl:text-sm 2xl-to-xl:text-xs text-xs 2xl:py-1.5 2xl-to-xl:py-1 py-1 2xl:h-9 2xl-to-xl:h-8 h-8 shrink-0">
            <div className="flex items-center justify-center gap-2">
              <span className="icon-file-import 2xl:text-lg text-base" />
              Import
            </div>
          </button>
          <div className="relative">
            <button className="flex items-center justify-center duration-300 outline-none rounded-lg border border-gray-300 cursor-not-allowed" disabled type="button" aria-expanded="false" style={{"width": "32px", "height": "32px"}}>
              <span className="2x:text-xl 2xl-to-xl:text-lg text-lg block icon-dots-vertical text-gray-700" />
            </button>
          </div>
          <div hidden style={{"position": "fixed", "top": "1px", "left": "1px", "width": "1px", "height": "0px", "padding": "0px", "margin": "-1px", "overflow": "hidden", "clip": "rect(0px, 0px, 0px, 0px)", "whiteSpace": "nowrap", "borderWidth": "0px", "display": "none"}} />
        </div>
      </div>
    </div>
    <div className="bg-gray-100 sticky -top-1 z-1 h-4 -mt-4 w-full" />
    <div className="bg-gray-200 sticky z-1 border-l border-r 2xl:top-[70px] 2xl-to-xl:top-[50px] top-[50px]">
      <form className="relative z-0 flex gap-2 p-2 border-x border-gray-200 responsive-filter">
        <div className="flex items-center filter-option-menu text-sm rounded-lg border border-gray-300 p-[1px] focus:ring-indigo-700 text-gray-800 bg-white max-h-[42px]">
          <div>
            <div className="">
              <div className="border-none w-[45px] px-0.5 2xl:text-sm 2xl-to-xl:text-xs text-xs css-b62m3t-container">
                <span className="css-7pg0cj-a11yText" />
                <span aria-live="polite" aria-atomic="false" aria-relevant="additions text" role="log" className="css-7pg0cj-a11yText" />
                <div className="2xl:text-sm 2xl-to-xl:text-xs text-xs react-select__control css-1ff06q0-control">
                  <div className="2xl:text-sm 2xl-to-xl:text-xs text-xs react-select__value-container 2xl:text-sm 2xl-to-xl:text-xs text-xs react-select__value-container--has-value css-1xz9i25">
                    <div className="2xl:text-sm 2xl-to-xl:text-xs text-xs react-select__single-value css-1dimb5e-singleValue">
                      <div className="flex items-center justify-center">
                        <span className="icon-sigma text-indigo-700 text-[15px]" />
                      </div>
                    </div>
                    <input tabIndex="0" inputMode="none" aria-autocomplete="list" aria-expanded="false" aria-haspopup="true" role="combobox" aria-activedescendant="" aria-readonly="true" className="css-1hac4vs-dummyInput" defaultValue="" />
                  </div>
                  <div className="2xl:text-sm 2xl-to-xl:text-xs text-xs react-select__indicators css-eybemu">
                    <span className="icon-chevron-down pe-0.5 text-[17px]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-sm rounded-lg border border-gray-300 p-1 focus:ring-indigo-700 text-gray-800 bg-white flex w-full">
          <div className="flex w-full flex-wrap gap-2">
            <div className="flex gap-2 flex-wrap flex-grow pr-12">
              <div className="bg-gray-100 cursor-pointer rounded-md flex px-0.5">
                <div className="flex items-start py-1 px-0.5 gap-0.5 bg-gray-100 rounded-md">
                  <div className="2xl:text-sm 2xl-to-xl:text-xs text-xs border border-gray-300 rounded py-0.5 px-1.5 bg-white text-gray-700 w-full flex items-center justify-center font-semibold">
                    <span className="">
                      <div className="flex items-center">
                        <span className="icon-check-verified-02 text-gray-600 2xl:text-lg 2xl-to-xl:text-base text-base pe-2" />
                        <span>
                          Employee Status
                        </span>
                      </div>
                    </span>
                  </div>
                </div>
                <div className="flex items-start py-1 px-0.5 gap-0.5 bg-gray-100 rounded-md">
                  <div className="2xl:text-sm 2xl-to-xl:text-xs text-xs border border-gray-300 rounded py-0.5 px-1.5 bg-white text-gray-700 font-medium w-full flex items-center justify-center">
                    <span className="">
                      Is not
                    </span>
                  </div>
                </div>
                <div className="flex items-start py-1 px-0.5 gap-0.5 bg-gray-100 rounded-md">
                  <div className="2xl:text-sm 2xl-to-xl:text-xs text-xs border border-gray-300 rounded py-0.5 px-1.5 bg-white text-gray-700 font-medium w-full flex items-center justify-center">
                    <span className="text-wrap break-all">
                      Relieved
                    </span>
                  </div>
                </div>
                <span className="icon-x-close text-base my-auto cursor-pointer hover:bg-red-300 hover:text-white p-0.5 rounded-sm m-1" />
              </div>
              <div className="bg-gray-100 cursor-pointer rounded-md flex px-0.5">
                <div className="flex items-start py-1 px-0.5 gap-0.5 bg-gray-100 rounded-md">
                  <div className="2xl:text-sm 2xl-to-xl:text-xs text-xs border border-gray-300 rounded py-0.5 px-1.5 bg-white text-gray-700 w-full flex items-center justify-center font-semibold">
                    <span className="">
                      <div className="flex items-center">
                        <span className="icon-check-verified-02 text-gray-600 2xl:text-lg 2xl-to-xl:text-base text-base pe-2" />
                        <span>
                          Account Status
                        </span>
                      </div>
                    </span>
                  </div>
                </div>
                <div className="flex items-start py-1 px-0.5 gap-0.5 bg-gray-100 rounded-md">
                  <div className="2xl:text-sm 2xl-to-xl:text-xs text-xs border border-gray-300 rounded py-0.5 px-1.5 bg-white text-gray-700 font-medium w-full flex items-center justify-center">
                    <span className="">
                      Is
                    </span>
                  </div>
                </div>
                <div className="flex items-start py-1 px-0.5 gap-0.5 bg-gray-100 rounded-md">
                  <div className="2xl:text-sm 2xl-to-xl:text-xs text-xs border border-gray-300 rounded py-0.5 px-1.5 bg-white text-gray-700 font-medium w-full flex items-center justify-center">
                    <span className="text-wrap break-all">
                      Active
                    </span>
                  </div>
                </div>
                <span className="icon-x-close text-base my-auto cursor-pointer hover:bg-red-300 hover:text-white p-0.5 rounded-sm m-1" />
              </div>
              <div className="rounded-md flex-grow flex">
                <div className="flex items-center w-full">
                  <div>
                    <button type="submit" className="outline-none font-semibold disabled:cursor-not-allowed disabled:opacity-100 focus-visible:border-indigo-300 focus-visible:shadow-outline-purple hover:opacity-90 disabled:bg-indigo-200 icon-plus cursor-pointer rounded-lg border border-indigo-200 bg-indigo-50 text-indigo-700 text-md p-1">
                      <div className="flex items-center justify-center gap-2" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-8">
            <div className="h-full flex items-center w-full px-1 cursor-pointer">
              <span className="icon-x-close text-lg hover:bg-red-300 rounded-sm ms-1 hover:text-white" />
            </div>
          </div>
        </div>
        <div>
          <button type="button" className="outline-none font-semibold rounded-lg disabled:cursor-not-allowed disabled:opacity-100 focus-visible:border-indigo-300 focus-visible:shadow-outline-purple hover:opacity-90 py-2.5 px-4 bg-indigo-50 border border-indigo-200 text-indigo-700 disabled:bg-gray-100 disabled:text-gray-500 disabled:border-gray-400 2xl:text-sm 2xl-to-xl:text-xs text-xs 2xl:min-h-[42px] 2xl-to-xl:min-h-10 min-h-10 flex justify-center items-center">
            <div className="flex items-center justify-center gap-2">
              Filter
            </div>
          </button>
        </div>
      </form>
    </div>
    <div className="overflow-hidden !p-0">
      <div className="w-full h-16 bg-white px-4 flex items-center border-b-[1px]">
        <div className="w-[20%] mr-[7.5%] ml-[1%]">
          <span aria-live="polite" aria-busy="true">
            <span className="react-loading-skeleton" style={{"height": "22px", "--base-color": "#F2F4F7", "--highlight-color": "#EAECF0"}}>
              ‌
            </span>
            <br />
          </span>
        </div>
        <span aria-live="polite" aria-busy="true">
          <span className="react-loading-skeleton" style={{"maskImage": "radial-gradient(circle, white 100%, transparent 100%)", "width": "26px", "height": "26px", "borderRadius": "50%", "--base-color": "#F2F4F7", "--highlight-color": "#EAECF0"}}>
            ‌
          </span>
          <br />
        </span>
        <div className="w-[28%] mr-[7.25%] ml-[0.75%]">
          <span aria-live="polite" aria-busy="true">
            <span className="react-loading-skeleton" style={{"height": "22px", "--base-color": "#F2F4F7", "--highlight-color": "#EAECF0"}}>
              ‌
            </span>
            <br />
          </span>
        </div>
        <div className="w-[33%] mr-[6.85%]">
          <span aria-live="polite" aria-busy="true">
            <span className="react-loading-skeleton" style={{"height": "22px", "--base-color": "#F2F4F7", "--highlight-color": "#EAECF0"}}>
              ‌
            </span>
            <br />
          </span>
        </div>
        <div className="w-[22%] mr-[6.75%]">
          <span aria-live="polite" aria-busy="true">
            <span className="react-loading-skeleton" style={{"height": "22px", "--base-color": "#F2F4F7", "--highlight-color": "#EAECF0"}}>
              ‌
            </span>
            <br />
          </span>
        </div>
        <div className="w-[17%] mr-[3.75%]">
          <span aria-live="polite" aria-busy="true">
            <span className="react-loading-skeleton" style={{"height": "22px", "--base-color": "#F2F4F7", "--highlight-color": "#EAECF0"}}>
              ‌
            </span>
            <br />
          </span>
        </div>
      </div>
      <div className="w-full h-16 bg-white px-4 flex items-center border-b-[1px]">
        <div className="w-[20%] mr-[7.5%] ml-[1%]">
          <span aria-live="polite" aria-busy="true">
            <span className="react-loading-skeleton" style={{"height": "22px", "--base-color": "#F2F4F7", "--highlight-color": "#EAECF0"}}>
              ‌
            </span>
            <br />
          </span>
        </div>
        <span aria-live="polite" aria-busy="true">
          <span className="react-loading-skeleton" style={{"maskImage": "radial-gradient(circle, white 100%, transparent 100%)", "width": "26px", "height": "26px", "borderRadius": "50%", "--base-color": "#F2F4F7", "--highlight-color": "#EAECF0"}}>
            ‌
          </span>
          <br />
        </span>
        <div className="w-[28%] mr-[7.25%] ml-[0.75%]">
          <span aria-live="polite" aria-busy="true">
            <span className="react-loading-skeleton" style={{"height": "22px", "--base-color": "#F2F4F7", "--highlight-color": "#EAECF0"}}>
              ‌
            </span>
            <br />
          </span>
        </div>
        <div className="w-[33%] mr-[6.85%]">
          <span aria-live="polite" aria-busy="true">
            <span className="react-loading-skeleton" style={{"height": "22px", "--base-color": "#F2F4F7", "--highlight-color": "#EAECF0"}}>
              ‌
            </span>
            <br />
          </span>
        </div>
        <div className="w-[22%] mr-[6.75%]">
          <span aria-live="polite" aria-busy="true">
            <span className="react-loading-skeleton" style={{"height": "22px", "--base-color": "#F2F4F7", "--highlight-color": "#EAECF0"}}>
              ‌
            </span>
            <br />
          </span>
        </div>
        <div className="w-[17%] mr-[3.75%]">
          <span aria-live="polite" aria-busy="true">
            <span className="react-loading-skeleton" style={{"height": "22px", "--base-color": "#F2F4F7", "--highlight-color": "#EAECF0"}}>
              ‌
            </span>
            <br />
          </span>
        </div>
      </div>
      <div className="w-full h-16 bg-white px-4 flex items-center border-b-[1px]">
        <div className="w-[20%] mr-[7.5%] ml-[1%]">
          <span aria-live="polite" aria-busy="true">
            <span className="react-loading-skeleton" style={{"height": "22px", "--base-color": "#F2F4F7", "--highlight-color": "#EAECF0"}}>
              ‌
            </span>
            <br />
          </span>
        </div>
        <span aria-live="polite" aria-busy="true">
          <span className="react-loading-skeleton" style={{"maskImage": "radial-gradient(circle, white 100%, transparent 100%)", "width": "26px", "height": "26px", "borderRadius": "50%", "--base-color": "#F2F4F7", "--highlight-color": "#EAECF0"}}>
            ‌
          </span>
          <br />
        </span>
        <div className="w-[28%] mr-[7.25%] ml-[0.75%]">
          <span aria-live="polite" aria-busy="true">
            <span className="react-loading-skeleton" style={{"height": "22px", "--base-color": "#F2F4F7", "--highlight-color": "#EAECF0"}}>
              ‌
            </span>
            <br />
          </span>
        </div>
        <div className="w-[33%] mr-[6.85%]">
          <span aria-live="polite" aria-busy="true">
            <span className="react-loading-skeleton" style={{"height": "22px", "--base-color": "#F2F4F7", "--highlight-color": "#EAECF0"}}>
              ‌
            </span>
            <br />
          </span>
        </div>
        <div className="w-[22%] mr-[6.75%]">
          <span aria-live="polite" aria-busy="true">
            <span className="react-loading-skeleton" style={{"height": "22px", "--base-color": "#F2F4F7", "--highlight-color": "#EAECF0"}}>
              ‌
            </span>
            <br />
          </span>
        </div>
        <div className="w-[17%] mr-[3.75%]">
          <span aria-live="polite" aria-busy="true">
            <span className="react-loading-skeleton" style={{"height": "22px", "--base-color": "#F2F4F7", "--highlight-color": "#EAECF0"}}>
              ‌
            </span>
            <br />
          </span>
        </div>
      </div>
      <div className="w-full h-16 bg-white px-4 flex items-center border-b-[1px]">
        <div className="w-[20%] mr-[7.5%] ml-[1%]">
          <span aria-live="polite" aria-busy="true">
            <span className="react-loading-skeleton" style={{"height": "22px", "--base-color": "#F2F4F7", "--highlight-color": "#EAECF0"}}>
              ‌
            </span>
            <br />
          </span>
        </div>
        <span aria-live="polite" aria-busy="true">
          <span className="react-loading-skeleton" style={{"maskImage": "radial-gradient(circle, white 100%, transparent 100%)", "width": "26px", "height": "26px", "borderRadius": "50%", "--base-color": "#F2F4F7", "--highlight-color": "#EAECF0"}}>
            ‌
          </span>
          <br />
        </span>
        <div className="w-[28%] mr-[7.25%] ml-[0.75%]">
          <span aria-live="polite" aria-busy="true">
            <span className="react-loading-skeleton" style={{"height": "22px", "--base-color": "#F2F4F7", "--highlight-color": "#EAECF0"}}>
              ‌
            </span>
            <br />
          </span>
        </div>
        <div className="w-[33%] mr-[6.85%]">
          <span aria-live="polite" aria-busy="true">
            <span className="react-loading-skeleton" style={{"height": "22px", "--base-color": "#F2F4F7", "--highlight-color": "#EAECF0"}}>
              ‌
            </span>
            <br />
          </span>
        </div>
        <div className="w-[22%] mr-[6.75%]">
          <span aria-live="polite" aria-busy="true">
            <span className="react-loading-skeleton" style={{"height": "22px", "--base-color": "#F2F4F7", "--highlight-color": "#EAECF0"}}>
              ‌
            </span>
            <br />
          </span>
        </div>
        <div className="w-[17%] mr-[3.75%]">
          <span aria-live="polite" aria-busy="true">
            <span className="react-loading-skeleton" style={{"height": "22px", "--base-color": "#F2F4F7", "--highlight-color": "#EAECF0"}}>
              ‌
            </span>
            <br />
          </span>
        </div>
      </div>
      <div className="w-full h-16 bg-white px-4 flex items-center border-b-[1px]">
        <div className="w-[20%] mr-[7.5%] ml-[1%]">
          <span aria-live="polite" aria-busy="true">
            <span className="react-loading-skeleton" style={{"height": "22px", "--base-color": "#F2F4F7", "--highlight-color": "#EAECF0"}}>
              ‌
            </span>
            <br />
          </span>
        </div>
        <span aria-live="polite" aria-busy="true">
          <span className="react-loading-skeleton" style={{"maskImage": "radial-gradient(circle, white 100%, transparent 100%)", "width": "26px", "height": "26px", "borderRadius": "50%", "--base-color": "#F2F4F7", "--highlight-color": "#EAECF0"}}>
            ‌
          </span>
          <br />
        </span>
        <div className="w-[28%] mr-[7.25%] ml-[0.75%]">
          <span aria-live="polite" aria-busy="true">
            <span className="react-loading-skeleton" style={{"height": "22px", "--base-color": "#F2F4F7", "--highlight-color": "#EAECF0"}}>
              ‌
            </span>
            <br />
          </span>
        </div>
        <div className="w-[33%] mr-[6.85%]">
          <span aria-live="polite" aria-busy="true">
            <span className="react-loading-skeleton" style={{"height": "22px", "--base-color": "#F2F4F7", "--highlight-color": "#EAECF0"}}>
              ‌
            </span>
            <br />
          </span>
        </div>
        <div className="w-[22%] mr-[6.75%]">
          <span aria-live="polite" aria-busy="true">
            <span className="react-loading-skeleton" style={{"height": "22px", "--base-color": "#F2F4F7", "--highlight-color": "#EAECF0"}}>
              ‌
            </span>
            <br />
          </span>
        </div>
        <div className="w-[17%] mr-[3.75%]">
          <span aria-live="polite" aria-busy="true">
            <span className="react-loading-skeleton" style={{"height": "22px", "--base-color": "#F2F4F7", "--highlight-color": "#EAECF0"}}>
              ‌
            </span>
            <br />
          </span>
        </div>
      </div>
      <div className="w-full h-16 bg-white px-4 flex items-center border-b-[1px]">
        <div className="w-[20%] mr-[7.5%] ml-[1%]">
          <span aria-live="polite" aria-busy="true">
            <span className="react-loading-skeleton" style={{"height": "22px", "--base-color": "#F2F4F7", "--highlight-color": "#EAECF0"}}>
              ‌
            </span>
            <br />
          </span>
        </div>
        <span aria-live="polite" aria-busy="true">
          <span className="react-loading-skeleton" style={{"maskImage": "radial-gradient(circle, white 100%, transparent 100%)", "width": "26px", "height": "26px", "borderRadius": "50%", "--base-color": "#F2F4F7", "--highlight-color": "#EAECF0"}}>
            ‌
          </span>
          <br />
        </span>
        <div className="w-[28%] mr-[7.25%] ml-[0.75%]">
          <span aria-live="polite" aria-busy="true">
            <span className="react-loading-skeleton" style={{"height": "22px", "--base-color": "#F2F4F7", "--highlight-color": "#EAECF0"}}>
              ‌
            </span>
            <br />
          </span>
        </div>
        <div className="w-[33%] mr-[6.85%]">
          <span aria-live="polite" aria-busy="true">
            <span className="react-loading-skeleton" style={{"height": "22px", "--base-color": "#F2F4F7", "--highlight-color": "#EAECF0"}}>
              ‌
            </span>
            <br />
          </span>
        </div>
        <div className="w-[22%] mr-[6.75%]">
          <span aria-live="polite" aria-busy="true">
            <span className="react-loading-skeleton" style={{"height": "22px", "--base-color": "#F2F4F7", "--highlight-color": "#EAECF0"}}>
              ‌
            </span>
            <br />
          </span>
        </div>
        <div className="w-[17%] mr-[3.75%]">
          <span aria-live="polite" aria-busy="true">
            <span className="react-loading-skeleton" style={{"height": "22px", "--base-color": "#F2F4F7", "--highlight-color": "#EAECF0"}}>
              ‌
            </span>
            <br />
          </span>
        </div>
      </div>
      <div className="w-full h-16 bg-white px-4 flex items-center border-b-[1px]">
        <div className="w-[20%] mr-[7.5%] ml-[1%]">
          <span aria-live="polite" aria-busy="true">
            <span className="react-loading-skeleton" style={{"height": "22px", "--base-color": "#F2F4F7", "--highlight-color": "#EAECF0"}}>
              ‌
            </span>
            <br />
          </span>
        </div>
        <span aria-live="polite" aria-busy="true">
          <span className="react-loading-skeleton" style={{"maskImage": "radial-gradient(circle, white 100%, transparent 100%)", "width": "26px", "height": "26px", "borderRadius": "50%", "--base-color": "#F2F4F7", "--highlight-color": "#EAECF0"}}>
            ‌
          </span>
          <br />
        </span>
        <div className="w-[28%] mr-[7.25%] ml-[0.75%]">
          <span aria-live="polite" aria-busy="true">
            <span className="react-loading-skeleton" style={{"height": "22px", "--base-color": "#F2F4F7", "--highlight-color": "#EAECF0"}}>
              ‌
            </span>
            <br />
          </span>
        </div>
        <div className="w-[33%] mr-[6.85%]">
          <span aria-live="polite" aria-busy="true">
            <span className="react-loading-skeleton" style={{"height": "22px", "--base-color": "#F2F4F7", "--highlight-color": "#EAECF0"}}>
              ‌
            </span>
            <br />
          </span>
        </div>
        <div className="w-[22%] mr-[6.75%]">
          <span aria-live="polite" aria-busy="true">
            <span className="react-loading-skeleton" style={{"height": "22px", "--base-color": "#F2F4F7", "--highlight-color": "#EAECF0"}}>
              ‌
            </span>
            <br />
          </span>
        </div>
        <div className="w-[17%] mr-[3.75%]">
          <span aria-live="polite" aria-busy="true">
            <span className="react-loading-skeleton" style={{"height": "22px", "--base-color": "#F2F4F7", "--highlight-color": "#EAECF0"}}>
              ‌
            </span>
            <br />
          </span>
        </div>
      </div>
      <div className="w-full h-14 px-6 pb-1 flex items-center justify-between rounded-b-md" style={{"backgroundColor": "rgb(249, 250, 251)"}}>
        <div className="w-[12%]">
          <span aria-live="polite" aria-busy="true">
            <span className="react-loading-skeleton" style={{"height": "34px", "--base-color": "#F2F4F7", "--highlight-color": "#EAECF0"}}>
              ‌
            </span>
            <br />
          </span>
        </div>
        <div className="w-[12%]">
          <span aria-live="polite" aria-busy="true">
            <span className="react-loading-skeleton" style={{"height": "35px", "--base-color": "#F2F4F7", "--highlight-color": "#EAECF0"}}>
              ‌
            </span>
            <br />
          </span>
        </div>
      </div>
    </div>
  </div>
</div>
    </AppShell>
  )
}
