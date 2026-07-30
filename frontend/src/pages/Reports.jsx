import { useEffect, useState } from "react";
import API from "../api/axios";
import "./Reports.css";
import ReportCharts from "../components/ReportCharts";

function Reports() {

    const today = new Date();

    const [month, setMonth] = useState(today.getMonth() + 1);
    const [year, setYear] = useState(today.getFullYear());

    const [report, setReport] = useState(null);

    useEffect(() => {
        loadReport();
    }, []);

    const loadReport = async () => {

        try {

            const res = await API.get(
                `/reports/${month}/${year}`
            );

            setReport(res.data);

        } catch (err) {

            console.log(err);

        }

    };

    return (

        <div className="reports-page">

            <h1>📊 Financial Reports</h1>

            <div className="report-filter">

                <select
                    value={month}
                    onChange={(e)=>setMonth(e.target.value)}
                >

                    {
                        [
                            "January",
                            "February",
                            "March",
                            "April",
                            "May",
                            "June",
                            "July",
                            "August",
                            "September",
                            "October",
                            "November",
                            "December"
                        ].map((m,index)=>(

                            <option
                                key={index}
                                value={index+1}
                            >
                                {m}
                            </option>

                        ))
                    }

                </select>

                <input
                    type="number"
                    value={year}
                    onChange={(e)=>setYear(e.target.value)}
                />

                <button onClick={loadReport}>

                    Generate Report

                </button>

            </div>

            {

                report && (

                    <div className="report-grid">

                        <div className="report-card income">

                            <h3>Total Income</h3>

                            <h2>₹{report.totalIncome}</h2>

                        </div>

                        <div className="report-card expense">

                            <h3>Total Expense</h3>

                            <h2>₹{report.totalExpense}</h2>

                        </div>

                        <div className="report-card saving">

                            <h3>Total Savings</h3>

                            <h2>₹{report.totalSavings}</h2>

                        </div>

                        <div className="report-card category">

                            <h3>Top Category</h3>

                            <h2>{report.topCategory}</h2>

                        </div>

                        <ReportCharts />

                    </div>

                )

            }

        </div>

    );

}

export default Reports;