export interface RestaurantProfile {
  id: string;
  name: string;
  cuisineType: string[];
  specialties: string[];
  location: {
    fullAddress: string;
    city: string;
    state: string;
    postalCode: string;
    coordinates: { lat: number; lng: number };
    zone: string;
    landmarks: string[];
  };
  contact: {
    phone: string;
    email: string;
    website?: string;
    socialMedia?: {
      facebook?: string;
      instagram?: string;
      twitter?: string;
    };
  };
  hoursOfOperation: {
    [key: string]: { open: string; close: string; closed?: boolean };
  };
  services: {
    delivery: boolean;
    takeout: boolean;
    dineIn: boolean;
    reservations: boolean;
    catering: boolean;
    privateEvents: boolean;
    onlineOrdering: boolean;
    curbsidePickup: boolean;
  };
  ambiance: {
    seatingCapacity?: number;
    atmosphere: string[];
    musicType?: string;
    dressCode?: string;
    wheelchairAccessible: boolean;
    parkingAvailable: boolean;
    wifiAvailable: boolean;
  };
  paymentMethods: string[];
  certifications: string[];
  awards: string[];
  establishedYear: number;
  ownerChef: string;
  description: string;
  signatureDishes: string[];
  priceRange: '$' | '$$' | '$$$' | '$$$$';
  averageRating: number;
  totalReviews: number;
  photos: {
    exterior: string;
    interior: string[];
    kitchen?: string;
    dishes: string[];
  };
  menu: RestaurantMenu;
}

export interface RestaurantMenu {
  lastUpdated: string;
  currency: string;
  priceSubjectToChange: boolean;
  seasonalItems: boolean;
  categories: MenuCategory[];
}

export interface MenuCategory {
  id: string;
  name: string;
  description?: string;
  items: DetailedMenuItem[];
}

export interface DetailedMenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number; // For discounted items
  portionSize: string;
  preparationTime: string;
  spiceLevel?: 'mild' | 'medium' | 'hot' | 'extra-hot';
  dietaryIcons: string[]; // 🌱(Vegan), 🥕(Vegetarian), ⚡(Spicy), GF(Gluten-Free), etc.
  allergens: string[];
  nutritionalInfo?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
    sodium: number;
  };
  ingredients: string[];
  customizations: {
    available: boolean;
    options?: string[];
    extraCharges?: { option: string; price: number }[];
  };
  availability: {
    allDay: boolean;
    timeSlots?: string[];
    daysAvailable: string[];
  };
  popularity: 'signature' | 'popular' | 'new' | 'seasonal' | 'limited' | 'regular';
  photos: string[];
  reviews?: {
    averageRating: number;
    totalReviews: number;
    highlights: string[];
  };
  pairings?: {
    recommendedWith: string[];
    beveragePairings: string[];
  };
}

