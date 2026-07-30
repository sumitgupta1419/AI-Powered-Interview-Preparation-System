function SkillAnalysis({ interview }) {
  const colors = [
    "bg-cyan-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-blue-500",
    "bg-orange-500",
    "bg-red-500",
  ];

  const skills =
    interview?.skills &&
    typeof interview.skills === "object"
      ? Object.entries(interview.skills).map(
          ([name, score], index) => ({
            name,
            score: Number(score) || 0,
            color: colors[index % colors.length],
          })
        )
      : [];

  return (
    <div className="bg-slate-900 rounded-3xl p-8 border border-slate-700 shadow-lg">

      <h2 className="text-3xl font-bold mb-8">
        📊 Skill Analysis
      </h2>

      {skills.length === 0 ? (
        <div className="text-center text-gray-400 py-8">
          No skill analysis available.
        </div>
      ) : (
        <div className="space-y-8">

          {skills.map((skill) => (

            <div key={skill.name}>

              <div className="flex justify-between mb-2">

                <span className="font-semibold text-lg capitalize">
                  {skill.name}
                </span>

                <span className="text-cyan-400 font-bold">
                  {skill.score}%
                </span>

              </div>

              <div className="w-full h-4 bg-slate-700 rounded-full overflow-hidden">

                <div
                  className={`${skill.color} h-4 rounded-full transition-all duration-1000`}
                  style={{
                    width: `${Math.min(skill.score, 100)}%`,
                  }}
                />

              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}

export default SkillAnalysis;