import { useEffect, useState } from "react";
import API from "../api/axios";
import "./RecurringTransactions.css";

function RecurringTransactions() {

    const [transactions, setTransactions] = useState([]);

    const [editingId, setEditingId] = useState(null);

    const [form, setForm] = useState({
        title: "",
        amount: "",
        category: "",
        type: "Expense",
        frequency: "Monthly",
        nextDate: "",
        description: ""
    });

    const loadTransactions = async () => {
        try {
            const res = await API.get("/recurring");
            setTransactions(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        loadTransactions();
    }, []);

    const submitTransaction = async (e) => {

        e.preventDefault();

        try {

            if (editingId) {

                await API.put(`/recurring/${editingId}`, form);

                alert("Recurring Transaction Updated");

                setEditingId(null);

            } else {

                await API.post("/recurring", form);

                alert("Recurring Transaction Added");

            }

            setForm({
                title: "",
                amount: "",
                category: "",
                type: "Expense",
                frequency: "Monthly",
                nextDate: "",
                description: ""
            });

            loadTransactions();

        } catch (err) {
            console.log(err);
        }
    };

    const editTransaction = (item) => {

        setEditingId(item._id);

        setForm({
            title: item.title,
            amount: item.amount,
            category: item.category,
            type: item.type,
            frequency: item.frequency,
            nextDate: item.nextDate.substring(0,10),
            description: item.description
        });

    };

    const deleteTransaction = async (id) => {

        if (!window.confirm("Delete recurring transaction?")) return;

        await API.delete(`/recurring/${id}`);

        loadTransactions();
    };

    const processTransactions = async () => {

        await API.post("/recurring/process");

        alert("Recurring Transactions Processed");

    };

    return (

        <div className="recurring-page">

            <h1>🔁 Recurring Transactions</h1>

            <form onSubmit={submitTransaction} className="recurring-form">

                <input
                    placeholder="Title"
                    value={form.title}
                    onChange={(e)=>
                        setForm({...form,title:e.target.value})
                    }
                />

                <input
                    type="number"
                    placeholder="Amount"
                    value={form.amount}
                    onChange={(e)=>
                        setForm({...form,amount:e.target.value})
                    }
                />

                <input
                    placeholder="Category"
                    value={form.category}
                    onChange={(e)=>
                        setForm({...form,category:e.target.value})
                    }
                />

                <select
                    value={form.type}
                    onChange={(e)=>
                        setForm({...form,type:e.target.value})
                    }
                >
                    <option>Income</option>
                    <option>Expense</option>
                </select>

                <select
                    value={form.frequency}
                    onChange={(e)=>
                        setForm({...form,frequency:e.target.value})
                    }
                >
                    <option>Daily</option>
                    <option>Weekly</option>
                    <option>Monthly</option>
                    <option>Yearly</option>
                </select>

                <input
                    type="date"
                    value={form.nextDate}
                    onChange={(e)=>
                        setForm({...form,nextDate:e.target.value})
                    }
                />

                <textarea
                    placeholder="Description"
                    value={form.description}
                    onChange={(e)=>
                        setForm({...form,description:e.target.value})
                    }
                />

                <button type="submit">

                    {editingId ? "Update" : "Add"}

                </button>

            </form>

            <button
                className="process-btn"
                onClick={processTransactions}
            >
                ▶ Process Due Transactions
            </button>

            <div className="recurring-list">

                {transactions.map(item=>(

                    <div
                        key={item._id}
                        className="recurring-card"
                    >

                        <h3>{item.title}</h3>

                        <p>₹{item.amount}</p>

                        <p>{item.category}</p>

                        <p>{item.type}</p>

                        <p>{item.frequency}</p>

                        <p>
                            Next:
                            {new Date(item.nextDate).toLocaleDateString()}
                        </p>

                        <button
                            onClick={()=>editTransaction(item)}
                        >
                            Edit
                        </button>

                        <button
                            onClick={()=>deleteTransaction(item._id)}
                        >
                            Delete
                        </button>

                    </div>

                ))}

            </div>

        </div>

    );

}

export default RecurringTransactions;