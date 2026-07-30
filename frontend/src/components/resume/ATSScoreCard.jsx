import { FaAward } from "react-icons/fa";

function ATSScoreCard({ score = 0 }) {
  // Ensure score is always a number
  score = Number(score) || 0;

  let scoreColor = "text-red-500";
  let progressColor = "bg-red-500";
  let message = "Your resume needs optimization for ATS systems.";

  if (score >= 90) {
    scoreColor = "text-green-400";
    progressColor = "bg-green-500";
    message = "Excellent! Your resume is highly ATS-friendly.";
  } else if (score >= 75) {
    scoreColor = "text-yellow-400";
    progressColor = "bg-yellow-500";
    message = "Good resume. A few improvements can increase your score.";
  }

  return (
    <div className="bg-slate-900 rounded-3xl p-8 border border-slate-700 shadow-lg">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">ATS Score</h2>

        <FaAward className="text-yellow-400 text-4xl" />
      </div>

      <div className="text-center">
        <h1 className={`text-7xl font-bold ${scoreColor}`}>
          {score}%
        </h1>

        <p className="text-gray-400 mt-4">
          {message}
        </p>
      </div>

      <div className="mt-8">
        <div className="w-full h-4 bg-slate-700 rounded-full overflow-hidden">
          <div
            className={`${progressColor} h-4 rounded-full transition-all duration-1000`}
            style={{
              width: `${score}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default ATSScoreCard;