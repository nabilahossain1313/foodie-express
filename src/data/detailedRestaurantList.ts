export interface DetailedRestaurant {
  id: string;
  name: string;
  cuisineType: string[];
  priceRange: '$' | '$$' | '$$$' | '$$$$';
  location: {
    address: string;
    area: string;
    coordinates: { lat: number; lng: number };
    landmarks: string[];
  };
  hoursOfOperation: {
    [key: string]: { open: string; close: string; closed?: boolean };
  };
  signatureDishes: string[];
  customerRating: number;
  services: {
    delivery: boolean;
    takeout: boolean;
    dineIn: boolean;
    reservations: boolean;
  };
  dressCode?: string;
  reservationPolicy: string;
  specialFeatures: string[];
  contact: {
    phone: string;
    email?: string;
    website?: string;
  };
  establishedYear: number;
  description: string;
  averageWaitTime: string;
  popularTimes: string[];
  paymentMethods: string[];
  photos: {
    exterior: string;
    interior: string[];
    dishes: string[];
  };
}

export const detailedRestaurantList: DetailedRestaurant[] = [
  {
    id: 'ambrosia-gulshan',
    name: 'Ambrosia Restaurant',
    cuisineType: ['Continental', 'Italian', 'Mediterranean'],
    priceRange: '$$$',
    location: {
      address: 'House 11, Road 53, Gulshan 2, Dhaka 1212',
      area: 'Gulshan',
      coordinates: { lat: 23.7925, lng: 90.4078 },
      landmarks: ['Gulshan 2 Circle', 'American Club', 'Gulshan Lake Park']
    },
    hoursOfOperation: {
      monday: { open: '12:00', close: '23:00' },
      tuesday: { open: '12:00', close: '23:00' },
      wednesday: { open: '12:00', close: '23:00' },
      thursday: { open: '12:00', close: '23:00' },
      friday: { open: '12:00', close: '23:30' },
      saturday: { open: '12:00', close: '23:30' },
      sunday: { open: '12:00', close: '23:00' }
    },
    signatureDishes: ['Grilled Salmon with Herb Butter', 'Beef Tenderloin', 'Truffle Pasta', 'Chocolate Lava Cake'],
    customerRating: 4.6,
    services: {
      delivery: true,
      takeout: true,
      dineIn: true,
      reservations: true
    },
    dressCode: 'Smart Casual',
    reservationPolicy: 'Recommended, especially for dinner. Walk-ins welcome based on availability.',
    specialFeatures: ['Outdoor Terrace', 'Wine Bar', 'Private Dining Room', 'Live Jazz on Weekends'],
    contact: {
      phone: '+880 1711-234567',
      email: 'info@ambrosia.com.bd',
      website: 'www.ambrosia.com.bd'
    },
    establishedYear: 2010,
    description: 'Upscale continental restaurant known for its sophisticated ambiance and expertly prepared dishes.',
    averageWaitTime: '15-25 minutes',
    popularTimes: ['7:00 PM - 9:00 PM', 'Friday & Saturday evenings'],
    paymentMethods: ['Cash', 'Credit Card', 'Debit Card', 'bKash', 'Nagad'],
    photos: {
      exterior: 'https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=800',
      interior: ['https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=800'],
      dishes: ['https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=800']
    }
  },
  {
    id: 'bfc-dhanmondi',
    name: 'Bengal Fish Curry',
    cuisineType: ['Bengali', 'Seafood', 'Traditional'],
    priceRange: '$$',
    location: {
      address: 'House 67, Road 15A, Dhanmondi, Dhaka 1209',
      area: 'Dhanmondi',
      coordinates: { lat: 23.7489, lng: 90.3698 },
      landmarks: ['Dhanmondi Lake', 'Rabindra Sarobar', 'TSC']
    },
    hoursOfOperation: {
      monday: { open: '11:30', close: '22:30' },
      tuesday: { open: '11:30', close: '22:30' },
      wednesday: { open: '11:30', close: '22:30' },
      thursday: { open: '11:30', close: '22:30' },
      friday: { open: '12:00', close: '23:00' },
      saturday: { open: '11:30', close: '23:00' },
      sunday: { open: '11:30', close: '22:30' }
    },
    signatureDishes: ['Hilsa Fish Curry', 'Chingri Malai Curry', 'Rui Fish Kalia', 'Mishti Doi'],
    customerRating: 4.8,
    services: {
      delivery: true,
      takeout: true,
      dineIn: true,
      reservations: false
    },
    reservationPolicy: 'First come, first served. No reservations accepted.',
    specialFeatures: ['Traditional Bengali Decor', 'Family-friendly', 'Authentic Recipes', 'Fresh Fish Daily'],
    contact: {
      phone: '+880 1712-345678',
      email: 'bengalfishcurry@gmail.com'
    },
    establishedYear: 2005,
    description: 'Authentic Bengali restaurant specializing in traditional fish curries and regional delicacies.',
    averageWaitTime: '10-20 minutes',
    popularTimes: ['12:00 PM - 2:00 PM', '7:00 PM - 9:00 PM'],
    paymentMethods: ['Cash', 'bKash', 'Nagad', 'Rocket'],
    photos: {
      exterior: 'https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=800',
      interior: ['https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=800'],
      dishes: ['https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=800']
    }
  },
  {
    id: 'chillox-dhanmondi',
    name: 'Chillox',
    cuisineType: ['Continental', 'American', 'Fast Food'],
    priceRange: '$$',
    location: {
      address: 'House 11, Road 2, Dhanmondi, Dhaka 1205',
      area: 'Dhanmondi',
      coordinates: { lat: 23.7515, lng: 90.3740 },
      landmarks: ['Dhanmondi 27', 'New Market', 'Elephant Road']
    },
    hoursOfOperation: {
      monday: { open: '12:00', close: '23:30' },
      tuesday: { open: '12:00', close: '23:30' },
      wednesday: { open: '12:00', close: '23:30' },
      thursday: { open: '12:00', close: '23:30' },
      friday: { open: '12:00', close: '00:30' },
      saturday: { open: '12:00', close: '00:30' },
      sunday: { open: '12:00', close: '23:30' }
    },
    signatureDishes: ['Chillox Burger', 'BBQ Wings', 'Loaded Nachos', 'Chocolate Brownie'],
    customerRating: 4.4,
    services: {
      delivery: true,
      takeout: true,
      dineIn: true,
      reservations: false
    },
    reservationPolicy: 'Walk-ins only. No reservations required.',
    specialFeatures: ['Casual Dining', 'Sports Bar', 'Live Sports Screening', 'Youth-friendly'],
    contact: {
      phone: '+880 1716-678901',
      email: 'info@chillox.com'
    },
    establishedYear: 2012,
    description: 'Trendy casual dining restaurant popular among young crowd for burgers, wings, and continental food.',
    averageWaitTime: '15-25 minutes',
    popularTimes: ['6:00 PM - 10:00 PM', 'Weekend evenings'],
    paymentMethods: ['Cash', 'Credit Card', 'bKash', 'Nagad'],
    photos: {
      exterior: 'https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=800',
      interior: ['https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=800'],
      dishes: ['https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800']
    }
  },
  {
    id: 'dhaba-express',
    name: 'Dhaba Express',
    cuisineType: ['Indian', 'Punjabi', 'North Indian'],
    priceRange: '$$',
    location: {
      address: 'Shop 12-14, Bashundhara City Mall, Panthapath, Dhaka 1205',
      area: 'Panthapath',
      coordinates: { lat: 23.7516, lng: 90.3785 },
      landmarks: ['Bashundhara City', 'Karwan Bazar', 'Farmgate']
    },
    hoursOfOperation: {
      monday: { open: '11:00', close: '22:00' },
      tuesday: { open: '11:00', close: '22:00' },
      wednesday: { open: '11:00', close: '22:00' },
      thursday: { open: '11:00', close: '22:00' },
      friday: { open: '11:00', close: '22:30' },
      saturday: { open: '11:00', close: '22:30' },
      sunday: { open: '11:00', close: '22:00' }
    },
    signatureDishes: ['Butter Chicken', 'Dal Makhani', 'Tandoori Naan', 'Kulfi'],
    customerRating: 4.3,
    services: {
      delivery: true,
      takeout: true,
      dineIn: true,
      reservations: false
    },
    reservationPolicy: 'No reservations. Queue system during peak hours.',
    specialFeatures: ['Food Court Setting', 'Quick Service', 'Authentic Tandoor', 'Mall Location'],
    contact: {
      phone: '+880 1717-789012',
      email: 'dhaba@bashundhara.com'
    },
    establishedYear: 2015,
    description: 'Authentic North Indian dhaba-style restaurant serving traditional Punjabi cuisine in a modern setting.',
    averageWaitTime: '10-15 minutes',
    popularTimes: ['1:00 PM - 3:00 PM', '7:00 PM - 9:00 PM'],
    paymentMethods: ['Cash', 'Credit Card', 'Debit Card', 'bKash'],
    photos: {
      exterior: 'https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=800',
      interior: ['https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=800'],
      dishes: ['https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=800']
    }
  },
  {
    id: 'fakruddin-biryani',
    name: 'Fakruddin Biryani',
    cuisineType: ['Bengali', 'Mughlai', 'Biryani'],
    priceRange: '$$$',
    location: {
      address: 'Shop 1-3, Dhanmondi 27, Dhaka 1209',
      area: 'Dhanmondi',
      coordinates: { lat: 23.7461, lng: 90.3742 },
      landmarks: ['Dhanmondi 27', 'Abahani Club', 'Dhanmondi Lake']
    },
    hoursOfOperation: {
      monday: { open: '11:30', close: '23:30' },
      tuesday: { open: '11:30', close: '23:30' },
      wednesday: { open: '11:30', close: '23:30' },
      thursday: { open: '11:30', close: '23:30' },
      friday: { open: '12:00', close: '00:00' },
      saturday: { open: '11:30', close: '00:00' },
      sunday: { open: '11:30', close: '23:30' }
    },
    signatureDishes: ['Kacchi Biryani', 'Mutton Rezala', 'Chicken Roast', 'Borhani'],
    customerRating: 4.7,
    services: {
      delivery: true,
      takeout: true,
      dineIn: true,
      reservations: true
    },
    reservationPolicy: 'Reservations recommended for groups of 6+. Call ahead during weekends.',
    specialFeatures: ['Premium Biryani House', 'Traditional Dum Cooking', 'Family Dining', 'Catering Services'],
    contact: {
      phone: '+880 1713-345678',
      email: 'info@fakruddinbiryani.com',
      website: 'www.fakruddinbiryani.com'
    },
    establishedYear: 2008,
    description: 'Premium biryani house known for authentic Dhaka-style kacchi biryani and traditional Mughlai cuisine.',
    averageWaitTime: '25-35 minutes',
    popularTimes: ['12:30 PM - 2:30 PM', '7:30 PM - 9:30 PM'],
    paymentMethods: ['Cash', 'Credit Card', 'bKash', 'Nagad', 'Rocket'],
    photos: {
      exterior: 'https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=800',
      interior: ['https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=800'],
      dishes: ['https://images.pexels.com/photos/11220209/pexels-photo-11220209.jpeg?auto=compress&cs=tinysrgb&w=800']
    }
  },
  {
    id: 'gloria-jeans',
    name: "Gloria Jean's Coffees",
    cuisineType: ['Cafe', 'Coffee', 'Light Meals'],
    priceRange: '$$',
    location: {
      address: 'Level 4, Jamuna Future Park, Kuril, Dhaka 1229',
      area: 'Kuril',
      coordinates: { lat: 23.8225, lng: 90.4314 },
      landmarks: ['Jamuna Future Park', 'Kuril Flyover', 'Baridhara']
    },
    hoursOfOperation: {
      monday: { open: '10:00', close: '22:00' },
      tuesday: { open: '10:00', close: '22:00' },
      wednesday: { open: '10:00', close: '22:00' },
      thursday: { open: '10:00', close: '22:00' },
      friday: { open: '10:00', close: '22:30' },
      saturday: { open: '10:00', close: '22:30' },
      sunday: { open: '10:00', close: '22:00' }
    },
    signatureDishes: ['Signature Coffee Blends', 'Chicken Caesar Wrap', 'Chocolate Muffin', 'Iced Frappe'],
    customerRating: 4.2,
    services: {
      delivery: false,
      takeout: true,
      dineIn: true,
      reservations: false
    },
    reservationPolicy: 'No reservations. First come, first served.',
    specialFeatures: ['Free WiFi', 'Study-friendly', 'Mall Location', 'Coffee Beans for Sale'],
    contact: {
      phone: '+880 1718-901234',
      email: 'dhaka@gloriajeans.com'
    },
    establishedYear: 2016,
    description: 'International coffee chain offering premium coffee blends and light meals in a comfortable setting.',
    averageWaitTime: '5-10 minutes',
    popularTimes: ['3:00 PM - 6:00 PM', 'Weekend afternoons'],
    paymentMethods: ['Cash', 'Credit Card', 'Debit Card'],
    photos: {
      exterior: 'https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=800',
      interior: ['https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=800'],
      dishes: ['https://images.pexels.com/photos/4397925/pexels-photo-4397925.jpeg?auto=compress&cs=tinysrgb&w=800']
    }
  },
  {
    id: 'haji-biriyani',
    name: 'Haji Biriyani',
    cuisineType: ['Bengali', 'Traditional', 'Biryani'],
    priceRange: '$$$',
    location: {
      address: 'Nazira Bazar, Old Dhaka, Dhaka 1100',
      area: 'Old Dhaka',
      coordinates: { lat: 23.7104, lng: 90.4074 },
      landmarks: ['Nazira Bazar', 'Lalbagh Fort', 'Ahsan Manzil']
    },
    hoursOfOperation: {
      monday: { open: '11:00', close: '22:00' },
      tuesday: { open: '11:00', close: '22:00' },
      wednesday: { open: '11:00', close: '22:00' },
      thursday: { open: '11:00', close: '22:00' },
      friday: { open: '12:00', close: '22:30' },
      saturday: { open: '11:00', close: '22:30' },
      sunday: { open: '11:00', close: '22:00' }
    },
    signatureDishes: ['Legendary Biryani', 'Mutton Curry', 'Chicken Roast', 'Traditional Sweets'],
    customerRating: 4.9,
    services: {
      delivery: true,
      takeout: true,
      dineIn: true,
      reservations: false
    },
    reservationPolicy: 'No reservations. Traditional queue system.',
    specialFeatures: ['Heritage Restaurant (Since 1939)', 'Traditional Cooking Methods', 'Cultural Landmark', 'Tourist Destination'],
    contact: {
      phone: '+880 1714-456789',
      email: 'hajibiriyani1939@gmail.com'
    },
    establishedYear: 1939,
    description: 'Legendary biryani house from Old Dhaka, serving authentic traditional biryani since 1939.',
    averageWaitTime: '30-45 minutes',
    popularTimes: ['12:00 PM - 2:00 PM', '6:00 PM - 8:00 PM'],
    paymentMethods: ['Cash', 'bKash', 'Nagad'],
    photos: {
      exterior: 'https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=800',
      interior: ['https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=800'],
      dishes: ['https://images.pexels.com/photos/11220209/pexels-photo-11220209.jpeg?auto=compress&cs=tinysrgb&w=800']
    }
  },
  {
    id: 'izumi-japanese',
    name: 'Izumi Japanese Restaurant',
    cuisineType: ['Japanese', 'Sushi', 'Asian'],
    priceRange: '$$$$',
    location: {
      address: 'House 32, Road 11, Block E, Banani, Dhaka 1213',
      area: 'Banani',
      coordinates: { lat: 23.7946, lng: 90.4058 },
      landmarks: ['Banani 11', 'Banani Club', 'Kemal Ataturk Avenue']
    },
    hoursOfOperation: {
      monday: { open: '12:00', close: '22:30' },
      tuesday: { open: '12:00', close: '22:30' },
      wednesday: { open: '12:00', close: '22:30' },
      thursday: { open: '12:00', close: '22:30' },
      friday: { open: '12:00', close: '23:00' },
      saturday: { open: '12:00', close: '23:00' },
      sunday: { open: '12:00', close: '22:30' }
    },
    signatureDishes: ['Fresh Sushi Platter', 'Chicken Teriyaki', 'Miso Ramen', 'Tempura Set'],
    customerRating: 4.5,
    services: {
      delivery: true,
      takeout: true,
      dineIn: true,
      reservations: true
    },
    dressCode: 'Smart Casual',
    reservationPolicy: 'Reservations highly recommended. 24-hour cancellation policy.',
    specialFeatures: ['Authentic Japanese Chef', 'Fresh Sushi Bar', 'Private Tatami Rooms', 'Sake Collection'],
    contact: {
      phone: '+880 1719-012345',
      email: 'reservations@izumi.com.bd',
      website: 'www.izumi.com.bd'
    },
    establishedYear: 2014,
    description: 'Upscale Japanese restaurant with authentic cuisine prepared by Japanese chefs using imported ingredients.',
    averageWaitTime: '20-30 minutes',
    popularTimes: ['7:00 PM - 9:00 PM', 'Weekend dinners'],
    paymentMethods: ['Cash', 'Credit Card', 'Debit Card', 'bKash'],
    photos: {
      exterior: 'https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=800',
      interior: ['https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=800'],
      dishes: ['https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg?auto=compress&cs=tinysrgb&w=800']
    }
  },
  {
    id: 'kacchi-bhai',
    name: 'Kacchi Bhai',
    cuisineType: ['Bengali', 'Mughlai', 'Traditional'],
    priceRange: '$$',
    location: {
      address: 'House 45, Road 27, Block K, Banani, Dhaka 1213',
      area: 'Banani',
      coordinates: { lat: 23.7937, lng: 90.4066 },
      landmarks: ['Banani 27', 'Banani Cemetery', 'Kemal Ataturk Avenue']
    },
    hoursOfOperation: {
      monday: { open: '11:00', close: '23:00' },
      tuesday: { open: '11:00', close: '23:00' },
      wednesday: { open: '11:00', close: '23:00' },
      thursday: { open: '11:00', close: '23:00' },
      friday: { open: '12:00', close: '23:30' },
      saturday: { open: '11:00', close: '23:30' },
      sunday: { open: '11:00', close: '23:00' }
    },
    signatureDishes: ['Kacchi Biryani (Mutton)', 'Chicken Kacchi', 'Beef Rezala', 'Borhani'],
    customerRating: 4.8,
    services: {
      delivery: true,
      takeout: true,
      dineIn: true,
      reservations: true
    },
    reservationPolicy: 'Reservations accepted for groups of 4+. Walk-ins welcome.',
    specialFeatures: ['Family-friendly', 'Traditional Dum Cooking', 'Authentic Recipes', 'Catering Available'],
    contact: {
      phone: '+880 1711-123456',
      email: 'info@kacchibhai.com',
      website: 'www.kacchibhai.com'
    },
    establishedYear: 2015,
    description: 'Popular biryani chain known for authentic Bangladeshi kacchi biryani and traditional dishes.',
    averageWaitTime: '20-30 minutes',
    popularTimes: ['1:00 PM - 3:00 PM', '7:00 PM - 9:00 PM'],
    paymentMethods: ['Cash', 'bKash', 'Nagad', 'Rocket', 'Credit Card'],
    photos: {
      exterior: 'https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=800',
      interior: ['https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=800'],
      dishes: ['https://images.pexels.com/photos/11220209/pexels-photo-11220209.jpeg?auto=compress&cs=tinysrgb&w=800']
    }
  },
  {
    id: 'la-bella-italia',
    name: 'La Bella Italia',
    cuisineType: ['Italian', 'Mediterranean', 'European'],
    priceRange: '$$$',
    location: {
      address: 'House 123, Road 5, Gulshan 2, Dhaka 1212',
      area: 'Gulshan',
      coordinates: { lat: 23.7925, lng: 90.4078 },
      landmarks: ['Gulshan 2 Circle', 'American Embassy', 'Gulshan Lake']
    },
    hoursOfOperation: {
      monday: { open: '11:00', close: '23:00' },
      tuesday: { open: '11:00', close: '23:00' },
      wednesday: { open: '11:00', close: '23:00' },
      thursday: { open: '11:00', close: '23:00' },
      friday: { open: '11:00', close: '23:30' },
      saturday: { open: '11:00', close: '23:30' },
      sunday: { open: '11:00', close: '23:00' }
    },
    signatureDishes: ['Margherita Pizza', 'Spaghetti Carbonara', 'Osso Buco', 'Tiramisu'],
    customerRating: 4.6,
    services: {
      delivery: true,
      takeout: true,
      dineIn: true,
      reservations: true
    },
    dressCode: 'Casual to Smart Casual',
    reservationPolicy: 'Reservations recommended for dinner. Online booking available.',
    specialFeatures: ['Wood-fired Pizza Oven', 'Italian Chef', 'Wine Selection', 'Romantic Ambiance'],
    contact: {
      phone: '+880 1719-123456',
      email: 'info@labellaitaliabd.com',
      website: 'www.labellaitaliabd.com'
    },
    establishedYear: 2011,
    description: 'Authentic Italian restaurant with wood-fired pizzas and traditional pasta dishes in an elegant setting.',
    averageWaitTime: '15-25 minutes',
    popularTimes: ['7:00 PM - 9:00 PM', 'Weekend evenings'],
    paymentMethods: ['Cash', 'Credit Card', 'Debit Card', 'bKash', 'Nagad'],
    photos: {
      exterior: 'https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=800',
      interior: ['https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=800'],
      dishes: ['https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=800']
    }
  },
  {
    id: 'mezban-uttara',
    name: 'Mezban',
    cuisineType: ['Bengali', 'Indian', 'Mughlai'],
    priceRange: '$$',
    location: {
      address: 'House 25, Road 12, Sector 6, Uttara, Dhaka 1230',
      area: 'Uttara',
      coordinates: { lat: 23.8759, lng: 90.3795 },
      landmarks: ['Uttara Sector 6', 'Rajlakshmi Complex', 'Uttara Town Hall']
    },
    hoursOfOperation: {
      monday: { open: '11:30', close: '23:00' },
      tuesday: { open: '11:30', close: '23:00' },
      wednesday: { open: '11:30', close: '23:00' },
      thursday: { open: '11:30', close: '23:00' },
      friday: { open: '12:00', close: '23:30' },
      saturday: { open: '11:30', close: '23:30' },
      sunday: { open: '11:30', close: '23:00' }
    },
    signatureDishes: ['Mezban Special Biryani', 'Mutton Bhuna', 'Fish Curry', 'Kheer'],
    customerRating: 4.4,
    services: {
      delivery: true,
      takeout: true,
      dineIn: true,
      reservations: false
    },
    reservationPolicy: 'No reservations. First come, first served basis.',
    specialFeatures: ['Family Restaurant', 'Large Portions', 'Traditional Recipes', 'Affordable Pricing'],
    contact: {
      phone: '+880 1720-234567',
      email: 'mezban.uttara@gmail.com'
    },
    establishedYear: 2009,
    description: 'Popular family restaurant in Uttara known for generous portions and traditional Bengali-Mughlai cuisine.',
    averageWaitTime: '15-25 minutes',
    popularTimes: ['1:00 PM - 3:00 PM', '7:30 PM - 9:30 PM'],
    paymentMethods: ['Cash', 'bKash', 'Nagad', 'Credit Card'],
    photos: {
      exterior: 'https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=800',
      interior: ['https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=800'],
      dishes: ['https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=800']
    }
  },
  {
    id: 'north-end-coffee',
    name: 'North End Coffee Roasters',
    cuisineType: ['Cafe', 'Coffee', 'Breakfast'],
    priceRange: '$$',
    location: {
      address: 'House 78, Road 11A, Dhanmondi, Dhaka 1209',
      area: 'Dhanmondi',
      coordinates: { lat: 23.7498, lng: 90.3712 },
      landmarks: ['Dhanmondi 11A', 'Shishu Park', 'Science Laboratory']
    },
    hoursOfOperation: {
      monday: { open: '07:00', close: '22:00' },
      tuesday: { open: '07:00', close: '22:00' },
      wednesday: { open: '07:00', close: '22:00' },
      thursday: { open: '07:00', close: '22:00' },
      friday: { open: '07:00', close: '22:30' },
      saturday: { open: '08:00', close: '22:30' },
      sunday: { open: '08:00', close: '22:00' }
    },
    signatureDishes: ['Specialty Coffee Blends', 'Avocado Toast', 'Pancakes', 'Cold Brew'],
    customerRating: 4.7,
    services: {
      delivery: true,
      takeout: true,
      dineIn: true,
      reservations: false
    },
    reservationPolicy: 'No reservations. Communal seating available.',
    specialFeatures: ['Artisan Coffee', 'Free WiFi', 'Study-friendly', 'Local Coffee Beans', 'Minimalist Decor'],
    contact: {
      phone: '+880 1721-345678',
      email: 'hello@northendcoffee.com',
      website: 'www.northendcoffee.com'
    },
    establishedYear: 2018,
    description: 'Specialty coffee roasters offering artisan coffee and healthy breakfast options in a minimalist setting.',
    averageWaitTime: '5-15 minutes',
    popularTimes: ['8:00 AM - 10:00 AM', '3:00 PM - 6:00 PM'],
    paymentMethods: ['Cash', 'Credit Card', 'bKash', 'Nagad'],
    photos: {
      exterior: 'https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=800',
      interior: ['https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=800'],
      dishes: ['https://images.pexels.com/photos/4397925/pexels-photo-4397925.jpeg?auto=compress&cs=tinysrgb&w=800']
    }
  },
  {
    id: 'pizza-hut-gulshan',
    name: 'Pizza Hut',
    cuisineType: ['Italian', 'American', 'Fast Food'],
    priceRange: '$$$',
    location: {
      address: 'Gulshan Avenue, Gulshan 1, Dhaka 1212',
      area: 'Gulshan',
      coordinates: { lat: 23.7808, lng: 90.4142 },
      landmarks: ['Gulshan 1 Circle', 'American Embassy', 'Gulshan Lake']
    },
    hoursOfOperation: {
      monday: { open: '10:00', close: '23:00' },
      tuesday: { open: '10:00', close: '23:00' },
      wednesday: { open: '10:00', close: '23:00' },
      thursday: { open: '10:00', close: '23:00' },
      friday: { open: '10:00', close: '00:00' },
      saturday: { open: '10:00', close: '00:00' },
      sunday: { open: '10:00', close: '23:00' }
    },
    signatureDishes: ['Pan Pizza', 'Stuffed Crust Pizza', 'Chicken Wings', 'Garlic Bread'],
    customerRating: 4.3,
    services: {
      delivery: true,
      takeout: true,
      dineIn: true,
      reservations: true
    },
    reservationPolicy: 'Reservations accepted for groups. Online ordering available.',
    specialFeatures: ['International Chain', 'Family-friendly', 'Birthday Parties', 'Consistent Quality'],
    contact: {
      phone: '+880 1715-567890',
      email: 'gulshan@pizzahut.com.bd',
      website: 'www.pizzahut.com.bd'
    },
    establishedYear: 2008,
    description: 'International pizza chain offering a wide variety of pizzas, pasta, and sides with consistent quality.',
    averageWaitTime: '20-30 minutes',
    popularTimes: ['6:00 PM - 9:00 PM', 'Weekend evenings'],
    paymentMethods: ['Cash', 'Credit Card', 'Debit Card', 'bKash', 'Nagad'],
    photos: {
      exterior: 'https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=800',
      interior: ['https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=800'],
      dishes: ['https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=800']
    }
  },
  {
    id: 'star-kabab',
    name: 'Star Kabab & Restaurant',
    cuisineType: ['Mughlai', 'Pakistani', 'Kebab'],
    priceRange: '$$',
    location: {
      address: '54 Purana Paltan, Dhaka 1000',
      area: 'Purana Paltan',
      coordinates: { lat: 23.7334, lng: 90.4182 },
      landmarks: ['Paltan Maidan', 'Baitul Mukarram', 'GPO']
    },
    hoursOfOperation: {
      monday: { open: '12:00', close: '00:00' },
      tuesday: { open: '12:00', close: '00:00' },
      wednesday: { open: '12:00', close: '00:00' },
      thursday: { open: '12:00', close: '00:00' },
      friday: { open: '12:00', close: '01:00' },
      saturday: { open: '12:00', close: '01:00' },
      sunday: { open: '12:00', close: '00:00' }
    },
    signatureDishes: ['Seekh Kebab', 'Chicken Tikka', 'Mutton Biryani', 'Naan'],
    customerRating: 4.6,
    services: {
      delivery: true,
      takeout: true,
      dineIn: true,
      reservations: false
    },
    reservationPolicy: 'No reservations. Traditional queue system during peak hours.',
    specialFeatures: ['Famous Since 1991', 'Charcoal Grill', 'Late Night Dining', 'Authentic Kebabs'],
    contact: {
      phone: '+880 1712-234567',
      email: 'info@starkabab.com',
      website: 'www.starkabab.com'
    },
    establishedYear: 1991,
    description: 'Legendary kebab house famous for authentic Mughlai kebabs and traditional Pakistani cuisine since 1991.',
    averageWaitTime: '15-25 minutes',
    popularTimes: ['8:00 PM - 11:00 PM', 'Late night dining'],
    paymentMethods: ['Cash', 'bKash', 'Nagad', 'Credit Card'],
    photos: {
      exterior: 'https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=800',
      interior: ['https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=800'],
      dishes: ['https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=800']
    }
  },
  {
    id: 'thai-garden',
    name: 'Thai Garden',
    cuisineType: ['Thai', 'Asian', 'Seafood'],
    priceRange: '$$$',
    location: {
      address: 'House 58, Road 15A, Dhanmondi, Dhaka 1209',
      area: 'Dhanmondi',
      coordinates: { lat: 23.7489, lng: 90.3698 },
      landmarks: ['Dhanmondi 15A', 'Abahani Club', 'Dhanmondi Lake']
    },
    hoursOfOperation: {
      monday: { open: '12:00', close: '22:30' },
      tuesday: { open: '12:00', close: '22:30' },
      wednesday: { open: '12:00', close: '22:30' },
      thursday: { open: '12:00', close: '22:30' },
      friday: { open: '12:00', close: '23:00' },
      saturday: { open: '12:00', close: '23:00' },
      sunday: { open: '12:00', close: '22:30' }
    },
    signatureDishes: ['Pad Thai', 'Green Curry', 'Tom Yum Soup', 'Mango Sticky Rice'],
    customerRating: 4.6,
    services: {
      delivery: true,
      takeout: true,
      dineIn: true,
      reservations: true
    },
    dressCode: 'Casual',
    reservationPolicy: 'Reservations recommended for dinner. Call ahead for groups of 6+.',
    specialFeatures: ['Authentic Thai Chef', 'Fresh Ingredients', 'Spice Level Customization', 'Thai Decor'],
    contact: {
      phone: '+880 1718-890123',
      email: 'info@thaigarden.com.bd',
      website: 'www.thaigarden.com.bd'
    },
    establishedYear: 2013,
    description: 'Authentic Thai restaurant with traditional recipes and fresh ingredients prepared by Thai chefs.',
    averageWaitTime: '20-30 minutes',
    popularTimes: ['7:00 PM - 9:00 PM', 'Weekend dinners'],
    paymentMethods: ['Cash', 'Credit Card', 'bKash', 'Nagad'],
    photos: {
      exterior: 'https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=800',
      interior: ['https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=800'],
      dishes: ['https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg?auto=compress&cs=tinysrgb&w=800']
    }
  }
];

