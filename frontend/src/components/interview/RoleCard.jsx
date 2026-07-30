function RoleCard({ value, setValue }) {
  return (
    <div>
      <label className="block mb-2 font-semibold">
        Job Role
      </label>

      <select
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700"
      >
        <option>Java Developer</option>
        <option>Full Stack Developer</option>
        <option>React Developer</option>
        <option>Python Developer</option>
        <option>Data Scientist</option>
      </select>
    </div>
  );
}

export default RoleCard;