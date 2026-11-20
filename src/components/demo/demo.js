// PROTOTYPE ONLY — not part of CollabCRM. The state behind the Demo menu: who this tab is "viewing as", and Show notes on/off.
// Made general from prototypes/helpdesk-ticketing/src/role.jsx (BA team brief v2 §7, 8 Oct).
//
// Each prototype describes its own people in src/data/demo.js and calls initDemo(DEMO) once in main.jsx, before rendering.
//   DEMO = {
//     id: 'leave-approval',                       // storage key, one per prototype
//     sides: [                                    // groups in the menu (e.g. customer side / support side)
//       { side: 'Customer side', note: 'staging-app', users: [
//         { as: 'employee', role: 'employee', label: 'Employee', person: { first_name, last_name }, home: '/people/<tenant>/…' },
//       ] },
//     ],
//     notes: { E1: [{ title, source, rule, edge, real }] },   // Show notes pins: <Pin s="E1" n={1} />
//     resetMessage: 'Everything goes back to the starting demo data, in every open tab.',
//     onReset: () => {},                          // the prototype's own data reset
//   }
// `as` is unique per person (employee, employee-2, manager …). `role` is what screens check (several people can share one role).
// The user types here = the sections of docs/ba/07-user-stories.md = the lanes of docs/ba/06-flow.md, one to one.
//
// ?as=<as> opens a tab pinned to one person (sessionStorage), so two people can sit side by side.
// A tab opened without ?as= shares one choice with the other unpinned tabs (localStorage).
import { useSyncExternalStore } from 'react'

let CFG = { id: 'demo', sides: [], notes: {}, resetMessage: '', onReset: () => {} }
let viewerAs = null
let notesOn = false
const subs = new Set()
const emit = () => subs.forEach((f) => f())
const sub = (f) => (subs.add(f), () => subs.delete(f))
const ss = (() => { try { return window.sessionStorage } catch { return null } })()
const ls = (() => { try { return window.localStorage } catch { return null } })()
const k = (name) => `${CFG.id}_${name}`

export const tabPinned = () => { try { return ss?.getItem(k('tab')) === '1' } catch { return false } }
const get = (name, d) => { try { return (tabPinned() ? ss.getItem(k(name)) ?? ls.getItem(k(name)) : ls.getItem(k(name))) ?? d } catch { return d } }
const put = (name, v) => { try { (tabPinned() ? ss : ls).setItem(k(name), v) } catch { /* no storage: keep in memory only */ } }

export const allUsers = () => CFG.sides.flatMap((s) => s.users)
export const demoConfig = () => CFG
export const fullName = (p) => [p?.first_name, p?.last_name].filter(Boolean).join(' ')

export function initDemo(config) {
  CFG = { ...CFG, ...config }
  const users = allUsers()
  try {
    const u = new URL(window.location.href); const as = u.searchParams.get('as')
    const hit = users.find((x) => x.as === as)
    if (hit) {
      ss.setItem(k('tab'), '1'); ss.setItem(k('viewer'), hit.as)
      u.searchParams.delete('as')
      window.history.replaceState(null, '', (u.pathname === '/' ? hit.home : u.pathname) + (u.search || ''))
    }
  } catch { /* no storage → shared behaviour */ }
  viewerAs = get('viewer', users[0]?.as)
  if (!users.some((x) => x.as === viewerAs)) viewerAs = users[0]?.as
  notesOn = get('notes', '0') === '1'
}

export function setViewer(as) { viewerAs = as; put('viewer', as); emit() }
export function useViewer() {
  const as = useSyncExternalStore(sub, () => viewerAs)
  const u = allUsers().find((x) => x.as === as) || allUsers()[0]
  return u ? { ...u, role: u.role || u.as } : null
}

export function setNotes(on) { notesOn = on; put('notes', on ? '1' : '0'); emit() }
export function useNotes() { return useSyncExternalStore(sub, () => notesOn) }

export function resetDemo() { try { CFG.onReset?.() } finally { emit() } }
