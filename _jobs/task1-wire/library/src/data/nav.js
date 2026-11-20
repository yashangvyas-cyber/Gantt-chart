// Sidebar items — COPIED labels + icons from crawled DOM. [label, icon, path-or-null]
// path null = a parent with a flyout sub-menu (flyout items NOT CAPTURED, not built). 4th/5th = the quick-add `icon-plus-square` link [title, path] (People only).

// People portal — modules/admin/dom/helpdesk_help_menu_2026-10-05.html (yopmail, People › Employees page)
export const PEOPLE_NAV = [
  ['Dashboard', 'grid-01', 'dashboard'],
  ['Employees', 'users-02', null],
  ['My Team', 'group2', null],
  ['Attendance', 'calendar-check-02', 'attendance'],
  ['Leaves', 'user-right-01', 'leaves', 'Apply Leave', 'leaves/add'],
  ['WFH', 'home-04', 'work-from-home', 'Apply WFH', 'work-from-home/add'],
  ['Asset', 'monitor-05', 'asset/asset-overview', 'Add Asset', 'asset/asset-list/add'],
  ['Skill Matrix', 'skill-matrix', 'skill-matrix'],
  ['Organization', 'building-06', null],
  ['Config', 'settings-02', null],
  ['Payroll Corner', 'coins-hand', null],
]

// Administration portal — modules/admin/dom/help_center.html (bluewhale, 18 Aug)
export const ADMIN_NAV = [
  ['Dashboard', 'grid-01', 'dashboard'],
  ['Help Center', 'message-dots-circle', 'help-center'],
  ['Billing', 'currency-dollar-circle', 'billing'],
  ['Master Data', 'server-01', null],
  ['Email Configuration', 'mail-05', 'email-configuration/email-status'],
  ['Schedulers', 'calendar1', 'schedule'],
  ['Data Migration', 'dataflow-03', 'data-migration'],
  ['API Manager', 'code-box', 'api-manager'],
  ['Biometric Sync', 'finger-scan', 'biometric-sync'],
]

// Super Admin app — modules/super-admin/dom/support_tickets.html (7 Sep)
export const SUPER_NAV = [
  { title: 'Dashboard', path: '/dashboard', icon: 'grid-01' },
  { title: 'Users', plus: true, path: '/users', icon: 'users-01' },
  { title: 'Roles', plus: true, path: '/roles', icon: 'user-check-01' },
  { title: 'Customers', plus: true, path: '/customers', icon: 'users-02' },
  // Billing sub-sidebar — items + ⊞ from the BA's screenshot of staging-admin.collabcrm.com/dashboard (6 Oct): Plans ⊞ · Orders ⊞ · Config.
  // Not part of this prototype → shown, not linked.
  { title: 'Billing', path: null, icon: 'currency-dollar-circle', chevron: true, children: [
    { title: 'Plans', plus: true }, { title: 'Orders', plus: true }, { title: 'Config' },
  ] },
  { title: 'Support Tickets', path: null, icon: 'message-dots-circle' },   // real item (super-admin/dom/support_tickets.html); its sub-menu was helpdesk-only
  { title: 'Schedulers', path: '/schedule', icon: 'schedule' },
  { title: 'Portal Data', path: null, icon: 'module-group', chevron: true },
]

// Right-rail Help menu — modules/admin/dom/helpdesk_help_menu_2026-10-05.html. [label, icon, href, target]
// href placeholders {portal} / {tenant}, copied as captured. Start Tour is a <button> (href null).
export const HELP_MENU = [
  ['Quick Start Guide', 'arrow-circle', '/{portal}/{tenant}/quick-start-guide', '_self'],
  ['Help Center', 'info-circle', '/administration/{tenant}/help-center?isAddTicket=true&portalSlug={portal}', '_blank'],
  ['Request Demo', 'request', '/administration/{tenant}/help-center?isAddTicket=true&portalSlug={portal}', '_blank'],
  ['Start Tour', 'marker-pin', null, null],
  ['Release Notes', 'file-check-02', '/{portal}/{tenant}/release-notes', '_self'],
]
export const HELP_APPS = [['apple', 'iOS', 'https://apps.apple.com/us/app/collabcrm/id6739123543'], ['android', 'Android', 'https://play.google.com/store/apps/details?id=com.app.collabcrm']]


