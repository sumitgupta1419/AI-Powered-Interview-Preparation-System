import { FaCheckCircle } from "react-icons/fa";

function StrengthCard({ strengths = [] }) {
  return (
    <div className="bg-slate-900 rounded-3xl p-8 border border-slate-700 shadow-xl">

      {/* Header */}
      <div className="flex items-center gap-3 mb-8">

        <FaCheckCircle className="text-green-400 text-3xl" />

        <h2 className="text-3xl font-bold text-white">
          Resume Strengths
        </h2>

      </div>

      {strengths.length === 0 ? (

        <div className="text-center text-gray-400 py-10">
          No strengths detected.
        </div>

      ) : (

        <div className="space-y-5">

          {strengths.map((item, index) => (

            <div
              key={index}
              className="flex items-start gap-4 bg-slate-800 p-5 rounded-2xl border-l-4 border-green-500 hover:bg-slate-700 transition"
            >

              <FaCheckCircle className="text-green-400 mt-1 flex-shrink-0" />

              <p className="text-gray-300 leading-7">
                {item}
              </p>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default StrengthCard;