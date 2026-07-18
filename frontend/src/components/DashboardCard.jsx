function DashboardCard({ title, value, icon }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-500 text-sm">{title}</p>
          <h2 className="text-2xl font-bold mt-2">{value}</h2>
        </div>
        <div className="text-3xl">{icon}</div>
      </div>
    </div>
  );
}

export default DashboardCard;