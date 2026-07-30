import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";

function ResumeHistory() {
  const [loading, setLoading] = useState(true);
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await API.get("/resume", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setResumes(response.data.resumes);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center text-white text-2xl">
        Loading Resume History...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white py-10 px-6">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-5xl font-bold mb-10">
          Resume History
        </h1>

        {resumes.length === 0 ? (
          <div className="text-center text-gray-400 text-xl">
            No resumes found.
          </div>
        ) : (
          <div className="grid gap-6">
            {resumes.map((resume) => (
              <div
                key={resume._id}
                className="bg-slate-900 border border-slate-700 rounded-2xl p-6 flex justify-between items-center"
              >
                <div>
                  <h2 className="text-2xl font-bold">
                    {resume.originalName || resume.fileName}
                  </h2>

                  <p className="text-gray-400 mt-2">
                    ATS Score: {resume.atsScore}%
                  </p>

                  <p className="text-gray-500">
                    {new Date(resume.createdAt).toLocaleString()}
                  </p>
                </div>

                <Link
                  to={`/resume/${resume._id}`}
                  className="bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-xl font-semibold transition"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default ResumeHistory;