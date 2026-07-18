const express = require("express");
const router = express.Router();

const {
  register,
  login,
  getProfile,
} = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.get("/profile", protect, getProfile);

module.exports = router;