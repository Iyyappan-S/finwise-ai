import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

function MonthlyBarChart({ data }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h2 className="text-xl font-bold mb-4">
        Monthly Income vs Expense
      </h2>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Legend />

          <Bar
            dataKey="income"
            fill="#16a34a"
            name="Income"
          />

          <Bar
            dataKey="expense"
            fill="#dc2626"
            name="Expense"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default MonthlyBarChart;