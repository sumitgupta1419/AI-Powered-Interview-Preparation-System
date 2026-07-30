function ExperienceSelector({ value, onChange }) {
  return (
    <div className="mb-6">
      <label className="block text-lg font-semibold mb-2 text-white">
        Experience
      </label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-white"
      >
        <option value="">Select Experience</option>

        <option value="Fresher">Fresher</option>
        <option value="1 Year">1 Year</option>
        <option value="2 Years">2 Years</option>
        <option value="3 Years">3 Years</option>
        <option value="5+ Years">5+ Years</option>
      </select>
    </div>
  );
}

export default ExperienceSelector;