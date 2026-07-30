import { createContext, useContext, useEffect, useState } from "react";
import API from "../api/axios";
import { useAuth } from "./AuthContext";

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const { token } = useAuth();

  const [stats, setStats] = useState({});
  const [recentInterviews, setRecentInterviews] = useState([]);
  const [performance, setPerformance] = useState({});
  const [skills, setSkills] = useState({});
  const [recommendations, setRecommendations] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchDashboardData = async () => {
    if (!token) return;

    try {
      setLoading(true);
      setError("");

      console.log("Loading Dashboard...");

      const [statsRes, recentRes, performanceRes] = await Promise.all([
        API.get("/dashboard/stats"),
        API.get("/dashboard/recent"),
        API.get("/dashboard/performance"),
      ]);

      console.log("Dashboard Stats:", statsRes.data);
      console.log("Recent Interviews:", recentRes.data);
      console.log("Performance:", performanceRes.data);

      setStats(statsRes.data.stats || {});
      setSkills(statsRes.data.skills || {});
      setRecommendations(statsRes.data.recommendations || []);

      setRecentInterviews(
        recentRes.data.recentInterviews || []
      );

      setPerformance(
        performanceRes.data.performance || {}
      );

    } catch (err) {
      console.error(
        "Dashboard Error:",
        err.response?.data || err.message
      );

      setError(
        err.response?.data?.message ||
          "Unable to load dashboard."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [token]);

  return (
    <DashboardContext.Provider
      value={{
        stats,
        recentInterviews,
        performance,
        skills,
        recommendations,
        loading,
        error,
        fetchDashboardData,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => useContext(DashboardContext);