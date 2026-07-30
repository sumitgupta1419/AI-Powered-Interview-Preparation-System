import { FaExclamationTriangle } from "react-icons/fa";

function WeaknessCard({ weaknesses = [] }) {
  return (
    <div className="bg-slate-900 border border-slate-700 rounded-3xl shadow-lg p-8">

      {/* Header */}
      <div className="flex items-center gap-3 mb-8">

        <FaExclamationTriangle className="text-red-400 text-3xl" />

        <h2 className="text-2xl font-bold">
          Areas for Improvement
        </h2>

      </div>

      {/* Empty State */}
      {weaknesses.length === 0 ? (
        <div className="bg-slate-800 rounded-xl p-6 text-center">

          <p className="text-gray-400">
            No weaknesses detected.
          </p>

        </div>
      ) : (
        <div className="space-y-4">

          {weaknesses.map((weakness, index) => (
            <div
              key={index}
              className="flex items-start gap-4 bg-slate-800 rounded-xl p-5 hover:bg-slate-700 transition"
            >

              <FaExclamationTriangle className="text-red-400 text-xl mt-1 flex-shrink-0" />

              <p className="text-gray-200 leading-relaxed">
                {weakness}
              </p>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default WeaknessCard;