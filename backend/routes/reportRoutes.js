const express = require("express");

const {
    generateMonthlyReport,
    getFinancialSummary
} = require("../controllers/reportController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Overall Financial Summary
router.get("/summary", protect, getFinancialSummary);

// Monthly Report
router.get("/:month/:year", protect, generateMonthlyReport);

module.exports = router;