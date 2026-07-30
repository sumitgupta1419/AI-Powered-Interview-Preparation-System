import { FaComments } from "react-icons/fa";

function FluencyCard({ fluency }) {
  const score = fluency?.score || 0;
  const speed = fluency?.speed || "N/A";
  const pauses = fluency?.pauses || "N/A";

  const getLevel = () => {
    if (score >= 90) return "Excellent";
    if (score >= 75) return "Good";
    if (score >= 60) return "Average";
    if (score >= 40) return "Needs Improvement";
    return "Poor";
  };

  const getColor = () => {
    if (score >= 90) return "bg-green-500";
    if (score >= 75) return "bg-cyan-500";
    if (score >= 60) return "bg-yellow-500";
    if (score >= 40) return "bg-orange-500";
    return "bg-red-500";
  };

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-3xl p-8 shadow-lg">

      <div className="flex items-center gap-4 mb-6">

        <div className="w-14 h-14 rounded-full bg-cyan-500 flex items-center justify-center text-2xl">
          <FaComments />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white">
            Fluency
          </h2>

          <p className="text-gray-400 text-sm">
            Speech flow and continuity
          </p>
        </div>

      </div>

      <div className="text-center mb-6">

        <h1 className="text-6xl font-bold text-cyan-400">
          {score}
        </h1>

        <p className="text-gray-400 mt-2">
          /100
        </p>

      </div>

      <div className="w-full bg-slate-700 rounded-full h-4 overflow-hidden">

        <div
          className={`${getColor()} h-4 rounded-full transition-all duration-700`}
          style={{ width: `${score}%` }}
        />

      </div>

      <div className="mt-6 space-y-3">

        <div className="flex justify-between">
          <span className="text-gray-400">Level</span>
          <span className="text-cyan-400 font-semibold">
            {getLevel()}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-400">Speed</span>
          <span>{speed}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-400">Pauses</span>
          <span>{pauses}</span>
        </div>

      </div>

    </div>
  );
}

export default FluencyCard;