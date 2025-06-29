import React from 'react';
import { Target, TrendingUp, Activity, Zap } from 'lucide-react';
import { UserProfile, CalorieRecommendation, CartItem } from '../../types';
import { CalorieCalculator } from '../../utils/calorieCalculator';

interface CalorieTrackerProps {
  userProfile: UserProfile;
  cartItems: CartItem[];
  onOpenProfile: () => void;
}

const CalorieTracker: React.FC<CalorieTrackerProps> = ({ userProfile, cartItems, onOpenProfile }) => {
  const recommendations = CalorieCalculator.generateRecommendations(userProfile);
  
  // Calculate current cart calories
  const cartCalories = cartItems.reduce((total, item) => {
    return total + (item.menuItem.nutritionInfo?.calories || 0) * item.quantity;
  }, 0);

  const cartProtein = cartItems.reduce((total, item) => {
    return total + (item.menuItem.nutritionInfo?.protein || 0) * item.quantity;
  }, 0);

  const cartCarbs = cartItems.reduce((total, item) => {
    return total + (item.menuItem.nutritionInfo?.carbs || 0) * item.quantity;
  }, 0);

  const cartFat = cartItems.reduce((total, item) => {
    return total + (item.menuItem.nutritionInfo?.fat || 0) * item.quantity;
  }, 0);

  const caloriePercentage = Math.min((cartCalories / recommendations.dailyCalories) * 100, 100);
  const proteinPercentage = Math.min((cartProtein / recommendations.macros.protein) * 100, 100);
  const carbsPercentage = Math.min((cartCarbs / recommendations.macros.carbs) * 100, 100);
  const fatPercentage = Math.min((cartFat / recommendations.macros.fat) * 100, 100);

  const getStatusColor = (percentage: number) => {
    if (percentage < 50) return 'text-red-600 bg-red-100';
    if (percentage < 80) return 'text-yellow-600 bg-yellow-100';
    if (percentage <= 100) return 'text-green-600 bg-green-100';
    return 'text-orange-600 bg-orange-100';
  };

  const getProgressColor = (percentage: number) => {
    if (percentage < 50) return 'bg-red-500';
    if (percentage < 80) return 'bg-yellow-500';
    if (percentage <= 100) return 'bg-green-500';
    return 'bg-orange-500';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
          <Target className="h-5 w-5 text-orange-600" />
          <span>Your Nutrition Goals</span>
        </h3>
        <button
          onClick={onOpenProfile}
          className="text-sm text-orange-600 hover:text-orange-700 font-medium"
        >
          Edit Profile
        </button>
      </div>

      {/* Daily Calorie Goal */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Daily Calories</span>
          <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(caloriePercentage)}`}>
            {cartCalories} / {recommendations.dailyCalories} cal
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(caloriePercentage)}`}
            style={{ width: `${Math.min(caloriePercentage, 100)}%` }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-1">
          {caloriePercentage.toFixed(0)}% of daily goal
        </p>
      </div>

      {/* Macronutrient Breakdown */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mx-auto mb-2">
            <Activity className="h-6 w-6 text-blue-600" />
          </div>
          <p className="text-xs text-gray-600 mb-1">Protein</p>
          <p className="text-sm font-semibold text-gray-900">
            {cartProtein.toFixed(0)}g / {recommendations.macros.protein}g
          </p>
          <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
            <div
              className="h-1 bg-blue-500 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(proteinPercentage, 100)}%` }}
            />
          </div>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mx-auto mb-2">
            <Zap className="h-6 w-6 text-green-600" />
          </div>
          <p className="text-xs text-gray-600 mb-1">Carbs</p>
          <p className="text-sm font-semibold text-gray-900">
            {cartCarbs.toFixed(0)}g / {recommendations.macros.carbs}g
          </p>
          <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
            <div
              className="h-1 bg-green-500 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(carbsPercentage, 100)}%` }}
            />
          </div>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-full mx-auto mb-2">
            <TrendingUp className="h-6 w-6 text-yellow-600" />
          </div>
          <p className="text-xs text-gray-600 mb-1">Fat</p>
          <p className="text-sm font-semibold text-gray-900">
            {cartFat.toFixed(0)}g / {recommendations.macros.fat}g
          </p>
          <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
            <div
              className="h-1 bg-yellow-500 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(fatPercentage, 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Recommendations */}
      {recommendations.recommendations.length > 0 && (
        <div className="bg-orange-50 rounded-lg p-4">
          <h4 className="text-sm font-medium text-orange-900 mb-2">💡 Personalized Tips</h4>
          <ul className="text-xs text-orange-800 space-y-1">
            {recommendations.recommendations.slice(0, 2).map((tip, index) => (
              <li key={index} className="flex items-start space-x-1">
                <span>•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CalorieTracker;