// Real-string vocabulary for the Super Admin helpdesk pages. EVERY class string in this file is an EXACT string that occurs in the crawled
// library (checked with `python3 scripts/real.py '<string>'`, source file named where it is not obvious). Colours the capture sets with an
// inline style="" (status pill, dot) are set the same way here, with the captured rgb values.
//   Pill / Dot : modules/admin/dom/helpdesk_add_ticket_priority_open_2026-10-05.html (inline border-color / color / background-color)
//   others     : file named per constant
export const T = '2xl:text-sm 2xl-to-xl:text-xs text-xs'
export const T500 = `${T} text-gray-500`          // project-mgmt/dom/daily_allocation.html
export const T600 = `${T} text-gray-600`          // admin/dom/quick_start_guide.html
export const T700 = `${T} text-gray-700`          // payroll/dom/run_payroll_2026-09-22.html
export const T900 = `${T} text-gray-900`          // crm-invoice/dom/contacts.html
export const T400 = `${T} text-gray-400`          // super-admin/dom/customer_detail.html
export const T900M = `${T} text-gray-900 font-medium`            // admin/dom/staging_app_collabcrm_com_administration_bluewha_page.html
export const T700M = `${T} font-medium text-gray-700`            // admin/dom/import_step2_after_upload.html
export const TLINK = `${T} text-indigo-700 font-semibold`        // recruitment/dom/job_interviews_detail_id.html
export const CAP = '2xl:text-xs 2xl-to-xl:text-xxs text-xxs text-gray-400 font-medium'   // recruitment/dom/_recruitment_…_candidate_page.html (same string as the Upload label)
export const TITLE = 'font-semibold text-gray-900 2xl:text-lg 2xl-to-xl:text-base text-base'   // super-admin/dom/support_tickets.html
export const AREA = 'w-full min-h-[42px] 2xl:!text-sm 2xl-to-xl:!text-xs !text-xs rounded-lg py-2 outline-none placeholder-gray-500 px-3 border border-gray-300 focus:border-indigo-300 focus:shadow-outline-purple bg-white min-w-full resize-none'   // = cc/Field Textarea
export const INPUT = 'rounded-lg py-2 outline-none placeholder-gray-500 px-3 border border-gray-300 focus:border-indigo-300 focus:shadow-outline-purple bg-white w-full 2xl:h-10 2xl-to-xl:h-9 h-9 2xl:text-sm 2xl-to-xl:text-xs text-xs placeholder:!text-gray-450'   // = cc/Field Input
export const CARD = 'bg-white border border-gray-200 rounded-lg'                 // reports/dom/yop_client_interview_result_report.html (padding goes on a child: `p-4`)
export const CHECK = 'border border-gray-300 rounded 2xl:!size-4 2xl-to-xl:!size-3.5 !size-3.5 2xl:!min-h-4 2xl:!min-w-4 2xl-to-xl:!min-h-3.5 !min-h-3.5 2xl-to-xl:!min-w-3.5 !min-w-3.5 focus:border-indigo-300 focus:shadow-outline-purple after:!bg-cover 2xl:after:!size-2.5 2xl-to-xl:after:!size-1.5 after:!size-1.5 tick-checkbox'

// rgb values: error/success/warning are the captured ones; gray + indigo have no captured pill → the same Untitled-UI -200/-700/-50/-500 steps
const FAMILY = {
  success: { b: 'rgb(171, 239, 198)', c: 'rgb(6, 118, 71)', bg: 'rgb(236, 253, 243)', dot: 'rgb(23, 178, 106)' },
  error:   { b: 'rgb(254, 205, 202)', c: 'rgb(180, 35, 24)', bg: 'rgb(254, 243, 242)', dot: 'rgb(240, 68, 56)' },
  warning: { b: 'rgb(254, 223, 137)', c: 'rgb(181, 71, 8)', bg: 'rgb(255, 250, 235)', dot: 'rgb(247, 144, 9)' },
  indigo:  { b: 'rgb(199, 215, 254)', c: 'rgb(53, 56, 205)', bg: 'rgb(238, 244, 255)', dot: 'rgb(97, 114, 243)' },   // DIVERGES: values not captured
  gray:    { b: 'rgb(234, 236, 240)', c: 'rgb(52, 64, 84)', bg: 'rgb(249, 250, 251)', dot: 'rgb(102, 112, 133)' },    // DIVERGES: values not captured
}
export const tint = (family) => FAMILY[family] || FAMILY.gray

export const Dot = ({ family }) => <span className="mr-2 h-2 w-2 rounded-full border" style={{ backgroundColor: tint(family).dot }} />

// the Status cell pill of the capture (outer + dot markup verbatim, inline colours)
export const Pill = ({ label, family }) => {
  const f = tint(family)
  return (
    <div className="flex items-center w-fit rounded-full border 2xl:px-2.5 2xl-to-xl:px-2 px-2 2xl:py-[1px] 2xl-to-xl:py-0 py-0 2xl:text-sm 2xl-to-xl:text-xs text-xs" style={{ borderColor: f.b, color: f.c, backgroundColor: f.bg }}>
      <Dot family={family} />{label}
    </div>
  )
}

// a message/notice card whose tone is an inline background (warning / success) — class string is the plain CARD
export const toneStyle = (family) => (family ? { backgroundColor: tint(family).bg, borderColor: tint(family).b } : undefined)
