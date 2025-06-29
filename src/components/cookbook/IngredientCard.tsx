import React from 'react';
import { Leaf, Thermometer, Calendar, ShoppingCart } from 'lucide-react';
import { Ingredient } from '../../data/ingredientsDatabase';

interface IngredientCardProps {
  ingredient: Ingredient;
  onClick: (ingredient: Ingredient) => void;
}

const IngredientCard: React.FC<IngredientCardProps> = ({ ingredient, onClick }) => {
  const categoryColors = {
    protein: 'bg-red-100 text-red-800',
    vegetable: 'bg-green-100 text-green-800',
    fruit: 'bg-orange-100 text-orange-800',
    grain: 'bg-yellow-100 text-yellow-800',
    dairy: 'bg-blue-100 text-blue-800',
    spice: 'bg-purple-100 text-purple-800',
    herb: 'bg-green-100 text-green-800',
    fat: 'bg-yellow-100 text-yellow-800',
    sweetener: 'bg-pink-100 text-pink-800',
    beverage: 'bg-blue-100 text-blue-800'
  };

  return (
    <div
      onClick={() => onClick(ingredient)}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer group"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
            {ingredient.name}
          </h3>
          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${categoryColors[ingredient.category]}`}>
            {ingredient.category}
          </span>
        </div>
        <div className="text-right">
          <div className="text-sm font-semibold text-gray-900">
            {ingredient.nutritionPer100g.calories} cal
          </div>
          <div className="text-xs text-gray-500">per 100g</div>
        </div>
      </div>

      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
        {ingredient.description}
      </p>

      <div className="grid grid-cols-3 gap-2 text-xs text-gray-600 mb-3">
        <div className="text-center">
          <div className="font-semibold text-gray-900">{ingredient.nutritionPer100g.protein}g</div>
          <div>Protein</div>
        </div>
        <div className="text-center">
          <div className="font-semibold text-gray-900">{ingredient.nutritionPer100g.carbs}g</div>
          <div>Carbs</div>
        </div>
        <div className="text-center">
          <div className="font-semibold text-gray-900">{ingredient.nutritionPer100g.fat}g</div>
          <div>Fat</div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center space-x-2 text-xs text-gray-500">
          <Thermometer className="h-3 w-3" />
          <span>{ingredient.storage.method}</span>
        </div>
        
        <div className="flex items-center space-x-2 text-xs text-gray-500">
          <Calendar className="h-3 w-3" />
          <span>{ingredient.storage.shelfLife}</span>
        </div>

        <div className="flex items-center space-x-2 text-xs text-gray-500">
          <ShoppingCart className="h-3 w-3" />
          <span className={`px-1 py-0.5 rounded ${
            ingredient.purchasing.priceRange === 'budget' ? 'bg-green-100 text-green-700' :
            ingredient.purchasing.priceRange === 'moderate' ? 'bg-yellow-100 text-yellow-700' :
            'bg-red-100 text-red-700'
          }`}>
            {ingredient.purchasing.priceRange}
          </span>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-100">
        <div className="flex flex-wrap gap-1">
          {ingredient.dietaryInfo.vegan && (
            <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
              Vegan
            </span>
          )}
          {ingredient.dietaryInfo.glutenFree && (
            <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
              Gluten Free
            </span>
          )}
          {ingredient.dietaryInfo.halal && (
            <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs">
              Halal
            </span>
          )}
        </div>

        {ingredient.aliases.length > 0 && (
          <div className="mt-2 text-xs text-gray-500">
            Also known as: {ingredient.aliases.slice(0, 2).join(', ')}
            {ingredient.aliases.length > 2 && '...'}
          </div>
        )}
      </div>
    </div>
  );
};

export default IngredientCard;