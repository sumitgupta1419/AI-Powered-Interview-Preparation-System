import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import ResumeAnalyzer from "../pages/ResumeAnalyzer";
import AIQuestions from "../pages/AIQuestions";
import Interview from "../pages/Interview";
import Result from "../pages/Result";
import Profile from "../pages/Profile";
import InterviewHistory from "../pages/InterviewHistory";
import InterviewDetail from "../pages/InterviewDetail";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Resume Analyzer */}
        <Route path="/resume" element={<ResumeAnalyzer />} />

        {/* AI Interview */}
        <Route path="/questions" element={<AIQuestions />} />
        <Route path="/interview" element={<Interview />} />
        <Route path="/result" element={<Result />} />

        {/* Interview History */}
        <Route path="/history" element={<InterviewHistory />} />
        <Route
          path="/history/:id"
          element={<InterviewDetail />}
        />

        {/* Profile */}
        <Route path="/profile" element={<Profile />} />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;