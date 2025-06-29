import React, { useState } from 'react';
import { Eye, Edit, Trash2, Filter, Download, Search, UserCheck, UserX } from 'lucide-react';

interface UsersTableProps {
  isDarkMode: boolean;
  showActions?: boolean;
  maxRows?: number;
  title?: string;
}

const UsersTable: React.FC<UsersTableProps> = ({ 
  isDarkMode, 
  showActions = true, 
  maxRows,
  title = "Users Management"
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  // Mock users data
  const users = [
    {
      id: 'USR-001',
      name: 'Ahmed Rahman',
      email: 'ahmed.rahman@email.com',
      phone: '+880 1711-123456',
      role: 'user',
      status: 'active',
      joinDate: '2024-01-15',
      totalOrders: 23,
      totalSpent: 12450
    },
    {
      id: 'USR-002',
      name: 'Fatima Khan',
      email: 'fatima.khan@email.com',
      phone: '+880 1712-234567',
      role: 'user',
      status: 'active',
      joinDate: '2024-01-18',
      totalOrders: 15,
      totalSpent: 8900
    },
    {
      id: 'USR-003',
      name: 'Mohammad Ali',
      email: 'mohammad.ali@email.com',
      phone: '+880 1713-345678',
      role: 'restaurant',
      status: 'active',
      joinDate: '2024-01-10',
      totalOrders: 0,
      totalSpent: 0
    },
    {
      id: 'USR-004',
      name: 'Rashida Begum',
      email: 'rashida.begum@email.com',
      phone: '+880 1714-456789',
      role: 'user',
      status: 'inactive',
      joinDate: '2024-01-12',
      totalOrders: 8,
      totalSpent: 4200
    },
    {
      id: 'USR-005',
      name: 'Karim Uddin',
      email: 'karim.uddin@email.com',
      phone: '+880 1715-567890',
      role: 'rider',
      status: 'active',
      joinDate: '2024-01-08',
      totalOrders: 156,
      totalSpent: 0
    }
  ];

  const getStatusColor = (status: string) => {
    const colors = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-red-100 text-red-800',
      suspended: 'bg-yellow-100 text-yellow-800'
    };
    return colors[status as keyof typeof colors] || colors.inactive;
  };

  const getRoleColor = (role: string) => {
    const colors = {
      admin: 'bg-purple-100 text-purple-800',
      user: 'bg-blue-100 text-blue-800',
      restaurant: 'bg-orange-100 text-orange-800',
      rider: 'bg-green-100 text-green-800'
    };
    return colors[role as keyof typeof colors] || colors.user;
  };

  const filteredUsers = users
    .filter(user => 
      (roleFilter === 'all' || user.role === roleFilter) &&
      (user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
       user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
       user.id.toLowerCase().includes(searchQuery.toLowerCase()))
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
                placeholder="Search users..."
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
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className={`px-4 py-2 rounded-lg border ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-orange-500`}
            >
              <option value="all">All Roles</option>
              <option value="user">Users</option>
              <option value="restaurant">Restaurants</option>
              <option value="rider">Riders</option>
              <option value="admin">Admins</option>
            </select>
          </div>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <tr>
              <th className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                User
              </th>
              <th className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                Contact
              </th>
              <th className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                Role
              </th>
              <th className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                Status
              </th>
              <th className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                Orders
              </th>
              <th className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                Join Date
              </th>
              {showActions && (
                <th className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} divide-y ${isDarkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
            {filteredUsers.map((user) => (
              <tr key={user.id} className={`${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} transition-colors`}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <span className="text-orange-600 font-semibold text-sm">
                        {user.name.charAt(0)}
                      </span>
                    </div>
                    <div className="ml-4">
                      <div className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {user.name}
                      </div>
                      <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {user.id}
                      </div>
                    </div>
                  </div>
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <div>{user.email}</div>
                  <div className="text-xs">{user.phone}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(user.role)}`}>
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(user.status)}`}>
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </span>
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <div>{user.totalOrders}</div>
                  {user.totalSpent > 0 && (
                    <div className="text-xs">৳{user.totalSpent.toLocaleString()}</div>
                  )}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {user.joinDate}
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
                      {user.status === 'active' ? (
                        <button className={`p-1 rounded hover:bg-yellow-100 text-yellow-600 transition-colors`}>
                          <UserX className="h-4 w-4" />
                        </button>
                      ) : (
                        <button className={`p-1 rounded hover:bg-green-100 text-green-600 transition-colors`}>
                          <UserCheck className="h-4 w-4" />
                        </button>
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
            Showing {filteredUsers.length} of {users.length} users
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

export default UsersTable;