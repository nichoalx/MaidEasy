import { Routes, Route } from "react-router-dom"
import HomePage from "./main-page/home"
import HouseCleaningPage from "./main-page/house-cleaning"
import OfficeCleaningPage from "./main-page/office-cleaning"
import ToiletCleaningPage from "./main-page/toilet-cleaning"
import WindowCleaningPage from "./main-page/window-cleaning"
import LoginPage from "./main-page/Login"
import Dashboard from "./main-page/admin_dashboard/dashboard"
import EditUser from "./main-page/admin_dashboard/edit-user"
import ViewUser from "./main-page/admin_dashboard/view-user"
import AddUser from "./main-page/admin_dashboard/add-user"
import EditProfile from "./main-page/admin_dashboard/edit-profile"
import ViewProfile from "./main-page/admin_dashboard/view-profile"
import AddProfile from "./main-page/admin_dashboard/add-profile"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/services/house-cleaning" element={<HouseCleaningPage />} />
      <Route path="/services/office-cleaning" element={<OfficeCleaningPage />} />
      <Route path="/services/toilet-cleaning" element={<ToiletCleaningPage />} />
      <Route path="/services/window-cleaning" element={<WindowCleaningPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/edit-user/:userId" element={<EditUser />} />
      <Route path="/view-user/:userId" element={<ViewUser />} />
      <Route path="/add-user" element={<AddUser />} />
      <Route path="/edit-profile/:profileId" element={<EditProfile />} />
      <Route path="/view-profile/:profileId" element={<ViewProfile />} />
      <Route path="/add-profile" element={<AddProfile />} />
    </Routes>
  )
}
