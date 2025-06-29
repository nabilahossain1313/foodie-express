import { Restaurant, MenuItem } from '../types';
import { bangladeshRestaurants, bangladeshMenuItems } from './bangladeshData';
import { restaurantProfiles } from './restaurantProfiles';

// Convert restaurant profiles to the existing Restaurant format for compatibility
const convertProfileToRestaurant = (profile: any): Restaurant => ({
  id: profile.id,
  name: profile.name,
  image: profile.photos.exterior,
  cuisine: profile.cuisineType[0] || 'Mixed',
  rating: profile.averageRating,
  deliveryTime: '25-35 min', // Default value
  deliveryFee: 40, // Default value
  minimumOrder: 200, // Default value
  isOpen: true, // Default value
  description: profile.description,
  address: profile.location.fullAddress,
  phone: profile.contact.phone,
  coordinates: profile.location.coordinates,
  zone: profile.location.zone,
  featured: profile.awards.length > 0,
  priceRange: profile.priceRange,
  tags: profile.specialties,
  openingHours: profile.hoursOfOperation
});

// Convert detailed menu items to the existing MenuItem format
const convertDetailedMenuItems = (profile: any): MenuItem[] => {
  const items: MenuItem[] = [];
  
  profile.menu.categories.forEach((category: any) => {
    category.items.forEach((item: any) => {
      items.push({
        id: item.id,
        name: item.name,
        description: item.description,
        price: item.price / 100, // Convert from paisa to taka for display
        image: item.photos[0] || 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=400',
        category: category.name,
        isVegetarian: item.dietaryIcons.includes('🥕'),
        isSpicy: item.spiceLevel === 'hot' || item.spiceLevel === 'extra-hot',
        isPopular: item.popularity === 'popular' || item.popularity === 'signature',
        allergens: item.allergens,
        nutritionInfo: item.nutritionalInfo,
        preparationTime: parseInt(item.preparationTime.split('-')[0]) || 30,
        availability: true
      });
    });
  });
  
  return items;
};

// Combine original restaurants with new detailed profiles
export const mockRestaurants: Restaurant[] = [
  ...bangladeshRestaurants,
  ...restaurantProfiles.map(convertProfileToRestaurant),
  {
    id: '1',
    name: 'Bella Italia',
    image: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=800',
    cuisine: 'Italian',
    rating: 4.8,
    deliveryTime: '25-35 min',
    deliveryFee: 60,
    minimumOrder: 300,
    isOpen: true,
    description: 'Authentic Italian cuisine with fresh ingredients',
    address: 'House 123, Road 5, Gulshan 2, Dhaka 1212',
    phone: '+880 1719-123456',
    coordinates: { lat: 23.7925, lng: 90.4078 },
    zone: 'dhaka-north',
    featured: false,
    priceRange: '$$$',
    tags: ['italian', 'pizza', 'pasta', 'romantic'],
    openingHours: {
      monday: { open: '11:00', close: '23:00' },
      tuesday: { open: '11:00', close: '23:00' },
      wednesday: { open: '11:00', close: '23:00' },
      thursday: { open: '11:00', close: '23:00' },
      friday: { open: '11:00', close: '23:30' },
      saturday: { open: '11:00', close: '23:30' },
      sunday: { open: '11:00', close: '23:00' }
    }
  },
  {
    id: '2',
    name: 'Sakura Sushi',
    image: 'https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg?auto=compress&cs=tinysrgb&w=800',
    cuisine: 'Japanese',
    rating: 4.9,
    deliveryTime: '30-40 min',
    deliveryFee: 80,
    minimumOrder: 400,
    isOpen: true,
    description: 'Fresh sushi and traditional Japanese dishes',
    address: 'House 67, Road 12, Banani, Dhaka 1213',
    phone: '+880 1720-234567',
    coordinates: { lat: 23.7954, lng: 90.4077 },
    zone: 'dhaka-north',
    featured: false,
    priceRange: '$$$$',
    tags: ['japanese', 'sushi', 'fresh', 'premium'],
    openingHours: {
      monday: { open: '12:00', close: '22:30' },
      tuesday: { open: '12:00', close: '22:30' },
      wednesday: { open: '12:00', close: '22:30' },
      thursday: { open: '12:00', close: '22:30' },
      friday: { open: '12:00', close: '23:00' },
      saturday: { open: '12:00', close: '23:00' },
      sunday: { open: '12:00', close: '22:30' }
    }
  }
];

// Combine menu items from all sources
export const mockMenuItems: { [restaurantId: string]: MenuItem[] } = {
  ...bangladeshMenuItems,
  // Add menu items from detailed restaurant profiles
  ...restaurantProfiles.reduce((acc, profile) => {
    acc[profile.id] = convertDetailedMenuItems(profile);
    return acc;
  }, {} as { [key: string]: MenuItem[] }),
  '1': [
    {
      id: '1-1',
      name: 'Margherita Pizza',
      description: 'Classic pizza with fresh mozzarella, tomato sauce, and basil',
      price: 650,
      image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Pizza',
      isVegetarian: true,
      isPopular: true,
      preparationTime: 20,
      availability: true,
      nutritionInfo: {
        calories: 280,
        protein: 12,
        carbs: 36,
        fat: 10
      }
    },
    {
      id: '1-2',
      name: 'Spaghetti Carbonara',
      description: 'Creamy pasta with eggs, cheese, pancetta, and black pepper',
      price: 750,
      image: 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Pasta',
      preparationTime: 25,
      availability: true,
      nutritionInfo: {
        calories: 580,
        protein: 28,
        carbs: 60,
        fat: 24
      }
    }
  ],
  '2': [
    {
      id: '2-1',
      name: 'Salmon Teriyaki Roll',
      description: 'Fresh salmon with teriyaki sauce, cucumber, and avocado',
      price: 850,
      image: 'https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Sushi Rolls',
      isPopular: true,
      preparationTime: 15,
      availability: true,
      nutritionInfo: {
        calories: 320,
        protein: 24,
        carbs: 28,
        fat: 14
      }
    },
    {
      id: '2-2',
      name: 'Chicken Ramen',
      description: 'Rich chicken broth with noodles, egg, and vegetables',
      price: 950,
      image: 'https://images.pexels.com/photos/884600/pexels-photo-884600.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Ramen',
      preparationTime: 30,
      availability: true,
      nutritionInfo: {
        calories: 450,
        protein: 32,
        carbs: 48,
        fat: 16
      }
    }
  ]
};

// Export restaurant profiles for detailed view
export { restaurantProfiles };