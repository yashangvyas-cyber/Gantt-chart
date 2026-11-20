// COPIED from the radio group of modules/crm-invoice/dom/contacts_add.html (label.radio-label > hidden input + span.checkmark + p),
// group wrappers verbatim. The `.checkmark` drawing is in src/index.css (its real CSS is not captured).
// `vertical` (NEW, BA 6 Oct): one option per line; an option's 3rd item is a short grey note under its label.
export default function RadioGroup({ name, options, value, onChange, vertical = false }) {
  return (
    <div className={vertical ? 'flex flex-col gap-y-3' : 'flex flex-wrap items-center gap-x-4 gap-y-2'}>
      {options.map(([v, label, note]) => (
        <label key={v} className="cursor-pointer block relative select-none radio-label 2xl:!text-sm 2xl-to-xl:!text-xs !text-xs">
          <input type="radio" className="mr-2 hidden" name={name} value={v} checked={value === v} onChange={() => onChange(v)} />
          <span className="checkmark 2xl:!size-4 2xl-to-xl:!size-3.5 !size-3.5" />
          <p className="2xl:ml-8 2xl-to-xl:ml-6 ml-6 2xl:mt-0 2xl-to-xl:mt-px mt-px">{label}</p>
          {note && <p className="2xl:ml-8 2xl-to-xl:ml-6 ml-6 mt-0.5 text-gray-500 2xl:text-xs text-[11px]">{note}</p>}
        </label>
      ))}
    </div>
  )
}
