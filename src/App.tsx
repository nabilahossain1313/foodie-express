import React, { useState, useMemo } from 'react';
import Header from './components/common/Header';
import RestaurantCard from './components/restaurant/RestaurantCard';
import RestaurantProfileDetail from './components/restaurant/RestaurantProfileDetail';
import MenuItemCard from './components/menu/MenuItemCard';
import CartSidebar from './components/cart/CartSidebar';
import OrderTracking from './components/tracking/OrderTracking';
import FilterBar from './components/filters/FilterBar';
import UserProfileSetup from './components/profile/UserProfileSetup';
import CalorieTracker from './components/nutrition/CalorieTracker';
import AdvancedAIAssistant from './components/ai/AdvancedAIAssistant';
import AuthModal from './components/auth/AuthModal';
import RestaurantMap from './components/map/RestaurantMap';
import PaymentModal from './components/payment/PaymentModal';
import CookbookDashboard from './components/cookbook/CookbookDashboard';
import AdminDashboard from './components/admin/AdminDashboard';
import { useCart } from './hooks/useCart';
import { useAuth } from './hooks/useAuth';
import { useUserProfile } from './hooks/useUserProfile';
import { mockRestaurants, mockMenuItems, restaurantProfiles } from './data/mockData';
import { getRestaurantProfileById, DetailedMenuItem } from './data/restaurantProfiles';
import { Restaurant, MenuItem, Order, MapLocation } from './types';
import { MessageCircle, User, Target, Map, List, Book, Shield } from 'lucide-react';

type View = 'restaurants' | 'menu' | 'tracking' | 'map' | 'cookbook' | 'restaurant-detail' | 'admin';

