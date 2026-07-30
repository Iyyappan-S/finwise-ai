const express = require("express");

const {
    addBudget,
    getBudgets,
    updateBudget,
    deleteBudget,
    getBudgetProgress
} = require("../controllers/budgetController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Get all budgets
router.get("/", protect, getBudgets);

// Add new budget
router.post("/", protect, addBudget);

// Update budget
router.put("/:id", protect, updateBudget);

// Delete budget
router.delete("/:id", protect, deleteBudget);

// Get budget progress
router.get("/progress", protect, getBudgetProgress);

module.exports = router;