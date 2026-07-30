import { useNavigate } from "react-router-dom";
import { deleteInterview } from "../../services/interviewService";

function HistoryCard({ interview, refreshHistory }) {
  const navigate = useNavigate();

  const handleViewResult = () => {
    localStorage.setItem("interviewId", interview._id);
    navigate("/result");
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Delete this interview?"
    );

    if (!confirmDelete) return;

    try {
      await deleteInterview(interview._id);

      alert("Interview deleted successfully.");

      refreshHistory();
    } catch (error) {
      console.error(error);

      alert(
        error?.message ||
        "Unable to delete interview."
      );
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-lg">

      <div className="flex justify-between items-center">

        <div>

          <h2 className="text-2xl font-bold text-cyan-400">
            {interview.jobRole}
          </h2>

          <p className="text-gray-400 mt-2">
            Experience : {interview.experience}
          </p>

          <p className="text-gray-400">
            Difficulty : {interview.difficulty}
          </p>

          <p className="mt-2">
            Status :
            <span
              className={`ml-2 font-semibold ${
                interview.status === "Completed"
                  ? "text-green-400"
                  : "text-yellow-400"
              }`}
            >
              {interview.status}
            </span>
          </p>

          <p className="text-cyan-400 mt-2 font-semibold">
            Score : {interview.score ?? 0}
          </p>

          <p className="text-gray-500 text-sm mt-2">
            {new Date(interview.createdAt).toLocaleString()}
          </p>

        </div>

        <div className="flex flex-col gap-4">

          <button
            onClick={handleViewResult}
            className="bg-cyan-500 hover:bg-cyan-600 px-5 py-2 rounded-lg font-semibold transition"
          >
            View Result
          </button>

          <button
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg font-semibold transition"
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}

export default HistoryCard;