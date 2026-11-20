// COPIED: board page shell + tab strip from
//   modules/project-mgmt/dom/yop_gantt_2026-11-19_09_board.html
// COPIED: Week/Month/Quarter button group from
//   modules/project-mgmt/dom/yop_gantt_2026-11-19_16_daily_allocation.html
// COPIED: sidebar nav (Dashboard, Projects, Tasks active, Resource Planner, Daily Allocation, Reports)
//   from yop_gantt_2026-11-19_09_board.html
// NEW: Gantt tab (not in CollabCRM yet — first in prototype)
// NEW: Gantt toolbar (Sprint, Group by, Type | Week/Month/Quarter/Today | Critical path, Baseline, Unscheduled | Share)
// NEW: Gantt grid + calendar bars, today line, hover card, Undo toast
// NEW: Issue panel overlay (structure modelled on yop_gantt_2026-11-19_14_issue_detail.html)

import { useState, useRef, useEffect } from 'react'
import AppShell from '../components/AppShell.jsx'
import { ISSUES, STATUS_COLORS, TODAY, GANTT_PROJECT, GANTT_SPRINTS } from '../data/gantt.js'

// ─── helpers ──────────────────────────────────────────────────────────────────

function fmtDate(d) {
  if (!d) return '—'
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  return `${String(d.getDate()).padStart(2,'0')}-${months[d.getMonth()]}-${d.getFullYear()}`
}

function parseDate(str) {
  if (!str) return null
  const [d, m, y] = str.split('-')
  const months = { Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11 }
  return new Date(+y, months[m], +d)
}

function dayDiff(a, b) {
  return Math.round((b - a) / 86400000)
}

function isPastDue(issue) {
  const due = parseDate(issue.due_date)
  return due && due < TODAY && issue.status !== 'Closed'
}

function isWeekend(date) {
  const d = date.getDay()
  return d === 0 || d === 6
}

// ─── Gantt calendar config ─────────────────────────────────────────────────────

const CELL_W = 36   // px per day (week view)
const ROW_H  = 40   // px per row
const GRID_LEFT_W = 400  // px for the left grid

function getViewDays(mode) {
  // anchor: 10-Nov-2026 (Mon) — shows Sprint 7 + 8 nicely
  const anchor = new Date(2026, 10, 9) // Mon 09-Nov
  if (mode === 'Week')    return { start: anchor, count: 14 }
  if (mode === 'Month')   return { start: new Date(2026, 10, 1), count: 30 }
  if (mode === 'Quarter') return { start: new Date(2026, 9, 1),  count: 91 }
  return { start: anchor, count: 14 }
}

// ─── Hover card ──────────────────────────────────────────────────────────────
// DIVERGES: NEW — modelled on CollabCRM tooltip (react-tooltip, card-style)

function HoverCard({ issue, x, y }) {
  if (!issue) return null
  return (
    <div
      className="absolute z-50 bg-white border border-gray-200 rounded-lg shadow-custom-popup-shadow p-3 w-[220px] pointer-events-none"
      style={{ left: x + 12, top: y - 10 }}
    >
      <p className="2xl:text-sm 2xl-to-xl:text-xs text-xs font-semibold text-gray-800 mb-2 truncate">{issue.title}</p>
      <div className="space-y-1">
        <Row label="Status"    value={<StatusPill status={issue.status} />} />
        <Row label="Start"     value={issue.start_date} />
        <Row label="Due"       value={issue.due_date} />
        <Row label="Logged"    value={`${issue.logged_hours}h / ${issue.estimated_hours}h est.`} />
      </div>
    </div>
  )
}
function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="2xl:text-xs 2xl-to-xl:text-[11px] text-[11px] text-gray-500">{label}</span>
      <span className="2xl:text-xs 2xl-to-xl:text-[11px] text-[11px] text-gray-700 font-medium">{value}</span>
    </div>
  )
}

// ─── Status pill ─────────────────────────────────────────────────────────────
// DIVERGES: NEW — colour from STATUS_COLORS, structure modelled on CollabCRM status badges

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

