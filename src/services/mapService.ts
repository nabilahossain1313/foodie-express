import { MapLocation, Restaurant, DeliveryZone } from '../types';

class MapService {
  private map: google.maps.Map | null = null;
  private markers: google.maps.Marker[] = [];
  private isLoaded = false;
  private apiKeyAvailable = false;

  constructor() {
    this.checkApiKey();
  }

  private checkApiKey(): void {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    this.apiKeyAvailable = !!(apiKey && apiKey !== 'your_google_maps_api_key_here' && apiKey.length > 10);
  }

  async initializeMap(container: HTMLElement, center: MapLocation): Promise<google.maps.Map> {
    if (!this.apiKeyAvailable) {
      // Create a fallback map display
      this.createFallbackMap(container, center);
      throw new Error('Google Maps API key not configured');
    }

    try {
      // Dynamically load Google Maps
      if (!this.isLoaded) {
        await this.loadGoogleMaps();
        this.isLoaded = true;
      }

      this.map = new google.maps.Map(container, {
        center: { lat: center.lat, lng: center.lng },
        zoom: 13,
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          },
          {
            featureType: 'transit',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          }
        ],
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
        zoomControl: true
      });

      return this.map;
    } catch (error) {
      this.createFallbackMap(container, center);
      throw error;
    }
  }

  private async loadGoogleMaps(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (window.google && window.google.maps) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=places,geometry`;
      script.async = true;
      script.defer = true;
      
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load Google Maps'));
      
      document.head.appendChild(script);
    });
  }

  private createFallbackMap(container: HTMLElement, center: MapLocation): void {
    container.innerHTML = `
      <div class="w-full h-full bg-gradient-to-br from-orange-100 to-red-100 rounded-lg flex items-center justify-center">
        <div class="text-center p-8">
          <div class="w-16 h-16 bg-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Map View Unavailable</h3>
          <p class="text-gray-600 text-sm mb-4">Google Maps API key not configured</p>
          <div class="bg-white rounded-lg p-4 shadow-sm">
            <h4 class="font-medium text-gray-900 mb-2">📍 Current Location</h4>
            <p class="text-sm text-gray-600">${center.address || 'Dhaka, Bangladesh'}</p>
            <p class="text-xs text-gray-500 mt-1">Lat: ${center.lat.toFixed(4)}, Lng: ${center.lng.toFixed(4)}</p>
          </div>
          <div class="mt-4 text-xs text-gray-500">
            <p>To enable map functionality:</p>
            <p>1. Get a Google Maps API key</p>
            <p>2. Add it to your .env file as VITE_GOOGLE_MAPS_API_KEY</p>
            <p>3. Restart the development server</p>
          </div>
        </div>
      </div>
    `;
  }

  addRestaurantMarkers(restaurants: Restaurant[]): void {
    if (!this.map || !this.apiKeyAvailable) return;

    // Clear existing markers
    this.clearMarkers();

    restaurants.forEach(restaurant => {
      const marker = new google.maps.Marker({
        position: restaurant.coordinates,
        map: this.map,
        title: restaurant.name,
        icon: {
          url: this.getRestaurantIcon(restaurant.cuisine),
          scaledSize: new google.maps.Size(40, 40),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(20, 40)
        }
      });

      const infoWindow = new google.maps.InfoWindow({
        content: this.createInfoWindowContent(restaurant)
      });

      marker.addListener('click', () => {
        infoWindow.open(this.map, marker);
      });

      this.markers.push(marker);
    });
  }

  async getCurrentLocation(): Promise<MapLocation> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        resolve({
          lat: 23.8103,
          lng: 90.4125,
          address: 'Dhaka, Bangladesh'
        });
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          // Default to Dhaka center if location access denied
          resolve({
            lat: 23.8103,
            lng: 90.4125,
            address: 'Dhaka, Bangladesh'
          });
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000
        }
      );
    });
  }

  calculateDistance(from: MapLocation, to: MapLocation): number {
    const R = 6371; // Earth's radius in km
    const dLat = this.toRad(to.lat - from.lat);
    const dLng = this.toRad(to.lng - from.lng);
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(from.lat)) * Math.cos(this.toRad(to.lat)) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private toRad(value: number): number {
    return value * Math.PI / 180;
  }

  private clearMarkers(): void {
    this.markers.forEach(marker => marker.setMap(null));
    this.markers = [];
  }

  private getRestaurantIcon(cuisine: string): string {
    // Return a simple colored circle for different cuisines
    const colors = {
      'Bengali': '#FF6B35',
      'Italian': '#FF6B35',
      'Japanese': '#FF6B35',
      'Thai': '#FF6B35',
      'Chinese': '#FF6B35',
      'default': '#FF6B35'
    };
    
    const color = colors[cuisine as keyof typeof colors] || colors.default;
    
    return `data:image/svg+xml;base64,${btoa(`
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="20" fill="${color}"/>
        <circle cx="20" cy="20" r="8" fill="white"/>
      </svg>
    `)}`;
  }

  private createInfoWindowContent(restaurant: Restaurant): string {
    return `
      <div class="p-3 max-w-xs">
        <h3 class="font-semibold text-lg mb-1">${restaurant.name}</h3>
        <p class="text-sm text-gray-600 mb-2">${restaurant.cuisine} • ${restaurant.priceRange}</p>
        <div class="flex items-center mb-2">
          <span class="text-yellow-500">⭐</span>
          <span class="text-sm ml-1">${restaurant.rating}</span>
          <span class="text-sm text-gray-500 ml-2">${restaurant.deliveryTime}</span>
        </div>
        <p class="text-xs text-gray-500">${restaurant.address}</p>
        <div class="mt-2">
          <span class="text-sm font-medium">Delivery: ৳${restaurant.deliveryFee}</span>
        </div>
      </div>
    `;
  }
}

export const mapService = new MapService();