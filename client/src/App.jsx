import { Routes, Route, Navigate } from "react-router-dom"
import HomePage from "./main-page/home"
import PlatformManagement from "./plat-management/platformManagement"
import EditCategory from "./plat-management/edit-category"
import ViewCategory from "./plat-management/view-category"
import Report from "./plat-management/report"
import PlatformProfile from "./plat-management/platform-profile"
import Logout from "./plat-management/Logout"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/platform-management" />} />
      <Route path="/platform-management" element={<PlatformManagement />} />
      <Route path="/edit-category/:categoryId" element={<EditCategory />} />
      <Route path="/view-category/:categoryId" element={<ViewCategory />} />
      <Route path="/report" element={<Report />} />
      <Route path="/platform-profile" element={<PlatformProfile />} />
      <Route path="/logout" element={<Logout />} />
    </Routes>
  )
}
