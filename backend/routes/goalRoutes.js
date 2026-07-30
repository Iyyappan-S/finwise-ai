const express = require("express");

const {
    addGoal,
    getGoals,
    updateGoal,
    deleteGoal,
    addSavings,
    getGoalProgress,
    getGoalStatistics
} = require("../controllers/goalController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Get all goals
router.get("/", protect, getGoals);

// Get goal progress
router.get("/progress", protect, getGoalProgress);

// Get goal statistics
router.get("/statistics", protect, getGoalStatistics);

// Add new goal
router.post("/", protect, addGoal);

// Update goal
router.put("/:id", protect, updateGoal);

// Delete goal
router.delete("/:id", protect, deleteGoal);

// Add savings to goal
router.put("/:id/savings", protect, addSavings);

module.exports = router;