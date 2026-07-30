import {
  FaUserCircle,
  FaEnvelope,
  FaUniversity,
  FaCode,
  FaGraduationCap,
  FaSignOutAlt,
  FaEdit,
  FaLock,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import EditProfileModal from "./EditProfileModal";
import ChangePasswordModal from "./ChangePasswordModal";

import { useState } from "react";

function ProfileCard({ user, refreshProfile }) {

  const navigate = useNavigate();

  const { logout } = useAuth();

  const [showEditModal, setShowEditModal] = useState(false);

  const [showPasswordModal, setShowPasswordModal] =
    useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <div className="bg-slate-900 rounded-3xl p-8 border border-slate-700 shadow-lg">

        {/* Avatar */}

        <div className="flex flex-col items-center">

          <FaUserCircle
            size={120}
            className="text-cyan-400"
          />

          <h2 className="text-3xl font-bold mt-6">
            {user?.name || "User"}
          </h2>

          <p className="text-gray-400">
            {user?.email}
          </p>

        </div>

        {/* Information */}

        <div className="mt-8 space-y-5">

          <div className="flex items-center gap-3">

            <FaEnvelope className="text-cyan-400" />

            <span>{user?.email}</span>

          </div>

          <div className="flex items-center gap-3">

            <FaUniversity className="text-cyan-400" />

            <span>
              {user?.college || "College Not Added"}
            </span>

          </div>

          <div className="flex items-center gap-3">

            <FaCode className="text-cyan-400" />

            <span>
              {user?.branch || "Branch Not Added"}
            </span>

          </div>

          <div className="flex items-center gap-3">

            <FaGraduationCap className="text-cyan-400" />

            <span>
              {user?.graduationYear ||
                "Graduation Year Not Added"}
            </span>

          </div>

        </div>

        {/* Skills */}

        <div className="mt-8">

          <h3 className="font-semibold mb-3 text-cyan-400">
            Skills
          </h3>

          <div className="flex flex-wrap gap-2">

            {user?.skills?.length > 0 ? (
              user.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-cyan-600 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))
            ) : (
              <span className="text-gray-500">
                No Skills Added
              </span>
            )}

          </div>

        </div>

        {/* Buttons */}

        <div className="mt-10 space-y-4">

          <button
            onClick={() => setShowEditModal(true)}
            className="w-full bg-cyan-600 hover:bg-cyan-700 rounded-xl py-3 flex justify-center items-center gap-3 font-semibold"
          >
            <FaEdit />
            Edit Profile
          </button>

          <button
            onClick={() =>
              setShowPasswordModal(true)
            }
            className="w-full bg-yellow-600 hover:bg-yellow-700 rounded-xl py-3 flex justify-center items-center gap-3 font-semibold"
          >
            <FaLock />
            Change Password
          </button>

          <button
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 rounded-xl py-3 flex justify-center items-center gap-3 font-semibold"
          >
            <FaSignOutAlt />
            Logout
          </button>

        </div>

      </div>

      {/* Edit Profile */}

      <EditProfileModal
        open={showEditModal}
        onClose={() => setShowEditModal(false)}
        user={user}
        refreshProfile={refreshProfile}
      />

      {/* Change Password */}

      <ChangePasswordModal
        open={showPasswordModal}
        onClose={() =>
          setShowPasswordModal(false)
        }
      />

    </>
  );
}

export default ProfileCard;