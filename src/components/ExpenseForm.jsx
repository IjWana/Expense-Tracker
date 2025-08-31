import { useEffect, useState } from "react";

function ExpenseForm({ onAddExpense, initialExpense, onUpdateExpense }) {
    const [formData, setFormData] = useState(
        initialExpense || {
            description: "",
            amount: "",
            category: "",
            date: new Date().toISOString().split("T")[0],
        }
    );

    // State for validation errors
    const [errors, setErrors] = useState({});

    // Determine if the form is for editing or adding
    const isEditing = !!initialExpense;


    // Basic validation function
    const validate = () => {
        const newErrors = {};
        if (!formData.description.trim()) newErrors.description = "Description is required.";
        if (!formData.amount || parseFloat(formData.amount) <= 0) {
            newErrors.amount = "Amount must be a positive number.";
        }
        if (formData.date > new Date().toISOString().split("T")[0]) {
            newErrors.date = "Date cannot be in the future.";
        }
        if (!formData.category) newErrors.category = "Category is required.";
        return newErrors;
    };

    useEffect(() => {
        if (initialExpense) {
            setFormData({
                description: initialExpense?.description || "",
                amount: initialExpense?.amount || "",
                category: initialExpense?.category || "",
                date: initialExpense?.date || new Date().toISOString().split("T")[0],
            });
        }
    }, [isEditing, initialExpense]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        if (isEditing) {
            onUpdateExpense({ ...formData, amount: parseFloat(formData.amount), id: initialExpense.id });
        } else {
            onAddExpense({ ...formData, amount: parseFloat(formData.amount) });
        }

        // Reset form to initial state
        setFormData({
            description: "",
            amount: "",
            category: "",
            date: new Date().toISOString().split("T")[0],
        });
        setErrors({});
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 mb-2 bg-white rounded-md shadow-md">
            <div className="flex flex-wrap gap-4 p-5 border border-solid rounded-md shadow-md">
                <div className="flex-grow max-w-screen-sm mb-4">
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <input
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className={`w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 ${errors.description ? "border-red-500" : "focus:ring-blue-500"
                            }`}
                        placeholder="Enter description"
                    />
                    {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
                </div>
                <div className="flex-grow max-w-screen-sm mb-4">
                    <label className="block text-sm font-medium text-gray-700">Amount</label>
                    <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        className={`w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 ${errors.amount ? "border-red-500" : "focus:ring-blue-500"
                            }`}
                        placeholder="Input an amount"
                    />
                    {errors.amount && <p className="mt-1 text-sm text-red-500">{errors.amount}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Date</label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className={`w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 ${errors.date ? "border-red-500" : "focus:ring-blue-500"
                            }`}
                    />
                    {errors.date && <p className="mt-1 text-sm text-red-500">{errors.date}</p>}
                </div>
                <div className="flex-grow max-w-screen-sm mb-4">
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className={`w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 ${errors.category ? "border-red-500" : "focus:ring-blue-500"
                            }`}
                    >
                        <option value="">--Select Category--</option>
                        <option value="Food">Food</option>
                        <option value="Transport">Transport</option>
                        <option value="Utilities">Utilities</option>
                        <option value="Medicals">Medicals</option>
                        <option value="Other">Other</option>
                    </select>
                    {errors.category && <p className="mt-1 text-sm text-red-500">{errors.category}</p>}
                </div>
                <button
                    type="submit"
                    className="w-full p-2 text-white transition bg-green-600 rounded-md hover:bg-green-800"
                >
                    {isEditing ? "Update Expense" : "Add to Expenses"}
                </button>
            </div>
        </form>
    );
}

export default ExpenseForm;

