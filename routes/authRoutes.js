const express = require("express");
const {
  register,
  login,
  verifyEmail,
  forgotPassword,
  resetPassword,
  updateManualVerification,
  searchUser,
  // New route
} = require("../controllers/authController");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/verify-email/:token", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
// Update manual verification field
router.put("/update-verification", updateManualVerification); // New PUT route for manual verification update

router.post("/search-user", searchUser);

module.exports = router;
