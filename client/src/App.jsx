import { Routes, Route } from "react-router-dom";
import HomeOwner from "./main-page/HomeOwner"; // Correct import

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeOwner />} />
    </Routes>
  );
}