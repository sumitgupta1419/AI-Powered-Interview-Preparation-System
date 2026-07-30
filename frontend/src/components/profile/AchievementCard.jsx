import {
  FaTrophy,
  FaMedal,
  FaFire,
  FaStar,
  FaCheckCircle,
  FaLock,
} from "react-icons/fa";

function AchievementCard({ achievements = [] }) {

  const unlockedCount = achievements.filter(
    (item) => item.unlocked
  ).length;

  return (
    <div className="bg-slate-900 rounded-3xl p-8 border border-slate-700 shadow-lg">

      <div className="flex justify-between items-center mb-8">

        <h2 className="text-3xl font-bold">
          🏆 Achievements
        </h2>

        <span className="bg-cyan-600 px-4 py-2 rounded-xl text-sm font-semibold">
          {unlockedCount}/{achievements.length} Unlocked
        </span>

      </div>

      <div className="grid md:grid-cols-2 gap-5">

        {achievements.map((achievement, index) => (

          <div
            key={index}
            className={`rounded-2xl p-5 border transition-all duration-300 hover:scale-[1.02]
            ${
              achievement.unlocked
                ? "bg-green-900/30 border-green-500"
                : "bg-slate-800 border-slate-700"
            }`}
          >

            <div className="flex items-start gap-4">

              <div
                className={`text-4xl mt-1 ${
                  achievement.unlocked
                    ? "text-yellow-400"
                    : "text-gray-500"
                }`}
              >
                {achievement.icon || <FaTrophy />}
              </div>

              <div className="flex-1">

                <h3 className="text-lg font-semibold">
                  {achievement.title}
                </h3>

                <p className="text-gray-400 text-sm mt-2">
                  {achievement.description}
                </p>

                <div className="mt-4 flex items-center gap-2">

                  {achievement.unlocked ? (
                    <>
                      <FaCheckCircle className="text-green-400" />
                      <span className="text-green-400 text-sm font-semibold">
                        Unlocked
                      </span>
                    </>
                  ) : (
                    <>
                      <FaLock className="text-gray-500" />
                      <span className="text-gray-500 text-sm">
                        Locked
                      </span>
                    </>
                  )}

                </div>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default AchievementCard;