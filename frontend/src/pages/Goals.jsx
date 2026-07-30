import { useEffect, useState } from "react";
import API from "../api/axios";

import {
    FaBullseye,
    FaPlusCircle,
    FaPiggyBank,
    FaTrash,
    FaCalendarAlt,
    FaWallet,
    FaChartLine
} from "react-icons/fa";

import "./Goals.css";

function Goals() {

    const [goals, setGoals] = useState([]);

    const [form, setForm] = useState({

        title: "",

        targetAmount: "",

        targetDate: "",

        category: "Other"

    });

    const [savingAmount, setSavingAmount] = useState({});

    useEffect(() => {

        loadGoals();

    }, []);

    const loadGoals = async () => {

        try {

            const res = await API.get("/goals/progress");

            setGoals(res.data);

        }

        catch (err) {

            console.log(err);

        }

    };

    const addGoal = async () => {

        try {

            await API.post("/goals", form);

            setForm({

                title: "",

                targetAmount: "",

                targetDate: "",

                category: "Other"

            });

            loadGoals();

        }

        catch (err) {

            console.log(err);

        }

    };

    const addSavings = async (id) => {

        try {

            await API.put(`/goals/${id}/savings`, {

                amount: savingAmount[id]

            });

            setSavingAmount({

                ...savingAmount,

                [id]: ""

            });

            loadGoals();

        }

        catch (err) {

            console.log(err);

        }

    };

    const deleteGoal = async (id) => {

        if (!window.confirm("Delete this goal?"))

            return;

        await API.delete(`/goals/${id}`);

        loadGoals();

    };

    // Dashboard Statistics

    const totalGoals = goals.length;

    const completedGoals = goals.filter(

        goal => goal.status === "Completed"

    ).length;

    const totalTarget = goals.reduce(

        (sum, goal) => sum + goal.targetAmount,

        0

    );

    const totalSaved = goals.reduce(

        (sum, goal) => sum + goal.savedAmount,

        0

    );

    return (

        <div className="goals-page">

            <div className="goal-header">

                <FaBullseye className="goal-header-icon" />

                <h1>My Savings Goals</h1>

                <p>

                    Build your future one goal at a time.

                </p>

            </div>

            {/* Statistics */}

            <div className="goal-stats">

                <div className="stat-card">

                    <FaBullseye />

                    <h2>{totalGoals}</h2>

                    <p>Total Goals</p>

                </div>

                <div className="stat-card">

                    <FaChartLine />

                    <h2>{completedGoals}</h2>

                    <p>Completed</p>

                </div>

                <div className="stat-card">

                    <FaWallet />

                    <h2>₹{totalTarget}</h2>

                    <p>Total Target</p>

                </div>

                <div className="stat-card">

                    <FaPiggyBank />

                    <h2>₹{totalSaved}</h2>

                    <p>Total Saved</p>

                </div>

            </div>

            {/* Add Goal */}

            <div className="goal-form-card">

                <h2>

                    <FaPlusCircle />

                    Add New Goal

                </h2>

                <div className="goal-form">

                    <input

                        placeholder="Goal Title"

                        value={form.title}

                        onChange={(e) =>

                            setForm({

                                ...form,

                                title: e.target.value

                            })

                        }

                    />

                    <input

                        type="number"

                        placeholder="Target Amount"

                        value={form.targetAmount}

                        onChange={(e) =>

                            setForm({

                                ...form,

                                targetAmount: e.target.value

                            })

                        }

                    />

                    <input

                        type="date"

                        value={form.targetDate}

                        onChange={(e) =>

                            setForm({

                                ...form,

                                targetDate: e.target.value

                            })

                        }

                    />

                    <select

                        value={form.category}

                        onChange={(e) =>

                            setForm({

                                ...form,

                                category: e.target.value

                            })

                        }

                    >

                        <option>Emergency Fund</option>

                        <option>Vacation</option>

                        <option>Car</option>

                        <option>Bike</option>

                        <option>House</option>

                        <option>Education</option>

                        <option>Wedding</option>

                        <option>Electronics</option>

                        <option>Investment</option>

                        <option>Other</option>

                    </select>

                    <button onClick={addGoal}>

                        <FaPlusCircle />

                        Create Goal

                    </button>

                </div>

            </div>

            {/* Goal Cards */}

            <div className="goal-grid">

                {

                    goals.map(goal => (

                        <div

                            className="goal-card"

                            key={goal._id}

                        >

                            <div className="goal-card-top">

                                <h2>

                                    {goal.title}

                                </h2>

                                <span className="goal-status">

                                    {goal.status}

                                </span>

                            </div>

                            <p>

                                📂 {goal.category}

                            </p>

                            <p>

                                <FaCalendarAlt />

                                {" "}

                                Target :

                                {" "}

                                {new Date(

                                    goal.targetDate

                                ).toLocaleDateString()}

                            </p>

                            <h3>

                                ₹{goal.savedAmount}

                                {" "}

                                /

                                {" "}

                                ₹{goal.targetAmount}

                            </h3>

                            <div className="goal-progress">

                                <div

                                    className="goal-progress-fill"

                                    style={{

                                        width: `${goal.percentage}%`

                                    }}

                                />

                            </div>

                            <p>

                                {goal.percentage.toFixed(1)}%

                                completed

                            </p>

                            <p>

                                Remaining :

                                {" "}

                                ₹{goal.remaining}

                            </p>

                            <div className="goal-action">

                                <input

                                    type="number"

                                    placeholder="Add Savings"

                                    value={

                                        savingAmount[goal._id] || ""

                                    }

                                    onChange={(e) =>

                                        setSavingAmount({

                                            ...savingAmount,

                                            [goal._id]: e.target.value

                                        })

                                    }

                                />

                                <button

                                    className="save-btn"

                                    onClick={() =>

                                        addSavings(goal._id)

                                    }

                                >

                                    Save

                                </button>

                            </div>

                            <button

                                className="delete-btn"

                                onClick={() =>

                                    deleteGoal(goal._id)

                                }

                            >

                                <FaTrash />

                                Delete Goal

                            </button>

                        </div>

                    ))

                }

            </div>

        </div>

    );

}

export default Goals;