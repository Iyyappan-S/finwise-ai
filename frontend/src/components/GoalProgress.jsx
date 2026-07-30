import { useEffect, useState } from "react";
import API from "../api/axios";
import "./GoalProgress.css";

function GoalProgress() {

    const [goals, setGoals] = useState([]);

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

    return (

        <div className="goal-progress">

            <h2>🎯 Savings Goals</h2>

            {

                goals.length === 0 ?

                (

                    <p>No Goals Added Yet.</p>

                )

                :

                (

                    goals.map(goal => (

                        <div
                            key={goal._id}
                            className="goal-card"
                        >

                            <div className="goal-header">

                                <h3>{goal.title}</h3>

                                <span>

                                    ₹{goal.savedAmount} / ₹{goal.targetAmount}

                                </span>

                            </div>

                            <div className="goal-bar">

                                <div

                                    className="goal-fill"

                                    style={{

                                        width: `${goal.percentage}%`

                                    }}

                                />

                            </div>

                            <div className="goal-footer">

                                <span>

                                    Remaining : ₹{goal.remaining}

                                </span>

                                <span>

                                    {goal.percentage.toFixed(0)}%

                                </span>

                            </div>

                        </div>

                    ))

                )

            }

        </div>

    );

}

export default GoalProgress;