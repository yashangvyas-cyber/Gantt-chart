// /check/breadcrumb (19 Nov 2026): every breadcrumb group — the live captured <nav> beside the kit output (LiveBreadcrumb),
// plus the live hover / default rows measured on staging. kitshots.cjs in _graph/jobs/breadcrumb-2026-11-19 compares
// element by element and re-measures the kit in-state (hover) for the style compare.
import { LiveBreadcrumb, BREADCRUMB_GROUPS } from '../../components/Breadcrumbs.jsx'
import { BCL, BC_STATE_ROWS } from '../../data/breadcrumbLive.js'

export default function CheckBreadcrumb() {
  const live = [...new Set(BC_STATE_ROWS.map((r) => r.group))]
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-lg font-semibold text-gray-900 mb-1">Breadcrumb: live capture vs kit</h1>
      <p className="text-xs text-gray-500 mb-4">{BREADCRUMB_GROUPS.length} groups · {BC_STATE_ROWS.length} live state rows</p>
      <section className="mb-8">
        {BREADCRUMB_GROUPS.map((gid) => (
          <div key={gid} className="border-b border-gray-200 py-3">
            <div className="text-xs text-gray-600 mb-1">{gid} · {BCL[gid].captures} captures · {BCL[gid].portals.join(', ')} · {BCL[gid].src.split('/').pop()}</div>
            <div className="text-[10px] text-gray-400">live</div>
            <div data-cell={`g__${gid}`} className="border border-gray-300 bg-white mb-2" dangerouslySetInnerHTML={{ __html: BCL[gid].outer }} />
            <div className="text-[10px] text-gray-400">kit</div>
            <div data-cell={`k__${gid}`} className="border border-gray-300 bg-white"><LiveBreadcrumb group={gid} /></div>
          </div>
        ))}
      </section>
      <section>
        <h2 className="text-sm font-semibold text-gray-800 mb-2">Live states measured on staging (hover / default)</h2>
        {live.map((gid) => (
          <div key={gid} className="border-b border-gray-200 py-3">
            <div className="text-xs text-gray-600 mb-1">{gid} · {BC_STATE_ROWS.find((r) => r.group === gid).route}</div>
            <div data-state-cell={gid} className="border border-gray-300 bg-white"><LiveBreadcrumb group={gid} /></div>
          </div>
        ))}
      </section>
    </div>
  )
}
