// COPIED from the Module / Subject / Details / Priority fields of modules/admin/dom/helpdesk_add_ticket_drawer_2026-10-05.html
// Label = "<text>&nbsp;" + red "*". Input / Textarea classes verbatim.
export function Label({ children, required, muted }) {
  return (
    <div className="flex items-end min-h-6">
      <label className={muted ? '!font-medium !text-gray-400 2xl:text-sm 2xl-to-xl:text-xs text-xs label' : 'label'}>{children}&nbsp;</label>
      {required && <span className="text-error-500 pe-1">*</span>}
    </div>
  )
}

// NEW — no field error state in CollabCRM captures. Helper text under the field in text-error-500 (the class of the "*"); no red border.
const FieldError = ({ error }) => error ? <p className="text-error-500 2xl:text-sm 2xl-to-xl:text-xs text-xs mt-1.5">{error}</p> : null

export function Input({ label, required, error, ...props }) {
  return (
    <div>
      <div><Label required={required}>{label}</Label><div /></div>
      <div className="rounded-lg relative mt-1.5">
        <input type="text" {...props}
          className="rounded-lg py-2 outline-none placeholder-gray-500 px-3 border border-gray-300 focus:border-indigo-300 focus:shadow-outline-purple bg-white w-full 2xl:h-10 2xl-to-xl:h-9 h-9 2xl:text-sm 2xl-to-xl:text-xs text-xs placeholder:!text-gray-450" />
      </div>
      <FieldError error={error} />
    </div>
  )
}

export function Textarea({ label, required, error, rows = 6, ...props }) {
  return (
    <div>
      <div className="flex items-center gap-2 justify-between">
        <div className="flex items-end min-h-6">
          <Label required={required}>{label}</Label>
        </div>
      </div>
      <div className="mt-1.5">
        <textarea rows={rows} {...props}
          className="w-full min-h-[42px] 2xl:!text-sm 2xl-to-xl:!text-xs !text-xs rounded-lg py-2 outline-none placeholder-gray-500 px-3 border border-gray-300 focus:border-indigo-300 focus:shadow-outline-purple bg-white min-w-full resize-none" />
      </div>
      <FieldError error={error} />
    </div>
  )
}

/* Wrap a react-select style control (src/components/Select.jsx) with the label block the real drawer uses. */
export function SelectField({ label, required, muted, error, children }) {
  return (
    <div>
      <div className="mb-1.5"><Label required={required} muted={muted}>{label}</Label><div /></div>
      <div className="">{children}</div>
      <FieldError error={error} />
    </div>
  )
}

export default Input
