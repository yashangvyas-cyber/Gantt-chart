import { Routes, Route } from 'react-router-dom'
import { ConfirmHost } from './components/ConfirmDialog.jsx'
import Portals, { PortalPage } from './pages/Portals.jsx'
import Patterns from './pages/Patterns.jsx'
import Catalogue from './pages/Catalogue.jsx'
import SuperExample from './pages/SuperExample.jsx'
import CheckRecruitment from './pages/check/CheckRecruitment.jsx'
import CheckReports from './pages/check/CheckReports.jsx'
import CheckPayroll from './pages/check/CheckPayroll.jsx'
import CheckCrm from './pages/check/CheckCrm.jsx'
import CheckDropdowns from './pages/check/CheckDropdowns.jsx'
import CheckTabs from './pages/check/CheckTabs.jsx'
import CheckButtons from './pages/check/CheckButtons.jsx'
import CheckBreadcrumb from './pages/check/CheckBreadcrumb.jsx'

// KIT routes. In your prototype, replace them with the real CollabCRM paths (one URL per screen and per tab: ?tab=…).
export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Portals />} />
        <Route path="/portal/:slug" element={<PortalPage />} />
        <Route path="/patterns" element={<Patterns />} />
        <Route path="/components" element={<Catalogue />} />
        <Route path="/super" element={<SuperExample />} />
        {/* sidebar checks (18 Nov 2026): kit shell + copied page content, for verify_fidelity */}
        <Route path="/check/recruitment" element={<CheckRecruitment />} />
        <Route path="/check/reports" element={<CheckReports />} />
        <Route path="/check/payroll" element={<CheckPayroll />} />
        <Route path="/check/sales-crm" element={<CheckCrm />} />
        <Route path="/check/dropdowns" element={<CheckDropdowns />} />
        <Route path="/check/tabs" element={<CheckTabs />} />
        <Route path="/check/buttons" element={<CheckButtons />} />
        <Route path="/check/breadcrumb" element={<CheckBreadcrumb />} />
      </Routes>
      <ConfirmHost />
    </>
  )
}
