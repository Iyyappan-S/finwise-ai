import { useEffect, useState } from "react";
import API from "../api/axios";
import "./GoalStats.css";

function GoalStats() {

    const [stats, setStats] = useState({});

    useEffect(() => {

        loadStats();

    }, []);

    const loadStats = async () => {

        try {

            const res = await API.get("/goals/statistics");

            setStats(res.data);

        }

        catch (err) {

            console.log(err);

        }

    };

    return (

        <div className="goal-stats">

            <div className="goal-stat-card">

                <h3>Total Goals</h3>

                <h2>{stats.totalGoals || 0}</h2>

            </div>

            <div className="goal-stat-card">

                <h3>Completed</h3>

                <h2>{stats.completedGoals || 0}</h2>

            </div>

            <div className="goal-stat-card">

                <h3>Active</h3>

                <h2>{stats.activeGoals || 0}</h2>

            </div>

            <div className="goal-stat-card">

                <h3>Total Saved</h3>

                <h2>₹{stats.totalSaved || 0}</h2>

            </div>

        </div>

    );

}

export default GoalStats;