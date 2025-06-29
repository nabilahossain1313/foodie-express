import React from 'react';
import { DollarSign, ShoppingBag, Users, Store, TrendingUp, TrendingDown } from 'lucide-react';

interface DashboardStatsProps {
  stats: {
    totalRevenue: number;
    totalOrders: number;
    activeUsers: number;
    activeRestaurants: number;
    revenueGrowth: number;
    ordersGrowth: number;
    usersGrowth: number;
    restaurantsGrowth: number;
  };
  isDarkMode: boolean;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ stats, isDarkMode }) => {
  const statCards = [
    {
      title: 'Total Revenue',
      value: `৳${stats.totalRevenue.toLocaleString()}`,
      growth: stats.revenueGrowth,
      icon: DollarSign,
      color: 'green'
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders.toLocaleString(),
      growth: stats.ordersGrowth,
      icon: ShoppingBag,
      color: 'blue'
    },
    {
      title: 'Active Users',
      value: stats.activeUsers.toLocaleString(),
      growth: stats.usersGrowth,
      icon: Users,
      color: 'purple'
    },
    {
      title: 'Active Restaurants',
      value: stats.activeRestaurants.toLocaleString(),
      growth: stats.restaurantsGrowth,
      icon: Store,
      color: 'orange'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      green: 'bg-green-100 text-green-600',
      blue: 'bg-blue-100 text-blue-600',
      purple: 'bg-purple-100 text-purple-600',
      orange: 'bg-orange-100 text-orange-600'
    };
    return colors[color as keyof typeof colors] || colors.green;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        const isPositiveGrowth = stat.growth > 0;
        
        return (
          <div
            key={index}
            className={`${
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            } border rounded-lg p-6 transition-colors hover:shadow-lg`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${getColorClasses(stat.color)}`}>
                <Icon className="h-6 w-6" />
              </div>
              <div className={`flex items-center space-x-1 text-sm ${
                isPositiveGrowth ? 'text-green-600' : 'text-red-600'
              }`}>
                {isPositiveGrowth ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
                <span>{Math.abs(stat.growth)}%</span>
              </div>
            </div>
            
            <div>
              <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-1`}>
                {stat.value}
              </h3>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {stat.title}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardStats;