const express = require("express");
const router = express.Router();


const {
    addExpense,
    getExpenses,
    updateExpense,
    deleteExpense
} = require("../controllers/expenseController");


const authMiddleware = require("../middleware/authMiddleware");


// Add Expense
router.post("/", authMiddleware, addExpense);


// Get Expenses
router.get("/", authMiddleware, getExpenses);


// Update Expense
router.put("/:id", authMiddleware, updateExpense);


// Delete Expense
router.delete("/:id", authMiddleware, deleteExpense);



module.exports = router;