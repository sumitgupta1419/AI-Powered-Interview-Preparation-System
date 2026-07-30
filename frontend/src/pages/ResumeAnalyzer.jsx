import { useState } from "react";
import { Link } from "react-router-dom";

import ResumeUpload from "../components/resume/ResumeUpload";
import ResumePreview from "../components/resume/ResumePreview";
import LoadingAnalysis from "../components/resume/LoadingAnalysis";

import ATSScoreCard from "../components/resume/ATSScoreCard";
import SummaryCard from "../components/resume/SummaryCard";
import StrengthCard from "../components/resume/StrengthCard";
import WeaknessCard from "../components/resume/WeaknessCard";
import MissingKeywords from "../components/resume/MissingKeywords";
import SuggestionCard from "../components/resume/SuggestionCard";

import { useAuth } from "../context/AuthContext";
import { useResume } from "../context/ResumeContext";

import { uploadResume } from "../services/resumeService";
import downloadResumeReport from "../utils/pdfGenerator";

function ResumeAnalyzer() {
  const { user } = useAuth();

  const {
    resume,
    setResume,
    report,
    setReport,
    loading,
    setLoading,
  } = useResume();

  const [file, setFile] = useState(null);

  const analyzeResume = async () => {
    if (!file) {
      alert("Please upload a resume first.");
      return;
    }

    try {
      setLoading(true);

      setResume(null);
      setReport(null);

      const response = await uploadResume(file);

      if (response?.success) {
        setResume(response.resume);
        setReport(response.report);
      } else {
        alert("Resume analysis failed.");
      }

    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
        error.message ||
        "Resume analysis failed."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!report) {
      alert("No report available.");
      return;
    }

    downloadResumeReport({
      user,
      report,
    });
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white py-10 px-6">
      <div className="max-w-6xl mx-auto">

        <div className="flex justify-between items-center flex-wrap gap-4 mb-12">

          <div>
            <h1 className="text-5xl font-bold">
              📄 AI Resume Analyzer
            </h1>

            <p className="text-gray-400 mt-3">
              Upload your resume and receive an AI-powered ATS analysis.
            </p>
          </div>

          <Link
            to="/resume/history"
            className="bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-xl font-semibold transition"
          >
            Resume History
          </Link>

        </div>

        <ResumeUpload onFileSelect={setFile} />

        <ResumePreview file={file} />

        {file && !loading && !report && (
          <div className="text-center mt-10">
            <button
              onClick={analyzeResume}
              className="bg-cyan-500 hover:bg-cyan-600 px-10 py-4 rounded-xl text-xl font-bold transition"
            >
              Analyze Resume
            </button>
          </div>
        )}

        {loading && (
          <div className="mt-10">
            <LoadingAnalysis />
          </div>
        )}

        {report && (
          <div className="space-y-8 mt-10">

            <ATSScoreCard score={report?.atsScore ?? 0} />

            <SummaryCard summary={report?.summary || ""} />

            <div className="grid lg:grid-cols-2 gap-8">

              <StrengthCard
                strengths={report?.strengths || []}
              />

              <WeaknessCard
                weaknesses={report?.weaknesses || []}
              />

            </div>

            <div className="grid lg:grid-cols-2 gap-8">

              <MissingKeywords
                keywords={report?.missingSkills || []}
              />

              <SuggestionCard
                suggestions={report?.recommendations || []}
              />

            </div>

            <div className="text-center pt-4">

              <button
                onClick={handleDownload}
                className="bg-green-600 hover:bg-green-700 px-10 py-4 rounded-xl text-xl font-bold transition"
              >
                📥 Download Report
              </button>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default ResumeAnalyzer;