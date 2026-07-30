function QuestionCounter({ value, onChange }) {
  return (
    <div>
      <label className="block mb-2 font-semibold">
        Number of Questions
      </label>

      <select
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700"
      >
        <option value={5}>5 Questions</option>
        <option value={10}>10 Questions</option>
        <option value={15}>15 Questions</option>
        <option value={20}>20 Questions</option>
      </select>
    </div>
  );
}

export default QuestionCounter;