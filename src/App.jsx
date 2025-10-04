import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing/Landing.jsx";
import LoginForm from "./pages/Landing/AuthModal/LoginForm.jsx";
import SignupForm from "./pages/Landing/AuthModal/SignupForm.jsx";
import Assessment from "./pages/Assessment/Assessment.jsx";
import Intake from "./pages/Intake/Intake.jsx";
import "./css/colors.css";
import Buffer from "./pages/Intake/Buffer/Buffer.jsx";
import Results from "./pages/Results/Results.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/assessment" element={<Assessment />} />
        <Route path="/intake" element={<Intake />} />
        <Route path="/buffer" element={<Buffer />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
