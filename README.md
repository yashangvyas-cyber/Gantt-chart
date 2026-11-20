# CollabCRM prototype kit

Every CollabCRM prototype starts from here, so all prototypes share the same copied components.
Every class string is copied from the CollabCRM crawl (`modules/*/dom`, `_design-system/catalogue.json`), never from another prototype.
`python3 _tools/check_kit.py` proves it: it lists every kit class that no CollabCRM capture contains.
Setup: React 18, react-router 6, Tailwind 4, Vite 5. The real app's breakpoints (`2xl:` / `2xl-to-xl:` / base) are in `src/index.css`.

## Start a prototype
```bash
bash _kit/new_prototype.sh my-feature 5210      # → prototypes/my-feature, installed, port 5210
cd prototypes/my-feature && npx vite
```
- `/` lists everything. `/portal/<slug>` = each portal's shell with its real sidebar (people, sales-crm, project-management, recruitment, reports, payroll, administration). `/super` = Super Admin shell. `/patterns?tab=…` = every pattern variant seen in CollabCRM, with the capture to copy from. `/components` = the kit components.
- Replace the kit pages (Portals, Patterns, Catalogue, SuperExample) and `src/data/sample.js` with your real screens and data. Field names come from the screen's API capture.
- `vercel.json` is already there, so deep links and refresh work on Vercel.

## Find a component first
`python3 _graph/kg.py control` lists every control CollabCRM screens show and the kit piece that draws it; `kg.py control kanban`
gives the captures and the kit file. 18 Nov 2026: Kanban, FileRow, RichText, ViewSwitch, AssignModal, SettingsPage, Widget
(from helpdesk-ticketing) and `super/list.jsx` (Super Admin list pieces, from trial-activity) joined the kit; `/components` shows them.

## Rules
1. Use a kit component whenever one fits. Never retype its class strings.
2. Something the kit does not have: copy it from the capture (`python3 _tools/extract_screen.py <module> <screen>`), and say where it came from in a comment on the first line.
   Something CollabCRM does not have at all: you **may create it** without waiting (BA, 8 Oct 2026 — brief v2 Rule 7b), but never hidden:
   - start from the closest CollabCRM component and name it; use only class names found in the crawl, colours from `_design-system/TOKENS.md` / `LIVE-COLOR-SCALES.md`, real `icon-*` names and the responsive triple;
   - first line: `// DIVERGES: NEW — modelled on <closest CollabCRM component>`; a row in `docs/ba/changes.md` (layer NEW COMPONENT); a Show-notes pin;
   - listed at Stop C. It joins the kit only after the BA says yes.
3. Every screen and every tab gets its own URL (`useSearchParams`, e.g. `?tab=team`).
4. Prototype-only controls (a demo role switch and so on) go in the shells' `topRight` slot, never inside the real header.
5. A component fixed in a prototype that is not tied to that feature: copy the fix back here.

## Demo menu (role switching) — every prototype with more than one user type
- `components/demo/DemoMenu.jsx` + `demo.js` + `Pin.jsx`, made general from `prototypes/helpdesk-ticketing/src/role.jsx`. PROTOTYPE ONLY.
- Describe this prototype's people in `src/data/demo.js` (made-up names; `as`, `role`, `label`, `person`, `home`), then `initDemo(DEMO)` in `main.jsx` (already there).
- Put `<DemoMenu />` in the shell's `topRight` slot (rule 4). Screens read `useViewer().role` to show only what that person can see.
- `?as=<as>` opens one person in a new tab, so two people sit side by side. Show notes = `<Pin s="E1" n={1} />` with text in `DEMO.notes`, off by default. Reset demo data calls `DEMO.onReset`.
- The user types in the menu = the sections of `docs/ba/07-user-stories.md` = the lanes of `docs/ba/06-flow.md`.

## Check a screen
```bash
npx vite build
node scripts/dump.cjs http://localhost:5210/<route> /tmp/built.html
python3 ../../_tools/verify_fidelity.py /tmp/built.html <module> <screen>     # 95%+ = pass
python3 ../../_tools/check_kit.py .                                               # every class + icon exists in CollabCRM (exit 1 = fail)
```

## Keep it live
After any re-crawl: `python3 _tools/extract_nav.py && python3 _tools/kit_patterns.py && python3 _tools/check_kit.py`.

