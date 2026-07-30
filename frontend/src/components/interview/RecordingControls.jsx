import { useRef, useState } from "react";
import { FaMicrophone, FaStop, FaPlay } from "react-icons/fa";
import { useInterview } from "../../context/InterviewContext";

function RecordingControls() {
//   const { setAnswers } = useInterview();
const { answers, setAnswers, currentQuestion } = useInterview();
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState("");

  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      const recorder = new MediaRecorder(stream);

      mediaRecorder.current = recorder;
      audioChunks.current = [];

      recorder.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(audioChunks.current, {
          type: "audio/webm",
        });

        const url = URL.createObjectURL(blob);

        setAudioURL(url);
        setAnswers([
  ...answers,
  {
    question: currentQuestion,
    audio: url,
  },
]);
      };

      recorder.start();

      setIsRecording(true);

    } catch (error) {
      alert("Microphone permission denied.");
      console.error(error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current) {

      mediaRecorder.current.stop();

      setIsRecording(false);

    }
  };

  return (

    <div className="bg-slate-800 rounded-2xl p-8 mt-10">

      <h2 className="text-2xl font-bold mb-8 text-center">
        Voice Recording
      </h2>

      <div className="flex justify-center gap-5">

        <button
          onClick={startRecording}
          disabled={isRecording}
          className="bg-cyan-500 hover:bg-cyan-600 disabled:opacity-50 px-6 py-3 rounded-xl flex items-center gap-2 transition"
        >
          <FaMicrophone />
          Start Recording
        </button>

        <button
          onClick={stopRecording}
          disabled={!isRecording}
          className="bg-red-500 hover:bg-red-600 disabled:opacity-50 px-6 py-3 rounded-xl flex items-center gap-2 transition"
        >
          <FaStop />
          Stop Recording
        </button>

      </div>

      {isRecording && (

        <div className="text-center mt-8">

          <p className="text-red-400 animate-pulse font-semibold">
            🎤 Recording...
          </p>

        </div>

      )}

      {audioURL && (

        <div className="mt-10 text-center">

          <h3 className="mb-4 text-xl font-semibold">
            Recorded Audio
          </h3>

          <audio
            controls
            src={audioURL}
            className="mx-auto"
          />

          <div className="mt-5">

            <button
              onClick={() => new Audio(audioURL).play()}
              className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl flex items-center gap-2 mx-auto"
            >
              <FaPlay />
              Play Recording
            </button>

          </div>

        </div>

      )}

    </div>

  );
}

export default RecordingControls;