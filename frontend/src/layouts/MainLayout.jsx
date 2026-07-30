import { Outlet } from "react-router-dom";
import { useState } from "react";
import { FaBars } from "react-icons/fa";

import Sidebar from "../components/Sidebar";
import "./MainLayout.css";

function MainLayout() {
    const [open, setOpen] = useState(false);

    const role = "admin"; // replace later with logged-in user role

    return (
        <>
            <header className="mobile-header">
                <button
                    className="menu-btn"
                    onClick={() => setOpen(true)}
                >
                    <FaBars />
                </button>

                <h2>FinWise AI</h2>
            </header>

            <Sidebar
                open={open}
                setOpen={setOpen}
                role={role}
            />

            <main className="content">
                <Outlet />
            </main>
        </>
    );
}

export default MainLayout;