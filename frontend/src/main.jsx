import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

// Context Providers
import { AuthProvider } from "./context/AuthContext";
import { InterviewProvider } from "./context/InterviewContext";
import { DashboardProvider } from "./context/DashboardContext";
import { ResumeProvider } from "./context/ResumeContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>

    <AuthProvider>

      <InterviewProvider>

        <DashboardProvider>

          <ResumeProvider>

            <App />

          </ResumeProvider>

        </DashboardProvider>

      </InterviewProvider>

    </AuthProvider>

  </StrictMode>
);