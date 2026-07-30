import { useEffect, useState } from "react";
import API from "../api/axios";
import "./AdminDashboard.css";

function AdminDashboard() {

    const [stats, setStats] = useState({
        totalUsers: 0,
        totalIncome: 0,
        totalExpense: 0,
        totalBalance: 0
    });

    const [users, setUsers] = useState([]);

    useEffect(() => {
        loadDashboard();
        loadUsers();
    }, []);

    const loadDashboard = async () => {
        try {
            const res = await API.get("/admin/dashboard");
            setStats(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const loadUsers = async () => {
        try {
            const res = await API.get("/admin/users");
            setUsers(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const deleteUser = async (id) => {

        if (!window.confirm("Delete this user?")) return;

        try {

            await API.delete(`/admin/users/${id}`);

            loadUsers();

            loadDashboard();

        } catch (err) {

            console.log(err);

        }

    };

    return (

        <div className="admin-page">

            <h1>🛠 Admin Dashboard</h1>

            <div className="admin-cards">

                <div className="admin-card">

                    <h3>Total Users</h3>

                    <h2>{stats.totalUsers}</h2>

                </div>

                <div className="admin-card">

                    <h3>Total Income</h3>

                    <h2>₹{stats.totalIncome}</h2>

                </div>

                <div className="admin-card">

                    <h3>Total Expense</h3>

                    <h2>₹{stats.totalExpense}</h2>

                </div>

                <div className="admin-card">

                    <h3>Platform Balance</h3>

                    <h2>₹{stats.totalBalance}</h2>

                </div>

            </div>

            <div className="users-section">

                <h2>Registered Users</h2>

                <table>

                    <thead>

                        <tr>

                            <th>Name</th>

                            <th>Email</th>

                            <th>Role</th>

                            <th>Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {
                            users.map(user => (

                                <tr key={user._id}>

                                    <td>{user.name}</td>

                                    <td>{user.email}</td>

                                    <td>{user.role}</td>

                                    <td>

                                        <button
                                            className="delete-btn"
                                            onClick={() => deleteUser(user._id)}
                                        >
                                            Delete
                                        </button>

                                    </td>

                                </tr>

                            ))
                        }

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default AdminDashboard;