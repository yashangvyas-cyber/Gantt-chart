// Super Admin list pieces — moved from prototypes/trial-activity/client/src/components/ui.jsx (Super Admin, captured 17-Sep-2026).
// Captures: modules/super-admin/dom/customers_list.html, support_tickets.html, users_list.html, customer_master_access.html, admin/dom/my_todo_job_interviews.html.
import { useEffect, useRef, useState } from 'react'
import Select from '../Select.jsx'
import { Link } from 'react-router-dom'

// COPIED: customers_list.html — table header class string
export const TH = '2xl:py-2.5 2xl-to-xl:py-1.5 py-1.5 2xl:px-6 2xl-to-xl:px-4 px-4 whitespace-nowrap 2xl:text-sm 2xl-to-xl:text-xs text-xs font-medium text-gray-600 text-left bg-gray-50 top-0'
// COPIED: customers_list.html — table cell class string
export const TD = 'whitespace-nowrap 2xl:px-6 2xl-to-xl:px-4 px-4 2xl:py-2.5 2xl-to-xl:py-1.5 py-1.5 2xl:text-sm 2xl-to-xl:text-xs text-xs text-gray-600 text-left'

// Sortable column header. The wrapper (cursor-pointer th › div › div.flex › span.self-center +
// span.icon-sort ml-1) is COPIED from customers_list.html / support_tickets.html / users_list.html.
// The ACTIVE up/down state is INVENTED: on staging the header carries cursor-pointer and icon-sort
// but has no click handler at all (probed 30-Sep-2026 — clicking changes neither icon nor row order),
// so no capture of a sorted header exists. icon-arrow-narrow-up/down are real icons in the app font.
export function SortTH({ label, dir, onToggle }) {
  const icon = dir === 'asc' ? 'icon-arrow-narrow-up' : dir === 'desc' ? 'icon-arrow-narrow-down' : 'icon-sort'
  return (
    <th scope="col" onClick={onToggle} title={dir === 'asc' ? 'Oldest first — click for newest first' : 'Newest first — click for oldest first'}
      className={TH + ' cursor-pointer select-none'}>
      <div><div className="flex"><span className="self-center">{label}</span>
        <div className="flex items-center">
          <span className={`${dir ? 'text-gray-600' : 'text-gray-300'} text-base ${icon} ml-1`} />
        </div>
      </div></div>
    </th>
  )
}
// COPIED: customers_list.html — primary button class string
export const BTN_PRIMARY = 'outline-none font-semibold rounded-lg disabled:cursor-not-allowed border disabled:opacity-100 hover:opacity-90 disabled:bg-indigo-200 px-4 border-transparent bg-indigo-600 text-white 2xl:py-2 2xl-to-xl:py-[7px] py-[7px] 2xl:text-sm 2xl-to-xl:text-xs text-xs'
// COPIED: customers_list.html — secondary button class string
export const BTN_SECONDARY = 'outline-none font-semibold rounded-lg disabled:cursor-not-allowed border disabled:opacity-100 hover:opacity-90 px-4 bg-white border-gray-300 text-gray-700 2xl:py-2 2xl-to-xl:py-[7px] py-[7px] 2xl:text-sm 2xl-to-xl:text-xs text-xs'
// COPIED: customer_general_info_TRIAL.html — field label class string
export const LABEL = 'text-black font-medium whitespace-nowrap 2xl:text-[15px] 2xl-to-xl:text-[13px] text-[13px]'
// COPIED: customer_general_info_TRIAL.html — field value class string
export const VALUE = 'lg:min-w-[200px] lg:max-w-[350px] font-normal break-words text-gray-500 2xl:text-sm 2xl-to-xl:text-xs text-xs'

const BADGE_TONES = {
  success: 'border-success-200 bg-success-50 text-success-700',
  purple: 'border-purple-200 bg-purple-50 text-purple-700',
  warning: 'border-warning-200 bg-warning-50 text-warning-700',
  error: 'border-error-200 bg-error-50 text-error-700',
  gray: 'border-gray-200 bg-gray-50 text-gray-700',
  indigo: 'border-indigo-200 bg-indigo-50 text-indigo-700',
}
// COPIED: customers_list.html — status badge
export function Badge({ tone = 'gray', children }) {
  return (
    <div className={`rounded-2xl border flex w-max font-medium items-center ${BADGE_TONES[tone]} py-0.5 px-2 text-xs`}>
      <span>{children}</span>
    </div>
  )
}

