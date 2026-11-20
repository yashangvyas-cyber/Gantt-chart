// KIT: every primitive in src/components/cc/ on one page (route /components). Not part of the product.
// Rows are sample data (src/data/sample.js). ?open=drawer | modal | tabs shows the overlay primitives.
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import AppShell from '../components/AppShell.jsx'
import Select from '../components/Select.jsx'
import { ADMIN_NAV } from '../data/nav.js'
import { SEED, STATUS, moduleLabel } from '../data/sample.js'
import Drawer from '../components/cc/Drawer.jsx'
import KpiCard from '../components/cc/KpiCard.jsx'
import DataTable from '../components/cc/DataTable.jsx'
import StatusPill from '../components/cc/StatusPill.jsx'
import PriorityIcon from '../components/cc/PriorityIcon.jsx'
import PillTabs from '../components/cc/PillTabs.jsx'
import Field, { Textarea, SelectField } from '../components/cc/Field.jsx'
import Chips from '../components/cc/Chips.jsx'
import Upload from '../components/cc/Upload.jsx'
import Modal from '../components/cc/Modal.jsx'
import EmptyState from '../components/cc/EmptyState.jsx'
import Button from '../components/cc/Button.jsx'
import Avatar from '../components/cc/Avatar.jsx'
// 18 Nov 2026 — moved in from prototypes/helpdesk-ticketing and prototypes/trial-activity (knowledge graph step 4)
import Kanban from '../components/cc/Kanban.jsx'
import ViewSwitch from '../components/cc/ViewSwitch.jsx'
import FileRow, { FileLabel } from '../components/cc/FileRow.jsx'
import RichText from '../components/cc/RichText.jsx'
import AssignModal from '../components/cc/AssignModal.jsx'
import { Widget, WidgetTable, Legend } from '../components/cc/Widget.jsx'
import { PeopleMultiSelect } from '../components/Select.jsx'
import { Badge, RecordsPill, PagedFooter, SegmentToggle } from '../components/super/list.jsx'

// DIVERGES: /dev/cc showcase-only wrappers (H section heading spacing, BOX white card) — no real string exists for "a labelled box of primitives".
const H = ({ children }) => <div className="pt-6"><p className="font-semibold text-gray-900 2xl:text-lg 2xl-to-xl:text-base text-base">{children}</p></div>
const BOX = 'bg-white rounded-xl border p-4'
const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const when = (iso) => { const d = new Date(iso); const h = d.getHours() % 12 || 12; return `${String(d.getDate()).padStart(2, '0')}-${MON[d.getMonth()]}-${d.getFullYear()}, ${String(h).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')} ${d.getHours() < 12 ? 'AM' : 'PM'}` }
const name = (r) => `${r.requested_by_details?.first_name ?? ''} ${r.requested_by_details?.last_name ?? ''}`.trim()

