import { useState } from "react";

import { changePassword } from "../../services/profileService";

function ChangePasswordModal({
  open,
  onClose,
}) {

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  if (!open) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.currentPassword ||
      !formData.newPassword ||
      !formData.confirmPassword
    ) {
      alert("Please fill all fields.");
      return;
    }

    if (
      formData.newPassword !== formData.confirmPassword
    ) {
      alert("Passwords do not match.");
      return;
    }

    if (formData.newPassword.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    try {

      setLoading(true);

      const response = await changePassword(
        formData.currentPassword,
        formData.newPassword
      );

      if (response.success) {

        alert(response.message);

        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });

        onClose();
      }

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.message ||
        "Unable to change password."
      );

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">

      <div className="bg-slate-900 rounded-3xl p-8 w-full max-w-lg border border-slate-700">

        <h2 className="text-3xl font-bold text-white mb-8">
          Change Password
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* Current Password */}

          <div>

            <label className="block text-gray-300 mb-2">
              Current Password
            </label>

            <input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white"
            />

          </div>

          {/* New Password */}

          <div>

            <label className="block text-gray-300 mb-2">
              New Password
            </label>

            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white"
            />

          </div>

          {/* Confirm Password */}

          <div>

            <label className="block text-gray-300 mb-2">
              Confirm New Password
            </label>

            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white"
            />

          </div>

          {/* Buttons */}

          <div className="flex justify-end gap-4 pt-5">

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
              {loading
                ? "Updating..."
                : "Update Password"}
            </button>

          </div>

        </form>

      </div>

    </div>

  );
}

export default ChangePasswordModal;