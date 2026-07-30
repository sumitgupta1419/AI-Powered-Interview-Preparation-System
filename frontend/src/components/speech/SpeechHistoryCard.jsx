import { Link } from "react-router-dom";

function SpeechHistoryCard({
  speech,
  onDelete,
}) {
  return (
    <div className="bg-slate-900 rounded-3xl border border-slate-700 p-8 shadow-lg">

      <div className="flex justify-between items-start flex-wrap gap-6">

        <div>

          <h2 className="text-2xl font-bold">
            {speech.originalName}
          </h2>

          <p className="text-gray-400 mt-2">
            Overall Score :
            <span className="text-green-400 font-bold ml-2">
              {speech.overallScore}%
            </span>
          </p>

          <p className="text-gray-500 mt-2">
            Confidence :
            <span className="text-cyan-400 ml-2">
              {speech.confidence}%
            </span>
          </p>

          <p className="text-gray-500 mt-2">
            {new Date(speech.createdAt).toLocaleString()}
          </p>

        </div>

        <div className="flex gap-4">

          <Link
            to={`/speech/${speech._id}`}
            className="bg-cyan-600 hover:bg-cyan-700 px-6 py-3 rounded-xl font-semibold"
          >
            View
          </Link>

          <button
            onClick={() => onDelete(speech)}
            className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl font-semibold"
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}

export default SpeechHistoryCard;