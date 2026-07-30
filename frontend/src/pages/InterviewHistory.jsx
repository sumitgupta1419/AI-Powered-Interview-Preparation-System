import { useEffect, useState } from "react";
import { getInterviewHistory } from "../services/interviewService";
import HistoryCard from "../components/history/HistoryCard";

function InterviewHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadHistory = async () => {
    try {
      setLoading(true);

      const response = await getInterviewHistory();

      console.log("Interview History:", response);

      if (response.success) {
        setHistory(response.interviews || []);
      } else {
        setHistory([]);
      }
    } catch (error) {
      console.error("History Error:", error);
      setHistory([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center text-white text-3xl font-bold">
        Loading Interview History...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white py-10 px-6">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-5xl font-bold text-center mb-10">
          📚 Interview History
        </h1>

        {history.length === 0 ? (
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-12 text-center">

            <h2 className="text-3xl font-bold mb-4">
              No Interviews Found
            </h2>

            <p className="text-gray-400">
              Generate your first AI Interview to see history here.
            </p>

          </div>
        ) : (
          <div className="space-y-6">

            {history.map((interview) => (
              <HistoryCard
                key={interview._id}
                interview={interview}
                refreshHistory={loadHistory}
              />
            ))}

          </div>
        )}

      </div>

    </div>
  );
}

export default InterviewHistory;