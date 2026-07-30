function RecordButton({
  recording,
  onStart,
  onStop,
}) {
  return (
    <div className="flex justify-center">

      {!recording ? (
        <button
          onClick={onStart}
          className="
            bg-red-600
            hover:bg-red-700
            transition
            px-10
            py-4
            rounded-2xl
            text-xl
            font-bold
            shadow-lg
          "
        >
          🎤 Start Recording
        </button>
      ) : (
        <button
          onClick={onStop}
          className="
            bg-slate-700
            hover:bg-slate-800
            transition
            px-10
            py-4
            rounded-2xl
            text-xl
            font-bold
            shadow-lg
          "
        >
          ⏹ Stop Recording
        </button>
      )}

    </div>
  );
}

export default RecordButton;