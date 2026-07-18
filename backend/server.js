const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("🚀 FinWise AI Backend Running");
});

app.use("/api/auth", require("./routes/authRoutes"));

app.use("/api/income", require("./routes/incomeRoutes"));   
app.use("/api/expense", require("./routes/expenseRoutes"));
app.use("/api/dashboard", require("./routes/dashboardRoutes"));
app.use("/api/transactions", require("./routes/transactionRoutes"));
app.use("/api/analytics", require("./routes/analyticsRoutes"));
app.use("/api/ai", require("./routes/aiRoutes"));
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}`);
});