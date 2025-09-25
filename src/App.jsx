import { useState, useEffect } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import ExpenseFilter from "./components/ExpenseFilter";

// This is a Custom hook to handle expense-related state and logic
const useExpenses = () => {
  const getInitialExpenses = () => {
    try {
      const savedExpenses = localStorage.getItem("expenses");
      return savedExpenses ? JSON.parse(savedExpenses) : [];
    } catch (error) {
      console.error("Failed to parse expenses from localStorage", error);
      return [];
    }
  };

  const [expenses, setExpenses] = useState(getInitialExpenses);
  const [editingExpense, setEditingExpense] = useState(null);

  // Sync state with localStorage whenever expenses change
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  // Handle adding a new expense
  const handleAddExpense = (expense) => {
    setExpenses((prevExpenses) => [
      { ...expense, id: crypto.randomUUID() },
      ...prevExpenses, // Add new expense to the top
    ]);
  };

  // Handle updating an existing expense
  const handleUpdateExpense = (updatedExpense) => {
    setExpenses((prevExpenses) =>
      prevExpenses.map((expense) =>
        expense.id === updatedExpense.id ? updatedExpense : expense
      )
    );
    setEditingExpense(null); // Clear editing state after update
  };

  // Handle deleting an expense
  const handleDeleteExpense = (id) => {
    setExpenses((prevExpenses) =>
      prevExpenses.filter((expense) => expense.id !== id)
    );
  };

  // Set the expense to be edited
  const handleEditExpense = (expense) => {
    setEditingExpense(expense);
  };

  return {
    expenses,
    editingExpense,
    handleAddExpense,
    handleUpdateExpense,
    handleDeleteExpense,
    handleEditExpense,
  };
};

function App() {
  const {
    expenses,
    editingExpense,
    handleAddExpense,
    handleUpdateExpense,
    handleDeleteExpense,
    handleEditExpense,
  } = useExpenses();

  const [filterCategory, setFilterCategory] = useState("All");

  // 2. Derive categories from expenses and add "All"
  const allCategories = ["All", ...new Set(expenses.map(exp => exp.category))];

  // Filter expenses by category and sort by date
  const filteredExpenses = (filterCategory === "All"
    ? expenses
    : expenses.filter((expense) => expense.category === filterCategory)
  ).sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="flex flex-col items-center min-h-screen py-8 bg-green-100 bg-auto">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">
        <img
          src="/naira.png"
          alt="Logo"
          className="inline-block w-20 h-20 mr-2 max-w-100%"
        />
        [Expenditure Tracker]
      </h1>
      <div className="grid w-full max-w-3xl grid-cols-1 gap-10 p-6 bg-white rounded-lg shadow-lg md:grid-cols-2">
        <div>
          <h2 className="mb-4 text-xl font-semibold text-gray-800">
            {editingExpense ? "Edit Expense" : "Add a New Expense"}
          </h2>
          <ExpenseForm
            onAddExpense={handleAddExpense}
            onUpdateExpense={handleUpdateExpense}
            initialExpense={editingExpense}
            editingExpense={editingExpense}
          />
        </div>
        <div>
          <ExpenseFilter
            categories={allCategories}
            onFilterChange={setFilterCategory}
            currentCategory={filterCategory}
          />
          <ExpenseList
            expenses={filteredExpenses}
            onDeleteExpense={handleDeleteExpense}
            onEditExpense={handleEditExpense}
          />
        </div>
      </div>
    </div>
  );
}

export default App;

