function RoleSelector({ value, onChange }) {
  const roles = [
    "Software Developer",
    "Java Developer",
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Python Developer",
    "Data Scientist",
    "AI Engineer",
    "Machine Learning Engineer",
    "DevOps Engineer",
  ];

  return (
    <div className="mb-6">
      <label className="block text-lg font-semibold mb-2 text-white">
        Job Role
      </label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-white"
      >
        <option value="">Select Role</option>

        {roles.map((role) => (
          <option key={role} value={role}>
            {role}
          </option>
        ))}
      </select>
    </div>
  );
}

export default RoleSelector;