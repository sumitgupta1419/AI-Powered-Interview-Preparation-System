import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import ScoreCard from "../components/result/ScoreCard";
import FeedbackCard from "../components/result/FeedbackCard";
import SkillAnalysis from "../components/result/SkillAnalysis";
import StrengthCard from "../components/result/StrengthCard";
import WeaknessCard from "../components/result/WeaknessCard";
import RecommendationCard from "../components/result/RecommendationCard";
import DownloadResult from "../components/result/DownloadResult";

import { getInterviewById } from "../services/interviewService";

function Result() {
  const [interview, setInterview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInterview();
  }, []);

  const fetchInterview = async () => {
    try {
      const interviewId = localStorage.getItem("interviewId");

      if (!interviewId) {
        setLoading(false);
        return;
      }

      const response = await getInterviewById(interviewId);

      if (response.success && response.interview) {
        setInterview(response.interview);
      }
    } catch (error) {
      console.error("Result Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Loading Screen
  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] flex justify-center items-center">

        <h1 className="text-3xl font-bold text-cyan-400 animate-pulse">
          Loading Interview Result...
        </h1>

      </div>
    );
  }

  // No Interview
  if (!interview) {
    return (
      <div className="min-h-screen bg-[#020617] flex flex-col justify-center items-center text-center px-6">

        <h1 className="text-5xl font-bold text-white mb-6">
          Interview Result Not Found
        </h1>

        <p className="text-gray-400 mb-8">
          Please complete an interview first.
        </p>

        <Link
          to="/questions"
          className="bg-cyan-500 hover:bg-cyan-600 px-8 py-3 rounded-xl font-bold"
        >
          Generate Interview
        </Link>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white py-10 px-6">

      <div className="max-w-7xl mx-auto">

        {/* Heading */}

        <div className="text-center mb-12">

          <h1 className="text-5xl font-bold">
            🎯 Interview Result
          </h1>

          <p className="text-gray-400 mt-4">
            AI evaluation based on your interview performance.
          </p>

        </div>

        {/* Score + Feedback */}

        <div className="grid lg:grid-cols-3 gap-8">

          <ScoreCard interview={interview} />

          <div className="lg:col-span-2">
            <FeedbackCard interview={interview} />
          </div>

        </div>

        {/* Skills */}

        <div className="mt-10">

          <SkillAnalysis interview={interview} />

        </div>

        {/* Strengths + Weaknesses */}

        <div className="grid lg:grid-cols-2 gap-8 mt-10">

          <StrengthCard
            strengths={interview.strengths || []}
          />

          <WeaknessCard
            weaknesses={interview.weaknesses || []}
          />

        </div>

        {/* Recommendations */}

        <div className="mt-10">

          <RecommendationCard
            recommendations={interview.recommendations || []}
          />

        </div>

        {/* Download */}

        <div className="mt-10">

          <DownloadResult interview={interview} />

        </div>

        {/* Back Button */}

        <div className="text-center mt-12">

          <Link
            to="/dashboard"
            className="bg-cyan-500 hover:bg-cyan-600 px-8 py-3 rounded-xl font-bold transition"
          >
            ← Back to Dashboard
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Result;