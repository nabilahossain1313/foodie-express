import { useState, useCallback } from 'react';
import { UserProfile, CalorieRecommendation } from '../types';
import { CalorieCalculator } from '../utils/calorieCalculator';

export const useUserProfile = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('userProfile');
    return saved ? JSON.parse(saved) : null;
  });

  const [calorieRecommendations, setCalorieRecommendations] = useState<CalorieRecommendation | null>(() => {
    if (userProfile) {
      return CalorieCalculator.generateRecommendations(userProfile);
    }
    return null;
  });

  const saveProfile = useCallback((profile: UserProfile) => {
    setUserProfile(profile);
    localStorage.setItem('userProfile', JSON.stringify(profile));
    
    const recommendations = CalorieCalculator.generateRecommendations(profile);
    setCalorieRecommendations(recommendations);
  }, []);

  const clearProfile = useCallback(() => {
    setUserProfile(null);
    setCalorieRecommendations(null);
    localStorage.removeItem('userProfile');
  }, []);

  const updateProfile = useCallback((updates: Partial<UserProfile>) => {
    if (!userProfile) return;
    
    const updatedProfile = { ...userProfile, ...updates };
    saveProfile(updatedProfile);
  }, [userProfile, saveProfile]);

  return {
    userProfile,
    calorieRecommendations,
    saveProfile,
    clearProfile,
    updateProfile,
    hasProfile: !!userProfile
  };
};