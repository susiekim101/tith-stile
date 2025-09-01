import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing/Landing.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup";
/*import Results from "./components/Results.jsx";*/
import Assessment from "./pages/Assessment/Assessment.jsx";
import Intake from "./pages/Intake/Intake.jsx";
import "./css/colors.css";
import Buffer from "./pages/Intake/Buffer/Buffer.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/assessment" element={<Assessment />} />
        <Route path="/intake" element={<Intake />} />
        <Route path="/buffer" element={<Buffer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
