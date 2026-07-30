import { useEffect, useState } from "react";

import { updateProfile } from "../../services/profileService";

function EditProfileModal({
  open,
  onClose,
  user,
  refreshProfile,
}) {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    college: "",
    branch: "",
    graduationYear: "",
    skills: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        college: user.college || "",
        branch: user.branch || "",
        graduationYear: user.graduationYear || "",
        skills: user.skills?.join(", ") || "",
      });
    }
  }, [user]);

  if (!open) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await updateProfile({
        name: formData.name,
        college: formData.college,
        branch: formData.branch,
        graduationYear: formData.graduationYear,
        skills: formData.skills,
      });

      alert("Profile updated successfully.");

      if (refreshProfile) {
        await refreshProfile();
      }

      onClose();

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.message ||
          "Unable to update profile."
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">

      <div className="bg-slate-900 rounded-3xl p-8 w-full max-w-xl border border-slate-700">

        <h2 className="text-3xl font-bold text-white mb-8">
          Edit Profile
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* Name */}

          <div>

            <label className="text-gray-300 block mb-2">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white"
            />

          </div>

          {/* College */}

          <div>

            <label className="text-gray-300 block mb-2">
              College
            </label>

            <input
              type="text"
              name="college"
              value={formData.college}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white"
            />

          </div>

          {/* Branch */}

          <div>

            <label className="text-gray-300 block mb-2">
              Branch
            </label>

            <input
              type="text"
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white"
            />

          </div>

          {/* Graduation Year */}

          <div>

            <label className="text-gray-300 block mb-2">
              Graduation Year
            </label>

            <input
              type="text"
              name="graduationYear"
              value={formData.graduationYear}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white"
            />

          </div>

          {/* Skills */}

          <div>

            <label className="text-gray-300 block mb-2">
              Skills
            </label>

            <textarea
              rows="4"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="Java, React, Node.js"
              className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white"
            />

            <p className="text-gray-500 text-sm mt-2">
              Separate skills with commas.
            </p>

          </div>

          {/* Buttons */}

          <div className="flex justify-end gap-4 pt-4">

            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-xl bg-gray-700 hover:bg-gray-600"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default EditProfileModal;