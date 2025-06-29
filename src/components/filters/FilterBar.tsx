import React from 'react';
import { Filter, Star, Clock, DollarSign } from 'lucide-react';

interface FilterBarProps {
  selectedCuisine: string;
  onCuisineChange: (cuisine: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  showFilters: boolean;
  onToggleFilters: () => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  selectedCuisine,
  onCuisineChange,
  sortBy,
  onSortChange,
  showFilters,
  onToggleFilters
}) => {
  const cuisines = ['All', 'Italian', 'Japanese', 'Mexican', 'Healthy', 'Chinese', 'American', 'Bengali'];
  const sortOptions = [
    { value: 'rating', label: 'Rating', icon: Star },
    { value: 'delivery-time', label: 'Delivery Time', icon: Clock },
    { value: 'delivery-fee', label: 'Delivery Fee', icon: DollarSign }
  ];

  return (
    <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onToggleFilters}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Filter className="h-4 w-4" />
                <span className="text-sm font-medium">Filters</span>
              </button>
              
              {/* Quick cuisine filters */}
              <div className="hidden md:flex items-center space-x-2">
                {cuisines.slice(0, 6).map((cuisine) => (
                  <button
                    key={cuisine}
                    onClick={() => onCuisineChange(cuisine)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      selectedCuisine === cuisine
                        ? 'bg-orange-100 text-orange-700 border border-orange-200'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {cuisine}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => onSortChange(e.target.value)}
                  className="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          {showFilters && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cuisine Type
                  </label>
                  <select
                    value={selectedCuisine}
                    onChange={(e) => onCuisineChange(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    {cuisines.map((cuisine) => (
                      <option key={cuisine} value={cuisine}>
                        {cuisine}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Delivery Time
                  </label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500">
                    <option value="">Any time</option>
                    <option value="30">Under 30 min</option>
                    <option value="45">Under 45 min</option>
                    <option value="60">Under 1 hour</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range
                  </label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500">
                    <option value="">Any price</option>
                    <option value="1">$ - Budget friendly</option>
                    <option value="2">$$ - Moderate</option>
                    <option value="3">$$$ - Expensive</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;