// Recruitment, Reports, Payroll, CRM & Invoice — copied 18 Nov 2026 from yopmail captures (graph job sidebars-2026-11-18):
//   recruitment/yop_mrp_snapshot_interview_rounds_2026-11-05, reports/yop_time_spent_report,
//   payroll/yop_intsweep_2026-11-04_payroll__employees-compensation, crm-invoice/yop_study_2026-10-12_contacts__pass2__tab_notes
export const RECRUITMENT_NAV = [
  ['Dashboard', 'grid-01', 'dashboard'],
  ['Jobs', 'jobs', 'jobs?filterQuery=%5B%7B%22field_name%22%3A%22status%22%2C%22operator%22%3A%22Is%22%2C%22value%22%3A%22open%2Cdraft%22%7D%5D'],
  ['Job Applications', 'job-description1', 'job-applications?filterQuery=%5B%7B%22field_name%22%3A%22job_status%22%2C%22operator%22%3A%22Is%22%2C%22value%22%3A%22open%22%7D%5D'],
  ['Interviews', 'stand', 'interviews?filterQuery=%5B%7B%22field_name%22%3A%22interview_status%22%2C%22operator%22%3A%22Is%22%2C%22value%22%3A%22pending%22%7D%5D'],
  ['Talent Pool', 'user-search-01', 'talent-pool'],
  ['Config', 'settings-02', 'config'],
  ['Timeline', 'dataflow-03', 'timeline'],
]

export const REPORTS_NAV = [
  ['Dashboard', 'grid-01', 'dashboard'],
  ['People', 'users-02', 'people'],
  ['CRM & Invoice', 'deals', 'sales-crm'],
  ['Project Management', 'layers-three-02', 'project-management'],
  ['Recruitment', 'jobs', 'recruitment'],
]

export const PAYROLL_NAV = [
  ['Dashboard', 'grid-01', 'dashboard'],
  ['Employees Compensation', 'users-02', 'employees-compensation'],
  ['Tax Declarations', 'file-05', 'tax-declarations'],
  ['Run Payroll', 'play-circle', 'run-payroll'],
  ['Challan', 'file-check-02', 'challan'],
  ['Form-16 Management', 'upload-01-converted', 'upload-form-16'],
  ['Expense & Reimbursement', 'invoice', 'expense-management'],
  ['Loans & Advances', 'bank', 'loans-advances'],
  ['Configuration', 'settings-02', null],
]

export const CRM_NAV = [
  ['Dashboard', 'grid-01', 'dashboard'],
  ['Goals Tracker', 'goal', 'goals-tracker'],
  ['Contacts', 'user-square', 'contacts'],
  ['Companies', 'building-07', 'companies'],
  ['Leads', 'shield-tick', 'leads'],
  ['Deals', 'deals', 'deals'],
  ['Client Interviews', 'file-check-02', 'client-interviews'],
  ['Config', 'settings-02', 'config'],
  ['Timeline', 'dataflow-03', 'timeline'],
  ['Invoice Dashboard', 'grid-01', 'invoice-management/invoice-dashboard'],
  ['Invoices', 'invoice', 'invoice-management/invoices'],
  ['Payments', 'credit-card-upload', 'invoice-management/payments'],
  ['Invoice Config', 'settings-02', 'invoice-management/invoice-config'],
  ['Invoice Timeline', 'dataflow-03', 'invoice-management/invoice-timeline'],
]

// Header "New ▾" menu items, copied from the same captures (Reports and Payroll show no "New" button). AppShell newMenu prop.
export const RECRUITMENT_NEW = [{ label: 'Add Job', path: 'jobs/add' }, { label: 'Add Job Application', path: 'job-applications/add' }, { label: 'Add Talent', path: 'talent-pool/add' }]
export const CRM_NEW = [{ label: 'Add Contact', path: 'contacts/add' }, { label: 'Add Company', path: 'companies/add' }, { label: 'Add Lead', path: 'leads/add' }, { label: 'Add Deal', path: 'deals/add' }]
