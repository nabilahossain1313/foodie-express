import React from 'react';
import { Clock, Users, Star, ChefHat, Utensils } from 'lucide-react';
import { Recipe } from '../../data/recipesDatabase';

interface RecipeCardProps {
  recipe: Recipe;
  onClick: (recipe: Recipe) => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onClick }) => {
  const skillLevelColors = {
    1: 'bg-green-100 text-green-800',
    2: 'bg-blue-100 text-blue-800',
    3: 'bg-yellow-100 text-yellow-800',
    4: 'bg-orange-100 text-orange-800',
    5: 'bg-red-100 text-red-800'
  };

  const skillLevelLabels = {
    1: 'Beginner',
    2: 'Easy',
    3: 'Intermediate',
    4: 'Advanced',
    5: 'Expert'
  };

  return (
    <div
      onClick={() => onClick(recipe)}
      className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer group"
    >
      <div className="relative">
        <img
          src={recipe.photos.main}
          alt={recipe.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 flex space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${skillLevelColors[recipe.skillLevel]}`}>
            {skillLevelLabels[recipe.skillLevel]}
          </span>
          {recipe.rating && (
            <div className="bg-white bg-opacity-90 rounded-full px-2 py-1 flex items-center space-x-1">
              <Star className="h-3 w-3 text-yellow-400 fill-current" />
              <span className="text-xs font-medium">{recipe.rating}</span>
            </div>
          )}
        </div>
        <div className="absolute bottom-3 left-3">
          <span className="bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs font-medium">
            {recipe.cuisine}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
          {recipe.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {recipe.description}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{recipe.timing.totalTime} min</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="h-4 w-4" />
            <span>{recipe.yield.servings} servings</span>
          </div>
          <div className="flex items-center space-x-1">
            <ChefHat className="h-4 w-4" />
            <span>{recipe.nutritionPerServing.calories} cal</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1">
            {recipe.dietaryInfo.vegetarian && (
              <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                Vegetarian
              </span>
            )}
            {recipe.dietaryInfo.vegan && (
              <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                Vegan
              </span>
            )}
            {recipe.dietaryInfo.glutenFree && (
              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
                Gluten Free
              </span>
            )}
            {recipe.dietaryInfo.halal && (
              <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs">
                Halal
              </span>
            )}
          </div>
          
          <span className={`text-xs px-2 py-1 rounded-full ${
            recipe.costEstimate === 'budget' ? 'bg-green-100 text-green-700' :
            recipe.costEstimate === 'moderate' ? 'bg-yellow-100 text-yellow-700' :
            'bg-red-100 text-red-700'
          }`}>
            {recipe.costEstimate}
          </span>
        </div>

        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>By {recipe.author}</span>
            {recipe.reviews && (
              <span>{recipe.reviews} reviews</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;