export const restaurantProfiles: RestaurantProfile[] = [
  {
    id: 'kacchi-bhai-dhanmondi',
    name: 'Kacchi Bhai - Dhanmondi',
    cuisineType: ['Bengali', 'Mughlai', 'Traditional'],
    specialties: ['Kacchi Biryani', 'Mutton Rezala', 'Beef Bhuna', 'Traditional Sweets'],
    location: {
      fullAddress: 'House 45, Road 27, Block K, Dhanmondi, Dhaka 1209, Bangladesh',
      city: 'Dhaka',
      state: 'Dhaka Division',
      postalCode: '1209',
      coordinates: { lat: 23.7461, lng: 90.3742 },
      zone: 'dhaka-central',
      landmarks: ['Dhanmondi Lake', 'Rabindra Sarobar', 'Dhanmondi 27 Market']
    },
    contact: {
      phone: '+880 1711-123456',
      email: 'info@kacchibhai.com',
      website: 'www.kacchibhai.com',
      socialMedia: {
        facebook: 'facebook.com/kacchibhai',
        instagram: '@kacchibhai_official'
      }
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
    services: {
      delivery: true,
      takeout: true,
      dineIn: true,
      reservations: true,
      catering: true,
      privateEvents: true,
      onlineOrdering: true,
      curbsidePickup: true
    },
    ambiance: {
      seatingCapacity: 120,
      atmosphere: ['family-friendly', 'traditional', 'casual dining', 'authentic'],
      musicType: 'traditional Bengali',
      wheelchairAccessible: true,
      parkingAvailable: true,
      wifiAvailable: true
    },
    paymentMethods: ['Cash', 'bKash', 'Nagad', 'Rocket', 'Credit Card', 'Debit Card'],
    certifications: ['Halal Certified', 'Food Safety Certified', 'ISO 22000'],
    awards: ['Best Biryani 2023', 'Traditional Food Excellence Award', 'Customer Choice Award'],
    establishedYear: 2015,
    ownerChef: 'Chef Abdul Rahman',
    description: 'Authentic Bengali and Mughlai cuisine restaurant specializing in traditional Kacchi Biryani. We use age-old recipes passed down through generations, premium basmati rice, and the finest spices to create an unforgettable dining experience.',
    signatureDishes: ['Kacchi Biryani (Mutton)', 'Beef Rezala', 'Chicken Roast', 'Borhani'],
    priceRange: '$$',
    averageRating: 4.8,
    totalReviews: 2847,
    photos: {
      exterior: 'https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=800',
      interior: [
        'https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      kitchen: 'https://images.pexels.com/photos/2313686/pexels-photo-2313686.jpeg?auto=compress&cs=tinysrgb&w=800',
      dishes: [
        'https://images.pexels.com/photos/11220209/pexels-photo-11220209.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=800'
      ]
    },
    menu: {
      lastUpdated: '2024-01-15',
      currency: 'BDT',
      priceSubjectToChange: true,
      seasonalItems: true,
      categories: [
        {
          id: 'signature-biryani',
          name: 'Signature Biryani ⭐',
          description: 'Our world-famous Kacchi Biryani prepared with traditional dum cooking method',
          items: [
            {
              id: 'mutton-kacchi',
              name: 'Mutton Kacchi Biryani',
              description: 'Premium mutton pieces marinated in yogurt and spices, layered with aromatic basmati rice, cooked in traditional dum style. Served with borhani, salad, and pickle.',
              price: 450,
              portionSize: 'Large (500g)',
              preparationTime: '45-60 minutes',
              spiceLevel: 'medium',
              dietaryIcons: ['⚡'],
              allergens: ['dairy'],
              nutritionalInfo: {
                calories: 680,
                protein: 42,
                carbs: 65,
                fat: 28,
                fiber: 3,
                sodium: 890
              },
              ingredients: ['Premium mutton', 'Aged basmati rice', 'Yogurt', 'Onions', 'Garam masala', 'Saffron', 'Ghee', 'Mint', 'Coriander'],
              customizations: {
                available: true,
                options: ['Extra meat', 'Less spicy', 'Extra rice', 'No onions'],
                extraCharges: [
                  { option: 'Extra meat (100g)', price: 120 },
                  { option: 'Extra rice', price: 50 }
                ]
              },
              availability: {
                allDay: true,
                daysAvailable: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
              },
              popularity: 'signature',
              photos: [
                'https://images.pexels.com/photos/11220209/pexels-photo-11220209.jpeg?auto=compress&cs=tinysrgb&w=800'
              ],
              reviews: {
                averageRating: 4.9,
                totalReviews: 1247,
                highlights: ['Perfectly cooked meat', 'Aromatic rice', 'Authentic taste']
              },
              pairings: {
                recommendedWith: ['Borhani', 'Mixed salad', 'Pickle'],
                beveragePairings: ['Borhani', 'Lassi', 'Green tea']
              }
            },
            {
              id: 'chicken-kacchi',
              name: 'Chicken Kacchi Biryani',
              description: 'Tender chicken pieces marinated in traditional spices, layered with fragrant basmati rice. A lighter version of our signature dish.',
              price: 350,
              portionSize: 'Large (450g)',
              preparationTime: '40-50 minutes',
              spiceLevel: 'medium',
              dietaryIcons: ['⚡'],
              allergens: ['dairy'],
              nutritionalInfo: {
                calories: 620,
                protein: 38,
                carbs: 62,
                fat: 24,
                fiber: 2,
                sodium: 780
              },
              ingredients: ['Free-range chicken', 'Basmati rice', 'Yogurt', 'Onions', 'Spices', 'Saffron', 'Ghee'],
              customizations: {
                available: true,
                options: ['Extra chicken', 'Mild spice', 'Extra rice'],
                extraCharges: [
                  { option: 'Extra chicken (100g)', price: 80 }
                ]
              },
              availability: {
                allDay: true,
                daysAvailable: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
              },
              popularity: 'popular',
              photos: [
                'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=800'
              ],
              reviews: {
                averageRating: 4.7,
                totalReviews: 892,
                highlights: ['Tender chicken', 'Perfect spice level', 'Great value']
              }
            },
            {
              id: 'beef-kacchi',
              name: 'Beef Kacchi Biryani',
              description: 'Succulent beef chunks slow-cooked with aromatic spices and layered with premium basmati rice. Rich and flavorful.',
              price: 420,
              portionSize: 'Large (480g)',
              preparationTime: '50-65 minutes',
              spiceLevel: 'hot',
              dietaryIcons: ['⚡⚡'],
              allergens: ['dairy'],
              nutritionalInfo: {
                calories: 720,
                protein: 45,
                carbs: 58,
                fat: 32,
                fiber: 3,
                sodium: 920
              },
              ingredients: ['Premium beef', 'Basmati rice', 'Yogurt', 'Onions', 'Traditional spices', 'Saffron'],
              customizations: {
                available: true,
                options: ['Extra beef', 'Medium spice', 'Extra gravy']
              },
              availability: {
                allDay: true,
                daysAvailable: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
              },
              popularity: 'popular',
              photos: [
                'https://images.pexels.com/photos/11220209/pexels-photo-11220209.jpeg?auto=compress&cs=tinysrgb&w=800'
              ]
            }
          ]
        },
        {
          id: 'traditional-curries',
          name: 'Traditional Curries',
          description: 'Authentic Bengali and Mughlai curries prepared with traditional recipes',
          items: [
            {
              id: 'beef-rezala',
              name: 'Beef Rezala',
              description: 'Rich and creamy beef curry cooked in yogurt-based gravy with aromatic spices. A royal Mughlai delicacy.',
              price: 380,
              portionSize: 'Medium (300g)',
              preparationTime: '35-45 minutes',
              spiceLevel: 'medium',
              dietaryIcons: ['⚡'],
              allergens: ['dairy'],
              nutritionalInfo: {
                calories: 420,
                protein: 35,
                carbs: 12,
                fat: 28,
                fiber: 2,
                sodium: 680
              },
              ingredients: ['Premium beef', 'Yogurt', 'Onions', 'Ginger-garlic', 'Cashews', 'Cream', 'Spices'],
              customizations: {
                available: true,
                options: ['Less creamy', 'Extra spicy', 'With rice']
              },
              availability: {
                allDay: true,
                daysAvailable: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
              },
              popularity: 'signature',
              photos: [
                'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=800'
              ]
            },
            {
              id: 'chicken-roast',
              name: 'Chicken Roast',
              description: 'Traditional Bengali-style chicken curry with rich, spicy gravy. Slow-cooked to perfection with authentic spices.',
              price: 320,
              portionSize: 'Medium (350g)',
              preparationTime: '30-40 minutes',
              spiceLevel: 'hot',
              dietaryIcons: ['⚡⚡'],
              allergens: [],
              nutritionalInfo: {
                calories: 380,
                protein: 42,
                carbs: 8,
                fat: 20,
                fiber: 2,
                sodium: 720
              },
              ingredients: ['Chicken', 'Onions', 'Tomatoes', 'Ginger-garlic', 'Red chili', 'Turmeric', 'Garam masala'],
              customizations: {
                available: true,
                options: ['Medium spice', 'Extra gravy', 'Boneless']
              },
              availability: {
                allDay: true,
                daysAvailable: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
              },
              popularity: 'popular',
              photos: [
                'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=800'
              ]
            }
          ]
        },
        {
          id: 'beverages',
          name: 'Traditional Beverages',
          description: 'Refreshing drinks that perfectly complement our spicy dishes',
          items: [
            {
              id: 'borhani',
              name: 'Borhani',
              description: 'Traditional yogurt-based drink with mint, cumin, and spices. Perfect accompaniment to biryani.',
              price: 60,
              portionSize: 'Regular (250ml)',
              preparationTime: '5 minutes',
              dietaryIcons: ['🥕'],
              allergens: ['dairy'],
              nutritionalInfo: {
                calories: 120,
                protein: 6,
                carbs: 18,
                fat: 3,
                fiber: 1,
                sodium: 180
              },
              ingredients: ['Yogurt', 'Mint', 'Cumin', 'Black salt', 'Sugar', 'Ice'],
              customizations: {
                available: true,
                options: ['Less sweet', 'Extra mint', 'No ice']
              },
              availability: {
                allDay: true,
                daysAvailable: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
              },
              popularity: 'signature',
              photos: [
                'https://images.pexels.com/photos/4397925/pexels-photo-4397925.jpeg?auto=compress&cs=tinysrgb&w=800'
              ]
            },
            {
              id: 'lassi-sweet',
              name: 'Sweet Lassi',
              description: 'Creamy yogurt drink sweetened with sugar and flavored with cardamom. Cooling and refreshing.',
              price: 80,
              portionSize: 'Large (300ml)',
              preparationTime: '5 minutes',
              dietaryIcons: ['🥕'],
              allergens: ['dairy'],
              nutritionalInfo: {
                calories: 180,
                protein: 8,
                carbs: 28,
                fat: 5,
                fiber: 0,
                sodium: 120
              },
              ingredients: ['Fresh yogurt', 'Sugar', 'Cardamom', 'Rose water', 'Ice'],
              customizations: {
                available: true,
                options: ['Mango flavor', 'Less sweet', 'Extra thick']
              },
              availability: {
                allDay: true,
                daysAvailable: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
              },
              popularity: 'popular',
              photos: [
                'https://images.pexels.com/photos/4397925/pexels-photo-4397925.jpeg?auto=compress&cs=tinysrgb&w=800'
              ]
            }
          ]
        }
      ]
    }
  },
  {
    id: 'star-kabab-purana-paltan',
    name: 'Star Kabab & Restaurant',
    cuisineType: ['Mughlai', 'Pakistani', 'Indian', 'Kebab'],
    specialties: ['Seekh Kebab', 'Chicken Tikka', 'Naan', 'Karahi'],
    location: {
      fullAddress: '54 Purana Paltan, Dhaka 1000, Bangladesh',
      city: 'Dhaka',
      state: 'Dhaka Division',
      postalCode: '1000',
      coordinates: { lat: 23.7334, lng: 90.4182 },
      zone: 'dhaka-central',
      landmarks: ['Paltan Maidan', 'Baitul Mukarram', 'GPO']
    },
    contact: {
      phone: '+880 1712-234567',
      email: 'info@starkabab.com',
      website: 'www.starkabab.com'
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
    services: {
      delivery: true,
      takeout: true,
      dineIn: true,
      reservations: false,
      catering: true,
      privateEvents: false,
      onlineOrdering: true,
      curbsidePickup: true
    },
    ambiance: {
      seatingCapacity: 80,
      atmosphere: ['casual', 'traditional', 'bustling'],
      wheelchairAccessible: false,
      parkingAvailable: false,
      wifiAvailable: true
    },
    paymentMethods: ['Cash', 'bKash', 'Nagad', 'Credit Card'],
    certifications: ['Halal Certified'],
    awards: ['Best Kebab House 2022'],
    establishedYear: 1991,
    ownerChef: 'Haji Mohammad Ali',
    description: 'Famous for authentic Mughlai kebabs and traditional Pakistani cuisine since 1991. Known for our perfectly grilled seekh kebabs and aromatic biryanis.',
    signatureDishes: ['Seekh Kebab', 'Chicken Tikka', 'Mutton Biryani'],
    priceRange: '$$',
    averageRating: 4.6,
    totalReviews: 1523,
    photos: {
      exterior: 'https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=800',
      interior: [
        'https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      dishes: [
        'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=800'
      ]
    },
    menu: {
      lastUpdated: '2024-01-10',
      currency: 'BDT',
      priceSubjectToChange: true,
      seasonalItems: false,
      categories: [
        {
          id: 'kebabs',
          name: 'Grilled Kebabs ⭐',
          description: 'Freshly grilled kebabs prepared on traditional charcoal grill',
          items: [
            {
              id: 'seekh-kebab',
              name: 'Seekh Kebab',
              description: 'Minced meat kebabs seasoned with traditional spices, grilled to perfection on skewers. Served with naan and chutney.',
              price: 180,
              portionSize: '4 pieces',
              preparationTime: '20-25 minutes',
              spiceLevel: 'medium',
              dietaryIcons: ['⚡'],
              allergens: [],
              nutritionalInfo: {
                calories: 320,
                protein: 28,
                carbs: 8,
                fat: 20,
                fiber: 1,
                sodium: 580
              },
              ingredients: ['Minced beef', 'Onions', 'Ginger-garlic', 'Green chilies', 'Spices', 'Fresh herbs'],
              customizations: {
                available: true,
                options: ['Extra spicy', 'Mild', 'With extra naan']
              },
              availability: {
                allDay: true,
                daysAvailable: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
              },
              popularity: 'signature',
              photos: [
                'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=800'
              ]
            }
          ]
        }
      ]
    }
  },
  {
    id: 'pizza-hut-gulshan',
    name: 'Pizza Hut - Gulshan',
    cuisineType: ['Italian', 'American', 'Fast Food'],
    specialties: ['Pizza', 'Pasta', 'Garlic Bread', 'Wings'],
    location: {
      fullAddress: 'Gulshan Avenue, Gulshan 1, Dhaka 1212, Bangladesh',
      city: 'Dhaka',
      state: 'Dhaka Division',
      postalCode: '1212',
      coordinates: { lat: 23.7808, lng: 90.4142 },
      zone: 'dhaka-north',
      landmarks: ['Gulshan 1 Circle', 'American Embassy', 'Gulshan Lake']
    },
    contact: {
      phone: '+880 1715-567890',
      email: 'gulshan@pizzahut.com.bd',
      website: 'www.pizzahut.com.bd'
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
    services: {
      delivery: true,
      takeout: true,
      dineIn: true,
      reservations: true,
      catering: false,
      privateEvents: true,
      onlineOrdering: true,
      curbsidePickup: true
    },
    ambiance: {
      seatingCapacity: 60,
      atmosphere: ['family-friendly', 'casual', 'modern'],
      musicType: 'contemporary',
      wheelchairAccessible: true,
      parkingAvailable: true,
      wifiAvailable: true
    },
    paymentMethods: ['Cash', 'Credit Card', 'Debit Card', 'bKash', 'Nagad'],
    certifications: ['ISO 22000', 'HACCP'],
    awards: [],
    establishedYear: 2008,
    ownerChef: 'Pizza Hut International',
    description: 'International pizza chain offering a wide variety of pizzas, pasta, and sides. Known for our signature pan pizza and consistent quality.',
    signatureDishes: ['Pan Pizza', 'Stuffed Crust Pizza', 'Chicken Wings'],
    priceRange: '$$$',
    averageRating: 4.3,
    totalReviews: 987,
    photos: {
      exterior: 'https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=800',
      interior: [
        'https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      dishes: [
        'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=800'
      ]
    },
    menu: {
      lastUpdated: '2024-01-05',
      currency: 'BDT',
      priceSubjectToChange: true,
      seasonalItems: true,
      categories: [
        {
          id: 'pizzas',
          name: 'Signature Pizzas ⭐',
          description: 'Our famous pizzas made with fresh ingredients and signature sauces',
          items: [
            {
              id: 'chicken-supreme-large',
              name: 'Chicken Supreme Pizza (Large)',
              description: 'Loaded with chicken, mushrooms, bell peppers, onions, and mozzarella cheese on our signature pan crust.',
              price: 890,
              portionSize: 'Large (12 inch)',
              preparationTime: '20-25 minutes',
              dietaryIcons: [],
              allergens: ['gluten', 'dairy'],
              nutritionalInfo: {
                calories: 320,
                protein: 18,
                carbs: 35,
                fat: 14,
                fiber: 2,
                sodium: 680
              },
              ingredients: ['Pizza dough', 'Tomato sauce', 'Mozzarella cheese', 'Chicken', 'Mushrooms', 'Bell peppers', 'Onions'],
              customizations: {
                available: true,
                options: ['Thin crust', 'Stuffed crust', 'Extra cheese', 'Extra chicken'],
                extraCharges: [
                  { option: 'Stuffed crust', price: 150 },
                  { option: 'Extra cheese', price: 100 }
                ]
              },
              availability: {
                allDay: true,
                daysAvailable: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
              },
              popularity: 'popular',
              photos: [
                'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=800'
              ]
            }
          ]
        }
      ]
    }
  }
];

export const getRestaurantProfileById = (id: string): RestaurantProfile | undefined => {
  return restaurantProfiles.find(profile => profile.id === id);
};

export const searchRestaurantProfiles = (query: string): RestaurantProfile[] => {
  const lowercaseQuery = query.toLowerCase();
  return restaurantProfiles.filter(profile =>
    profile.name.toLowerCase().includes(lowercaseQuery) ||
    profile.cuisineType.some(cuisine => cuisine.toLowerCase().includes(lowercaseQuery)) ||
    profile.specialties.some(specialty => specialty.toLowerCase().includes(lowercaseQuery)) ||
    profile.location.city.toLowerCase().includes(lowercaseQuery)
  );
};

export const getRestaurantsByZone = (zone: string): RestaurantProfile[] => {
  return restaurantProfiles.filter(profile => profile.location.zone === zone);
};

export const getRestaurantsByCuisine = (cuisine: string): RestaurantProfile[] => {
  return restaurantProfiles.filter(profile => 
    profile.cuisineType.some(type => type.toLowerCase() === cuisine.toLowerCase())
  );
};

export const getRestaurantsByPriceRange = (priceRange: string): RestaurantProfile[] => {
  return restaurantProfiles.filter(profile => profile.priceRange === priceRange);
};