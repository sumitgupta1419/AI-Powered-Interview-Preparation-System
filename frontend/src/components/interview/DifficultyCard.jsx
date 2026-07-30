function DifficultyCard({ value, setValue }) {
  return (
    <div>
      <label className="block mb-2 font-semibold">
        Difficulty
      </label>

      <select
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700"
      >
        <option>Easy</option>
        <option>Medium</option>
        <option>Hard</option>
      </select>
    </div>
  );
}

export default DifficultyCard;