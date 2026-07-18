import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl p-8 shadow-xl">
        <h1 className="text-3xl font-bold text-center text-slate-900">
          FinWise AI
        </h1>
        <p className="text-center text-slate-500 mt-2">
          Login to manage your money smarter
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
            className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700">
            Login
          </button>
        </form>

        <p className="text-center mt-6 text-slate-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 font-semibold">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}



export default Login;

