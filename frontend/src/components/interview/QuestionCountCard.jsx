
function QuestionCountCard({ value, setValue }) {
  return (
    <div>
      <label className="block mb-2 font-semibold">
        Number of Questions
      </label>

      <input
        type="number"
        min="5"
        max="20"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700"
      />
    </div>
  );
}

export default QuestionCountCard;