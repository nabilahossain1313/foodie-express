import React, { useState } from 'react';
import { Eye, Edit, Trash2, Filter, Download, Search, CheckCircle, XCircle, Star } from 'lucide-react';

interface RestaurantsTableProps {
  isDarkMode: boolean;
  showActions?: boolean;
  maxRows?: number;
  title?: string;
}

const RestaurantsTable: React.FC<RestaurantsTableProps> = ({ 
  isDarkMode, 
  showActions = true, 
  maxRows,
  title = "Restaurants Management"
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock restaurants data
  const restaurants = [
    {
      id: 'REST-001',
      name: 'Kacchi Bhai',
      cuisine: 'Bengali',
      owner: 'Chef Abdul Rahman',
      phone: '+880 1711-123456',
      address: 'Dhanmondi, Dhaka',
      status: 'active',
      rating: 4.8,
      totalOrders: 1247,
      revenue: 125430,
      joinDate: '2023-06-15'
    },
    {
      id: 'REST-002',
      name: 'Star Kabab',
      cuisine: 'Mughlai',
      owner: 'Haji Mohammad Ali',
      phone: '+880 1712-234567',
      address: 'Purana Paltan, Dhaka',
      status: 'active',
      rating: 4.6,
      totalOrders: 892,
      revenue: 89200,
      joinDate: '2023-08-20'
    },
    {
      id: 'REST-003',
      name: 'Pizza Hut',
      cuisine: 'Italian',
      owner: 'Pizza Hut BD',
      phone: '+880 1715-567890',
      address: 'Gulshan, Dhaka',
      status: 'active',
      rating: 4.3,
      totalOrders: 2156,
      revenue: 215600,
      joinDate: '2023-03-10'
    },
    {
      id: 'REST-004',
      name: 'Thai Garden',
      cuisine: 'Thai',
      owner: 'Chef Somchai',
      phone: '+880 1718-890123',
      address: 'Dhanmondi, Dhaka',
      status: 'pending',
      rating: 0,
      totalOrders: 0,
      revenue: 0,
      joinDate: '2024-01-20'
    },
    {
      id: 'REST-005',
      name: 'Spice Corner',
      cuisine: 'Indian',
      owner: 'Chef Rajesh',
      phone: '+880 1719-901234',
      address: 'Banani, Dhaka',
      status: 'suspended',
      rating: 3.8,
      totalOrders: 234,
      revenue: 23400,
      joinDate: '2023-11-05'
    }
  ];

  const getStatusColor = (status: string) => {
    const colors = {
      active: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      suspended: 'bg-red-100 text-red-800',
      inactive: 'bg-gray-100 text-gray-800'
    };
    return colors[status as keyof typeof colors] || colors.inactive;
  };

  const filteredRestaurants = restaurants
    .filter(restaurant => 
      (statusFilter === 'all' || restaurant.status === statusFilter) &&
      (restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
       restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase()) ||
       restaurant.owner.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .slice(0, maxRows);

  return (
    <div className={`${
      isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    } border rounded-lg transition-colors`}>
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {title}
          </h3>
          {showActions && (
            <div className="flex items-center space-x-2">
              <button className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}>
                <Download className="h-4 w-4" />
              </button>
              <button className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}>
                <Filter className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        {showActions && (
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-md">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              <input
                type="text"
                placeholder="Search restaurants..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`pl-10 pr-4 py-2 rounded-lg border w-full ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                } focus:outline-none focus:ring-2 focus:ring-orange-500`}
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className={`px-4 py-2 rounded-lg border ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-orange-500`}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="suspended">Suspended</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <tr>
              <th className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                Restaurant
              </th>
              <th className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                Owner
              </th>
              <th className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                Cuisine
              </th>
              <th className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                Rating
              </th>
              <th className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                Orders
              </th>
              <th className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                Status
              </th>
              {showActions && (
                <th className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} divide-y ${isDarkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
            {filteredRestaurants.map((restaurant) => (
              <tr key={restaurant.id} className={`${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} transition-colors`}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <span className="text-orange-600 font-semibold text-sm">
                        {restaurant.name.charAt(0)}
                      </span>
                    </div>
                    <div className="ml-4">
                      <div className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {restaurant.name}
                      </div>
                      <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {restaurant.address}
                      </div>
                    </div>
                  </div>
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <div>{restaurant.owner}</div>
                  <div className="text-xs">{restaurant.phone}</div>
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {restaurant.cuisine}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {restaurant.rating > 0 ? (
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {restaurant.rating}
                      </span>
                    </div>
                  ) : (
                    <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      No ratings
                    </span>
                  )}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <div>{restaurant.totalOrders}</div>
                  {restaurant.revenue > 0 && (
                    <div className="text-xs">৳{restaurant.revenue.toLocaleString()}</div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(restaurant.status)}`}>
                    {restaurant.status.charAt(0).toUpperCase() + restaurant.status.slice(1)}
                  </span>
                </td>
                {showActions && (
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center space-x-2">
                      <button className={`p-1 rounded ${isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-100'} transition-colors`}>
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className={`p-1 rounded ${isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-100'} transition-colors`}>
                        <Edit className="h-4 w-4" />
                      </button>
                      {restaurant.status === 'pending' && (
                        <>
                          <button className={`p-1 rounded hover:bg-green-100 text-green-600 transition-colors`}>
                            <CheckCircle className="h-4 w-4" />
                          </button>
                          <button className={`p-1 rounded hover:bg-red-100 text-red-600 transition-colors`}>
                            <XCircle className="h-4 w-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showActions && (
        <div className={`px-6 py-4 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} flex items-center justify-between`}>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Showing {filteredRestaurants.length} of {restaurants.length} restaurants
          </p>
          <div className="flex items-center space-x-2">
            <button className={`px-3 py-1 rounded ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}>
              Previous
            </button>
            <button className={`px-3 py-1 rounded ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}>
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantsTable;