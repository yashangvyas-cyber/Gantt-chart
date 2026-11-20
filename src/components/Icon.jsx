// CollabCRM's icons are an IcoMoon font. The real font + the 1301 icon-*
// rules are pulled from staging into src/icomoon.css and public/fonts/,
// so an <Icon name="chevron-right" /> renders the exact same glyph the app does.
export default function Icon({ name, className = '' }) {
  return <span className={`icon-${name} ${className}`.trim()} aria-hidden="true" />
}
