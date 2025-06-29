import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Users, 
  ShoppingBag, 
  TrendingUp, 
  Bell, 
  Search, 
  Filter, 
  Download, 
  Upload, 
  Settings, 
  Moon, 
  Sun,
  Menu,
  X,
  DollarSign,
  Package,
  Clock,
  AlertTriangle,
  CheckCircle,
  Eye,
  Edit,
  Trash2,
  Plus,
  RefreshCw
} from 'lucide-react';
import { User } from '../../types';
import AdminSidebar from './AdminSidebar';
import DashboardStats from './DashboardStats';
import RevenueChart from './RevenueChart';
import OrdersTable from './OrdersTable';
import UsersTable from './UsersTable';
import RestaurantsTable from './RestaurantsTable';
import ActivityFeed from './ActivityFeed';
import NotificationCenter from './NotificationCenter';
import SettingsPanel from './SettingsPanel';

interface AdminDashboardProps {
  user: User;
  onLogout: () => void;
}

type DashboardView = 'overview' | 'orders' | 'users' | 'restaurants' | 'analytics' | 'settings';

const AdminDashboard: React.FC<AdminDashboardProps> = ({ user, onLogout }) => {
  const [currentView, setCurrentView] = useState<DashboardView>('overview');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Mock data - in real app, this would come from API
  const [dashboardData, setDashboardData] = useState({
    stats: {
      totalRevenue: 125430,
      totalOrders: 1247,
      activeUsers: 8934,
      activeRestaurants: 156,
      revenueGrowth: 12.5,
      ordersGrowth: 8.3,
      usersGrowth: 15.2,
      restaurantsGrowth: 5.7
    },
    recentOrders: [],
    notifications: [
      { id: 1, type: 'warning', message: 'High order volume detected in Gulshan area', time: '5 min ago' },
      { id: 2, type: 'success', message: 'New restaurant "Spice Garden" approved', time: '15 min ago' },
      { id: 3, type: 'info', message: 'System maintenance scheduled for tonight', time: '1 hour ago' }
    ]
  });

  useEffect(() => {
    // Apply dark mode class to document
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleRefresh = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  const handleExport = () => {
    // Implement export functionality
    console.log('Exporting data...');
  };

  const renderHeader = () => (
    <header className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b px-6 py-4 flex items-center justify-between transition-colors`}>
      <div className="flex items-center space-x-4">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}
        >
          {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
        
        <div>
          <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Admin Dashboard
          </h1>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Welcome back, {user.name}
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {/* Search */}
        <div className="relative">
          <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`pl-10 pr-4 py-2 rounded-lg border ${
              isDarkMode 
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
            } focus:outline-none focus:ring-2 focus:ring-orange-500 w-64`}
          />
        </div>

        {/* Quick Actions */}
        <div className="flex items-center space-x-2">
          <button
            onClick={handleRefresh}
            disabled={isLoading}
            className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}
            title="Refresh"
          >
            <RefreshCw className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={handleExport}
            className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}
            title="Export Data"
          >
            <Download className="h-5 w-5" />
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors relative`}
            >
              <Bell className="h-5 w-5" />
              {dashboardData.notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {dashboardData.notifications.length}
                </span>
              )}
            </button>
            
            {showNotifications && (
              <NotificationCenter
                notifications={dashboardData.notifications}
                onClose={() => setShowNotifications(false)}
                isDarkMode={isDarkMode}
              />
            )}
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          {/* User Menu */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">
                {user.name.charAt(0)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );

  const renderMainContent = () => {
    switch (currentView) {
      case 'overview':
        return (
          <div className="space-y-6">
            <DashboardStats stats={dashboardData.stats} isDarkMode={isDarkMode} />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <RevenueChart isDarkMode={isDarkMode} />
              </div>
              <div>
                <ActivityFeed isDarkMode={isDarkMode} />
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <OrdersTable 
                isDarkMode={isDarkMode} 
                showActions={false}
                maxRows={5}
                title="Recent Orders"
              />
              <UsersTable 
                isDarkMode={isDarkMode} 
                showActions={false}
                maxRows={5}
                title="New Users"
              />
            </div>
          </div>
        );
      
      case 'orders':
        return <OrdersTable isDarkMode={isDarkMode} showActions={true} />;
      
      case 'users':
        return <UsersTable isDarkMode={isDarkMode} showActions={true} />;
      
      case 'restaurants':
        return <RestaurantsTable isDarkMode={isDarkMode} showActions={true} />;
      
      case 'analytics':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RevenueChart isDarkMode={isDarkMode} title="Revenue Analytics" />
              <RevenueChart isDarkMode={isDarkMode} title="Order Volume" />
            </div>
            <DashboardStats stats={dashboardData.stats} isDarkMode={isDarkMode} />
          </div>
        );
      
      case 'settings':
        return <SettingsPanel isDarkMode={isDarkMode} user={user} />;
      
      default:
        return <div>View not found</div>;
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors`}>
      <div className="flex">
        {/* Sidebar */}
        <AdminSidebar
          isOpen={isSidebarOpen}
          currentView={currentView}
          onViewChange={setCurrentView}
          isDarkMode={isDarkMode}
          onLogout={onLogout}
        />

        {/* Main Content */}
        <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
          {renderHeader()}
          
          <main className="p-6">
            {renderMainContent()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;