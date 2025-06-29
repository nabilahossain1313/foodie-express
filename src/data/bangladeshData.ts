import { Restaurant, MenuItem, DeliveryZone } from '../types';

// Major cities and areas in Bangladesh
export const bangladeshCities = [
  'Dhaka', 'Chittagong', 'Sylhet', 'Rajshahi', 'Khulna', 'Barisal', 'Rangpur', 'Mymensingh',
  'Comilla', 'Narayanganj', 'Gazipur', 'Tongi', 'Bogra', 'Jessore', 'Dinajpur'
];

export const dhakaAreas = [
  'Dhanmondi', 'Gulshan', 'Banani', 'Uttara', 'Mirpur', 'Mohammadpur', 'Old Dhaka',
  'Wari', 'Ramna', 'Tejgaon', 'Panthapath', 'Farmgate', 'Karwan Bazar', 'Motijheel',
  'Paltan', 'Segunbagicha', 'Eskaton', 'Malibagh', 'Rampura', 'Badda', 'Baridhara',
  'Bashundhara', 'Lalmatia', 'Azimpur', 'New Market', 'Elephant Road', 'Green Road'
];

export const deliveryZones: DeliveryZone[] = [
  {
    id: 'dhaka-central',
    name: 'Dhaka Central',
    coordinates: [
      { lat: 23.7465, lng: 90.3763 },
      { lat: 23.7565, lng: 90.3863 },
      { lat: 23.7365, lng: 90.3963 },
      { lat: 23.7265, lng: 90.3663 }
    ],
    deliveryFee: 30,
    estimatedTime: '25-35 min',
    active: true
  },
  {
    id: 'dhaka-north',
    name: 'Dhaka North (Uttara, Gulshan)',
    coordinates: [
      { lat: 23.8103, lng: 90.4125 },
      { lat: 23.8203, lng: 90.4225 },
      { lat: 23.8003, lng: 90.4325 },
      { lat: 23.7903, lng: 90.4025 }
    ],
    deliveryFee: 40,
    estimatedTime: '30-45 min',
    active: true
  },
  {
    id: 'dhaka-west',
    name: 'Dhaka West (Mirpur, Mohammadpur)',
    coordinates: [
      { lat: 23.7956, lng: 90.3537 },
      { lat: 23.8056, lng: 90.3637 },
      { lat: 23.7856, lng: 90.3737 },
      { lat: 23.7756, lng: 90.3437 }
    ],
    deliveryFee: 35,
    estimatedTime: '25-40 min',
    active: true
  }
];

