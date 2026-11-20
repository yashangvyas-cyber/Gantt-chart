// KIT: every CollabCRM portal shell with its real sidebar. Routes: / (index) and /portal/:slug.
// Sidebars: src/data/portal_nav.js (generated from the crawl by _tools/extract_nav.py) + PEOPLE_NAV (nav.js).
// DIVERGES: KIT-only index list (not a CollabCRM screen). Link class = TLINK in components/super/ui.jsx.
import { Link, useParams } from 'react-router-dom'
import AppShell from '../components/AppShell.jsx'
import PageFrame from '../components/cc/PageFrame.jsx'
import { PEOPLE_NAV, RECRUITMENT_NAV, REPORTS_NAV, PAYROLL_NAV, CRM_NAV } from '../data/nav.js'
import { PORTAL_NAV } from '../data/portal_nav.js'
import { TLINK } from '../components/super/ui.jsx'
import DemoMenu from '../components/demo/DemoMenu.jsx'
import Pin from '../components/demo/Pin.jsx'

export const PORTALS = [['people', 'People'], ['sales-crm', 'CRM & Invoice'], ['project-management', 'Project Management'], ['recruitment', 'Recruitment'], ['reports', 'Reports'], ['payroll', 'Payroll'], ['administration', 'Administration']]
const OWN_NAV = { people: PEOPLE_NAV, recruitment: RECRUITMENT_NAV, reports: REPORTS_NAV, payroll: PAYROLL_NAV, 'sales-crm': CRM_NAV }
const navOf = (slug) => OWN_NAV[slug] || PORTAL_NAV[slug]?.items || []

export function PortalPage() {
  const { slug } = useParams()
  const name = PORTALS.find(([s]) => s === slug)?.[1] || slug
  return (
    <AppShell portal={slug} nav={navOf(slug)} active="Dashboard" topRight={<DemoMenu />}>
      <PageFrame crumbs={[{ label: name }]}>
        <p className="2xl:text-sm 2xl-to-xl:text-xs text-xs text-gray-600">Sidebar source: {slug === 'people' ? 'src/data/nav.js PEOPLE_NAV' : PORTAL_NAV[slug]?.source}</p>
      </PageFrame>
    </AppShell>
  )
}

export default function Portals() {
  const links = [...PORTALS.map(([s, n]) => [`/portal/${s}`, `${n} shell`]), ['/super', 'Super Admin shell'], ['/patterns', 'Every UI pattern variant in CollabCRM'], ['/components', 'Kit components']]
  return (
    <AppShell portal="people" nav={PEOPLE_NAV} active="Dashboard" topRight={<DemoMenu />}>
      <PageFrame crumbs={[{ label: 'CollabCRM prototype kit' }]}>
        <Pin s="K1" n={1} />
        <div className="grid gap-3">{links.map(([to, label]) => <Link key={to} to={to} className={TLINK}>{label}</Link>)}</div>
      </PageFrame>
    </AppShell>
  )
}
