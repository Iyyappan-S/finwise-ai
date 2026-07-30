const express = require("express");

const {
    getCurrency,
    updateCurrency,
    getRates
} = require("../controllers/currencyController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Get current user's preferred currency
router.get("/", protect, getCurrency);

// Update preferred currency
router.put("/", protect, updateCurrency);

router.get("/rates", protect, getRates);

module.exports = router;