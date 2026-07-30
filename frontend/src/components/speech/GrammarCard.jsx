import { FaSpellCheck } from "react-icons/fa";

function GrammarCard({ grammar }) {

  const score = grammar?.score || 0;
  const sentenceStructure =
    grammar?.sentenceStructure || "N/A";
  const grammarAccuracy =
    grammar?.grammarAccuracy || "N/A";

  let scoreColor = "text-red-400";
  let progressColor = "bg-red-500";
  let level = "Needs Improvement";

  if (score >= 90) {
    scoreColor = "text-green-400";
    progressColor = "bg-green-500";
    level = "Excellent";
  } else if (score >= 75) {
    scoreColor = "text-cyan-400";
    progressColor = "bg-cyan-500";
    level = "Good";
  } else if (score >= 60) {
    scoreColor = "text-yellow-400";
    progressColor = "bg-yellow-500";
    level = "Average";
  } else if (score >= 40) {
    scoreColor = "text-orange-400";
    progressColor = "bg-orange-500";
    level = "Fair";
  }

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-3xl shadow-lg p-8">

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Grammar</h2>
        <FaSpellCheck className="text-cyan-400 text-3xl" />
      </div>

      <div className="text-center mt-8">

        <h1 className={`text-6xl font-bold ${scoreColor}`}>
          {score}
        </h1>

        <p className="text-gray-400 mt-2">/100</p>

        <p className="text-lg font-semibold mt-2 text-cyan-300">
          {level}
        </p>

      </div>

      <div className="mt-8">
        <div className="w-full h-4 bg-slate-700 rounded-full overflow-hidden">
          <div
            className={`${progressColor} h-4 rounded-full transition-all duration-1000`}
            style={{ width: `${score}%` }}
          />
        </div>
      </div>

      <div className="mt-8 bg-slate-800 rounded-xl p-5">

        <div className="flex justify-between mb-3">
          <span>Sentence Structure</span>
          <span>{sentenceStructure}</span>
        </div>

        <div className="flex justify-between">
          <span>Grammar Accuracy</span>
          <span>{grammarAccuracy}</span>
        </div>

      </div>

    </div>
  );
}

export default GrammarCard;