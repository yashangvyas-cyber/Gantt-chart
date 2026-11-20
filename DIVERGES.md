# Kit pieces NOT copied from CollabCRM (review with the BA)

- _kit/src/index.css:443:   CollabCRM draws `.checkmark` in its own stylesheet, which is NOT CAPTURED — DIVERGES: drawn here with the indigo-600 / gray-300 tokens. */
- _kit/src/pages/Patterns.jsx:2:// DIVERGES: KIT-only page (the card + caption around each snippet are not a CollabCRM screen). Caption class = CAP in components/super/ui.jsx.
- _kit/src/pages/Portals.jsx:3:// DIVERGES: KIT-only index list (not a CollabCRM screen). Link class = TLINK in components/super/ui.jsx.
- _kit/src/components/super/ui.jsx:27:  indigo:  { b: 'rgb(199, 215, 254)', c: 'rgb(53, 56, 205)', bg: 'rgb(238, 244, 255)', dot: 'rgb(97, 114, 243)' },   // DIVERGES: values not captured
- _kit/src/components/super/ui.jsx:28:  gray:    { b: 'rgb(234, 236, 240)', c: 'rgb(52, 64, 84)', bg: 'rgb(249, 250, 251)', dot: 'rgb(102, 112, 133)' },    // DIVERGES: values not captured
- _kit/src/pages/Catalogue.jsx:23:// DIVERGES: /dev/cc showcase-only wrappers (H section heading spacing, BOX white card) — no real string exists for "a labelled box of primitives".
- _kit/src/components/cc/StatusPill.jsx:4:// DIVERGES: colour classes instead of the real inline rgb() style — same values (error/success/warning -200,-700,-50,-500), so the whole
- _kit/src/components/cc/StatusPill.jsx:28:// DIVERGES: only the "open" (warning) colours are captured; the other families use the same -50 / -200 / -700 / -500 pattern.
- _kit/src/components/super/record.jsx:106:// DIVERGES: the icon span is the bare `<span class="icon-plus">` of the real "Add Estimation" button with another icon name.
- _kit/src/components/super/record.jsx:109:// trigger span, menu box and item strings are verbatim. DIVERGES: the real menu is portalled with computed top/left; here it opens under the button.
- _kit/src/components/super/record.jsx:142:// in the right slot (chevron-down when folded). DIVERGES: the header drops its border-b while folded (the capture only shows it open).
- _kit/src/components/super/TabStrip.jsx:4:// DIVERGES: unselected FIRST tab and selected MIDDLE/LAST tab — the capture has 3 tabs; these combinations have no exact string, real pieces recombined.
- _kit/src/components/cc/KpiCard.jsx:4:// active = the card filters the list now; DIVERGES: it keeps its hover colours as an inline style (no "selected" card is captured)
- _kit/src/components/cc/KpiCard.jsx:29:// DIVERGES: the picked card keeps its hover colours (border-indigo-200 / bg-indigo-50/60) as an inline style — no "selected" card is captured.
- _kit/src/components/Select.jsx:76:              // { heading } = a group title inside the menu (NEW: no captured react-select group heading; DIVERGES: plain small grey label)
- _kit/src/components/super/SuperShell.jsx:62:                      {/* closed = the captured string; DIVERGES: NEW open state (only the closed state is captured) drops scale-0 opacity-0 */}
- _kit/src/components/super/SuperShell.jsx:109:                            {/* DIVERGES: <span>, the capture nests an <a title="Add …"> inside the item <a> (React refuses nested anchors); same classes */}
- _kit/src/components/super/SuperShell.jsx:119:                  DIVERGES: NEW open state — the items below are not in any capture (the real list is empty in the DOM; it is filled from the bundle) */}
- _kit/src/components/cc/FilterBar.jsx:7:// DIVERGES: the per-chip ✕ is the real ✕ of the Deal Details tag chip (crm-invoice deals_id_details) — the captured bar only has clear-all.
- _kit/src/components/cc/Drawer.jsx:5:export default function Drawer({ title, onClose, children, width = 'w-[560px]' }) {   // width: DIVERGES only for the reports drill-down (a ticket list needs room)
- _kit/src/components/super/record.jsx: shadow-[0px_12px_24px…] is in no capture (found by _tools/check_kit.py)

# Gantt prototype new parts (Task 1 / Story 2)
- NEW: Gantt tab in board navigation strip (S2) — modelled on Board/Backlog tab transitions from modules/project-mgmt/dom/yop_gantt_2026-11-19_09_board.html
- NEW: Unified Gantt toolbar (S2 / Common rules) — Sprint, Group by, Type | Week/Month/Quarter/Today | Critical path, Baseline, Unscheduled | Share. Button group modelled on modules/project-mgmt/dom/yop_gantt_2026-11-19_16_daily_allocation.html
- NEW: Left grid with Type, Key, Title, Assignee, Start Date, Due Date columns + expand/collapse child hierarchy (S2)
- NEW: Timeline calendar with status-coloured bars, past-due red dashed lines, weekend shading, and local today line (S2)
- NEW: Bar hover card with Status, Start, Due, Logged vs Estimated time (S2 / Common rules)
- NEW: Undo toast component "Dates updated" + Undo action (Common rules)

# Gantt prototype new parts (Task 2 / Story 4)
- NEW: Interactive bar body drag to move Start Date and Due Date together (S4)
- NEW: Left edge drag handle to resize Start Date; right edge drag handle to resize Due Date (S4)
- NEW: Unscheduled button in toolbar with count badge (S4)
- NEW: Unscheduled slide-over drawer with Key/Title search, issue cards, and Schedule action (S4)
- NEW: Light dashed sprint-only bar when issue has a sprint assigned but no explicit start/due dates (S4)
- NEW: Issue Detail panel with Details & History tabs logging user date updates (S4)

# Gantt prototype new parts (Task 2 / Story 1)
- NEW: Start Date input placed side by side with Due Date under Sprint in Create Issue drawer (S1)
- NEW: Date validation ("Start Date should be on or before Due Date.") on create and edit (S1)
- NEW: Issue List view with Start Date and Due Date columns (S1)
- NEW: Immediate save of updated dates with History logging (S1)

# Gantt prototype new parts (Task 3 / Story 3)
- NEW: Project Hours KPI strip above chart with selector for Hourly, Fixed Cost, and Hire Base (S3)
- NEW: Fixed Cost header: Estimated, Top-Up, Total, Spent (S3)
- NEW: Hourly header: Total Purchased, Total Billed, Total Spent, Balance, and Expiry Date line (S3)
- NEW: Hire Base header: Contract Start, Contract End, and Remaining Days counter (S3)
- NEW: Pinned top rows for Milestones and Sprints staying fixed while issue rows scroll (S3)
- NEW: Expiry date dashed vertical marker line across the timeline canvas (S3)
- NEW: Hire Base contract date band spanning contract duration with remaining days badge (S3)

# Gantt prototype new parts (Task 3 / Story 5)
- NEW: Dynamic SVG dependency connector lines joining linked issues with finish-to-start, start-to-start, finish-to-finish endpoints (S5)
- NEW: Conflict detection rendering dependency line in red when blocked issue starts before blocker due date (S5)
- NEW: Critical Path toggle button highlighting the critical chain setting project end date (S5)
- NEW: Critical chain pulsing badge displaying project End Date in header (S5)
- NEW: Baseline modal to name and save the agreed plan (S5)
- NEW: Faint baseline plan bars rendered under scheduled bars with hover card comparison (S5)

# Gantt prototype new parts (Task 3 / Story 6)
- NEW: Share dropdown menu with Export PDF and Client view link options (S6)
- NEW: Share dialog modal with public client view link toggle and copy link action (S6)
- NEW: Client read-only view mode (/gantt?client=1) with read-only banner, disabled drag/editing, and interactive zoom/filters (S6)
- NEW: Print stylesheet layout for Export PDF (S6)

# Gantt prototype new parts (Task 4 / Story 7)
- NEW: Developer grouping mode (Group by: Assignee) displaying developer section headers with avatar and role (S7)
- NEW: Contract duration bands spanning each developer's contract dates with Remaining Days counter (S7)
- NEW: Double-booking clash warning badge on overlapping date bands across projects (Liam Brooks) with Resolve action (S7)
- NEW: Resource Planner Occupancy slide-over drawer with %, Hours, Graph display toggles and overload alerts (S7)

# Gantt prototype new parts (Task 4 / Story 8)
- NEW: Multi-board switcher dropdown in breadcrumbs (Default Board, Test Board, Project Gantt (All Boards)) (S8)
- NEW: Board badges in grid rows when viewing Project Gantt across all boards (S8)
- NEW: Dashboard Company Projects Gantt modal showcasing cross-project timeline for Fixed Cost, Hourly, and Hire Base (S8)
- NEW: Interactive timeline bars with milestones and quick jump to project Gantt (S8)

# Gantt prototype new parts (Task 4 / Story 9)
- NEW: Mobile responsive view mode with auto-adaptation for small screens or mobile=1 (S9)
- NEW: Preserved readable columns (Key, Title, Assignee, Start Date, Due Date) on mobile (S9)
- NEW: Touch-friendly swipe indicators and navigation between weeks (S9)
- NEW: Touch-accessible datepicker scheduling for unscheduled issues without dragging (S9)
