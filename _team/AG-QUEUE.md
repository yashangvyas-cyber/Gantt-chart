# Antigravity queue — Gantt prototype (working folder: this folder, port 5250)
Rules: read docs/HANDOFF-ANTIGRAVITY.md first and follow it. One task at a time. After each task: write its STATUS line in docs/PLAN.md and a bare line DONE-<n> at the end of _team/LOG.md. Corrections come in _team/FIXES.md: read it before every task.
Sample first: for task 1 make ONLY the sample (board page with the Gantt tab, 6 rows, 6 bars, today line, toolbar), then STOP and write "SAMPLE READY" in _team/LOG.md. Continue only after Krishna writes "GO" in _team/FIXES.md.

## TASK 1 — shared skeleton (Story 2 + Common rules) — ticket: ../../rnd/gantt-chart/_team/stories-v2.txt, "Common rules" and "Story 2"
1. Board page = copy of ../../modules/project-mgmt/dom/yop_gantt_2026-11-19_09_board.html (grep the slice; never read the whole file). Tabs in this order: Board, Issue List, Backlog, Completed Sprints, Gantt (NEW), Notification Settings.
2. Gantt tab: left grid (Type icon, Key, Title, Assignee, Start Date, Due Date) + calendar with one bar per issue; today line; past-due red outline + dashed part to today line; weekends shaded; Epic summary bar; Add Child -> Sub-Task rows with collapse arrow; click a row opens the issue panel (copy of ..._14_issue_detail.html).
3. ONE toolbar, left to right: Sprint, Group by, Type | Week, Month, Quarter, Today | Critical path, Baseline, Unscheduled | Share. Week/Month/Quarter/Today = copy of ..._16_daily_allocation.html. Filter chips + "Clear all".
4. Bar colours by status: To Do #2B83DE, In Progress #F7A23A, In Review #E23333, Ready For QA #7EC451, Closed #696969.
5. Hover card on every bar: status, Start Date, Due Date, Logged Time against Estimated Time.
6. Undo toast component "Dates updated" + Undo link, 10 seconds (used from task 2).
7. Sample data in src/data/gantt.js: made-up foreign names (Emma Clark, Liam Brooks style); API field names copied from ../../modules/project-mgmt/api/ captures; dates DD-MMM-YYYY.
8. Every NEW part: first line `// DIVERGES: NEW — modelled on <closest CollabCRM component>` + a row in DIVERGES.md. Only classes/colours/icon-* from ../../_design-system/TOKENS.md and the captures.
Proof: `npm run build` OK + screenshot docs/proof/S2.png.
## TASK 2 — Story 4 then Story 1 (HANDOFF order). TASK 3 — Story 3 then Story 5. Briefs: the story text in stories-v2.txt; same rules as task 1.
