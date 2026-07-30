function InsightCard({ income, expense, category }) {

    const balance = income - expense;

    const savingsRate =
        income > 0
            ? ((balance / income) * 100).toFixed(1)
            : 0;

    const topCategory =
        category.length > 0
            ? category.reduce((max, item) =>
                item.total > max.total ? item : max
              )
            : null;

    return (
        <div className="chart-card">

            <h2>🤖 AI Financial Insights</h2>

            <p>
                💰 Current Balance:
                <strong> ₹{balance}</strong>
            </p>

            <p>
                📈 Savings Rate:
                <strong> {savingsRate}%</strong>
            </p>

            {topCategory && (
                <p>
                    🛒 Highest Spending Category:
                    <strong> {topCategory.category}</strong>
                    {" "}
                    (₹{topCategory.total})
                </p>
            )}

            {savingsRate >= 30 ? (
                <p style={{ color: "green" }}>
                    ✅ Great job! Your savings rate is healthy.
                </p>
            ) : (
                <p style={{ color: "red" }}>
                    ⚠ Try reducing unnecessary expenses.
                </p>
            )}

        </div>
    );
}

export default InsightCard;