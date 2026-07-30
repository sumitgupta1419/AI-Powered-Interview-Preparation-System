function RecordingTimer({ seconds }) {
  const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
  const remainingSeconds = String(seconds % 60).padStart(2, "0");

  return (
    <div className="text-center mt-10">

      <h2 className="text-6xl font-bold text-cyan-400 tracking-wider">
        {minutes}:{remainingSeconds}
      </h2>

      <p className="mt-3 text-gray-400 text-lg">
        Recording Time
      </p>

    </div>
  );
}

export default RecordingTimer;