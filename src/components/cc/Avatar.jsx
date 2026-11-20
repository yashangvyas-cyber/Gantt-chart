// COPIED from the initials avatar in modules/super-admin/dom/users_list.html. Background is an inline rgb(), as in the real DOM:
// the three captured colours are blue rgb(21,112,239), green rgb(7,148,85), orange rgb(220,104,3). Picked by the name so it stays stable.
const COLORS = ['rgb(21, 112, 239)', 'rgb(7, 148, 85)', 'rgb(220, 104, 3)']

export const initials = (name = '') => name.trim().split(/\s+/).slice(0, 2).map((w) => w[0]?.toUpperCase() || '').join('')

export default function Avatar({ name }) {
  const sum = [...name].reduce((a, c) => a + c.charCodeAt(0), 0)
  return (
    <div className="2xl:size-[50px] 2xl-to-xl:size-9 size-9 border text-white select-none rounded-full flex items-center justify-center mb-2 text-gray-900 font-medium 2xl:text-md text-xs"
      style={{ backgroundColor: COLORS[sum % COLORS.length] }}>{initials(name)}</div>
  )
}

// COPIED from the ticket drawer header of modules/people/dom/rsp_tabs_support_ticket_view_01_view_request_2026-09-25.html: a photo in a round wrapper
// (`rounded-full overflow-hidden 2xl:size-12 2xl-to-xl:size-10 size-10` + `<img class="rounded-full object-cover …">`; `size-4` for the Assigned To pill).
// There are no photos in the seed, so the image is a generated initials SVG with the same three captured colours as Avatar above.
// initials picture as a data URL (the real app shows a photo here; we have none)
export function avatarSrc(name = '') {
  const sum = [...name].reduce((a, c) => a + c.charCodeAt(0), 0)
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48"><rect width="48" height="48" fill="${COLORS[sum % COLORS.length]}"/><text x="24" y="31" font-family="Inter,Arial,sans-serif" font-size="20" font-weight="500" fill="#fff" text-anchor="middle">${initials(name)}</text></svg>`
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

export function AvatarImg({ name = '', small = false }) {
  const src = avatarSrc(name)
  return small
    ? <div className="rounded-full overflow-hidden size-4"><img src={src} className="rounded-full object-cover size-4" alt={name} title={name} /></div>
    : <div className="rounded-full overflow-hidden 2xl:size-12 2xl-to-xl:size-10 size-10"><img src={src} className="rounded-full object-cover 2xl:size-12 2xl-to-xl:size-10 size-10" alt={name} title={name} /></div>
}
