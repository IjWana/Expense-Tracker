function ExpenseFilter({ categories, onFilterChange, currentCategory }) {
    // Handle the case where there are no categories
    if (!categories || categories.length === 0) {
        return (
            <div className="p-5 mb-6 text-center text-gray-500 border border-solid">
                No categories available to filter.
            </div>
        );
    }

    return (
        <div className="p-5 mb-6 border border-solid">
            <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700">
                Filter by Category
            </label>
            <select
                id="category-filter"
                value={currentCategory}
                onChange={(e) => onFilterChange(e.target.value)}
                className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="">All Categories</option>
                {categories.map((category) => (
                    <option key={category} value={category}>
                        {category}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default ExpenseFilter;


