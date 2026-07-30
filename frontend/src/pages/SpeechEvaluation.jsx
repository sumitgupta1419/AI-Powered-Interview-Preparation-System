import { useEffect, useRef, useState } from "react";

import RecordButton from "../components/speech/RecordButton";
import RecordingTimer from "../components/speech/RecordingTimer";
import MicrophoneAnimation from "../components/speech/MicrophoneAnimation";
import AudioPlayer from "../components/speech/AudioPlayer";

import SpeechScoreCard from "../components/speech/SpeechScoreCard";
import FluencyCard from "../components/speech/FluencyCard";
import PronunciationCard from "../components/speech/PronunciationCard";
import GrammarCard from "../components/speech/GrammarCard";
import VocabularyCard from "../components/speech/VocabularyCard";
import StrengthCard from "../components/speech/StrengthCard";
import WeaknessCard from "../components/speech/WeaknessCard";
import RecommendationCard from "../components/speech/RecommendationCard";

import { uploadSpeech } from "../services/speechService";

function SpeechEvaluation() {
  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);

  const [audioURL, setAudioURL] = useState("");
  const [audioBlob, setAudioBlob] = useState(null);

  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);

  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);

  useEffect(() => {
    let interval;

    if (recording) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [recording]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      mediaRecorder.current = new MediaRecorder(stream);

      audioChunks.current = [];

      mediaRecorder.current.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };

      mediaRecorder.current.onstop = () => {
        const blob = new Blob(audioChunks.current, {
          type: "audio/webm",
        });

        setAudioBlob(blob);
        setAudioURL(URL.createObjectURL(blob));
      };

      mediaRecorder.current.start();

      setRecording(true);
      setSeconds(0);
      setReport(null);

    } catch (error) {
      console.error(error);
      alert("Microphone permission denied.");
    }
  };

  const stopRecording = () => {
    if (!mediaRecorder.current) return;

    mediaRecorder.current.stop();
    setRecording(false);
  };

  const analyzeSpeech = async () => {
    if (!audioBlob) {
      alert("Please record your speech first.");
      return;
    }

    try {
      setLoading(true);

      const response = await uploadSpeech(audioBlob);

      // console.log("Speech API Response:", response);
      console.log("Speech API Response:");
console.log(JSON.stringify(response, null, 2));

      if (response.success) {
        setReport(response.report);
      } else {
        alert("Speech analysis failed.");
      }

    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
        "Speech analysis failed."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white py-10 px-6">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-5xl font-bold text-center mb-4">
          🎤 AI Speech Evaluation
        </h1>

        <p className="text-center text-gray-400 mb-12">
          Record your answer and let AI evaluate your communication skills.
        </p>

        <MicrophoneAnimation recording={recording} />

        <RecordingTimer seconds={seconds} />

        <div className="mt-10">
          <RecordButton
            recording={recording}
            onStart={startRecording}
            onStop={stopRecording}
          />
        </div>

        <div className="mt-10">
          <AudioPlayer audioURL={audioURL} />
        </div>

        {audioBlob && !loading && !report && (
          <div className="text-center mt-10">
            <button
              onClick={analyzeSpeech}
              className="bg-cyan-500 hover:bg-cyan-600 px-10 py-4 rounded-xl text-xl font-bold transition"
            >
              Analyze Speech
            </button>
          </div>
        )}

        {loading && (
          <div className="text-center mt-10">
            <div className="animate-pulse text-cyan-400 text-xl">
              AI is analyzing your speech...
            </div>
          </div>
        )}

       {report && (
  <div className="space-y-8 mt-12">

    <SpeechScoreCard
      score={report.overallScore || 0}
    />

    <div className="grid lg:grid-cols-2 gap-8">

      <FluencyCard
        score={report.fluency?.score || 0}
      />

      <PronunciationCard
        pronunciation={report.pronunciation}
      />

    </div>

    <div className="grid lg:grid-cols-2 gap-8">

      <GrammarCard
        grammar={report.grammar}
      />

      <VocabularyCard
        vocabulary={report.vocabulary}
      />

    </div>

    <div className="grid lg:grid-cols-2 gap-8">

      <StrengthCard
        strengths={report.strengths || []}
      />

      <WeaknessCard
        weaknesses={report.weaknesses || []}
      />

    </div>

    <RecommendationCard
      recommendations={report.recommendations || []}
    />

  </div>
)}

      </div>
    </div>
  );
}

export default SpeechEvaluation;
