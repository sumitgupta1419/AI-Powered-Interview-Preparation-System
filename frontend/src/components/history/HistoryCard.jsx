import { useNavigate } from "react-router-dom";
import { deleteInterview } from "../../services/interviewService";

function HistoryCard({
  interview,
  refreshHistory,
}) {
  const navigate = useNavigate();

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this interview?"
    );

    if (!confirmDelete) return;

    try {
      await deleteInterview(interview._id);

      alert("Interview deleted successfully.");

      if (refreshHistory) {
        refreshHistory();
      }
    } catch (error) {
      console.error(error);

      alert(
        error.message ||
        "Unable to delete interview."
      );
    }
  };

  const createdDate = new Date(
    interview.createdAt
  ).toLocaleDateString();

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-3xl p-8 shadow-lg hover:border-cyan-500 transition">

      <div className="flex justify-between items-start">

        <div>

          <h2 className="text-2xl font-bold">
            {interview.jobRole}
          </h2>

          <p className="text-gray-400 mt-2">
            Experience :
            <span className="text-white ml-2">
              {interview.experience}
            </span>
          </p>

          <p className="text-gray-400 mt-1">
            Difficulty :
            <span className="text-white ml-2">
              {interview.difficulty}
            </span>
          </p>

          <p className="text-gray-400 mt-1">
            Questions :
            <span className="text-white ml-2">
              {interview.questionCount}
            </span>
          </p>

          <p className="text-gray-400 mt-1">
            Date :
            <span className="text-white ml-2">
              {createdDate}
            </span>
          </p>

        </div>

        <div className="text-right">

          <div
            className={`inline-block px-4 py-2 rounded-xl font-bold ${
              interview.status === "Completed"
                ? "bg-green-600"
                : "bg-yellow-600"
            }`}
          >
            {interview.status}
          </div>

          <div className="mt-4 text-4xl font-bold text-cyan-400">
            {interview.score ?? 0}
          </div>

          <div className="text-gray-400">
            Score
          </div>

        </div>

      </div>

      <div className="flex gap-4 mt-8">

        <button
          onClick={() =>
            navigate(`/history/${interview._id}`)
          }
          className="flex-1 bg-cyan-500 hover:bg-cyan-600 py-3 rounded-xl font-bold transition"
        >
          👁 View
        </button>

        <button
          onClick={handleDelete}
          className="flex-1 bg-red-600 hover:bg-red-700 py-3 rounded-xl font-bold transition"
        >
          🗑 Delete
        </button>

      </div>

    </div>
  );
}

export default HistoryCard;