// Subscription badge — colours copied per value from customers_list.html
export const SUBSCRIPTION = {
  paid: { label: 'Paid', tone: 'success' },
  'free-trial': { label: 'Free Trial', tone: 'purple' },
  pending: { label: 'Pending', tone: 'warning' },
  'plan-expired': { label: 'Plan Expired', tone: 'error' },
  'trial-ended': { label: 'Trial Ended', tone: 'gray' },
}
// COPIED: customers_list.html — subscription status badge
export const SubscriptionBadge = ({ value }) => {
  const s = SUBSCRIPTION[value] || { label: value, tone: 'gray' }
  return <Badge tone={s.tone}>{s.label}</Badge>
}

// COPIED: customers_list.html — records count pill
export function RecordsPill({ from, to, total, noun }) {
  return (
    <div className="rounded-2xl border flex w-max font-medium items-center border-indigo-200 bg-indigo-50 text-indigo-700 2xl:!text-xs 2xl-to-xl:!text-[10px] !text-[10px] h-fit py-0.5 px-2 text-xs">
      <span>
        <span className="font-bold">{total ? `${from} - ${to}` : '0 - 0'}</span>
        <span className="font-medium"> of {total} {noun}</span>
      </span>
    </div>
  )
}

// COPIED: customers_list.html — full-screen button
export const FullScreenButton = () => (
  <div className="rounded-lg flex items-center cursor-pointer relative">
    <button className="cursor-pointer rounded-lg border 2xl:w-[38px] 2xl-to-xl:w-[32px] w-[32px] 2xl:h-[38px] 2xl-to-xl:h-[32px] h-[32px] flex items-center justify-center duration-300" title="Full Screen">
      <span className="2xl:text-xl 2xl-to-xl:text-lg text-lg block text-gray-700 icon-maximize-01" />
    </button>
  </div>
)

// Pagination footer — copied from customers_list.html / support_tickets.html (pages 1,2,3 variant)
const PAGE_ACTIVE = 'inline-flex items-center bg-indigo-600 text-white px-4 2xl:py-2.5 2xl-to-xl:py-1 py-1 2xl:text-sm 2xl-to-xl:text-xs text-xs font-semibold ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0'
const PAGE_IDLE = 'inline-flex items-center text-gray-700 hover:bg-gray-50 px-4 2xl:py-2.5 2xl-to-xl:py-1 py-1 2xl:text-sm 2xl-to-xl:text-xs text-xs font-semibold ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0'
export function Pagination({ pages = 1 }) {
  return (
    <div className="bg-white 2xl:p-4 2xl-to-xl:p-2 p-2 border border-t-0 rounded-b-md responsive-dropdown">
      <div className="flex space-x-2 justify-between">
        <div className="flex justify-center items-center gap-3">
          <p className="text-gray-700 2xl:text-sm 2xl-to-xl:text-xs text-xs font-medium"><span className="sm:inline hidden">Records </span>Per Page</p>
          {/* 18 Nov: the kit Select's props (string options, containerCls) — same real container class text-bold */}
          <Select containerCls="text-bold" options={['10']} value="10" onChange={() => {}} width={70} />
        </div>
        <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
          <button disabled className="rounded-l-lg inline-flex items-center disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 hover:bg-gray-50 px-4 2xl:py-2.5 2xl-to-xl:py-1 py-1 2xl:text-sm 2xl-to-xl:text-xs text-xs font-semibold ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0">
            <span className="icon-arrow-narrow-left text-xl me-2" /><span className="sm:block hidden">Previous</span>
          </button>
          {Array.from({ length: pages }, (_, i) => (
            <button key={i} title={i ? 'Only page 1 was captured for this prototype' : undefined} className={i === 0 ? PAGE_ACTIVE : PAGE_IDLE}>{i + 1}</button>
          ))}
          <button disabled={pages < 2} className="rounded-r-lg relative inline-flex items-center disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 hover:bg-gray-50 px-4 2xl:py-2.5 2xl-to-xl:py-1 py-1 2xl:text-sm 2xl-to-xl:text-xs text-xs font-semibold ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0">
            <span className="sm:block hidden">Next</span><span className="icon-arrow-narrow-right text-xl ms-2" />
          </button>
        </nav>
      </div>
    </div>
  )
}

