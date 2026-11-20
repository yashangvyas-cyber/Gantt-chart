// Reproduces react-select's rendered DOM exactly as it appears in the crawled page — same css-* hashes, same react-select__* class names.
// react-select's emotion CSS is NOT in the DOM, so layout that emotion supplies (position, display, cursor, width, menu box) is drawn with
// inline `style`, never with extra Tailwind classes — the class strings stay exactly the real ones.
// Open menu: COPIED react-select__menu / __menu-list / __option class strings from the crawled library (css-1nmdiq5-menu, css-qr46ko, css-1lmhnew-option …).
import { useState, useRef, useEffect } from 'react'

/* Computed styles read off the live beta screen — the row selects are
   BORDERLESS and transparent; only the tenant picker has a border. */
const CONTROL = {
  'css-jnq93n-control':  { height: 38, minHeight: 38, borderRadius: 4, border: 0, background: 'transparent' },
  'css-9pmlob-control':  { height: 'var(--hd-control-h)', minHeight: 'var(--hd-control-h)', borderRadius: 8, border: '1px solid #d0d5dd', background: '#fff' },   // super-admin queue filters (bordered, no capture of the emotion CSS)
  'css-1d2ikgd-control': { height: 'var(--hd-control-h)', minHeight: 'var(--hd-control-h)', borderRadius: 8, border: '1px solid #d0d5dd', background: '#fff' },   // 11b: same height + radius as the input
}
const T = '2xl:text-sm 2xl-to-xl:text-xs text-xs'

// The open menu is positioned `fixed` from the control's on-screen box, so a parent with overflow-hidden (modal, drawer, table)
// can never cut it (BA, 5 Oct: "Assign ticket" menu was cut). It opens upwards when there is no room below, and FOLLOWS the control
// when anything scrolls or the control grows (a chip added) — it never closes by itself.
function useMenuBox(ref, open, setOpen, grow = 0) {
  const [box, setBox] = useState(null)
  useEffect(() => {
    if (!open || !ref.current) { setBox(null); return }
    const place = () => {
      if (!ref.current) return
      const r = ref.current.getBoundingClientRect(); const below = window.innerHeight - r.bottom
      setBox(below < 220 && r.top > below ? { left: r.left, width: r.width, bottom: window.innerHeight - r.top + 4 } : { left: r.left, width: r.width, top: r.bottom + 4 })
    }
    place()
    window.addEventListener('scroll', place, true); window.addEventListener('resize', place)
    return () => { window.removeEventListener('scroll', place, true); window.removeEventListener('resize', place) }
  }, [open, grow])   // eslint-disable-line react-hooks/exhaustive-deps
  return box ? { position: 'fixed', zIndex: 1000, ...box } : { display: 'none' }
}

