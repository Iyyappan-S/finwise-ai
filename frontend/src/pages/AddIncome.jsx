import { useState } from "react";
import API from "../api/axios";
import {
    FaMoneyBillWave,
    FaTag,
    FaRupeeSign,
    FaPlusCircle
} from "react-icons/fa";

import "./AddIncome.css";

function AddIncome() {

    const [data, setData] = useState({
        title: "",
        amount: "",
        category: ""
    });

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            await API.post("/income", data);

            alert("✅ Income Added Successfully");

            setData({
                title: "",
                amount: "",
                category: ""
            });

        }

        catch (error) {

            console.log(error);

            alert("Failed to add income.");

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="income-page">

            <div className="income-card">

                <div className="income-header">

                    <FaMoneyBillWave className="income-icon" />

                    <h1>Add Income</h1>

                    <p>
                        Track every source of income and grow your wealth.
                    </p>

                </div>

                <form
                    onSubmit={handleSubmit}
                    className="income-form"
                >

                    <div className="input-group">

                        <label>

                            <FaTag />

                            Income Title

                        </label>

                        <input
                            type="text"
                            placeholder="Salary / Freelancing / Bonus..."
                            value={data.title}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    title: e.target.value
                                })
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
                            value={data.amount}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    amount: e.target.value
                                })
                            }
                            required
                        />

                    </div>

                    <div className="input-group">

                        <label>

                            📂 Category

                        </label>

                        <select
                            value={data.category}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    category: e.target.value
                                })
                            }
                            required
                        >

                            <option value="">
                                Select Category
                            </option>

                            <option>Salary</option>
                            <option>Freelancing</option>
                            <option>Business</option>
                            <option>Investment</option>
                            <option>Bonus</option>
                            <option>Gift</option>
                            <option>Rental</option>
                            <option>Other</option>

                        </select>

                    </div>

                    <button
                        type="submit"
                        className="income-btn"
                        disabled={loading}
                    >

                        <FaPlusCircle />

                        {loading ? "Adding..." : "Add Income"}

                    </button>

                </form>

            </div>

        </div>

    );

}

export default AddIncome;