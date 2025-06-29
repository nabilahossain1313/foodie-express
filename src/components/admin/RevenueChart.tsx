import React from 'react';
import { BarChart3 } from 'lucide-react';

interface RevenueChartProps {
  isDarkMode: boolean;
  title?: string;
}

const RevenueChart: React.FC<RevenueChartProps> = ({ isDarkMode, title = "Revenue Overview" }) => {
  // Mock data for the chart
  const chartData = [
    { month: 'Jan', revenue: 45000, orders: 320 },
    { month: 'Feb', revenue: 52000, orders: 380 },
    { month: 'Mar', revenue: 48000, orders: 350 },
    { month: 'Apr', revenue: 61000, orders: 420 },
    { month: 'May', revenue: 55000, orders: 390 },
    { month: 'Jun', revenue: 67000, orders: 480 },
    { month: 'Jul', revenue: 72000, orders: 520 },
    { month: 'Aug', revenue: 69000, orders: 495 },
    { month: 'Sep', revenue: 78000, orders: 560 },
    { month: 'Oct', revenue: 82000, orders: 590 },
    { month: 'Nov', revenue: 89000, orders: 640 },
    { month: 'Dec', revenue: 95000, orders: 680 }
  ];

  const maxRevenue = Math.max(...chartData.map(d => d.revenue));

  return (
    <div className={`${
      isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    } border rounded-lg p-6 transition-colors`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-orange-100 rounded-lg">
            <BarChart3 className="h-5 w-5 text-orange-600" />
          </div>
          <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {title}
          </h3>
        </div>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
            <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Revenue</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Orders</span>
          </div>
        </div>
      </div>

      <div className="h-64 flex items-end justify-between space-x-2">
        {chartData.map((data, index) => {
          const revenueHeight = (data.revenue / maxRevenue) * 100;
          const ordersHeight = (data.orders / 700) * 100; // Normalize orders to chart height
          
          return (
            <div key={index} className="flex-1 flex flex-col items-center space-y-2">
              <div className="w-full flex items-end justify-center space-x-1 h-48">
                <div
                  className="bg-orange-500 rounded-t transition-all duration-300 hover:bg-orange-600 w-1/2"
                  style={{ height: `${revenueHeight}%` }}
                  title={`Revenue: ৳${data.revenue.toLocaleString()}`}
                />
                <div
                  className="bg-blue-500 rounded-t transition-all duration-300 hover:bg-blue-600 w-1/2"
                  style={{ height: `${ordersHeight}%` }}
                  title={`Orders: ${data.orders}`}
                />
              </div>
              <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {data.month}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4 text-center">
        <div>
          <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            ৳{chartData[chartData.length - 1].revenue.toLocaleString()}
          </p>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            This Month
          </p>
        </div>
        <div>
          <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {chartData[chartData.length - 1].orders}
          </p>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Orders
          </p>
        </div>
        <div>
          <p className={`text-2xl font-bold text-green-600`}>
            +12.5%
          </p>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Growth
          </p>
        </div>
      </div>
    </div>
  );
};

export default RevenueChart;