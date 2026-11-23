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

const MONTH_NAMES = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

function fmtDate(d) {
  if (!d) return ''
  return `${String(d.getDate()).padStart(2, '0')}-${MONTH_NAMES[d.getMonth()]}-${d.getFullYear()}`
}

function dayDiff(d1, d2) {
  const t1 = Date.UTC(d1.getFullYear(), d1.getMonth(), d1.getDate())
  const t2 = Date.UTC(d2.getFullYear(), d2.getMonth(), d2.getDate())
  return Math.round((t2 - t1) / (1000 * 60 * 60 * 24))
}

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

export default function ProjectDashboard() {
  const navigate = useNavigate()
  const [modelFilter, setModelFilter] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [healthFilter, setHealthFilter] = useState('All')
  const [managerFilter, setManagerFilter] = useState('All')
  const [filterMenuOpen, setFilterMenuOpen] = useState(false)
  const [viewMode, setViewMode] = useState('Month')
  const [anchorDate, setAnchorDate] = useState(new Date(2026, 10, 1))
  const [datePickerOpen, setDatePickerOpen] = useState(false)
  const calScrollRef = useRef(null)

  function handlePrevYear() {
    setAnchorDate(d => new Date(d.getFullYear() - 1, d.getMonth(), 1))
  }
  function handleNextYear() {
    setAnchorDate(d => new Date(d.getFullYear() + 1, d.getMonth(), 1))
  }
  function handlePrevPeriod() {
    if (viewMode === 'Week') {
      setAnchorDate(d => {
        const next = new Date(d)
        next.setDate(next.getDate() - 7)
        return next
      })
    } else if (viewMode === 'Quarter') {
      setAnchorDate(d => new Date(d.getFullYear(), d.getMonth() - 3, 1))
    } else {
      setAnchorDate(d => new Date(d.getFullYear(), d.getMonth() - 1, 1))
    }
  }
  function handleNextPeriod() {
    if (viewMode === 'Week') {
      setAnchorDate(d => {
        const next = new Date(d)
        next.setDate(next.getDate() + 7)
        return next
      })
    } else if (viewMode === 'Quarter') {
      setAnchorDate(d => new Date(d.getFullYear(), d.getMonth() + 3, 1))
    } else {
      setAnchorDate(d => new Date(d.getFullYear(), d.getMonth() + 1, 1))
    }
  }
  function handleToday() {
    setAnchorDate(new Date(2026, 10, 1))
    if (calScrollRef.current) {
      const todayOffset = dayDiff(viewStart, TODAY) * cellW
      calScrollRef.current.scrollTo({
        left: Math.max(0, todayOffset - 200),
        behavior: 'smooth'
      })
    }
  }

  const hasActiveFilters = healthFilter !== 'All' || managerFilter !== 'All' || searchQuery !== ''

  const filteredProjects = useMemo(() => {
    return COMPANY_PROJECTS.filter(p => {
      const matchModel = modelFilter === 'All' || p.model === modelFilter
      const matchSearch = !searchQuery ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.code.toLowerCase().includes(searchQuery.toLowerCase())
      const matchHealth = healthFilter === 'All' || p.health === healthFilter
      const matchManager = managerFilter === 'All' || p.manager === managerFilter
      return matchModel && matchSearch && matchHealth && matchManager
    })
  }, [modelFilter, searchQuery, healthFilter, managerFilter])

  const { start: viewStart, count: dayCount, cellW } = useMemo(() => {
    return getViewConfig(viewMode, anchorDate)
  }, [viewMode, anchorDate])

  const calendarWidth = dayCount * cellW
  const todayOffset = dayDiff(viewStart, TODAY) * cellW

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
            <div className="p-3.5 border-b border-gray-200 flex flex-wrap items-center justify-between gap-3 bg-gray-50/70">
              <div className="flex items-center gap-2.5">
                <span className="icon-calendar text-indigo-600 text-base" />
                <h2 className="text-sm font-bold text-gray-800">Projects Timeline</h2>
                <span className="text-[11px] font-semibold text-gray-500 bg-gray-200/80 px-2 py-0.5 rounded-full">
                  {filteredProjects.length} of {COMPANY_PROJECTS.length}
                </span>
              </div>

              <div className="flex items-center gap-2.5 flex-wrap">
                {/* Search Box */}
                <div className="relative flex items-center">
                  <span className="icon-search-refraction absolute left-2.5 text-gray-400 text-xs pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search projects..."
                    className="w-40 pl-8 pr-2.5 py-1 text-xs border border-gray-300 rounded-lg bg-white focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2 text-gray-400 hover:text-gray-600 text-xs"
                    >
                      ×
                    </button>
                  )}
                </div>

                {/* CollabCRM Filter Funnel Button & Popover */}
                <div className="relative">
                  <button
                    onClick={() => setFilterMenuOpen(prev => !prev)}
                    className={`px-2.5 py-1 text-xs rounded-lg border flex items-center gap-1.5 transition-all shadow-2xs ${
                      hasActiveFilters
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700 font-semibold'
                        : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span className="icon-filter-funnel text-xs" />
                    <span>Filter</span>
                    {hasActiveFilters && (
                      <span className="size-2 rounded-full bg-indigo-600 ml-0.5" />
                    )}
                    <span className="icon-chevron-down text-[10px] text-gray-400 ml-0.5" />
                  </button>

                  {/* Filter Popover */}
                  {filterMenuOpen && (
                    <div className="absolute right-0 mt-1.5 w-60 bg-white border border-gray-200 rounded-xl shadow-custom-popup-shadow p-3 z-50 space-y-3">
                      <div className="flex items-center justify-between pb-1.5 border-b border-gray-100">
                        <span className="text-xs font-bold text-gray-800">Filter Projects</span>
                        {hasActiveFilters && (
                          <button
                            onClick={() => { setHealthFilter('All'); setManagerFilter('All'); setSearchQuery(''); setFilterMenuOpen(false) }}
                            className="text-[11px] text-indigo-600 hover:text-indigo-800 font-medium"
                          >
                            Reset all
                          </button>
                        )}
                      </div>

                      {/* Health Filter */}
                      <div>
                        <label className="block text-[11px] font-semibold text-gray-600 mb-1.5">Project Health</label>
                        <div className="space-y-1">
                          {['All', 'On Track', 'At Risk', 'Delayed'].map(h => (
                            <button
                              key={h}
                              onClick={() => { setHealthFilter(h); setFilterMenuOpen(false) }}
                              className={`w-full flex items-center justify-between px-2.5 py-1 text-xs rounded-md text-left transition-colors ${
                                healthFilter === h ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-gray-700 hover:bg-gray-50'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <span className={`size-2 rounded-full ${
                                  h === 'On Track' ? 'bg-emerald-500' : h === 'At Risk' ? 'bg-amber-500' : h === 'Delayed' ? 'bg-red-500' : 'bg-gray-400'
                                }`} />
                                <span>{h}</span>
                              </div>
                              {healthFilter === h && <span className="icon-check text-xs text-indigo-600" />}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Project Manager Filter */}
                      <div className="pt-2 border-t border-gray-100">
                        <label className="block text-[11px] font-semibold text-gray-600 mb-1.5">Project Manager</label>
                        <div className="space-y-1">
                          {['All', 'Emma Clark', 'Liam Brooks', 'Sofia Reyes'].map(pm => (
                            <button
                              key={pm}
                              onClick={() => { setManagerFilter(pm); setFilterMenuOpen(false) }}
                              className={`w-full flex items-center justify-between px-2.5 py-1 text-xs rounded-md text-left transition-colors ${
                                managerFilter === pm ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-gray-700 hover:bg-gray-50'
                              }`}
                            >
                              <span>{pm}</span>
                              {managerFilter === pm && <span className="icon-check text-xs text-indigo-600" />}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

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

                {/* Date Navigation & Period Picker */}
                <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg p-0.5 shadow-2xs">
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
                  {['Week', 'Month', 'Quarter'].map(m => (
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
                          className="size-8 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-xs"
                          style={{ backgroundColor: proj.color }}
                        >
                          {proj.code}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-gray-800 hover:text-indigo-600 transition-colors flex items-center gap-1.5">
                            <span>{proj.name}</span>
                            <span className={`px-1.5 py-0.2 rounded text-[9.5px] font-bold border ${
                              proj.health === 'On Track'
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                : 'bg-amber-50 text-amber-700 border-amber-200'
                            }`}>
                              {proj.health}
                            </span>
                          </div>
                          <div className="text-[10px] text-gray-500 font-medium mt-0.5 flex items-center gap-2">
                            <span className={`px-1.5 py-0.2 rounded font-semibold border ${
                              proj.model === 'Fixed Cost'
                                ? 'bg-purple-50 text-purple-700 border-purple-200'
                                : proj.model === 'Hire Base'
                                ? 'bg-sky-50 text-sky-700 border-sky-200'
                                : 'bg-indigo-50 text-indigo-700 border-indigo-200'
                            }`}>
                              {proj.model}
                            </span>
                            <span>PM: {proj.manager}</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-[11px] font-semibold text-gray-700">{proj.spent_hours} / {proj.total_hours}</div>
                        <div className="text-[10px] text-gray-400">{proj.start} – {proj.end}</div>
                      </div>
                    </div>
                  ))}
                  {filteredProjects.length === 0 && (
                    <div className="p-8 text-center text-xs text-gray-400">
                      No projects match your filter criteria.
                    </div>
                  )}
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
                  <div className="flex border-b border-gray-200 bg-white h-[20px]">
                    {viewMode === 'Quarter' ? (
                      weekGroups?.map((wg, idx) => (
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
                          className={`shrink-0 border-r border-gray-100 text-center text-[9px] flex items-center justify-center ${
                            d.getDay() === 0 || d.getDay() === 6 ? 'bg-gray-50/50 text-gray-400' : 'text-gray-500'
                          } ${d.toDateString() === TODAY.toDateString() ? 'text-indigo-600 font-bold bg-indigo-50/50' : ''}`}
                          style={{ width: cellW }}
                        >
                          {viewMode === 'Week' ? `${d.getDate()} ${['Su','Mo','Tu','We','Th','Fr','Sa'][d.getDay()]}` : d.getDate()}
                        </div>
                      ))
                    )}
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
