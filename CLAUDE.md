# Gantt chart prototype — agent rules (opened as its own folder)
All knowledge lives in the PARENT folder `../../` (= CollabCrawl). Read, in order, before any work:
1. `../../CLAUDE.md` and `../../YASHANG-STANDARD.md` (rules), `../../_agent-rules/PROTOTYPE-BUILD.md` (tokens, icons, fields, fidelity gate).
2. `docs/PLAN.md` (this prototype's ticket, done lines, work board) — update its STATUS lines as you go.
3. The stories = the ticket: `../../rnd/gantt-chart/Gantt-Chart-User-Stories.html`; plain text copy: `../../rnd/gantt-chart/_team/stories-v2.txt` (9 stories + Common rules).
   R&D: `../../rnd/gantt-chart/Gantt-Chart-RnD.html`. Live captures: `../../rnd/gantt-chart/_team/evidence/`.
   Layout reference only (never its classes): `../../rnd/gantt-chart/_team/stories-job/pics/gantt.html`.
4. Ask the graph from the parent: `cd ../.. && python3 _graph/kg.py about <words>` / `label <words>` / `module project-mgmt`.
   Components: `../../_design-system/COMPONENT-INVENTORY.md`, `TOKENS.md`, `COMPONENTS.md`.
Stack = the kit (React 18 + Tailwind 4 + Vite), port 5250: `npx vite`. Existing CollabCRM parts are COPIED from captures
(e.g. Week/Month/Quarter + Today = Daily Allocation, `../../modules/project-mgmt/dom/yop_gantt_2026-11-19_16_daily_allocation.html`);
new parts use only CollabCRM classes/tokens/icons and are listed in DIVERGES.md as NEW.
Sample data: made-up foreign names only. Deploy: local first; GitHub link comes from Yashang.
