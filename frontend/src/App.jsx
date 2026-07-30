import { BrowserRouter, Routes, Route } from "react-router-dom";

// ============================
// Pages
// ============================
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AIQuestions from "./pages/AIQuestions";
import Interview from "./pages/Interview";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";
import ResumeHistory from "./pages/ResumeHistory";
import ResumeDetails from "./pages/ResumeDetails";
import SpeechEvaluation from "./pages/SpeechEvaluation";
import PerformanceDashboard from "./pages/PerformanceDashboard";
import Result from "./pages/Result";
import Profile from "./pages/Profile";

// ✅ Import Settings Page
import Settings from "./pages/Settings";

// ============================
// Protected Route
// ============================
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ============================
              Public Routes
        ============================ */}

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ============================
            Protected Routes
        ============================ */}

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/questions"
          element={
            <PrivateRoute>
              <AIQuestions />
            </PrivateRoute>
          }
        />

        <Route
          path="/interview"
          element={
            <PrivateRoute>
              <Interview />
            </PrivateRoute>
          }
        />

        {/* ============================
            Resume Analyzer
        ============================ */}

        <Route
          path="/resume"
          element={
            <PrivateRoute>
              <ResumeAnalyzer />
            </PrivateRoute>
          }
        />

        <Route
          path="/resume/history"
          element={
            <PrivateRoute>
              <ResumeHistory />
            </PrivateRoute>
          }
        />

        <Route
          path="/resume/:id"
          element={
            <PrivateRoute>
              <ResumeDetails />
            </PrivateRoute>
          }
        />

        {/* ============================
            Speech Evaluation
        ============================ */}

        <Route
          path="/speech"
          element={
            <PrivateRoute>
              <SpeechEvaluation />
            </PrivateRoute>
          }
        />

        {/* ============================
            Performance Dashboard
        ============================ */}

        <Route
          path="/performance"
          element={
            <PrivateRoute>
              <PerformanceDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/result"
          element={
            <PrivateRoute>
              <Result />
            </PrivateRoute>
          }
        />

        {/* ============================
            Profile
        ============================ */}

        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />

        {/* ============================
            Settings
        ============================ */}

        <Route
          path="/settings"
          element={
            <PrivateRoute>
              <Settings />
            </PrivateRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;