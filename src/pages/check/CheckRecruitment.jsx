// CHECK page (kit-only): kit AppShell + the recruitment sidebar, around the page content COPIED with tojsx.py from
// modules/recruitment/dom/yop_mrp_snapshot_interview_rounds_2026-11-05.html (names made up). Used for verify_fidelity of the sidebar, 18 Nov 2026.
import AppShell from '../../components/AppShell.jsx'
import { RECRUITMENT_NAV, RECRUITMENT_NEW } from '../../data/nav.js'
export default function CheckRecruitment() {
  return (
    <AppShell portal="recruitment" nav={RECRUITMENT_NAV} active="Job Applications" flyout="job-applications" newMenu={RECRUITMENT_NEW}>
<div className="overflow-hidden">
  <nav className="flex border-b border-gray-200 py-2 px-6 bg-white items-center justify-between" aria-label="Breadcrumb">
    <ol className="flex items-center space-x-2 overflow-x-auto flex-nowrap no-scrollbar scrollbar-hide sm:flex-wrap">
      <li>
        <div>
          <a className="hover:text-gray-700 text-gray-500 sm:whitespace-normal whitespace-nowrap" href="/recruitment/yopmail/dashboard">
            <span className="icon-home-line flex-shrink-0 text-lg flex" />
          </a>
        </div>
      </li>
      <li>
        <div className="flex items-center">
          <span className="icon-chevron-right flex-shrink-0 text-base text-gray-300" />
          <a className="text-gray-600 cursor-pointer hover:text-gray-800 ml-4 2xl:text-sm 2xl-to-xl:text-xs text-xs font-medium sm:whitespace-normal whitespace-nowrap" aria-current="page" href="/recruitment/yopmail/job-applications">
            Job Applications
          </a>
        </div>
      </li>
      <li>
        <div className="flex items-center">
          <span className="icon-chevron-right flex-shrink-0 text-base text-gray-300" />
          <a className="text-indigo-700 cursor-default pointer-events-none ml-4 2xl:text-sm 2xl-to-xl:text-xs text-xs font-medium sm:whitespace-normal whitespace-nowrap" aria-current="page" href="/recruitment/yopmail/add">
            Interview Details
          </a>
        </div>
      </li>
    </ol>
  </nav>
  <div className="2xl:h-[calc(100vh-98px)] 2xl-to-xl:h-[calc(100vh-87px)] h-[calc(100vh-87px)] flex">
    <div className="bg-white border-r border-gray-200 h-full relative group z-10 transition-all duration-300 ease-in-out flex-[0_0_300px] w-[300px]">
      <i className="text-xl absolute cursor-pointer border border-gray-200 rounded-md z-50 flex items-center justify-center transition-all text-gray-500 bg-white hover:bg-gray-50 shadow-[-5px_4px_46px_17px_rgb(255_255_255)] opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto icon-chevron-left-double 2xl:size-10 2xl-to-xl:size-8 size-8 top-2 right-2" title="Collapse" />
      <div className="h-full overflow-y-auto scrollbar-hide">
        <div className="w-full">
          <div>
            <div className="flex flex-col 2xl:px-4 2xl-to-xl:px-3 px-3 2xl:pb-4 2xl-to-xl:pb-3 pb-3 pt-3 border-b">
              <a rel="noopener noreferrer" className="2xl:text-xl 2xl-to-xl:text-lg text-lg font-medium text-gray-900 hover:underline cursor-pointer capitalize text-wrap break-words block" href="/recruitment/yopmail/talent-pool/4d050237-d512-4273-8262-8b9261925fe4/candidate-profile" target="_blank">
                Emma Clark
              </a>
              <div className="flex items-center cursor-pointer">
                <p className="text-indigo-700 2xl:text-sm 2xl-to-xl:text-xs text-xs font-normal gap-0">
                  Frontend Developer
                </p>
              </div>
              <div className="flex gap-2" />
              <div className="flex 2xl:pt-4 pt-3 flex-col border-b 2xl:pb-4 pb-3">
                <a className="w-full" rel="noopener noreferrer" href="/avatar-placeholder.svg" target="_blank">
                  <button type="submit" className="outline-none rounded-lg disabled:cursor-not-allowed disabled:opacity-100 focus-visible:border-indigo-300 focus-visible:shadow-outline-purple hover:opacity-90 px-4 w-full bg-white hover:!bg-gray-50 2xl:h-9 h-8 2xl:py-1.5 py-1 border border-gray-300 text-gray-700 2xl:text-sm 2xl-to-xl:text-xs text-xs font-semibold">
                    <div className="flex items-center justify-center gap-2">
                      View Resume
                    </div>
                  </button>
                </a>
              </div>
              <div className="capitalize flex flex-col justify-center gap-2 mt-3">
                <div className="flex items-center gap-2">
                  <span className="label">
                    Candidate Status:
                  </span>
                  <div className="flex items-center">
                    <div className="flex items-center whitespace-nowrap w-fit border 2xl:px-2.5 2xl-to-xl:px-1.5 px-1.5 2xl-to-xl:text-xs text-xs py-0.5 2xl:text-xs 2xl-to-xl:text-xxs text-xxs rounded-xl capitalize font-medium" style={{"borderColor": "rgb(46, 125, 50)", "color": "rgb(46, 125, 50)", "backgroundColor": "transparent"}}>
                      <div className="2xl:h-2 2xl-to-xl:h-1.5 h-1.5 2xl:w-2 2xl-to-xl:w-1.5 w-1.5 rounded-full mr-2 border" style={{"background": "rgb(46, 125, 50)"}} />
                      Active
                    </div>
                    <div />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="label">
                    Application Status:
                  </span>
                  <div className="flex items-center whitespace-nowrap w-fit border 2xl:px-2.5 2xl-to-xl:px-1.5 px-1.5 2xl-to-xl:text-xs text-xs py-0.5 2xl:text-xs 2xl-to-xl:text-xxs text-xxs rounded-xl capitalize font-medium" style={{"color": "rgb(230, 81, 0)", "backgroundColor": "rgb(255, 244, 224)", "borderColor": "rgb(230, 81, 0)"}}>
                    <div className="rounded-full border 2xl:h-1.5 2xl-to-xl:h-1 h-1 2xl:w-1.5 2xl-to-xl:w-1 w-1 mr-2" style={{"background": "rgb(230, 81, 0)", "borderColor": "rgb(230, 81, 0)"}} />
                    Interview
                  </div>
                  <span title="View Application Status History" className="icon-dataflow-03 text-gray-500 2xl:text-lg 2xl-to-lg:text-lg text-base cursor-pointer" />
                </div>
              </div>
            </div>
            <div className="flex flex-col 2xl:gap-3 2xl-to-xl:gap-2 gap-2 2xl:px-4 2xl-to-xl:px-3 p-3">
              <div className="flex items-center bg-gray-25 gap-2">
                <div className="2xl:p-1.5 2xl-to-xl:p-1 p-1 border flex items-center rounded-lg bg-white">
                  <span className="icon-mail-01 2xl:text-lg 2xl-to-xl:text-base text-base" />
                </div>
                <p className="font-medium 2xl:text-sm 2xl-to-xl:text-xs text-xs text-gray-800 w-fit truncate" data-tooltip-id="email-tooltip">
                  emma.clark@example.com
                </p>
                <div className="2xl:p-1.5 2xl-to-xl:p-1 p-1 flex items-center rounded-lg bg-white cursor-pointer">
                  <span className="icon-copy-03 2xl:text-xl 2xl-to-xl:text-base text-base text-gray-400" />
                  <div />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="2xl:p-1.5 2xl-to-xl:p-1 p-1 flex items-center border rounded-lg bg-white">
                  <span className="icon-phone 2xl:text-lg 2xl-to-xl:text-base text-base text-gray-700" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <p className="font-medium 2xl:text-sm 2xl-to-xl:text-xs text-xs text-gray-800">
                    +1 415 555 0142
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="2xl:p-1.5 2xl-to-xl:p-1 p-1 flex items-center border rounded-lg bg-white">
                  <span className="icon-linked-in 2xl:text-lg 2xl-to-xl:text-sm text-sm text-gray-700" />
                </div>
                <div className="flex items-center cursor-pointer">
                  <p className="font-semibold text-indigo-700 2xl:text-sm 2xl-to-xl:text-xs text-xs">
                    Linkedin Profile Link
                  </p>
                  <span className="icon-arrow-up-right  text-indigo-700 text-xl" />
                </div>
              </div>
            </div>
            <div className="flex 2xl:p-4 2xl-to-xl:p-3 p-3 border-y flex-col gap-1.5">
              <p className="text-gray-400 2xl:text-xs 2xl-to-xl:text-xxs text-xxs">
                Created by
              </p>
              <div>
                <p className="2xl:text-sm 2xl-to-xl:text-xs text-xs">
                  System
                </p>
                <p className="2xl:text-sm 2xl-to-xl:text-xs text-xs">
                  30-Oct-2026, 12:42 PM
                </p>
              </div>
              <p className="text-gray-400 2xl:text-xs 2xl-to-xl:text-xxs text-xxs mt-5">
                Modified by
              </p>
              <div>
                <p className="2xl:text-sm 2xl-to-xl:text-xs text-xs mb-0">
                  Sophia Miller
                </p>
                <p className="2xl:text-sm 2xl-to-xl:text-xs text-xs">
                  03-Nov-2026, 11:00 AM
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="transition-all duration-300 ease-in-out w-[calc(100%-300px)]">
      <div className="pl-5 pr-5 bg-white py-2 flex items-center justify-between">
        <div className="block">
          <div>
            <nav aria-label="Tabs" className="2xl:-mx-3 2xl-to-xl:mx-0 mx-0 scrollbar-hide tab flex gap-3 items-center relative overflow-x-auto overflow-y-hidden">
              <a className="min-w-[100] text-gray-500 tab-transition font-semibold relative z-20 whitespace-nowrap 2xl:py-2 2xl-to-xl:py-1.5 py-1.5 2xl:px-3 2xl-to-xl:px-2.5 px-2.5 w-fit 2xl:text-sm 2xl-to-xl:text-xs text-xs text-center rounded-md" href="/recruitment/yopmail/job-applications/b50da801-4015-4ed8-83f9-3e8ac9c8f32f/applicant-details">
                Applicant Details
              </a>
              <a aria-current="page" className="min-w-[100] text-indigo-700 bg-indigo-50 tab-transition font-semibold relative z-20 whitespace-nowrap 2xl:py-2 2xl-to-xl:py-1.5 py-1.5 2xl:px-3 2xl-to-xl:px-2.5 px-2.5 w-fit 2xl:text-sm 2xl-to-xl:text-xs text-xs text-center rounded-md active" href="/recruitment/yopmail/job-applications/b50da801-4015-4ed8-83f9-3e8ac9c8f32f/interview-rounds">
                Interview Details
              </a>
              <a className="min-w-[100] text-gray-500 tab-transition font-semibold relative z-20 whitespace-nowrap 2xl:py-2 2xl-to-xl:py-1.5 py-1.5 2xl:px-3 2xl-to-xl:px-2.5 px-2.5 w-fit 2xl:text-sm 2xl-to-xl:text-xs text-xs text-center rounded-md" href="/recruitment/yopmail/job-applications/b50da801-4015-4ed8-83f9-3e8ac9c8f32f/applied-jobs">
                Applied Jobs
                <span className="border rounded-2xl ml-2 2xl:py-0.5 2xl-to-xl:py-0 py-0 2xl:px-2 2xl-to-xl:px-1.5 px-1.5 2xl:text-xs 2xl-to-xl:text-xxs text-xxs border-gray-200">
                  1
                </span>
              </a>
              <a className="min-w-[100] text-gray-500 tab-transition font-semibold relative z-20 whitespace-nowrap 2xl:py-2 2xl-to-xl:py-1.5 py-1.5 2xl:px-3 2xl-to-xl:px-2.5 px-2.5 w-fit 2xl:text-sm 2xl-to-xl:text-xs text-xs text-center rounded-md" href="/recruitment/yopmail/job-applications/b50da801-4015-4ed8-83f9-3e8ac9c8f32f/notes">
                Notes
              </a>
            </nav>
          </div>
        </div>
        <div className="flex gap-3 items-center justify-center">
          <button type="submit" className="outline-none font-semibold rounded-lg disabled:cursor-not-allowed border disabled:opacity-100 focus-visible:border-indigo-300 focus-visible:shadow-outline-purple hover:opacity-90 disabled:bg-indigo-200 px-4 border-transparent bg-indigo-600 text-white 2xl:text-sm 2xl-to-xl:text-xs text-xs py-1.5 2xl:h-9 2xl-to-xl:h-8 h-8 whitespace-nowrap">
            <div className="flex items-center justify-center gap-2">
              Schedule Interview
            </div>
          </button>
          <div className="relative">
            <button className="cursor-pointer flex items-center justify-center duration-300 outline-none rounded-lg border border-gray-300" type="button" aria-expanded="false" style={{"width": "32px", "height": "32px"}}>
              <span className="2x:text-xl 2xl-to-xl:text-lg text-lg block icon-dots-vertical text-gray-700" />
            </button>
          </div>
          <div hidden style={{"position": "fixed", "top": "1px", "left": "1px", "width": "1px", "height": "0px", "padding": "0px", "margin": "-1px", "overflow": "hidden", "clip": "rect(0px, 0px, 0px, 0px)", "whiteSpace": "nowrap", "borderWidth": "0px", "display": "none"}} />
        </div>
      </div>
      <hr className="w-full" />
      <div className="2xl:max-h-[calc(100vh-150px)] 2xl-to-xl:max-h-[calc(100vh-132px)] max-h-[calc(100vh-132px)] overflow-y-auto">
        <div />
        <div className="2xl:p-4 p-2">
          <div className="flex gap-x-5 rounded-lg">
            <div className="flex flex-col flex-1 w-3/4 rounded-lg  overflow-hidden">
              <div className="bg-white rounded-lg flex-1 overflow-y-auto scrollbar-hide">
                <div className="2xl:mx-6 2xl-to-xl:mx-3 mx-3">
                  <div className="flex justify-between items-center">
                    <div className="2xl:text-lg 2xl-to-xl:text-base text-base font-semibold 2xl:my-4 2xl-to-xl:my-3 my-3 mb-3 flex items-center gap-x-2">
                      <span>
                        Interview Rounds
                      </span>
                      <span className="border rounded-xl 2xl:py-0.5 2xl-to-xl:py-0 py-0 px-2 bg-indigo-50 border-indigo-500 text-indigo-500 2xl:text-xs 2xl-to-xl:text-xxs text-xxs text-xs flex items-center justify-center">
                        01
                      </span>
                    </div>
                  </div>
                  <div className="2xl:mb-5 mb-3">
                    <div className="rounded-lg h-auto w-100vm border border-gray-300 2xl:p-5 2xl-to-xl:p-3 p-3">
                      <div className="grid grid-cols-1 gap-4">
                        <div className="flex justify-between items-start 2xl:gap-6 gap-4">
                          <div className="flex items-start 2xl:gap-6 gap-4 w-full">
                            <div className="border 2xl:rounded-2xl 2xl-to-xl:rounded-lg rounded-lg 2xl:!w-12 2xl:!h-12 2xl-to-xl:!w-10 2xl-to-xl:!h-10 !w-10 !h-10 flex flex-shrink-0 justify-center items-center font-medium 2xl:text-base 2xl-to-xl:text-sm text-sm bg-grayNeutral-50 border-gray-200">
                              1
                            </div>
                            <div className="flex flex-col w-[60%]">
                              <div className="2xl:text-lg 2xl-to-xl:text-base text-base font-semibold flex flex-col xl:flex-row xl:items-center gap-2">
                                Screening Call
                                <div className="border flex w-max items-center border-gray-200 bg-grayNeutral-50 text-gray-700 rounded-full 2xl:!text-xs 2xl-to-xl:!text-xxs !text-xxs font-medium capitalize xl:mb-0 mb-2 min-w-max py-0.5 px-2 text-xs">
                                  <span>
                                    online (Google Meet)
                                  </span>
                                </div>
                              </div>
                              <div className="font-medium text-gray-700 mt-1 2xl:text-xs 2xl-to-xl:text-xxs !text-xxs">
                                03-Nov-2026, 12:00 PM
                              </div>
                              <a rel="noopener noreferrer" title="https://meet.google.com/hgn-weww-erb" className="text-xs text-indigo-700 mt-1 inline-block max-w-96 truncate" href="https://meet.google.com/hgn-weww-erb" target="_blank">
                                https://meet.google.com/hgn-weww-erb
                              </a>
                            </div>
                            <div className="flex flex-col w-[20%]">
                              <div>
                                <p className="label mb-2 2xl:!text-xs 2xl-to-xl:!text-xxs !text-xxs">
                                  Interview Status
                                </p>
                                <div className="flex w-max items-center 2xl:text-xs 2xl-to-xl:text-xxs 2xl:py-0.5 2xl-to-xl:py-0 rounded-2xl bg-warning-50 border border-warning-200 text-warning-700 font-medium capitalize 2xl:!text-xs 2xl-to-xl:!text-xxs !text-xxs py-0.5 px-2.5 text-sm">
                                  <span>
                                    Pending
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col w-[20%]">
                              <div>
                                <p className="label mb-2 2xl:!text-xs 2xl-to-xl:!text-xxs !text-xxs">
                                  Panel Suggestion
                                </p>
                                <div className="flex w-max items-center 2xl:text-xs 2xl-to-xl:text-xxs 2xl:py-0.5 2xl-to-xl:py-0 bg-warning-50 border rounded-2xl border-warning-200 text-warning-700 font-medium capitalize 2xl:!text-xs 2xl-to-xl:!text-xxs !text-xxs py-0.5 px-2.5 text-sm">
                                  <span>
                                    Pending
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="relative">
                            <button className="cursor-pointer flex items-center justify-center duration-300 outline-none rounded-lg border border-gray-300" type="button" aria-expanded="false" style={{"width": "32px", "height": "32px"}}>
                              <span className="2x:text-xl 2xl-to-xl:text-lg text-lg block icon-dots-vertical text-gray-700" />
                            </button>
                          </div>
                          <div hidden style={{"position": "fixed", "top": "1px", "left": "1px", "width": "1px", "height": "0px", "padding": "0px", "margin": "-1px", "overflow": "hidden", "clip": "rect(0px, 0px, 0px, 0px)", "whiteSpace": "nowrap", "borderWidth": "0px", "display": "none"}} />
                        </div>
                      </div>
                      <div className="border border-gray-200 rounded-lg bg-grayNeutral-50 2xl:py-5 2xl-to-xl:py-3 py-3 2xl-to-xl:px-2 px-2 2xl:mt-5 2xl-to-xl:mt-3 mt-3 mb-3 flex flex-wrap overflow-x-auto">
                        <div className="w-full sm:w-1/2 lg:w-2/4 px-2 mb-4">
                          <div>
                            <p className="label 2xl:!text-xs 2xl-to-xl:!text-xxs !text-xxs">
                              Interview Panel
                            </p>
                            <p className="2xl:text-sm 2xl-to-xl:text-xs text-xs custom-text-break whitespace-pre-wrap first-letter:uppercase font-normal mt-1 block 2xl:!text-xs 2xl-to-xl:!text-xxs !text-xxs">
                              <div className="flex flex-wrap gap-2">
                                <span className="inline-flex items-center border border-gray-300 rounded-lg bg-white py-1 px-2 text-xs font-medium text-gray-600">
                                  <div className="rounded-full overflow-hidden 2xl:h-6 2xl:w-6 2xl-to-xl:h-5 2xl-to-xl:w-5 h-5 w-5">
                                    <span data-ini="1" className="rounded-full object-cover 2xl:h-6 2xl:w-6 2xl-to-xl:h-5 2xl-to-xl:w-5 h-5 w-5" style={{"display": "inline-flex", "alignItems": "center", "justifyContent": "center", "borderRadius": "9999px", "background": "rgb(124, 58, 237)", "color": "rgb(255, 255, 255)", "fontWeight": "600", "fontSize": "9px", "width": "20px", "height": "20px", "flex": "0 0 auto"}}>
                                      VP
                                    </span>
                                  </div>
                                  <span className="2xl:text-sm 2xl-to-xl:text-xs text-xs capitalize ml-1">
                                    Oliver Grant
                                  </span>
                                </span>
                              </div>
                            </p>
                          </div>
                        </div>
                        <div className="w-full sm:w-1/2 lg:w-1/4 px-2 mb-4">
                          <div>
                            <p className="label 2xl:!text-sm 2xl-to-xl:!text-xs !text-xs">
                              Scheduled by
                            </p>
                            <p className="2xl:text-sm 2xl-to-xl:text-xs text-xs custom-text-break whitespace-pre-wrap first-letter:uppercase font-normal mt-1 block 2xl:!text-sm 2xl-to-xl:!text-xs !text-xs">
                              Sophia Miller
                            </p>
                          </div>
                          <p className="2xl:!text-sm 2xl-to-xl:!text-xs !text-xs">
                            03-Nov-2026, 11:00 AM
                          </p>
                        </div>
                        <div className="w-full sm:w-1/2 lg:w-1/4 px-2 mb-4">
                          <div>
                            <p className="label 2xl:!text-sm 2xl-to-xl:!text-xs !text-xs">
                              Interview Duration
                            </p>
                            <p className="2xl:text-sm 2xl-to-xl:text-xs text-xs custom-text-break whitespace-pre-wrap first-letter:uppercase font-normal mt-1 block 2xl:!text-sm 2xl-to-xl:!text-xs !text-xs">
                              15 Minutes
                            </p>
                          </div>
                        </div>
                        <div className="w-full lg:w-4/4 px-2">
                          <div>
                            <p className="label 2xl:!text-xs 2xl-to-xl:!text-xxs !text-xxs">
                              Additional Information
                            </p>
                            <p className="2xl:text-sm 2xl-to-xl:text-xs text-xs custom-text-break whitespace-pre-wrap first-letter:uppercase font-normal mt-1 block 2xl:!text-sm 2xl-to-xl:!text-xs !text-xs font-regular break-words">
                              Shortlisted after the CV review.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="h-auto w-100vm mt-3">
                        <div className="rounded-t-lg bg-grayNeutral-50">
                          <div>
                            <div className="mx-auto w-full rounded-2xl bg-white">
                              <button className="w-full justify-between border-gray-200 bg-grayNeutral-50 flex items-center p-3 text-sm text-gray-700 font-medium border mt-3 rounded-t-lg cursor-not-allowed" type="button" aria-expanded="false">
                                <div className="flex items-center space-x-1">
                                  <span>
                                    Interview Panel Feedback
                                  </span>
                                </div>
                                <span className="text-xl text-gray-500 icon-chevron-down" />
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
        </div>
      </div>
    </div>
  </div>
</div>
    </AppShell>
  )
}
