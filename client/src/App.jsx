import { Routes, Route } from "react-router-dom";
import HomePage from "./main-page/home";
import HouseCleaningPage from "./main-page/house-cleaning";
import OfficeCleaningPage from "./main-page/office-cleaning";
import ToiletCleaningPage from "./main-page/toilet-cleaning";
import WindowCleaningPage from "./main-page/window-cleaning";
import LoginPage from "./main-page/Login";
import AdminDashboard from "./admin/AdminDashboard";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { useAuth } from "./hooks/useAuth";
import "./App.css";
import "./service-page.css";

export default function App() {
  const { user } = useAuth(); // Get current user from auth context

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<LoginPage />} />
      
      {/* Admin-only routes */}
      <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Route>

      {/* Shared protected routes */}
      <Route element={<ProtectedRoute allowedRoles={['cleaner', 'homeowner', 'admin']} />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/services/house-cleaning" element={<HouseCleaningPage />} />
        <Route path="/services/office-cleaning" element={<OfficeCleaningPage />} />
        <Route path="/services/toilet-cleaning" element={<ToiletCleaningPage />} />
        <Route path="/services/window-cleaning" element={<WindowCleaningPage />} />
      </Route>

      {/* Role-based redirect after login */}
      <Route path="/" element={<RoleBasedRedirect />} />
    </Routes>
  );
}

// RoleBasedRedirect component
function RoleBasedRedirect() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      switch(user.type_of_user) {
        case 'admin':
          navigate('/admin/dashboard');
          break;
        case 'cleaner':
        case 'homeowner':
          navigate('/services');
          break;
        default:
          navigate('/');
      }
    } else {
      navigate('/login');
    }
  }, [user]);

  return null;
}