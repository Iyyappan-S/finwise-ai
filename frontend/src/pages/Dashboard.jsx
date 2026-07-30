import { useEffect, useState } from "react";
import API from "../api/axios";
import {
    FaWallet,
    FaMoneyBillWave,
    FaPiggyBank,
    FaListAlt
} from "react-icons/fa";

import { Link } from "react-router-dom";

import "./Dashboard.css";

import TransactionList from "../components/TransactionList";
import ExpenseBarChart from "../components/ExpenseBarChart";
import ExpensePieChart from "../components/ExpensePieChart";
import AIInsights from "../components/AIInsights";
import ExportPDF from "../components/ExportPDF";
import ExportExcel from "../components/ExportExcel";
import BudgetProgress from "../components/BudgetProgress";
import NotificationBell from "../components/NotificationBell";
import GoalProgress from "../components/GoalProgress";
import GoalStats from "../components/GoalStats";

function Dashboard() {

    const [summary, setSummary] = useState({
        totalIncome: 0,
        totalExpense: 0,
        balance: 0,
        totalTransactions: 0
    });

    const [currency, setCurrency] = useState("INR");
    const [symbol, setSymbol] = useState("₹");

    const currencySymbols = {
        INR: "₹",
        USD: "$",
        EUR: "€",
        GBP: "£",
        JPY: "¥",
        AUD: "A$",
        CAD: "C$",
        SGD: "S$",
        AED: "د.إ"
    };

    useEffect(() => {

        const loadDashboard = async () => {

            try {

                // Dashboard Summary
                const dashboardRes = await API.get("/dashboard");

setSummary(dashboardRes.data);

setCurrency(dashboardRes.data.currency);

setSymbol(
    currencySymbols[
        dashboardRes.data.currency
    ] || "₹"
);
            } catch (err) {
                console.log(err);
            }

        };

        loadDashboard();

    }, []);

    return (

        <div className="dashboard">

            {/* Header */}

            <div className="dashboard-header">

                <div>

                    <h1>👋 Welcome Back</h1>

                    <p>
                        Here's your financial overview today.
                    </p>

                    <p>
                        🌍 Currency : <strong>{currency}</strong>
                    </p>

                </div>

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "20px"
                    }}
                >

                    <NotificationBell />

                    <div className="today-date">

                        {new Date().toLocaleDateString("en-IN", {
                            weekday: "long",
                            day: "numeric",
                            month: "long",
                            year: "numeric"
                        })}

                    </div>

                </div>

            </div>

            {/* Dashboard Cards */}

            <div className="dashboard-cards">

                {/* Income */}

                <div className="card income-card">

                    <FaMoneyBillWave className="card-icon" />

                    <div>

                        <h3>Total Income</h3>

                        <h2>
                            {symbol}{summary.totalIncome}
                        </h2>

                    </div>

                </div>

                {/* Expense */}

                <div className="card expense-card">

                    <FaWallet className="card-icon" />

                    <div>

                        <h3>Total Expense</h3>

                        <h2>
                            {symbol}{summary.totalExpense}
                        </h2>

                    </div>

                </div>

                {/* Balance */}

                <div className="card balance-card">

                    <FaPiggyBank className="card-icon" />

                    <div>

                        <h3>Current Balance</h3>

                        <h2>
                            {symbol}{summary.balance}
                        </h2>

                    </div>

                </div>

                {/* Transactions */}

                <div className="card transaction-card">

                    <FaListAlt className="card-icon" />

                    <div>

                        <h3>Total Transactions</h3>

                        <h2>
                            {summary.totalTransactions}
                        </h2>

                    </div>

                </div>

            </div>

            {/* Buttons */}

            <div className="dashboard-actions">

                <Link to="/profile">
                    <button className="action-btn">
                        👤 My Profile
                    </button>
                </Link>

                <Link to="/add-income">
    <button className="action-btn">
        ➕ Add Income
    </button>
</Link>

<Link to="/add-expense">
    <button className="action-btn">
        💸 Add Expense
    </button>
</Link>



                <Link to="/goals">
    <button className="action-btn">
        🎯 Goals
    </button>
</Link>



                <Link to="/notifications">
                    <button className="action-btn">
                        🔔 Notifications
                    </button>
                </Link>



                <Link to="/settings">
                    <button className="action-btn">
                        ⚙ Settings
                    </button>
                </Link>

                <Link to="/reports">
    <button className="action-btn">
        📊 Reports
    </button>
</Link>

<Link to="/admin/dashboard ">
    <button className="action-btn">
        🛠 Admin Panel
    </button>
</Link>


                <ExportPDF />

                <ExportExcel />

            </div>

            {/* AI */}

            <AIInsights />

            {/* Budget */}

            <BudgetProgress />

            <GoalStats />


            {/* Goals */}

            <GoalProgress />

            {/* Charts */}

            <div className="charts-grid">

                <ExpenseBarChart />

                <ExpensePieChart />

            </div>

            {/* Transactions */}

            <TransactionList />

        </div>

    );

}

export default Dashboard;