import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/home";
import HouseCleaningPage from "./pages/house-cleaning";
import OfficeCleaningPage from "./pages/office-cleaning";
import ToiletCleaningPage from "./pages/toilet-cleaning";
import WindowCleaningPage from "./pages/window-cleaning";
import LoginPage from "./pages/Login"; // <- based on your current path
import "./App.css";
import "./service-page.css";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/services/house-cleaning" element={<HouseCleaningPage />} />
      <Route path="/services/office-cleaning" element={<OfficeCleaningPage />} />
      <Route path="/services/toilet-cleaning" element={<ToiletCleaningPage />} />
      <Route path="/services/window-cleaning" element={<WindowCleaningPage />} />
      <Route path="/login" element={<LoginPage />} /> 
    </Routes>
  );
}