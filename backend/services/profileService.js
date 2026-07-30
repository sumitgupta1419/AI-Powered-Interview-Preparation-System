import API from "../api/axios";

// ======================================
// Get JWT Token
// ======================================
const getToken = () => localStorage.getItem("token");

// ======================================
// Get User Profile
// GET /api/profile
// ======================================
export const getProfile = async () => {
  const response = await API.get("/profile", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

// ======================================
// Update User Profile
// PUT /api/profile
// ======================================
export const updateProfile = async (profileData) => {
  const response = await API.put(
    "/profile",
    profileData,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  return response.data;
};

// ======================================
// Change Password
// PUT /api/profile/change-password
// ======================================
export const changePassword = async (
  currentPassword,
  newPassword
) => {
  const response = await API.put(
    "/profile/change-password",
    {
      currentPassword,
      newPassword,
    },
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  return response.data;
};