// Helper functions for filtering and searching
export const getRestaurantsByPriceRange = (priceRange: string): DetailedRestaurant[] => {
  return detailedRestaurantList.filter(restaurant => restaurant.priceRange === priceRange);
};

export const getRestaurantsByCuisine = (cuisine: string): DetailedRestaurant[] => {
  return detailedRestaurantList.filter(restaurant => 
    restaurant.cuisineType.some(type => type.toLowerCase().includes(cuisine.toLowerCase()))
  );
};

export const getRestaurantsByArea = (area: string): DetailedRestaurant[] => {
  return detailedRestaurantList.filter(restaurant => 
    restaurant.location.area.toLowerCase().includes(area.toLowerCase())
  );
};

export const getRestaurantsByRating = (minRating: number): DetailedRestaurant[] => {
  return detailedRestaurantList.filter(restaurant => restaurant.customerRating >= minRating);
};

export const searchRestaurants = (query: string): DetailedRestaurant[] => {
  const lowercaseQuery = query.toLowerCase();
  return detailedRestaurantList.filter(restaurant =>
    restaurant.name.toLowerCase().includes(lowercaseQuery) ||
    restaurant.cuisineType.some(cuisine => cuisine.toLowerCase().includes(lowercaseQuery)) ||
    restaurant.signatureDishes.some(dish => dish.toLowerCase().includes(lowercaseQuery)) ||
    restaurant.location.area.toLowerCase().includes(lowercaseQuery)
  );
};

export const getOpenRestaurants = (): DetailedRestaurant[] => {
  const now = new Date();
  const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
  const currentTime = now.getHours() * 100 + now.getMinutes();

  return detailedRestaurantList.filter(restaurant => {
    const todayHours = restaurant.hoursOfOperation[currentDay];
    if (!todayHours || todayHours.closed) return false;

    const openTime = parseInt(todayHours.open.replace(':', ''));
    const closeTime = parseInt(todayHours.close.replace(':', ''));

    return currentTime >= openTime && currentTime <= closeTime;
  });
};