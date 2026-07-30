function ExperienceCard({ value, setValue }) {
  return (
    <div>
      <label className="block mb-2 font-semibold">
        Experience
      </label>

      <select
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700"
      >
        <option>Fresher</option>
        <option>1-2 Years</option>
        <option>3-5 Years</option>
        <option>5+ Years</option>
      </select>
    </div>
  );
}

export default ExperienceCard;