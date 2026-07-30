import { useEffect, useState } from "react";
import API from "../api/axios";

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    Legend,
    LineChart,
    Line
} from "recharts";

import "./ReportCharts.css";

const COLORS = [
    "#3b82f6",
    "#22c55e",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#14b8a6"
];

function ReportCharts() {

    const [monthly, setMonthly] = useState([]);
    const [category, setCategory] = useState([]);

    useEffect(() => {

        loadCharts();

    }, []);

    const loadCharts = async () => {

        try {

            const monthlyRes = await API.get("/analytics/monthly");

            setMonthly(monthlyRes.data.analytics);

            const categoryRes = await API.get("/analytics/category");

            setCategory(categoryRes.data.analytics);

        }

        catch(err){

            console.log(err);

        }

    };

    return (

        <div className="report-charts">

            <div className="chart-card">

                <h2>Income vs Expense</h2>

                <ResponsiveContainer width="100%" height={300}>

                    <BarChart data={monthly}>

                        <CartesianGrid strokeDasharray="3 3"/>

                        <XAxis dataKey="month"/>

                        <YAxis/>

                        <Tooltip/>

                        <Legend/>

                        <Bar
                            dataKey="income"
                            fill="#22c55e"
                        />

                        <Bar
                            dataKey="expense"
                            fill="#ef4444"
                        />

                    </BarChart>

                </ResponsiveContainer>

            </div>

            <div className="chart-card">

                <h2>Expense Categories</h2>

                <ResponsiveContainer width="100%" height={300}>

                    <PieChart>

                        <Pie

                            data={category}

                            dataKey="total"

                            nameKey="category"

                            outerRadius={100}

                            label

                        >

                            {

                                category.map((entry,index)=>(

                                    <Cell
                                        key={index}
                                        fill={
                                            COLORS[
                                                index %
                                                COLORS.length
                                            ]
                                        }
                                    />

                                ))

                            }

                        </Pie>

                        <Tooltip/>

                    </PieChart>

                </ResponsiveContainer>

            </div>

            <div className="chart-card full-width">

                <h2>Monthly Savings</h2>

                <ResponsiveContainer width="100%" height={300}>

                    <LineChart data={monthly}>

                        <CartesianGrid strokeDasharray="3 3"/>

                        <XAxis dataKey="month"/>

                        <YAxis/>

                        <Tooltip/>

                        <Legend/>

                        <Line

                            type="monotone"

                            dataKey="balance"

                            stroke="#2563eb"

                            strokeWidth={3}

                        />

                    </LineChart>

                </ResponsiveContainer>

            </div>

        </div>

    );

}

export default ReportCharts;