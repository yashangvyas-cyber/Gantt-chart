// DIVERGES: NEW — sample data for Gantt prototype (Stories 1, 2, 3, 4, 5)
// API field names from modules/project-mgmt/api/ captures.
// All names are made-up foreign names (no real people, no Indian names).

export const GANTT_PROJECT = {
  key: 'IT',
  name: 'IT Project',
  model: 'Hourly', // 'Fixed Cost' | 'Hourly' | 'Hire Base'
  expiry_date: '26-Nov-2026',
}

export const GANTT_SPRINTS = [
  { id: 1, name: 'Sprint 7', start: '01-Nov-2026', end: '14-Nov-2026' },
  { id: 2, name: 'Sprint 8', start: '15-Nov-2026', end: '28-Nov-2026' },
]

// Milestone statuses & colours from modules/project-mgmt/api/yop_gantt_2026-11-19_06_config_milestone_status.json
export const MILESTONE_STATUS_COLORS = {
  'Pending': '#c62e45',
  'Invoice raised': '#3964a8',
  'Mail Generated': '#c729e7',
  'Payment received': '#729d44',
}

export const GANTT_MILESTONES = [
  { id: 1, name: 'M1 - Architecture & Build', status: 'Payment received', date: '10-Nov-2026', color: '#729d44' },
  { id: 2, name: 'M2 - API & Deployment', status: 'Invoice raised', date: '20-Nov-2026', color: '#3964a8' },
  { id: 3, name: 'M3 - Security & QA', status: 'Pending', date: '28-Nov-2026', color: '#c62e45' },
]

// Engagement model hours summaries (Story 3)
export const ENGAGEMENT_HOURS = {
  'Fixed Cost': {
    estimated: '500h',
    top_up: '50h',
    total: '550h',
    spent: '210:00',
  },
  'Hourly': {
    purchased: '500h',
    billed: '250h',
    spent: '220:00',
    balance: '280:00',
  },
  'Hire Base': {
    contract_start: '01-Nov-2026',
    contract_end: '28-Nov-2026',
    remaining_days: '8 days',
  },
}

// status values match board status columns; colours per stories/Common rules
export const STATUS_COLORS = {
  'To Do': '#2B83DE',
  'In Progress': '#F7A23A',
  'In Review': '#E23333',
  'Ready For QA': '#7EC451',
  'Closed': '#696969',
}

