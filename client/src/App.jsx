import { Routes, Route } from "react-router-dom";
import HomeOwner from "./main-page/HomeOwner"; 
import Logout from "./main-page/Logout";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeOwner />} />
      <Route path="/logout" element={<Logout />} />
    </Routes>
  );
}