export default function Catalogue() {
  const [sp] = useSearchParams()
  const [open, setOpen] = useState(sp.get('open'))
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [chip, setChip] = useState('Only me')
  const [tab, setTab] = useState(open === 'tabs' ? 'comments' : 'view')
  const [view, setView] = useState('Kanban')
  const [seg, setSeg] = useState('self')
  const [pp, setPp] = useState(1)
  const [people, setPeople] = useState(['Jason Doe'])
  const [board, setBoard] = useState([
    { id: 'T-1', title: 'Payslip PDF shows the old logo', status: 'open', who: { first_name: 'Jason', last_name: 'Doe' }, priority: 'high' },
    { id: 'T-2', title: 'Leave balance after carry forward', status: 'open', priority: 'medium' },
    { id: 'T-3', title: 'Export of the attendance report', status: 'done', who: { first_name: 'Emma', last_name: 'Stone' }, priority: 'low' },
  ])
  const rows = SEED.slice((page - 1) * perPage, page * perPage)

  const columns = [
    { key: 'no', label: 'No.', narrow: true, render: (_r, i) => <p className="text-gray-900 max-w-[160px] truncate font-medium line-clamp1">{(page - 1) * perPage + i + 1}</p> },
    { key: 'ticket_id', label: 'ID', render: (r) => <p className="text-gray-900 max-w-[160px] truncate font-medium line-clamp1">{r.ticket_id}</p> },
    { key: 'subject', label: 'Subject', sortable: true, render: (r) => (
      <div className="max-w-[200px]"><div className="flex min-w-0 gap-x-3"><div className="min-w-0 flex-auto w-[200px]">
        <p className=" line-clamp-1 break-words text-wrap truncate 2xl:text-sm 2xl-to-xl:text-xs text-xs leading-5 text-gray-600" title={r.subject}>{r.subject}</p>
      </div></div></div>) },
    { key: 'module', label: 'Module', sortable: true, render: (r) => <p className="truncate 2xl:text-sm 2xl-to-xl:text-xs text-xs leading-5 text-gray-600 capitalize">{moduleLabel(r.module)}</p> },
    { key: 'status', label: 'Status', sortable: true, render: (r) => <StatusPill label={STATUS[r.status]?.[1]} family={STATUS[r.status]?.[2]} /> },
    { key: 'priority', label: 'Priority', sortable: true, render: (r) => <PriorityIcon priority={r.priority} /> },
    { key: 'requested_by', label: 'Requested by', sortable: true, render: (r) => (
      <div className="inline-block w-[190px] break-all text-wrap line-clamp1 text-gray-600 font-normal"><div className="capitalize 2xl:text-sm 2xl-to-xl:text-xs text-xs">
        <p title={name(r)} className="truncate max-w-full 2xl:text-sm 2xl-to-xl:text-xs text-xs">{name(r)}</p>
        <p className="2xl:text-sm 2xl-to-xl:text-xs text-xs block">{when(r.created_at)}</p>
      </div></div>) },
  ]

  return (
    <AppShell portal="administration" nav={ADMIN_NAV} active="Help Center">
      <div className="2xl:p-4 p-3 w-full bg-gray-100 overflow-x-auto customScrollbar 2xl:h-[calc(100vh-98px)] 2xl-to-xl:h-[calc(100vh-88px)] h-[calc(100vh-88px)]">
        <div className="grid grid-cols-3 gap-3 w-full 2xl:pb-5 pb-4">
          <KpiCard label="Total Records" value={SEED.length} onAdd={() => setOpen('drawer')} />
          <KpiCard label="Open" value={SEED.filter((t) => t.status === 'open').length} />
          <KpiCard label="Closed" value={SEED.filter((t) => t.status === 'closed').length} />
        </div>

        <DataTable columns={columns} rows={rows} total={SEED.length} page={page} perPage={perPage} onPage={setPage} onPerPage={(n) => { setPerPage(n); setPage(1) }}
          actions={() => <span className="icon-eye cursor-pointer" />} />

        <H>StatusPill · PriorityIcon · Avatar</H>
        <div className={`${BOX} flex flex-wrap items-center gap-6`}>
          {Object.entries(STATUS).map(([k, v]) => <StatusPill key={k} label={v[1]} family={v[2]} />)}
          {['high', 'medium', 'low'].map((p) => <PriorityIcon key={p} priority={p} />)}
          {['Bansari Thakkar', 'Smit Thakkar', 'Vivek Gohel'].map((n) => <Avatar key={n} name={n} />)}
        </div>

        <H>Field · SelectField · Chips · Upload</H>
        <div className={`${BOX} w-[560px]`}>
          <SelectField label="Module" required>
            <Select value="People" options={['People', 'CRM']} width="100%" controlCls="css-1d2ikgd-control" id={2} defaultOpen={sp.get('open') === 'select'} />
          </SelectField>
          <div className="pt-6"><Field label="Subject" required maxLength={50} /></div>
          <div className="pt-6"><Chips options={['Only me', 'My team', 'Whole company']} value={chip} onChange={setChip} /></div>
          <div className="pt-6"><Upload /></div>
          <div className="pt-6"><Textarea label="Details" required /></div>
        </div>

        <H>EmptyState</H>
        <div className="bg-white border border-gray-200 rounded-t-lg border-b-0"><EmptyState /></div>

        <H>Drawer · Modal</H>
        <div className="flex gap-3">
          <Button onClick={() => setOpen('drawer')}>Open Drawer</Button>
          <Button variant="white" onClick={() => setOpen('modal')}>Open Modal</Button>
          <Button variant="white" onClick={() => setOpen('tabs')}>Open Tabs Drawer</Button>
        </div>

        <H>From the prototypes (18 Nov 2026) · ViewSwitch · Kanban</H>
        <div className={BOX}>
          <ViewSwitch view={view} onChange={setView} />
          <Kanban columns={[{ key: 'open', label: 'Open', color: 'rgb(68, 76, 231)' }, { key: 'done', label: 'Done', color: 'rgb(23, 178, 106)' }]}
            rows={board} card={(r) => ({ id: r.id, title: r.title, person: r.who, priority: r.priority, code: r.id })}
            move={(r, k) => setBoard((b) => b.map((x) => (x.id === r.id ? { ...x, status: k } : x)))} />
        </div>

        <H>FileRow · RichText · PeopleMultiSelect · AssignModal</H>
        <div className={`${BOX} w-[560px]`}>
          <FileLabel /><FileRow file="offer-letter.pdf" />
          <RichText html="<p>Write the reply here</p>" />
          <div className="pt-6"><PeopleMultiSelect values={people} options={['Jason Doe', 'Emma Stone', 'Liam Carter']} onChange={setPeople} /></div>
          <div className="pt-6"><Button variant="white" onClick={() => setOpen('assign')}>Open Assign</Button></div>
        </div>

        <H>Widget · WidgetTable · Legend</H>
        <Widget title="Tickets by module" info="How many tickets each module received">
          <Legend items={[['Open', '#6172f3'], ['Closed', '#17b26a']]} flat />
          <WidgetTable heads={['Module', 'Open', 'Closed']} rows={[['People', 4, 9], ['Payroll', 2, 5]]} />
        </Widget>

        <H>Super Admin list pieces · Badge · RecordsPill · SegmentToggle · PagedFooter</H>
        <div className={`${BOX} flex flex-wrap items-center gap-6`}>
          <Badge tone="gray">Trial</Badge>
          <RecordsPill from={1} to={10} total={42} noun="Customers" />
          <SegmentToggle value={seg} onChange={setSeg} options={[['self', 'Self'], ['org', 'Organization']]} />
        </div>
        <PagedFooter page={pp} pages={5} onPage={setPp} />
      </div>

      {open === 'drawer' && (
        <Drawer title="Add Record" onClose={() => setOpen(null)}>
          <SelectField label="Module" required><Select value="People" options={['People', 'CRM']} width="100%" controlCls="css-1d2ikgd-control" id={2} /></SelectField>
          <div className="pt-6"><Field label="Subject" required maxLength={50} /></div>
          <div className="pt-6"><Upload /></div>
          <div className="pt-6"><Textarea label="Details" required /></div>
        </Drawer>
      )}
      {open === 'tabs' && (
        <Drawer title={<PillTabs tabs={[{ key: 'view', label: 'View Request' }, { key: 'comments', label: 'Comments (0)' }]} active={tab} onChange={setTab} />} onClose={() => setOpen(null)}>
          {tab === 'comments' ? <EmptyState /> : <p className="text-gray-600 2xl:text-sm 2xl-to-xl:text-xs text-xs">{SEED[0].subject}</p>}
        </Drawer>
      )}
      {open === 'assign' && <AssignModal title="Assign ticket" label="Agent" options={['Jason Doe · 3 open', 'Emma Stone · 1 open']} onConfirm={() => {}} onClose={() => setOpen(null)} />}
      {open === 'modal' && (
        <Modal title="Sample modal" onClose={() => setOpen(null)} onConfirm={() => setOpen(null)} confirmLabel="Submit">
          <Textarea label="Details" required rows={3} />
        </Modal>
      )}
    </AppShell>
  )
}
