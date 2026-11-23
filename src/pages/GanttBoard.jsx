// COPIED: board page shell + tab strip from
//   modules/project-mgmt/dom/yop_gantt_2026-11-19_09_board.html
// COPIED: Week/Month/Quarter button group from
//   modules/project-mgmt/dom/yop_gantt_2026-11-19_16_daily_allocation.html
// COPIED: sidebar nav from yop_gantt_2026-11-19_09_board.html
// COPIED: Create Issue drawer from yop_gantt_2026-11-19_13_create_issue.html
// NEW: Story 1 — Add Start Date side by side with Due Date under Sprint in Create Issue drawer + validation
// NEW: Story 4 — Drag bars, resize handles, Unscheduled drawer, sprint-only light bar, 10s Undo toast
// NEW: Story 3 — Hours KPI strip (Fixed Cost, Hourly, Hire Base), pinned Milestones and Sprints top rows, expiry date line, contract band
// NEW: Story 5 — Dependency connector lines (SVG), Baseline save and compare

// NEW: Story 6 — Export as PDF and share a client link (reading mode, public link toggle)
// NEW: Story 7 — Plan people on a Hire Base project (developer grouping, contract bands, double-booking warning, Resource Planner occupancy)
// NEW: Story 8 — See all boards & all projects (Project Gantt across Default/Test boards, Dashboard company-wide timeline)
// NEW: Story 9 — Use Gantt on mobile (responsive layout, touch-friendly rows, zoom pinch/swipe)

import { useState, useRef, useEffect, useMemo } from 'react'
import AppShell from '../components/AppShell.jsx'
import Drawer from '../components/cc/Drawer.jsx'
const TEAM_AVATARS = [
  { name: 'Emma Clark', initials: 'EC', bg: 'bg-indigo-600', role: 'Tech Lead' },
  { name: 'Liam Brooks', initials: 'LB', bg: 'bg-emerald-600', role: 'Senior Developer' },
  { name: 'Sofia Reyes', initials: 'SR', bg: 'bg-amber-600', role: 'Backend Developer' },
  { name: 'Noah Fischer', initials: 'NF', bg: 'bg-rose-600', role: 'Frontend Developer' },
  { name: 'Oliver Watts', initials: 'OW', bg: 'bg-cyan-600', role: 'Developer' },
]

import {
  INITIAL_ISSUES,
  STATUS_COLORS,
  TODAY,
  GANTT_PROJECT,
  GANTT_SPRINTS,
  GANTT_MILESTONES,
  ENGAGEMENT_HOURS,
  HIRE_BASE_DEVELOPERS,
  BOARDS_LIST,
  TEST_BOARD_ISSUES,
  COMPANY_PROJECTS,
} from '../data/gantt.js'

// ─── helpers ──────────────────────────────────────────────────────────────────

const MONTH_NAMES = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
const MONTH_MAP   = { Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11 }

function fmtDate(d) {
  if (!d) return ''
  return `${String(d.getDate()).padStart(2,'0')}-${MONTH_NAMES[d.getMonth()]}-${d.getFullYear()}`
}

function parseDate(str) {
  if (!str) return null
  const parts = str.split('-')
  if (parts.length !== 3) return null
  const [d, m, y] = parts
  const monthIdx = MONTH_MAP[m]
  if (monthIdx === undefined) return null
  return new Date(+y, monthIdx, +d)
}

function dayDiff(a, b) {
  return Math.round((b - a) / 86400000)
}

function addDays(d, n) {
  const next = new Date(d)
  next.setDate(next.getDate() + n)
  return next
}

function isPastDue(issue) {
  const due = parseDate(issue.due_date)
  return due && due < TODAY && issue.status !== 'Closed'
}

function isWeekend(date) {
  const d = date.getDay()
  return d === 0 || d === 6
}

function nowTimestamp() {
  const now = new Date()
  const hours = now.getHours()
  const ampm = hours >= 12 ? 'PM' : 'AM'
  const h12 = hours % 12 || 12
  const mins = String(now.getMinutes()).padStart(2, '0')
  return `${fmtDate(now)}, ${String(h12).padStart(2,'0')}:${mins} ${ampm}`
}

// ─── Gantt calendar config ─────────────────────────────────────────────────────

const ROW_H = 40
const GRID_LEFT_W = 574

function getViewConfig(mode, anchorDate = new Date(2026, 10, 1)) {
  const year = anchorDate.getFullYear()
  const month = anchorDate.getMonth()

  if (mode === 'Week') {
    const d = new Date(anchorDate)
    const day = d.getDay()
    const diff = d.getDate() - day
    const weekStart = new Date(year, month, diff)
    return {
      start: weekStart,
      count: 28,
      cellW: 44,
    }
  }
  if (mode === 'Month') {
    const monthStart = new Date(year, month, 1)
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    return {
      start: monthStart,
      count: daysInMonth,
      cellW: 34,
    }
  }
  if (mode === 'Quarter') {
    const qStartMonth = Math.floor(month / 3) * 3
    const qStart = new Date(year, qStartMonth, 1)
    const qEnd = new Date(year, qStartMonth + 3, 0)
    const count = Math.round((qEnd - qStart) / (1000 * 60 * 60 * 24)) + 1
    return {
      start: qStart,
      count: count,
      cellW: 14,
    }
  }
  return { start: new Date(year, month, 1), count: 30, cellW: 34 }
}

// ─── Issue Type Icons ─────────────────────────────────────────────────────────

function TypeIcon({ type }) {
  if (type === 'Task') {
    return <span className="icon-checkbox-base text-base" title="Task" />
  }
  if (type === 'Story') {
    return <span className="icon-story text-base" title="Story" />
  }
  if (type === 'Bug') {
    return <span className="icon-dot text-base" title="Bug" />
  }
  if (type === 'Sub-Task' || type === 'Subtask') {
    return <span className="icon-sub-task text-base" title="Sub-Task" />
  }
  if (type === 'Epic') {
    return <span className="icon-bolt text-purple-600 text-base" title="Epic" />
  }
  return <span className="icon-checkbox-base text-base" title={type} />
}

// ─── Status pill ─────────────────────────────────────────────────────────────

function StatusPill({ status }) {
  const bg = STATUS_COLORS[status] || '#696969'
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded-full text-white font-medium"
      style={{ backgroundColor: bg, fontSize: 10 }}
    >
      {status}
    </span>
  )
}

// ─── Hover card (Story 2 & Story 5 baseline) ──────────────────────────────────

function HoverCard({ issue, x, y, baseline }) {
  if (!issue) return null
  return (
    <div
      className="absolute z-50 bg-white border border-gray-200 rounded-lg shadow-custom-popup-shadow p-3 w-[240px] pointer-events-none"
      style={{ left: x + 12, top: y - 10 }}
    >
      <p className="text-xs font-semibold text-gray-800 mb-2 truncate">{issue.title}</p>
      <div className="space-y-1.5 text-xs">
        <div className="flex items-center justify-between">
          <span className="text-gray-500 text-[11px]">Status</span>
          <StatusPill status={issue.status} />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-500 text-[11px]">Current Dates</span>
          <span className="text-gray-800 font-medium text-[11px]">{issue.start_date || '—'} – {issue.due_date || '—'}</span>
        </div>
        {baseline && (
          <div className="flex items-center justify-between bg-gray-50 px-1.5 py-0.5 rounded border border-gray-200">
            <span className="text-gray-600 font-medium text-[11px]">Baseline Plan</span>
            <span className="text-gray-700 font-semibold text-[11px]">{baseline.start} – {baseline.due}</span>
          </div>
        )}
        <div className="flex items-center justify-between">
          <span className="text-gray-500 text-[11px]">Logged / Est.</span>
          <span className="text-gray-700 font-medium text-[11px]">{issue.logged_hours}h / {issue.estimated_hours}h</span>
        </div>
      </div>
    </div>
  )
}

// ─── Undo Toast ──────────────────────────────────────────────────────────────

function UndoToast({ visible, onUndo, onDismiss }) {
  useEffect(() => {
    if (!visible) return
    const t = setTimeout(onDismiss, 10000)
    return () => clearTimeout(t)
  }, [visible, onDismiss])

  if (!visible) return null
  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[9999] flex items-center gap-3 bg-gray-900 text-white text-xs font-medium px-4 py-2.5 rounded-lg shadow-xl border border-gray-700">
      <span className="icon-check-circle text-green-400 text-sm" />
      <span>Dates updated</span>
      <button
        onClick={onUndo}
        className="text-indigo-400 hover:text-indigo-300 underline font-semibold ml-2 focus:outline-none"
      >
        Undo
      </button>
      <button onClick={onDismiss} className="icon-x-close text-gray-400 hover:text-white ml-2 text-xs" />
    </div>
  )
}

// ─── Project Hours KPI Strip (Story 3 & Story 7) ──────────────────────────────

function ProjectHoursStrip({ model, onOpenResourcePlanner }) {
  const hours = ENGAGEMENT_HOURS[model] || ENGAGEMENT_HOURS['Hourly']

  return (
    <div className="flex items-center justify-end bg-white border-b border-gray-200 px-6 py-2 shadow-xs flex-wrap gap-4">
      {/* KPI Values per model */}
      <div className="flex items-center gap-6 text-xs">
        {model === 'Fixed Cost' && (
          <>
            <div className="flex items-center gap-1.5"><span className="text-gray-500">Estimated:</span><span className="font-semibold text-gray-800">{hours.estimated}</span></div>
            <div className="flex items-center gap-1.5"><span className="text-gray-500">Top-Up:</span><span className="font-semibold text-gray-800">{hours.top_up}</span></div>
            <div className="flex items-center gap-1.5"><span className="text-gray-500">Total:</span><span className="font-semibold text-indigo-700">{hours.total}</span></div>
            <div className="flex items-center gap-1.5"><span className="text-gray-500">Spent:</span><span className="font-semibold text-gray-800">{hours.spent}</span></div>
          </>
        )}
        {model === 'Hourly' && (
          <>
            <div className="flex items-center gap-1.5"><span className="text-gray-500">Purchased:</span><span className="font-semibold text-gray-800">{hours.purchased}</span></div>
            <div className="flex items-center gap-1.5"><span className="text-gray-500">Billed:</span><span className="font-semibold text-gray-800">{hours.billed}</span></div>
            <div className="flex items-center gap-1.5"><span className="text-gray-500">Spent:</span><span className="font-semibold text-indigo-700">{hours.spent}</span></div>
            <div className="flex items-center gap-1.5"><span className="text-gray-500">Balance:</span><span className="font-semibold text-green-600">{hours.balance}</span></div>
            <div className="flex items-center gap-1.5 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 text-amber-800 text-[11px] font-medium">
              <span>Expiry: 26-Nov-2026</span>
            </div>
          </>
        )}
        {model === 'Hire Base' && (
          <>
            <div className="flex items-center gap-1.5"><span className="text-gray-500">Contract Start:</span><span className="font-semibold text-gray-800">{hours.contract_start}</span></div>
            <div className="flex items-center gap-1.5"><span className="text-gray-500">Contract End:</span><span className="font-semibold text-gray-800">{hours.contract_end}</span></div>
            <div className="flex items-center gap-1.5"><span className="text-gray-500">Remaining:</span><span className="font-semibold text-indigo-700">{hours.remaining_days}</span></div>
          </>
        )}
      </div>
    </div>
  )
}

// ─── Create Issue Drawer (Story 1) ───────────────────────────────────────────

