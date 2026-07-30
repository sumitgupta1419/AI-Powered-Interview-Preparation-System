function AudioPlayer({ audioURL }) {
  if (!audioURL) return null;

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-3xl shadow-lg p-8">

      <h2 className="text-3xl font-bold mb-6">
        🎧 Recorded Audio
      </h2>

      <audio
        controls
        src={audioURL}
        className="w-full rounded-lg"
      />

      <p className="text-gray-400 mt-5 text-sm">
        Listen to your recording before sending it for AI evaluation.
      </p>

    </div>
  );
}

export default AudioPlayer;