// issue_type values copied from project-mgmt API captures
export const INITIAL_ISSUES = [
  {
    id: 'IT-55',
    key: 'IT-55',
    title: 'Setup CI/CD pipeline',
    issue_type: 'Epic',
    assignee_name: 'Emma Clark',
    status: 'In Progress',
    start_date: '01-Nov-2026',
    due_date: '28-Nov-2026',
    estimated_hours: 40,
    logged_hours: 18,
    children: ['IT-56', 'IT-57'],
    links: [],
    history: [
      { id: 1, user: 'Emma Clark', date: '01-Nov-2026 10:00 AM', text: 'created issue' },
      { id: 2, user: 'Emma Clark', date: '01-Nov-2026 10:05 AM', text: 'set Start Date to 01-Nov-2026 and Due Date to 28-Nov-2026' },
    ],
  },
  {
    id: 'IT-56',
    key: 'IT-56',
    title: 'Configure build server',
    issue_type: 'Task',
    assignee_name: 'Liam Brooks',
    status: 'Ready For QA',
    start_date: '01-Nov-2026',
    due_date: '10-Nov-2026',
    estimated_hours: 16,
    logged_hours: 16,
    parent_id: 'IT-55',
    children: ['IT-57'],
    links: [{ target: 'IT-57', type: 'Blocks' }], // IT-56 blocks IT-57 (Story 5)
    history: [
      { id: 1, user: 'Liam Brooks', date: '01-Nov-2026 11:30 AM', text: 'created issue' },
      { id: 2, user: 'Liam Brooks', date: '01-Nov-2026 11:32 AM', text: 'updated Start Date to 01-Nov-2026' },
    ],
  },
  {
    id: 'IT-57',
    key: 'IT-57',
    title: 'Write deployment scripts',
    issue_type: 'Sub-Task',
    assignee_name: 'Sofia Reyes',
    status: 'In Progress',
    start_date: '11-Nov-2026',
    due_date: '20-Nov-2026',
    estimated_hours: 12,
    logged_hours: 5,
    parent_id: 'IT-56',
    children: [],
    links: [{ target: 'IT-58', type: 'Blocks' }], // Critical chain
    history: [
      { id: 1, user: 'Sofia Reyes', date: '11-Nov-2026 09:15 AM', text: 'created issue' },
      { id: 2, user: 'Sofia Reyes', date: '11-Nov-2026 09:20 AM', text: 'updated Start Date to 11-Nov-2026' },
    ],
  },
  {
    id: 'IT-58',
    key: 'IT-58',
    title: 'API rate limiting',
    issue_type: 'Task',
    assignee_name: 'Noah Fischer',
    status: 'To Do',
    start_date: '21-Nov-2026',
    due_date: '25-Nov-2026',
    estimated_hours: 8,
    logged_hours: 0,
    children: [],
    links: [{ target: 'IT-59', type: 'Blocks' }],
    history: [
      { id: 1, user: 'Noah Fischer', date: '12-Nov-2026 02:00 PM', text: 'created issue' },
    ],
  },
  {
    id: 'IT-59',
    key: 'IT-59',
    title: 'Fix auth token expiry bug',
    issue_type: 'Bug',
    assignee_name: 'Mia Laurent',
    status: 'In Review',
    start_date: '25-Nov-2026',
    due_date: '28-Nov-2026',
    estimated_hours: 6,
    logged_hours: 7,
    children: [],
    links: [],
    history: [
      { id: 1, user: 'Mia Laurent', date: '05-Nov-2026 11:00 AM', text: 'created issue' },
    ],
  },
  {
    id: 'IT-60',
    key: 'IT-60',
    title: 'Dashboard performance audit',
    issue_type: 'Task',
    assignee_name: 'Oliver Watts',
    status: 'Closed',
    start_date: '01-Nov-2026',
    due_date: '08-Nov-2026',
    estimated_hours: 10,
    logged_hours: 10,
    children: [],
    links: [],
    history: [
      { id: 1, user: 'Oliver Watts', date: '01-Nov-2026 03:00 PM', text: 'created issue' },
    ],
  },
  // Unscheduled issues for Story 4
  {
    id: 'IT-61',
    key: 'IT-61',
    title: 'Payment gateway webhooks',
    issue_type: 'Task',
    assignee_name: 'Liam Brooks',
    status: 'To Do',
    start_date: '',
    due_date: '',
    estimated_hours: 16,
    logged_hours: 0,
    children: [],
    sprint_id: null,
    links: [],
    history: [
      { id: 1, user: 'Liam Brooks', date: '18-Nov-2026 04:00 PM', text: 'created issue without dates' },
    ],
  },
  {
    id: 'IT-62',
    key: 'IT-62',
    title: 'Security vulnerability scan',
    issue_type: 'Bug',
    assignee_name: 'Sofia Reyes',
    status: 'To Do',
    start_date: '',
    due_date: '',
    estimated_hours: 8,
    logged_hours: 0,
    children: [],
    sprint_id: null,
    links: [],
    history: [
      { id: 1, user: 'Sofia Reyes', date: '19-Nov-2026 11:30 AM', text: 'created issue without dates' },
    ],
  },
  // Issue with sprint but no explicit start/due dates (shows light sprint bar)
  {
    id: 'IT-63',
    key: 'IT-63',
    title: 'Database connection pooling',
    issue_type: 'Task',
    assignee_name: 'Emma Clark',
    status: 'To Do',
    start_date: '',
    due_date: '',
    estimated_hours: 12,
    logged_hours: 0,
    children: [],
    sprint_id: 2, // Sprint 8: 15-Nov to 28-Nov
    links: [],
    history: [
      { id: 1, user: 'Emma Clark', date: '19-Nov-2026 02:00 PM', text: 'added to Sprint 8' },
    ],
  },
]

export const ISSUES = INITIAL_ISSUES

// today's date for the today-line
export const TODAY = new Date(2026, 10, 20) // 20-Nov-2026

