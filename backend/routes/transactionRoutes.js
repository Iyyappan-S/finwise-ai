const express = require("express");
const { getTransactions } = require("../controllers/transactionController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getTransactions);

module.exports = router;