// PrimeReact multiselect (closed) — copied from customers_list.html / customer_orders.html
export function PrimeMultiSelect({ placeholder, widthClass = '!w-[300px]' }) {
  return (
    <div className="relative">
      <div className="cursor-pointer">
        <div className={`${widthClass} p-multiselect p-component p-inputwrapper p-multiselect-chip p-multiselect-clearable`}>
          <div className="p-multiselect-label-container"><div className="p-multiselect-label p-placeholder">{placeholder}</div></div>
          <div className="p-multiselect-trigger">
            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" className="transition-transform duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] rotate-0"><path fillRule="evenodd" clipRule="evenodd" d="M11.9999 13.9394L17.4696 8.46973L18.5303 9.53039L11.9999 16.0607L5.46961 9.53039L6.53027 8.46973L11.9999 13.9394Z" fill="#ccc" /></svg>
          </div>
        </div>
      </div>
    </div>
  )
}

// Working pagination (same copied classes as Pagination above)
export function PagedFooter({ page, pages, onPage }) {
  const start = Math.max(1, Math.min(page - 2, pages - 4))
  const nums = Array.from({ length: Math.min(5, pages) }, (_, i) => start + i)
  return (
    <div className="bg-white 2xl:p-4 2xl-to-xl:p-2 p-2 border border-t-0 rounded-b-md responsive-dropdown">
      <div className="flex space-x-2 justify-between">
        <div className="flex justify-center items-center gap-3">
          <p className="text-gray-700 2xl:text-sm 2xl-to-xl:text-xs text-xs font-medium">Page {page} of {pages}</p>
        </div>
        <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
          <button disabled={page <= 1} onClick={() => onPage(page - 1)} className="rounded-l-lg inline-flex items-center disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 hover:bg-gray-50 px-4 2xl:py-2.5 2xl-to-xl:py-1 py-1 2xl:text-sm 2xl-to-xl:text-xs text-xs font-semibold ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0">
            <span className="icon-arrow-narrow-left text-xl me-2" /><span className="sm:block hidden">Previous</span>
          </button>
          {nums.map((n) => <button key={n} onClick={() => onPage(n)} className={n === page ? PAGE_ACTIVE : PAGE_IDLE}>{n}</button>)}
          <button disabled={page >= pages} onClick={() => onPage(page + 1)} className="rounded-r-lg relative inline-flex items-center disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 hover:bg-gray-50 px-4 2xl:py-2.5 2xl-to-xl:py-1 py-1 2xl:text-sm 2xl-to-xl:text-xs text-xs font-semibold ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0">
            <span className="sm:block hidden">Next</span><span className="icon-arrow-narrow-right text-xl ms-2" />
          </button>
        </nav>
      </div>
    </div>
  )
}

const CHEVRON = (
  <svg className="transition-transform duration-200" xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none">
    <path fillRule="evenodd" clipRule="evenodd" d="M11.9999 13.9394L17.4696 8.46973L18.5303 9.53039L11.9999 16.0607L5.46961 9.53039L6.53027 8.46973L11.9999 13.9394Z" fill="#ccc" />
  </svg>
)

