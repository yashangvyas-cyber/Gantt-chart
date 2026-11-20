// Assign / Reassign modal. Shell = cc/Modal (copied), the person field = cc/Field SelectField + Select (copied); every class string comes from
// those primitives. Moved from prototypes/helpdesk-ticketing/src/components/super/AssignModal.jsx (18 Nov 2026), made general: no ticket data.
// Capture of the Select control string css-1d2ikgd-control: modules/admin/dom/helpdesk_add_ticket_drawer_2026-10-05.html.
// options = ['Jason Doe · 3 open', …]   reasonLabel = ask for a reason too (Reassign)   onConfirm(option, reason)
import { useState } from 'react'
import Modal from './Modal.jsx'
import { SelectField, Textarea } from './Field.jsx'
import Select from '../Select.jsx'

export default function AssignModal({ title = 'Assign', label = 'Assign To', options, confirmLabel = 'Assign', reasonLabel, onConfirm, onClose }) {
  const [pick, setPick] = useState('')
  const [why, setWhy] = useState('')
  const go = () => { if (!pick) return; onConfirm(pick, why.trim()); onClose() }
  return (
    <Modal title={title} onClose={onClose} onConfirm={go} confirmLabel={confirmLabel} confirmDisabled={!pick || (reasonLabel && !why.trim())}>
      <SelectField label={label} required>
        <Select value={pick} options={options} placeholder="Select" onChange={setPick} width="100%" controlCls="css-1d2ikgd-control" id={20} />
      </SelectField>
      {reasonLabel && <div className="mt-4"><Textarea label={reasonLabel} required rows={3} value={why} onChange={(e) => setWhy(e.target.value)} /></div>}
    </Modal>
  )
}
