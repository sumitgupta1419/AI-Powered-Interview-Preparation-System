import { FaExclamationTriangle } from "react-icons/fa";

function WeaknessCard({ weaknesses = [] }) {
  return (
    <div className="bg-slate-900 rounded-3xl p-8 border border-slate-700 shadow-lg">

      <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
        <FaExclamationTriangle className="text-yellow-400" />
        Areas to Improve
      </h2>

      {weaknesses.length === 0 ? (

        <div className="text-center text-gray-400 py-8">
          No improvement areas available.
        </div>

      ) : (

        <div className="space-y-5">

          {weaknesses.map((item) => (

            <div
              key={item}
              className="bg-slate-800 rounded-xl p-4 border-l-4 border-yellow-500 hover:bg-slate-700 transition"
            >
              ⚠️ {item}
            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default WeaknessCard;