// COPIED from the Cancel / Submit buttons of modules/admin/dom/helpdesk_add_ticket_drawer_2026-10-05.html (class strings verbatim,
// inner `flex items-center justify-center gap-2` wrapper included). variant: 'primary' (Submit) | 'white' (Cancel).
const V = {
  primary: 'outline-none font-semibold rounded-lg disabled:cursor-not-allowed border disabled:opacity-100 hover:opacity-90 disabled:bg-indigo-200 px-4 border-transparent bg-indigo-600 text-white 2xl:h-9 2xl-to-xl:h-8 h-8 2xl:text-sm 2xl-to-xl:text-xs text-xs 2xl:py-1.5 2xl-to-xl:py-1 py-1',
  white: 'outline-none font-semibold rounded-lg disabled:cursor-not-allowed border disabled:opacity-100 hover:opacity-90 px-4 bg-white border-gray-300 text-gray-700 2xl:h-9 2xl-to-xl:h-8 h-8 2xl:text-sm 2xl-to-xl:text-xs text-xs 2xl:py-1.5 2xl-to-xl:py-1 py-1',
}

export default function Button({ variant = 'primary', type = 'button', children, ...props }) {
  return (
    <button type={type} className={V[variant]} {...props}>
      <div className="flex items-center justify-center gap-2">{children}</div>
    </button>
  )
}
