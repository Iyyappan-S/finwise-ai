import { useEffect, useState } from "react";
import API from "../api/axios";

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip
} from "recharts";

function ExpenseBarChart() {

    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        loadChart();
    }, []);

    const loadChart = async () => {
        try {
            const res = await API.get("/analytics/monthly-expense");
            setChartData(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="chart-card">

            <h2>📊 Monthly Expense</h2>

            <ResponsiveContainer width="100%" height={350}>

                {/* REPLACE YOUR OLD BARCHART WITH THIS */}

                <BarChart
                    data={chartData}
                    margin={{
                        top: 20,
                        right: 20,
                        left: 20,
                        bottom: 20
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis
                        dataKey="month"
                        tick={{ fontSize: 14 }}
                    />

                    <YAxis />

                    <Tooltip />

                    <Bar
                        dataKey="total"
                        fill="#3B82F6"
                        radius={[8, 8, 0, 0]}
                        barSize={50}
                    />

                </BarChart>

            </ResponsiveContainer>

        </div>
    );
}

export default ExpenseBarChart;