import { Trash2, SquarePen } from 'lucide-react';

// A more robust and reusable component for the action buttons
function ActionButton({ icon: Icon, color, onClick, label }) {
    return (
        <button
            onClick={onClick}
            className="p-1 transition rounded-full hover:bg-gray-200"
            aria-label={label}
            title={label}
        >
            {/* Use the Icon component passed as a prop */}
            {Icon && <Icon size={15} color={color} />}
        </button>
    );
}

function ExpenseList({ expenses, onDeleteExpense, onEditExpense }) {
    // Better and more reusable locale-aware currency formatter
    const currencyFormatter = new Intl.NumberFormat('en-NG', { // 'en-NG' for Nigerian Naira
        style: 'currency',
        currency: 'NGN',
    });

    // date formatting function
    const formatDate = (dateString) => {
        if (!dateString) return '';
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString();
        } catch {
            console.error("Invalid date string:", dateString);
            return dateString;
        }
    };

    return (
        <div className="p-4 bg-white rounded-md shadow-md">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">Expenses</h2>
            {expenses.length === 0 ? (
                <p className="text-gray-500">No expenses shown at the moment.</p>
            ) : (
                <>
                    <p className="text-lg font-semibold">
                        Total: {currencyFormatter.format(
                            expenses.reduce((sum, expense) => sum + expense.amount, 0)
                        )}
                    </p>
                    <ul className="space-y-3">
                        {expenses.map((expense) => (
                            <li
                                key={expense.id}
                                className="flex items-center justify-between p-3 rounded-md shadow-sm bg-gray-50"
                            >
                                <div className="flex-1 pr-4">
                                    <p className="font-medium line-clamp-1">{expense.description}</p>
                                    <p className="text-sm text-gray-500">{expense.category}</p>
                                    <p className="text-xs text-gray-400">{formatDate(expense.date)}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="font-medium whitespace-nowrap">
                                        {currencyFormatter.format(expense.amount)}
                                    </span>
                                    <div className="flex gap-2">
                                        <ActionButton
                                            icon={Trash2}
                                            color="red"
                                            onClick={() => onDeleteExpense(expense.id)}
                                            label={`Delete ${expense.description}`}
                                        />
                                        <ActionButton
                                            icon={SquarePen}
                                            color="blue"
                                            onClick={() => onEditExpense(expense)}
                                            label={`Edit ${expense.description}`}
                                        />
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
}

export default ExpenseList;
