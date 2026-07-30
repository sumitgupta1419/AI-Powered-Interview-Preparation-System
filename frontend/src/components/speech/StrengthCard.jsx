import { FaCheckCircle } from "react-icons/fa";

function StrengthCard({ strengths = [] }) {
  return (
    <div className="bg-slate-900 border border-slate-700 rounded-3xl shadow-lg p-8">

      {/* Header */}
      <div className="flex items-center gap-3 mb-8">

        <FaCheckCircle className="text-green-400 text-3xl" />

        <h2 className="text-2xl font-bold">
          Speech Strengths
        </h2>

      </div>

      {/* Empty State */}
      {strengths.length === 0 ? (
        <div className="bg-slate-800 rounded-xl p-6 text-center">

          <p className="text-gray-400">
            No strengths detected yet.
          </p>

        </div>
      ) : (
        <div className="space-y-4">

          {strengths.map((strength, index) => (
            <div
              key={index}
              className="flex items-start gap-4 bg-slate-800 rounded-xl p-5 hover:bg-slate-700 transition"
            >
              <FaCheckCircle className="text-green-400 text-xl mt-1 flex-shrink-0" />

              <p className="text-gray-200 leading-relaxed">
                {strength}
              </p>
            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default StrengthCard;