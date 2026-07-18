import { useEffect, useState } from "react";
import API from "../api/axios";
import Layout from "../components/Layout";

function Profile() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
  });

  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      setError("");

      const [profileResponse, dashboardResponse] = await Promise.all([
        API.get("/auth/profile"),
        API.get("/dashboard"),
      ]);

      setProfile(profileResponse.data);
      setSummary(dashboardResponse.data);
    } catch (error) {
      console.error("Profile loading failed:", error);

      setError(
        error.response?.data?.message ||
          "Unable to load profile information."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <p className="text-slate-600">Loading profile...</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-2 text-3xl font-bold text-slate-900">
          My Profile
        </h1>

        <p className="mb-6 text-slate-600">
          View your account and financial information.
        </p>

        {error && (
          <p className="mb-5 rounded-lg bg-red-50 p-3 text-red-600">
            {error}
          </p>
        )}

        <div className="rounded-2xl bg-white p-6 shadow">
          <div className="flex items-center gap-5">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-600 text-3xl font-bold text-white">
              {profile.name
                ? profile.name.charAt(0).toUpperCase()
                : "U"}
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                {profile.name || "User"}
              </h2>

              <p className="text-slate-600">
                {profile.email || "Email unavailable"}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow">
            <p className="text-sm font-semibold text-slate-500">
              Total Income
            </p>

            <h3 className="mt-2 text-2xl font-bold text-green-600">
              ₹{Number(summary.totalIncome || 0).toLocaleString("en-IN")}
            </h3>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow">
            <p className="text-sm font-semibold text-slate-500">
              Total Expense
            </p>

            <h3 className="mt-2 text-2xl font-bold text-red-600">
              ₹{Number(summary.totalExpense || 0).toLocaleString("en-IN")}
            </h3>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow">
            <p className="text-sm font-semibold text-slate-500">
              Current Balance
            </p>

            <h3
              className={`mt-2 text-2xl font-bold ${
                summary.balance >= 0
                  ? "text-blue-600"
                  : "text-red-600"
              }`}
            >
              ₹{Number(summary.balance || 0).toLocaleString("en-IN")}
            </h3>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Profile;