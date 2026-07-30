function DeleteSpeechModal({
  open,
  speech,
  onClose,
  onConfirm,
}) {
  if (!open || !speech) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">

      <div className="bg-slate-900 border border-slate-700 rounded-3xl p-8 w-full max-w-md shadow-2xl">

        <h2 className="text-3xl font-bold text-white mb-6">
          Delete Speech Report
        </h2>

        <p className="text-gray-300 leading-7">
          Are you sure you want to permanently delete
          <span className="text-cyan-400 font-semibold">
            {" "}
            {speech.originalName}
          </span>
          ?
        </p>

        <p className="text-red-400 mt-4">
          This action cannot be undone.
        </p>

        <div className="flex justify-end gap-4 mt-10">

          <button
            onClick={onClose}
            className="px-6 py-3 rounded-xl bg-slate-700 hover:bg-slate-600 transition font-semibold"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 transition font-semibold"
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}

export default DeleteSpeechModal;