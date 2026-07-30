import {
  FaCheckCircle,
  FaLightbulb,
} from "react-icons/fa";

const recommendations = [
  "Practice Data Structures & Algorithms daily.",
  "Reduce filler words while speaking.",
  "Improve confidence during introductions.",
  "Explain projects using the STAR method.",
  "Maintain eye contact while answering.",
  "Solve one mock interview every day.",
];

function Recommendation() {
  return (
    <div className="bg-slate-900 rounded-3xl p-6 shadow-lg border border-slate-700">

      <div className="flex items-center gap-3 mb-6">

        <FaLightbulb className="text-yellow-400 text-3xl" />

        <h2 className="text-2xl font-bold">
          AI Recommendations
        </h2>

      </div>

      <div className="space-y-4">

        {recommendations.map((item, index) => (

          <div
            key={index}
            className="flex items-start gap-4 bg-slate-800 rounded-xl p-4 hover:bg-slate-700 transition"
          >

            <FaCheckCircle className="text-green-400 mt-1" />

            <p className="text-gray-300">
              {item}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Recommendation;