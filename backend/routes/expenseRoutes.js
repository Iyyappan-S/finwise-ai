const express = require("express");

const {
    addExpense,
    getExpenses,
    updateExpense,
    deleteExpense
} = require("../controllers/expenseController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add", protect, addExpense);

router.get("/", protect, getExpenses);

router.put("/:id", protect, updateExpense);

router.delete("/:id", protect, deleteExpense);

module.exports = router;