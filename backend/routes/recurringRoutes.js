const express = require("express");

const protect = require("../middleware/authMiddleware");

const {
    addRecurringTransaction,
    getRecurringTransactions,
    updateRecurringTransaction,
    deleteRecurringTransaction,
    processRecurringTransactions
} = require("../controllers/recurringController");

const router = express.Router();

// Add recurring transaction
router.post("/", protect, addRecurringTransaction);

// Get all recurring transactions
router.get("/", protect, getRecurringTransactions);

// Update recurring transaction
router.put("/:id", protect, updateRecurringTransaction);

// Delete recurring transaction
router.delete("/:id", protect, deleteRecurringTransaction);

// Generate due recurring transactions
router.post("/process", protect, processRecurringTransactions);

module.exports = router;