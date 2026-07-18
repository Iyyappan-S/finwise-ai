import { useEffect, useState } from "react";
import API from "../api/axios";
import Layout from "../components/Layout";
import MonthlyBarChart from "../components/MonthlyBarChart";
import CategoryPieChart from "../components/CategoryPieChart";
import BalanceLineChart from "../components/BalanceLineChart";

function Analytics() {
  const [monthlyData, setMonthlyData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);

  const fetchMonthlyAnalytics = async () => {
    try {
      const response = await API.get("/analytics/monthly");
      setMonthlyData(response.data.analytics || []);
    } catch (error) {
      console.error("Failed to fetch monthly analytics:", error);
    }
  };

  const fetchCategoryAnalytics = async () => {
    try {
      const response = await API.get("/analytics/category");
      setCategoryData(response.data.analytics || []);
    } catch (error) {
      console.error("Failed to fetch category analytics:", error);
    }
  };

  useEffect(() => {
    fetchMonthlyAnalytics();
    fetchCategoryAnalytics();
  }, []);

  return (
    <Layout>
      <h1 className="mb-6 text-3xl font-bold">
        Analytics Dashboard
      </h1>

      <div className="space-y-6">
        <MonthlyBarChart data={monthlyData} />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <CategoryPieChart data={categoryData} />

          <BalanceLineChart data={monthlyData} />
        </div>
      </div>
    </Layout>
  );
}

export default Analytics;