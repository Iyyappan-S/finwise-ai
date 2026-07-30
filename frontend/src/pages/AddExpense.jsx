import { useState } from "react";
import API from "../api/axios";
import {
    FaWallet,
    FaTag,
    FaRupeeSign,
    FaPlusCircle
} from "react-icons/fa";

import "./AddExpense.css";

function AddExpense() {

    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const res = await API.post("/expense", {

                title,
                amount,
                category

            });

            alert(res.data.message);

            setTitle("");
            setAmount("");
            setCategory("");

        }

        catch (error) {

            console.log(error);

            alert("Failed to add expense");

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="expense-page">

            <div className="expense-card">

                <div className="expense-header">

                    <FaWallet className="expense-icon" />

                    <h1>Add Expense</h1>

                    <p>
                        Keep track of where your money goes.
                    </p>

                </div>

                <form
                    className="expense-form"
                    onSubmit={handleSubmit}
                >

                    <div className="input-group">

                        <label>

                            <FaTag />

                            Expense Title

                        </label>

                        <input
                            type="text"
                            placeholder="Food, Shopping, Travel..."
                            value={title}
                            onChange={(e) =>
                                setTitle(e.target.value)
                            }
                            required
                        />

                    </div>

                    <div className="input-group">

                        <label>

                            <FaRupeeSign />

                            Amount

                        </label>

                        <input
                            type="number"
                            placeholder="Enter Amount"
                            value={amount}
                            onChange={(e) =>
                                setAmount(e.target.value)
                            }
                            required
                        />

                    </div>

                    <div className="input-group">

                        <label>

                            📂 Category

                        </label>

                        <select
                            value={category}
                            onChange={(e) =>
                                setCategory(e.target.value)
                            }
                            required
                        >

                            <option value="">
                                Select Category
                            </option>

                            <option>Food</option>
                            <option>Shopping</option>
                            <option>Travel</option>
                            <option>Bills</option>
                            <option>Entertainment</option>
                            <option>Medical</option>
                            <option>Education</option>
                            <option>Investment</option>
                            <option>Other</option>

                        </select>

                    </div>

                    <button
                        className="expense-btn"
                        disabled={loading}
                    >

                        <FaPlusCircle />

                        {loading ? "Adding..." : "Add Expense"}

                    </button>

                </form>

            </div>

        </div>

    );

}

export default AddExpense;