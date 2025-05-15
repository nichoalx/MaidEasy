import { Routes, Route, Navigate } from "react-router-dom"
import HomePage from "./main-page/home"
import Demo from "./demoPage"
import PlatformManagement from "./plat-management/platformManagement"
import EditCategory from "./plat-management/edit-category"
import ViewCategory from "./plat-management/view-category"
import Report from "./plat-management/report"
import PlatformProfile from "./plat-management/platform-profile"
import Logout from "./plat-management/Logout"

// 🧼 Layout for homeowner
import HomeOwner from "./home-owner/HomeOwner" // <- this is actually the layout
import HomeOwnerDashboard from "./home-owner/HomeOwnerDashboard"
import HomeOwnerShortlist from "./home-owner/HomeOwnerShortlist"
import HomeOwnerHistory from "./home-owner/HomeOwnerHistory"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/homeowner/dashboard" />} />
      <Route path="/demoPage" element={<Demo />} />

      {/* 🏠 HomeOwner layout with subpages */}
      <Route path="/homeowner" element={<HomeOwner />}>
        <Route path="dashboard" element={<HomeOwnerDashboard />} />
        <Route path="shortlist" element={<HomeOwnerShortlist />} />
        <Route path="history" element={<HomeOwnerHistory />} />
      </Route>

      {/* 🛠 Platform manager section */}
      <Route path="/platform-management" element={<PlatformManagement />} />
      <Route path="/edit-category/:categoryId" element={<EditCategory />} />
      <Route path="/view-category/:categoryId" element={<ViewCategory />} />
      <Route path="/report" element={<Report />} />
      <Route path="/platform-profile" element={<PlatformProfile />} />
      <Route path="/logout" element={<Logout />} />
    </Routes>
  )
}
