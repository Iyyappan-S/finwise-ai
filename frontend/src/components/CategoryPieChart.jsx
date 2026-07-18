import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#A855F7",
  "#EF4444",
];

function CategoryPieChart({ data }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h2 className="text-xl font-bold mb-4">
        Expense by Category
      </h2>

      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={data}
            dataKey="total"
            nameKey="category"
            outerRadius={120}
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CategoryPieChart;