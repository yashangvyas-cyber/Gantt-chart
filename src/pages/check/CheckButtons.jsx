// /check/buttons (19 Nov 2026): every kit button group — live captured markup beside the kit output.
// The captured hover / focus / disabled state rows also show the captured computed styles beside
// the kit's computed styles (the page measures kit styles client-side; kitshots.cjs re-measures
// in-state via puppeteer for the authoritative compare).
import { useState, useEffect } from 'react'
import { LiveButton } from '../../components/Buttons.jsx'
import { BL } from '../../data/buttonsLive.js'
import { BUTTON_STATE_ROWS } from '../../data/buttonsCapturedStates.js'

const STYLE_PROPS = ['backgroundColor', 'color', 'borderColor', 'boxShadow', 'opacity']

function btnStyles(root) {
  const btn = root.querySelector('button, [role="button"]')
  if (!btn) return null
  const cs = window.getComputedStyle(btn)
  const o = {}
  STYLE_PROPS.forEach((p) => { o[p] = cs.getPropertyValue(p) || '' })
  return o
}

export default function CheckButtons() {
  const [kitStyles, setKitStyles] = useState({})
  useEffect(() => {
    const next = {}
    document.querySelectorAll('[data-cell]').forEach((el) => {
      next[el.dataset.cell] = btnStyles(el)
    })
    setKitStyles(next)
  }, [])

  const groupRows = Object.entries(BL).map(([gid, g]) => {
    const cell = (g && g.cells && g.cells.default) || {}
    return { gid, look: g.look, tag: g.tag, live: cell.outer || '', label: (cell && cell.label) || '' }
  })

  const liveStyles = (id) => { const s = kitStyles[id]; return s || {} }
  const captured = (r) => r.styles || {}

  return (
    <div className="bg-white p-4" style={{ fontFamily: 'Inter, sans-serif' }}>
      <h1 className="text-lg font-semibold text-gray-900 mb-4">Buttons: live captured markup beside the kit, 19 Nov 2026</h1>
      <p className="text-xs text-gray-500 mb-4">
        {groupRows.length} groups from _kit/src/data/buttonsLive.js rendered via LiveButton (dangerouslySetInnerHTML of the captured outerHTML), plus {BUTTON_STATE_ROWS.length} captured hover/focus/disabled state rows with captured vs kit computed styles (kit styles measured client-side; kitshots.cjs measures in-state for the authoritative compare).
      </p>

      <section className="mb-8">
        <h2 className="text-sm font-semibold text-gray-800 mb-2">All {groupRows.length} groups — default cell</h2>
        {groupRows.map((r) => (
          <div key={r.gid} className="flex gap-6 items-start border-b border-gray-200 py-3">
            <div className="w-48 text-xs text-gray-600 shrink-0">
              {r.gid}&nbsp;·&nbsp;{r.tag}<br className="hidden" />
              <span className="text-gray-400">Look {r.look}</span>
            </div>
            <div className="w-96 shrink-0" style={{ padding: 10, minHeight: 44 }}>
              <div className="text-[10px] text-gray-400 mb-1">live</div>
              <div data-cell={`g__${r.gid}__default`} className="border border-gray-300 rounded p-2" dangerouslySetInnerHTML={{ __html: r.live }} />
            </div>
            <div className="flex-1 min-w-0" style={{ padding: 10, minHeight: 44 }}>
              <div className="text-[10px] text-gray-400 mb-1">kit</div>
              <div data-cell={`k__${r.gid}__default`} className="border border-gray-300 rounded p-2"><LiveButton group={r.gid} label={r.label} /></div>
            </div>
          </div>
        ))}
      </section>

      <section>
        <h2 className="text-sm font-semibold text-gray-800 mb-2">Captured states: hover / focus / disabled ({BUTTON_STATE_ROWS.length} rows)</h2>
        {BUTTON_STATE_ROWS.map((r) => {
          const kitId = `k__s__${r.id}`
          const cap = captured(r)
          const kit = liveStyles(kitId)
          return (
            <div key={r.id} className="flex gap-6 items-start border-b border-gray-200 py-3">
              <div className="w-48 text-xs text-gray-600 shrink-0">
                {r.group}&nbsp;·&nbsp;{r.state}<br className="hidden" />
                <span className="text-gray-400">Look {r.look} · {r.capture.split('/').pop()}</span>
              </div>
              <div className="w-96 shrink-0" style={{ padding: 10, minHeight: 44 }}>
                <div className="text-[10px] text-gray-400 mb-1">live capture</div>
                <div data-cell={`s__${r.id}__live`} className="border border-gray-300 rounded p-2" dangerouslySetInnerHTML={{ __html: r.outer }} />
              </div>
              <div className="flex-1 min-w-0" style={{ padding: 10, minHeight: 44 }}>
                <div className="text-[10px] text-gray-400 mb-1">kit</div>
                <div data-cell={kitId} className="border border-gray-300 rounded p-2">
                  <LiveButton group={r.group} label={r.text} disabled={r.state === 'disabled'} variant={r.state === 'disabled' ? undefined : r.class} />
                </div>
                {Object.keys(cap).length > 0 && (
                  <div className="mt-3 p-2 border border-gray-200 rounded bg-gray-50 text-[10px]">
                    <div className="font-semibold mb-1">computed styles: captured vs kit</div>
                    <table className="text-[10px]">
                      <thead><tr><th className="text-left pl-1">prop</th><th className="text-left">captured</th><th className="text-left">kit (client-measured)</th></tr></thead>
                      <tbody>
                        {STYLE_PROPS.map((p) => (
                          <tr key={r.id + p}>
                            <td className="pl-1">{p}</td>
                            <td>{cap[p]}</td>
                            <td>{kit[p]}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </section>
    </div>
  )
}