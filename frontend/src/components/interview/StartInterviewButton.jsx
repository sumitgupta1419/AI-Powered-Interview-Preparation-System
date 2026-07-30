function StartInterviewButton({ onClick, loading }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="w-full mt-8 bg-cyan-500 hover:bg-cyan-600 py-4 rounded-xl text-xl font-bold transition"
    >
      {loading ? "Generating Questions..." : "Start AI Interview"}
    </button>
  );
}

export default StartInterviewButton;