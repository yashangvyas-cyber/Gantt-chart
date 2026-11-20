// Buttons copied from the LIVE app (staging DOM, 19 Nov 2026) — Step 7 of the component library.
// LiveButton group="primary-001" label="Save" disabled icon renders the exact captured outerHTML
// of that group (dangerouslySetInnerHTML, same as Tabs.jsx/Dropdowns.jsx), swapping only the label
// text; when `disabled` is set the captured disabled cell is used (falls back to the default cell
// when the group has no disabled capture), and `icon` prefers the captured icon-only cell.
// Nothing is typed from memory.
// Source captures (live, 19 Nov 2026), read by _graph/build_graph.py to join kit:Buttons to real
// screens — one per line (examples of the groups with 5+ captures):
//   modules/admin/dom/api_manager.html
//   modules/admin/dom/email_status_live_default_2026-09-29.html
//   modules/admin/dom/beta_email_status.html
//   modules/admin/dom/helpdesk_help_menu_2026-10-05.html
//   modules/project-mgmt/dom/yop_dropdowns_pm_2026-11-18.html
//   modules/admin/dom/help_center.html
//   modules/admin/dom/yop_intsweep_2026-11-04_administration__notifications_all.html
//   modules/reports/dom/dashboard.html
//   modules/crm-invoice/dom/kit-inv__staging_app_collabcrm_com_sales_crm_bluewhaletec_page.html
//   modules/crm-invoice/dom/invoice_management_invoices.html
//   modules/people/dom/yop_hd_referrals_2026-10-22.html
//   modules/admin/dom/import_field_mapping.html
//   modules/crm-invoice/dom/yop_study_2026-10-12_contacts3__pass2__tab_details.html
//   modules/crm-invoice/dom/yop_invoice_management_payments_id_preview.html
//   modules/recruitment/dom/yop_mrp_application_detail_gcal_2026-11-05.html
//   modules/project-mgmt/dom/yop_intsweep_2026-11-04_project-management__tasks_notifications_ak-industry_page_1.html
//   modules/admin/dom/import_live_yopmail_step2_2026-10-07.html
//   modules/people/dom/change_password.html
//   modules/crm-invoice/dom/deals_id_details.html
//   modules/crm-invoice/dom/leads_id_details.html
//   modules/crm-invoice/dom/contacts.html
//   modules/crm-invoice/dom/yop_study_2026-10-12_deals__tab_Attachments.html
//   modules/crm-invoice/dom/yop_study_2026-10-12_leads__detail_90972d8c.html
//   modules/crm-invoice/dom/yop_study_2026-10-15_config_deal-status__state_add-row.html
//   modules/project-mgmt/dom/issue_board.html
//   modules/project-mgmt/dom/yop_intsweep_2026-11-04_project-management__tasks_HAPP_board.html
//   modules/crm-invoice/dom/client_interviews_add.html
//   modules/recruitment/dom/yop_mrp_schedule_interview_offline_2026-11-05.html
//   modules/project-mgmt/dom/yop_intsweep_2026-11-04_project-management__occupancy-report.html
//   modules/crm-invoice/dom/yop_study_2026-10-12_config-sub2__pass2__tab_connect-whatsapp.html
//   modules/crm-invoice/dom/yop_lead_assignment_rules_2026-10-06.html
//   modules/crm-invoice/dom/invoice_management_invoices_add.html
//   modules/admin/dom/yop_campaignfit_2026-10-16_apimanager_ep_0.html
//   modules/people/dom/yop_hd_meeting-rooms_2026-10-22.html
//   modules/people/dom/yop_hd_employee-documents_2026-10-22.html
//   modules/project-mgmt/dom/c2_add_resource_panel.html
//   modules/people/dom/rsp_tabs_support_ticket_view_01_view_request_2026-09-25.html
//   modules/payroll/dom/employees_compensation_2026-09-22.html
//   modules/super-admin/dom/customer_detail.html
//   modules/project-mgmt/dom/timesheet_reports.html
//   modules/payroll/dom/cfg_payslip_tpl_editor.html
//   modules/recruitment/dom/yop_mrp_application_detail_2026-11-05.html
//   modules/admin/dom/real_operational_config.html
//   modules/admin/dom/helpdesk_add_ticket_drawer_2026-10-05.html
//   modules/payroll/dom/configuration_income_tax_declaration.html
//   modules/people/dom/leave_types_add.html
//   modules/admin/dom/yop_intsweep_2026-11-04_administration__master-data_engagement-models.html
//   modules/crm-invoice/dom/yop_study_2026-10-12_companies__add.html
//   modules/recruitment/dom/job_edit_0.html
//   modules/recruitment/dom/ca_after_login.html
//   modules/recruitment/dom/talent_pool_bw_2026-09-15.html
//   modules/people/dom/subnav_people_config_clicked_2026-09-25.html
//   modules/recruitment/dom/careers_home.html
//   modules/people/dom/business_unit_Add.html
//   modules/people/dom/separation_add.html
//   modules/crm-invoice/dom/yop_study_2026-10-12_invoices__click_Filter.html
//   modules/reports/dom/employee_360_report.html
//   modules/crm-invoice/dom/yop_study_2026-10-12_client-interviews__add.html
//   modules/admin/dom/quick_start_guide.html
//   modules/crm-invoice/dom/yop_crm_dashboard__default.html
//   modules/super-admin/dom/customers_add.html
//   modules/recruitment/dom/config__job_types_categories.html
//   modules/recruitment/dom/jobs_add.html
//   modules/project-mgmt/dom/daily_allocation.html
//   modules/admin/dom/import_live_yopmail_step1_default_2026-10-07.html
//   modules/admin/dom/yop_integrations_2026-11-04_biometric_add_device.html
//   modules/crm-invoice/dom/client_interviews.html
//   modules/crm-invoice/dom/companies_add.html
//   modules/crm-invoice/dom/config.html
//   modules/recruitment/dom/dom_CandidateStatus.html
//   modules/payroll/dom/emp_2_plan_new.html
//   modules/recruitment/dom/config__employment_types.html
//   modules/people/dom/yop_hd_dashboard_2026-10-22.html
//   modules/recruitment/dom/jason_kebab.html
//   modules/payroll/dom/configuration_operational_config.html
//   modules/admin/dom/yop_intsweep_2026-11-04_administration__master-data_country-list.html
//   modules/people/dom/emp_01_general_info.html
//   modules/project-mgmt/dom/issue_checklist_history.html
//   modules/people/dom/attendance.html
//   modules/recruitment/dom/config__career_portal.html
//   modules/crm-invoice/dom/invoice_management_invoice_timeline.html
//   modules/crm-invoice/dom/deals_add.html
//   modules/crm-invoice/dom/contacts_add.html
//   modules/crm-invoice/dom/yop_study_2026-10-12_invoices__add.html
//   modules/crm-invoice/dom/dashboard.html
//   modules/crm-invoice/dom/invoice_management_invoice_config_operational_config_edit.html
//   modules/people/dom/attendance_team.html
//   modules/people/dom/employee_add.html
//   modules/crm-invoice/dom/yop_study_2026-10-12_config-sub2__pass2__tab_lead-status.html
//   modules/admin/dom/email_configuration_email_domain.html
//   modules/people/dom/exit_hr_01_list_pending.html
//   modules/payroll/dom/employees_compensation.html
//   modules/crm-invoice/dom/companies.html
//   modules/admin/dom/my_todo_job_interviews.html
//   modules/recruitment/dom/candidates.html
//   modules/people/dom/employee_view_assets_allocated.html
import { BL } from '../data/buttonsLive.js'

