# Gantt prototype — how to finish it WITHOUT Claude (Antigravity, or any other AI agent)
Written 20 Nov 2026 for the case "Claude limit is over". Any agent can follow this file from top to bottom.

## 0. Before anything
- Read `CLAUDE.md` (this folder), then `../../CLAUDE.md`, `../../YASHANG-STANDARD.md`, `../../_agent-rules/PROTOTYPE-BUILD.md`.
- Read `docs/PLAN.md`: the 9 done lines and the STATUS list. Continue from the first story that is not "DONE" in STATUS.
- The ticket = the stories: `../../rnd/gantt-chart/Gantt-Chart-User-Stories.html` (9 stories; plain text copy: `../../rnd/gantt-chart/_team/stories-v2.txt`).
- Start the app: in this folder run `npx vite` → http://localhost:5250

## 0b. HARD RULES (20 Nov, after task 1 was rejected: hand-made sidebar, breadcrumb and tab strip marked "COPIED")
- Never write "COPIED" unless the class string was pasted from a capture slice (grep it, show the grep line in your log). No capture found -> write "NEW" and list it in DIVERGES.md.
- Sidebar, header, breadcrumb, tab strip = `AppShell` + `src/data/portal_nav.js` items + the strings already in `src/pages/GanttBoard.jsx` (copy from there). AppShell props are `portal`, `nav`, `active` (not activeLabel).
- Never overwrite a file you did not create (check `ls -la` first). Grid column widths must add up to the grid width; check the screenshot at 1440x900 for cut text.
- After each story: screenshot at 1440x900 and LOOK at it. Cut text, wrong colours, a missing bar = not done. Krishna looks at the screenshot before the next story starts.

## 1. Order (one story at a time; never start the next before the current one passes step 3)
Story 2 → 4 → 1 → 3 → 5 → 6 → 7 → 8 → 9 (the "Common rules" page is part of every story)

## 2. How to build one story
1. Read that story's Steps, Field Values and Validations. Every step must be clickable in the prototype.
2. Parts WITHOUT a [NEW] tag already exist in CollabCRM: copy them from the captures, never draw them from memory.
   Find them from the parent folder: `cd ../.. && python3 _graph/kg.py label <words on screen>` (or `about <words>`),
   then open only the matching slice of the capture file with grep (never read a whole capture file).
   Example: Week / Month / Quarter + Today = `../../modules/project-mgmt/dom/yop_gantt_2026-11-19_16_daily_allocation.html`.
3. Parts WITH [NEW] are new: use only CollabCRM classes, colours and `icon-*` names from `../../_design-system/TOKENS.md`
   and `COMPONENTS.md`. Write each new part in `DIVERGES.md` as "NEW: <part> (S<n>)".
4. Labels, messages and values = copied word for word from stories.md. Bar colours: To Do #2B83DE, In Progress #F7A23A,
   In Review #E23333, Ready For QA #7EC451, Closed #696969.
5. Sample data: made-up foreign names only (Emma Clark, Liam Brooks style). No real people, no Indian names.
6. Layout idea only (not classes): `../../rnd/gantt-chart/_team/stories-job/pics/gantt.html` and `gantt_baseline.html`.

## 3. Check one story (it is DONE only when all four pass)
a. `npm run build` ends without errors.
b. Open localhost:5250 in the browser and do every step of the story by hand, in order. Each step shows what the story says.
c. Save one screenshot per story: `docs/proof/S<n>.png`.
d. Write in `docs/PLAN.md` under STATUS: "<date time> — S<n> DONE: steps 1–N clicked, proof docs/proof/S<n>.png".
   A step that does not work → "S<n> NOT DONE: step <k> — <what happens>". Two failed tries → mark it and go to the next story.

## 4. Pictures
The stories file already has its pictures. Save proof screenshots in docs/proof/ only.

## 5. Never without Yashang's OK
git push, GitHub, Vercel deploy, deleting files outside this folder. Ask him, then do it.

## 6. When all 9 are DONE
Tell Yashang: "9 of 9 DONE, proof in docs/proof/". When Claude is back, he says "Krishna, review Gantt prototype"
for the final check (fidelity vs captures + gate).
