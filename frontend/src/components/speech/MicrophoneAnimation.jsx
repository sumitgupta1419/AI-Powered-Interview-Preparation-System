function MicrophoneAnimation({ recording }) {
  return (
    <div className="flex justify-center mt-12">

      <div
        className={`
          w-40
          h-40
          rounded-full
          flex
          items-center
          justify-center
          text-7xl
          shadow-2xl
          transition-all
          duration-300
          ${
            recording
              ? "bg-red-600 animate-pulse scale-110"
              : "bg-slate-700"
          }
        `}
      >
        🎤
      </div>

    </div>
  );
}

export default MicrophoneAnimation;