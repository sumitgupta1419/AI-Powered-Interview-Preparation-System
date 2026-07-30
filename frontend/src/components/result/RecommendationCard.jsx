import { FaRobot } from "react-icons/fa";

function RecommendationCard({ recommendations = [] }) {
  return (
    <div className="bg-slate-900 rounded-3xl p-8 border border-slate-700 shadow-lg">

      <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
        <FaRobot className="text-cyan-400" />
        AI Recommendations
      </h2>

      {recommendations.length === 0 ? (

        <div className="text-center text-gray-400 py-8">
          No recommendations available.
        </div>

      ) : (

        <div className="space-y-5">

          {recommendations.map((item) => (

            <div
              key={item}
              className="bg-slate-800 rounded-xl p-5 border-l-4 border-cyan-500 hover:bg-slate-700 transition"
            >
              🤖 {item}
            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default RecommendationCard;