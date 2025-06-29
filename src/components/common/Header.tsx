import React, { useState } from 'react';
import { ShoppingCart, Search, MapPin, Menu, X } from 'lucide-react';
import { User } from '../../types';
import UserMenu from '../auth/UserMenu';

interface HeaderProps {
  user: User | null;
  cartItemCount: number;
  onCartClick: () => void;
  onLocationClick: () => void;
  onAuthClick: () => void;
  onLogout: () => void;
  onOpenProfile: () => void;
  currentLocation: string;
}

const Header: React.FC<HeaderProps> = ({
  user,
  cartItemCount,
  onCartClick,
  onLocationClick,
  onAuthClick,
  onLogout,
  onOpenProfile,
  currentLocation
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                FoodieExpress
              </h1>
            </div>
          </div>

          {/* Location - Desktop */}
          <div className="hidden md:flex items-center space-x-2">
            <button
              onClick={onLocationClick}
              className="flex items-center space-x-2 text-gray-700 hover:text-orange-600 transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-orange-50"
            >
              <MapPin className="h-5 w-5" />
              <span className="text-sm font-medium">{currentLocation}</span>
            </button>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search restaurants, cuisines..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>

          {/* Actions - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={onCartClick}
              className="relative p-2 text-gray-700 hover:text-orange-600 transition-colors duration-200 hover:bg-orange-50 rounded-lg"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {cartItemCount}
                </span>
              )}
            </button>

            {user ? (
              <UserMenu
                user={user}
                onLogout={onLogout}
                onOpenProfile={onOpenProfile}
              />
            ) : (
              <button
                onClick={onAuthClick}
                className="bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-700 transition-colors duration-200"
              >
                Sign In
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={onCartClick}
              className="relative p-2 text-gray-700 hover:text-orange-600 transition-colors duration-200"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
            
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-700 hover:text-orange-600 transition-colors duration-200"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="space-y-4">
              {/* Search - Mobile */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search restaurants, cuisines..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              {/* Location - Mobile */}
              <button
                onClick={onLocationClick}
                className="flex items-center space-x-2 text-gray-700 hover:text-orange-600 transition-colors duration-200 w-full text-left"
              >
                <MapPin className="h-5 w-5" />
                <span className="text-sm font-medium">{currentLocation}</span>
              </button>

              {/* Auth - Mobile */}
              {user ? (
                <div className="space-y-2">
                  <div className="flex items-center space-x-3 py-2">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                      <span className="text-orange-600 font-semibold text-sm">
                        {user.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      onOpenProfile();
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-2 py-2 text-gray-700 hover:text-orange-600 transition-colors"
                  >
                    Profile Settings
                  </button>
                  <button
                    onClick={() => {
                      onLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-2 py-2 text-red-600 hover:text-red-700 transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    onAuthClick();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-700 transition-colors duration-200"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;