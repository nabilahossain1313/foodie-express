export interface Restaurant {
  id: string;
  name: string;
  image: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
  minimumOrder: number;
  isOpen: boolean;
  description: string;
  address: string;
  phone: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  zone: string;
  featured: boolean;
  priceRange: '$' | '$$' | '$$$' | '$$$$';
  tags: string[];
  openingHours: {
    [key: string]: { open: string; close: string; closed?: boolean };
  };
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isVegetarian?: boolean;
  isSpicy?: boolean;
  isPopular?: boolean;
  allergens?: string[];
  nutritionInfo?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber?: number;
    sugar?: number;
    sodium?: number;
  };
  preparationTime: number;
  availability: boolean;
  customizations?: {
    id: string;
    name: string;
    options: { name: string; price: number }[];
    required: boolean;
  }[];
}

export interface CartItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
  specialInstructions?: string;
  selectedOptions?: string[];
  customizations?: { [key: string]: string };
}

export interface Order {
  id: string;
  restaurant: Restaurant;
  items: CartItem[];
  status: 'placed' | 'confirmed' | 'preparing' | 'ready' | 'picked-up' | 'delivered';
  totalAmount: number;
  deliveryAddress: string;
  estimatedDeliveryTime: string;
  createdAt: string;
  paymentMethod: PaymentMethod;
  deliveryInstructions?: string;
  trackingInfo: {
    orderPlaced: string;
    confirmed?: string;
    preparing?: string;
    ready?: string;
    pickedUp?: string;
    delivered?: string;
  };
  rider?: {
    name: string;
    phone: string;
    rating: number;
    location?: { lat: number; lng: number };
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'user' | 'admin' | 'restaurant' | 'rider';
  addresses: Address[];
  paymentMethods: PaymentMethod[];
  preferences: {
    dietaryRestrictions: string[];
    favoritesCuisines: string[];
    spiceLevel: 'mild' | 'medium' | 'hot' | 'extra-hot';
  };
  profile?: UserProfile;
  createdAt: string;
  lastLogin?: string;
  loyaltyPoints: number;
  orderHistory: string[];
}

export interface UserProfile {
  age: number;
  gender: 'male' | 'female' | 'other';
  height: number;
  weight: number;
  activityLevel: 'sedentary' | 'lightly-active' | 'moderately-active' | 'very-active' | 'extremely-active';
  goal: 'lose-weight' | 'maintain-weight' | 'gain-weight' | 'build-muscle';
  medicalConditions?: string[];
  allergies?: string[];
  dailyCalorieGoal?: number;
  macroGoals?: {
    protein: number;
    carbs: number;
    fat: number;
  };
}

export interface Address {
  id: string;
  label: string;
  street: string;
  area: string;
  city: string;
  district: string;
  division: string;
  postalCode: string;
  coordinates: { lat: number; lng: number };
  isDefault: boolean;
  deliveryInstructions?: string;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'bkash' | 'nagad' | 'rocket' | 'upay' | 'gpay' | 'cash';
  provider?: string;
  accountNumber?: string;
  lastFour?: string;
  expiryDate?: string;
  isDefault: boolean;
  verified: boolean;
}

export interface CalorieRecommendation {
  dailyCalories: number;
  mealCalories: {
    breakfast: number;
    lunch: number;
    dinner: number;
    snacks: number;
  };
  macros: {
    protein: number;
    carbs: number;
    fat: number;
  };
  recommendations: string[];
}

export interface AIMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  context?: {
    menuItem?: MenuItem;
    userProfile?: UserProfile;
    calorieData?: any;
    location?: { lat: number; lng: number };
    weather?: any;
  };
  attachments?: {
    type: 'image' | 'voice' | 'location';
    url: string;
    metadata?: any;
  }[];
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
  phone: string;
}

export interface AIResponse {
  content: string;
  confidence: number;
  suggestions?: string[];
  error?: string;
  actions?: {
    type: 'order' | 'search' | 'navigate' | 'call';
    data: any;
  }[];
}

export interface MapLocation {
  lat: number;
  lng: number;
  address?: string;
  name?: string;
}

export interface DeliveryZone {
  id: string;
  name: string;
  coordinates: { lat: number; lng: number }[];
  deliveryFee: number;
  estimatedTime: string;
  active: boolean;
}

// Global type declaration for Google Maps
declare global {
  interface Window {
    google: any;
  }
}