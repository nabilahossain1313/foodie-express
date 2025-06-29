import React, { useState } from 'react';
import { User, Settings, ShoppingBag, LogOut, Shield } from 'lucide-react';
import { User as UserType } from '../../types';

interface UserMenuProps {
  user: UserType;
  onLogout: () => void;
  onOpenProfile: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ user, onLogout, onOpenProfile }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 text-gray-700 hover:text-orange-600 transition-colors duration-200"
      >
        <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
          <User className="h-5 w-5 text-orange-600" />
        </div>
        <span className="hidden md:block font-medium">{user.name}</span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{user.name}</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                  {user.role === 'admin' && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 mt-1">
                      <Shield className="h-3 w-3 mr-1" />
                      Admin
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="py-2">
              <button
                onClick={() => {
                  onOpenProfile();
                  setIsOpen(false);
                }}
                className="w-full flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Settings className="h-5 w-5" />
                <span>Profile Settings</span>
              </button>

              <button className="w-full flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">
                <ShoppingBag className="h-5 w-5" />
                <span>Order History</span>
              </button>

              {user.role === 'admin' && (
                <button className="w-full flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">
                  <Shield className="h-5 w-5" />
                  <span>Admin Dashboard</span>
                </button>
              )}

              <hr className="my-2" />

              <button
                onClick={() => {
                  onLogout();
                  setIsOpen(false);
                }}
                className="w-full flex items-center space-x-3 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserMenu;