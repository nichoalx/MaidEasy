import { Routes, Route } from "react-router-dom";
import HomePage from "./main-page/home";
import Login from "./main-page/Login";
import PlatformManagement from "./plat-management/platformManagement";
import EditCategory from "./plat-management/edit-category";
import ViewCategory from "./plat-management/view-category";
import Report from "./plat-management/report";
import PlatformProfile from "./plat-management/platform-profile";
import Logout from "./plat-management/Logout";

import NewService from "./cleaner/NewService";
import EditService from "./cleaner/editservice";
import ViewService from "./cleaner/viewservice";
import ConfirmedJobsPage from "./cleaner/confirmedjobs"; // ✅ renamed

import CleanerProfile from "./cleaner/cleanerProfile";
import CleaningServices from "./cleaner/myCleaningService";
import ConfirmedJobs from "./cleaner/cleanerConfirmedJobs";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/platform-management" element={<PlatformManagement />} />
      <Route path="/edit-category/:categoryId" element={<EditCategory />} />
      <Route path="/view-category/:categoryId" element={<ViewCategory />} />
      <Route path="/report" element={<Report />} />
      <Route path="/platform-profile" element={<PlatformProfile />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/cleaner-profile" element={<CleanerProfile />} />
      <Route path="/cleaning-services" element={<CleaningServices />} />
      <Route path="/confirmed-jobs/:id" element={<ConfirmedJobs />} />
      <Route path="/confirmed-service" element={<ConfirmedJobsPage />} /> {/* ✅ added */}
      <Route path="/new-service" element={<NewService />} />
      <Route path="/edit-service/:id" element={<EditService />} />
      <Route path="/view-service/:id" element={<ViewService />} />
    </Routes>
  );
}
