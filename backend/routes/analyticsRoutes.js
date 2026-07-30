const express = require("express");

const {
    getMonthlyAnalytics,
    getCategoryAnalytics,
    getMonthlyExpense
} = require("../controllers/analyticsController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Existing Analytics
router.get("/monthly", protect, getMonthlyAnalytics);

router.get("/category", protect, getCategoryAnalytics);

// Monthly Expense Chart
router.get("/monthly-expense", protect, getMonthlyExpense);

module.exports = router;