import { useState, useMemo, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AppShell from '../components/AppShell.jsx'
import { COMPANY_PROJECTS, TODAY } from '../data/gantt.js'

const PM_NAV = [
  ['Dashboard',          'grid-01',           'dashboard'],
  ['Projects',           'layers-three-02',   'projects'],
  ['Tasks',              'check-square',       'tasks'],
  ['Resource Planner',   'users-02',           'resource-planner'],
  ['Daily Allocation',   'calendar-check-02',  'daily-allocation'],
  ['Occupancy Report',   'bar-chart-square-01','occupancy-report'],
  ['Timesheet Reports',  'clock',              'timesheet-reports'],
  ['Hirebase Report',    'users-01',           'hirebase-report'],
  ['Hourly Report',      'pie-chart-01',       'hourly-report'],
  ['Fixed Cost Report',  'coins-01',           'fixed-cost-report'],
  ['Config',             'settings-02',        null],
]

function parseDate(str) {
  if (!str) return null
  const months = {
    Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
    Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
  }
  const parts = str.split('-')
  if (parts.length !== 3) return null
  const day = parseInt(parts[0], 10)
  const month = months[parts[1]]
  const year = parseInt(parts[2], 10)
  return new Date(year, month, day)
}

function dayDiff(d1, d2) {
  const t1 = Date.UTC(d1.getFullYear(), d1.getMonth(), d1.getDate())
  const t2 = Date.UTC(d2.getFullYear(), d2.getMonth(), d2.getDate())
  return Math.round((t2 - t1) / (1000 * 60 * 60 * 24))
}

export default function ProjectDashboard() {
  const navigate = useNavigate()
  const [modelFilter, setModelFilter] = useState('All')
  const [viewMode, setViewMode] = useState('Month')
  const calScrollRef = useRef(null)

  const filteredProjects = useMemo(() => {
    if (modelFilter === 'All') return COMPANY_PROJECTS
    return COMPANY_PROJECTS.filter(p => p.model === modelFilter)
  }, [modelFilter])

  // Calendar config: spanning from 01-Sep-2026 to 31-Dec-2026 (122 days)
  const viewStart = useMemo(() => new Date(2026, 8, 1), []) // 01-Sep-2026
  const dayCount = 122
  const cellW = viewMode === 'Week' ? 44 : viewMode === 'Month' ? 24 : 12
  const calendarWidth = dayCount * cellW
  const todayOffset = dayDiff(viewStart, TODAY) * cellW

  const days = useMemo(() => {
    const arr = []
    for (let i = 0; i < dayCount; i++) {
      const d = new Date(viewStart)
      d.setDate(d.getDate() + i)
      arr.push(d)
    }
    return arr
  }, [viewStart, dayCount])

  const monthGroups = useMemo(() => {
    const groups = []
    let current = null
    days.forEach((d) => {
      const key = `${d.toLocaleString('default', { month: 'long' })} ${d.getFullYear()}`
      if (!current || current.key !== key) {
        if (current) groups.push(current)
        current = { key, count: 1 }
      } else {
        current.count++
      }
    })
    if (current) groups.push(current)
    return groups
  }, [days])

  return (
    <AppShell
      portal="project-management"
      nav={PM_NAV}
      activeLabel="Dashboard"
      title="Project Dashboard | CollabCRM"
    >
      <div className="flex flex-col h-full bg-gray-50 overflow-y-auto">
        {/* Top Breadcrumb Bar */}
        <div className="flex border-b border-gray-200 py-2.5 px-6 bg-white justify-between items-center sticky top-0 z-30 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-700">
            <span className="icon-home-line text-sm text-gray-400" />
            <span className="text-gray-400">/</span>
            <span className="text-gray-500">Project Management</span>
            <span className="text-gray-400">/</span>
            <span className="text-indigo-600 font-bold">Dashboard</span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/stories.html"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-gray-50 text-indigo-700 border border-indigo-200 rounded-lg text-xs font-semibold shadow-xs transition-colors"
              title="Open Gantt Chart User Stories"
            >
              <span className="icon-file-06 text-xs text-indigo-600" />
              <span>User Stories</span>
              <span className="icon-external-link text-[10px] text-indigo-400" />
            </a>
            <Link
              to="/gantt"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
            >
              <span className="icon-layers-three text-xs" />
              <span>Go to Task Gantt</span>
            </Link>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-6 space-y-6">
          {/* Header Title & Intro */}
          <div>
            <h1 className="text-xl font-bold text-gray-800">Project Dashboard</h1>
          </div>

          {/* Overview KPI Cards (COPIED verbatim from yop_project_management_dashboard__default.html) */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Projects</span>
                <span className="icon-folder text-indigo-600 text-base" />
              </div>
              <div className="mt-2 text-2xl font-bold text-gray-900">3</div>
              <div className="mt-1 text-[11px] text-gray-500">Active projects under delivery</div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Fixed Cost</span>
                <span className="size-2 rounded-full bg-purple-500" />
              </div>
              <div className="mt-2 text-2xl font-bold text-purple-700">1</div>
              <div className="mt-1 text-[11px] text-gray-500">Apex E-Commerce Revamp</div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Hourly</span>
                <span className="size-2 rounded-full bg-indigo-500" />
              </div>
              <div className="mt-2 text-2xl font-bold text-indigo-700">1</div>
              <div className="mt-1 text-[11px] text-gray-500">IT Support & Development</div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Hire Base</span>
                <span className="size-2 rounded-full bg-sky-500" />
              </div>
              <div className="mt-2 text-2xl font-bold text-sky-700">1</div>
              <div className="mt-1 text-[11px] text-gray-500">Mobile App Dedicated Team</div>
            </div>
          </div>

          {/* ── Company-wide Gantt Section (Story 8: Steps 4, 5, 6) ── */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-xs overflow-hidden">
            {/* Header with Filters & Controls */}
            <div className="p-4 border-b border-gray-200 flex flex-wrap items-center justify-between gap-3 bg-gray-50/50">
              <div className="flex items-center gap-2">
                <span className="icon-calendar text-indigo-600 text-base" />
                <h2 className="text-sm font-bold text-gray-800">Projects Timeline</h2>
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                {/* Engagement Model Filter */}
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-gray-500 font-medium">Model:</span>
                  <div className="flex items-center bg-gray-100 p-0.5 rounded-lg border border-gray-200 text-xs">
                    {['All', 'Hourly', 'Fixed Cost', 'Hire Base'].map(m => (
                      <button
                        key={m}
                        onClick={() => setModelFilter(m)}
                        className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
                          modelFilter === m
                            ? 'bg-white text-indigo-700 shadow-xs'
                            : 'text-gray-500 hover:text-gray-800'
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>

                {/* View Zoom */}
                <div className="flex items-center bg-gray-100 p-0.5 rounded-lg border border-gray-200 text-xs">
                  {['Week', 'Month', 'Quarter'].map(z => (
                    <button
                      key={z}
                      onClick={() => setViewMode(z)}
                      className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
                        viewMode === z ? 'bg-white text-indigo-700 shadow-xs' : 'text-gray-500 hover:text-gray-800'
                      }`}
                    >
                      {z}
                    </button>
                  ))}
                </div>

                {/* Today button */}
                <button
                  onClick={() => {
                    if (calScrollRef.current) {
                      calScrollRef.current.scrollLeft = Math.max(0, todayOffset - 200)
                    }
                  }}
                  className="px-2.5 py-1 text-xs font-semibold rounded-md border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                >
                  Today
                </button>
              </div>
            </div>

            {/* Split Pane: Left Project Info Grid + Right Timeline */}
            <div className="flex overflow-hidden">
              {/* Left Project Table */}
              <div className="w-[380px] shrink-0 border-r border-gray-200 bg-white">
                <div className="h-[40px] bg-gray-50 border-b border-gray-200 flex items-center px-4 text-xs font-semibold text-gray-500 justify-between">
                  <span>Project & Engagement Model</span>
                  <span>Duration / Spent</span>
                </div>
                <div className="divide-y divide-gray-100">
                  {filteredProjects.map(proj => (
                    <div
                      key={proj.id}
                      onClick={() => navigate(`/gantt?project=${proj.code}&model=${proj.model}`)}
                      className="h-[64px] px-4 flex items-center justify-between hover:bg-indigo-50/40 cursor-pointer transition-colors"
                      title="Click to open this project's Gantt board"
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className="size-8 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0"
                          style={{ backgroundColor: proj.color }}
                        >
                          {proj.code}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-gray-800 hover:text-indigo-600 transition-colors flex items-center gap-1">
                            <span>{proj.name}</span>
                            <span className="icon-arrow-narrow-right text-xs text-gray-400" />
                          </div>
                          <div className="text-[10px] text-gray-500 font-medium mt-0.5">
                            <span className={`px-1.5 py-0.2 rounded font-semibold border ${
                              proj.model === 'Fixed Cost'
                                ? 'bg-purple-50 text-purple-700 border-purple-200'
                                : proj.model === 'Hire Base'
                                ? 'bg-sky-50 text-sky-700 border-sky-200'
                                : 'bg-indigo-50 text-indigo-700 border-indigo-200'
                            }`}>
                              {proj.model}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-[11px] font-semibold text-gray-700">{proj.spent_hours} / {proj.total_hours}</div>
                        <div className="text-[10px] text-gray-400">{proj.start} – {proj.end}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Timeline Grid */}
              <div className="flex-1 overflow-x-auto relative" ref={calScrollRef}>
                <div style={{ width: calendarWidth }}>
                  {/* Timeline Header (Tier 1: Month Groups) */}
                  <div className="flex border-b border-gray-200 bg-gray-50 h-[22px]">
                    {monthGroups.map((m, idx) => (
                      <div
                        key={idx}
                        className="border-r border-gray-200 text-center text-[10px] font-bold text-gray-700 flex items-center justify-center shrink-0 bg-gray-50"
                        style={{ width: m.count * cellW }}
                      >
                        {m.key}
                      </div>
                    ))}
                  </div>

                  {/* Timeline Header (Tier 2: Days/Weeks) */}
                  <div className="flex border-b border-gray-200 bg-white h-[18px]">
                    {days.map((d, i) => (
                      <div
                        key={i}
                        className={`shrink-0 border-r border-gray-100 text-center text-[9px] flex items-center justify-center ${
                          d.getDay() === 0 || d.getDay() === 6 ? 'bg-gray-50/50 text-gray-400' : 'text-gray-500'
                        }`}
                        style={{ width: cellW }}
                      >
                        {viewMode === 'Week' ? `${d.getDate()} ${['Su','Mo','Tu','We','Th','Fr','Sa'][d.getDay()]}` : d.getDate()}
                      </div>
                    ))}
                  </div>

                  {/* Today line */}
                  {todayOffset >= 0 && todayOffset <= calendarWidth && (
                    <div
                      className="absolute top-0 bottom-0 w-[2px] bg-indigo-500 z-20 pointer-events-none"
                      style={{ left: todayOffset }}
                    >
                      <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 -ml-[4px] -mt-0.5 shadow-sm" />
                    </div>
                  )}

                  {/* Project Rows */}
                  <div className="divide-y divide-gray-100">
                    {filteredProjects.map(proj => {
                      const pStart = parseDate(proj.start)
                      const pEnd   = parseDate(proj.end)
                      const barLeft  = pStart ? Math.max(0, dayDiff(viewStart, pStart) * cellW) : 0
                      const barWidth = (pStart && pEnd) ? (dayDiff(pStart, pEnd) + 1) * cellW : 120

                      return (
                        <div
                          key={proj.id}
                          className="h-[64px] relative flex items-center hover:bg-gray-50/50 transition-colors"
                        >
                          {/* Grid background columns */}
                          {days.map((d, i) => (
                            <div
                              key={i}
                              className={`shrink-0 border-r border-gray-100 h-full ${
                                d.getDay() === 0 || d.getDay() === 6 ? 'bg-gray-50/30' : ''
                              }`}
                              style={{ width: cellW }}
                            />
                          ))}

                          {/* Horizontal Project Gantt Bar */}
                          <div
                            onClick={() => navigate(`/gantt?project=${proj.code}&model=${proj.model}`)}
                            className="absolute h-[32px] rounded-lg shadow-sm flex items-center px-3 cursor-pointer hover:opacity-95 transition-all z-10"
                            style={{
                              left: barLeft,
                              width: barWidth,
                              backgroundColor: proj.color,
                            }}
                            title={`${proj.name} (${proj.start} to ${proj.end})`}
                          >
                            <span className="text-white text-xs font-bold truncate drop-shadow-xs">
                              {proj.name} ({proj.model})
                            </span>
                          </div>
                        </div>
                      )
                    })}
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
