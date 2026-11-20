// Step 7 check page (18 Nov 2026): every captured dropdown state — live screenshot (left) beside the kit (right).
// Option text: fixed app values are copied (Status, Records per page, Σ modes); people / tenant records get neutral sample text.
import { LiveSelect, LivePrimeMulti } from '../../components/Dropdowns.jsx'
import { DD } from '../../data/dropdownLive.js'

const SAMPLE = (n, f) => Array.from({ length: n }, (_, i) => f(i + 1))
const opts = (k, st = 'open') => DD[k].opts[st]?.text || DD[k].opts.open?.text || DD[k].opts.hover?.text
const SIGMA = (o) => DD.filter.opts.nomatch.inner[DD.filter.opts.nomatch.text.indexOf(o)] || o
const FORM_OPTS = SAMPLE(20, (i) => `Option ${i}`)
const PEOPLE = SAMPLE(19, (i) => `Sample Person ${i} (YO-${100 + i})`)
const BU = SAMPLE(12, (i) => `Business Unit ${i}`)
const MAILS = SAMPLE(11, (i) => `sender${i}@example.com`)

const CELLS = [
  ['form', 'closed', <LiveSelect variant="form" options={FORM_OPTS} />],
  ['form', 'open', <LiveSelect variant="form" options={FORM_OPTS} forceOpen hoverIndex={0} />],
  ['form', 'hover', <LiveSelect variant="form" options={FORM_OPTS} forceOpen hoverIndex={0} />],
  ['form', 'value', <LiveSelect variant="form" options={FORM_OPTS} value="Option 3" />],
  ['form', 'valueopen', <LiveSelect variant="form" options={FORM_OPTS} value="Option 1" forceOpen hoverIndex={0} />],
  ['form', 'nomatch', <LiveSelect variant="form" options={FORM_OPTS} forceOpen forceInput="zzqx" />],
  ['disabled', 'disabled', <LiveSelect variant="form" disabled options={[]} />],
  ['status', 'closed', <LiveSelect variant="status" options={opts('status')} />],
  ['status', 'open', <LiveSelect variant="status" options={opts('status')} forceOpen hoverIndex={0} />],
  ['status', 'hover', <LiveSelect variant="status" options={opts('status')} forceOpen hoverIndex={0} />],
  ['pagesize', 'closed', <LiveSelect variant="pagesize" options={opts('pagesize')} value="25" />],
  ['pagesize', 'open', <LiveSelect variant="pagesize" options={opts('pagesize')} value="25" forceOpen hoverIndex={0} />],
  ['pagesize', 'hover', <LiveSelect variant="pagesize" options={opts('pagesize')} value="25" forceOpen hoverIndex={0} />],
  ['filter', 'closed', <LiveSelect variant="filter" options={opts('filter', 'nomatch')} value="Look-up Filter" />],
  ['filter', 'nomatch', <LiveSelect variant="filter" options={opts('filter', 'nomatch')} value="Look-up Filter" forceOpen hoverIndex={0} menuInner={SIGMA} />],
  ['pm', 'closed', <LiveSelect variant="pm" options={opts('pm', 'nomatch')} value="Look-up Filter" />],
  ['pm', 'nomatch', <LiveSelect variant="pm" options={opts('pm', 'nomatch')} value="Look-up Filter" forceOpen hoverIndex={0} menuInner={SIGMA} />],
  ['table', 'closed', <LiveSelect variant="table" options={MAILS} value={MAILS[0]} />],
  ['table', 'open', <LiveSelect variant="table" options={MAILS} value={MAILS[1]} forceOpen hoverIndex={0} />],
  ['table', 'hover', <LiveSelect variant="table" options={MAILS} value={MAILS[1]} forceOpen hoverIndex={0} />],
  ['multi', 'closed', <LiveSelect variant="multi" options={PEOPLE} value={PEOPLE.slice(0, 2)} />],
  ['multi', 'open', <LiveSelect variant="multi" options={PEOPLE.concat(['x1', 'x2'])} value={PEOPLE.slice(0, 2)} forceOpen hoverIndex={0} />],
  ['multi', 'hover', <LiveSelect variant="multi" options={PEOPLE.concat(['x1', 'x2'])} value={PEOPLE.slice(0, 2)} forceOpen hoverIndex={0} />],
  ['multi', 'nomatch', <LiveSelect variant="multi" options={PEOPLE} value={PEOPLE.slice(0, 2)} forceOpen forceInput="zzqx" />],
  ['prime', 'closed', <LivePrimeMulti options={BU} values={[]} width={200} />],
  ['prime', 'open', <LivePrimeMulti options={BU} values={[]} width={200} forceOpen />],
  ['prime', 'hover', <LivePrimeMulti options={BU} values={[]} width={200} forceOpen hoverIndex={1} />],
  ['prime', 'value', <LivePrimeMulti options={BU} values={['2342342342424']} width={200} />],
]

export default function CheckDropdowns() {
  return (
    <div className="bg-white p-4" style={{ fontFamily: 'Inter, sans-serif' }}>
      <h1 className="text-lg font-semibold text-gray-900 mb-4">Dropdowns: live (left) and kit (right), 18 Nov 2026</h1>
      {CELLS.map(([k, s, el]) => (
        <div key={k + s} className="flex gap-6 items-start border-b border-gray-200 py-3">
          <div className="w-40 text-xs text-gray-600 shrink-0">{k} · {s}<div className="text-gray-400">{DD[k]?.url}</div></div>
          <img src={`/check/dropdowns/${k}__${s}.png`} alt="" style={{ maxWidth: 560 }} />
          <div data-cell={`${k}__${s}`} style={{ padding: 10, minHeight: s === 'closed' || s === 'value' || s === 'disabled' ? 0 : 440, paddingTop: k === 'pagesize' && s !== 'closed' ? 200 : 10 }}>{DD[k]?.wrap ? <div className={DD[k].wrap} style={{ width: 'fit-content' }}>{el}</div> : el}</div>
        </div>
      ))}
    </div>
  )
}
