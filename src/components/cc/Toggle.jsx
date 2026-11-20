// COPIED from CATALOGUE.md → Toggle Switches (modules/payroll/dom/cfg_loan_edit_rsp.html …): outer box, hidden checkbox, label track, white knob.
// On = `bg-indigo-600` track + `translate-x-[20px]` knob; off = `bg-gray-300` + `translate-x-[3px]` (both exact strings in the library).
export default function Toggle({ id, checked, onChange }) {
  return (
    <div className="relative inline-block 2xl:w-[38px] 2xl-to-xl:w-[35px] w-[35px] 2xl:h-[21px] 2xl-to-xl:h-[17px] h-[17px]">
      <input className="hidden" id={id} readOnly type="checkbox" checked={checked} />
      <label htmlFor={id} onClick={(e) => { e.preventDefault(); onChange(!checked) }}
        className={`flex items-center w-full h-full rounded-full transition-colors duration-300 ${checked ? 'bg-indigo-600' : 'bg-gray-300'} cursor-pointer`}>
        <span className={`inline-block 2xl:size-[14px] 2xl-to-xl:size-3 size-3 bg-white rounded-full shadow transition-transform duration-300 ease-in-out transform ${checked ? 'translate-x-[20px]' : 'translate-x-[3px]'}`} />
      </label>
    </div>
  )
}
