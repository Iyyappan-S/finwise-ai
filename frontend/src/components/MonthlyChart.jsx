import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
    CartesianGrid
} from "recharts";


function MonthlyChart({data}) {


    return (

        <div className="chart-card">

            <h2>
                📊 Monthly Income vs Expense
            </h2>


            <ResponsiveContainer
                width="100%"
                height={350}
            >

                <BarChart data={data}>


                    <CartesianGrid 
                        strokeDasharray="3 3"
                    />


                    <XAxis 
                        dataKey="month"
                    />


                    <YAxis />


                    <Tooltip />


                    <Legend />



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

    );


}


export default MonthlyChart;