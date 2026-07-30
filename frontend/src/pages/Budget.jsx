import "./Budget.css";
import { useEffect, useState } from "react";
import API from "../api/axios";

function Budget() {

    const [budgets, setBudgets] = useState([]);

    const [editingId, setEditingId] = useState(null);

    const [form, setForm] = useState({
        category: "",
        amount: "",
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear()
    });

    // Load Budgets
    const loadBudgets = async () => {
        try {
            const res = await API.get("/budget");
            setBudgets(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        loadBudgets();
    }, []);

    // Add / Update Budget
    const submitBudget = async (e) => {

        e.preventDefault();

        try {

            if (editingId) {

                await API.put(`/budget/${editingId}`, form);

                alert("Budget Updated Successfully ✅");

                setEditingId(null);

            } else {

                await API.post("/budget", form);

                alert("Budget Added Successfully ✅");

            }

            setForm({
                category: "",
                amount: "",
                month: new Date().getMonth() + 1,
                year: new Date().getFullYear()
            });

            loadBudgets();

        } catch (err) {
            console.log(err);
        }
    };

    // Delete Budget
    const deleteBudget = async (id) => {

        if (!window.confirm("Delete this budget?")) return;

        try {

            await API.delete(`/budget/${id}`);

            loadBudgets();

        } catch (err) {

            console.log(err);

        }
    };

    // Edit Budget
    const editBudget = (budget) => {

        setEditingId(budget._id);

        setForm({

            category: budget.category,

            amount: budget.amount,

            month: budget.month,

            year: budget.year

        });

    };

    return (

        <div className="budget-page">

            <h1>💰 Budget Planner</h1>

            <form onSubmit={submitBudget}>

                <input
                    type="text"
                    placeholder="Category"
                    value={form.category}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            category: e.target.value
                        })
                    }
                    required
                />

                <input
                    type="number"
                    placeholder="Amount"
                    value={form.amount}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            amount: e.target.value
                        })
                    }
                    required
                />

                <button type="submit">
                    {editingId ? "Update Budget" : "Save Budget"}
                </button>

            </form>

            {budgets.length === 0 ? (

                <p>No budgets added.</p>

            ) : (

                budgets.map((budget) => (

                    <div
                        key={budget._id}
                        className="budget-card"
                    >

                        <h3>{budget.category}</h3>

                        <h2>₹{budget.amount}</h2>

                        <p>
                            Month: {budget.month}/{budget.year}
                        </p>

                        <div className="budget-buttons">

                            <button
                                className="edit-btn"
                                onClick={() => editBudget(budget)}
                            >
                                ✏ Edit
                            </button>

                            <button
                                className="delete-btn"
                                onClick={() => deleteBudget(budget._id)}
                            >
                                🗑 Delete
                            </button>

                        </div>

                    </div>

                ))

            )}

        </div>

    );
}

export default Budget;