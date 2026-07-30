import { useDashboard } from "../../context/DashboardContext";

function RecentInterviews() {
  const { recentInterviews } = useDashboard();

  return (
    <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-lg">

      <h2 className="text-2xl font-bold mb-6">
        Recent Interviews
      </h2>

      {recentInterviews.length === 0 ? (

        <div className="text-center text-gray-400 py-8">
          No Interviews Found
        </div>

      ) : (

        <div className="space-y-5">

          {recentInterviews.map((item) => (

            <div
              key={item._id}
              className="flex justify-between items-center bg-slate-800 p-4 rounded-xl hover:bg-slate-700 transition"
            >

              {/* Left */}
              <div>

                <h3 className="font-semibold text-lg">
                  {item.jobRole}
                </h3>

                <p className="text-gray-400 text-sm">
                  Difficulty : {item.difficulty}
                </p>

              </div>

              {/* Right */}
              <div className="text-right">

                <p
                  className={`font-bold ${
                    item.status === "Completed"
                      ? "text-green-400"
                      : "text-yellow-400"
                  }`}
                >
                  {item.status}
                </p>

                <p className="text-cyan-400">
                  Score : {item.score}
                </p>

                <p className="text-gray-500 text-sm">
                  {new Date(item.createdAt).toLocaleDateString()}
                </p>

              </div>

            </div>

          ))}



        </div>

      )}

    </div>
  );
}

export default RecentInterviews;