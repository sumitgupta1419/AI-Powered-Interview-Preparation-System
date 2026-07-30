import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getResumeById } from "../services/resumeHistoryService";

import ATSScoreCard from "../components/resume/ATSScoreCard";
import SummaryCard from "../components/resume/SummaryCard";
import StrengthCard from "../components/resume/StrengthCard";
import WeaknessCard from "../components/resume/WeaknessCard";
import MissingKeywords from "../components/resume/MissingKeywords";
import SuggestionCard from "../components/resume/SuggestionCard";

function ResumeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResume();
  }, []);

  // ==========================================
  // Fetch Resume Details
  // ==========================================
  const fetchResume = async () => {
    try {
      const response = await getResumeById(id);

      if (response.success) {
        setResume(response.resume);
      } else {
        navigate("/resume/history");
      }
    } catch (error) {
      console.error(error);
      alert("Unable to load resume.");
      navigate("/resume/history");
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // Loading
  // ==========================================
  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center text-white text-2xl">
        Loading Resume...
      </div>
    );
  }

  // ==========================================
  // Resume Not Found
  // ==========================================
  if (!resume) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center text-red-400 text-2xl">
        Resume Not Found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white py-10 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center flex-wrap gap-4 mb-10">

          <div>
            <h1 className="text-5xl font-bold">
              Resume Details
            </h1>

            <p className="text-gray-400 mt-3">
              {resume.originalName || resume.fileName}
            </p>

            <p className="text-gray-500 text-sm mt-2">
              Uploaded on{" "}
              {new Date(resume.createdAt).toLocaleString()}
            </p>
          </div>

          <button
            onClick={() => navigate("/resume/history")}
            className="bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-xl font-semibold transition"
          >
            ← Back
          </button>

        </div>

        {/* Report */}
        <div className="space-y-8">

          <ATSScoreCard score={resume.atsScore} />

          <SummaryCard summary={resume.summary} />

          <StrengthCard
            strengths={resume.strengths || []}
          />

          <WeaknessCard
            weaknesses={resume.weaknesses || []}
          />

          <MissingKeywords
            keywords={resume.missingSkills || []}
          />

          <SuggestionCard
            suggestions={resume.recommendations || []}
          />

        </div>

      </div>
    </div>
  );
}

export default ResumeDetails;