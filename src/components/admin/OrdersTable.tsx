import React, { useState } from 'react';
import { Eye, Edit, Trash2, Filter, Download, Search, MoreHorizontal } from 'lucide-react';

interface OrdersTableProps {
  isDarkMode: boolean;
  showActions?: boolean;
  maxRows?: number;
  title?: string;
}

const OrdersTable: React.FC<OrdersTableProps> = ({ 
  isDarkMode, 
  showActions = true, 
  maxRows,
  title = "Orders Management"
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  // Mock orders data
  const orders = [
    {
      id: 'ORD-001',
      customer: 'Ahmed Rahman',
      restaurant: 'Kacchi Bhai',
      items: 'Mutton Biryani, Borhani',
      amount: 450,
      status: 'delivered',
      date: '2024-01-20 14:30',
      paymentMethod: 'bKash'
    },
    {
      id: 'ORD-002',
      customer: 'Fatima Khan',
      restaurant: 'Star Kabab',
      items: 'Seekh Kebab, Naan',
      amount: 320,
      status: 'preparing',
      date: '2024-01-20 15:15',
      paymentMethod: 'Cash'
    },
    {
      id: 'ORD-003',
      customer: 'Mohammad Ali',
      restaurant: 'Pizza Hut',
      items: 'Chicken Supreme Pizza',
      amount: 890,
      status: 'confirmed',
      date: '2024-01-20 15:45',
      paymentMethod: 'Card'
    },
    {
      id: 'ORD-004',
      customer: 'Rashida Begum',
      restaurant: 'Thai Garden',
      items: 'Pad Thai, Green Curry',
      amount: 680,
      status: 'cancelled',
      date: '2024-01-20 16:20',
      paymentMethod: 'Nagad'
    },
    {
      id: 'ORD-005',
      customer: 'Karim Uddin',
      restaurant: 'Chillox',
      items: 'Beef Burger, Fries',
      amount: 420,
      status: 'delivered',
      date: '2024-01-20 17:00',
      paymentMethod: 'Rocket'
    }
  ];

  const getStatusColor = (status: string) => {
    const colors = {
      delivered: 'bg-green-100 text-green-800',
      preparing: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      cancelled: 'bg-red-100 text-red-800',
      pending: 'bg-gray-100 text-gray-800'
    };
    return colors[status as keyof typeof colors] || colors.pending;
  };

  const filteredOrders = orders
    .filter(order => 
      (statusFilter === 'all' || order.status === statusFilter) &&
      (order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
       order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
       order.restaurant.toLowerCase().includes(searchQuery.toLowerCase()))
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
                placeholder="Search orders..."
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
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="preparing">Preparing</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <tr>
              <th className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                Order ID
              </th>
              <th className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                Customer
              </th>
              <th className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                Restaurant
              </th>
              <th className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                Amount
              </th>
              <th className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                Status
              </th>
              <th className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                Date
              </th>
              {showActions && (
                <th className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} divide-y ${isDarkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
            {filteredOrders.map((order) => (
              <tr key={order.id} className={`${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} transition-colors`}>
                <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {order.id}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {order.customer}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {order.restaurant}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  ৳{order.amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {order.date}
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
                      <button className={`p-1 rounded hover:bg-red-100 text-red-600 transition-colors`}>
                        <Trash2 className="h-4 w-4" />
                      </button>
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
            Showing {filteredOrders.length} of {orders.length} orders
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

export default OrdersTable;