# Task 1 wire-up — Gantt prototype (port 5250)

Working folder: /home/yashang/.gemini/antigravity/scratch/CollabCrawl/prototypes/gantt-chart

## What is already done
- `src/data/gantt.js` — 6 issues + TODAY + STATUS_COLORS (written)
- `src/pages/GanttBoard.jsx` — full Gantt page component (written)

## What you must do (3 steps, all in the working folder)

### Step 1 — Wire GanttBoard into the router (src/App.jsx)
Add this import at the top (after existing imports):
```
import GanttBoard from './pages/GanttBoard.jsx'
```
Add this route inside `<Routes>` (before the closing `</Routes>`):
```
<Route path="/gantt" element={<GanttBoard />} />
```

### Step 2 — Add ProjectManagement sidebar to AppShell (src/components/AppShell.jsx)
Read the existing AppShell.jsx. It already imports RecruitmentSidebar etc.
Add a `ProjectManagementSidebar` export to `src/components/PortalSidebars.jsx`
that uses the SAME pattern as RecruitmentSidebar but with these nav items
(copied from yop_gantt_2026-11-19_09_board.html — these are exact):
  - Dashboard       icon-grid-01
  - Projects        icon-layers-three-02
  - Tasks           icon-check-square    ← active item
  - Resource Planner icon-users-02
  - Daily Allocation icon-calendar-check-02
  - Reports         icon-bar-chart-square-01

The sidebar uses `bg-indigo-700 w-[220px]` (same as RecruitmentSidebar).
Active item = "Tasks" gets `bg-indigo-600 text-white`.
All other items: `text-white hover:bg-indigo-600`.

Then in AppShell.jsx, when `portal === "project-management"`, render
`<ProjectManagementSidebar nav={nav} activeLabel={activeLabel} portal={portal} />`.
Look at how RecruitmentSidebar / other sidebars are already conditionally rendered
in AppShell, and follow the EXACT same pattern.

### Step 3 — Build check
Run from the working folder:
```
cd /home/yashang/.gemini/antigravity/scratch/CollabCrawl/prototypes/gantt-chart && npm run build 2>&1
```
If build fails, fix the errors. Output the last 30 lines of build output.

## Done means
- `npm run build` exits with code 0.
- `src/App.jsx` has the `/gantt` route.
- `src/components/PortalSidebars.jsx` exports `ProjectManagementSidebar`.
- AppShell renders it when portal="project-management".

## Rules
- Copy class strings exactly — do NOT invent new Tailwind classes.
- Use the EXACT same sidebar pattern as RecruitmentSidebar already in PortalSidebars.jsx.
- Do NOT touch GanttBoard.jsx or gantt.js.
- Output a final line: BUILD OK or BUILD FAIL: <reason>
