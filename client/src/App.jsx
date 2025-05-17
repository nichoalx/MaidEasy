<<<<<<< HEAD
import { Routes, Route, Navigate } from "react-router-dom"
=======
import { Routes, Route } from "react-router-dom"
>>>>>>> origin/main
import HomePage from "./main-page/home"
import Demo from "./demoPage"
import HouseCleaningPage from "./main-page/house-cleaning"
import OfficeCleaningPage from "./main-page/office-cleaning"
import ToiletCleaningPage from "./main-page/toilet-cleaning"
import WindowCleaningPage from "./main-page/window-cleaning"
<<<<<<< HEAD
import LoginPage from "./main-page/Login";
import PlatformManagement from "./plat-management/platformManagement"
import EditCategory from "./plat-management/edit-category"
import ViewCategory from "./plat-management/view-category"
import Report from "./plat-management/report"
import PlatformProfile from "./plat-management/platform-profile"
import Logout from "./plat-management/Logout"
import "./service-page.css"
=======
import LoginPage from "./main-page/Login"
import Dashboard from "./main-page/admin_dashboard/dashboard"
import EditUser from "./main-page/admin_dashboard/edit-user"
import ViewUser from "./main-page/admin_dashboard/view-user"
import AddUser from "./main-page/admin_dashboard/add-user"
import EditProfile from "./main-page/admin_dashboard/edit-profile"
import ViewProfile from "./main-page/admin_dashboard/view-profile"
import AddProfile from "./main-page/admin_dashboard/add-profile"
import PlatformManagement from "./main-page/plat-management/platformManagement"
import EditCategory from "./main-page/plat-management/edit-category"
import Report from "./main-page/plat-management/report"
import PlatformProfile from "./main-page/plat-management/platform-profile"
import ViewCategory from "./main-page/plat-management/view-category"
>>>>>>> origin/main

// 🧼 Layout for homeowner
import HomeOwner from "./home-owner/HomeOwner" // <- this is actually the layout
import HomeOwnerDashboard from "./home-owner/HomeOwnerDashboard"
import HomeOwnerShortlist from "./home-owner/HomeOwnerShortlist"
import HomeOwnerHistory from "./home-owner/HomeOwnerHistory"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/services/house-cleaning" element={<HouseCleaningPage />} />
      <Route path="/services/office-cleaning" element={<OfficeCleaningPage />} />
      <Route path="/services/toilet-cleaning" element={<ToiletCleaningPage />} />
      <Route path="/services/window-cleaning" element={<WindowCleaningPage />} />
      <Route path="/login" element={<LoginPage />} />
<<<<<<< HEAD
      <Route path="/" element={<Navigate to="/homeowner/dashboard" />} />

      {/* 🏠 HomeOwner layout with subpages */}
      <Route path="/homeowner" element={<HomeOwner />}>
        <Route path="dashboard" element={<HomeOwnerDashboard />} />
        <Route path="shortlist" element={<HomeOwnerShortlist />} />
        <Route path="history" element={<HomeOwnerHistory />} />
      </Route>

      {/* 🛠 Platform manager section */}
=======
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/edit-user/:userId" element={<EditUser />} />
      <Route path="/view-user/:userId" element={<ViewUser />} />
      <Route path="/add-user" element={<AddUser />} />
      <Route path="/edit-profile/:profileId" element={<EditProfile />} />
      <Route path="/view-profile/:profileId" element={<ViewProfile />} />
      <Route path="/add-profile" element={<AddProfile />} />
>>>>>>> origin/main
      <Route path="/platform-management" element={<PlatformManagement />} />
      <Route path="/edit-category/:categoryId" element={<EditCategory />} />
      <Route path="/view-category/:categoryId" element={<ViewCategory />} />
      <Route path="/report" element={<Report />} />
      <Route path="/platform-profile" element={<PlatformProfile />} />
<<<<<<< HEAD
      <Route path="/logout" element={<Logout />} />
    </Routes>
  )
}

=======
    </Routes>
  )
}
>>>>>>> origin/main
