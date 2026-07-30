import {
  FaMicrophone,
  FaStop,
  FaTrash,
} from "react-icons/fa";

function SpeechControls({
  supported,
  isListening,
  startListening,
  stopListening,
  clearTranscript,
}) {
  if (!supported) {
    return (
      <div className="bg-red-900 border border-red-500 rounded-xl p-4 text-center">
        Your browser doesn't support Speech Recognition.
      </div>
    );
  }

  return (
    <div className="flex justify-center gap-4 flex-wrap">

      <button
        onClick={startListening}
        disabled={isListening}
        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-green-600 hover:bg-green-700 disabled:opacity-50"
      >
        <FaMicrophone />
        Start
      </button>

      <button
        onClick={stopListening}
        disabled={!isListening}
        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 disabled:opacity-50"
      >
        <FaStop />
        Stop
      </button>

      <button
        onClick={clearTranscript}
        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-700 hover:bg-slate-600"
      >
        <FaTrash />
        Clear
      </button>

    </div>
  );
}

export default SpeechControls;