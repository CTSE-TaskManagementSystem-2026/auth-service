// const express = require("express");
// const router = express.Router();
// const { register, login } = require("../controllers/authController");
// const { protect, authorize } = require("../middleware/authMiddleware");

// router.post("/register", register);
// router.post("/login", login);

// router.get("/admin", protect, authorize("admin"), (req, res) => {
//   res.json({ message: "Welcome Admin" });
// });

// module.exports = router;

const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  logoutUser,
  getAllUsers,
  updateUserRole,
  deleteUser,
  updatePassword,
  getUserProfile
} = require("../controllers/authController");

const { protect, authorize } = require("../middleware/authMiddleware");

// Public
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected
router.get("/profile", protect, getUserProfile);
router.post("/logout", protect, logoutUser);
router.put("/update-password", protect, updatePassword);

// Admin Only
router.get("/users", protect, authorize("admin"), getAllUsers);
router.put("/update-role", protect, authorize("admin"), updateUserRole);
router.delete("/delete/:userId", protect, authorize("admin"), deleteUser);

module.exports = router;