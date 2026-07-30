import { useEffect, useState } from "react";
import { getSpeechHistory, deleteSpeech } from "../services/speechService";

import SpeechHistoryList from "../components/speech/SpeechHistoryList";
import DeleteSpeechModal from "../components/speech/DeleteSpeechModal";

function SpeechHistory() {
  const [speeches, setSpeeches] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedSpeech, setSelectedSpeech] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const data = await getSpeechHistory();

      if (data.success) {
        setSpeeches(data.speeches);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const openDeleteModal = (speech) => {
    setSelectedSpeech(speech);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteSpeech(selectedSpeech._id);

      setSpeeches((prev) =>
        prev.filter((item) => item._id !== selectedSpeech._id)
      );

      setShowDeleteModal(false);

    } catch (error) {
      console.error(error);
      alert("Unable to delete speech.");
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white py-10 px-6">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-bold mb-10 text-center">
          🎤 Speech History
        </h1>

        {loading ? (
          <div className="text-center text-xl">
            Loading...
          </div>
        ) : (
          <SpeechHistoryList
            speeches={speeches}
            onDelete={openDeleteModal}
          />
        )}

        <DeleteSpeechModal
          open={showDeleteModal}
          speech={selectedSpeech}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={confirmDelete}
        />

      </div>

    </div>
  );
}

export default SpeechHistory;