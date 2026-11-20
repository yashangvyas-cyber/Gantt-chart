// PROTOTYPE ONLY: the people in the Demo menu (components/demo/). Replace with this prototype's user types.
// Made-up names only — never real people (no real names or e-mails in prototypes).
// The user types here = the sections of docs/ba/07-user-stories.md = the lanes of docs/ba/06-flow.md, one to one.
export const DEMO = {
  id: 'kit',
  sides: [
    { side: 'Customer side', note: 'staging-app', users: [
      { as: 'employee', role: 'employee', label: 'Employee', person: { first_name: 'Riya', last_name: 'Mehta' }, home: '/portal/people' },
      { as: 'employee-2', role: 'employee', label: 'Employee', person: { first_name: 'Arjun', last_name: 'Nair' }, home: '/portal/people' },
      { as: 'manager', role: 'manager', label: 'Manager', person: { first_name: 'Kavya', last_name: 'Rao' }, home: '/portal/people' },
      { as: 'company_admin', role: 'company_admin', label: 'Company Admin', person: { first_name: 'Dev', last_name: 'Patel' }, home: '/portal/administration' },
    ] },
    { side: 'Support side', note: 'staging-admin', users: [
      { as: 'super_admin', role: 'super_admin', label: 'Super Admin', person: { first_name: 'Neha', last_name: 'Joshi' }, home: '/super' },
    ] },
  ],
  notes: {
    K1: [{ title: 'Demo menu', source: 'Kit: components/demo/.', rule: 'Each prototype lists its own people in src/data/demo.js.', edge: 'A tab opened with ?as= stays on that person.', real: 'Prototype only. Not part of CollabCRM.' }],
  },
  resetMessage: 'Everything goes back to the starting demo data, in every open tab.',
  onReset: () => { try { window.localStorage.clear() } catch { /* ignore */ } window.location.reload() },
}
