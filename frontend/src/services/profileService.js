import API from "../api/axios";

const getToken = () => localStorage.getItem("token");

// ===============================
// Get Profile
// ===============================
export const getProfile = async () => {
  const response = await API.get("/profile", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

// ===============================
// Update Profile
// ===============================
export const updateProfile = async (data) => {
  const response = await API.put("/profile", data, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

// ===============================
// Change Password
// ===============================
export const changePassword = async (data) => {
  const response = await API.put("/profile/change-password", data, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};