import { useEffect, useState } from "react";
import API from "../api/axios";
import Layout from "../components/Layout";

function Expense() {
  const [expenses, setExpenses] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const initialForm = {
    title: "",
    amount: "",
    category: "",
    date: "",
    description: ""
  };

  const [form, setForm] = useState(initialForm);

  const fetchExpenses = async () => {
    try {
      const response = await API.get("/expense");
      setExpenses(response.data.expenses || []);
    } catch (error) {
      console.error("Failed to load expenses:", error);
    }
  };

  useEffect(() => {
    fetchExpenses();
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
      const expenseData = {
        ...form,
        amount: Number(form.amount)
      };

      if (editingId) {
        await API.put(`/expense/${editingId}`, expenseData);
        alert("Expense updated successfully");
      } else {
        await API.post("/expense/add", expenseData);
        alert("Expense added successfully");
      }

      setForm(initialForm);
      setEditingId(null);
      await fetchExpenses();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          `Failed to ${editingId ? "update" : "add"} expense`
      );
    }
  };

  const handleEdit = (expense) => {
    setEditingId(expense._id);

    setForm({
      title: expense.title || "",
      amount: expense.amount || "",
      category: expense.category || "",
      date: expense.date
        ? new Date(expense.date).toISOString().split("T")[0]
        : "",
      description: expense.description || ""
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
      "Are you sure you want to delete this expense?"
    );

    if (!confirmed) return;

    try {
      await API.delete(`/expense/${id}`);

      setExpenses((currentExpenses) =>
        currentExpenses.filter((expense) => expense._id !== id)
      );

      if (editingId === id) {
        handleCancelEdit();
      }

      alert("Expense deleted successfully");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete expense");
    }
  };

  return (
    <Layout>
      <h1 className="mb-6 text-3xl font-bold text-slate-900">
        Expense Management
      </h1>

      <form
        onSubmit={handleSubmit}
        className="mb-8 grid gap-4 rounded-2xl bg-white p-6 shadow md:grid-cols-2"
      >
        <input
          type="text"
          name="title"
          placeholder="Expense title"
          value={form.title}
          onChange={handleChange}
          className="rounded-xl border px-4 py-3 outline-none focus:border-red-500"
          required
        />

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
          min="1"
          className="rounded-xl border px-4 py-3 outline-none focus:border-red-500"
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="rounded-xl border px-4 py-3 outline-none focus:border-red-500"
          required
        />

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="rounded-xl border px-4 py-3 outline-none focus:border-red-500"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="rounded-xl border px-4 py-3 outline-none focus:border-red-500 md:col-span-2"
        />

        <button
          type="submit"
          className={`rounded-xl py-3 font-semibold text-white transition md:col-span-2 ${
            editingId
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-red-600 hover:bg-red-700"
          }`}
        >
          {editingId ? "Update Expense" : "Add Expense"}
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
        <h2 className="mb-4 text-xl font-bold">Expense Records</h2>

        <div className="space-y-3">
          {expenses.length === 0 && (
            <p className="text-slate-500">No expense records found</p>
          )}

          {expenses.map((expense) => (
            <div
              key={expense._id}
              className="flex flex-col gap-4 border-b pb-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-semibold">{expense.title}</p>

                <p className="text-sm text-slate-500">
                  {expense.category} ·{" "}
                  {new Date(expense.date).toLocaleDateString()}
                </p>

                {expense.description && (
                  <p className="mt-1 text-sm text-slate-400">
                    {expense.description}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-3">
                <p className="font-bold text-red-600">
                  -₹{expense.amount}
                </p>

                <button
                  type="button"
                  onClick={() => handleEdit(expense)}
                  className="rounded-lg bg-blue-100 px-3 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-600 hover:text-white"
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(expense._id)}
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

export default Expense;