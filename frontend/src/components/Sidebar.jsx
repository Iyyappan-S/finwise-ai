import { NavLink, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaMoneyBillWave,
  FaWallet,
  FaChartPie,
  FaRobot,
  FaUser,
  FaSignOutAlt
} from "react-icons/fa";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-xl px-4 py-3 transition ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-slate-300 hover:bg-slate-700 hover:text-white"
    }`;

  return (
    <aside className="min-h-screen w-64 bg-slate-900 p-5">
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-white">
          FinWise AI
        </h1>

        <p className="mt-1 text-sm text-slate-400">
          Smart Finance Manager
        </p>
      </div>

      <nav className="space-y-2">
        <NavLink to="/dashboard" className={linkClass}>
          <FaHome />
          Dashboard
        </NavLink>

        <NavLink to="/income" className={linkClass}>
          <FaMoneyBillWave />
          Income
        </NavLink>

        <NavLink to="/expense" className={linkClass}>
          <FaWallet />
          Expense
        </NavLink>

        <NavLink to="/analytics" className={linkClass}>
          <FaChartPie />
          Analytics
        </NavLink>

        <NavLink to="/ai" className={linkClass}>
          <FaRobot />
          AI Advisor
        </NavLink>

        <NavLink to="/profile" className={linkClass}>
          <FaUser />
          Profile
        </NavLink>
      </nav>

      <button
        onClick={handleLogout}
        className="mt-10 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-400 transition hover:bg-red-500 hover:text-white"
      >
        <FaSignOutAlt />
        Logout
      </button>
    </aside>
  );
}

export default Sidebar;