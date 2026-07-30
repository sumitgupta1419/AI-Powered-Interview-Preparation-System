import { Link } from "react-router-dom";
import { FaPlay, FaFileAlt, FaMicrophone } from "react-icons/fa";

import { useDashboard } from "../context/DashboardContext";

import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import StatCard from "../components/dashboard/StatCard";
import PerformanceChart from "../components/dashboard/PerformanceChart";
import SkillsCard from "../components/dashboard/SkillsCard";
import RecommendationCard from "../components/dashboard/RecommendationCard";
import RecentInterviews from "../components/dashboard/RecentInterviews";

function Dashboard() {
  const {
    stats,
    performance,
    skills,
    recommendations,
    loading,
    error,
  } = useDashboard();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] flex justify-center items-center text-white text-2xl">
        Loading Dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#020617] flex justify-center items-center text-red-500 text-xl">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Topbar */}
        <Topbar />

        {/* Welcome */}
        <div className="mb-10">
          <h1 className="text-5xl font-bold">
            📊 Performance Dashboard
          </h1>

          <p className="text-gray-400 mt-3">
            Welcome back! Monitor your interview preparation progress and improve every day.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard
            title="Total Interviews"
            value={stats?.totalInterviews ?? 0}
            color="text-cyan-400"
          />

          <StatCard
            title="Completed"
            value={stats?.completedInterviews ?? 0}
            color="text-green-400"
          />

          <StatCard
            title="Pending"
            value={stats?.pendingInterviews ?? 0}
            color="text-yellow-400"
          />

          <StatCard
            title="Average Score"
            value={stats?.averageScore ?? 0}
            color="text-purple-400"
          />
        </div>

        {/* Performance */}
        <div className="mt-10">
          <PerformanceChart performance={performance} />
        </div>

        {/* Skills & Recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
          <SkillsCard skills={skills} />

          <RecommendationCard
            recommendations={recommendations}
          />
        </div>

        {/* Recent Interviews */}
        <div className="mt-10">
          <RecentInterviews />
        </div>

        {/* Quick Actions */}
        <div className="mt-10">
          <h2 className="text-3xl font-bold mb-6">
            🚀 Quick Actions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <Link
              to="/questions"
              className="bg-cyan-500 hover:bg-cyan-600 rounded-2xl p-6 transition hover:scale-105"
            >
              <FaPlay size={35} />
              <h3 className="text-2xl font-bold mt-4">
                AI Questions
              </h3>
              <p className="mt-3">
                Generate interview questions instantly.
              </p>
            </Link>

            <Link
              to="/resume"
              className="bg-green-600 hover:bg-green-700 rounded-2xl p-6 transition hover:scale-105"
            >
              <FaFileAlt size={35} />
              <h3 className="text-2xl font-bold mt-4">
                Resume Analyzer
              </h3>
              <p className="mt-3">
                Check ATS score and resume quality.
              </p>
            </Link>

            <Link
              to="/speech"
              className="bg-indigo-600 hover:bg-indigo-700 rounded-2xl p-6 transition hover:scale-105"
            >
              <FaMicrophone size={35} />
              <h3 className="text-2xl font-bold mt-4">
                Speech Evaluation
              </h3>
              <p className="mt-3">
                Improve confidence and communication.
              </p>
            </Link>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;