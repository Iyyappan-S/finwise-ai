import { useEffect, useState } from "react";
import API from "../api/axios";
import Layout from "../components/Layout";

function Income() {
  const [incomes, setIncomes] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const initialForm = {
    source: "",
    amount: "",
    category: "",
    date: "",
    description: ""
  };

  const [form, setForm] = useState(initialForm);

  const fetchIncomes = async () => {
    try {
      const response = await API.get("/income");
      setIncomes(response.data.incomes || []);
    } catch (error) {
      console.error("Failed to load incomes:", error);
    }
  };

  useEffect(() => {
    fetchIncomes();
  }, []);

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const incomeData = {
        ...form,
        amount: Number(form.amount)
      };

      if (editingId) {
        await API.put(`/income/${editingId}`, incomeData);
        alert("Income updated successfully");
      } else {
        await API.post("/income/add", incomeData);
        alert("Income added successfully");
      }

      setForm(initialForm);
      setEditingId(null);
      await fetchIncomes();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          `Failed to ${editingId ? "update" : "add"} income`
      );
    }
  };

  const handleEdit = (income) => {
    setEditingId(income._id);

    setForm({
      source: income.source || "",
      amount: income.amount || "",
      category: income.category || "",
      date: income.date
        ? new Date(income.date).toISOString().split("T")[0]
        : "",
      description: income.description || ""
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setForm(initialForm);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this income?"
    );

    if (!confirmed) return;

    try {
      await API.delete(`/income/${id}`);

      setIncomes((currentIncomes) =>
        currentIncomes.filter((income) => income._id !== id)
      );

      if (editingId === id) {
        handleCancelEdit();
      }

      alert("Income deleted successfully");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete income");
    }
  };

  return (
    <Layout>
      <h1 className="mb-6 text-3xl font-bold text-slate-900">
        Income Management
      </h1>

      <form
        onSubmit={handleSubmit}
        className="mb-8 grid gap-4 rounded-2xl bg-white p-6 shadow md:grid-cols-2"
      >
        <input
          type="text"
          name="source"
          placeholder="Income source"
          value={form.source}
          onChange={handleChange}
          className="rounded-xl border px-4 py-3 outline-none focus:border-green-500"
          required
        />

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
          min="1"
          className="rounded-xl border px-4 py-3 outline-none focus:border-green-500"
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="rounded-xl border px-4 py-3 outline-none focus:border-green-500"
          required
        />

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="rounded-xl border px-4 py-3 outline-none focus:border-green-500"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="rounded-xl border px-4 py-3 outline-none focus:border-green-500 md:col-span-2"
        />

        <button
          type="submit"
          className={`rounded-xl py-3 font-semibold text-white transition md:col-span-2 ${
            editingId
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {editingId ? "Update Income" : "Add Income"}
        </button>

        {editingId && (
          <button
            type="button"
            onClick={handleCancelEdit}
            className="rounded-xl bg-slate-500 py-3 font-semibold text-white hover:bg-slate-600 md:col-span-2"
          >
            Cancel Edit
          </button>
        )}
      </form>

      <div className="rounded-2xl bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-bold">Income Records</h2>

        <div className="space-y-3">
          {incomes.length === 0 && (
            <p className="text-slate-500">No income records found</p>
          )}

          {incomes.map((income) => (
            <div
              key={income._id}
              className="flex flex-col gap-4 border-b pb-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-semibold">{income.source}</p>

                <p className="text-sm text-slate-500">
                  {income.category} ·{" "}
                  {new Date(income.date).toLocaleDateString()}
                </p>

                {income.description && (
                  <p className="mt-1 text-sm text-slate-400">
                    {income.description}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-3">
                <p className="font-bold text-green-600">
                  +₹{income.amount}
                </p>

                <button
                  type="button"
                  onClick={() => handleEdit(income)}
                  className="rounded-lg bg-blue-100 px-3 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-600 hover:text-white"
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(income._id)}
                  className="rounded-lg bg-red-100 px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-600 hover:text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default Income;