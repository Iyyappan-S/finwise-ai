const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    getProfile,
    updateProfile,
    changePassword
} = require("../controllers/profileController");

router.get("/", protect, getProfile);

router.put("/", protect, updateProfile);

router.put("/change-password", protect, changePassword);

module.exports = router;