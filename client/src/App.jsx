import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateProfile from "./CreateProfile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CreateProfile />} />
      </Routes>
    </Router>
  );
}

export default App;