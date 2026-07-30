function SkillsCard({ skills }) {
  const skillList = Object.entries(skills || {});

  return (
    <div className="bg-slate-900 rounded-2xl p-6 border border-slate-700 shadow-lg">

      <h2 className="text-2xl font-bold mb-6">
        🚀 AI Skill Analysis
      </h2>

      {skillList.length === 0 ? (

        <p className="text-gray-400 text-center py-6">
          No completed interview available.
        </p>

      ) : (

        <div className="space-y-5">

          {skillList.map(([name, score]) => (

            <div key={name}>

              <div className="flex justify-between mb-2">

                <span className="font-medium">
                  {name}
                </span>

                <span className="font-bold text-cyan-400">
                  {score}%
                </span>

              </div>

              <div className="w-full bg-slate-700 rounded-full h-3">

                <div
                  className="bg-cyan-500 h-3 rounded-full transition-all duration-700"
                  style={{
                    width: `${score}%`,
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

export default SkillsCard;