function CreateIssueModal({ open, onClose, onCreate }) {
  const [title, setTitle]         = useState('')
  const [issueType, setIssueType] = useState('Task')
  const [assignee, setAssignee]   = useState('Emma Clark')
  const [priority, setPriority]   = useState('Medium')
  const [sprint, setSprint]       = useState('Sprint 8')
  const [startDate, setStartDate] = useState('20-Nov-2026')
  const [dueDate, setDueDate]     = useState('27-Nov-2026')
  const [estimate, setEstimate]   = useState('8')
  const [desc, setDesc]           = useState('')
  const [errorMsg, setErrorMsg]   = useState('')

  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') onClose?.() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  function handleSubmit(e) {
    e?.preventDefault?.()
    if (!title.trim()) {
      setErrorMsg('Please enter a title.')
      return
    }
    const s = parseDate(startDate)
    const d = parseDate(dueDate)
    if (s && d && s > d) {
      setErrorMsg('Start Date should be on or before Due Date.')
      return
    }
    setErrorMsg('')
    onCreate({
      title,
      issue_type: issueType,
      assignee_name: assignee,
      priority,
      sprint_name: sprint,
      start_date: startDate,
      due_date: dueDate,
      estimated_hours: Number(estimate) || 0,
      description: desc,
    })
    onClose()
  }

  return (
    <div className="relative z-[999]" role="dialog" aria-modal="true" data-html2canvas-ignore="true">
      <div className="fixed inset-0 bg-gray-900 opacity-70" onClick={onClose} />
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="w-full max-w-[1172px] relative">
            <div className="p-0 overflow-hidden border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/* Header */}
              <div className="flex justify-between items-center border-b 2xl:py-4 2xl-to-xl:py-3 py-3 px-4">
                <div className="flex items-center gap-x-2">
                  <span className="text-gray-900 font-semibold text-lg inline-block align-middle">Create Issue</span>
                  <div className="has-custom-mini-multi-select flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white">
                    <span className="px-3 h-[34px] flex items-center bg-gray-50 border-r border-gray-300 text-gray-500 font-medium whitespace-nowrap 2xl:text-sm 2xl-to-xl:text-xs text-xs">Board</span>
                    <span className="px-3 h-[34px] flex items-center font-medium 2xl:text-sm 2xl-to-xl:text-xs text-xs text-gray-800">Default</span>
                  </div>
                </div>
                <span onClick={onClose} className="icon-x-close cursor-pointer text-2xl text-gray-500 hover:text-gray-800" />
              </div>

              {/* Body */}
              <form onSubmit={handleSubmit}>
                <div className="flex lg:flex-row flex-col flex-wrap">
                  {/* Left Column (65%) */}
                  <div className="lg:max-h-[600px] lg:max-w-[65%] flex-1 bg-white lg:border-r border-gray-200 px-4 pt-4 overflow-auto overflow-x-hidden scrollbar-hide space-y-4">
                    {/* Title */}
                    <div className="field-group">
                      <div className="flex items-center gap-2 mb-1.5">
                        <label className="!text-sm !text-gray-500 label mr-1 font-medium">Title <span className="text-red-500">*</span></label>
                      </div>
                      <input
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        placeholder="Enter issue title"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 text-xs 2xl:text-sm"
                        required
                      />
                    </div>
                    {/* Description */}
                    <div className="field-group">
                      <label className="text-gray-500 text-sm font-medium mb-1.5 block">Description</label>
                      <textarea
                        rows={8}
                        value={desc}
                        onChange={e => setDesc(e.target.value)}
                        placeholder="Add description..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 text-xs 2xl:text-sm"
                      />
                    </div>
                  </div>

                  {/* Right Column (35%) */}
                  <div className="lg:max-w-[35%] flex-1 py-4 px-4 md:max-h-[516px] overflow-y-auto scrollbar-hide overflow-x-hidden 2xl:space-y-4 2xl-to-xl:space-y-3 space-y-3">
                    {/* Issue Type */}
                    <div className="flex items-center gap-3 justify-between">
                      <label className="text-gray-700 2xl:text-sm 2xl-to-xl:text-xs text-xs font-medium w-1/3">Issue Type <span className="text-red-500">*</span></label>
                      <select
                        value={issueType}
                        onChange={e => setIssueType(e.target.value)}
                        className="w-2/3 px-3 py-1.5 border border-gray-300 rounded-lg text-xs 2xl:text-sm bg-white"
                      >
                        <option value="Task">Task</option>
                        <option value="Story">Story</option>
                        <option value="Epic">Epic</option>
                        <option value="Bug">Bug</option>
                      </select>
                    </div>

                    {/* Priority */}
                    <div className="flex items-center gap-3 justify-between">
                      <label className="text-gray-700 2xl:text-sm 2xl-to-xl:text-xs text-xs font-medium w-1/3">Priority</label>
                      <select
                        value={priority}
                        onChange={e => setPriority(e.target.value)}
                        className="w-2/3 px-3 py-1.5 border border-gray-300 rounded-lg text-xs 2xl:text-sm bg-white"
                      >
                        <option value="Highest">Highest</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                    </div>

                    {/* Assignee */}
                    <div className="flex items-center gap-3 justify-between">
                      <label className="text-gray-700 2xl:text-sm 2xl-to-xl:text-xs text-xs font-medium w-1/3">Assignee</label>
                      <select
                        value={assignee}
                        onChange={e => setAssignee(e.target.value)}
                        className="w-2/3 px-3 py-1.5 border border-gray-300 rounded-lg text-xs 2xl:text-sm bg-white"
                      >
                        <option value="Emma Clark">Emma Clark</option>
                        <option value="Liam Brooks">Liam Brooks</option>
                        <option value="Sofia Reyes">Sofia Reyes</option>
                        <option value="Noah Fischer">Noah Fischer</option>
                        <option value="Mia Laurent">Mia Laurent</option>
                        <option value="Oliver Watts">Oliver Watts</option>
                      </select>
                    </div>

                    {/* Sprint */}
                    <div className="flex items-center gap-3 justify-between">
                      <label className="text-gray-700 2xl:text-sm 2xl-to-xl:text-xs text-xs font-medium w-1/3">Sprint</label>
                      <select
                        value={sprint}
                        onChange={e => setSprint(e.target.value)}
                        className="w-2/3 px-3 py-1.5 border border-gray-300 rounded-lg text-xs 2xl:text-sm bg-white"
                      >
                        <option value="Sprint 7">Sprint 7</option>
                        <option value="Sprint 8">Sprint 8</option>
                        <option value="None">None (Backlog)</option>
                      </select>
                    </div>

                    {/* Start Date & Due Date side-by-side (Story 1) */}
                    <div className="flex items-center gap-3 justify-between">
                      <label className="text-gray-700 2xl:text-sm 2xl-to-xl:text-xs text-xs font-medium w-1/3">Start Date</label>
                      <input
                        type="text"
                        value={startDate}
                        onChange={e => setStartDate(e.target.value)}
                        placeholder="DD-MMM-YYYY"
                        className="w-2/3 px-3 py-1.5 border border-gray-300 rounded-lg text-xs 2xl:text-sm bg-white"
                      />
                    </div>

                    <div className="flex items-center gap-3 justify-between">
                      <label className="text-gray-700 2xl:text-sm 2xl-to-xl:text-xs text-xs font-medium w-1/3">Due Date</label>
                      <input
                        type="text"
                        value={dueDate}
                        onChange={e => setDueDate(e.target.value)}
                        placeholder="DD-MMM-YYYY"
                        className="w-2/3 px-3 py-1.5 border border-gray-300 rounded-lg text-xs 2xl:text-sm bg-white"
                      />
                    </div>

                    {/* Estimated Time */}
                    <div className="flex items-center gap-3 justify-between">
                      <label className="text-gray-700 2xl:text-sm 2xl-to-xl:text-xs text-xs font-medium w-1/3">Estimated Time</label>
                      <div className="w-2/3 flex items-center gap-2">
                        <input
                          type="number"
                          value={estimate}
                          onChange={e => setEstimate(e.target.value)}
                          placeholder="Hours"
                          className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-xs 2xl:text-sm bg-white"
                        />
                        <span className="text-xs text-gray-500">h</span>
                      </div>
                    </div>

                    {errorMsg && (
                      <div className="p-2.5 rounded bg-red-50 border border-red-200 text-red-600 font-medium text-xs">
                        {errorMsg}
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer */}
                <div className="w-full flex p-4 items-center justify-between border-t border-gray-200 mt-4">
                  <div className="flex gap-x-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="outline-none rounded-lg focus-visible:border-indigo-300 hover:opacity-90 px-4 bg-white border border-gray-300 text-gray-700 2xl:text-sm 2xl-to-xl:text-xs text-xs py-1.5 h-9 font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="outline-none rounded-lg focus-visible:border-indigo-300 hover:opacity-90 px-4 bg-white border border-indigo-600 text-indigo-600 font-semibold 2xl:text-sm 2xl-to-xl:text-xs text-xs py-1.5 h-9"
                    >
                      Create
                    </button>
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="outline-none rounded-lg border focus-visible:border-indigo-300 hover:opacity-90 px-4 border-transparent text-white font-semibold 2xl:text-sm 2xl-to-xl:text-xs text-xs py-1.5 h-9 bg-indigo-600"
                    >
                      Create &amp; Open
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Issue Detail Panel ───────────────────────────────────────────────────────

// ─── Issue Detail Modal (Story 1 & Real CollabCRM popup structure) ───────────

function IssueDetailModal({ issue, onClose, onUpdateIssue }) {
  const [tab, setTab]             = useState('Details')
  const [title, setTitle]         = useState(issue?.title || '')
  const [desc, setDesc]           = useState(issue?.description || '')
  const [status, setStatus]       = useState(issue?.status || 'To Do')
  const [issueType, setIssueType] = useState(issue?.issue_type || 'Task')
  const [priority, setPriority]   = useState(issue?.priority || 'Medium')
  const [assignee, setAssignee]   = useState(issue?.assignee_name || 'Emma Clark')
  const [sprint, setSprint]       = useState(issue?.sprint_name || 'Sprint 8')
  const [startDate, setStartDate] = useState(issue?.start_date || '')
  const [dueDate, setDueDate]     = useState(issue?.due_date || '')
  const [estimate, setEstimate]   = useState(issue?.estimated_hours || 0)
  const [errorMsg, setErrorMsg]   = useState('')

  useEffect(() => {
    if (issue) {
      setTitle(issue.title || '')
      setDesc(issue.description || '')
      setStatus(issue.status || 'To Do')
      setIssueType(issue.issue_type || 'Task')
      setPriority(issue.priority || 'Medium')
      setAssignee(issue.assignee_name || 'Emma Clark')
      setSprint(issue.sprint_name || 'Sprint 8')
      setStartDate(issue.start_date || '')
      setDueDate(issue.due_date || '')
      setEstimate(issue.estimated_hours || 0)
      setErrorMsg('')
    }
  }, [issue])

  if (!issue) return null

  function handleSave(e) {
    e?.preventDefault()
    if (!title.trim()) {
      setErrorMsg('Title is required.')
      return
    }
    const s = parseDate(startDate)
    const d = parseDate(dueDate)
    if (s && d && s > d) {
      setErrorMsg('Start Date should be on or before Due Date.')
      return
    }
    setErrorMsg('')
    onUpdateIssue(issue.id, {
      title,
      description: desc,
      status,
      issue_type: issueType,
      priority,
      assignee_name: assignee,
      sprint_name: sprint,
      start_date: startDate,
      due_date: dueDate,
      estimated_hours: Number(estimate) || 0,
    })
    onClose()
  }

  return (
    <div className="relative z-[999]" role="dialog" aria-modal="true" data-html2canvas-ignore="true">
      <div className="fixed inset-0 bg-gray-900 opacity-70" onClick={onClose} />
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="w-full max-w-[1172px] relative">
            <div className="p-0 overflow-hidden border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/* Header */}
              <div className="flex justify-between items-center border-b 2xl:py-4 2xl-to-xl:py-3 py-3 px-4">
                <div className="flex items-center gap-x-2">
                  <TypeIcon type={issueType} />
                  <span className="text-indigo-600 font-bold text-base">{issue.key}</span>
                  <span className="text-gray-300">·</span>
                  <span className="text-gray-900 font-semibold text-lg inline-block align-middle truncate max-w-[600px]">{title}</span>
                  <div className="has-custom-mini-multi-select flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white ml-2">
                    <span className="px-2.5 h-[30px] flex items-center bg-gray-50 border-r border-gray-300 text-gray-500 font-medium whitespace-nowrap text-xs">Board</span>
                    <span className="px-2.5 h-[30px] flex items-center font-medium text-xs text-gray-800">{issue.board || 'Default'}</span>
                  </div>
                </div>
                <span onClick={onClose} className="icon-x-close cursor-pointer text-2xl text-gray-500 hover:text-gray-800" />
              </div>

              {/* Body */}
              <form onSubmit={handleSave}>
                <div className="flex lg:flex-row flex-col flex-wrap">
                  {/* Left Column (65%) */}
                  <div className="lg:max-h-[600px] lg:max-w-[65%] flex-1 bg-white lg:border-r border-gray-200 px-4 pt-3 overflow-auto overflow-x-hidden scrollbar-hide space-y-4">
                    {/* Tabs: Details / History */}
                    <div className="flex items-center gap-2 border-b border-gray-200">
                      {['Details', 'History'].map(t => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setTab(t)}
                          className={`py-2 px-3 text-xs font-semibold border-b-2 transition-colors ${
                            tab === t
                              ? 'border-indigo-600 text-indigo-700 bg-white'
                              : 'border-transparent text-gray-500 hover:text-gray-700'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>

                    {tab === 'Details' ? (
                      <div className="space-y-4">
                        {/* Title */}
                        <div className="field-group">
                          <label className="text-sm text-gray-700 font-medium mb-1.5 block">Title <span className="text-red-500">*</span></label>
                          <input
                            type="text"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 text-xs 2xl:text-sm font-medium"
                            required
                          />
                        </div>
                        {/* Description */}
                        <div className="field-group">
                          <label className="text-gray-700 text-sm font-medium mb-1.5 block">Description</label>
                          <textarea
                            rows={8}
                            value={desc}
                            onChange={e => setDesc(e.target.value)}
                            placeholder="Add description..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 text-xs 2xl:text-sm"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3 py-2">
                        {(!issue.history || issue.history.length === 0) ? (
                          <p className="text-xs text-gray-400 italic">No history entries logged yet.</p>
                        ) : (
                          issue.history.map((h, i) => (
                            <div key={i} className="p-2.5 rounded-lg border border-gray-100 bg-gray-50 text-xs">
                              <div className="flex items-center justify-between text-gray-500 mb-1">
                                <span className="font-semibold text-indigo-700">{h.user}</span>
                                <span className="text-[11px] text-gray-400">{h.date}</span>
                              </div>
                              <p className="text-gray-800">{h.text}</p>
                            </div>
                          ))
                        )}
                      </div>
                    )}
                  </div>

                  {/* Right Column (35%) */}
                  <div className="lg:max-w-[35%] flex-1 py-4 px-4 md:max-h-[516px] overflow-y-auto scrollbar-hide overflow-x-hidden 2xl:space-y-4 2xl-to-xl:space-y-3 space-y-3">
                    {/* Status */}
                    <div className="flex items-center gap-3 justify-between">
                      <label className="text-gray-700 2xl:text-sm 2xl-to-xl:text-xs text-xs font-medium w-1/3">Status</label>
                      <select
                        value={status}
                        onChange={e => setStatus(e.target.value)}
                        className="w-2/3 px-3 py-1.5 border border-gray-300 rounded-lg text-xs 2xl:text-sm bg-white font-medium"
                      >
                        <option value="To Do">To Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="In Review">In Review</option>
                        <option value="Ready For QA">Ready For QA</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </div>

                    {/* Issue Type */}
                    <div className="flex items-center gap-3 justify-between">
                      <label className="text-gray-700 2xl:text-sm 2xl-to-xl:text-xs text-xs font-medium w-1/3">Issue Type</label>
                      <select
                        value={issueType}
                        onChange={e => setIssueType(e.target.value)}
                        className="w-2/3 px-3 py-1.5 border border-gray-300 rounded-lg text-xs 2xl:text-sm bg-white"
                      >
                        <option value="Task">Task</option>
                        <option value="Story">Story</option>
                        <option value="Epic">Epic</option>
                        <option value="Bug">Bug</option>
                      </select>
                    </div>

                    {/* Priority */}
                    <div className="flex items-center gap-3 justify-between">
                      <label className="text-gray-700 2xl:text-sm 2xl-to-xl:text-xs text-xs font-medium w-1/3">Priority</label>
                      <select
                        value={priority}
                        onChange={e => setPriority(e.target.value)}
                        className="w-2/3 px-3 py-1.5 border border-gray-300 rounded-lg text-xs 2xl:text-sm bg-white"
                      >
                        <option value="Highest">Highest</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                    </div>

                    {/* Assignee */}
                    <div className="flex items-center gap-3 justify-between">
                      <label className="text-gray-700 2xl:text-sm 2xl-to-xl:text-xs text-xs font-medium w-1/3">Assignee</label>
                      <select
                        value={assignee}
                        onChange={e => setAssignee(e.target.value)}
                        className="w-2/3 px-3 py-1.5 border border-gray-300 rounded-lg text-xs 2xl:text-sm bg-white"
                      >
                        <option value="Emma Clark">Emma Clark</option>
                        <option value="Liam Brooks">Liam Brooks</option>
                        <option value="Sofia Reyes">Sofia Reyes</option>
                        <option value="Noah Fischer">Noah Fischer</option>
                        <option value="Mia Laurent">Mia Laurent</option>
                        <option value="Oliver Watts">Oliver Watts</option>
                      </select>
                    </div>

                    {/* Sprint */}
                    <div className="flex items-center gap-3 justify-between">
                      <label className="text-gray-700 2xl:text-sm 2xl-to-xl:text-xs text-xs font-medium w-1/3">Sprint</label>
                      <select
                        value={sprint}
                        onChange={e => setSprint(e.target.value)}
                        className="w-2/3 px-3 py-1.5 border border-gray-300 rounded-lg text-xs 2xl:text-sm bg-white"
                      >
                        <option value="Sprint 7">Sprint 7</option>
                        <option value="Sprint 8">Sprint 8</option>
                        <option value="None">None (Backlog)</option>
                      </select>
                    </div>

                    {/* Start Date & Due Date side-by-side */}
                    <div className="flex items-center gap-3 justify-between">
                      <label className="text-gray-700 2xl:text-sm 2xl-to-xl:text-xs text-xs font-medium w-1/3">Start Date</label>
                      <input
                        type="text"
                        value={startDate}
                        onChange={e => setStartDate(e.target.value)}
                        placeholder="DD-MMM-YYYY"
                        className="w-2/3 px-3 py-1.5 border border-gray-300 rounded-lg text-xs 2xl:text-sm bg-white font-medium"
                      />
                    </div>

                    <div className="flex items-center gap-3 justify-between">
                      <label className="text-gray-700 2xl:text-sm 2xl-to-xl:text-xs text-xs font-medium w-1/3">Due Date</label>
                      <input
                        type="text"
                        value={dueDate}
                        onChange={e => setDueDate(e.target.value)}
                        placeholder="DD-MMM-YYYY"
                        className="w-2/3 px-3 py-1.5 border border-gray-300 rounded-lg text-xs 2xl:text-sm bg-white font-medium"
                      />
                    </div>

                    {/* Estimated Hours & Logged Hours */}
                    <div className="flex items-center gap-3 justify-between">
                      <label className="text-gray-700 2xl:text-sm 2xl-to-xl:text-xs text-xs font-medium w-1/3">Estimated (h)</label>
                      <input
                        type="number"
                        value={estimate}
                        onChange={e => setEstimate(e.target.value)}
                        className="w-2/3 px-3 py-1.5 border border-gray-300 rounded-lg text-xs 2xl:text-sm bg-white"
                      />
                    </div>
                    <div className="flex items-center gap-3 justify-between text-xs text-gray-500 pt-1 border-t border-gray-100">
                      <span>Logged Hours:</span>
                      <strong className="text-gray-800 font-semibold">{issue.logged_hours || 0}h</strong>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                {errorMsg && (
                  <div className="px-4 py-2 bg-red-50 border-t border-red-200 text-xs text-red-600 font-medium">
                    {errorMsg}
                  </div>
                )}
                <div className="flex justify-end gap-x-2 border-t 2xl:py-4 2xl-to-xl:py-3 py-3 px-4 bg-gray-50">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 rounded-lg border border-gray-300 text-xs 2xl:text-sm text-gray-700 font-semibold hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs 2xl:text-sm font-semibold shadow-xs"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Unscheduled Issues Drawer (Story 4) ───────────────────────────────────────

function UnscheduledDrawer({ open, onClose, issues, onSchedule, onOpenDetail }) {
  const [search, setSearch] = useState('')
  const [schedulingId, setSchedulingId] = useState(null)
  const [inputStart, setInputStart] = useState('')
  const [inputDue, setInputDue] = useState('')
  const [dateErr, setDateErr] = useState('')

  if (!open) return null

  const unscheduled = issues.filter(i => !i.start_date && !i.due_date && !i.sprint_id)
  const filtered = unscheduled.filter(i =>
    i.key.toLowerCase().includes(search.toLowerCase()) ||
    i.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <Drawer
      title={
        <div className="flex items-center gap-2">
          <span className="icon-calendar-check-02 text-indigo-600 text-lg" />
          <span>Unscheduled Issues ({unscheduled.length})</span>
        </div>
      }
      onClose={onClose}
      width="w-[460px]"
      bodyCls=""
    >
      <div className="p-3 border-b border-gray-100 bg-gray-50">
        <div className="relative flex items-center">
          <span className="icon-search-refraction absolute left-3 text-gray-400 text-xs" />
          <input
            type="text"
            placeholder="Search by Key or Title..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-white border border-gray-300 rounded-lg text-xs focus:outline-none focus:border-indigo-600 placeholder:text-gray-400"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
        {filtered.length === 0 ? (
          <div className="text-center py-8 text-gray-400 text-xs">
            No unscheduled issues found.
          </div>
        ) : (
          filtered.map(item => (
            <div
              key={item.id}
              className="p-3 border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-sm bg-white transition-all space-y-2"
            >
              <div className="flex items-center justify-between">
                <div
                  className="flex items-center gap-1.5 cursor-pointer hover:underline"
                  onClick={() => onOpenDetail?.(item)}
                >
                  <TypeIcon type={item.issue_type} />
                  <span className="text-xs font-semibold text-indigo-700">{item.key}</span>
                </div>
                <StatusPill status={item.status} />
              </div>
              <p
                className="text-xs text-gray-800 font-medium cursor-pointer hover:text-indigo-600"
                onClick={() => onOpenDetail?.(item)}
              >
                {item.title}
              </p>
              <div className="flex items-center justify-between text-[11px] text-gray-500 pt-1 border-t border-gray-100">
                <span>{item.assignee_name}</span>
                <span>{item.estimated_hours}h estimated</span>
              </div>

              {schedulingId === item.id ? (
                <div className="pt-2 border-t border-gray-100 space-y-2">
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <label className="text-[10px] text-gray-500 font-medium block">Start Date</label>
                      <input
                        type="text"
                        value={inputStart}
                        onChange={e => setInputStart(e.target.value)}
                        placeholder="DD-MMM-YYYY"
                        className="w-full px-2 py-1 border border-gray-300 rounded text-xs bg-white focus:outline-none focus:border-indigo-600"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-gray-500 font-medium block">Due Date</label>
                      <input
                        type="text"
                        value={inputDue}
                        onChange={e => setInputDue(e.target.value)}
                        placeholder="DD-MMM-YYYY"
                        className="w-full px-2 py-1 border border-gray-300 rounded text-xs bg-white focus:outline-none focus:border-indigo-600"
                      />
                    </div>
                  </div>
                  {dateErr && <p className="text-[10px] text-red-600">{dateErr}</p>}
                  <div className="flex justify-end gap-1.5 pt-1">
                    <button
                      onClick={() => setSchedulingId(null)}
                      className="px-2 py-1 text-[11px] text-gray-600 hover:bg-gray-100 rounded"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        const s = parseDate(inputStart)
                        const d = parseDate(inputDue)
                        if (!s || !d) {
                          setDateErr('Invalid format. Use DD-MMM-YYYY')
                          return
                        }
                        if (s > d) {
                          setDateErr('Start Date must be on or before Due Date')
                          return
                        }
                        onSchedule(item.id, inputStart, inputDue)
                        setSchedulingId(null)
                      }}
                      className="px-2.5 py-1 text-[11px] font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded shadow-2xs"
                    >
                      Save Dates
                    </button>
                  </div>
                </div>
              ) : (
                <div className="pt-2 flex items-center justify-between border-t border-gray-100">
                  <button
                    onClick={() => onOpenDetail?.(item)}
                    className="text-[11px] text-indigo-600 hover:underline"
                  >
                    Open Details
                  </button>
                  <button
                    onClick={() => {
                      setSchedulingId(item.id)
                      setInputStart(fmtDate(new Date()))
                      setInputDue(fmtDate(addDays(new Date(), 5)))
                      setDateErr('')
                    }}
                    className="px-2.5 py-1 text-xs font-semibold bg-indigo-50 text-indigo-700 hover:bg-indigo-600 hover:text-white rounded-md transition-colors"
                  >
                    Set Dates
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </Drawer>
  )
}

// ─── Baseline Modal (Story 5) ─────────────────────────────────────────────────

function BaselineModal({ open, onClose, onSave, showBaseline, onToggleShow }) {
  const [name, setName] = useState('Agreed plan')

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center" data-html2canvas-ignore="true">
      <div className="absolute inset-0 bg-gray-900/40" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-2xl w-[360px] p-5 z-10 space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-2">
          <h3 className="text-sm font-semibold text-gray-800">Project Baseline</h3>
          <button onClick={onClose} className="icon-x-close text-gray-400 hover:text-gray-600 text-sm" />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Baseline Name *</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full text-xs px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600"
          />
        </div>

        <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg border border-gray-200">
          <span className="text-xs text-gray-700 font-medium">Show Baseline Bars</span>
          <input
            type="checkbox"
            checked={showBaseline}
            onChange={e => onToggleShow(e.target.checked)}
            className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4 cursor-pointer"
          />
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button
            onClick={onClose}
            className="px-3 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={() => { onSave(name); onClose() }}
            className="px-4 py-1.5 text-xs font-semibold bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Save Baseline
          </button>
        </div>
      </div>
    </div>
  )
}



// ─── Resource Planner Drawer (Story 7) ────────────────────────────────────────

function ResourcePlannerDrawer({ open, onClose, doubleBookingActive, onResolveClash }) {
  const [viewUnit, setViewUnit] = useState('%') // '%' | 'Hours' | 'Graph'
  const [zoom, setZoom]         = useState('Month') // 'Week' | 'Month' | 'Quarter'

  if (!open) return null

  return (
    <Drawer
      title={
        <div className="flex items-center gap-2">
          <span className="icon-users-02 text-indigo-600 text-base" />
          <span>Resource Planner — Occupancy</span>
        </div>
      }
      onClose={onClose}
      width="w-[640px]"
      bodyCls=""
    >
      {/* Toolbar in Drawer */}
      <div className="px-6 py-3 border-b border-gray-200 flex items-center justify-between gap-3 bg-white flex-wrap">
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 font-medium">Display:</span>
          <div className="flex bg-gray-100 p-0.5 rounded-lg border border-gray-200 text-xs">
            {['%', 'Hours', 'Graph'].map(u => (
              <button
                key={u}
                onClick={() => setViewUnit(u)}
                className={`px-2.5 py-1 rounded font-semibold transition-all ${
                  viewUnit === u ? 'bg-white text-indigo-700 shadow-xs' : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                {u}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 font-medium">Zoom:</span>
          <div className="flex bg-gray-100 p-0.5 rounded-lg border border-gray-200 text-xs">
            {['Week', 'Month', 'Quarter'].map(z => (
              <button
                key={z}
                onClick={() => setZoom(z)}
                className={`px-2.5 py-1 rounded font-semibold transition-all ${
                  zoom === z ? 'bg-white text-indigo-700 shadow-xs' : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                {z}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Developer occupancy table */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {HIRE_BASE_DEVELOPERS.map(dev => {
          const hasClash = dev.name === 'Liam Brooks' && doubleBookingActive
          const occupancy = hasClash ? 160 : dev.occupancy
          return (
            <div
              key={dev.id}
              className={`p-4 rounded-xl border transition-all ${
                hasClash
                  ? 'border-red-300 bg-red-50/30'
                  : 'border-gray-200 hover:border-indigo-200 bg-white'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center">
                    {dev.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-gray-800">{dev.name}</h4>
                    <span className="text-[11px] text-gray-500">{dev.role} · {dev.project}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-0.5 rounded text-xs font-bold ${
                      occupancy > 100
                        ? 'bg-red-100 text-red-700'
                        : occupancy >= 90
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-green-100 text-green-700'
                    }`}
                  >
                    {viewUnit === '%' && `${occupancy}%`}
                    {viewUnit === 'Hours' && `${Math.round(occupancy * 1.6)}h / 160h`}
                    {viewUnit === 'Graph' && `${occupancy}%`}
                  </span>
                </div>
              </div>

              {/* Progress bar occupancy */}
              <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden mb-2">
                <div
                  className={`h-full rounded-full transition-all ${
                    occupancy > 100 ? 'bg-red-500' : occupancy >= 90 ? 'bg-amber-500' : 'bg-indigo-600'
                  }`}
                  style={{ width: `${Math.min(occupancy, 100)}%` }}
                />
              </div>

              {hasClash && (
                <div className="mt-3 p-3 bg-red-100/70 border border-red-200 rounded-lg flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 text-red-800">
                    <span className="icon-alert-triangle text-red-600 text-base" />
                    <div>
                      <strong className="block">Double-booking detected</strong>
                      <span className="text-[11px] text-red-700">
                        Active on <em>IT Project</em> &amp; <em>Apex E-Commerce</em> (160% allocated).
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={onResolveClash}
                    className="px-2.5 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded font-semibold text-[11px] shrink-0 transition-colors shadow-2xs"
                  >
                    Resolve Clash
                  </button>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </Drawer>
  )
}

// ─── Company-Wide Projects Gantt Modal (Story 8) ──────────────────────────────

function CompanyDashboardModal({ open, onClose, onSelectProject }) {
  const [modelFilter, setModelFilter] = useState('All') // 'All' | 'Fixed Cost' | 'Hourly' | 'Hire Base'

  if (!open) return null

  const filteredProjects = modelFilter === 'All'
    ? COMPANY_PROJECTS
    : COMPANY_PROJECTS.filter(p => p.model === modelFilter)

  return (
    <div className="relative z-[999]" role="dialog" aria-modal="true" data-html2canvas-ignore="true">
      <div className="fixed inset-0 bg-gray-900 opacity-70" onClick={onClose} />
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="relative bg-white rounded-2xl shadow-2xl w-[900px] max-w-full max-h-[85vh] flex flex-col z-10 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
          <div>
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <span className="icon-grid-01 text-indigo-600 text-lg" />
              Projects Timeline
            </h2>
          </div>
          <button onClick={onClose} className="icon-x-close text-gray-400 hover:text-gray-600 text-base" />
        </div>

        {/* Stats Strip */}
        <div className="px-6 py-3 border-b border-gray-200 bg-white flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-4 text-xs">
            <span className="font-medium text-gray-500">Total Projects: <strong className="text-gray-800">3</strong></span>
            <span className="h-4 w-px bg-gray-200" />
            <span className="text-indigo-600 font-semibold">Hourly: 1</span>
            <span className="text-purple-600 font-semibold">Fixed Cost: 1</span>
            <span className="text-sky-600 font-semibold">Hire Base: 1</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 font-medium">Model:</span>
            <div className="flex bg-gray-100 p-0.5 rounded-lg border border-gray-200 text-xs">
              {['All', 'Hourly', 'Fixed Cost', 'Hire Base'].map(m => (
                <button
                  key={m}
                  onClick={() => setModelFilter(m)}
                  className={`px-2.5 py-1 rounded font-semibold transition-all ${
                    modelFilter === m ? 'bg-white text-indigo-700 shadow-xs' : 'text-gray-500 hover:text-gray-800'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Project Timeline List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {filteredProjects.map(p => (
            <div key={p.id} className="p-4 rounded-xl border border-gray-200 hover:border-indigo-300 bg-white hover:shadow-sm transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold text-white" style={{ backgroundColor: p.color }}>
                    {p.code}
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">{p.name}</h3>
                    <div className="text-[11px] text-gray-500">
                      Model: <strong>{p.model}</strong> · Duration: {p.start} – {p.end} · Spent: {p.spent_hours} / {p.total_hours}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => { onClose(); onSelectProject(p.name) }}
                  className="px-3 py-1.5 text-xs font-semibold bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg flex items-center gap-1 transition-colors"
                >
                  <span>Open Gantt</span>
                  <span className="icon-arrow-narrow-right text-xs" />
                </button>
              </div>

              {/* Project timeline bar & milestones */}
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-100 space-y-2">
                <div className="flex items-center justify-between text-[11px] text-gray-500">
                  <span>{p.start}</span>
                  <span className="font-semibold text-gray-700">Project Timeline</span>
                  <span>{p.end}</span>
                </div>
                <div className="w-full bg-gray-200 h-3 rounded-full relative overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: '85%', backgroundColor: p.color }} />
                </div>
                {p.model === 'Fixed Cost' && p.milestones && p.milestones.length > 0 && (
                  <div className="flex items-center gap-3 pt-1 text-[11px]">
                    <span className="text-gray-500 font-medium">Milestones:</span>
                    {p.milestones.map((m, idx) => (
                      <span key={idx} className="bg-white border border-gray-200 px-2 py-0.5 rounded text-gray-700 font-medium text-[10px]">
                        🏁 {m}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-gray-200 bg-gray-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg text-xs font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
    </div>
    </div>
  )
}

// ─── Main GanttBoard Page ─────────────────────────────────────────────────────

const PM_NAV = [
  ['Dashboard',          'grid-01',           'dashboard'],
  ['Projects',           'layers-three-02',   'projects'],
  ['Tasks',              'check-square',       'tasks'],
  ['Resource Planner',   'users-02',           'resource-planner'],
  ['Daily Allocation',   'calendar-check-02',  'daily-allocation'],
  ['Reports',            'bar-chart-square-01','reports'],
]

const BOARD_TABS = ['Board', 'Issue List', 'Backlog', 'Completed Sprints', 'Gantt', 'Notification Settings']

const COLS = [
  { key: 'type',       label: 'Type',       w: 60 },
  { key: 'key',        label: 'Key',        w: 75 },
  { key: 'title',      label: 'Title',      w: 180 },
  { key: 'assignee',   label: 'Assignee',   w: 115 },
  { key: 'start_date', label: 'Start Date', w: 90 },
  { key: 'due_date',   label: 'Due Date',   w: 90 },
]

export default function GanttBoard() {
  const searchParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null
  const initBaseline = searchParams?.get('baseline') === '1'
  const initClient   = searchParams?.get('client') === '1'
  const initModel    = searchParams?.get('model') || 'Hourly'
  const initGroup    = searchParams?.get('group') || (initModel === 'Hire Base' ? 'Assignee' : 'None')
  const initBoard    = searchParams?.get('board') || 'Default'
  const initMobile   = searchParams?.get('mobile') === '1'
  const initView     = searchParams?.get('view') || 'Month'
  const initCreate   = searchParams?.get('create') === '1'

  const [activeTab, setActiveTab]             = useState('Gantt')
  const [viewMode, setViewMode]               = useState(initView)
  const [projectModel, setProjectModel]       = useState(initModel)
  const [issues, setIssues]                   = useState(INITIAL_ISSUES)
  const [groupBy, setGroupBy]                 = useState(initGroup)
  const [selectedDeveloper, setSelectedDeveloper] = useState(null)
  const [selectedBoard, setSelectedBoard]     = useState(initBoard)
  const [doubleBookingActive, setDoubleBookingActive] = useState(true)
  const [resourcePlannerOpen, setResourcePlannerOpen] = useState(false)
  const [companyGanttOpen, setCompanyGanttOpen]       = useState(false)
  const [isMobileView, setIsMobileView]       = useState(initMobile)
  const [boardMenuOpen, setBoardMenuOpen]     = useState(false)
  const [groupMenuOpen, setGroupMenuOpen]     = useState(false)
  const [hovered, setHovered]                 = useState(null)
  const [panel, setPanel]                     = useState(null)
  const [createModalOpen, setCreateModalOpen] = useState(initCreate)
  const [unscheduledOpen, setUnscheduledOpen] = useState(false)
  const [baselineModalOpen, setBaselineModalOpen] = useState(false)
  const [showBaseline, setShowBaseline]       = useState(initBaseline)
  const [baselineData, setBaselineData]       = useState(() => {
    if (initBaseline) {
      return {
        'IT-56': { start: '01-Nov-2026', due: '07-Nov-2026' },
        'IT-57': { start: '06-Nov-2026', due: '14-Nov-2026' },
        'IT-58': { start: '13-Nov-2026', due: '20-Nov-2026' },
        'IT-59': { start: '18-Nov-2026', due: '25-Nov-2026' },
      }
    }
    return {}
  })
  const [anchorDate, setAnchorDate]           = useState(new Date(2026, 10, 1))
  const [datePickerOpen, setDatePickerOpen]   = useState(false)
  const [clientMode, setClientMode]           = useState(initClient)
  const [undoToast, setUndoToast]             = useState(false)
  const [undoSnapshot, setUndoSnapshot]       = useState(null)
  const [collapsed, setCollapsed]             = useState({ 'IT-55': false })

  const calScrollRef = useRef(null)
  const calAreaRef   = useRef(null)
  const dragStateRef = useRef(null)

  function handlePrevYear() {
    setAnchorDate(d => new Date(d.getFullYear() - 1, d.getMonth(), 1))
  }
  function handleNextYear() {
    setAnchorDate(d => new Date(d.getFullYear() + 1, d.getMonth(), 1))
  }
  function handlePrevPeriod() {
    if (viewMode === 'Week') {
      setAnchorDate(d => new Date(d.getTime() - 7 * 86400000))
    } else if (viewMode === 'Quarter') {
      setAnchorDate(d => new Date(d.getFullYear(), d.getMonth() - 3, 1))
    } else {
      setAnchorDate(d => new Date(d.getFullYear(), d.getMonth() - 1, 1))
    }
  }
  function handleNextPeriod() {
    if (viewMode === 'Week') {
      setAnchorDate(d => new Date(d.getTime() + 7 * 86400000))
    } else if (viewMode === 'Quarter') {
      setAnchorDate(d => new Date(d.getFullYear(), d.getMonth() + 3, 1))
    } else {
      setAnchorDate(d => new Date(d.getFullYear(), d.getMonth() + 1, 1))
    }
  }
  function handleToday() {
    setAnchorDate(new Date(2026, 10, 1))
    scrollToToday()
  }

  // Multi-board active issues (Story 7)
  const activeIssues = useMemo(() => {
    if (selectedBoard === 'Test') {
      return TEST_BOARD_ISSUES
    }
    if (selectedBoard === 'Project Gantt (All Boards)') {
      return [...issues.map(i => ({ ...i, board: 'Default' })), ...TEST_BOARD_ISSUES]
    }
    return issues.map(i => ({ ...i, board: 'Default' }))
  }, [issues, selectedBoard])

  const { start: viewStart, count: dayCount, cellW } = getViewConfig(viewMode, anchorDate)
  const calendarWidth = dayCount * cellW
  const todayOffset   = dayDiff(viewStart, TODAY) * cellW

  const rangeLabel = useMemo(() => {
    if (viewMode === 'Quarter') {
      const qStartMonth = Math.floor(anchorDate.getMonth() / 3) * 3
      const startM = new Date(anchorDate.getFullYear(), qStartMonth, 1).toLocaleString('default', { month: 'long' })
      const endM = new Date(anchorDate.getFullYear(), qStartMonth + 2, 1).toLocaleString('default', { month: 'long' })
      return `${startM} ${anchorDate.getFullYear()} – ${endM} ${anchorDate.getFullYear()}`
    }
    if (viewMode === 'Week') {
      const end = new Date(viewStart)
      end.setDate(end.getDate() + dayCount - 1)
      return `${fmtDate(viewStart)} – ${fmtDate(end)}`
    }
    return `${anchorDate.toLocaleString('default', { month: 'long' })} ${anchorDate.getFullYear()}`
  }, [viewMode, anchorDate, viewStart, dayCount])

  const unscheduledCount = activeIssues.filter(i => !i.start_date && !i.due_date && !i.sprint_id).length

  // Flat list respecting collapse or grouping (Story 2 & Story 7)
  const rows = useMemo(() => {
    const list = []
    const sourceIssues = selectedDeveloper
      ? activeIssues.filter(i => i.assignee_name === selectedDeveloper)
      : activeIssues

    if (groupBy === 'Assignee') {
      const assignees = selectedDeveloper
        ? [selectedDeveloper]
        : ['Emma Clark', 'Liam Brooks', 'Sofia Reyes', 'Noah Fischer', 'Oliver Watts', 'Mia Laurent']
      assignees.forEach(devName => {
        const devIssues = sourceIssues.filter(i => i.assignee_name === devName)
        if (devIssues.length === 0) return

        const devMeta = HIRE_BASE_DEVELOPERS.find(d => d.name === devName)
        const hasClash = devMeta?.double_booked && doubleBookingActive

        list.push({
          id: `dev-${devName}`,
          key: `dev-${devName}`,
          isGroupHeader: true,
          groupTitle: devName,
          role: devMeta?.role || 'Developer',
          remaining_days: devMeta?.remaining_days || 8,
          contract_start: devMeta?.contract_start || '01-Nov-2026',
          contract_end: devMeta?.contract_end || '28-Nov-2026',
          hasClash,
          clashOverlap: devMeta?.double_booking_overlap || '05-Nov-2026 to 12-Nov-2026',
          depth: 0,
        })

        devIssues.forEach(child => {
          list.push({ ...child, depth: 1 })
        })
      })
    } else {
      for (const issue of sourceIssues) {
        if (issue.parent_id) continue
        if (!issue.start_date && !issue.due_date && !issue.sprint_id && issue.issue_type !== 'Epic') continue
        list.push({ ...issue, depth: 0 })
        if (issue.issue_type === 'Epic' && !collapsed[issue.id]) {
          for (const childKey of issue.children || []) {
            const child = sourceIssues.find(i => i.key === childKey)
            if (child) list.push({ ...child, depth: 1 })
          }
        }
      }
    }
    return list
  }, [activeIssues, groupBy, collapsed, doubleBookingActive, selectedDeveloper])

  const dynamicCols = useMemo(() => {
    if (isMobileView) {
      return [
        { key: 'key',        label: 'Key',        w: 64 },
        { key: 'title',      label: 'Title',      w: 130 },
        { key: 'assignee',   label: 'Assignee',   w: 90 },
        { key: 'start_date', label: 'Start',      w: 80 },
        { key: 'due_date',   label: 'Due',        w: 80 },
      ]
    }
    if (selectedBoard === 'Project Gantt (All Boards)') {
      return [
        { key: 'type',       label: 'Type',       w: 54 },
        { key: 'board',      label: 'Board',      w: 60 },
        { key: 'key',        label: 'Key',        w: 70 },
        { key: 'title',      label: 'Title',      w: 160 },
        { key: 'assignee',   label: 'Assignee',   w: 110 },
        { key: 'start_date', label: 'Start Date', w: 90 },
        { key: 'due_date',   label: 'Due Date',   w: 90 },
      ]
    }
    return COLS
  }, [isMobileView, selectedBoard])

  const dynamicGridW = dynamicCols.reduce((sum, c) => sum + c.w, 0)

  // Days array
  const days = []
  for (let i = 0; i < dayCount; i++) {
    const d = new Date(viewStart)
    d.setDate(d.getDate() + i)
    days.push(d)
  }

  // Group days by month for timeline header (Tier 1)
  const monthGroups = useMemo(() => {
    const groups = []
    let current = null
    days.forEach((d) => {
      const key = `${d.toLocaleString('default', { month: 'long' })} ${d.getFullYear()}`
      if (!current || current.key !== key) {
        current = { key, count: 1 }
        groups.push(current)
      } else {
        current.count++
      }
    })
    return groups
  }, [days])

  // Group days by 7-day weeks for Quarter view (Tier 2)
  const weekGroups = useMemo(() => {
    if (viewMode !== 'Quarter') return null
    const weeks = []
    let wNum = 40
    for (let i = 0; i < days.length; i += 7) {
      const count = Math.min(7, days.length - i)
      weeks.push({ label: `W${wNum}`, count })
      wNum++
    }
    return weeks
  }, [viewMode, days])

  function scrollToToday() {
    if (calScrollRef.current) {
      calScrollRef.current.scrollTo({
        left: Math.max(0, todayOffset - 250),
        behavior: 'smooth'
      })
    }
  }

  useEffect(() => {
    scrollToToday()
  }, [viewMode])

  // Drag & drop handlers
  function handleMouseDown(e, issue, mode) {
    if (clientMode) return
    e.stopPropagation()
    const start = parseDate(issue.start_date) || TODAY
    const due   = parseDate(issue.due_date) || addDays(start, 5)

    dragStateRef.current = {
      issueId: issue.id,
      mode,
      startX: e.clientX,
      initialStart: start,
      initialDue: due,
      oldStartDateStr: issue.start_date,
      oldDueDateStr: issue.due_date,
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
  }

  function handleMouseMove(e) {
    if (!dragStateRef.current) return
    const { mode, startX, initialStart, initialDue } = dragStateRef.current
    const deltaDays = Math.round((e.clientX - startX) / cellW)
    if (deltaDays === 0) return

    let newStart = new Date(initialStart)
    let newDue   = new Date(initialDue)

    if (mode === 'move') {
      newStart = addDays(initialStart, deltaDays)
      newDue   = addDays(initialDue, deltaDays)
    } else if (mode === 'resize-left') {
      newStart = addDays(initialStart, deltaDays)
      if (newStart > newDue) newStart = new Date(newDue)
    } else if (mode === 'resize-right') {
      newDue = addDays(initialDue, deltaDays)
      if (newDue < newStart) newDue = new Date(newStart)
    }

    setIssues(prev =>
      prev.map(i => {
        if (i.id !== dragStateRef.current.issueId) return i
        return {
          ...i,
          start_date: fmtDate(newStart),
          due_date: fmtDate(newDue),
        }
      })
    )
  }

  function handleMouseUp() {
    window.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('mouseup', handleMouseUp)

    if (!dragStateRef.current) return
    const { issueId, oldStartDateStr, oldDueDateStr } = dragStateRef.current
    dragStateRef.current = null

    setIssues(prev => {
      const target = prev.find(i => i.id === issueId)
      if (!target) return prev
      if (target.start_date === oldStartDateStr && target.due_date === oldDueDateStr) {
        return prev
      }

      setUndoSnapshot({ issueId, prevStart: oldStartDateStr, prevDue: oldDueDateStr })
      setUndoToast(true)

      const newHistory = [...(target.history || [])]
      const timestamp = nowTimestamp()
      if (target.start_date !== oldStartDateStr) {
        newHistory.push({
          id: Date.now(),
          user: 'Emma Clark',
          date: timestamp,
          text: `updated Start Date to ${target.start_date}`
        })
      }
      if (target.due_date !== oldDueDateStr) {
        newHistory.push({
          id: Date.now() + 1,
          user: 'Emma Clark',
          date: timestamp,
          text: `updated Due Date to ${target.due_date}`
        })
      }

      return prev.map(i => i.id === issueId ? { ...i, history: newHistory } : i)
    })
  }

  function handleUndo() {
    if (!undoSnapshot) return
    const { issueId, prevStart, prevDue } = undoSnapshot
    setIssues(prev =>
      prev.map(i => {
        if (i.id !== issueId) return i
        const newHist = [...(i.history || []), {
          id: Date.now(),
          user: 'Emma Clark',
          date: nowTimestamp(),
          text: `reverted dates via Undo to ${prevStart} – ${prevDue}`
        }]
        return {
          ...i,
          start_date: prevStart,
          due_date: prevDue,
          history: newHist,
        }
      })
    )
    setUndoToast(false)
    setUndoSnapshot(null)
  }

  function handleScheduleFromUnscheduled(issueId, startStr, dueStr) {
    setIssues(prev =>
      prev.map(i => {
        if (i.id !== issueId) return i
        const newHist = [...(i.history || []), {
          id: Date.now(),
          user: 'Emma Clark',
          date: nowTimestamp(),
          text: `scheduled issue: Start Date ${startStr}, Due Date ${dueStr}`
        }]
        return {
          ...i,
          start_date: startStr,
          due_date: dueStr,
          history: newHist,
        }
      })
    )
    setUndoSnapshot({ issueId, prevStart: '', prevDue: '' })
    setUndoToast(true)
    setUnscheduledOpen(false)
  }

  function handlePanelUpdateIssue(issueId, updatedFields) {
    setIssues(prev =>
      prev.map(i => {
        if (i.id !== issueId) return i
        const newHist = [...(i.history || [])]
        const ts = nowTimestamp()
        if (updatedFields.start_date !== i.start_date) {
          newHist.push({ id: Date.now(), user: 'Emma Clark', date: ts, text: `updated Start Date to ${updatedFields.start_date}` })
        }
        if (updatedFields.due_date !== i.due_date) {
          newHist.push({ id: Date.now() + 1, user: 'Emma Clark', date: ts, text: `updated Due Date to ${updatedFields.due_date}` })
        }
        if (updatedFields.status && updatedFields.status !== i.status) {
          newHist.push({ id: Date.now() + 2, user: 'Emma Clark', date: ts, text: `changed status to ${updatedFields.status}` })
        }
        return {
          ...i,
          ...updatedFields,
          history: newHist,
        }
      })
    )
    setUndoToast(true)
    setPanel(null)
  }

  function handleCreateIssue(data) {
    const nextNum = 64 + issues.length
    const newKey = `IT-${nextNum}`
    const newIssue = {
      id: newKey,
      key: newKey,
      title: data.title,
      issue_type: data.issue_type,
      assignee_name: data.assignee_name,
      status: 'To Do',
      start_date: data.start_date,
      due_date: data.due_date,
      estimated_hours: data.estimated_hours,
      logged_hours: 0,
      children: [],
      links: [],
      history: [
        { id: Date.now(), user: 'Emma Clark', date: nowTimestamp(), text: 'created issue' },
        ...(data.start_date || data.due_date ? [{
          id: Date.now()+1,
          user: 'Emma Clark',
          date: nowTimestamp(),
          text: `set Start Date to ${data.start_date || '—'} and Due Date to ${data.due_date || '—'}`
        }] : [])
      ]
    }
    setIssues(prev => [newIssue, ...prev])
    setUndoSnapshot({ issueId: newKey, prevStart: '', prevDue: '' })
    setUndoToast(true)
  }

  function handleSaveBaseline(name) {
    const map = {}
    for (const item of issues) {
      if (item.start_date && item.due_date) {
        map[item.id] = { start: item.start_date, due: item.due_date }
      }
    }
    setBaselineData(map)
    setShowBaseline(true)
  }

  // Connector lines between linked issues (Story 5)
  const dependencyLines = useMemo(() => {
    const lines = []
    const rowMap = {}
    rows.forEach((r, idx) => {
      rowMap[r.id] = idx
    })

    rows.forEach((r) => {
      if (!r.links || r.links.length === 0) return
      const fromStart = parseDate(r.start_date)
      const fromDue   = parseDate(r.due_date)
      if (!fromStart || !fromDue) return

      r.links.forEach((l) => {
        const toRowIdx = rowMap[l.target]
        const toIssue = issues.find(i => i.id === l.target)
        if (toRowIdx === undefined || !toIssue) return
        const toStart = parseDate(toIssue.start_date)
        const toDue   = parseDate(toIssue.due_date)
        if (!toStart || !toDue) return

        const fromRowIdx = rowMap[r.id]
        // Coordinates relative to calendar canvas top-left:
        // Pinned header has height 40px (Sprints row only)
        const PINNED_OFFSET = 40
        const y1 = PINNED_OFFSET + fromRowIdx * ROW_H + ROW_H / 2
        const x1 = dayDiff(viewStart, fromDue) * cellW + cellW
        const y2 = PINNED_OFFSET + toRowIdx * ROW_H + ROW_H / 2
        const x2 = dayDiff(viewStart, toStart) * cellW

        const conflict = toStart < fromDue

        lines.push({
          id: `${r.id}->${toIssue.id}`,
          x1, y1, x2, y2,
          conflict,
        })
      })
    })

    return lines
  }, [rows, issues, viewStart, cellW])

  return (
    <AppShell
      portal="project-management"
      nav={PM_NAV}
      activeLabel="Tasks"
      title="Board | IT | CollabCRM"
    >
      {/* ── Page Header: Breadcrumb & Create Issue Button / Client View Header ── */}
      <div className="sticky top-0 z-[60] 2xl:h-[60px] 2xl-to-xl:h-[52px] h-[52px] border-b border-gray-200 bg-white shadow-sm flex items-center justify-between 2xl:px-6 px-4">
        {clientMode ? (
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
              <span className="icon-layers-three-02 text-indigo-600 2xl:text-xl text-base" />
              <div>
                <span className="2xl:text-sm text-xs text-gray-800 font-bold">IT Project — Client Schedule View</span>
                <span className="ml-2 px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-700 text-[10px] font-semibold rounded-full">
                  Read-only
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleExportPDF}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
              >
                <span className="icon-download-02 text-xs" />
                Export PDF
              </button>
              <button
                onClick={() => setClientMode(false)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-semibold transition-colors"
                title="Return to full project management board"
              >
                Exit Preview
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-3">
              <span className="icon-layers-three-02 text-gray-400 2xl:text-xl 2xl-to-xl:text-base text-base" />
              <span className="2xl:text-sm 2xl-to-xl:text-xs text-xs text-gray-500 font-medium">IT Project</span>
              <span className="icon-chevron-right text-gray-300 2xl:text-sm text-xs" />

              {/* Board Selector (Story 8) */}
              <div className="relative">
                <button
                  onClick={() => setBoardMenuOpen(prev => !prev)}
                  className="flex items-center gap-1.5 2xl:text-sm 2xl-to-xl:text-xs text-xs text-gray-800 font-semibold hover:text-indigo-600 px-1.5 py-0.5 rounded hover:bg-gray-100 transition-colors"
                >
                  <span>{selectedBoard === 'Project Gantt (All Boards)' ? 'Project Gantt (All Boards)' : `${selectedBoard} Board`}</span>
                  <span className="icon-chevron-down text-xs text-gray-500" />
                </button>

                {boardMenuOpen && (
                  <div className="absolute left-0 mt-1 w-52 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                    {BOARDS_LIST.map(b => (
                      <button
                        key={b}
                        onClick={() => { setSelectedBoard(b); setBoardMenuOpen(false) }}
                        className={`w-full text-left px-3 py-2 text-xs hover:bg-gray-100 flex items-center justify-between ${
                          selectedBoard === b ? 'font-semibold text-indigo-600 bg-indigo-50/50' : 'text-gray-700'
                        }`}
                      >
                        <span>{b === 'Project Gantt (All Boards)' ? b : `${b} Board`}</span>
                        {selectedBoard === b && <span className="icon-check text-indigo-600 text-xs" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <span className="icon-chevron-right text-gray-300 2xl:text-sm text-xs" />
              <span className="2xl:text-sm 2xl-to-xl:text-xs text-xs text-gray-800 font-semibold">{activeTab}</span>

              {/* Model Selector in Header */}
              <div className="flex items-center gap-1.5 ml-3 pl-3 border-l border-gray-200">
                <span className="2xl:text-sm 2xl-to-xl:text-xs text-xs text-gray-500 font-medium">Model:</span>
                <div className="flex items-center bg-gray-100 p-0.5 rounded-lg border border-gray-200 text-xs">
                  {['Hourly', 'Fixed Cost', 'Hire Base'].map(m => (
                    <button
                      key={m}
                      onClick={() => {
                        setProjectModel(m)
                        if (m === 'Hire Base') setGroupBy('Assignee')
                      }}
                      className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
                        projectModel === m ? 'bg-white text-indigo-700 shadow-xs' : 'text-gray-500 hover:text-gray-800'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* ── Tab Strip ── */}
      <div className="bg-white border-b border-gray-200 2xl:px-6 px-4">
        <nav className="flex items-center gap-1 h-[40px]">
          {BOARD_TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={
                tab === activeTab
                  ? 'text-indigo-700 bg-indigo-50 tab-transition font-semibold relative z-20 whitespace-nowrap py-2 px-3 w-max 2xl:text-sm 2xl-to-xl:text-xs text-xs text-center rounded-md'
                  : 'text-gray-500 tab-transition font-semibold relative z-20 whitespace-nowrap py-2 px-3 w-max 2xl:text-sm 2xl-to-xl:text-xs text-xs text-center rounded-md hover:bg-gray-50'
              }
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* ── Real CollabCRM Filter Bar (matches Board & Issue List tabs exactly) ── */}
      <div className="flex items-center justify-between gap-3 bg-white border-b border-gray-200 2xl:px-6 px-4 py-2 shadow-xs w-full">
        {/* Left: Filter Funnel + Avatar Stack + Sprint + Ends in days */}
        <div className="flex items-center gap-3">
          {/* Filter Funnel Icon */}
          <div className="text-xs rounded-lg border border-gray-300 p-1.5 bg-white flex items-center cursor-pointer hover:bg-gray-50 text-gray-700 shadow-2xs">
            <span className="icon-filter-funnel text-indigo-700 text-sm" />
            <span className="icon-chevron-down text-xs text-gray-400 ml-1" />
          </div>

          {/* Avatar Stack for Assignees/Developers */}
          <div className="flex items-center relative pl-1">
            {TEAM_AVATARS.map((dev, idx) => (
              <button
                key={dev.name}
                onClick={() => setSelectedDeveloper(prev => prev === dev.name ? null : dev.name)}
                title={`Filter by ${dev.name} (${dev.role})`}
                className={`relative flex-shrink-0 size-8 rounded-full border-2 border-white shadow-sm flex items-center justify-center text-white text-xs font-bold transition-all duration-200 hover:scale-110 hover:z-20 ${
                  idx > 0 ? '-ml-2.5' : ''
                } ${dev.bg} ${
                  selectedDeveloper === dev.name ? 'ring-2 ring-indigo-600 ring-offset-1 scale-110 z-20' : ''
                }`}
              >
                {dev.initials}
              </button>
            ))}
            <div
              className="flex-shrink-0 size-8 bg-gray-100 rounded-full flex items-center justify-center text-xs font-semibold text-gray-600 border-2 border-white shadow-sm -ml-2.5 cursor-pointer hover:bg-gray-200"
              title="More team members"
            >
              +12
            </div>
          </div>

          {/* Sprint Dropdown */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-gray-300 bg-white text-xs font-medium text-gray-700 cursor-pointer hover:border-gray-400">
            <span className="text-gray-500">Sprint:</span>
            <span className="font-semibold text-gray-800">Sprint 8 (Active)</span>
            <span className="icon-chevron-down text-xs text-gray-400 ml-0.5" />
          </div>

          {/* Ends in days indicator */}
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <span className="icon-clock text-gray-400 text-xs" />
            <span>Ends in 8 days</span>
          </div>
        </div>

        {/* Right: Group by + Create Issue + Fullscreen + Settings */}
        <div className="flex items-center gap-2">
          {/* Group by */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-gray-500 font-medium">Group by:</span>
            <div className="relative">
              <button
                onClick={() => setGroupMenuOpen(prev => !prev)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border bg-white text-xs font-medium cursor-pointer ${
                  groupMenuOpen ? 'border-indigo-600 ring-2 ring-indigo-100 text-indigo-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {groupBy === 'None' && <span className="icon-layers-three text-xs text-gray-500" />}
                {groupBy === 'Epic' && <TypeIcon type="Epic" />}
                {groupBy === 'Assignee' && <span className="icon-user-01 text-xs text-indigo-600" />}
                <span>{groupBy === 'Assignee' ? 'Developer' : groupBy}</span>
                <span className={`icon-chevron-${groupMenuOpen ? 'up' : 'down'} text-xs text-gray-400`} />
              </button>
              {groupMenuOpen && (
                <div className="absolute right-0 mt-1 w-44 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-40">
                  {[
                    { id: 'None', label: 'None', icon: <span className="icon-layers-three text-xs text-gray-500" /> },
                    { id: 'Epic', label: 'Epic', icon: <TypeIcon type="Epic" /> },
                    { id: 'Assignee', label: 'Developer', icon: <span className="icon-user-01 text-xs text-indigo-600" /> },
                  ].map(item => (
                    <button
                      key={item.id}
                      onClick={() => { setGroupBy(item.id); setGroupMenuOpen(false) }}
                      className={`w-full text-left px-3 py-1.5 text-xs hover:bg-gray-100 flex items-center gap-2 ${
                        groupBy === item.id ? 'font-semibold text-indigo-600 bg-indigo-50/50' : 'text-gray-700'
                      }`}
                    >
                      {item.icon}
                      <span className="flex-1">{item.label}</span>
                      {groupBy === item.id && <span className="icon-check text-indigo-600 text-xs" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Create Button (CollabCRM Split Button) */}
          <div className="inline-flex rounded-lg shadow-xs overflow-hidden">
            <button
              onClick={() => {
                setUnscheduledOpen(false)
                setPanel(null)
                setCompanyGanttOpen(false)
                setResourcePlannerOpen(false)
                setCreateModalOpen(true)
              }}
              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-colors"
            >
              Create
            </button>
            <button
              onClick={() => {
                setUnscheduledOpen(false)
                setPanel(null)
                setCompanyGanttOpen(false)
                setResourcePlannerOpen(false)
                setCreateModalOpen(true)
              }}
              className="px-1.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs border-l border-indigo-500 transition-colors"
              title="Create options"
            >
              <span className="icon-chevron-down text-xs" />
            </button>
          </div>

          {/* Fullscreen icon */}
          <button
            onClick={() => setIsMobileView(prev => !prev)}
            className="p-1.5 rounded-lg border border-gray-200 text-gray-500 hover:text-gray-800 hover:bg-gray-50"
            title="Toggle compact view"
          >
            <span className="icon-maximize-01 text-sm" />
          </button>

          {/* Settings / Gear */}
          <button
            className="p-1.5 rounded-lg border border-gray-200 text-gray-500 hover:text-gray-800 hover:bg-gray-50"
            title="Board settings"
          >
            <span className="icon-settings-01 text-sm" />
          </button>
        </div>
      </div>

      {/* ── Tab Content ── */}
      {activeTab === 'Issue List' ? (
        <div className="flex-1 p-6 overflow-auto bg-gray-50">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-gray-800">Issue List ({issues.length})</h2>
              <button
                onClick={() => setCreateModalOpen(true)}
                className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-xs font-semibold hover:bg-indigo-700"
              >
                + Create Issue
              </button>
            </div>
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-500">
                <tr>
                  <th className="py-2.5 px-4 font-semibold">Type</th>
                  <th className="py-2.5 px-4 font-semibold">Key</th>
                  <th className="py-2.5 px-4 font-semibold">Title</th>
                  <th className="py-2.5 px-4 font-semibold">Assignee</th>
                  <th className="py-2.5 px-4 font-semibold">Status</th>
                  <th className="py-2.5 px-4 font-semibold">Start Date</th>
                  <th className="py-2.5 px-4 font-semibold">Due Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {issues.map(item => (
                  <tr
                    key={item.id}
                    onClick={() => setPanel(item)}
                    className="hover:bg-indigo-50/40 cursor-pointer"
                  >
                    <td className="py-2.5 px-4"><TypeIcon type={item.issue_type} /></td>
                    <td className="py-2.5 px-4 font-semibold text-indigo-700">{item.key}</td>
                    <td className="py-2.5 px-4 text-gray-800 font-medium">{item.title}</td>
                    <td className="py-2.5 px-4 text-gray-600">{item.assignee_name}</td>
                    <td className="py-2.5 px-4"><StatusPill status={item.status} /></td>
                    <td className="py-2.5 px-4 text-gray-600 font-medium">{item.start_date || '—'}</td>
                    <td className="py-2.5 px-4 text-gray-600 font-medium">{item.due_date || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : activeTab !== 'Gantt' ? (
        <div className="flex items-center justify-center h-40 text-gray-400 2xl:text-sm text-xs">
          Switch to <strong className="mx-1 text-indigo-600">Gantt</strong> or <strong className="mx-1 text-indigo-600">Issue List</strong> tab.
        </div>
      ) : (
        /* Gantt View */
        <div className="flex flex-col h-[calc(100vh-60px-40px)] overflow-hidden select-none">

          {/* Mobile indicator strip (Story 9) */}
          {isMobileView && (
            <div className="bg-indigo-50 border-b border-indigo-200 px-4 py-1.5 text-xs text-indigo-800 flex items-center justify-between">
              <div className="flex items-center gap-1.5 font-medium">
                <span className="icon-smartphone text-indigo-600 text-xs" />
                <span>Mobile View · Key, Title, Assignee, Dates · Swipe sideways to navigate weeks</span>
              </div>
              <button
                onClick={() => setIsMobileView(false)}
                className="text-[11px] font-semibold text-indigo-600 underline"
              >
                Full view
              </button>
            </div>
          )}

          {/* ── Gantt Timeline Sub-bar (compact, authentic to CollabCRM) ── */}
          <div className="flex items-center justify-between bg-gray-50/80 border-b border-gray-200 2xl:px-6 px-4 py-1.5 w-full">
            {/* Left: CollabCRM Resource Planner Date Navigator + View Mode Segmented Toggle + Active Filter Chips */}
            <div className="flex items-center gap-2.5">
              {/* Date Pagination Box (CollabCRM Resource Planner pattern) */}
              <div className="flex items-center bg-white p-0.5 border border-gray-200 rounded-lg shadow-2xs">
                <button
                  title="Previous year"
                  onClick={handlePrevYear}
                  className="flex items-center justify-center w-6 h-6 rounded text-gray-500 hover:text-indigo-600 hover:bg-gray-100 transition-colors"
                >
                  <span className="text-[11px] font-bold leading-none">«</span>
                </button>
                <button
                  title="Previous period"
                  onClick={handlePrevPeriod}
                  className="flex items-center justify-center w-6 h-6 rounded text-gray-500 hover:text-indigo-600 hover:bg-gray-100 transition-colors"
                >
                  <span className="text-xs font-bold leading-none">‹</span>
                </button>
                <div className="relative inline-block">
                  <button
                    onClick={() => setDatePickerOpen(prev => !prev)}
                    className="flex items-center gap-1 px-2 py-1 justify-center rounded hover:bg-gray-50 transition-colors cursor-pointer group"
                  >
                    <span className="text-xs font-bold text-gray-800 tracking-tight group-hover:text-indigo-600 whitespace-nowrap">
                      {rangeLabel}
                    </span>
                    <span className="icon-chevron-down text-[10px] text-gray-400 group-hover:text-indigo-500" />
                  </button>

                  {/* Dropdown Jump Picker */}
                  {datePickerOpen && (
                    <div className="absolute left-0 mt-1 w-56 bg-white rounded-lg shadow-xl border border-gray-200 p-2.5 z-50">
                      <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-gray-100 text-xs font-bold text-gray-800">
                        <button onClick={handlePrevYear} className="px-1 hover:text-indigo-600">‹</button>
                        <span>{anchorDate.getFullYear()}</span>
                        <button onClick={handleNextYear} className="px-1 hover:text-indigo-600">›</button>
                      </div>
                      {viewMode === 'Quarter' ? (
                        <div className="grid grid-cols-2 gap-1 text-xs">
                          {['Q1: Jan - Mar', 'Q2: Apr - Jun', 'Q3: Jul - Sep', 'Q4: Oct - Dec'].map((q, idx) => (
                            <button
                              key={q}
                              onClick={() => {
                                setAnchorDate(new Date(anchorDate.getFullYear(), idx * 3, 1))
                                setDatePickerOpen(false)
                              }}
                              className={`py-1.5 px-1.5 rounded text-[11px] font-semibold border ${
                                Math.floor(anchorDate.getMonth() / 3) === idx
                                  ? 'bg-indigo-600 text-white border-indigo-600'
                                  : 'bg-gray-50 text-gray-700 hover:bg-indigo-50 border-gray-200'
                              }`}
                            >
                              {q}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div className="grid grid-cols-3 gap-1 text-xs">
                          {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map((m, idx) => (
                            <button
                              key={m}
                              onClick={() => {
                                setAnchorDate(new Date(anchorDate.getFullYear(), idx, 1))
                                setDatePickerOpen(false)
                              }}
                              className={`py-1 rounded text-[11px] font-semibold ${
                                anchorDate.getMonth() === idx
                                  ? 'bg-indigo-600 text-white'
                                  : 'text-gray-700 hover:bg-gray-100'
                              }`}
                            >
                              {m}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <button
                  title="Next period"
                  onClick={handleNextPeriod}
                  className="flex items-center justify-center w-6 h-6 rounded text-gray-500 hover:text-indigo-600 hover:bg-gray-100 transition-colors"
                >
                  <span className="text-xs font-bold leading-none">›</span>
                </button>
                <button
                  title="Next year"
                  onClick={handleNextYear}
                  className="flex items-center justify-center w-6 h-6 rounded text-gray-500 hover:text-indigo-600 hover:bg-gray-100 transition-colors"
                >
                  <span className="text-[11px] font-bold leading-none">»</span>
                </button>
                <div className="w-px h-4 bg-gray-200 mx-1" />
                <button
                  onClick={handleToday}
                  className="inline-flex items-center justify-center px-2 py-0.5 rounded text-[11px] font-semibold bg-gray-50 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
                >
                  Today
                </button>
              </div>

              {/* Segmented View Mode (directly from resource_planner.html) */}
              <div className="relative flex items-center p-0.5 bg-gray-200/70 rounded-lg border border-gray-200 overflow-hidden" role="group">
                {['Week','Month','Quarter'].map(m => (
                  <button
                    key={m}
                    title={m + ' view'}
                    onClick={() => setViewMode(m)}
                    className={`py-1 px-3 text-xs font-semibold rounded-md transition-all duration-200 ${
                      viewMode === m
                        ? 'bg-white text-indigo-700 shadow-xs'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>

              {/* Active filter chip if a developer is selected */}
              {selectedDeveloper && (
                <div className="flex items-center gap-1.5 pl-2 border-l border-gray-300">
                  <span className="text-[11px] text-gray-500">Filtered:</span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-200">
                    <span>{selectedDeveloper}</span>
                    <button
                      onClick={() => setSelectedDeveloper(null)}
                      className="hover:text-indigo-900 font-bold ml-0.5"
                      title="Clear developer filter"
                    >
                      ✕
                    </button>
                  </span>
                  <button
                    onClick={() => setSelectedDeveloper(null)}
                    className="text-[11px] text-indigo-600 hover:underline font-medium ml-1"
                  >
                    Clear all
                  </button>
                </div>
              )}
            </div>

            {/* Right: Project KPI (Hourly / Fixed Cost only) + Baseline + Unscheduled */}
            <div className="flex items-center gap-3">
              {projectModel === 'Hourly' && (
                <div className="flex items-center gap-2 text-[11px] text-gray-600 bg-white px-2.5 py-1 rounded-lg border border-gray-200 shadow-2xs">
                  <span>Purchased: <strong className="text-gray-800 font-semibold">500h</strong></span>
                  <span className="text-gray-300">·</span>
                  <span>Billed: <strong className="text-gray-800 font-semibold">250h</strong></span>
                  <span className="text-gray-300">·</span>
                  <span>Spent: <strong className="text-indigo-700 font-semibold">220:00</strong></span>
                  <span className="text-gray-300">·</span>
                  <span>Balance: <strong className="text-green-600 font-semibold">280:00</strong></span>
                  <span className="inline-flex items-center px-1.5 py-0.2 rounded bg-amber-50 border border-amber-200 text-amber-800 text-[10px] font-medium ml-1">
                    Expiry: 26-Nov
                  </span>
                </div>
              )}
              {projectModel === 'Fixed Cost' && (
                <div className="flex items-center gap-2 text-[11px] text-gray-600 bg-white px-2.5 py-1 rounded-lg border border-gray-200 shadow-2xs">
                  <span>Estimated: <strong className="text-gray-800 font-semibold">500h</strong></span>
                  <span className="text-gray-300">·</span>
                  <span>Spent: <strong className="text-gray-800 font-semibold">210:00</strong></span>
                </div>
              )}

              {/* Baseline toggle */}
              <button
                onClick={() => setBaselineModalOpen(true)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all flex items-center gap-1.5 shadow-2xs ${
                  showBaseline
                    ? 'bg-indigo-600 border-indigo-700 text-white shadow-xs'
                    : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span>Baseline</span>
                {showBaseline && <span className="bg-white/20 text-white rounded px-1 text-[10px]">ON</span>}
              </button>

              {/* Unscheduled Drawer Button */}
              <button
                onClick={() => setUnscheduledOpen(true)}
                className="px-2.5 py-1 rounded-lg text-xs font-semibold border border-indigo-200 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 shadow-2xs flex items-center gap-1.5 transition-all"
              >
                <span>Unscheduled</span>
                <span className="bg-indigo-600 text-white rounded-full px-1.5 py-0.2 text-[10px] font-bold">
                  {unscheduledCount}
                </span>
              </button>
            </div>
          </div>

          {/* ── Gantt Body: Left Grid + Calendar ─────────────────────────── */}
          <div className="flex flex-1 overflow-hidden relative" ref={calAreaRef}>

            {/* Left Grid */}
            <div className="flex-shrink-0 border-r border-gray-200 overflow-y-auto overflow-x-hidden bg-white" style={{ width: dynamicGridW }}>
              {/* Day Header row alignment */}
              <div className="flex items-center bg-gray-50 border-b border-gray-200 sticky top-0 z-20 h-[40px]">
                {dynamicCols.map(col => (
                  <div
                    key={col.key}
                    className="2xl:text-xs 2xl-to-xl:text-[11px] text-[11px] text-gray-500 font-semibold px-2 shrink-0 truncate flex items-center"
                    style={{ width: col.w }}
                  >
                    {col.label}
                  </div>
                ))}
              </div>

              {/* Pinned Sprints Row in Grid (Story 3) */}
              <div
                className="flex items-center px-3 border-b border-gray-200 bg-gray-50/70 font-semibold text-xs text-gray-700 sticky top-[40px] z-10"
                style={{ height: ROW_H }}
              >
                <span className="icon-calendar-check-02 text-gray-400 mr-2 text-sm" />
                Sprints ({GANTT_SPRINTS.length})
              </div>

              {/* Issue & Developer Rows (Story 2 & Story 7) */}
              {rows.map(issue => {
                if (issue.isGroupHeader) {
                  return (
                    <div
                      key={issue.id}
                      className="flex items-center px-3 border-b border-gray-200 bg-gray-50/90 font-semibold text-xs text-gray-800"
                      style={{ height: ROW_H }}
                    >
                      <div className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 font-bold text-[10px] flex items-center justify-center mr-2 shrink-0">
                        {issue.groupTitle.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="truncate font-bold text-gray-900">{issue.groupTitle}</span>
                      <span className="text-[10px] text-gray-500 ml-1.5 font-normal">({issue.role})</span>
                      {projectModel === 'Hire Base' && (
                        <span className="text-[10px] text-indigo-700 font-medium ml-2 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-200 whitespace-nowrap">
                          Contract: {issue.contract_start} to {issue.contract_end} ({issue.remaining_days}d left)
                        </span>
                      )}
                      {issue.hasClash && (
                        <span className="ml-auto px-1.5 py-0.2 bg-red-100 text-red-700 text-[9px] font-bold rounded">
                          ⚠️ Clashing
                        </span>
                      )}
                    </div>
                  )
                }

                return (
                  <div
                    key={issue.id}
                    className="flex items-center border-b border-gray-100 hover:bg-indigo-50/40 cursor-pointer"
                    style={{ height: ROW_H }}
                    onClick={() => {
                      setUnscheduledOpen(false)
                      setCreateModalOpen(false)
                      setCompanyGanttOpen(false)
                      setResourcePlannerOpen(false)
                      setPanel(issue)
                    }}
                  >
                    {dynamicCols.map(col => {
                      if (col.key === 'type') {
                        return (
                          <div key="type" className="shrink-0 flex items-center px-2" style={{ width: col.w, paddingLeft: issue.depth ? 16 : 8 }}>
                            {issue.issue_type === 'Epic' && (
                              <button
                                className="icon-chevron-right text-gray-400 text-xs mr-1 hover:text-indigo-600 transition-transform"
                                style={{ transform: collapsed[issue.id] ? 'rotate(0deg)' : 'rotate(90deg)' }}
                                onClick={e => { e.stopPropagation(); setCollapsed(c => ({ ...c, [issue.id]: !c[issue.id] })) }}
                              />
                            )}
                            {issue.depth > 0 && <span className="icon-corner-down-right text-gray-300 text-xs mr-1" />}
                            <TypeIcon type={issue.issue_type} />
                          </div>
                        )
                      }
                      if (col.key === 'board') {
                        return (
                          <div key="board" className="px-1 shrink-0 truncate flex items-center" style={{ width: col.w }}>
                            <span className={`text-[9px] font-semibold px-1 py-0.2 rounded border ${
                              issue.board === 'Test' ? 'bg-purple-50 text-purple-700 border-purple-200' : 'bg-indigo-50 text-indigo-700 border-indigo-200'
                            }`}>
                              {issue.board || 'Default'}
                            </span>
                          </div>
                        )
                      }
                      if (col.key === 'key') {
                        return (
                          <div key="key" className="2xl:text-xs 2xl-to-xl:text-[11px] text-[11px] font-medium text-indigo-700 hover:underline shrink-0 truncate px-1" style={{ width: col.w }}>
                            {issue.key}
                          </div>
                        )
                      }
                      if (col.key === 'title') {
                        return (
                          <div key="title" className="2xl:text-xs 2xl-to-xl:text-[11px] text-[11px] text-gray-700 shrink-0 truncate px-1 font-medium" style={{ width: col.w }}>
                            {issue.title}
                          </div>
                        )
                      }
                      if (col.key === 'assignee') {
                        return (
                          <div key="assignee" className="2xl:text-xs 2xl-to-xl:text-[11px] text-[11px] text-gray-500 shrink-0 truncate px-1" style={{ width: col.w }}>
                            {issue.assignee_name}
                          </div>
                        )
                      }
                      if (col.key === 'start_date' || col.key === 'start') {
                        return (
                          <div key="start_date" className="2xl:text-xs 2xl-to-xl:text-[11px] text-[11px] text-gray-500 shrink-0 truncate px-1" style={{ width: col.w }}>
                            {issue.start_date || '—'}
                          </div>
                        )
                      }
                      if (col.key === 'due_date' || col.key === 'due') {
                        return (
                          <div key="due_date" className={`2xl:text-xs 2xl-to-xl:text-[11px] text-[11px] shrink-0 truncate px-1 ${isPastDue(issue) ? 'text-red-600 font-semibold' : 'text-gray-500'}`} style={{ width: col.w }}>
                            {issue.due_date || '—'}
                          </div>
                        )
                      }
                      return null
                    })}
                  </div>
                )
              })}
            </div>

            {/* Calendar Canvas */}
            <div className="flex-1 overflow-x-auto overflow-y-auto relative bg-white" ref={calScrollRef}>
              <div style={{ width: Math.max(calendarWidth, 800), minHeight: '100%', position: 'relative' }}>

                {/* Calendar Timeline Header (2-tier: Months + Days/Weeks) */}
                <div className="bg-gray-50 border-b border-gray-200 sticky top-0 z-20 h-[40px] flex flex-col">
                  {/* Top Tier: Month Groups */}
                  <div className="flex border-b border-gray-200 h-[20px]">
                    {monthGroups.map((mg, idx) => (
                      <div
                        key={idx}
                        className="shrink-0 flex items-center justify-center border-r border-gray-200 text-[11px] font-semibold text-gray-700 bg-gray-100/70"
                        style={{ width: mg.count * cellW, height: 20 }}
                      >
                        {mg.key}
                      </div>
                    ))}
                  </div>

                  {/* Bottom Tier: Days or Weeks */}
                  <div className="flex h-[20px]">
                    {viewMode === 'Quarter' ? (
                      weekGroups.map((wg, idx) => (
                        <div
                          key={idx}
                          className="shrink-0 flex items-center justify-center border-r border-gray-200 text-[10px] font-medium text-gray-500 bg-gray-50"
                          style={{ width: wg.count * cellW, height: 20 }}
                        >
                          {wg.label}
                        </div>
                      ))
                    ) : (
                      days.map((d, i) => (
                        <div
                          key={i}
                          className={`shrink-0 flex items-center justify-center border-r border-gray-100 text-[10px] font-medium ${
                            isWeekend(d) ? 'text-gray-400 bg-gray-50' : 'text-gray-600'
                          } ${d.toDateString() === TODAY.toDateString() ? 'text-indigo-600 font-bold bg-indigo-50/50' : ''}`}
                          style={{ width: cellW, height: 20 }}
                        >
                          {viewMode === 'Week' ? `${d.getDate()} ${['Su','Mo','Tu','We','Th','Fr','Sa'][d.getDay()]}` : d.getDate()}
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Pinned Sprints Row on Canvas (Story 3) */}
                <div
                  className="relative flex border-b border-gray-200 bg-gray-50/40 sticky top-[40px] z-10"
                  style={{ height: ROW_H }}
                >
                  {days.map((d, i) => (
                    <div
                      key={i}
                      className={`shrink-0 border-r border-gray-100 ${isWeekend(d) ? 'bg-gray-50/50' : ''}`}
                      style={{ width: cellW, height: ROW_H }}
                    />
                  ))}
                  {GANTT_SPRINTS.map(s => {
                    const sStart = parseDate(s.start)
                    const sEnd   = parseDate(s.end)
                    if (!sStart || !sEnd) return null
                    const left  = dayDiff(viewStart, sStart) * cellW
                    const width = (dayDiff(sStart, sEnd) + 1) * cellW
                    return (
                      <div
                        key={s.id}
                        className="absolute top-[8px] h-[24px] rounded-lg border border-indigo-300 bg-indigo-50/80 px-2 flex items-center justify-between text-indigo-700 text-[10px] font-semibold shadow-2xs"
                        style={{ left, width }}
                      >
                        <span className="truncate">{s.name}</span>
                        <span className="text-[9px] text-indigo-500 font-normal">{s.start} – {s.end}</span>
                      </div>
                    )
                  })}
                </div>

                {/* SVG Dependency Lines Layer (Story 5) */}
                <svg
                  className="absolute inset-0 pointer-events-none z-10"
                  style={{ width: Math.max(calendarWidth, 800), height: (rows.length + 2) * ROW_H + 40 }}
                >
                  <defs>
                    <marker id="arrow-norm" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                      <path d="M0,0 L6,3 L0,6 Z" fill="#6366f1" />
                    </marker>
                    <marker id="arrow-conf" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                      <path d="M0,0 L6,3 L0,6 Z" fill="#ef4444" />
                    </marker>
                  </defs>

                  {dependencyLines.map(l => {
                    const midX = l.x1 + 12
                    const path = `M ${l.x1} ${l.y1} L ${midX} ${l.y1} L ${midX} ${l.y2} L ${l.x2} ${l.y2}`
                    const strokeColor = l.conflict ? '#ef4444' : '#6366f1'
                    const marker = l.conflict ? 'url(#arrow-conf)' : 'url(#arrow-norm)'

                    return (
                      <path
                        key={l.id}
                        d={path}
                        fill="none"
                        stroke={strokeColor}
                        strokeWidth="1.5"
                        strokeDasharray={l.conflict ? '4 2' : 'none'}
                        markerEnd={marker}
                      />
                    )
                  })}
                </svg>

                {/* Issue & Developer Rows on Canvas (Story 2 & Story 7) */}
                {rows.map((issue) => {
                  if (issue.isGroupHeader) {
                    const cStart = parseDate(issue.contract_start)
                    const cEnd   = parseDate(issue.contract_end)
                    const bLeft  = cStart ? dayDiff(viewStart, cStart) * cellW : 0
                    const bWidth = (cStart && cEnd) ? (dayDiff(cStart, cEnd) + 1) * cellW : 0

                    return (
                      <div key={issue.id} className="relative flex bg-gray-50/50" style={{ height: ROW_H }}>
                        {days.map((d, i) => (
                          <div
                            key={i}
                            className="shrink-0 border-r border-b border-gray-200/60"
                            style={{ width: cellW, height: ROW_H }}
                          />
                        ))}

                        {/* Contract Duration Band (Story 7) */}
                        {bWidth > 0 && (
                          <div
                            className="absolute top-[6px] h-[26px] bg-indigo-50 border border-indigo-200 rounded flex items-center px-2.5 z-5 shadow-2xs"
                            style={{ left: bLeft, width: bWidth }}
                          >
                            <span className="text-indigo-800 text-[10px] font-semibold truncate flex items-center gap-1.5">
                              <span className="icon-calendar text-indigo-600 text-xs" />
                              Contract: {issue.contract_start} – {issue.contract_end} ({issue.remaining_days} days left)
                            </span>
                          </div>
                        )}

                        {/* Double-booking warning band if clashing (Story 7) */}
                        {issue.hasClash && (() => {
                          const oStart = parseDate('05-Nov-2026')
                          const oEnd   = parseDate('12-Nov-2026')
                          if (!oStart || !oEnd) return null
                          const oLeft  = dayDiff(viewStart, oStart) * cellW
                          const oWidth = (dayDiff(oStart, oEnd) + 1) * cellW
                          return (
                            <div
                              className="absolute top-[4px] h-[30px] bg-red-100/95 border-2 border-dashed border-red-500 rounded z-20 flex items-center justify-between px-2 shadow-xs"
                              style={{ left: oLeft, width: oWidth }}
                              title="Double-booking conflict: Developer allocated on Apex E-Commerce for these dates"
                            >
                              <span className="text-red-800 text-[10px] font-bold truncate flex items-center gap-1">
                                <span className="icon-alert-triangle text-red-600 text-xs" />
                                ⚠️ Double-booked (Apex E-Commerce)
                              </span>
                              <button
                                onClick={() => setResourcePlannerOpen(true)}
                                className="ml-2 px-1.5 py-0.5 bg-red-600 hover:bg-red-700 text-white rounded text-[9px] font-bold whitespace-nowrap shadow-xs"
                              >
                                Resolve
                              </button>
                            </div>
                          )
                        })()}
                      </div>
                    )
                  }

                  const start = parseDate(issue.start_date)
                  const due   = parseDate(issue.due_date)
                  const hasDates = !!(start && due)
                  const sprint = issue.sprint_id ? GANTT_SPRINTS.find(s => s.id === issue.sprint_id) : null
                  const sprintStart = sprint ? parseDate(sprint.start) : null
                  const sprintEnd   = sprint ? parseDate(sprint.end) : null
                  const baseEntry = baselineData[issue.id]

                  return (
                    <div key={issue.id} className="relative flex" style={{ height: ROW_H }}>
                      {days.map((d, i) => (
                        <div
                          key={i}
                          className={`shrink-0 border-r border-b border-gray-100 ${isWeekend(d) ? 'bg-gray-50/50' : 'hover:bg-indigo-50/40'}`}
                          style={{ width: cellW, height: ROW_H }}
                        />
                      ))}

                      {/* Baseline Plan Faint Bar (Story 5) */}
                      {showBaseline && baseEntry && (() => {
                        const bStart = parseDate(baseEntry.start)
                        const bDue   = parseDate(baseEntry.due)
                        if (!bStart || !bDue) return null
                        const bLeft  = dayDiff(viewStart, bStart) * cellW
                        const bWidth = Math.max((dayDiff(bStart, bDue) + 1) * cellW, cellW)
                        return (
                          <div
                            className="absolute top-[28px] h-[7px] rounded-sm bg-gray-400/50 border border-gray-500/40 pointer-events-none"
                            style={{ left: bLeft, width: bWidth }}
                            title={`Baseline: ${baseEntry.start} – ${baseEntry.due}`}
                          />
                        )
                      })()}

                      {/* Scheduled Bar */}
                      {hasDates && (() => {
                        const left = dayDiff(viewStart, start) * cellW
                        const width = Math.max((dayDiff(start, due) + 1) * cellW, cellW)
                        const color = STATUS_COLORS[issue.status] || '#696969'
                        const pastDue = isPastDue(issue)

                        return (
                          <div
                            className="absolute top-[7px] h-[24px] rounded group shadow-sm flex items-center cursor-move transition-shadow"
                            style={{
                              left,
                              width,
                              backgroundColor: color,
                              border: pastDue ? '2px solid #E23333' : '1px solid rgba(0,0,0,0.1)',
                              outline: pastDue ? '1px dashed #E23333' : 'none',
                            }}
                            onMouseDown={e => handleMouseDown(e, issue, 'move')}
                            onMouseEnter={e => {
                              const rect = calAreaRef.current?.getBoundingClientRect()
                              if (rect) setHovered({ issue, x: e.clientX - rect.left, y: e.clientY - rect.top, baseline: baseEntry })
                            }}
                            onMouseLeave={() => setHovered(null)}
                            onClick={() => setPanel(issue)}
                          >
                            <div
                              className="absolute left-0 top-0 bottom-0 w-2 cursor-ew-resize opacity-0 group-hover:opacity-100 bg-black/20 hover:bg-black/40 rounded-l"
                              title="Drag to change Start Date"
                              onMouseDown={e => handleMouseDown(e, issue, 'resize-left')}
                            />

                            <span className="text-white text-[10px] font-semibold truncate px-2 select-none pointer-events-none flex items-center gap-1">
                              {issue.key}
                            </span>

                            <div
                              className="absolute right-0 top-0 bottom-0 w-2 cursor-ew-resize opacity-0 group-hover:opacity-100 bg-black/20 hover:bg-black/40 rounded-r"
                              title="Drag to change Due Date"
                              onMouseDown={e => handleMouseDown(e, issue, 'resize-right')}
                            />
                          </div>
                        )
                      })()}

                      {/* Sprint-only bar */}
                      {!hasDates && sprint && sprintStart && sprintEnd && (() => {
                        const left = dayDiff(viewStart, sprintStart) * cellW
                        const width = Math.max((dayDiff(sprintStart, sprintEnd) + 1) * cellW, cellW)
                        return (
                          <div
                            className="absolute top-[7px] h-[24px] rounded border border-dashed border-indigo-300 bg-indigo-50/70 flex items-center px-2 cursor-pointer shadow-none"
                            style={{ left, width }}
                            title={`${sprint.name} span (no dates set)`}
                            onClick={() => setPanel(issue)}
                          >
                            <span className="text-indigo-600 text-[10px] font-medium truncate select-none">
                              {issue.key} ({sprint.name})
                            </span>
                          </div>
                        )
                      })()}

                      {/* Past-due dashed extension to today line */}
                      {hasDates && isPastDue(issue) && (() => {
                        const dueLeft = dayDiff(viewStart, due) * cellW + cellW
                        if (todayOffset <= dueLeft) return null
                        return (
                          <div
                            className="absolute top-[19px] border-t-2 border-dashed border-red-500 pointer-events-none"
                            style={{ left: dueLeft, width: todayOffset - dueLeft }}
                          />
                        )
                      })()}
                    </div>
                  )
                })}

                {/* Expiry Date Marker Line (Story 3 - Hourly Project) */}
                {projectModel === 'Hourly' && (() => {
                  const expDate = parseDate(GANTT_PROJECT.expiry_date)
                  if (!expDate) return null
                  const expLeft = dayDiff(viewStart, expDate) * cellW
                  return (
                    <div
                      className="absolute top-[80px] bottom-0 border-l-2 border-dashed border-amber-400/50 z-15 pointer-events-none"
                      style={{ left: expLeft }}
                    />
                  )
                })()}

                {/* Contract Dates Band (Story 3 - Hire Base Project) */}
                {projectModel === 'Hire Base' && (() => {
                  const cStart = parseDate('01-Nov-2026')
                  const cEnd   = parseDate('28-Nov-2026')
                  if (!cStart || !cEnd) return null
                  const bLeft  = dayDiff(viewStart, cStart) * cellW
                  const bWidth = (dayDiff(cStart, cEnd) + 1) * cellW
                  return (
                    <div
                      className="absolute top-[80px] bottom-0 bg-blue-500/5 border-x-2 border-blue-400/20 pointer-events-none z-5"
                      style={{ left: bLeft, width: bWidth }}
                    />
                  )
                })()}

                {/* Today Line */}
                {todayOffset >= 0 && todayOffset <= calendarWidth && (
                  <div
                    className="absolute top-0 bottom-0 w-[2px] bg-indigo-500 z-20 pointer-events-none"
                    style={{ left: todayOffset }}
                  >
                    <div className="w-3 h-3 rounded-full bg-indigo-500 -ml-[5px] -mt-1 shadow-sm" />
                  </div>
                )}

              </div>
            </div>

            {/* Hover card */}
            {hovered && <HoverCard issue={hovered.issue} x={hovered.x} y={hovered.y} baseline={hovered.baseline} />}

            {/* Issue Detail Modal (CollabCRM Central Pop-up) */}
            {panel && (
              <IssueDetailModal
                issue={issues.find(i => i.id === panel.id) || panel}
                onClose={() => setPanel(null)}
                onUpdateIssue={handlePanelUpdateIssue}
              />
            )}
          </div>
        </div>
      )}

      {/* Unscheduled Issues Drawer (Story 4) */}
      <UnscheduledDrawer
        open={unscheduledOpen}
        onClose={() => setUnscheduledOpen(false)}
        issues={issues}
        onSchedule={handleScheduleFromUnscheduled}
        onOpenDetail={(item) => {
          setUnscheduledOpen(false)
          setPanel(item)
        }}
      />

      {/* Create Issue Modal (Story 1 & Real CollabCRM popup modal) */}
      <CreateIssueModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onCreate={handleCreateIssue}
      />

      {/* Baseline Modal (Story 5) */}
      <BaselineModal
        open={baselineModalOpen}
        onClose={() => setBaselineModalOpen(false)}
        onSave={handleSaveBaseline}
        showBaseline={showBaseline}
        onToggleShow={setShowBaseline}
      />



      {/* Resource Planner Drawer (Story 7) */}
      <ResourcePlannerDrawer
        open={resourcePlannerOpen}
        onClose={() => setResourcePlannerOpen(false)}
        doubleBookingActive={doubleBookingActive}
        onResolveClash={() => {
          setDoubleBookingActive(false)
          setResourcePlannerOpen(false)
        }}
      />

      {/* Company Projects Dashboard Gantt (Story 8) */}
      <CompanyDashboardModal
        open={companyGanttOpen}
        onClose={() => setCompanyGanttOpen(false)}
        onSelectProject={(p) => {
          if (p === 'Mobile App Dedicated Team') {
            setProjectModel('Hire Base')
            setGroupBy('Assignee')
          }
        }}
      />

      {/* Undo Toast */}
      <UndoToast
        visible={undoToast}
        onUndo={handleUndo}
        onDismiss={() => setUndoToast(false)}
      />
    </AppShell>
  )
}
