import {
  FaClipboardCheck,
  FaChartLine,
  FaTrophy,
  FaClock,
} from "react-icons/fa";

import StatsCard from "../components/performance/StatsCard";
import PerformanceChart from "../components/performance/PerformanceChart";
import Recommendation from "../components/performance/Recommendation";
import InterviewHistory from "../components/performance/InterviewHistory";
import SkillsCard from "../components/performance/SkillsCard";

function PerformanceDashboard() {
  return (
    <div className="min-h-screen bg-[#020617] text-white p-8">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="mb-10">

          <h1 className="text-5xl font-bold">
            📊 Performance Dashboard
          </h1>

          <p className="text-gray-400 mt-3">
            Track your interview performance and improve every day.
          </p>

        </div>

        {/* Statistics */}

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mb-10">

          <StatsCard
            title="Total Interviews"
            value="12"
            icon={<FaClipboardCheck />}
            color="text-cyan-400"
          />

          <StatsCard
            title="Average Score"
            value="89%"
            icon={<FaChartLine />}
            color="text-green-400"
          />

          <StatsCard
            title="Best Score"
            value="96%"
            icon={<FaTrophy />}
            color="text-yellow-400"
          />

          <StatsCard
            title="Practice Hours"
            value="18 Hrs"
            icon={<FaClock />}
            color="text-purple-400"
          />

        </div>

        {/* Performance Graph */}

        <div className="mb-10">
          <PerformanceChart />
        </div>

        {/* Skills + AI Recommendation */}

        <div className="grid lg:grid-cols-2 gap-8 mb-10">

          <SkillsCard />

          <Recommendation />

        </div>

        {/* Interview History */}

        <InterviewHistory />

      </div>

    </div>
  );
}

export default PerformanceDashboard;