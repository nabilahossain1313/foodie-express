import { useState, useCallback } from 'react';
import { User, LoginCredentials, SignupData, AuthState } from '../types';

// Mock user database with sample cards/payment methods
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@foodieexpress.com',
    phone: '+880 1711-123456',
    role: 'admin',
    addresses: [
      {
        id: '1',
        label: 'Home',
        street: 'House 123, Road 5',
        area: 'Dhanmondi',
        city: 'Dhaka',
        district: 'Dhaka',
        division: 'Dhaka',
        postalCode: '1205',
        coordinates: { lat: 23.7461, lng: 90.3742 },
        isDefault: true,
        deliveryInstructions: 'Ring the bell twice'
      }
    ],
    paymentMethods: [
      {
        id: '1',
        type: 'card',
        provider: 'Visa',
        lastFour: '4242',
        expiryDate: '12/25',
        isDefault: true,
        verified: true
      },
      {
        id: '2',
        type: 'bkash',
        accountNumber: '+880 1711-123456',
        isDefault: false,
        verified: true
      },
      {
        id: '3',
        type: 'nagad',
        accountNumber: '+880 1711-123456',
        isDefault: false,
        verified: true
      }
    ],
    preferences: {
      dietaryRestrictions: [],
      favoritesCuisines: ['Bengali', 'Italian'],
      spiceLevel: 'medium'
    },
    createdAt: '2024-01-01T00:00:00Z',
    loyaltyPoints: 1250,
    orderHistory: ['ORD-001', 'ORD-002', 'ORD-003']
  },
  {
    id: '2',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+880 1712-234567',
    role: 'user',
    addresses: [
      {
        id: '2',
        label: 'Home',
        street: 'House 45, Road 12',
        area: 'Gulshan',
        city: 'Dhaka',
        district: 'Dhaka',
        division: 'Dhaka',
        postalCode: '1212',
        coordinates: { lat: 23.7808, lng: 90.4142 },
        isDefault: true
      }
    ],
    paymentMethods: [
      {
        id: '4',
        type: 'bkash',
        accountNumber: '+880 1712-234567',
        isDefault: true,
        verified: true
      },
      {
        id: '5',
        type: 'card',
        provider: 'MasterCard',
        lastFour: '5555',
        expiryDate: '08/26',
        isDefault: false,
        verified: true
      }
    ],
    preferences: {
      dietaryRestrictions: ['vegetarian'],
      favoritesCuisines: ['Italian', 'Thai'],
      spiceLevel: 'mild'
    },
    createdAt: '2024-01-15T00:00:00Z',
    loyaltyPoints: 450,
    orderHistory: ['ORD-004', 'ORD-005']
  },
  {
    id: '3',
    name: 'Sarah Ahmed',
    email: 'sarah@example.com',
    phone: '+880 1713-345678',
    role: 'user',
    addresses: [
      {
        id: '3',
        label: 'Office',
        street: 'Plot 15, Road 8',
        area: 'Banani',
        city: 'Dhaka',
        district: 'Dhaka',
        division: 'Dhaka',
        postalCode: '1213',
        coordinates: { lat: 23.7937, lng: 90.4066 },
        isDefault: true
      }
    ],
    paymentMethods: [
      {
        id: '6',
        type: 'nagad',
        accountNumber: '+880 1713-345678',
        isDefault: true,
        verified: true
      },
      {
        id: '7',
        type: 'rocket',
        accountNumber: '+880 1713-345678',
        isDefault: false,
        verified: true
      }
    ],
    preferences: {
      dietaryRestrictions: ['halal'],
      favoritesCuisines: ['Bengali', 'Mughlai'],
      spiceLevel: 'hot'
    },
    createdAt: '2024-01-20T00:00:00Z',
    loyaltyPoints: 780,
    orderHistory: ['ORD-006']
  }
];

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('currentUser');
    return {
      user: storedUser ? JSON.parse(storedUser) : null,
      isLoading: false,
      error: null
    };
  });

  const login = useCallback(async (credentials: LoginCredentials) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check credentials
      const user = mockUsers.find(u => u.email === credentials.email);
      
      if (!user) {
        throw new Error('User not found');
      }
      
      // In a real app, you'd verify the password hash
      if (credentials.password !== 'password123') {
        throw new Error('Invalid password');
      }
      
      // Update last login
      const updatedUser = { ...user, lastLogin: new Date().toISOString() };
      
      // Store user session
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      
      setAuthState({
        user: updatedUser,
        isLoading: false,
        error: null
      });
      
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Login failed'
      }));
      throw error;
    }
  }, []);

  const signup = useCallback(async (data: SignupData) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user already exists
      const existingUser = mockUsers.find(u => u.email === data.email);
      if (existingUser) {
        throw new Error('User already exists with this email');
      }
      
      // Create new user with sample payment methods
      const newUser: User = {
        id: Date.now().toString(),
        name: data.name,
        email: data.email,
        phone: data.phone,
        role: 'user',
        addresses: [],
        paymentMethods: [
          {
            id: `pm-${Date.now()}`,
            type: 'bkash',
            accountNumber: data.phone,
            isDefault: true,
            verified: false
          }
        ],
        preferences: {
          dietaryRestrictions: [],
          favoritesCuisines: [],
          spiceLevel: 'medium'
        },
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        loyaltyPoints: 0,
        orderHistory: []
      };
      
      // Add to mock database
      mockUsers.push(newUser);
      
      // Store user session
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      
      setAuthState({
        user: newUser,
        isLoading: false,
        error: null
      });
      
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Signup failed'
      }));
      throw error;
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('currentUser');
    setAuthState({
      user: null,
      isLoading: false,
      error: null
    });
  }, []);

  const clearError = useCallback(() => {
    setAuthState(prev => ({ ...prev, error: null }));
  }, []);

  return {
    user: authState.user,
    isLoading: authState.isLoading,
    error: authState.error,
    isAuthenticated: !!authState.user,
    login,
    signup,
    logout,
    clearError
  };
};