// Multi-select — same react-select control and menu classes as Select above (copied from the captured DOM),
// with a checkbox per option so any number of values can be picked; the clear "x" empties it.
export function MultiSelect({ placeholder = 'Select', options, value = [], onChange, className = '' }) {
  const [open, setOpen] = useState(false)
  const [hover, setHover] = useState(null)
  const ref = useRef(null)
  useEffect(() => {
    const close = (e) => ref.current && !ref.current.contains(e.target) && setOpen(false)
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [])
  const toggle = (v) => onChange(value.includes(v) ? value.filter((x) => x !== v) : [...value, v])
  const label = value.length === 0 ? null : value.length === 1 ? options.find((o) => o.value === value[0])?.label : `${value.length} selected`
  return (
    <div ref={ref} className={`${className} 2xl:text-sm 2xl-to-xl:text-xs text-xs css-b62m3t-container`}>
      <div onClick={() => setOpen(!open)} className={`2xl:text-sm 2xl-to-xl:text-xs text-xs react-select__control ${open ? 'css-tpvs3e-control' : 'css-1d2ikgd-control'}`}>
        <div className="2xl:text-sm 2xl-to-xl:text-xs text-xs react-select__value-container css-hlgwow">
          {label
            ? <div className="2xl:text-sm 2xl-to-xl:text-xs text-xs react-select__single-value css-1dimb5e-singleValue">{label}</div>
            : <div className="2xl:text-sm 2xl-to-xl:text-xs text-xs react-select__placeholder css-1jqq78o-placeholder">{placeholder}</div>}
        </div>
        <div className="2xl:text-sm 2xl-to-xl:text-xs text-xs react-select__indicators css-1wy0on6">
          {value.length > 0 && (
            <div onClick={(e) => { e.stopPropagation(); onChange([]) }} className="2xl:text-sm 2xl-to-xl:text-xs text-xs react-select__indicator css-1xc3v61-indicatorContainer">
              <span className="icon-x-close text-base" />
            </div>
          )}
          <div className={`2xl:text-sm 2xl-to-xl:text-xs text-xs react-select__indicator react-select__dropdown-indicator ${open ? 'css-15lsz6c-indicatorContainer' : 'css-1xc3v61-indicatorContainer'}`} aria-hidden="true">{CHEVRON}</div>
        </div>
      </div>
      {open && (
        <div className="2xl:text-sm 2xl-to-xl:text-xs text-xs react-select__menu css-1nmdiq5-menu">
          <div className="2xl:text-sm 2xl-to-xl:text-xs text-xs react-select__menu-list css-qr46ko" role="listbox">
            {options.map((o, i) => (
              <div key={o.value} role="option" aria-selected={value.includes(o.value)} onMouseEnter={() => setHover(i)} onClick={() => toggle(o.value)}
                className={hover === i
                  ? '2xl:text-sm 2xl-to-xl:text-xs text-xs react-select__option react-select__option--is-focused css-1tfqtj-option flex items-center gap-x-2'
                  : '2xl:text-sm 2xl-to-xl:text-xs text-xs react-select__option css-1lmhnew-option flex items-center gap-x-2'}>
                <input type="checkbox" readOnly checked={value.includes(o.value)} className="accent-indigo-600 pointer-events-none align-middle" /><span className="ml-2 align-middle">{o.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// Segmented toggle — COPIED: the Self / Organization toggle, admin/dom/my_todo_job_interviews.html (TOGGLE_ON /
// TOGGLE_OFF are the captured class sets). The first button keeps rounded-l-lg, the last rounded-r-lg. INVENTED: more
// than two buttons — the inner ones have no rounding and overlap by one pixel (-ml-px) so borders never double.
const TOGGLE_ON = 'px-4 font-semibold border bg-indigo-600 text-white border-indigo-600 2xl:py-1.5 2xl-to-xl:py-1 py-1 2xl:h-auto 2xl-to-xl:h-7 h-7 flex items-center'
const TOGGLE_OFF = 'px-4 font-semibold border-gray-300 text-gray-700 border 2xl:py-1.5 2xl-to-xl:py-1 py-1 2xl:h-auto 2xl-to-xl:h-7 h-7 flex items-center'
export function SegmentToggle({ value, onChange, options }) {
  return (
    <div className="flex items-center shrink-0">
      {options.map(([key, label], i) => (
        <button key={key} type="button" onClick={() => onChange(key)}
          className={`${value === key ? TOGGLE_ON + ' relative z-[1]' : TOGGLE_OFF + ' bg-white'} ${i === 0 ? 'rounded-l-lg' : '-ml-px'} ${i === options.length - 1 ? 'rounded-r-lg' : ''}`}>
          <div className="flex items-center gap-x-2 2xl:text-sm 2xl-to-xl:text-xs text-xs font-semibold whitespace-nowrap">{label}</div>
        </button>
      ))}
    </div>
  )
}

// COPIED: customers_list.html — breadcrumb
export function Breadcrumb({ items }) {
  return (
    <nav className="flex border-b border-gray-200 py-2 bg-white items-center justify-between px-4" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2 overflow-x-auto flex-nowrap no-scrollbar scrollbar-hide sm:flex-wrap">
        <li>
          <div>
            <Link className="hover:text-gray-700 text-gray-500 sm:whitespace-normal whitespace-nowrap" to="/dashboard">
              <span className="icon-home-line flex-shrink-0 text-lg flex" />
            </Link>
          </div>
        </li>
        {items.map((it, i) => (
          <li key={i}>
            <div className="flex items-center">
              <span className="icon-chevron-right flex-shrink-0 text-base text-gray-300" />
              {i === items.length - 1
                ? <span className="text-indigo-700 cursor-default pointer-events-none ml-4 2xl:text-sm 2xl-to-xl:text-xs text-xs font-medium sm:whitespace-normal whitespace-nowrap" aria-current="page">{it.label}</span>
                : <Link className="text-gray-600 cursor-pointer hover:text-gray-800 ml-4 2xl:text-sm 2xl-to-xl:text-xs text-xs font-medium sm:whitespace-normal whitespace-nowrap" to={it.to}>{it.label}</Link>}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  )
}