// ─── Story 7: Hire Base developers & contract data ───────────────────────────
export const HIRE_BASE_DEVELOPERS = [
  {
    name: 'Emma Clark',
    role: 'Tech Lead',
    department: 'Engineering',
    contract_start: '01-Nov-2026',
    contract_end: '28-Nov-2026',
    remaining_days: 8,
    double_booked: false,
    allocations: [
      { project: 'IT Project', start: '01-Nov-2026', end: '28-Nov-2026', hours: 40 }
    ]
  },
  {
    name: 'Liam Brooks',
    role: 'Senior Developer',
    department: 'Engineering',
    contract_start: '01-Nov-2026',
    contract_end: '15-Dec-2026',
    remaining_days: 25,
    double_booked: true,
    double_booking_overlap: '05-Nov-2026 to 12-Nov-2026',
    allocations: [
      { project: 'IT Project', start: '01-Nov-2026', end: '15-Dec-2026', hours: 40 },
      { project: 'Apex E-Commerce', start: '05-Nov-2026', end: '12-Nov-2026', hours: 20 }
    ]
  },
  {
    name: 'Sofia Reyes',
    role: 'Backend Developer',
    department: 'Engineering',
    contract_start: '10-Nov-2026',
    contract_end: '10-Feb-2027',
    remaining_days: 82,
    double_booked: false,
    allocations: [
      { project: 'IT Project', start: '10-Nov-2026', end: '10-Feb-2027', hours: 40 }
    ]
  },
  {
    name: 'Noah Fischer',
    role: 'Frontend Developer',
    department: 'Engineering',
    contract_start: '15-Nov-2026',
    contract_end: '30-Nov-2026',
    remaining_days: 10,
    double_booked: false,
    allocations: [
      { project: 'IT Project', start: '15-Nov-2026', end: '30-Nov-2026', hours: 40 }
    ]
  },
]

// ─── Story 8: Multi-board & Company Projects ──────────────────────────────────
export const BOARDS_LIST = ['Default', 'Test', 'Project Gantt (All Boards)']

export const TEST_BOARD_ISSUES = [
  {
    id: 'IT-TEST-01',
    key: 'IT-TEST-01',
    board: 'Test',
    title: 'Regression test suite on staging',
    issue_type: 'Task',
    assignee_name: 'Oliver Watts',
    status: 'In Progress',
    start_date: '10-Nov-2026',
    due_date: '22-Nov-2026',
    estimated_hours: 24,
    logged_hours: 12,
    children: [],
    links: [],
    history: [
      { id: 1, user: 'Oliver Watts', date: '10-Nov-2026 10:00 AM', text: 'created test task' }
    ]
  },
  {
    id: 'IT-TEST-02',
    key: 'IT-TEST-02',
    board: 'Test',
    title: 'Automated performance & load test',
    issue_type: 'Task',
    assignee_name: 'Mia Laurent',
    status: 'To Do',
    start_date: '18-Nov-2026',
    due_date: '27-Nov-2026',
    estimated_hours: 16,
    logged_hours: 0,
    children: [],
    links: [],
    history: [
      { id: 1, user: 'Mia Laurent', date: '12-Nov-2026 11:00 AM', text: 'created test task' }
    ]
  }
]

export const COMPANY_PROJECTS = [
  {
    id: 1,
    name: 'IT Project',
    code: 'IT',
    model: 'Hourly',
    start: '01-Nov-2026',
    end: '28-Nov-2026',
    status: 'In Progress',
    color: '#6366f1',
    milestones: [], // Hourly has NO milestones
    spent_hours: '220:00',
    total_hours: '500h',
  },
  {
    id: 2,
    name: 'Apex E-Commerce Revamp',
    code: 'AEC',
    model: 'Fixed Cost',
    start: '15-Oct-2026',
    end: '15-Dec-2026',
    status: 'In Progress',
    color: '#8b5cf6',
    milestones: ['01-Nov-2026 (Alpha)', '25-Nov-2026 (Beta)', '15-Dec-2026 (Go-Live)'],
    spent_hours: '420:00',
    total_hours: '800h',
  },
  {
    id: 3,
    name: 'Mobile App Dedicated Team',
    code: 'MAD',
    model: 'Hire Base',
    start: '01-Sep-2026',
    end: '04-Dec-2026',
    status: 'In Progress',
    color: '#0ea5e9',
    milestones: [], // Hire Base has NO milestones
    spent_hours: '640:00',
    total_hours: '1200h',
  },
]
