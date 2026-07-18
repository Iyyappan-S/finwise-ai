const { GoogleGenAI } = require("@google/genai");
const Income = require("../models/Income");
const Expense = require("../models/Expense");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const askAI = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question || !question.trim()) {
      return res.status(400).json({
        message: "Please enter a financial question",
      });
    }

    const incomes = await Income.find({
      user: req.user.id,
    }).select("source amount category date description");

    const expenses = await Expense.find({
      user: req.user.id,
    }).select("title amount category date description");

    const totalIncome = incomes.reduce(
      (sum, item) => sum + Number(item.amount),
      0
    );

    const totalExpense = expenses.reduce(
      (sum, item) => sum + Number(item.amount),
      0
    );

    const balance = totalIncome - totalExpense;

    const incomeRecords = incomes
      .map(
        (item) =>
          `${item.source} | ₹${item.amount} | ${item.category} | ${
            item.date ? new Date(item.date).toLocaleDateString() : "No date"
          }`
      )
      .join("\n");

    const expenseRecords = expenses
      .map(
        (item) =>
          `${item.title} | ₹${item.amount} | ${item.category} | ${
            item.date ? new Date(item.date).toLocaleDateString() : "No date"
          }`
      )
      .join("\n");

    const prompt = `
You are FinWise AI, a personal financial advisor.

Use only the financial information provided below.
Do not invent transactions or amounts.
Give simple and practical advice.
Avoid risky investment advice.
Clearly mention when there is not enough data.

Financial summary:
Total income: ₹${totalIncome}
Total expense: ₹${totalExpense}
Current balance: ₹${balance}

Income records:
${incomeRecords || "No income records available"}

Expense records:
${expenseRecords || "No expense records available"}

User question:
${question.trim()}

Give a concise, personalized financial analysis with actionable suggestions.
`;

    const result = await ai.models.generateContent({
      model: "gemini-flash-latest",
      contents: prompt,
    });

    const answer = result.text;

    res.status(200).json({
      answer,
      summary: {
        totalIncome,
        totalExpense,
        balance,
      },
    });
 } catch (error) {
  console.error("Full AI error:", error);
  console.error("AI error message:", error.message);
  console.error("AI error status:", error.status);

  res.status(error.status || 500).json({
    message: error.message || "Unable to generate financial advice",
  });
}
};

module.exports = {
  askAI,
};