import { FaCheckCircle } from "react-icons/fa";

function SkillsDetected({ skills = [] }) {
  return (
    <div className="bg-slate-900 rounded-3xl p-8 border border-slate-700 shadow-lg">

      <h2 className="text-2xl font-bold text-white mb-6">
        ✅ Skills Detected
      </h2>

      <div className="grid md:grid-cols-2 gap-4">

        {skills.map((skill, index) => (
          <div
            key={index}
            className="flex items-center gap-3 bg-slate-800 p-4 rounded-xl"
          >
            <FaCheckCircle className="text-green-400" />

            <span className="text-white font-medium">
              {skill}
            </span>
          </div>
        ))}

      </div>

    </div>
  );
}

export default SkillsDetected;