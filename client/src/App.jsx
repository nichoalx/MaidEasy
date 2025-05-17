import { Routes, Route, Navigate } from "react-router-dom";

// Main Pages
import HomePage from "./main-page/home";
import LoginPage from "./main-page/Login";

// Cleaning Service Pages
import HouseCleaningPage from "./main-page/house-cleaning";
import OfficeCleaningPage from "./main-page/office-cleaning";
import ToiletCleaningPage from "./main-page/toilet-cleaning";
import WindowCleaningPage from "./main-page/window-cleaning";

// Admin Dashboard
import Dashboard from "./main-page/admin_dashboard/dashboard";
import EditUser from "./main-page/admin_dashboard/edit-user";
import ViewUser from "./main-page/admin_dashboard/view-user";
import AddUser from "./main-page/admin_dashboard/add-user";
import EditProfile from "./main-page/admin_dashboard/edit-profile";
import ViewProfile from "./main-page/admin_dashboard/view-profile";
import AddProfile from "./main-page/admin_dashboard/add-profile";

// Platform Manager
import PlatformManagement from "./main-page/plat-management/platformManagement";
import EditCategory from "./main-page/plat-management/edit-category";
import ViewCategory from "./main-page/plat-management/view-category";
import Report from "./main-page/plat-management/report";
import PlatformProfile from "./main-page/plat-management/platform-profile";
import Logout from "./plat-management/Logout";

// Cleaner
import CleanerProfile from "./cleaner/cleanerProfile";
import CleaningServices from "./cleaner/myCleaningService";
import ConfirmedJobs from "./cleaner/cleanerConfirmedJobs";
import ConfirmedJobsPage from "./cleaner/confirmedjobs";
import NewService from "./cleaner/NewService";
import EditService from "./cleaner/editservice";
import ViewService from "./cleaner/viewservice";

// Homeowner layout
import HomeOwner from "./home-owner/HomeOwner";
import HomeOwnerDashboard from "./home-owner/HomeOwnerDashboard";
import HomeOwnerShortlist from "./home-owner/HomeOwnerShortlist";
import HomeOwnerHistory from "./home-owner/HomeOwnerHistory";

import "./service-page.css";

export default function App() {
  return (
    <Routes>
      {/* 🌐 Public */}
      <Route path="/" element={<HomePage />} />
      <Route path="/services/house-cleaning" element={<HouseCleaningPage />} />
      <Route path="/services/office-cleaning" element={<OfficeCleaningPage />} />
      <Route path="/services/toilet-cleaning" element={<ToiletCleaningPage />} />
      <Route path="/services/window-cleaning" element={<WindowCleaningPage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* 🏠 Homeowner (nested layout) */}
      <Route path="/homeowner" element={<HomeOwner />}>
        <Route path="dashboard" element={<HomeOwnerDashboard />} />
        <Route path="shortlist" element={<HomeOwnerShortlist />} />
        <Route path="history" element={<HomeOwnerHistory />} />
      </Route>

      {/* 🛠 Platform Manager */}
      <Route path="/platform-management" element={<PlatformManagement />} />
      <Route path="/edit-category/:categoryId" element={<EditCategory />} />
      <Route path="/view-category/:categoryId" element={<ViewCategory />} />
      <Route path="/report" element={<Report />} />
      <Route path="/platform-profile" element={<PlatformProfile />} />
      <Route path="/logout" element={<Logout />} />

      {/* 👨‍🔧 Cleaner */}
      <Route path="/cleaner-profile" element={<CleanerProfile />} />
      <Route path="/cleaning-services" element={<CleaningServices />} />
      <Route path="/confirmed-jobs/:id" element={<ConfirmedJobs />} />
      <Route path="/confirmed-service" element={<ConfirmedJobsPage />} />
      <Route path="/new-service" element={<NewService />} />
      <Route path="/edit-service/:id" element={<EditService />} />
      <Route path="/view-service/:id" element={<ViewService />} />

      {/* 👤 Admin */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/edit-user/:userId" element={<EditUser />} />
      <Route path="/view-user/:userId" element={<ViewUser />} />
      <Route path="/add-user" element={<AddUser />} />
      <Route path="/edit-profile/:profileId" element={<EditProfile />} />
      <Route path="/view-profile/:profileId" element={<ViewProfile />} />
      <Route path="/add-profile" element={<AddProfile />} />
    </Routes>
  );
}