// containerCls: extra real class on the container ('text-bold' on Records Per Page, 'capitalize' on Priority). width: CSS width (number = px).
// colors = { label: 'rgb(…)' } (BA 8 Oct #17, PM issue status): the control is filled with the chosen status's colour and white text, and each option
// gets its colour dot — computed styles read off staging (data/issues.js ISSUE_COLOURS). DIVERGES: the real dot is the option's ::before; here a span.
export default function Select({ value, options, onChange, width = 230, containerCls = '', controlCls = 'css-jnq93n-control', id = 3, indicatorCls = 'css-1xc3v61-indicatorContainer', placeholder, defaultOpen = false, colors = null, disabled = false }) {
  const [open, setOpen] = useState(defaultOpen)
  const ref = useRef(null)
  const menuBox = useMenuBox(ref, open, setOpen)
  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', h, true)
    return () => document.removeEventListener('mousedown', h, true)
  }, [])
  return (
    <div ref={ref} style={{ position: 'relative', width }} className={`${containerCls ? containerCls + ' ' : ''}${T} css-b62m3t-container`}>
      <span id={`react-select-${id}-live-region`} className="css-7pg0cj-a11yText" />
      <span aria-live="polite" aria-atomic="false" aria-relevant="additions text" role="log" className="css-7pg0cj-a11yText" />
      <div onClick={() => !disabled && setOpen((o) => !o)}
           style={{ ...CONTROL[controlCls] || CONTROL['css-jnq93n-control'], display: 'flex', alignItems: 'center', justifyContent: 'space-between',
             cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.6 : 1, ...(disabled ? { background: '#f9fafb' } : {}),
             ...(colors?.[value] ? { background: colors[value], border: `1px solid ${colors[value]}`, borderRadius: 6, color: '#fff' } : {}) }}
           className={`${T} react-select__control ${controlCls}`}>
        <div style={{ padding: '2px 8px', display: 'grid', alignItems: 'center', flex: 1, overflow: 'hidden' }}
             className={`${T} react-select__value-container ${T} react-select__value-container--has-value css-hlgwow`}>
          {value || !placeholder
            ? <div style={{ gridArea: '1 / 1 / 2 / 3', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', ...(colors?.[value] ? { color: '#fff' } : {}) }} className={`${T} react-select__single-value css-1dimb5e-singleValue`}>{value}</div>
            : <div style={{ gridArea: '1 / 1 / 2 / 3', color: '#667085' }} className={`${T} react-select__placeholder css-1jqq78o-placeholder`}>{placeholder}</div>}
          <div style={{ gridArea: '1 / 1 / 2 / 3' }} className={`${T} react-select__input-container css-19bb58m`} data-value="">
            <input className={`${T} react-select__input`} autoComplete="off" spellCheck="false" disabled={disabled}
                   type="text" role="combobox" aria-expanded={open} aria-haspopup="true" readOnly value="" style={{ width: 2, border: 0, padding: 0, outline: 0 }} />
          </div>
        </div>
        <div style={{ width: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
             className={`${T} react-select__indicators css-1wy0on6`}>
          <div className={`${T} react-select__indicator ${T} react-select__dropdown-indicator ${indicatorCls}`} aria-hidden="true">
            <svg className="transition-transform duration-200" xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M11.9999 13.9394L17.4696 8.46973L18.5303 9.53039L11.9999 16.0607L5.46961 9.53039L6.53027 8.46973L11.9999 13.9394Z" fill="#ccc" />
            </svg>
          </div>
        </div>
      </div>
      {open && (
        <div style={{ ...menuBox, background: '#fff', borderRadius: 4, boxShadow: '0 0 0 1px rgba(0,0,0,.1), 0 4px 11px rgba(0,0,0,.1)' }}
             className={`${T} react-select__menu css-1nmdiq5-menu`}>
          <div style={{ maxHeight: 200, overflowY: 'auto', padding: '4px 0' }} className={`${T} react-select__menu-list css-qr46ko`}>
            {options.map((o) => {
              // { heading } = a group title inside the menu (NEW: no captured react-select group heading; DIVERGES: plain small grey label)
              if (o && typeof o === 'object' && o.heading) return <div key={'h-' + o.heading} style={{ padding: '8px 12px 4px', fontSize: 11, fontWeight: 600, color: '#667085', textTransform: 'uppercase', cursor: 'default' }}>{o.heading}</div>
              const selected = o === value
              return (
                <div key={o} onClick={() => { onChange?.(o); setOpen(false) }} style={{ padding: '8px 12px', cursor: 'pointer', background: selected ? (colors ? 'rgb(68, 76, 231)' : '#f3f4f6') : undefined,
                  ...(colors ? { display: 'flex', alignItems: 'center', gap: 8, color: selected ? '#fff' : 'rgb(16, 24, 40)', fontWeight: selected ? 500 : 400 } : {}) }}
                     className={selected
                       ? `${T} react-select__option ${T} react-select__option--is-focused ${T} react-select__option--is-selected css-ts4ox6-option`
                       : `${T} react-select__option css-1lmhnew-option`}>{colors?.[o] && <span style={{ width: 10, height: 10, borderRadius: 9999, background: colors[o], flexShrink: 0 }} />}{o}</div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

// Searchable multi-select (FIX-LIST 11: pick members out of 200 people). COPIED: the multi-value control of
// modules/recruitment/dom/yopmail_rc_jobs_add_full.html (react-select__value-container--is-multi, __multi-value / __label / __remove with
// their css-* hashes, the real input). Typing filters the menu; a picked option becomes a chip and the menu closes (react-select's
// closeMenuOnSelect); typing or clicking the box opens it again; ✕ on a chip removes it.
// The emotion CSS is not in the DOM → chip / menu box drawn with inline style (react-select's default values), as in Select above.
export function MultiSelect({ values = [], options, onChange, placeholder = 'Search and select', id = 40, width = '100%' }) {
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState('')
  const ref = useRef(null)
  const input = useRef(null)
  const menuBox2 = useMenuBox(ref, open, setOpen, values.length)
  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', h, true)
    return () => document.removeEventListener('mousedown', h, true)
  }, [])
  const left = options.filter((o) => !values.includes(o) && o.toLowerCase().includes(q.trim().toLowerCase()))
  return (
    <div ref={ref} style={{ position: 'relative', width }} className={`${T} css-b62m3t-container`}>
      <span id={`react-select-${id}-live-region`} className="css-7pg0cj-a11yText" />
      <div onClick={() => { setOpen(true); input.current?.focus() }} style={{ ...CONTROL['css-1d2ikgd-control'], height: 'auto', display: 'flex', alignItems: 'center', cursor: 'text' }}
           className={`${T} react-select__control css-1d2ikgd-control`}>
        <div style={{ padding: '2px 8px', display: 'flex', flexWrap: 'wrap', gap: 2, flex: 1 }}
             className={`${T} react-select__value-container ${T} react-select__value-container--is-multi ${T} react-select__value-container--has-value css-1dyz3mf`}>
          {values.map((v) => (
            <div key={v} style={{ display: 'flex', background: 'rgb(230, 230, 230)', borderRadius: 2, margin: 2 }} className={`${T} react-select__multi-value css-atpve2`}>
              <div style={{ padding: '3px 3px 3px 6px', whiteSpace: 'nowrap' }} className={`${T} react-select__multi-value__label css-9jq23d`}>{v}</div>
              <div role="button" aria-label={`Remove ${v}`} onClick={(e) => { e.stopPropagation(); onChange(values.filter((x) => x !== v)) }}
                   style={{ display: 'flex', alignItems: 'center', padding: '0 4px', cursor: 'pointer' }} className={`${T} react-select__multi-value__remove css-v7duua`}>
                <svg height="14" width="14" viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z" fill="currentColor" /></svg>
              </div>
            </div>
          ))}
          <div className={`${T} react-select__input-container css-19bb58m`} data-value={q} style={{ flex: 1, minWidth: 60 }}>
            <input ref={input} className={`${T} react-select__input`} autoComplete="off" spellCheck="false" type="text" role="combobox" aria-expanded={open} aria-haspopup="true"
                   value={q} placeholder={values.length ? '' : placeholder} onChange={(e) => { setQ(e.target.value); setOpen(true) }} onFocus={() => setOpen(true)}
                   onKeyDown={(e) => { if (e.key === 'Backspace' && !q && values.length) onChange(values.slice(0, -1)); if (e.key === 'Enter') { e.preventDefault(); if (left[0]) { onChange([...values, left[0]]); setQ(''); setOpen(false) } } }}
                   style={{ width: '100%', border: 0, padding: '6px 0', outline: 0, background: 'transparent' }} />
          </div>
        </div>
        <div style={{ width: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }} className={`${T} react-select__indicators css-1wy0on6`}>
          <div className={`${T} react-select__indicator ${T} react-select__dropdown-indicator css-1xc3v61-indicatorContainer`} aria-hidden="true">
            <svg className="transition-transform duration-200" xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M11.9999 13.9394L17.4696 8.46973L18.5303 9.53039L11.9999 16.0607L5.46961 9.53039L6.53027 8.46973L11.9999 13.9394Z" fill="#ccc" />
            </svg>
          </div>
        </div>
      </div>
      {open && (
        <div style={{ ...menuBox2, background: '#fff', borderRadius: 4, boxShadow: '0 0 0 1px rgba(0,0,0,.1), 0 4px 11px rgba(0,0,0,.1)' }}
             className={`${T} react-select__menu css-1nmdiq5-menu`}>
          <div style={{ maxHeight: 200, overflowY: 'auto', padding: '4px 0' }} className={`${T} react-select__menu-list css-qr46ko`}>
            {left.length === 0 && <div style={{ padding: '8px 12px', color: '#999' }} className={`${T} react-select__option css-1lmhnew-option`}>No options</div>}
            {left.map((o) => (
              <div key={o} onMouseDown={(e) => { e.preventDefault(); onChange([...values, o]); setQ(''); setOpen(false) }} style={{ padding: '8px 12px', cursor: 'pointer' }}
                   className={`${T} react-select__option css-1lmhnew-option`}>{o}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// PeopleMultiSelect — moved from prototypes/helpdesk-ticketing (18 Nov 2026). BA 14 Oct round 2 (pt 9): CollabCRM's OWN people multi-select, COPIED from CRM › Dashboard › Organization "Select employee" (PrimeReact p-multiselect,
// yopmail, 15 Oct: modules/crm-invoice/dom/yop_people_multiselect_{closed_empty,open,open_picked,closed_picked}_2026-10-15.html).
// The box never grows: one line, the picked names as small grey tokens clipped with "…" (so 50 agents fit), a clear ✕ and the chevron.
// Open: a search box + Close ✕, then one row per person with the real tick-checkbox; a ticked row is p-highlight (rgb(238, 244, 255)).
// Picking does NOT close the list (real). PrimeReact's CSS is not in the DOM, so its box values are inline styles read off the live page
// (getComputedStyle, modules/crm-invoice/api/yop_people_multiselect_computed_2026-10-15.json). DIVERGES: the real box is 210px (a header
// filter); in a form it fills the field (min-width from the `width` prop, so the class string stays the real one). DIVERGES: closed border = our other
// controls' #d0d5dd (only the focused border rgb(164, 188, 253) was measured).
const MS_X = 'M8.01186 7.00933L12.27 2.75116C12.341 2.68501 12.398 2.60524 12.4375 2.51661C12.4769 2.42798 12.4982 2.3323 12.4999 2.23529C12.5016 2.13827 12.4838 2.0419 12.4474 1.95194C12.4111 1.86197 12.357 1.78024 12.2884 1.71163C12.2198 1.64302 12.138 1.58893 12.0481 1.55259C11.9581 1.51625 11.8617 1.4984 11.7647 1.50011C11.6677 1.50182 11.572 1.52306 11.4834 1.56255C11.3948 1.60204 11.315 1.65898 11.2488 1.72997L6.99067 5.98814L2.7325 1.72997C2.59553 1.60234 2.41437 1.53286 2.22718 1.53616C2.03999 1.53946 1.8614 1.61529 1.72901 1.74767C1.59663 1.88006 1.5208 2.05865 1.5175 2.24584C1.5142 2.43303 1.58368 2.61419 1.71131 2.75116L5.96948 7.00933L1.71131 11.2675C1.576 11.403 1.5 11.5866 1.5 11.7781C1.5 11.9696 1.576 12.1532 1.71131 12.2887C1.84679 12.424 2.03043 12.5 2.2219 12.5C2.41338 12.5 2.59702 12.424 2.7325 12.2887L6.99067 8.03052L11.2488 12.2887C11.3843 12.424 11.568 12.5 11.7594 12.5C11.9509 12.5 12.1346 12.424 12.27 12.2887C12.4053 12.1532 12.4813 11.9696 12.4813 11.7781C12.4813 11.5866 12.4053 11.403 12.27 11.2675L8.01186 7.00933Z'
const MS_TICK = 'border border-gray-300 rounded 2xl:!size-4 2xl-to-xl:!size-3.5 !size-3.5 2xl:!min-h-4 2xl:!min-w-4 2xl-to-xl:!min-h-3.5 !min-h-3.5 2xl-to-xl:!min-w-3.5 !min-w-3.5 focus:border-indigo-300 focus:shadow-outline-purple after:!bg-cover 2xl:after:!size-2.5 2xl-to-xl:after:!size-1.5 after:!size-1.5 tick-checkbox'
export function PeopleMultiSelect({ values = [], options, onChange, placeholder = 'Select', id = 40, width = '100%' }) {
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState('')
  const ref = useRef(null)
  const panel = useRef(null)
  const menuBox = useMenuBox(ref, open, setOpen)
  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target) && !(panel.current && panel.current.contains(e.target))) setOpen(false) }
    document.addEventListener('mousedown', h, true)
    return () => document.removeEventListener('mousedown', h, true)
  }, [])
  const shown = options.filter((o) => o.toLowerCase().includes(q.trim().toLowerCase()))
  const toggle = (o) => onChange(values.includes(o) ? values.filter((x) => x !== o) : options.filter((x) => x === o || values.includes(x)))
  const filled = values.length > 0
  return (
    <div ref={ref} onClick={() => setOpen((v) => !v)} title={values.join(', ')}
      className={`!w-[210px] h-8 !text-sm p-multiselect p-component p-inputwrapper p-multiselect-chip p-multiselect-clearable${filled ? ' p-inputwrapper-filled' : ''}${open ? ' p-inputwrapper-focus' : ''}`}
      style={{ position: 'relative', minWidth: width, height: 32, display: 'inline-flex', alignItems: 'center', borderRadius: 6, background: '#fff', cursor: 'pointer', fontSize: 14, lineHeight: '20px',
        border: open ? '1px solid rgb(164, 188, 253)' : '1px solid #d0d5dd', boxShadow: open ? 'rgb(244, 235, 255) 0px 0px 0px 4px' : 'none' }}>
      <div className="p-hidden-accessible" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>
        <input type="text" role="combobox" aria-expanded={open} aria-controls={`pr_id_${id}-multi-selectbox`} tabIndex={0} readOnly value={values.join(', ')} />
      </div>
      <div className="p-multiselect-label-container" style={{ overflow: 'hidden', flex: '1 1 auto', minWidth: 0 }}>
        <div className={`p-multiselect-label${filled ? '' : ' p-placeholder'}`} style={{ display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', padding: '3.2px 8px', color: filled ? '#000' : '#667085' }}>
          {filled ? values.map((v) => (
            <div key={v} className="p-multiselect-token cursor-pointer !text-xs !h-6 !my-0 !p-0" style={{ display: 'inline-flex', alignItems: 'center', verticalAlign: 'middle', marginRight: 4, padding: '2px 3px 2px 6px', borderRadius: 16, background: 'rgb(229, 231, 235)', color: 'rgb(75, 85, 99)', lineHeight: '16px', maxWidth: 103 }}>
              <span className="p-multiselect-token-label" title={v} style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', lineHeight: '12px' }}>{v}</span>
              <span className="p-multiselect-token-icon icon-circle-rejected 2xl:text-lg 2xl-to-xl:text-base text-base curssor-pointer" style={{ marginLeft: 8, cursor: 'pointer' }}
                onClick={(e) => { e.stopPropagation(); onChange(values.filter((x) => x !== v)) }} />
            </div>
          )) : placeholder}
        </div>
      </div>
      {filled && (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="p-icon p-multiselect-clear-icon" aria-label="Clear" tabIndex={0}
          style={{ width: 10, height: 10, flexShrink: 0, cursor: 'pointer' }} onClick={(e) => { e.stopPropagation(); onChange([]) }}><path d={MS_X} fill="currentColor" /></svg>
      )}
      <div className="p-multiselect-trigger" style={{ width: 36, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none" className={`transition-transform duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] ${open ? 'rotate-180' : 'rotate-0'}`}>
          <path fillRule="evenodd" clipRule="evenodd" d="M11.9999 13.9394L17.4696 8.46973L18.5303 9.53039L11.9999 16.0607L5.46961 9.53039L6.53027 8.46973L11.9999 13.9394Z" fill={open ? '#444CE7' : '#ccc'} />
        </svg>
      </div>
      {open && (
        <div ref={panel} onClick={(e) => e.stopPropagation()} className="p-multiselect-panel p-component p-ripple-disabled p-connected-overlay-enter-done"
          style={{ ...menuBox, minWidth: 210, background: '#fff', border: '1px solid rgb(209, 213, 219)', borderRadius: 6, boxShadow: 'rgba(0, 0, 0, 0.1) 0px 2px 12px 0px', color: 'rgb(75, 85, 99)', cursor: 'default' }}>
          <div className="p-multiselect-header" style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '8px 4px 8px 10px', background: 'rgb(249, 250, 251)', borderRadius: '6px 6px 0 0' }}>
            <div className="custom-filter-container" style={{ flex: '1 1 auto' }}>
              <div className="custom-input-wrapper" style={{ position: 'relative' }}>
                <input className="custom-filter-input custom-input-text custom-component" type="text" role="searchbox" autoFocus value={q} onChange={(e) => setQ(e.target.value)}
                  style={{ width: '100%', height: 30, padding: '0 30px 0 10px', border: '1px solid rgb(209, 213, 219)', borderRadius: 6, fontSize: 12, color: 'rgb(55, 65, 81)', outline: 0 }} />
                <span className="custom-filter-icon-wrapper" style={{ position: 'absolute', right: 8, top: 3 }}><span className="icon-search-md text-md w-[14px] h-[14px]" /></span>
              </div>
            </div>
            <button type="button" className="p-multiselect-close p-link" aria-label="Close" onClick={() => setOpen(false)}
              style={{ width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: 'rgb(55, 65, 81)' }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="p-icon p-multiselect-close-icon" aria-hidden="true"><path d={MS_X} fill="currentColor" /></svg>
            </button>
          </div>
          <div className="p-multiselect-items-wrapper" style={{ maxHeight: 245, overflow: 'auto' }}>
            <ul className="p-multiselect-items p-component" role="listbox" aria-multiselectable="true" id={`pr_id_${id}-multi-selectbox`} style={{ margin: 0, padding: 0, listStyle: 'none' }}>
              {shown.map((o) => { const on = values.includes(o); return (
                <li key={o} className={`p-multiselect-item${on ? ' p-highlight' : ''}`} role="option" aria-selected={on} onClick={() => toggle(o)}
                  style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', padding: '5px 8px', minHeight: 42, backgroundColor: on ? 'rgb(238, 244, 255)' : 'rgb(255, 255, 255)', color: 'black', fontSize: 14 }}>
                  {/* the real PrimeReact checkbox sits here but is hidden by its theme; the visible box is the real tick-checkbox below */}
                  <div className="p-multiselect-checkbox" style={{ display: 'none' }} />
                  <span><div className="!flex !items-center"><div className="flex items-center gap-2">
                    <input type="checkbox" className={MS_TICK} readOnly checked={on} /><div className="flex flex-col" />
                  </div><p className="!break-words !whitespace-normal !text-left 2xl:text-sm 2xl-to-xl:text-xs text-xs" style={{ marginLeft: 8 }}>{o}</p></div></span>
                </li>) })}
              {shown.length === 0 && <li className="p-multiselect-item" style={{ padding: '8px 12px', color: '#999', fontSize: 12 }}>No results found</li>}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
