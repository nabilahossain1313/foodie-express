import React from 'react';
import { Clock, ShoppingBag, Users, Store, DollarSign } from 'lucide-react';

interface ActivityFeedProps {
  isDarkMode: boolean;
}

const ActivityFeed: React.FC<ActivityFeedProps> = ({ isDarkMode }) => {
  const activities = [
    {
      id: 1,
      type: 'order',
      message: 'New order #ORD-1247 from Ahmed Rahman',
      time: '2 minutes ago',
      icon: ShoppingBag,
      color: 'text-blue-600'
    },
    {
      id: 2,
      type: 'user',
      message: 'New user registration: Fatima Khan',
      time: '5 minutes ago',
      icon: Users,
      color: 'text-green-600'
    },
    {
      id: 3,
      type: 'restaurant',
      message: 'Restaurant "Spice Garden" submitted for approval',
      time: '15 minutes ago',
      icon: Store,
      color: 'text-orange-600'
    },
    {
      id: 4,
      type: 'payment',
      message: 'Payment of ৳450 received for order #ORD-1245',
      time: '20 minutes ago',
      icon: DollarSign,
      color: 'text-purple-600'
    },
    {
      id: 5,
      type: 'order',
      message: 'Order #ORD-1243 delivered successfully',
      time: '25 minutes ago',
      icon: ShoppingBag,
      color: 'text-blue-600'
    },
    {
      id: 6,
      type: 'user',
      message: 'User Mohammad Ali updated profile',
      time: '30 minutes ago',
      icon: Users,
      color: 'text-green-600'
    },
    {
      id: 7,
      type: 'restaurant',
      message: 'Kacchi Bhai updated menu items',
      time: '45 minutes ago',
      icon: Store,
      color: 'text-orange-600'
    },
    {
      id: 8,
      type: 'payment',
      message: 'Refund processed for order #ORD-1240',
      time: '1 hour ago',
      icon: DollarSign,
      color: 'text-purple-600'
    }
  ];

  return (
    <div className={`${
      isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    } border rounded-lg transition-colors`}>
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Clock className="h-5 w-5 text-blue-600" />
          </div>
          <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Recent Activity
          </h3>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {activities.map((activity) => {
            const Icon = activity.icon;
            return (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                } transition-colors`}>
                  <Icon className={`h-4 w-4 ${activity.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {activity.message}
                  </p>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mt-1`}>
                    {activity.time}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className={`px-6 py-4 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <button className={`text-sm ${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} font-medium transition-colors`}>
          View all activity
        </button>
      </div>
    </div>
  );
};

export default ActivityFeed;