function parseHTML(html) {
  if (typeof document === 'undefined') return null
  const tpl = document.createElement('template')
  tpl.innerHTML = html
  return tpl.content
}

function setLabel(el, text) {
  const label = String(text)
  const p = el.querySelector('p')
  if (p && !p.querySelector('[class*="icon-"]')) { p.textContent = label; return }
  for (const node of Array.from(el.childNodes)) {
    if (node.nodeType === 3 && node.textContent.trim()) { node.textContent = label; return }
  }
  const span = Array.from(el.children).find((c) => c.tagName.toLowerCase() === 'span' && !/icon-|rounded|border|badge/.test(c.className || '') && !c.children.length)
  if (span) { span.textContent = label; return }
  if (!el.children.length) { el.textContent = label; return }
  for (const leaf of el.querySelectorAll('span,p')) { if (!leaf.children.length && leaf.textContent.trim() && !/^\d+$/.test(leaf.textContent.trim())) { leaf.textContent = label; return } }
}

// `variant` (19 Nov): the exact live class string to draw when a group holds several (BL[group].variants, copied from the
// captures that the hover/focus states were measured on); falls back to the group's default cell.
export function LiveButton({ group = 'primary-001', label, disabled, icon, variant }) {
  const g = BL[group]
  if (!g || !g.cells) return null
  const cells = g.cells
  let cell = cells.default
  const v = variant && g.variants && g.variants[variant.split(/\s+/).filter(Boolean).join(' ')]
  if (disabled && cells.disabled) cell = cells.disabled
  else if (v) cell = v
  else if (icon && cells.iconOnly) cell = cells.iconOnly
  if (!cell || !cell.outer) return null
  const frag = parseHTML(cell.outer)
  const container = frag && frag.firstElementChild
  if (!container) return <div style={{ display: 'contents' }} dangerouslySetInnerHTML={{ __html: cell.outer }} />
  if (label != null && label !== cell.label) setLabel(container, label)
  return <div style={{ display: 'contents' }} dangerouslySetInnerHTML={{ __html: container.outerHTML }} />
}

const byLook = {}
for (const gid of Object.keys(BL)) {
  const look = BL[gid].look || '?'
  ;(byLook[look] = byLook[look] || []).push(gid)
}
export const LOOKS = Object.fromEntries(
  Object.entries(byLook).sort((a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0]))
)
