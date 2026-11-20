// COPIED from CATALOGUE.md → Tab Strips, variant 2 (Open / Draft / Close): the one-of-many pill buttons.
// Capture: modules/recruitment/dom/jobs_id_edit.html (Job › Edit, the Open / Draft / Close status buttons).
// selected = `bg-indigo-50 border-indigo-200 text-indigo-700`, other = `text-gray-700`.
// Wrapper = the real `flex flex-wrap gap-3 items-center` (modules/recruitment/dom/jobs_add.html). DIVERGES: the button also has `whitespace-nowrap`
// (BA 6 Oct: chips never wrap their text); the real button string is the same without it.
// options = [{ value, label }] or plain strings. Single choice; click the selected chip again to clear when `clearable`.
export default function Chips({ options, value, onChange, clearable = false, disabled = false }) {
  return (
    <div className="flex flex-wrap gap-3 items-center">
      {options.map((o) => {
        const v = typeof o === 'string' ? o : o.value
        const label = typeof o === 'string' ? o : o.label
        const isDisabled = disabled || (typeof o === 'object' && o.disabled)
        const on = v === value
        return (
          <button key={v} type="button" disabled={isDisabled} onClick={() => !isDisabled && onChange?.(on && clearable ? null : v)}
            className={`whitespace-nowrap border rounded-lg flex items-center 2xl:text-sm 2xl-to-xl:text-xs text-xs justify-center 2xl:py-1.5 2xl-to-xl:py-1 py-1 2xl:h-9 2xl-to-xl:h-8 h-8 px-5 cursor-pointer font-semibold focus:shadow-outline-purple focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${on ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'text-gray-700'}`}>
            {label}
          </button>
        )
      })}
    </div>
  )
}
