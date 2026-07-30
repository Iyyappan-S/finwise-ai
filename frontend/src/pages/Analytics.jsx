import { useEffect, useState } from "react";

import api from "../api/axios";

import Sidebar from "../components/Sidebar";

import MonthlyChart from "../components/MonthlyChart";

import ExpensePieChart from "../components/ExpensePieChart";

import "../styles/dashboard.css";

import InsightCard from "../components/InsightCard";



function Analytics(){


    const [monthly,setMonthly]=useState([]);

    const [category,setCategory]=useState([]);




    useEffect(()=>{


        const fetchData = async()=>{


            try{


                const monthlyRes =
                await api.get("/analytics/monthly");



                const categoryRes =
                await api.get("/analytics/category");



                setMonthly(
                    monthlyRes.data.analytics || []
                );



                setCategory(
                    categoryRes.data.analytics || []
                );



            }
            catch(error){

                console.log(error);

            }


        };



        fetchData();


    },[]);



const totalIncome = monthly.reduce(
    (sum, item) => sum + item.income,
    0
);

const totalExpense = monthly.reduce(
    (sum, item) => sum + item.expense,
    0
);
    
    return(

    <div className="layout">

        <Sidebar/>

        <div className="dashboard">

            <h1>📊 Analytics Dashboard</h1>

            <MonthlyChart data={monthly}/>

            <ExpensePieChart data={category}/>

            <InsightCard
                income={totalIncome}
                expense={totalExpense}
                category={category}
            />

        </div>

    </div>

)


}


export default Analytics;