// ─── Undo toast ──────────────────────────────────────────────────────────────
// DIVERGES: NEW — "Dates updated" + Undo link, 10 s, modelled on CollabCRM toast (react-hot-toast pattern)

function UndoToast({ visible, onUndo, onDismiss }) {
  useEffect(() => {
    if (!visible) return
    const t = setTimeout(onDismiss, 10000)
    return () => clearTimeout(t)
  }, [visible, onDismiss])

  if (!visible) return null
  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[9999] flex items-center gap-3 bg-gray-800 text-white 2xl:text-sm 2xl-to-xl:text-xs text-xs font-medium px-4 py-2.5 rounded-lg shadow-custom-popup-shadow">
      <span className="icon-check-circle text-success-400 2xl:text-base 2xl-to-xl:text-sm text-sm" />
      Dates updated
      <button
        onClick={onUndo}
        className="text-indigo-300 hover:text-indigo-200 underline font-semibold ml-1"
      >
        Undo
      </button>
    </div>
  )
}

// ─── Issue detail panel ───────────────────────────────────────────────────────
// COPIED: panel shell structure from yop_gantt_2026-11-19_14_issue_detail.html

function IssuePanel({ issue, onClose }) {
  if (!issue) return null
  return (
    <div className="absolute inset-y-0 right-0 w-[480px] bg-white border-l border-gray-200 shadow-xl z-40 flex flex-col overflow-hidden">
      {/* header */}
      <div className="flex items-center justify-between 2xl:px-5 px-4 2xl:py-3 py-2.5 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <span className="icon-checkbox-base 2xl:text-base 2xl-to-xl:text-xs text-xs text-gray-500" title={issue.issue_type} />
          <span className="2xl:text-sm 2xl-to-xl:text-xs text-xs font-semibold text-indigo-700">{issue.key}</span>
        </div>
        <button onClick={onClose} className="icon-x-close text-gray-500 hover:text-gray-700 2xl:text-xl 2xl-to-xl:text-base text-base p-1 rounded-md hover:bg-gray-100" />
      </div>
      {/* title */}
      <div className="2xl:px-5 px-4 2xl:py-4 py-3 border-b border-gray-200">
        <h2 className="2xl:text-base 2xl-to-xl:text-sm text-sm font-semibold text-gray-800">{issue.title}</h2>
      </div>
      {/* meta fields — copied field layout from _14_issue_detail */}
      <div className="flex-1 overflow-y-auto 2xl:px-5 px-4 2xl:py-4 py-3 space-y-3">
        <MetaRow label="Status"     value={<StatusPill status={issue.status} />} />
        <MetaRow label="Assignee"   value={issue.assignee_name} />
        <MetaRow label="Start Date" value={issue.start_date || '—'} />
        <MetaRow label="Due Date"   value={issue.due_date   || '—'} />
        <MetaRow label="Sprint"     value="Sprint 8" />
        <MetaRow label="Type"       value={issue.issue_type} />
        <MetaRow label="Logged"     value={`${issue.logged_hours}h`} />
        <MetaRow label="Estimated"  value={`${issue.estimated_hours}h`} />
      </div>
    </div>
  )
}
function MetaRow({ label, value }) {
  return (
    <div className="flex items-start gap-4">
      <span className="2xl:text-xs 2xl-to-xl:text-xs text-xs text-gray-500 w-[110px] shrink-0 pt-0.5">{label}</span>
      <span className="2xl:text-xs 2xl-to-xl:text-xs text-xs text-gray-700 font-medium">{value}</span>
    </div>
  )
}

// ─── Left grid header + rows ──────────────────────────────────────────────────

const COLS = [
  { key: 'type',       label: 'Type',       w: 44 },
  { key: 'key',        label: 'Key',        w: 70 },
  { key: 'title',      label: 'Title',      w: 160 },
  { key: 'assignee',   label: 'Assignee',   w: 90 },
  { key: 'start_date', label: 'Start Date', w: 90 },
  { key: 'due_date',   label: 'Due Date',   w: 90 },
]

