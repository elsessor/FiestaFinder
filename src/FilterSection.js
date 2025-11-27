import React from 'react';

const categories = [
  { value: 'All Festivals', label: 'All Festivals', icon: '🎭' },
  { value: 'Religious', label: 'Religious', icon: '⛪' },
  { value: 'Cultural', label: 'Cultural', icon: '🎨' },
  { value: 'Historical', label: 'Historical', icon: '🏛️' },
  { value: 'Nature', label: 'Nature', icon: '🌿' },
];

const months = [
  { value: 'All Year', label: 'All Year' },
  { value: 'January', label: 'January' },
  { value: 'February', label: 'February' },
  { value: 'April', label: 'April' },
  { value: 'May', label: 'May' },
  { value: 'September', label: 'September' },
  { value: 'October', label: 'October' },
  { value: 'December', label: 'December' },
];

const FilterSection = ({ selectedCategory, selectedMonth, onCategoryChange, onMonthChange }) => {
  return (
    <div className="bg-yellow-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Filter */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Filter by Category</h3>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => onCategoryChange(category.value)}
                className={`
                  px-4 py-2 rounded-md font-medium transition-colors
                  ${selectedCategory === category.value 
                    ? 'bg-gradient-to-r from-pink-500 to-orange-500 text-white border-0' 
                    : 'bg-white text-gray-700 border border-gray-300 hover:border-pink-500'
                  }
                `}
              >
                <span className="mr-2">{category.icon}</span>
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Month Filter */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Filter by Month</h3>
          <div className="flex flex-wrap gap-3">
            {months.map((month) => (
              <button
                key={month.value}
                onClick={() => onMonthChange(month.value)}
                className={`
                  px-4 py-2 rounded-md font-medium transition-colors
                  ${selectedMonth === month.value 
                    ? 'bg-gradient-to-r from-pink-500 to-orange-500 text-white border-0' 
                    : 'bg-white text-gray-700 border border-gray-300 hover:border-pink-500'
                  }
                `}
              >
                {month.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;