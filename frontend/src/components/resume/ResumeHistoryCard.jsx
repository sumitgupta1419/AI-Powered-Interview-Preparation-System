import { Link } from "react-router-dom";

function ResumeHistoryCard({ resume, onDelete }) {
  return (
    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-lg hover:border-cyan-500 transition">

      <div className="flex justify-between items-start">

        <div>
          <h2 className="text-2xl font-bold">
            {resume.originalName || resume.fileName}
          </h2>

          <p className="text-gray-400 mt-2">
            ATS Score:
            <span className="text-green-400 font-bold ml-2">
              {resume.atsScore}%
            </span>
          </p>

          <p className="text-gray-400 mt-2">
            {new Date(resume.createdAt).toLocaleDateString()}
          </p>
        </div>

        <div className="flex gap-3">
          <Link
            to={`/resume/${resume._id}`}
            className="bg-cyan-600 hover:bg-cyan-700 px-5 py-2 rounded-lg"
          >
            View
          </Link>

          <button
            onClick={() => onDelete(resume)}
            className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg"
          >
            Delete
          </button>
        </div>

      </div>

    </div>
  );
}

export default ResumeHistoryCard;