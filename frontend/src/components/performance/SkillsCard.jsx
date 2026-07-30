function SkillBar({ title, percentage, color }) {
  return (
    <div className="mb-6">

      <div className="flex justify-between mb-2">

        <h3 className="font-semibold">
          {title}
        </h3>

        <span className="font-bold">
          {percentage}%
        </span>

      </div>

      <div className="w-full bg-slate-700 rounded-full h-4">

        <div
          className={`${color} h-4 rounded-full transition-all duration-700`}
          style={{ width: `${percentage}%` }}
        ></div>

      </div>

    </div>
  );
}

function SkillsCard() {
  return (
    <div className="bg-slate-900 rounded-3xl p-8 shadow-lg border border-slate-700">

      <h2 className="text-3xl font-bold mb-8">
        🏆 Skill Analysis
      </h2>

      <SkillBar
        title="Communication"
        percentage={90}
        color="bg-cyan-500"
      />

      <SkillBar
        title="Technical Knowledge"
        percentage={85}
        color="bg-green-500"
      />

      <SkillBar
        title="Confidence"
        percentage={92}
        color="bg-yellow-500"
      />

      <SkillBar
        title="Problem Solving"
        percentage={80}
        color="bg-purple-500"
      />

      <SkillBar
        title="Grammar"
        percentage={88}
        color="bg-pink-500"
      />

      <SkillBar
        title="Fluency"
        percentage={91}
        color="bg-indigo-500"
      />

    </div>
  );
}

export default SkillsCard;