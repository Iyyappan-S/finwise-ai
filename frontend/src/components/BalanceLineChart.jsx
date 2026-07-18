import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

function BalanceLineChart({ data }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow">
      <h2 className="mb-4 text-xl font-bold">
        Monthly Balance Trend
      </h2>

      {data.length === 0 ? (
        <div className="flex h-[350px] items-center justify-center">
          <p className="text-gray-500">No balance data available</p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip
              formatter={(value) => [`₹${value}`, "Balance"]}
            />

            <Legend />

            <Line
              type="monotone"
              dataKey="balance"
              name="Balance"
              stroke="#2563eb"
              strokeWidth={3}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default BalanceLineChart;