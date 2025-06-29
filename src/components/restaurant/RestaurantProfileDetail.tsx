import React, { useState } from 'react';
import { 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Star, 
  Users, 
  Car, 
  Wifi, 
  CreditCard,
  Award,
  ChefHat,
  Utensils,
  Camera,
  Share2,
  Heart,
  Navigation
} from 'lucide-react';
import { RestaurantProfile, DetailedMenuItem } from '../../data/restaurantProfiles';

interface RestaurantProfileDetailProps {
  restaurant: RestaurantProfile;
  onMenuItemClick?: (item: DetailedMenuItem) => void;
  onAddToCart?: (item: DetailedMenuItem, quantity: number) => void;
}

const RestaurantProfileDetail: React.FC<RestaurantProfileDetailProps> = ({
  restaurant,
  onMenuItemClick,
  onAddToCart
}) => {
  const [activeTab, setActiveTab] = useState<'menu' | 'info' | 'reviews' | 'photos'>('menu');
  const [selectedCategory, setSelectedCategory] = useState(restaurant.menu.categories[0]?.id || '');

  const formatHours = (hours: { open: string; close: string; closed?: boolean }) => {
    if (hours.closed) return 'Closed';
    return `${hours.open} - ${hours.close}`;
  };

  const getCurrentStatus = () => {
    const now = new Date();
    const currentDay = now.toLocaleString('en-US', { weekday: 'long' }).toLowerCase();
    const currentTime = now.getHours() * 100 + now.getMinutes();
    
    const todayHours = restaurant.hoursOfOperation[currentDay];
    if (!todayHours || todayHours.closed) return { isOpen: false, status: 'Closed' };
    
    const openTime = parseInt(todayHours.open.replace(':', ''));
    const closeTime = parseInt(todayHours.close.replace(':', ''));
    
    const isOpen = currentTime >= openTime && currentTime <= closeTime;
    return { 
      isOpen, 
      status: isOpen ? 'Open' : 'Closed',
      nextChange: isOpen ? `Closes at ${todayHours.close}` : `Opens at ${todayHours.open}`
    };
  };

  const status = getCurrentStatus();

  const renderHeader = () => (
    <div className="relative">
      <img
        src={restaurant.photos.exterior}
        alt={restaurant.name}
        className="w-full h-64 md:h-80 object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-40" />
      
      <div className="absolute top-4 right-4 flex space-x-2">
        <button className="bg-white bg-opacity-90 p-2 rounded-full hover:bg-white transition-colors">
          <Share2 className="h-5 w-5 text-gray-700" />
        </button>
        <button className="bg-white bg-opacity-90 p-2 rounded-full hover:bg-white transition-colors">
          <Heart className="h-5 w-5 text-gray-700" />
        </button>
        <button className="bg-white bg-opacity-90 p-2 rounded-full hover:bg-white transition-colors">
          <Camera className="h-5 w-5 text-gray-700" />
        </button>
      </div>

      <div className="absolute bottom-4 left-4 text-white">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">{restaurant.name}</h1>
        <div className="flex items-center space-x-4 mb-2">
          <div className="flex items-center space-x-1">
            <Star className="h-5 w-5 text-yellow-400 fill-current" />
            <span className="text-lg font-semibold">{restaurant.averageRating}</span>
            <span className="text-sm">({restaurant.totalReviews} reviews)</span>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            status.isOpen ? 'bg-green-600' : 'bg-red-600'
          }`}>
            {status.status}
          </span>
          <span className="text-sm">{restaurant.priceRange}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {restaurant.cuisineType.map((cuisine, index) => (
            <span key={index} className="bg-white bg-opacity-20 px-2 py-1 rounded text-sm">
              {cuisine}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  const renderQuickInfo = () => (
    <div className="bg-white border-b border-gray-200 p-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4 text-gray-500" />
          <span>{status.nextChange}</span>
        </div>
        <div className="flex items-center space-x-2">
          <MapPin className="h-4 w-4 text-gray-500" />
          <span>{restaurant.location.city}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Utensils className="h-4 w-4 text-gray-500" />
          <span>{restaurant.services.delivery ? 'Delivery Available' : 'Pickup Only'}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Users className="h-4 w-4 text-gray-500" />
          <span>Est. {restaurant.establishedYear}</span>
        </div>
      </div>
    </div>
  );

  const renderTabs = () => (
    <div className="border-b border-gray-200 bg-white">
      <nav className="flex space-x-8 px-6">
        {[
          { id: 'menu', label: 'Menu', icon: Utensils },
          { id: 'info', label: 'Information', icon: MapPin },
          { id: 'reviews', label: 'Reviews', icon: Star },
          { id: 'photos', label: 'Photos', icon: Camera }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                activeTab === tab.id
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );

  const renderMenu = () => (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Menu</h2>
        <div className="text-sm text-gray-500">
          Last updated: {new Date(restaurant.menu.lastUpdated).toLocaleDateString()}
          {restaurant.menu.priceSubjectToChange && (
            <span className="block text-xs text-orange-600">*Prices subject to change</span>
          )}
        </div>
      </div>

      {/* Category Navigation */}
      <div className="flex space-x-4 mb-6 overflow-x-auto">
        {restaurant.menu.categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
              selectedCategory === category.id
                ? 'bg-orange-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Menu Items */}
      {restaurant.menu.categories
        .filter(category => category.id === selectedCategory)
        .map((category) => (
          <div key={category.id}>
            <h3 className="text-xl font-semibold mb-4">{category.name}</h3>
            {category.description && (
              <p className="text-gray-600 mb-6">{category.description}</p>
            )}
            
            <div className="space-y-6">
              {category.items.map((item) => (
                <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="text-lg font-semibold">{item.name}</h4>
                        {item.popularity === 'signature' && (
                          <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs font-medium">
                            ⭐ Signature
                          </span>
                        )}
                        {item.popularity === 'popular' && (
                          <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                            Popular
                          </span>
                        )}
                        {item.popularity === 'new' && (
                          <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                            New
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-2 mb-2">
                        {item.dietaryIcons.map((icon, index) => (
                          <span key={index} className="text-sm">{icon}</span>
                        ))}
                        {item.spiceLevel && (
                          <span className={`px-2 py-1 rounded text-xs ${
                            item.spiceLevel === 'mild' ? 'bg-green-100 text-green-700' :
                            item.spiceLevel === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                            item.spiceLevel === 'hot' ? 'bg-orange-100 text-orange-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {item.spiceLevel}
                          </span>
                        )}
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs text-gray-500 mb-3">
                        <div>Portion: {item.portionSize}</div>
                        <div>Prep time: {item.preparationTime}</div>
                        {item.nutritionalInfo && (
                          <>
                            <div>Calories: {item.nutritionalInfo.calories}</div>
                            <div>Protein: {item.nutritionalInfo.protein}g</div>
                          </>
                        )}
                      </div>

                      {item.allergens.length > 0 && (
                        <div className="text-xs text-red-600 mb-2">
                          Allergens: {item.allergens.join(', ')}
                        </div>
                      )}
                    </div>
                    
                    <div className="text-right ml-4">
                      <div className="text-xl font-bold text-gray-900">
                        ৳{item.price}
                        {item.originalPrice && (
                          <span className="text-sm text-gray-500 line-through ml-2">
                            ৳{item.originalPrice}
                          </span>
                        )}
                      </div>
                      {item.reviews && (
                        <div className="flex items-center space-x-1 text-sm text-gray-500 mt-1">
                          <Star className="h-3 w-3 text-yellow-400 fill-current" />
                          <span>{item.reviews.averageRating}</span>
                          <span>({item.reviews.totalReviews})</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      {item.photos.length > 0 && (
                        <img
                          src={item.photos[0]}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {onMenuItemClick && (
                        <button
                          onClick={() => onMenuItemClick(item)}
                          className="px-4 py-2 border border-orange-600 text-orange-600 rounded-lg hover:bg-orange-50 transition-colors"
                        >
                          View Details
                        </button>
                      )}
                      {onAddToCart && (
                        <button
                          onClick={() => onAddToCart(item, 1)}
                          className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                        >
                          Add to Cart
                        </button>
                      )}
                    </div>
                  </div>

                  {item.customizations.available && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <p className="text-xs text-gray-600">
                        Customizations available: {item.customizations.options?.join(', ')}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  );

  const renderInfo = () => (
    <div className="p-6 space-y-8">
      {/* Contact Information */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-gray-500" />
              <span>{restaurant.contact.phone}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-gray-500" />
              <span>{restaurant.contact.email}</span>
            </div>
            {restaurant.contact.website && (
              <div className="flex items-center space-x-3">
                <Globe className="h-5 w-5 text-gray-500" />
                <a href={restaurant.contact.website} className="text-orange-600 hover:underline">
                  {restaurant.contact.website}
                </a>
              </div>
            )}
          </div>
          <div>
            <div className="flex items-start space-x-3">
              <MapPin className="h-5 w-5 text-gray-500 mt-1" />
              <div>
                <p>{restaurant.location.fullAddress}</p>
                <p className="text-sm text-gray-600 mt-1">
                  Near: {restaurant.location.landmarks.join(', ')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hours of Operation */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Hours of Operation</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {Object.entries(restaurant.hoursOfOperation).map(([day, hours]) => (
            <div key={day} className="flex justify-between py-2 border-b border-gray-100">
              <span className="capitalize font-medium">{day}</span>
              <span className={hours.closed ? 'text-red-600' : 'text-gray-900'}>
                {formatHours(hours)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Services */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Services</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(restaurant.services).map(([service, available]) => (
            <div key={service} className={`flex items-center space-x-2 ${available ? 'text-green-600' : 'text-gray-400'}`}>
              <span className={`w-2 h-2 rounded-full ${available ? 'bg-green-500' : 'bg-gray-300'}`} />
              <span className="capitalize text-sm">{service.replace(/([A-Z])/g, ' $1')}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Amenities</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {restaurant.ambiance.wheelchairAccessible && (
            <div className="flex items-center space-x-2 text-green-600">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-sm">Wheelchair Accessible</span>
            </div>
          )}
          {restaurant.ambiance.parkingAvailable && (
            <div className="flex items-center space-x-2 text-green-600">
              <Car className="h-4 w-4" />
              <span className="text-sm">Parking Available</span>
            </div>
          )}
          {restaurant.ambiance.wifiAvailable && (
            <div className="flex items-center space-x-2 text-green-600">
              <Wifi className="h-4 w-4" />
              <span className="text-sm">Free WiFi</span>
            </div>
          )}
        </div>
      </div>

      {/* Payment Methods */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Payment Methods</h3>
        <div className="flex flex-wrap gap-2">
          {restaurant.paymentMethods.map((method, index) => (
            <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
              {method}
            </span>
          ))}
        </div>
      </div>

      {/* Awards & Certifications */}
      {(restaurant.awards.length > 0 || restaurant.certifications.length > 0) && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Awards & Certifications</h3>
          <div className="space-y-3">
            {restaurant.awards.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-900 mb-2 flex items-center space-x-2">
                  <Award className="h-4 w-4 text-yellow-500" />
                  <span>Awards</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {restaurant.awards.map((award, index) => (
                    <span key={index} className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                      {award}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {restaurant.certifications.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Certifications</h4>
                <div className="flex flex-wrap gap-2">
                  {restaurant.certifications.map((cert, index) => (
                    <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );

  const renderReviews = () => (
    <div className="p-6">
      <div className="text-center py-8">
        <Star className="h-12 w-12 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Reviews Coming Soon</h3>
        <p className="text-gray-600">Customer reviews and ratings will be displayed here.</p>
      </div>
    </div>
  );

  const renderPhotos = () => (
    <div className="p-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <img
          src={restaurant.photos.exterior}
          alt="Exterior"
          className="w-full h-32 object-cover rounded-lg"
        />
        {restaurant.photos.interior.map((photo, index) => (
          <img
            key={index}
            src={photo}
            alt={`Interior ${index + 1}`}
            className="w-full h-32 object-cover rounded-lg"
          />
        ))}
        {restaurant.photos.kitchen && (
          <img
            src={restaurant.photos.kitchen}
            alt="Kitchen"
            className="w-full h-32 object-cover rounded-lg"
          />
        )}
        {restaurant.photos.dishes.map((photo, index) => (
          <img
            key={index}
            src={photo}
            alt={`Dish ${index + 1}`}
            className="w-full h-32 object-cover rounded-lg"
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {renderHeader()}
      {renderQuickInfo()}
      {renderTabs()}
      
      <div className="min-h-96">
        {activeTab === 'menu' && renderMenu()}
        {activeTab === 'info' && renderInfo()}
        {activeTab === 'reviews' && renderReviews()}
        {activeTab === 'photos' && renderPhotos()}
      </div>
    </div>
  );
};

export default RestaurantProfileDetail;