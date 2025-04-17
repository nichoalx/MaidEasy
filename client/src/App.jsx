
import { Routes, Route } from "react-router-dom"
import HomePage from "./main-page/home"
import HouseCleaningPage from "./main-page/house-cleaning"
import OfficeCleaningPage from "./main-page/office-cleaning"
import ToiletCleaningPage from "./main-page/toilet-cleaning"
import WindowCleaningPage from "./main-page/window-cleaning"
import LoginPage from "./main-page/Login";
import "./App.css"
import "./service-page.css"

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