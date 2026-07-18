const express = require("express");

const {
    addIncome,
    getIncome,
    updateIncome,
    deleteIncome
} = require("../controllers/incomeController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Add Income
router.post("/add", protect, addIncome);

// Get All Income
router.get("/", protect, getIncome);

// Update Income
router.put("/:id", protect, updateIncome);

// Delete Income
router.delete("/:id", protect, deleteIncome);

module.exports = router;