// COPIED from the drawer header of modules/people/dom/rsp_tabs_support_ticket_view_01_view_request_2026-09-25.html
// ("View Request" selected / "Comments (n)" not). Goes in Drawer's `title`. tabs = [{ key, label }]
export default function PillTabs({ tabs, active, onChange }) {
  return (
    <nav aria-label="Tabs" className="scrollbar-hide tab flex 2xl:gap-3 2xl-to-xl:gap-2 gap-2 items-center relative overflow-x-auto overflow-y-hidden">
      {tabs.map((t) => (
        <div key={t.key} onClick={() => onChange?.(t.key)}
          className={`min-w-[120px] ${t.key === active ? 'text-indigo-700 bg-indigo-50' : 'text-gray-500'} tab-transition font-semibold cursor-pointer relative z-20 whitespace-nowrap 2xl:px-3 2xl-to-xl:px-2 px-2 2xl:py-2 2xl-to-xl:py-1.5 py-1.5 w-fit 2xl:text-sm 2xl-to-xl:text-xs text-xs text-center rounded-md flex items-center justify-center gap-1`}>
          {t.label}
        </div>
      ))}
    </nav>
  )
}
