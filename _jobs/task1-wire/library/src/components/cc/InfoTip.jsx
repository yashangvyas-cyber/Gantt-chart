// COPIED: the ⓘ = class string in modules/crm-invoice/dom/goals_tracker.html (14 captures). The dark box = CollabCRM's react-tooltip (445 captures):
// --rt-color-dark #101828 + white text + 3px corners, from _design-system/app-css. Our own part: position fixed, so a card's overflow cannot clip it.
import { useState } from 'react'

export default function InfoTip({ text, className = 'text-base icon-info-circle cursor-pointer text-gray-500', children, wrap = 'relative inline-flex' }) {
  const [at, setAt] = useState(null)
  const show = (e) => { const b = e.currentTarget.getBoundingClientRect(); setAt({ x: Math.min(Math.max(b.left + b.width / 2, 160), window.innerWidth - 160), y: b.top, ax: b.left + b.width / 2 }) }
  return (
    <span className={wrap} onMouseEnter={show} onMouseLeave={() => setAt(null)} onFocus={show} onBlur={() => setAt(null)} tabIndex={0}>
      {children || <span className={className} />}
      {at && (
        <span role="tooltip" style={{ position: 'fixed', left: at.x, top: at.y - 8, transform: 'translate(-50%, -100%)', background: '#101828', color: '#fff', padding: '8px 16px', borderRadius: 3, maxWidth: 296, width: 'max-content', fontSize: 12, fontWeight: 500, lineHeight: '18px', zIndex: 60, whiteSpace: 'normal', textAlign: 'left' }}>
          {text}
          <span style={{ position: 'absolute', bottom: -4, left: `calc(50% + ${at.ax - at.x}px)`, width: 8, height: 8, background: '#101828', transform: 'translateX(-50%) rotate(45deg)' }} />
        </span>
      )}
    </span>
  )
}
