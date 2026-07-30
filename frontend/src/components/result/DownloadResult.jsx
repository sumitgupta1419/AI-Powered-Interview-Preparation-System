import { FaDownload } from "react-icons/fa";
import { downloadInterviewReport } from "../../utils/downloadReport";

function DownloadResult({ interview }) {
  if (!interview) return null;

  const handleDownload = () => {
    downloadInterviewReport({
      user: interview.user?.name || "Candidate",
      jobRole: interview.jobRole,
      experience: interview.experience,
      difficulty: interview.difficulty,
      score: interview.score ?? 0,
      feedback: interview.feedback || [],
      skills: interview.skills || {},
      strengths: interview.strengths || [],
      weaknesses: interview.weaknesses || [],
      recommendations: interview.recommendations || [],
    });
  };

  return (
    <div className="bg-slate-900 rounded-3xl p-8 border border-slate-700 shadow-lg text-center">

      <h2 className="text-2xl font-bold mb-6">
        📄 Download Report
      </h2>

      <p className="text-gray-400 mb-8">
        Download your complete AI Interview Report as a PDF.
      </p>

      <button
        onClick={handleDownload}
        className="flex items-center justify-center gap-3 mx-auto bg-green-600 hover:bg-green-700 px-8 py-4 rounded-xl text-lg font-semibold transition hover:scale-105"
      >
        <FaDownload />
        Download Report
      </button>

    </div>
  );
}

export default DownloadResult;