import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

function FinanceChart({ income, expense }) {

  const data = [
    {
      name: "Finance",
      Income: income,
      Expense: expense,
    },
  ];

  return (
    <div className="chart-card">

      <h2>📊 Income vs Expense</h2>

      <ResponsiveContainer width="100%" height={350}>

        <BarChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip />

          <Legend />

          <Bar
            dataKey="Income"
            fill="#22c55e"
            radius={[8,8,0,0]}
          />

          <Bar
            dataKey="Expense"
            fill="#ef4444"
            radius={[8,8,0,0]}
          />

        </BarChart>

      </ResponsiveContainer>

    </div>
  );
}

export default FinanceChart;