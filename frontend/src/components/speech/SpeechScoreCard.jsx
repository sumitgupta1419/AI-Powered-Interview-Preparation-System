import { FaMicrophoneAlt } from "react-icons/fa";

function SpeechScoreCard({ score = 0 }) {
  let scoreColor = "text-red-500";
  let progressColor = "bg-red-500";
  let message = "Your communication skills need improvement.";

  if (score >= 90) {
    scoreColor = "text-green-400";
    progressColor = "bg-green-500";
    message = "Excellent communication skills.";
  } else if (score >= 75) {
    scoreColor = "text-yellow-400";
    progressColor = "bg-yellow-500";
    message = "Good communication. Small improvements recommended.";
  }

  return (
    <div className="bg-slate-900 rounded-3xl border border-slate-700 shadow-lg p-8">

      <div className="flex justify-between items-center">

        <h2 className="text-3xl font-bold">
          Speech Score
        </h2>

        <FaMicrophoneAlt className="text-cyan-400 text-4xl" />

      </div>

      <div className="text-center mt-10">

        <h1 className={`text-7xl font-bold ${scoreColor}`}>
          {score}%
        </h1>

        <p className="mt-4 text-gray-400">
          {message}
        </p>

      </div>

      <div className="mt-8">

        <div className="w-full h-4 rounded-full bg-slate-700 overflow-hidden">

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

export default SpeechScoreCard;