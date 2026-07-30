import SpeechHistoryCard from "./SpeechHistoryCard";

function SpeechHistoryList({
  speeches,
  onDelete,
}) {

  if (speeches.length === 0) {
    return (
      <div className="bg-slate-900 rounded-3xl border border-slate-700 p-10 text-center">

        <h2 className="text-3xl font-bold">
          No Speech History
        </h2>

        <p className="text-gray-400 mt-4">
          Record your first speech to see AI analysis here.
        </p>

      </div>
    );
  }

  return (
    <div className="grid gap-6">

      {speeches.map((speech) => (
        <SpeechHistoryCard
          key={speech._id}
          speech={speech}
          onDelete={onDelete}
        />
      ))}

    </div>
  );
}

export default SpeechHistoryList;