const express = require("express");
const router = express.Router();

const {
    addIncome,
    getIncome,
    updateIncome,
    deleteIncome
} = require("../controllers/incomeController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, addIncome);

router.get("/", authMiddleware, getIncome);

router.put("/:id", authMiddleware, updateIncome);

router.delete("/:id", authMiddleware, deleteIncome);

module.exports = router;