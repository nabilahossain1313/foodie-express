import React, { useState } from 'react';
import { Plus, Leaf, Flame } from 'lucide-react';
import { MenuItem } from '../../types';

interface MenuItemCardProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem, quantity: number, instructions?: string) => void;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, onAddToCart }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [instructions, setInstructions] = useState('');

  const handleAddToCart = () => {
    onAddToCart(item, quantity, instructions);
    setQuantity(1);
    setInstructions('');
    setShowDetails(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div className="flex">
        <div className="flex-1 p-4">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                <div className="flex items-center space-x-1">
                  {item.isVegetarian && (
                    <div className="bg-green-100 p-1 rounded-full">
                      <Leaf className="h-3 w-3 text-green-600" />
                    </div>
                  )}
                  {item.isSpicy && (
                    <div className="bg-red-100 p-1 rounded-full">
                      <Flame className="h-3 w-3 text-red-600" />
                    </div>
                  )}
                  {item.isPopular && (
                    <span className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded-full font-medium">
                      Popular
                    </span>
                  )}
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                {item.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-gray-900">
                  ${item.price.toFixed(2)}
                </span>
                {item.nutritionInfo && (
                  <button
                    onClick={() => setShowDetails(!showDetails)}
                    className="text-xs text-gray-500 hover:text-gray-700 underline"
                  >
                    Nutrition Info
                  </button>
                )}
              </div>
            </div>
          </div>
          
          {showDetails && item.nutritionInfo && (
            <div className="mt-3 p-3 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Nutrition Information</h4>
              <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                <div>Calories: {item.nutritionInfo.calories}</div>
                <div>Protein: {item.nutritionInfo.protein}g</div>
                <div>Carbs: {item.nutritionInfo.carbs}g</div>
                <div>Fat: {item.nutritionInfo.fat}g</div>
              </div>
            </div>
          )}
          
          <div className="mt-4 flex items-center space-x-3">
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
              >
                -
              </button>
              <span className="px-3 py-1 text-gray-900 font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
              >
                +
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add to Cart</span>
            </button>
          </div>
          
          <div className="mt-3">
            <input
              type="text"
              placeholder="Special instructions (optional)"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div className="w-32 h-32 m-4 flex-shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;