## Components (first line of each file = where it was copied from)
| File | Source |
|---|---|
| `AppShell.jsx` | App shell reproduced from the crawled DOM of |
| `ConfirmDialog.jsx` | — |
| `Icon.jsx` | CollabCRM's icons are an IcoMoon font. The real font + the 1301 icon-* |
| `Select.jsx` | Reproduces react-select's rendered DOM exactly as it appears in the crawled page — same css-* hashes, same react-select__* class names. |
| `cc/Avatar.jsx` | COPIED from the initials avatar in modules/super-admin/dom/users_list.html. Background is an inline rgb(), as in the real DOM: |
| `cc/Button.jsx` | COPIED from the Cancel / Submit buttons of modules/admin/dom/helpdesk_add_ticket_drawer_2026-10-05.html (class strings verbatim, |
| `cc/Chips.jsx` | COPIED from CATALOGUE.md → Tab Strips, variant 2 (Open / Draft / Close): the one-of-many pill buttons. |
| `cc/DataTable.jsx` | COPIED from the table + footer of modules/admin/dom/helpdesk_add_ticket_drawer_2026-10-05.html |
| `cc/Drawer.jsx` | COPIED from modules/admin/dom/helpdesk_add_ticket_drawer_2026-10-05.html (spec: admin__helpdesk_add_ticket_drawer_2026-10-05.md) |
| `cc/EmptyState.jsx` | COPIED from the "No Comments added yet." block of modules/people/dom/rsp_tabs_support_ticket_view_02_comments_0_2026-09-25.html |
| `cc/Field.jsx` | COPIED from the Module / Subject / Details / Priority fields of modules/admin/dom/helpdesk_add_ticket_drawer_2026-10-05.html |
| `cc/FilterBar.jsx` | The list filter bar of People › Employees / Exit Management (FIX-LIST R2). COPIED, class strings verbatim, from |
| `cc/InfoTip.jsx` | COPIED: the ⓘ = class string in modules/crm-invoice/dom/goals_tracker.html (14 captures). The dark box = CollabCRM's react-tooltip (445 captures): |
| `cc/KpiCard.jsx` | — |
| `cc/Modal.jsx` | COPIED from src/components/ConfirmDialog.jsx (itself copied from modules/project-mgmt/dom/c2_row_action.html): |
| `cc/PageFrame.jsx` | COPIED from modules/admin/dom/helpdesk_add_ticket_drawer_2026-10-05.html: the breadcrumb bar (home icon › current page) and the |
| `cc/PillStrip.jsx` | COPIED from the "My Tickets / Assigned To Me" strip of modules/people/dom/rsp_tabs_support_ticket_view_01_view_request_2026-09-25.html |
| `cc/PillTabs.jsx` | COPIED from the drawer header of modules/people/dom/rsp_tabs_support_ticket_view_01_view_request_2026-09-25.html |
| `cc/PriorityIcon.jsx` | COPIED from the Priority cell of modules/admin/dom/helpdesk_add_ticket_drawer_2026-10-05.html |
| `cc/Radio.jsx` | COPIED from the radio group of modules/crm-invoice/dom/contacts_add.html (label.radio-label > hidden input + span.checkmark + p), |
| `cc/StatusPill.jsx` | COPIED: the Status cell pill of modules/admin/dom/helpdesk_add_ticket_drawer_2026-10-05.html (outer + dot markup verbatim). |
| `cc/Toggle.jsx` | COPIED from CATALOGUE.md → Toggle Switches (modules/payroll/dom/cfg_loan_edit_rsp.html …): outer box, hidden checkbox, label track, white knob. |
| `cc/Upload.jsx` | COPIED from the "Upload File" block of modules/admin/dom/helpdesk_add_ticket_drawer_2026-10-05.html |
| `super/SuperShell.jsx` | Super Admin shell. Every class string below is COPIED from |
| `super/TabStrip.jsx` | The Open | Closed | Cancelled tab strip of modules/super-admin/dom/support_tickets.html, extended to N tabs. |
| `super/record.jsx` | Record page = CRM › Deals › Deal Details (modules/crm-invoice/dom/deals_id_details.html, spec docs/specs/crm-invoice__deals_id_details.md). |
| `demo/DemoMenu.jsx`, `demo/demo.js`, `demo/Pin.jsx` | PROTOTYPE ONLY: Demo menu + Show notes, from prototypes/helpdesk-ticketing/src/role.jsx and Pin.jsx |
| `super/ui.jsx` | Real-string vocabulary for the Super Admin helpdesk pages. EVERY class string in this file is an EXACT string that occurs in the crawled |