export const bangladeshRestaurants: Restaurant[] = [
  {
    id: 'bd-1',
    name: 'Kacchi Bhai',
    image: 'https://images.pexels.com/photos/11220209/pexels-photo-11220209.jpeg?auto=compress&cs=tinysrgb&w=800',
    cuisine: 'Bengali',
    rating: 4.8,
    deliveryTime: '35-45 min',
    deliveryFee: 40,
    minimumOrder: 200,
    isOpen: true,
    description: 'Authentic Bangladeshi Kacchi Biryani and traditional dishes',
    address: 'House 45, Road 27, Block K, Banani, Dhaka 1213',
    phone: '+880 1711-123456',
    coordinates: { lat: 23.7937, lng: 90.4066 },
    zone: 'dhaka-north',
    featured: true,
    priceRange: '$$',
    tags: ['biryani', 'traditional', 'halal', 'family'],
    openingHours: {
      monday: { open: '11:00', close: '23:00' },
      tuesday: { open: '11:00', close: '23:00' },
      wednesday: { open: '11:00', close: '23:00' },
      thursday: { open: '11:00', close: '23:00' },
      friday: { open: '12:00', close: '23:30' },
      saturday: { open: '11:00', close: '23:30' },
      sunday: { open: '11:00', close: '23:00' }
    }
  },
  {
    id: 'bd-2',
    name: 'Star Kabab & Restaurant',
    image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=800',
    cuisine: 'Mughlai',
    rating: 4.6,
    deliveryTime: '25-35 min',
    deliveryFee: 35,
    minimumOrder: 150,
    isOpen: true,
    description: 'Famous for kebabs, biryanis and Mughlai cuisine since 1991',
    address: '54 Purana Paltan, Dhaka 1000',
    phone: '+880 1712-234567',
    coordinates: { lat: 23.7334, lng: 90.4182 },
    zone: 'dhaka-central',
    featured: true,
    priceRange: '$$',
    tags: ['kebab', 'biryani', 'mughlai', 'famous'],
    openingHours: {
      monday: { open: '12:00', close: '00:00' },
      tuesday: { open: '12:00', close: '00:00' },
      wednesday: { open: '12:00', close: '00:00' },
      thursday: { open: '12:00', close: '00:00' },
      friday: { open: '12:00', close: '01:00' },
      saturday: { open: '12:00', close: '01:00' },
      sunday: { open: '12:00', close: '00:00' }
    }
  },
  {
    id: 'bd-3',
    name: 'Fakruddin Biryani',
    image: 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=800',
    cuisine: 'Bengali',
    rating: 4.7,
    deliveryTime: '30-40 min',
    deliveryFee: 45,
    minimumOrder: 180,
    isOpen: true,
    description: 'Premium biryani house with authentic Dhaka-style recipes',
    address: 'Shop 1-3, Dhanmondi 27, Dhaka 1209',
    phone: '+880 1713-345678',
    coordinates: { lat: 23.7461, lng: 90.3742 },
    zone: 'dhaka-central',
    featured: true,
    priceRange: '$$$',
    tags: ['biryani', 'premium', 'authentic', 'dhaka-style'],
    openingHours: {
      monday: { open: '11:30', close: '23:30' },
      tuesday: { open: '11:30', close: '23:30' },
      wednesday: { open: '11:30', close: '23:30' },
      thursday: { open: '11:30', close: '23:30' },
      friday: { open: '12:00', close: '00:00' },
      saturday: { open: '11:30', close: '00:00' },
      sunday: { open: '11:30', close: '23:30' }
    }
  },
  {
    id: 'bd-4',
    name: 'Haji Biriyani',
    image: 'https://images.pexels.com/photos/11220209/pexels-photo-11220209.jpeg?auto=compress&cs=tinysrgb&w=800',
    cuisine: 'Bengali',
    rating: 4.9,
    deliveryTime: '40-50 min',
    deliveryFee: 50,
    minimumOrder: 220,
    isOpen: true,
    description: 'Legendary biryani house from Old Dhaka, serving since 1939',
    address: 'Nazira Bazar, Old Dhaka, Dhaka 1100',
    phone: '+880 1714-456789',
    coordinates: { lat: 23.7104, lng: 90.4074 },
    zone: 'dhaka-central',
    featured: true,
    priceRange: '$$$',
    tags: ['legendary', 'old-dhaka', 'heritage', 'authentic'],
    openingHours: {
      monday: { open: '11:00', close: '22:00' },
      tuesday: { open: '11:00', close: '22:00' },
      wednesday: { open: '11:00', close: '22:00' },
      thursday: { open: '11:00', close: '22:00' },
      friday: { open: '12:00', close: '22:30' },
      saturday: { open: '11:00', close: '22:30' },
      sunday: { open: '11:00', close: '22:00' }
    }
  },
  {
    id: 'bd-5',
    name: 'Pizza Hut Bangladesh',
    image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=800',
    cuisine: 'Italian',
    rating: 4.3,
    deliveryTime: '25-35 min',
    deliveryFee: 60,
    minimumOrder: 300,
    isOpen: true,
    description: 'International pizza chain with local flavors',
    address: 'Gulshan Avenue, Gulshan 1, Dhaka 1212',
    phone: '+880 1715-567890',
    coordinates: { lat: 23.7808, lng: 90.4142 },
    zone: 'dhaka-north',
    featured: false,
    priceRange: '$$$',
    tags: ['pizza', 'international', 'fast-food', 'chain'],
    openingHours: {
      monday: { open: '10:00', close: '23:00' },
      tuesday: { open: '10:00', close: '23:00' },
      wednesday: { open: '10:00', close: '23:00' },
      thursday: { open: '10:00', close: '23:00' },
      friday: { open: '10:00', close: '00:00' },
      saturday: { open: '10:00', close: '00:00' },
      sunday: { open: '10:00', close: '23:00' }
    }
  },
  {
    id: 'bd-6',
    name: 'Chillox',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
    cuisine: 'Continental',
    rating: 4.4,
    deliveryTime: '30-40 min',
    deliveryFee: 55,
    minimumOrder: 250,
    isOpen: true,
    description: 'Trendy restaurant with burgers, pasta, and continental dishes',
    address: 'House 11, Road 2, Dhanmondi, Dhaka 1205',
    phone: '+880 1716-678901',
    coordinates: { lat: 23.7515, lng: 90.3740 },
    zone: 'dhaka-central',
    featured: false,
    priceRange: '$$',
    tags: ['burgers', 'pasta', 'continental', 'trendy'],
    openingHours: {
      monday: { open: '12:00', close: '23:30' },
      tuesday: { open: '12:00', close: '23:30' },
      wednesday: { open: '12:00', close: '23:30' },
      thursday: { open: '12:00', close: '23:30' },
      friday: { open: '12:00', close: '00:30' },
      saturday: { open: '12:00', close: '00:30' },
      sunday: { open: '12:00', close: '23:30' }
    }
  },
  {
    id: 'bd-7',
    name: 'Khana Khazana',
    image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=800',
    cuisine: 'Indian',
    rating: 4.5,
    deliveryTime: '35-45 min',
    deliveryFee: 40,
    minimumOrder: 200,
    isOpen: true,
    description: 'Authentic Indian cuisine with North and South Indian specialties',
    address: 'House 32, Road 11, Block E, Banani, Dhaka 1213',
    phone: '+880 1717-789012',
    coordinates: { lat: 23.7946, lng: 90.4058 },
    zone: 'dhaka-north',
    featured: false,
    priceRange: '$$',
    tags: ['indian', 'curry', 'tandoor', 'vegetarian'],
    openingHours: {
      monday: { open: '11:30', close: '23:00' },
      tuesday: { open: '11:30', close: '23:00' },
      wednesday: { open: '11:30', close: '23:00' },
      thursday: { open: '11:30', close: '23:00' },
      friday: { open: '12:00', close: '23:30' },
      saturday: { open: '11:30', close: '23:30' },
      sunday: { open: '11:30', close: '23:00' }
    }
  },
  {
    id: 'bd-8',
    name: 'Thai Garden',
    image: 'https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg?auto=compress&cs=tinysrgb&w=800',
    cuisine: 'Thai',
    rating: 4.6,
    deliveryTime: '30-40 min',
    deliveryFee: 65,
    minimumOrder: 280,
    isOpen: true,
    description: 'Authentic Thai cuisine with fresh ingredients and traditional recipes',
    address: 'House 58, Road 15A, Dhanmondi, Dhaka 1209',
    phone: '+880 1718-890123',
    coordinates: { lat: 23.7489, lng: 90.3698 },
    zone: 'dhaka-central',
    featured: false,
    priceRange: '$$$',
    tags: ['thai', 'authentic', 'spicy', 'fresh'],
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

export const bangladeshMenuItems: { [restaurantId: string]: MenuItem[] } = {
  'bd-1': [
    {
      id: 'bd-1-1',
      name: 'Kacchi Biryani (Mutton)',
      description: 'Traditional Dhaka-style mutton biryani with aromatic basmati rice, tender mutton, and special spices',
      price: 320,
      image: 'https://images.pexels.com/photos/11220209/pexels-photo-11220209.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Biryani',
      isPopular: true,
      preparationTime: 45,
      availability: true,
      nutritionInfo: {
        calories: 680,
        protein: 42,
        carbs: 65,
        fat: 28
      }
    },
    {
      id: 'bd-1-2',
      name: 'Chicken Kacchi',
      description: 'Flavorful chicken biryani with perfectly cooked rice and tender chicken pieces',
      price: 280,
      image: 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Biryani',
      isPopular: true,
      preparationTime: 40,
      availability: true,
      nutritionInfo: {
        calories: 620,
        protein: 38,
        carbs: 62,
        fat: 24
      }
    },
    {
      id: 'bd-1-3',
      name: 'Beef Rezala',
      description: 'Rich and creamy beef curry with yogurt and aromatic spices',
      price: 350,
      image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Curry',
      isSpicy: true,
      preparationTime: 35,
      availability: true,
      nutritionInfo: {
        calories: 420,
        protein: 35,
        carbs: 12,
        fat: 28
      }
    },
    {
      id: 'bd-1-4',
      name: 'Borhani',
      description: 'Traditional yogurt-based drink with mint and spices, perfect with biryani',
      price: 45,
      image: 'https://images.pexels.com/photos/4397925/pexels-photo-4397925.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Beverages',
      isVegetarian: true,
      preparationTime: 5,
      availability: true,
      nutritionInfo: {
        calories: 120,
        protein: 6,
        carbs: 18,
        fat: 3
      }
    }
  ],
  'bd-2': [
    {
      id: 'bd-2-1',
      name: 'Seekh Kebab',
      description: 'Grilled minced meat kebabs with traditional spices and herbs',
      price: 180,
      image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Kebab',
      isPopular: true,
      preparationTime: 25,
      availability: true,
      nutritionInfo: {
        calories: 320,
        protein: 28,
        carbs: 8,
        fat: 20
      }
    },
    {
      id: 'bd-2-2',
      name: 'Chicken Tikka',
      description: 'Marinated chicken pieces grilled to perfection with yogurt and spices',
      price: 220,
      image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Kebab',
      isPopular: true,
      preparationTime: 30,
      availability: true,
      nutritionInfo: {
        calories: 280,
        protein: 32,
        carbs: 6,
        fat: 14
      }
    },
    {
      id: 'bd-2-3',
      name: 'Mutton Biryani',
      description: 'Aromatic mutton biryani with long-grain rice and tender meat',
      price: 380,
      image: 'https://images.pexels.com/photos/11220209/pexels-photo-11220209.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Biryani',
      preparationTime: 50,
      availability: true,
      nutritionInfo: {
        calories: 720,
        protein: 45,
        carbs: 68,
        fat: 32
      }
    }
  ],
  'bd-3': [
    {
      id: 'bd-3-1',
      name: 'Premium Mutton Biryani',
      description: 'Signature biryani with premium mutton cuts and saffron-infused rice',
      price: 450,
      image: 'https://images.pexels.com/photos/11220209/pexels-photo-11220209.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Biryani',
      isPopular: true,
      preparationTime: 55,
      availability: true,
      nutritionInfo: {
        calories: 750,
        protein: 48,
        carbs: 70,
        fat: 35
      }
    },
    {
      id: 'bd-3-2',
      name: 'Chicken Biryani Special',
      description: 'Special chicken biryani with aromatic spices and tender chicken',
      price: 350,
      image: 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Biryani',
      isPopular: true,
      preparationTime: 45,
      availability: true,
      nutritionInfo: {
        calories: 650,
        protein: 40,
        carbs: 65,
        fat: 26
      }
    }
  ],
  'bd-5': [
    {
      id: 'bd-5-1',
      name: 'Chicken Supreme Pizza (Large)',
      description: 'Loaded with chicken, mushrooms, bell peppers, and mozzarella cheese',
      price: 890,
      image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Pizza',
      isPopular: true,
      preparationTime: 25,
      availability: true,
      nutritionInfo: {
        calories: 320,
        protein: 18,
        carbs: 35,
        fat: 14
      }
    },
    {
      id: 'bd-5-2',
      name: 'Beef Pepperoni Pizza (Medium)',
      description: 'Classic pepperoni pizza with beef pepperoni and mozzarella',
      price: 650,
      image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Pizza',
      preparationTime: 20,
      availability: true,
      nutritionInfo: {
        calories: 280,
        protein: 15,
        carbs: 32,
        fat: 12
      }
    }
  ]
};

export const bangladeshPaymentMethods = [
  {
    id: 'bkash',
    name: 'bKash',
    type: 'mobile-banking',
    icon: '💳',
    description: 'Pay with bKash mobile banking',
    fees: 0,
    processingTime: 'Instant'
  },
  {
    id: 'nagad',
    name: 'Nagad',
    type: 'mobile-banking',
    icon: '📱',
    description: 'Pay with Nagad mobile banking',
    fees: 0,
    processingTime: 'Instant'
  },
  {
    id: 'rocket',
    name: 'Rocket',
    type: 'mobile-banking',
    icon: '🚀',
    description: 'Pay with Dutch-Bangla Rocket',
    fees: 0,
    processingTime: 'Instant'
  },
  {
    id: 'upay',
    name: 'Upay',
    type: 'mobile-banking',
    icon: '💰',
    description: 'Pay with UCB Upay',
    fees: 0,
    processingTime: 'Instant'
  },
  {
    id: 'gpay',
    name: 'Google Pay',
    type: 'digital-wallet',
    icon: '🌐',
    description: 'Pay with Google Pay',
    fees: 0,
    processingTime: 'Instant'
  },
  {
    id: 'card',
    name: 'Credit/Debit Card',
    type: 'card',
    icon: '💳',
    description: 'Pay with Visa, MasterCard, or local cards',
    fees: 2.5,
    processingTime: 'Instant'
  },
  {
    id: 'cash',
    name: 'Cash on Delivery',
    type: 'cash',
    icon: '💵',
    description: 'Pay cash when your order arrives',
    fees: 0,
    processingTime: 'On delivery'
  }
];