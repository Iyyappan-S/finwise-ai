import { useEffect, useState } from "react";
import API from "../api/axios";
import "./BudgetProgress.css";

function BudgetProgress() {
    const [budgets, setBudgets] = useState([]);

    useEffect(() => {
        loadProgress();
    }, []);

    const loadProgress = async () => {
        try {
            const res = await API.get("/budget/progress");
            setBudgets(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="budget-progress">

            <h2>💰 Budget vs Actual Spending</h2>

            {budgets.length === 0 ? (
                <p>No budgets available.</p>
            ) : (
                budgets.map((budget) => (
                    <div
                        key={budget._id}
                        className="budget-progress-card"
                    >
                        <div className="budget-header">
                            <h3>{budget.category}</h3>

                            <span>
                                ₹{budget.spent} / ₹{budget.amount}
                            </span>
                        </div>

                        <div className="progress-bar">

                            <div
                                className="progress-fill"
                                style={{
                                    width: `${budget.percentage}%`,
                                    background:
                                        budget.percentage >= 100
                                            ? "#ef4444"
                                            : budget.percentage >= 80
                                            ? "#f59e0b"
                                            : "#22c55e"
                                }}
                            />

                        </div>

                        <div className="budget-footer">

    <span>
        Remaining : ₹{budget.remaining}
    </span>

    <span>
        {budget.percentage.toFixed(0)}%
    </span>

</div>

{/* Budget Alerts */}

{budget.percentage >= 100 ? (

    <div className="alert danger">
        🚨 Budget Exceeded!
    </div>

) : budget.percentage >= 80 ? (

    <div className="alert warning">
        ⚠️ You have used more than 80% of your budget.
    </div>

) : (

    <div className="alert success">
        🎉 You're within budget.
    </div>

)}

                    </div>
                ))
            )}

        </div>
    );
}

export default BudgetProgress;