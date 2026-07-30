require("dotenv").config();

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

const aiRoutes = require("./routes/aiRoutes");
const budgetRoutes = require("./routes/budgetRoutes"); // ✅
const goalRoutes = require("./routes/goalRoutes");
const reportRoutes = require("./routes/reportRoutes");
const adminRoutes = require("./routes/adminRoutes");

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("🚀 FinWise AI Backend Running");
});

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/ai", aiRoutes);
app.use("/api/profile", require("./routes/profileRoutes"));
app.use("/api/income", require("./routes/incomeRoutes"));
app.use("/api/expense", require("./routes/expenseRoutes"));
app.use("/api/dashboard", require("./routes/dashboardRoutes"));
app.use("/api/transactions", require("./routes/transactionRoutes"));
app.use("/api/analytics", require("./routes/analyticsRoutes"));
app.use("/api/budget", budgetRoutes); // ✅
app.use("/api/recurring", require("./routes/recurringRoutes")); // ✅
app.use("/api/ai", require("./routes/aiRoutes"));
app.use("/api/reports", require("./routes/reportRoutes"));
app.use("/api/notifications", require("./routes/notificationRoutes"));
app.use("/api/currency", require("./routes/currencyRoutes"));
app.use("/api/goals", goalRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}`);
});