function App() {
  const [currentView, setCurrentView] = useState<View>('restaurants');
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [selectedRestaurantProfile, setSelectedRestaurantProfile] = useState<any>(null);
  const [currentLocation, setCurrentLocation] = useState('Dhaka, Bangladesh');
  const [userLocation, setUserLocation] = useState<MapLocation>({ lat: 23.8103, lng: 90.4125 });
  const [selectedCuisine, setSelectedCuisine] = useState('All');
  const [sortBy, setSortBy] = useState('rating');
  const [showFilters, setShowFilters] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [showProfileSetup, setShowProfileSetup] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [currentMenuItem, setCurrentMenuItem] = useState<MenuItem | null>(null);
  
  const cart = useCart();
  const auth = useAuth();
  const { userProfile, calorieRecommendations, saveProfile, hasProfile } = useUserProfile();

  // Mock order for tracking demo
  const mockOrder: Order = {
    id: 'ORD-2024-001',
    restaurant: mockRestaurants[0],
    items: [],
    status: 'preparing',
    totalAmount: 456.70,
    deliveryAddress: 'House 123, Road 5, Dhanmondi, Dhaka 1205',
    estimatedDeliveryTime: '25-30 minutes',
    createdAt: new Date().toISOString(),
    paymentMethod: {
      id: 'bkash-001',
      type: 'bkash',
      verified: true
    },
    trackingInfo: {
      orderPlaced: '2:15 PM',
      confirmed: '2:17 PM',
      preparing: '2:20 PM'
    },
    rider: {
      name: 'Karim Rahman',
      phone: '+880 1712-345678',
      rating: 4.8,
      location: { lat: 23.8103, lng: 90.4125 }
    }
  };

  const filteredAndSortedRestaurants = useMemo(() => {
    let filtered = mockRestaurants;
    
    if (selectedCuisine !== 'All') {
      filtered = filtered.filter(restaurant => restaurant.cuisine === selectedCuisine);
    }
    
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'delivery-time':
          return parseInt(a.deliveryTime) - parseInt(b.deliveryTime);
        case 'delivery-fee':
          return a.deliveryFee - b.deliveryFee;
        default:
          return 0;
      }
    });
  }, [selectedCuisine, sortBy]);

  const handleRestaurantClick = (restaurant: Restaurant) => {
    // Check if this restaurant has a detailed profile
    const profile = getRestaurantProfileById(restaurant.id);
    if (profile) {
      setSelectedRestaurantProfile(profile);
      setCurrentView('restaurant-detail');
    } else {
      setSelectedRestaurant(restaurant);
      setCurrentView('menu');
    }
  };

  const handleAddToCart = (item: MenuItem | DetailedMenuItem, quantity: number, instructions?: string) => {
    // Convert DetailedMenuItem to MenuItem if needed
    const menuItem: MenuItem = 'nutritionalInfo' in item ? {
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price / 100, // Convert from paisa to taka
      image: item.photos?.[0] || 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Main',
      isVegetarian: item.dietaryIcons?.includes('🥕') || false,
      isSpicy: item.spiceLevel === 'hot' || item.spiceLevel === 'extra-hot',
      isPopular: item.popularity === 'popular' || item.popularity === 'signature',
      allergens: item.allergens,
      nutritionInfo: item.nutritionalInfo,
      preparationTime: parseInt(item.preparationTime?.split('-')[0]) || 30,
      availability: true
    } : item;

    cart.addToCart(menuItem, quantity, instructions);
  };

  const handleCheckout = () => {
    if (!auth.isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = (transactionId: string) => {
    setShowPaymentModal(false);
    setCurrentOrder(mockOrder);
    setCurrentView('tracking');
    cart.clearCart();
  };

  const handlePaymentError = (error: string) => {
    console.error('Payment failed:', error);
    // Handle payment error (show notification, etc.)
  };

  const handleLocationClick = () => {
    // In a real app, this would open a location picker
    alert('Location picker would open here');
  };

  const handleMenuItemClick = (item: MenuItem | DetailedMenuItem) => {
    const menuItem: MenuItem = 'nutritionalInfo' in item ? {
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price / 100,
      image: item.photos?.[0] || 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Main',
      isVegetarian: item.dietaryIcons?.includes('🥕') || false,
      isSpicy: item.spiceLevel === 'hot' || item.spiceLevel === 'extra-hot',
      isPopular: item.popularity === 'popular' || item.popularity === 'signature',
      allergens: item.allergens,
      nutritionInfo: item.nutritionalInfo,
      preparationTime: parseInt(item.preparationTime?.split('-')[0]) || 30,
      availability: true
    } : item;

    setCurrentMenuItem(menuItem);
    setShowAIAssistant(true);
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    auth.clearError();
  };

  // Admin Dashboard View
  if (currentView === 'admin' && auth.user?.role === 'admin') {
    return (
      <AdminDashboard
        user={auth.user}
        onLogout={() => {
          auth.logout();
          setCurrentView('restaurants');
        }}
      />
    );
  }

  // Render cookbook view
  if (currentView === 'cookbook') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header
          user={auth.user}
          cartItemCount={cart.getTotalItems()}
          onCartClick={() => cart.setIsOpen(true)}
          onLocationClick={handleLocationClick}
          onAuthClick={() => setShowAuthModal(true)}
          onLogout={auth.logout}
          onOpenProfile={() => setShowProfileSetup(true)}
          currentLocation={currentLocation}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4 mb-6">
            <button
              onClick={() => setCurrentView('restaurants')}
              className="flex items-center space-x-2 px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <List className="h-4 w-4" />
              <span>Restaurants</span>
            </button>
            <button
              onClick={() => setCurrentView('cookbook')}
              className="flex items-center space-x-2 px-4 py-2 bg-orange-600 text-white rounded-lg"
            >
              <Book className="h-4 w-4" />
              <span>Cookbook</span>
            </button>
            {auth.user?.role === 'admin' && (
              <button
                onClick={() => setCurrentView('admin')}
                className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Shield className="h-4 w-4" />
                <span>Admin</span>
              </button>
            )}
          </div>
        </div>

        <CookbookDashboard />

        {/* Modals */}
        <CartSidebar
          isOpen={cart.isOpen}
          onClose={() => cart.setIsOpen(false)}
          cartItems={cart.cartItems}
          onUpdateQuantity={cart.updateQuantity}
          onRemoveItem={cart.removeFromCart}
          totalPrice={cart.getTotalPrice()}
          onCheckout={handleCheckout}
        />

        {showAuthModal && (
          <AuthModal
            isOpen={showAuthModal}
            onClose={() => {
              setShowAuthModal(false);
              auth.clearError();
            }}
            onLogin={auth.login}
            onSignup={auth.signup}
            isLoading={auth.isLoading}
            error={auth.error}
          />
        )}

        {showProfileSetup && (
          <UserProfileSetup
            onSave={(profile) => {
              saveProfile(profile);
              setShowProfileSetup(false);
            }}
            onClose={() => setShowProfileSetup(false)}
            existingProfile={userProfile || undefined}
          />
        )}

        <AdvancedAIAssistant
          user={auth.user || undefined}
          userProfile={userProfile || undefined}
          currentMenuItem={currentMenuItem || undefined}
          isOpen={showAIAssistant}
          onClose={() => {
            setShowAIAssistant(false);
            setCurrentMenuItem(null);
          }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        user={auth.user}
        cartItemCount={cart.getTotalItems()}
        onCartClick={() => cart.setIsOpen(true)}
        onLocationClick={handleLocationClick}
        onAuthClick={() => setShowAuthModal(true)}
        onLogout={auth.logout}
        onOpenProfile={() => setShowProfileSetup(true)}
        currentLocation={currentLocation}
      />

      {currentView !== 'tracking' && currentView !== 'restaurant-detail' && (
        <FilterBar
          selectedCuisine={selectedCuisine}
          onCuisineChange={setSelectedCuisine}
          sortBy={sortBy}
          onSortChange={setSortBy}
          showFilters={showFilters}
          onToggleFilters={() => setShowFilters(!showFilters)}
        />
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {currentView === 'restaurants' && (
              <div>
                {/* Hero Section */}
                <div className="mb-8">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    🇧🇩 Discover delicious food in Bangladesh
                  </h1>
                  <p className="text-gray-600">
                    Order from your favorite restaurants and get fresh food delivered to your door across Dhaka
                  </p>
                  {auth.user && (
                    <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-red-50 rounded-lg border border-green-200">
                      <p className="text-green-800">
                        আসসালামু আলাইকুম, <span className="font-semibold">{auth.user.name}</span>! 
                        {auth.user.role === 'admin' && (
                          <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                            Admin
                          </span>
                        )}
                      </p>
                    </div>
                  )}
                </div>

                {/* View Toggle */}
                <div className="mb-6 flex items-center space-x-4">
                  <button
                    onClick={() => setCurrentView('restaurants')}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                      currentView === 'restaurants' 
                        ? 'bg-orange-600 text-white' 
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <List className="h-4 w-4" />
                    <span>List View</span>
                  </button>
                  <button
                    onClick={() => setCurrentView('map')}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                      currentView === 'map' 
                        ? 'bg-orange-600 text-white' 
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Map className="h-4 w-4" />
                    <span>Map View</span>
                  </button>
                  <button
                    onClick={() => setCurrentView('cookbook')}
                    className="flex items-center space-x-2 px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Book className="h-4 w-4" />
                    <span>Cookbook</span>
                  </button>
                  {auth.user?.role === 'admin' && (
                    <button
                      onClick={() => setCurrentView('admin')}
                      className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      <Shield className="h-4 w-4" />
                      <span>Admin</span>
                    </button>
                  )}
                </div>

                {/* Featured Categories */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Popular Cuisines in Bangladesh</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                    {['Bengali', 'Mughlai', 'Italian', 'Japanese', 'Thai', 'Chinese', 'Continental'].map((cuisine) => (
                      <button
                        key={cuisine}
                        onClick={() => setSelectedCuisine(cuisine)}
                        className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow text-center group"
                      >
                        <div className="w-12 h-12 bg-gradient-to-r from-green-100 to-red-100 rounded-full mx-auto mb-2 flex items-center justify-center group-hover:from-green-200 group-hover:to-red-200 transition-colors">
                          <span className="text-green-600 font-semibold">
                            {cuisine === 'Bengali' ? '🍛' : cuisine.charAt(0)}
                          </span>
                        </div>
                        <p className="text-sm font-medium text-gray-900">{cuisine}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Restaurant Grid */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">
                      {selectedCuisine === 'All' ? 'All Restaurants' : `${selectedCuisine} Restaurants`}
                    </h2>
                    <p className="text-gray-600">{filteredAndSortedRestaurants.length} restaurants found</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredAndSortedRestaurants.map((restaurant) => (
                      <RestaurantCard
                        key={restaurant.id}
                        restaurant={restaurant}
                        onClick={handleRestaurantClick}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {currentView === 'map' && (
              <div>
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">Restaurant Map</h2>
                  <p className="text-gray-600">Find restaurants near you on the map</p>
                </div>
                
                <RestaurantMap
                  restaurants={filteredAndSortedRestaurants}
                  userLocation={userLocation}
                  onRestaurantSelect={handleRestaurantClick}
                  className="h-[600px] rounded-lg shadow-sm border border-gray-200"
                />
              </div>
            )}

            {currentView === 'restaurant-detail' && selectedRestaurantProfile && (
              <div>
                <button
                  onClick={() => setCurrentView('restaurants')}
                  className="text-orange-600 hover:text-orange-700 mb-4 inline-flex items-center font-medium"
                >
                  ← Back to restaurants
                </button>
                
                <RestaurantProfileDetail
                  restaurant={selectedRestaurantProfile}
                  onMenuItemClick={handleMenuItemClick}
                  onAddToCart={handleAddToCart}
                />
              </div>
            )}

            {currentView === 'menu' && selectedRestaurant && (
              <div>
                {/* Restaurant Header */}
                <div className="mb-8">
                  <button
                    onClick={() => setCurrentView('restaurants')}
                    className="text-orange-600 hover:text-orange-700 mb-4 inline-flex items-center font-medium"
                  >
                    ← Back to restaurants
                  </button>
                  
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="relative h-48 md:h-64">
                      <img
                        src={selectedRestaurant.image}
                        alt={selectedRestaurant.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40" />
                      <div className="absolute bottom-4 left-4 text-white">
                        <h1 className="text-2xl md:text-3xl font-bold">{selectedRestaurant.name}</h1>
                        <p className="text-gray-200">{selectedRestaurant.description}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className="bg-green-600 px-2 py-1 rounded text-sm">
                            {selectedRestaurant.priceRange}
                          </span>
                          <span className="bg-blue-600 px-2 py-1 rounded text-sm">
                            {selectedRestaurant.zone.replace('-', ' ').toUpperCase()}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        <div>
                          <p className="text-2xl font-bold text-gray-900">{selectedRestaurant.rating}</p>
                          <p className="text-sm text-gray-600">Rating</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-gray-900">{selectedRestaurant.deliveryTime}</p>
                          <p className="text-sm text-gray-600">Delivery</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-gray-900">৳{selectedRestaurant.deliveryFee}</p>
                          <p className="text-sm text-gray-600">Delivery Fee</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-gray-900">৳{selectedRestaurant.minimumOrder}</p>
                          <p className="text-sm text-gray-600">Minimum</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Menu</h2>
                  <div className="space-y-4">
                    {mockMenuItems[selectedRestaurant.id]?.map((item) => (
                      <div key={item.id} className="relative">
                        <MenuItemCard
                          item={item}
                          onAddToCart={handleAddToCart}
                        />
                        <button
                          onClick={() => handleMenuItemClick(item)}
                          className="absolute top-4 right-4 bg-gradient-to-r from-green-600 to-red-500 text-white p-2 rounded-full hover:from-green-700 hover:to-red-600 transition-colors shadow-lg"
                          title="Ask AI about this item"
                        >
                          <MessageCircle className="h-4 w-4" />
                        </button>
                      </div>
                    )) || (
                      <p className="text-gray-600 text-center py-8">
                        Menu items are being loaded...
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {currentView === 'tracking' && currentOrder && (
              <div>
                <div className="mb-6">
                  <button
                    onClick={() => setCurrentView('restaurants')}
                    className="text-orange-600 hover:text-orange-700 mb-4 inline-flex items-center font-medium"
                  >
                    ← Back to restaurants
                  </button>
                  <h1 className="text-2xl font-bold text-gray-900">Order Tracking</h1>
                </div>
                <OrderTracking order={currentOrder} />
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Setup Prompt */}
            {auth.isAuthenticated && !hasProfile && (
              <div className="bg-gradient-to-r from-green-500 to-red-500 rounded-lg p-6 text-white">
                <div className="flex items-center space-x-3 mb-4">
                  <User className="h-6 w-6" />
                  <h3 className="text-lg font-semibold">Set Up Your Profile</h3>
                </div>
                <p className="text-sm mb-4 text-green-100">
                  Get personalized calorie recommendations and nutrition advice based on your goals!
                </p>
                <button
                  onClick={() => setShowProfileSetup(true)}
                  className="w-full bg-white text-green-600 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Get Started
                </button>
              </div>
            )}

            {/* Calorie Tracker */}
            {auth.isAuthenticated && hasProfile && userProfile && (
              <CalorieTracker
                userProfile={userProfile}
                cartItems={cart.cartItems}
                onOpenProfile={() => setShowProfileSetup(true)}
              />
            )}

            {/* AI Assistant Button */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-red-500 rounded-full flex items-center justify-center">
                  <MessageCircle className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">🇧🇩 Enhanced AI Assistant</h3>
                  <p className="text-sm text-gray-600">Advanced AI for Bangladesh</p>
                </div>
              </div>
              <button
                onClick={() => setShowAIAssistant(true)}
                className="w-full bg-gradient-to-r from-green-600 to-red-500 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-red-600 transition-colors"
              >
                Ask AI Anything
              </button>
            </div>

            {/* Quick Stats */}
            {auth.isAuthenticated && hasProfile && userProfile && calorieRecommendations && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                  <Target className="h-5 w-5 text-orange-600" />
                  <span>Your Goals</span>
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Daily Calories</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {calorieRecommendations.dailyCalories}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Goal</span>
                    <span className="text-sm font-semibold text-gray-900 capitalize">
                      {userProfile.goal.replace('-', ' ')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Activity Level</span>
                    <span className="text-sm font-semibold text-gray-900 capitalize">
                      {userProfile.activityLevel.replace('-', ' ')}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Sign In Prompt for Non-Authenticated Users */}
            {!auth.isAuthenticated && (
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg p-6 text-white">
                <div className="flex items-center space-x-3 mb-4">
                  <User className="h-6 w-6" />
                  <h3 className="text-lg font-semibold">Join FoodieExpress</h3>
                </div>
                <p className="text-sm mb-4 text-blue-100">
                  Sign up to track your nutrition, get personalized recommendations, and save your favorite orders!
                </p>
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="w-full bg-white text-blue-600 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Sign Up Now
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Modals */}
      <CartSidebar
        isOpen={cart.isOpen}
        onClose={() => cart.setIsOpen(false)}
        cartItems={cart.cartItems}
        onUpdateQuantity={cart.updateQuantity}
        onRemoveItem={cart.removeFromCart}
        totalPrice={cart.getTotalPrice()}
        onCheckout={handleCheckout}
      />

      {showAuthModal && (
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => {
            setShowAuthModal(false);
            auth.clearError();
          }}
          onLogin={auth.login}
          onSignup={auth.signup}
          isLoading={auth.isLoading}
          error={auth.error}
        />
      )}

      {showPaymentModal && auth.user && (
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          amount={cart.getTotalPrice()}
          orderId={`ORD-${Date.now()}`}
          user={auth.user}
          onPaymentSuccess={handlePaymentSuccess}
          onPaymentError={handlePaymentError}
        />
      )}

      {showProfileSetup && (
        <UserProfileSetup
          onSave={(profile) => {
            saveProfile(profile);
            setShowProfileSetup(false);
          }}
          onClose={() => setShowProfileSetup(false)}
          existingProfile={userProfile || undefined}
        />
      )}

      <AdvancedAIAssistant
        user={auth.user || undefined}
        userProfile={userProfile || undefined}
        currentMenuItem={currentMenuItem || undefined}
        isOpen={showAIAssistant}
        onClose={() => {
          setShowAIAssistant(false);
          setCurrentMenuItem(null);
        }}
      />
    </div>
  );
}

export default App;