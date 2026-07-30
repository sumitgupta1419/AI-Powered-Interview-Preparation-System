import React, { useEffect, useState } from "react";
import API from "../api/axios";

const Settings = () => {
  // ============================================
  // Profile State
  // ============================================

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    targetRole: "",
    college: "",
    branch: "",
    graduationYear: "",
    skills: "",
    profileImage: "",
  });

  // ============================================
  // Password State
  // ============================================

  const [password, setPassword] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  // ============================================
  // UI State
  // ============================================

  const [loading, setLoading] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // ============================================
  // Fetch Profile
  // ============================================

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await API.get("/profile");

      if (res.data.success) {
        const user = res.data.user;

        setProfile({
          name: user.name || "",
          email: user.email || "",
          targetRole: user.targetRole || "",
          college: user.college || "",
          branch: user.branch || "",
          graduationYear: user.graduationYear || "",
          skills: Array.isArray(user.skills)
            ? user.skills.join(", ")
            : user.skills || "",
          profileImage:
            user.profilePicture ||
            user.profileImage ||
            "",
        });
      }
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Failed to load profile."
      );
    } finally {
      setLoading(false);
    }
  };

  // ============================================
  // Handle Input Change
  // ============================================

  const handleProfileChange = (e) => {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;

    setPassword((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ============================================
  // Update Profile
  // ============================================

  const handleProfileUpdate = async (e) => {
    e.preventDefault();

    try {
      setSavingProfile(true);
      setSuccess("");
      setError("");

      const payload = {
        name: profile.name,
        targetRole: profile.targetRole,
        college: profile.college,
        branch: profile.branch,
        graduationYear: profile.graduationYear,
        profilePicture: profile.profileImage,
        skills: profile.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean),
      };

      const res = await API.put("/profile", payload);

      if (res.data.success) {
        setSuccess("Profile updated successfully.");
        fetchProfile();
      }
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Unable to update profile."
      );
    } finally {
      setSavingProfile(false);
    }
  };

  // ============================================
  // Change Password
  // ============================================

  const handleChangePassword = async (e) => {
    e.preventDefault();

    setSuccess("");
    setError("");

    if (!password.current) {
      setError("Current password is required.");
      return;
    }

    if (!password.new) {
      setError("New password is required.");
      return;
    }

    if (password.new.length < 6) {
      setError(
        "Password must contain at least 6 characters."
      );
      return;
    }

    if (password.new !== password.confirm) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setChangingPassword(true);

      const res = await API.put(
        "/profile/change-password",
        {
          currentPassword: password.current,
          newPassword: password.new,
        }
      );

      if (res.data.success) {
        setSuccess("Password changed successfully.");

        setPassword({
          current: "",
          new: "",
          confirm: "",
        });
      }
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Unable to change password."
      );
    } finally {
      setChangingPassword(false);
    }
  };

  // ============================================
  // Loading Screen
  // ============================================

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B1020] text-white">
        <div className="text-2xl font-bold">
          Loading Settings...
        </div>
      </div>
    );
  }

  return (

<div className="min-h-screen bg-[#0B1020] text-white px-6 py-10">
  <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          ⚙ Account Settings
        </h1>

        {success && (
          <div className="bg-green-600 text-white p-4 rounded-lg mb-6">
            {success}
          </div>
        )}

        {error && (
          <div className="bg-red-600 text-white p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* =======================================
            PROFILE CARD
        ======================================= */}

        <div className="bg-[#161D31] rounded-xl shadow-xl p-8 mb-8">

          <h2 className="text-2xl font-semibold mb-6">
            👤 Profile Information
          </h2>

          
 <form
  onSubmit={handleProfileUpdate}
  className="grid md:grid-cols-2 gap-6"
>
  <div>
              <label className="block mb-2 font-medium">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleProfileChange}
                className="w-full bg-[#20283F] p-3 rounded-lg border border-transparent focus:border-blue-500 outline-none"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Email Address
              </label>

              <input
                type="email"
                value={profile.email}
                disabled
                className="w-full bg-[#2B3247] p-3 rounded-lg cursor-not-allowed opacity-70"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Target Role
              </label>

              <input
                type="text"
                name="targetRole"
                value={profile.targetRole}
                onChange={handleProfileChange}
                className="w-full bg-[#20283F] p-3 rounded-lg border border-transparent focus:border-blue-500 outline-none"
                // placeholder="Java Developer"
                placeholder="Enter target role"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                College
              </label>

              <input
                type="text"
                name="college"
                value={profile.college}
                onChange={handleProfileChange}
                className="w-full bg-[#20283F] p-3 rounded-lg border border-transparent focus:border-blue-500 outline-none"
                placeholder="Enter College"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Branch
              </label>

              <input
                type="text"
                name="branch"
                value={profile.branch}
                onChange={handleProfileChange}
                className="w-full bg-[#20283F] p-3 rounded-lg border border-transparent focus:border-blue-500 outline-none"
                // placeholder="Computer Science"
                placeholder="Enter Branch"  
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Graduation Year
              </label>

              <input
                type="number"
                name="graduationYear"
                value={profile.graduationYear}
                onChange={handleProfileChange}
                className="w-full bg-[#20283F] p-3 rounded-lg border border-transparent focus:border-blue-500 outline-none"
                // placeholder="2027"
                placeholder="Graduation Year"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block mb-2 font-medium">
                Skills
              </label>

              <input
                type="text"
                name="skills"
                value={profile.skills}
                onChange={handleProfileChange}
                className="w-full bg-[#20283F] p-3 rounded-lg border border-transparent focus:border-blue-500 outline-none"
                placeholder="Java, Spring Boot, React, MongoDB"
              />

              <p className="text-sm text-gray-400 mt-2">
                Separate skills with commas.
              </p>
            </div>

            <div className="md:col-span-2">
              <label className="block mb-2 font-medium">
                Profile Image URL
              </label>

              <input
                type="text"
                name="profileImage"
                value={profile.profileImage}
                onChange={handleProfileChange}
                className="w-full bg-[#20283F] p-3 rounded-lg border border-transparent focus:border-blue-500 outline-none"
                placeholder="https://..."
              />
            </div>

            <div className="md:col-span-2 flex justify-end">

              <button
                type="submit"
                disabled={savingProfile}
                className="bg-blue-600 hover:bg-blue-700 transition-all px-8 py-3 rounded-lg font-semibold disabled:opacity-60"
              >
                {savingProfile
                  ? "Saving Changes..."
                  : "Save Changes"}
              </button>

            </div>

          </form>

        </div>

        {/* =======================================
            CHANGE PASSWORD CARD
        ======================================= */}

        <div className="bg-[#161D31] rounded-xl shadow-xl p-8">

          <h2 className="text-2xl font-semibold mb-6">
            🔒 Change Password
          </h2>

          <form
            onSubmit={handleChangePassword}
            className="space-y-5"
          >
                      <div>
              <label className="block mb-2 font-medium">
                Current Password
              </label>

              <input
                type="password"
                name="current"
                value={password.current}
                onChange={handlePasswordChange}
                className="w-full bg-[#20283F] p-3 rounded-lg border border-transparent focus:border-green-500 outline-none"
                placeholder="Enter current password"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                New Password
              </label>

              <input
                type="password"
                name="new"
                value={password.new}
                onChange={handlePasswordChange}
                className="w-full bg-[#20283F] p-3 rounded-lg border border-transparent focus:border-green-500 outline-none"
                placeholder="Enter new password"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Confirm Password
              </label>

              <input
                type="password"
                name="confirm"
                value={password.confirm}
                onChange={handlePasswordChange}
                className="w-full bg-[#20283F] p-3 rounded-lg border border-transparent focus:border-green-500 outline-none"
                placeholder="Confirm new password"
                required
              />
            </div>

            <div className="flex justify-end">

              <button
                type="submit"
                disabled={changingPassword}
                className="bg-green-600 hover:bg-green-700 transition-all px-8 py-3 rounded-lg font-semibold disabled:opacity-60"
              >
                {changingPassword
                  ? "Changing Password..."
                  : "Change Password"}
              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
};

export default Settings;