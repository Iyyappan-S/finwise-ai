import { useEffect, useState } from "react";
import api from "../api/axios";
import EditTransactionModal from "./EditTransactionModal";

function TransactionList() {

    const [transactions, setTransactions] = useState([]);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All");
    const [dateFilter, setDateFilter] = useState("All");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);

    // Load Transactions
    const loadTransactions = async () => {

        try {

            const res = await api.get("/transactions");

            setTransactions(res.data);

        } catch (error) {

            console.log("Transaction Fetch Error:", error);

        }

    };

    useEffect(() => {

        loadTransactions();

    }, []);

    // Delete Transaction
    const deleteTransaction = async (id, type) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this transaction?"
        );

        if (!confirmDelete) return;

        try {

            if (type === "Income") {

                await api.delete(`/income/${id}`);

            } else {

                await api.delete(`/expense/${id}`);

            }

            alert("Transaction deleted successfully.");

            loadTransactions();

        } catch (error) {

            console.log(error);

            alert("Failed to delete transaction.");

        }

    };

    // Open Edit Modal
    const editTransaction = (transaction) => {

        setSelectedTransaction(transaction);

        setIsModalOpen(true);

    };

    // Save Edited Transaction
    const saveTransaction = async (updatedData) => {

        try {

            if (selectedTransaction.type === "Income") {

                await api.put(
                    `/income/${selectedTransaction._id}`,
                    updatedData
                );

            } else {

                await api.put(
                    `/expense/${selectedTransaction._id}`,
                    updatedData
                );

            }

            alert("Transaction updated successfully ✅");

            setIsModalOpen(false);

            loadTransactions();

        } catch (error) {

            console.log(error);

            alert("Failed to update transaction");

        }

    };

  const filteredTransactions = transactions.filter((item) => {

    const keyword = search.toLowerCase();

    const matchesSearch =
        item.title.toLowerCase().includes(keyword) ||
        (item.category || "")
            .toLowerCase()
            .includes(keyword);

    const matchesType =
        filter === "All" ||
        item.type === filter;

    const transactionDate = new Date(item.date);
    const today = new Date();

    let matchesDate = true;

    // Today
    if (dateFilter === "Today") {

        matchesDate =
            transactionDate.toDateString() ===
            today.toDateString();

    }

    // This Week
    else if (dateFilter === "This Week") {

        const firstDay = new Date(today);
        firstDay.setDate(today.getDate() - today.getDay());
        firstDay.setHours(0, 0, 0, 0);

        const endDay = new Date(today);
        endDay.setHours(23, 59, 59, 999);

        matchesDate =
            transactionDate >= firstDay &&
            transactionDate <= endDay;

    }

    // This Month
    else if (dateFilter === "This Month") {

        matchesDate =
            transactionDate.getMonth() === today.getMonth() &&
            transactionDate.getFullYear() === today.getFullYear();

    }

    // Custom Date Range
    if (fromDate && toDate) {

        const from = new Date(fromDate);
        const to = new Date(toDate);

        to.setHours(23, 59, 59, 999);

        matchesDate =
            transactionDate >= from &&
            transactionDate <= to;

    }

    

    return (
        matchesSearch &&
        matchesType &&
        matchesDate
    );

});

    return (

    <div className="transactions">

        {/* Search Box */}

        <input
            type="text"
            placeholder="🔍 Search transactions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-box"
        />

        {/* Type Filter */}

        <div className="filter-buttons">

            <button onClick={() => setFilter("All")}>
                All
            </button>

            <button onClick={() => setFilter("Income")}>
                Income
            </button>

            <button onClick={() => setFilter("Expense")}>
                Expense
            </button>

        </div>

        {/* 👇 ADD STEP 3 HERE */}

        <div className="date-filter">

            <button onClick={() => setDateFilter("All")}>
                All Dates
            </button>

            <button onClick={() => setDateFilter("Today")}>
                Today
            </button>

            <button onClick={() => setDateFilter("This Week")}>
                This Week
            </button>

            <button onClick={() => setDateFilter("This Month")}>
                This Month
            </button>

        </div>

    <div className="custom-date-filter">

    <input
        type="date"
        value={fromDate}
        onChange={(e) => setFromDate(e.target.value)}
    />

    <input
        type="date"
        value={toDate}
        onChange={(e) => setToDate(e.target.value)}
    />

</div>

<button
    className="reset-btn"
    onClick={() => {
        setSearch("");
        setFilter("All");
        setDateFilter("All");
        setFromDate("");
        setToDate("");
    }}
>
    🔄 Reset Filters
</button>

        <h2>📝 Recent Transactions</h2>

        {
    filteredTransactions.length === 0 ? (

        <p>No transactions found.</p>

    ) : (

        filteredTransactions.map((item) => (

            <div
                key={item._id}
                className="transaction"
            >

                <div>

                    <strong>{item.title}</strong>

                    <br />

                    <small>{item.category}</small>
                    {item.description && (
    <>
        <br />
        <small>{item.description}</small>
    </>
)}

                    <br />

                    <small>{item.type}</small>

                </div>

                <div style={{ textAlign: "right" }}>

                    <h3
                        style={{
                            color:
                                item.type === "Income"
                                    ? "green"
                                    : "red"
                        }}
                    >
                        {item.type === "Income" ? "+" : "-"}
                        ₹{item.amount}
                    </h3>

                    <small>
                        {item.date
                            ? new Date(item.date).toLocaleDateString("en-IN",{
    day:"2-digit",
    month:"short",
    year:"numeric"
})
                            : ""}
                    </small>

                    <div
                        style={{
                            display: "flex",
                            gap: "10px",
                            marginTop: "10px"
                        }}
                    >

                        <button
                            className="edit-btn"
                            onClick={() => editTransaction(item)}
                        >
                            ✏ Edit
                        </button>

                        <button
                            className="delete-btn"
                            onClick={() =>
                                deleteTransaction(item._id, item.type)
                            }
                        >
                            🗑 Delete
                        </button>

                    </div>

                </div>

            </div>

        ))

    )
}

        <EditTransactionModal
            isOpen={isModalOpen}
            transaction={selectedTransaction}
            onClose={() => setIsModalOpen(false)}
            onSave={saveTransaction}
        />

    </div>

);

}

export default TransactionList;