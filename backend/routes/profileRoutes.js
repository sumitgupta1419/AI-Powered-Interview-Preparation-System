// const express = require("express");

// const router = express.Router();

// const { protect } = require("../middleware/authMiddleware");

// const {
//   getProfile,
//   updateProfile,
//   changePassword,
// } = require("../controllers/profileController");

// // ======================================
// // Get User Profile
// // GET /api/profile
// // ======================================
// router.get(
//   "/",
//   protect,
//   getProfile
// );

// // ======================================
// // Update Profile
// // PUT /api/profile
// // ======================================
// router.put(
//   "/",
//   protect,
//   updateProfile
// );

// // ======================================
// // Change Password
// // PUT /api/profile/change-password
// // ======================================
// router.put(
//   "/change-password",
//   protect,
//   changePassword
// );

// module.exports = router;
const express = require("express");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  getProfile,
  updateProfile,
  changePassword,
} = require("../controllers/profileController");

router.use((req, res, next) => {
  console.log("✅ PROFILE ROUTE HIT:", req.method, req.originalUrl);
  next();
});

router.get("/", protect, getProfile);

router.put("/", protect, updateProfile);

router.put("/change-password", protect, changePassword);

module.exports = router;