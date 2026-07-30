function DeleteResumeModal({
  isOpen,
  onClose,
  onConfirm,
  resume,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">

      <div className="bg-slate-900 rounded-2xl p-8 w-[420px]">

        <h2 className="text-2xl font-bold mb-5">
          Delete Resume
        </h2>

        <p className="text-gray-300">
          Are you sure you want to delete
        </p>

        <p className="font-bold mt-2 text-cyan-400">
          {resume?.originalName}
        </p>

        <div className="flex justify-end gap-4 mt-8">

          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg bg-slate-700 hover:bg-slate-600"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-6 py-2 rounded-lg bg-red-600 hover:bg-red-700"
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}

export default DeleteResumeModal;