// Breadcrumbs copied from the LIVE app (staging DOM + live hover, 19 Nov 2026) — Step 7 of the component library.
// <LiveBreadcrumb group="bc-001" trail={['Assets', 'Add Asset']} /> renders the exact captured <nav aria-label="Breadcrumb">
// of that group (29 groups, census _graph/jobs/breadcrumb-2026-11-19/CENSUS.md). `trail` swaps only the item labels: a middle
// item is a copy of the captured middle <li>, the last item a copy of the captured current <li>. The right side of the bar
// (buttons, toggles) stays as captured unless `right={false}`. Nothing is typed from memory.
// Live hover (measured on yopmail staging 19 Nov, look only): home link #667085 → #344054, middle link #475467 → #1D2939,
// current item #3538CD with pointer-events-none (no hover). The older hand-built Breadcrumb in AppShell.jsx = group bc-004.
// Source captures (one per group), read by _graph/build_graph.py to join kit:Breadcrumbs to real screens — one per line:
//   modules/admin/dom/api_manager.html
//   modules/admin/dom/beta_email_status.html
//   modules/admin/dom/help_center.html
//   modules/admin/dom/import_field_mapping.html
//   modules/admin/dom/my_todo_job_interviews.html
//   modules/crm-invoice/dom/deals_add.html
//   modules/payroll/dom/configuration_salary_components_deductions_yop.html
//   modules/payroll/dom/emp_2_plan_new.html
//   modules/payroll/dom/pay_loans_advances.html
//   modules/payroll/dom/pay_payslips.html
//   modules/payroll/dom/pay_reimbursements_add.html
//   modules/people/dom/attendance.html
//   modules/people/dom/attendance_ar_requests.html
//   modules/people/dom/attendance_leave_calendar.html
//   modules/people/dom/business_unit_Add.html
//   modules/people/dom/people_todo_panel.html
//   modules/people/dom/yop_campaignfit_2026-10-15_role_bdm_permissions.html
//   modules/people/dom/yop_hd_master-data_2026-10-22.html
//   modules/people/dom/yop_hd_organization-calendar_2026-10-22.html
//   modules/project-mgmt/dom/c2_add_resource_panel.html
//   modules/project-mgmt/dom/issue_board.html
//   modules/project-mgmt/dom/issue_checklist_history.html
//   modules/project-mgmt/dom/project_add.html
//   modules/project-mgmt/dom/timesheet_reports.html
//   modules/recruitment/dom/ca_after_login.html
//   modules/recruitment/dom/candidate_edit_0.html
//   modules/recruitment/dom/candidate_email_preview_0.html
//   modules/super-admin/dom/customers_add.html
//   modules/super-admin/dom/yop_tabs_group3_hover_2026-11-18.html
import { BCL } from '../data/breadcrumbLive.js'

function parseHTML(html) {
  if (typeof document === 'undefined') return null
  const tpl = document.createElement('template')
  tpl.innerHTML = html
  return tpl.content
}

function setText(li, label) {
  const leaf = [...li.querySelectorAll('a, span, button, div')].reverse().find((e) => !/(^|\s)icon-/.test(e.className || '') && !e.children.length && e.textContent.trim())
  if (leaf) leaf.textContent = label
}

export function LiveBreadcrumb({ group = 'bc-001', trail, right = true }) {
  const g = BCL[group]
  if (!g) return null
  const frag = parseHTML(g.outer)
  const nav = frag && frag.firstElementChild
  if (!nav) return <div style={{ display: 'contents' }} dangerouslySetInnerHTML={{ __html: g.outer }} />
  const ol = nav.querySelector('ol')
  if (trail && ol) {
    const lis = [...ol.children]
    const cur = lis[lis.length - 1]
    const mid = lis.length > 2 ? lis[1] : cur
    lis.slice(1).forEach((li) => li.remove())
    trail.forEach((label, i) => {
      const li = (i === trail.length - 1 ? cur : mid).cloneNode(true)
      setText(li, label)
      ol.appendChild(li)
    })
  }
  if (!right && ol) [...nav.children].forEach((c) => { if (c !== ol && !c.contains(ol)) c.remove() })
  return <div style={{ display: 'contents' }} dangerouslySetInnerHTML={{ __html: nav.outerHTML }} />
}

export const BREADCRUMB_GROUPS = Object.keys(BCL)
