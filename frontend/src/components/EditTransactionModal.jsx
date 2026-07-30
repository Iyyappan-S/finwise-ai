import { useState, useEffect } from "react";

function EditTransactionModal({
    isOpen,
    onClose,
    transaction,
    onSave
}) {

    const [formData, setFormData] = useState({
        title: "",
        amount: "",
        category: "",
        date: "",
        description: ""
    });

    useEffect(() => {

        if (transaction) {

            setFormData({
                title: transaction.title || "",
                amount: transaction.amount || "",
                category: transaction.category || "",
                date: transaction.date
                    ? transaction.date.substring(0, 10)
                    : "",
                description: transaction.description || ""
            });

        }

    }, [transaction]);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        onSave(formData);

    };

    if (!isOpen) return null;

    return (

        <div className="modal-overlay">

            <div className="modal">

                <h2>✏ Edit Transaction</h2>

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="number"
                        name="amount"
                        placeholder="Amount"
                        value={formData.amount}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="category"
                        placeholder="Category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                    />

                    <textarea
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleChange}
                    />

                    <div className="modal-buttons">

                        <button type="submit">
                            💾 Save
                        </button>

                        <button
                            type="button"
                            onClick={onClose}
                        >
                            ❌ Cancel
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default EditTransactionModal;