function TypeIcon({ type }) {
  const map = {
    Epic:     { icon: 'icon-layers-two-01',   cls: 'text-purple-600' },
    Task:     { icon: 'icon-checkbox-base',   cls: 'text-blue-500'   },
    'Sub-Task':{ icon: 'icon-corner-down-right', cls: 'text-gray-500' },
    Bug:      { icon: 'icon-bug-ant-02',      cls: 'text-error-600'  },
  }
  const { icon = 'icon-checkbox-base', cls = 'text-gray-500' } = map[type] || {}
  return <span className={`${icon} ${cls} text-base`} title={type} />
}

// ─── Calendar bar ──────────────────────────────────────────────────────────────

function Bar({ issue, viewStart, cellW, onHover, onLeave, onClick }) {
  const start = parseDate(issue.start_date)
  const end   = parseDate(issue.due_date)
  if (!start || !end) return null

  const left  = dayDiff(viewStart, start) * cellW
  const width = Math.max((dayDiff(start, end) + 1) * cellW, cellW)
  const color = STATUS_COLORS[issue.status] || '#696969'
  const pastDue = isPastDue(issue)

  return (
    <div
      className="absolute top-[9px] h-[22px] rounded cursor-pointer flex items-center px-1.5 overflow-hidden"
      style={{
        left,
        width,
        backgroundColor: color,
        border: pastDue ? '2px solid #E23333' : 'none',
        outline: pastDue ? '1px dashed #E23333' : 'none',
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
    >
      {issue.issue_type === 'Epic'
        ? null
        : <span className="text-white 2xl:text-[10px] text-[10px] font-semibold truncate select-none">{issue.key}</span>
      }
    </div>
  )
}

// ─── Main GanttBoard page ─────────────────────────────────────────────────────

const PM_NAV = [
  // COPIED from yop_gantt_2026-11-19_09_board.html sidebar
  ['Dashboard',          'grid-01',           'dashboard'],
  ['Projects',           'layers-three-02',   'projects'],
  ['Tasks',              'check-square',       'tasks'],      // active
  ['Resource Planner',   'users-02',           'resource-planner'],
  ['Daily Allocation',   'calendar-check-02',  'daily-allocation'],
  ['Reports',            'bar-chart-square-01','reports'],
]

const BOARD_TABS = ['Board', 'Issue List', 'Backlog', 'Completed Sprints', 'Gantt', 'Notification Settings']

export default function GanttBoard() {
  const [activeTab, setActiveTab]       = useState('Gantt')
  const [viewMode,  setViewMode]        = useState('Week')
  const [hovered,   setHovered]         = useState(null)   // { issue, x, y }
  const [panel,     setPanel]           = useState(null)   // issue or null
  const [undoVisible, setUndoVisible]   = useState(false)
  const [collapsed,   setCollapsed]     = useState({ 'IT-55': true }) // epics start collapsed
  const calRef = useRef(null)

  const { start: viewStart, count: dayCount } = getViewDays(viewMode)

  // flat list respecting collapse
  const rows = []
  for (const issue of ISSUES) {
    if (issue.parent_id) continue   // skip children in the flat list (added below)
    rows.push({ ...issue, depth: 0 })
    if (issue.issue_type === 'Epic' && !collapsed[issue.id]) {
      for (const childKey of issue.children) {
        const child = ISSUES.find(i => i.key === childKey)
        if (child) rows.push({ ...child, depth: 1 })
      }
    }
  }

  // ── day header ──────────────────────────────────────────────────────────────
  const days = []
  for (let i = 0; i < dayCount; i++) {
    const d = new Date(viewStart)
    d.setDate(d.getDate() + i)
    days.push(d)
  }

  const calendarWidth = dayCount * CELL_W

  // today line offset
  const todayOffset = dayDiff(viewStart, TODAY) * CELL_W

  // mouse position for hover card
  function handleBarHover(e, issue) {
    const rect = calRef.current?.getBoundingClientRect()
    if (!rect) return
    setHovered({ issue, x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  return (
    <AppShell
      portal="project-management"
      nav={PM_NAV}
      activeLabel="Tasks"
      title="Board | IT | CollabCRM"
    >
      {/* ── page header: breadcrumb + project name ── */}
      <div className="sticky top-0 z-[60] 2xl:h-[60px] 2xl-to-xl:h-[52px] h-[52px] border-b border-gray-200 bg-white shadow-sm">
        <div className="flex items-center h-full 2xl:px-6 px-4 gap-3">
          <span className="icon-layers-three-02 text-gray-400 2xl:text-xl 2xl-to-xl:text-base text-base" />
          <span className="2xl:text-sm 2xl-to-xl:text-xs text-xs text-gray-500 font-medium">IT Project</span>
          <span className="icon-chevron-right text-gray-300 2xl:text-sm text-xs" />
          <span className="2xl:text-sm 2xl-to-xl:text-xs text-xs text-gray-800 font-semibold">Board</span>
        </div>
      </div>

      {/* ── tab strip — COPIED classes from yop_gantt_2026-11-19_09_board.html ── */}
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

      {activeTab !== 'Gantt' ? (
        <div className="flex items-center justify-center h-40 text-gray-400 2xl:text-sm text-xs">
          Switch to the <strong className="mx-1 text-indigo-600">Gantt</strong> tab to see the Gantt chart.
        </div>
      ) : (
        <div className="flex flex-col h-[calc(100vh-60px-40px-40px)] overflow-hidden">

          {/* ── Gantt toolbar ─────────────────────────────────────────────────
              DIVERGES: NEW — one toolbar, left to right:
              Sprint | Group by | Type | Week/Month/Quarter/Today | Critical path | Baseline | Unscheduled | Share
              Week/Month/Quarter button style COPIED from _16_daily_allocation.html */}
          <div className="flex items-center gap-3 bg-white border-b border-gray-200 2xl:px-6 px-4 py-2 shadow-sm w-full flex-wrap">

            {/* Sprint dropdown — COPIED filter-option-menu class from _09_board.html */}
            <div className="filter-option-menu text-sm rounded-lg border border-gray-300 p-[1px] text-gray-800 bg-white flex items-center">
              <div className="flex items-center px-2 py-1 gap-1 cursor-pointer">
                <span className="2xl:text-sm 2xl-to-xl:text-xs text-xs text-gray-700 font-medium">Sprint 8</span>
                <span className="icon-chevron-down text-[14px] text-gray-500" />
              </div>
            </div>

            {/* Group by */}
            <div className="filter-option-menu text-sm rounded-lg border border-gray-300 p-[1px] text-gray-800 bg-white flex items-center">
              <div className="flex items-center px-2 py-1 gap-1 cursor-pointer">
                <span className="icon-filter-funnel text-indigo-700 2xl:text-base 2xl-to-xl:text-sm text-sm" />
                <span className="2xl:text-sm 2xl-to-xl:text-xs text-xs text-gray-700 font-medium">Group by</span>
                <span className="icon-chevron-down text-[14px] text-gray-500" />
              </div>
            </div>

            {/* Type */}
            <div className="filter-option-menu text-sm rounded-lg border border-gray-300 p-[1px] text-gray-800 bg-white flex items-center">
              <div className="flex items-center px-2 py-1 gap-1 cursor-pointer">
                <span className="2xl:text-sm 2xl-to-xl:text-xs text-xs text-gray-700 font-medium">Type</span>
                <span className="icon-chevron-down text-[14px] text-gray-500" />
              </div>
            </div>

            <div className="h-5 w-px bg-gray-200" />

            {/* Week / Month / Quarter — COPIED from _16_daily_allocation.html */}
            <div className="relative flex items-center p-0.5 bg-gray-100 rounded-xl border border-gray-200 overflow-hidden" role="group" aria-label="Timeline view mode">
              <div
                className="absolute top-0.5 bottom-0.5 left-0.5 w-[72px] bg-white rounded-lg border border-gray-200 transition-transform duration-300 ease-out"
                style={{ transform: `translateX(${viewMode === 'Week' ? 0 : viewMode === 'Month' ? '100%' : '200%'})` }}
              />
              {['Week','Month','Quarter'].map(m => (
                <button
                  key={m}
                  title={m + ' view'}
                  aria-pressed={viewMode === m}
                  onClick={() => setViewMode(m)}
                  className={`relative z-10 w-[72px] py-1.5 text-xs font-semibold rounded-lg transition-colors duration-300 ${viewMode === m ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-800'}`}
                >
                  {m}
                </button>
              ))}
            </div>

            {/* Today button — COPIED secondary button class from _16_daily_allocation.html */}
            <button
              onClick={() => {/* scroll to today */}}
              className="outline-none font-semibold rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 2xl:text-sm 2xl-to-xl:text-xs text-xs px-3 py-1.5"
            >
              Today
            </button>

            <div className="h-5 w-px bg-gray-200" />

            {/* Critical path, Baseline, Unscheduled — NEW */}
            {['Critical path', 'Baseline', 'Unscheduled'].map(label => (
              <button
                key={label}
                className="outline-none font-semibold rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 2xl:text-sm 2xl-to-xl:text-xs text-xs px-3 py-1.5"
              >
                {label}
              </button>
            ))}

            <div className="h-5 w-px bg-gray-200" />

            {/* Share */}
            <button className="outline-none font-semibold rounded-lg border border-transparent bg-indigo-600 text-white hover:opacity-90 2xl:text-sm 2xl-to-xl:text-xs text-xs px-3 py-1.5 flex items-center gap-1.5">
              <span className="icon-share-07 text-sm" />
              Share
            </button>
          </div>

          {/* ── Gantt body: left grid + calendar ─────────────────────────── */}
          <div className="flex flex-1 overflow-hidden relative" ref={calRef}>

            {/* left grid */}
            <div className="flex-shrink-0 border-r border-gray-200 overflow-y-auto overflow-x-hidden" style={{ width: GRID_LEFT_W }}>
              {/* grid header */}
              <div className="flex items-center bg-gray-50 border-b border-gray-200 sticky top-0 z-10 h-[40px]">
                {COLS.map(col => (
                  <div
                    key={col.key}
                    className="2xl:text-xs 2xl-to-xl:text-[11px] text-[11px] text-gray-500 font-semibold px-2 shrink-0 truncate"
                    style={{ width: col.w }}
                  >
                    {col.label}
                  </div>
                ))}
              </div>
              {/* rows */}
              {rows.map(issue => (
                <div
                  key={issue.id}
                  className="flex items-center border-b border-gray-100 hover:bg-indigo-50/40 cursor-pointer"
                  style={{ height: ROW_H, paddingLeft: issue.depth * 16 }}
                  onClick={() => setPanel(issue)}
                >
                  {/* Type icon */}
                  <div className="shrink-0 flex items-center justify-center px-1" style={{ width: COLS[0].w - issue.depth * 16 }}>
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
                  {/* Key */}
                  <div className="2xl:text-xs 2xl-to-xl:text-[11px] text-[11px] font-medium text-indigo-700 hover:underline shrink-0 truncate px-1" style={{ width: COLS[1].w }}>
                    {issue.key}
                  </div>
                  {/* Title */}
                  <div className="2xl:text-xs 2xl-to-xl:text-[11px] text-[11px] text-gray-700 shrink-0 truncate px-1" style={{ width: COLS[2].w }}>
                    {issue.title}
                  </div>
                  {/* Assignee */}
                  <div className="2xl:text-xs 2xl-to-xl:text-[11px] text-[11px] text-gray-500 shrink-0 truncate px-1" style={{ width: COLS[3].w }}>
                    {issue.assignee_name}
                  </div>
                  {/* Start Date */}
                  <div className="2xl:text-xs 2xl-to-xl:text-[11px] text-[11px] text-gray-500 shrink-0 truncate px-1" style={{ width: COLS[4].w }}>
                    {issue.start_date}
                  </div>
                  {/* Due Date */}
                  <div className={`2xl:text-xs 2xl-to-xl:text-[11px] text-[11px] shrink-0 truncate px-1 ${isPastDue(issue) ? 'text-error-600 font-semibold' : 'text-gray-500'}`} style={{ width: COLS[5].w }}>
                    {issue.due_date}
                  </div>
                </div>
              ))}
            </div>

            {/* calendar */}
            <div className="flex-1 overflow-x-auto overflow-y-auto relative">
              <div style={{ width: calendarWidth, minHeight: '100%', position: 'relative' }}>

                {/* day header */}
                <div className="flex items-center bg-gray-50 border-b border-gray-200 sticky top-0 z-10 h-[40px]">
                  {days.map((d, i) => (
                    <div
                      key={i}
                      className={`shrink-0 flex items-center justify-center border-r border-gray-100 2xl:text-[10px] 2xl-to-xl:text-[10px] text-[10px] font-medium ${
                        isWeekend(d) ? 'text-gray-400 bg-gray-50' : 'text-gray-600'
                      } ${d.toDateString() === TODAY.toDateString() ? 'text-indigo-600 font-bold' : ''}`}
                      style={{ width: CELL_W, height: 40 }}
                    >
                      {d.getDate()}
                    </div>
                  ))}
                </div>

                {/* rows — background stripes */}
                {rows.map((issue, ri) => (
                  <div key={issue.id} className="relative flex" style={{ height: ROW_H }}>
                    {days.map((d, i) => (
                      <div
                        key={i}
                        className={`shrink-0 border-r border-b border-gray-100 ${isWeekend(d) ? 'bg-gray-50/50' : 'hover:bg-indigo-50/40'}`}
                        style={{ width: CELL_W, height: ROW_H }}
                      />
                    ))}
                    {/* Epic summary bar: spans all children */}
                    {issue.issue_type === 'Epic' ? (
                      <Bar
                        issue={issue}
                        viewStart={viewStart}
                        cellW={CELL_W}
                        onHover={e => handleBarHover(e, issue)}
                        onLeave={() => setHovered(null)}
                        onClick={() => setPanel(issue)}
                      />
                    ) : (
                      <Bar
                        issue={issue}
                        viewStart={viewStart}
                        cellW={CELL_W}
                        onHover={e => handleBarHover(e, issue)}
                        onLeave={() => setHovered(null)}
                        onClick={() => setPanel(issue)}
                      />
                    )}
                    {/* past-due dashed line to today */}
                    {isPastDue(issue) && (() => {
                      const due = parseDate(issue.due_date)
                      const dueLeft = dayDiff(viewStart, due) * CELL_W + CELL_W
                      const todayLeft = todayOffset
                      if (todayLeft <= dueLeft) return null
                      return (
                        <div
                          className="absolute top-[19px] border-t-2 border-dashed border-error-500"
                          style={{ left: dueLeft, width: todayLeft - dueLeft }}
                        />
                      )
                    })()}
                  </div>
                ))}

                {/* today line */}
                {todayOffset >= 0 && todayOffset <= calendarWidth && (
                  <div
                    className="absolute top-0 bottom-0 w-[2px] bg-indigo-500 z-20 pointer-events-none"
                    style={{ left: todayOffset }}
                  >
                    <div className="w-3 h-3 rounded-full bg-indigo-500 -ml-[5px] -mt-1" />
                  </div>
                )}

              </div>
            </div>

            {/* hover card */}
            {hovered && <HoverCard issue={hovered.issue} x={hovered.x} y={hovered.y} />}

            {/* issue detail panel */}
            {panel && <IssuePanel issue={panel} onClose={() => setPanel(null)} />}
          </div>
        </div>
      )}

      {/* Undo toast */}
      <UndoToast visible={undoVisible} onUndo={() => setUndoVisible(false)} onDismiss={() => setUndoVisible(false)} />
    </AppShell>
  )
}
