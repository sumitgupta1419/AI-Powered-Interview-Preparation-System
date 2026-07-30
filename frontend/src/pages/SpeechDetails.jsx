import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getSpeechById } from "../services/speechService";

import SpeechScoreCard from "../components/speech/SpeechScoreCard";
import FluencyCard from "../components/speech/FluencyCard";
import PronunciationCard from "../components/speech/PronunciationCard";
import GrammarCard from "../components/speech/GrammarCard";
import VocabularyCard from "../components/speech/VocabularyCard";
import StrengthCard from "../components/speech/StrengthCard";
import WeaknessCard from "../components/speech/WeaknessCard";
import RecommendationCard from "../components/speech/RecommendationCard";

function SpeechDetails() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [speech, setSpeech] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSpeech();
  }, []);

  const fetchSpeech = async () => {
    try {

      const data = await getSpeechById(id);

      if (data.success) {
        setSpeech(data.speech);
      }

    } catch (error) {

      console.error(error);

      alert("Unable to load speech report.");

      navigate("/speech-history");

    } finally {

      setLoading(false);

    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center text-white text-2xl">
        Loading Speech Report...
      </div>
    );
  }

  if (!speech) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center text-red-400 text-2xl">
        Speech Report Not Found
      </div>
    );
  }

  return (

    <div className="min-h-screen bg-[#020617] text-white py-10 px-6">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex justify-between items-center flex-wrap gap-6 mb-10">

          <div>

            <h1 className="text-5xl font-bold">
              Speech Evaluation Report
            </h1>

            <p className="text-gray-400 mt-3">
              {speech.originalName}
            </p>

            <p className="text-gray-500 mt-2">
              {new Date(speech.createdAt).toLocaleString()}
            </p>

          </div>

          <button
            onClick={() => navigate("/speech-history")}
            className="bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-xl font-semibold"
          >
            ← Back
          </button>

        </div>

        {/* Overall Score */}

        <SpeechScoreCard
          score={speech.overallScore}
          confidence={speech.confidence}
        />

        {/* Skills */}

        <div className="grid lg:grid-cols-2 gap-8 mt-8">

          <FluencyCard
            fluency={speech.fluency}
          />

          <PronunciationCard
            pronunciation={speech.pronunciation}
          />

          <GrammarCard
            grammar={speech.grammar}
          />

          <VocabularyCard
            vocabulary={speech.vocabulary}
          />

        </div>

        {/* Strengths */}

        <div className="mt-8">

          <StrengthCard
            strengths={speech.strengths || []}
          />

        </div>

        {/* Weaknesses */}

        <div className="mt-8">

          <WeaknessCard
            weaknesses={speech.weaknesses || []}
          />

        </div>

        {/* Recommendations */}

        <div className="mt-8">

          <RecommendationCard
            recommendations={speech.recommendations || []}
          />

        </div>

      </div>

    </div>

  );

}

export default SpeechDetails;