// DIVERGES: NEW — sample data for Gantt prototype (Task 1)
// API field names from modules/project-mgmt/api/ captures.
// All names are made-up foreign names (no real people, no Indian names).

export const GANTT_PROJECT = { key: 'IT', name: 'IT Project' }

export const GANTT_SPRINTS = [
  { id: 1, name: 'Sprint 7', start: '01-Nov-2026', end: '14-Nov-2026' },
  { id: 2, name: 'Sprint 8', start: '15-Nov-2026', end: '28-Nov-2026' },
]

// status values match board status columns; colours per stories/Common rules
export const STATUS_COLORS = {
  'To Do':        '#2B83DE',
  'In Progress':  '#F7A23A',
  'In Review':    '#E23333',
  'Ready For QA': '#7EC451',
  'Closed':       '#696969',
}

// issue_type values copied from project-mgmt API captures
export const ISSUES = [
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
  },
  {
    id: 'IT-58',
    key: 'IT-58',
    title: 'API rate limiting',
    issue_type: 'Task',
    assignee_name: 'Noah Fischer',
    status: 'To Do',
    start_date: '12-Nov-2026',
    due_date: '14-Nov-2026',
    estimated_hours: 8,
    logged_hours: 0,
    children: [],
  },
  {
    id: 'IT-59',
    key: 'IT-59',
    title: 'Fix auth token expiry bug',
    issue_type: 'Bug',
    assignee_name: 'Mia Laurent',
    status: 'In Review',
    start_date: '05-Nov-2026',
    due_date: '12-Nov-2026',   // past due (today is 20-Nov-2026)
    estimated_hours: 6,
    logged_hours: 7,
    children: [],
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
  },
]

// today's date for the today-line
export const TODAY = new Date(2026, 10, 20) // 20-Nov-2026
