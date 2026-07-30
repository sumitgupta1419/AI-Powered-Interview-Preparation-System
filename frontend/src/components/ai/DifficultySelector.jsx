function DifficultySelector({ value, onChange }) {
  return (
    <div className="mb-6">
      <label className="block text-lg font-semibold mb-2 text-white">
        Difficulty
      </label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-white"
      >
        <option value="">Select Difficulty</option>

        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
      </select>
    </div>
  );
}

export default DifficultySelector;