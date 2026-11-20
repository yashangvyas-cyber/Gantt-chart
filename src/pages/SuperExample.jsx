// KIT: Super Admin shell + left record panel (CRM Deal-details pattern) + table, on sample rows (route /super). Not part of the product.
import SuperShell from '../components/super/SuperShell.jsx'
import { Panel, PanelHead, Section, Label, Value } from '../components/super/record.jsx'
import DataTable from '../components/cc/DataTable.jsx'
import StatusPill from '../components/cc/StatusPill.jsx'
import { SEED, STATUS } from '../data/sample.js'

export default function SuperExample() {
  const columns = [
    { key: 'ticket_id', label: 'ID' },
    { key: 'subject', label: 'Subject', sortable: true },
    { key: 'status', label: 'Status', render: (r) => <StatusPill label={STATUS[r.status][1]} family={STATUS[r.status][2]} /> },
  ]
  return (
    <SuperShell active="Customers" crumbs={[{ label: 'Customers' }]}>
      <div className="flex h-full">
        <Panel>
          <PanelHead id="CUS-12" pill="Active" family="success">Sample customer</PanelHead>
          <Section><Label first>Plan</Label><Value>Growth</Value><Label>Owner</Label><Value>Smit Patel</Value></Section>
        </Panel>
        <div className="grow 2xl:p-4 p-3 bg-gray-100 overflow-auto"><DataTable columns={columns} rows={SEED.slice(0, 10)} total={10} /></div>
      </div>
    </SuperShell>
  )
}
