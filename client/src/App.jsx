import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/landingpage";
import Login from "./components/login";
import Signup from "./components/signup";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;
