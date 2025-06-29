import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Navigation, Filter } from 'lucide-react';
import { Restaurant, MapLocation } from '../../types';
import { mapService } from '../../services/mapService';

interface RestaurantMapProps {
  restaurants: Restaurant[];
  userLocation?: MapLocation;
  onRestaurantSelect: (restaurant: Restaurant) => void;
  className?: string;
}

const RestaurantMap: React.FC<RestaurantMapProps> = ({
  restaurants,
  userLocation,
  onRestaurantSelect,
  className = ''
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCuisine, setSelectedCuisine] = useState('All');

  useEffect(() => {
    initializeMap();
  }, []);

  useEffect(() => {
    if (map && restaurants.length > 0) {
      const filteredRestaurants = selectedCuisine === 'All' 
        ? restaurants 
        : restaurants.filter(r => r.cuisine === selectedCuisine);
      
      mapService.addRestaurantMarkers(filteredRestaurants);
    }
  }, [map, restaurants, selectedCuisine]);

  const initializeMap = async () => {
    if (!mapRef.current) return;

    try {
      setIsLoading(true);
      
      const center = userLocation || {
        lat: 23.8103,
        lng: 90.4125,
        name: 'Dhaka, Bangladesh'
      };

      const mapInstance = await mapService.initializeMap(mapRef.current, center);
      setMap(mapInstance);

      // Add user location marker if available
      if (userLocation) {
        new google.maps.Marker({
          position: userLocation,
          map: mapInstance,
          title: 'Your Location',
          icon: {
            url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAzMCAzMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTUiIGN5PSIxNSIgcj0iMTUiIGZpbGw9IiM0Mjg1RjQiLz4KPGNpcmNsZSBjeD0iMTUiIGN5PSIxNSIgcj0iOCIgZmlsbD0id2hpdGUiLz4KPGNpcmNsZSBjeD0iMTUiIGN5PSIxNSIgcj0iNCIgZmlsbD0iIzQyODVGNCIvPgo8L3N2Zz4K',
            scaledSize: new google.maps.Size(30, 30),
            anchor: new google.maps.Point(15, 15)
          }
        });
      }

    } catch (error) {
      console.error('Failed to initialize map:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getCurrentLocation = async () => {
    try {
      const location = await mapService.getCurrentLocation();
      if (map) {
        map.setCenter(location);
        map.setZoom(15);
      }
    } catch (error) {
      console.error('Failed to get current location:', error);
    }
  };

  const cuisines = ['All', ...new Set(restaurants.map(r => r.cuisine))];

  return (
    <div className={`relative ${className}`}>
      {/* Map Controls */}
      <div className="absolute top-4 left-4 z-10 flex flex-col space-y-2">
        <button
          onClick={getCurrentLocation}
          className="bg-white p-3 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          title="Get current location"
        >
          <Navigation className="h-5 w-5 text-gray-700" />
        </button>
        
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="bg-white p-3 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          title="Filter restaurants"
        >
          <Filter className="h-5 w-5 text-gray-700" />
        </button>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="absolute top-4 left-20 z-10 bg-white rounded-lg shadow-lg p-4 min-w-48">
          <h3 className="font-semibold text-gray-900 mb-3">Filter by Cuisine</h3>
          <div className="space-y-2">
            {cuisines.map(cuisine => (
              <label key={cuisine} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="cuisine"
                  value={cuisine}
                  checked={selectedCuisine === cuisine}
                  onChange={(e) => setSelectedCuisine(e.target.value)}
                  className="text-orange-600 focus:ring-orange-500"
                />
                <span className="text-sm text-gray-700">{cuisine}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Restaurant Count */}
      <div className="absolute top-4 right-4 z-10 bg-white px-3 py-2 rounded-lg shadow-md">
        <div className="flex items-center space-x-2">
          <MapPin className="h-4 w-4 text-orange-600" />
          <span className="text-sm font-medium text-gray-900">
            {restaurants.filter(r => selectedCuisine === 'All' || r.cuisine === selectedCuisine).length} restaurants
          </span>
        </div>
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center z-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mx-auto mb-2"></div>
            <p className="text-sm text-gray-600">Loading map...</p>
          </div>
        </div>
      )}

      {/* Map Container */}
      <div
        ref={mapRef}
        className="w-full h-full rounded-lg"
        style={{ minHeight: '400px' }}
      />

      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 z-10 bg-white rounded-lg shadow-md p-3">
        <h4 className="text-xs font-semibold text-gray-900 mb-2">Legend</h4>
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-xs text-gray-600">Your Location</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
            <span className="text-xs text-gray-600">Restaurants</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantMap;