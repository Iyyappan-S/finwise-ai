import { Link } from "react-router-dom";
import {
    FaHome,
    FaMoneyBillWave,
    FaWallet,
    FaChartBar,
    FaBullseye,
    FaBell,
    FaCog,
    FaUser,
    FaFileAlt,
    FaUserShield,
    FaTimes
} from "react-icons/fa";

import "./Sidebar.css";

function Sidebar({ open, setOpen, role }) {

    return (
        <>
            {open && (
                <div
                    className="sidebar-overlay"
                    onClick={() => setOpen(false)}
                />
            )}

            <aside className={`sidebar ${open ? "show" : ""}`}>

                <div className="sidebar-top">

                    <h2>💰 FinWise AI</h2>

                    <button
                        className="close-btn"
                        onClick={() => setOpen(false)}
                    >
                        <FaTimes />
                    </button>

                </div>

                <nav>

                    <Link to="/dashboard" onClick={() => setOpen(false)}>
                        <FaHome /> Dashboard
                    </Link>

                    <Link to="/add-income" onClick={() => setOpen(false)}>
                        <FaMoneyBillWave /> Add Income
                    </Link>

                    <Link to="/add-expense" onClick={() => setOpen(false)}>
                        <FaWallet /> Add Expense
                    </Link>

                    <Link to="/analytics" onClick={() => setOpen(false)}>
                        <FaChartBar /> Analytics
                    </Link>

                    <Link to="/budget" onClick={() => setOpen(false)}>
                        💰 Budget
                    </Link>

                    <Link to="/goals" onClick={() => setOpen(false)}>
                        <FaBullseye /> Goals
                    </Link>

                    <Link to="/reports" onClick={() => setOpen(false)}>
                        <FaFileAlt /> Reports
                    </Link>

                    <Link to="/notifications" onClick={() => setOpen(false)}>
                        <FaBell /> Notifications
                    </Link>

                    <Link to="/settings" onClick={() => setOpen(false)}>
                        <FaCog /> Settings
                    </Link>

                    <Link to="/profile" onClick={() => setOpen(false)}>
                        <FaUser /> Profile
                    </Link>

                    {role === "admin" && (
                        <Link to="/admin/dashboard" onClick={() => setOpen(false)}>
                            <FaUserShield /> Admin Panel
                        </Link>
                    )}

                </nav>

            </aside>
        </>
    );
}

export default Sidebar;