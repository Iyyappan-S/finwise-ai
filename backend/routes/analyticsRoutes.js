const express = require("express");

const {
    getMonthlyAnalytics,
    getCategoryAnalytics
} = require("../controllers/analyticsController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/monthly", protect, getMonthlyAnalytics);
router.get("/category", protect, getCategoryAnalytics);

module.exports = router;