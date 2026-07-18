import { useEffect, useState } from "react";
import API from "../api/axios";
import DashboardCard from "../components/DashboardCard";
import TransactionTable from "../components/TransactionTable";
import Layout from "../components/Layout";

function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchDashboard();
    fetchTransactions();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await API.get("/dashboard");
      setSummary(response.data);
    } catch (error) {
      console.error("Dashboard error:", error);
    }
  };

  const fetchTransactions = async () => {
    try {
      const response = await API.get("/transactions");

      setTransactions(response.data.transactions || []);
    } catch (error) {
      console.error("Transaction error:", error);
    }
  };

  return (
    <Layout>
      <h1 className="mb-8 text-3xl font-bold text-slate-900">
        FinWise AI Dashboard
      </h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <DashboardCard
          title="Total Balance"
          value={`₹${summary?.balance || 0}`}
          icon="💰"
        />

        <DashboardCard
          title="Total Income"
          value={`₹${summary?.totalIncome || 0}`}
          icon="📈"
        />

        <DashboardCard
          title="Total Expense"
          value={`₹${summary?.totalExpense || 0}`}
          icon="📉"
        />
      </div>

      <TransactionTable transactions={transactions} />
    </Layout>
  );
}

export default Dashboard;