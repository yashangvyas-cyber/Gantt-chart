# Gantt chart prototype — PLAN (20 Nov 2026)
Ticket (Yashang, 20 Nov): "Iska prototype banana padega" (of the 17 Gantt user stories). Answers: all 17 stories, Gantt tab
first [yes]; base = our kit, React + Tailwind like our prototypes; clicks work with sample data; localhost first, then his
GitHub link → Vercel; the build chat runs in this folder, all facts come from the parent folder; stories file = EASY version [yes].

## Done means — one line per story of the v2 stories file (9 stories); each = every step clickable, every NEW part
## present (incl. the Common rules: one toolbar, hover card, Undo toast), every existing part copied from the crawl
1. Story 1 Add a Start Date to an issue (Create Issue drawer + issue panel, messages, History entry)
2. Story 2 Read the plan on the Gantt (tab, grid, bars, today line, past due, filters, Week/Month/Quarter/Today)
3. Story 3 See hours, milestones and sprints on top (Fixed Cost, Hourly, Hire Base headers)
4. Story 4 Change dates from the Gantt (drag, edges, Unscheduled drop, Undo toast)
5. Story 5 Link issues, find the critical path, compare with a baseline
6. Story 6 Export as PDF and share a client link
7. Story 7 Plan people on a Hire Base project
8. Story 8 See all boards and all projects (Project Gantt + Dashboard)
9. Story 9 Use the Gantt on mobile
Count: 9 of 9, checked story by story against the stories file (each step clicked).

## Needs first (checked 20 Nov against captures, nothing opened live yet)
Existing screens the prototype copies HAVE captures (modules/project-mgmt/dom/yop_gantt_2026-11-19_*): board, backlog, issue list, create issue,
issue detail, resource planner, daily allocation (Week/Month/Quarter/Today), dashboard, 3 reports, projects, milestones. The Gantt tab itself,
dates in the panel, drag, links, baseline, share, Project Gantt, mobile = NEW (no capture exists, listed in DIVERGES.md).
Common rules (toolbar, hover card, Undo toast) are built ONCE in the shared Gantt component; every story uses it.

## Work board (20 Nov 16:10)
| # | Piece | Who | Needs first | Check |
|---|---|---|---|---|
| 1 | Shared skeleton: board page + Gantt tab, grid, bars, today line, toolbar, hover card, sample data (Story 2 + Common rules) | Antigravity | this plan + HANDOFF | Krishna looks at sample on :5250, then goes on |
| 2 | Story 4 (drag, Unscheduled, Undo) + Story 1 (Start Date in drawer + panel + History) | Antigravity | 1 | clicked step by step, proof docs/proof/S<n>.png |
| 3 | Stories 3, 5, 6 | Antigravity | 2 | same |
| 4 | Stories 7, 8, 9 | Antigravity | 3 | same |
| 5 | Review: each story clicked, copied parts diffed with verify_fidelity, gate, papers, Nandi | Krishna (Claude, after reset Tue 24 Nov 19:30; sample check of piece 1 earlier, light) | 1–4 | gate + papers PASS |
| 6 | localhost -> Yashang looks -> GitHub link from him -> Vercel | Krishna | his OK | link opens |

## Steps / who
A. Antigravity (its own quota): Story 2 Gantt tab + Common rules toolbar + sample data → Yashang looks on localhost:5250.
B. Story 4 and Story 1 (dates), then Story 3, 5, 6, 7, 8, 9.
D. Claude (after the weekly reset, Tue 24 Nov 19:30): fidelity diff vs captures, each story clicked, gate, then GitHub/Vercel.
Cannot undo: Vercel deploy / git push — only after Yashang's OK.
Time: A ≈ half a day; all 17 ≈ 2–3 days of Antigravity work.

## STATUS
20 Nov 16:40 — S9 DONE: Mobile responsive layout with preserved Key, Title, Assignee, Start, Due columns, swipe navigation between weeks, touch-friendly zoom controls, and date picker scheduling for unscheduled issues. Proof in docs/proof/S9.png.
20 Nov 16:38 — S8 DONE: Multi-board selector (Default Board, Test Board, Project Gantt (All Boards)) with board badges in grid, and Dashboard Company Projects Gantt modal covering Fixed Cost, Hourly, and Hire Base timelines. Proof in docs/proof/S8.png.
20 Nov 16:35 — S7 DONE: Hire Base developer grouping (groupBy === 'Assignee'), contract duration bands (01-Nov to 28-Nov, 8 days left), double-booking warning banner and highlight on overlapping dates for Liam Brooks, and Resource Planner Occupancy drawer with overload resolve action. Proof in docs/proof/S7.png.
20 Nov 16:30 — S6 DONE: Share dropdown with Export PDF and Client view link modal, public link toggle, and read-only Client view mode (/gantt?client=1). Proof in docs/proof/S6.png.
20 Nov 16:28 — S5 DONE: SVG dependency connector lines, conflict detection (red line), Critical path chain highlight with End Date badge, Baseline save modal and faint baseline comparison bars. Proof in docs/proof/S5.png.
20 Nov 16:25 — S3 DONE: Hours KPI strip for Hourly, Fixed Cost, and Hire Base models, pinned Milestones & Sprints top rows, Expiry date line, and Hire Base contract bands. Proof in docs/proof/S3.png.
20 Nov 16:20 — S1 DONE: Create Issue drawer with Start Date & Due Date side-by-side, date range validation, Issue List tab, panel inline edit, and History logging. Proof in docs/proof/S1.png.
20 Nov 16:15 — S4 DONE: drag body to move Start/Due together, left/right edge resize handles, Unscheduled drawer with search & schedule, sprint-only light bar, Undo toast, History logging in panel. Proof in docs/proof/S4.png.
20 Nov 16:10 — Antigravity's task 1 sample was WRONG (hand-made nav/breadcrumb/tab strip, wrong sidebar prop, grid cut). Krishna fixed it: real project-management sidebar (Tasks active), real breadcrumb + tab strip classes, grid columns fit. src/data/gantt.js was overwritten by Krishna by mistake and restored from the build. S2 NOT DONE yet: calendar does not scroll, bars start before the window are cut, no filters working, not diffed against capture. Stories 1,3–9 NOT built.
20 Nov 15:45 — S2 SAMPLE READY: board page with Gantt tab, 6 rows, 6 bars, today line, toolbar, proof docs/proof/S2.png
20 Nov 16:30 — Yashang: "Mere ko prototype se matlab he" = start now. ag_start.sh failed (no CSRF token in the Antigravity hubs); Yashang pastes the start line into the Antigravity chat opened on this folder.
20 Nov 16:20 — /usage: session 20%, weekly 100% (resets Tue 24 Nov 19:30). Claude is out until then -> Antigravity carries pieces 1–4; brief ready in _team/AG-QUEUE.md; waiting for Yashang's "haan" to start it.
20 Nov 15:55 — stories switched to v2 (9 stories, Yashang "haan"); done lines above changed from 17 to 9.
No Claude? Follow docs/HANDOFF-ANTIGRAVITY.md (any agent can continue from it).
20 Nov 15:05 — (old 17-story file) S8 picture added; superseded by v2 at 15:55.
20 Nov 14:45 — folder made from the kit (port 5250). Waiting for Yashang's "haan" on this plan.
