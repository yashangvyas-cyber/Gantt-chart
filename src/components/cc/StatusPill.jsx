// COPIED: the Status cell pill of modules/admin/dom/helpdesk_add_ticket_drawer_2026-10-05.html (outer + dot markup verbatim).
// Colours are written as classes instead of the inline rgb() of the capture: border-<family>-200 text-<family>-700 bg-<family>-50, dot bg-<family>-500
// (rgb values of the captured Open / Closed / Cancelled pills = warning / success / error -200, -700, -50, -500).
// DIVERGES: colour classes instead of the real inline rgb() style — same values (error/success/warning -200,-700,-50,-500), so the whole
// class string is not an exact CollabCRM string. Allowed leftover (CLAUDE.md, checks).
// gray and indigo: no captured example — same pattern. The family comes from STATUS[key][2] in src/data/tickets.js.
// Class names are written out in full so Tailwind sees them.
const FAMILY = {
  gray:    { pill: 'border-gray-200 text-gray-700 bg-gray-50',          dot: 'bg-gray-500' },       // no captured example
  indigo:  { pill: 'border-indigo-200 text-indigo-700 bg-indigo-50',    dot: 'bg-indigo-500' },     // no captured example
  warning: { pill: 'border-warning-200 text-warning-700 bg-warning-50', dot: 'bg-warning-500' },
  success: { pill: 'border-success-200 text-success-700 bg-success-50', dot: 'bg-success-500' },
  error:   { pill: 'border-error-200 text-error-700 bg-error-50',       dot: 'bg-error-500' },
}

export default function StatusPill({ label, family = 'gray' }) {
  const f = FAMILY[family] || FAMILY.gray
  return (
    <div className={`flex items-center w-fit rounded-full border 2xl:px-2.5 2xl-to-xl:px-2 px-2 2xl:py-[1px] 2xl-to-xl:py-0 py-0 2xl:text-sm 2xl-to-xl:text-xs text-xs ${f.pill}`}>
      <span className={`mr-2 h-2 w-2 rounded-full border ${f.dot}`} />
      {label}
    </div>
  )
}

// COPIED: the status badge in the ticket drawer header of modules/people/dom/rsp_tabs_support_ticket_view_02_comments_0_2026-09-25.html
// (`rounded-2xl border flex w-max … bg-warning-50 border-warning-200 text-warning-700 ml-2 !h-fit py-0.5 px-2.5 text-sm`, dot `h-1.5 w-1.5 rounded-full mr-2 bg-warning-500`).
// DIVERGES: only the "open" (warning) colours are captured; the other families use the same -50 / -200 / -700 / -500 pattern.
const BADGE = {
  gray:    'bg-gray-50 border-gray-200 text-gray-700',
  indigo:  'bg-indigo-50 border-indigo-200 text-indigo-700',
  warning: 'bg-warning-50 border-warning-200 text-warning-700',
  success: 'bg-success-50 border-success-200 text-success-700',
  error:   'bg-error-50 border-error-200 text-error-700',
}
const BADGE_DOT = { gray: 'bg-gray-500', indigo: 'bg-indigo-500', warning: 'bg-warning-500', success: 'bg-success-500', error: 'bg-error-500' }

export function StatusBadge({ label, family = 'gray' }) {
  return (
    <div className={`rounded-2xl border flex w-max font-medium items-center ${BADGE[family] || BADGE.gray} ml-2 !h-fit py-0.5 px-2.5 text-sm`}>
      <div className={`h-1.5 w-1.5 rounded-full mr-2 ${BADGE_DOT[family] || BADGE_DOT.gray}`} />
      <span><p className="capitalize 2xl:text-sm 2xl-to-xl:text-xs text-xs">{label}</p></span>
    </div>
  )
}
