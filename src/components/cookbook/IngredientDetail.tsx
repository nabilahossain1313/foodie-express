import React from 'react';
import { Thermometer, Calendar, ShoppingCart, Leaf, Globe, AlertTriangle } from 'lucide-react';
import { Ingredient } from '../../data/ingredientsDatabase';

interface IngredientDetailProps {
  ingredient: Ingredient;
}

const IngredientDetail: React.FC<IngredientDetailProps> = ({ ingredient }) => {
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
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">{ingredient.name}</h1>
            <p className="text-green-100 mb-3">{ingredient.description}</p>
            <div className="flex items-center space-x-3">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${categoryColors[ingredient.category]} bg-opacity-90`}>
                {ingredient.category}
              </span>
              <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">
                {ingredient.origin}
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{ingredient.nutritionPer100g.calories}</div>
            <div className="text-sm text-green-200">calories per 100g</div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-8">
        {/* Aliases */}
        {ingredient.aliases.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-3">Also Known As</h2>
            <div className="flex flex-wrap gap-2">
              {ingredient.aliases.map((alias, index) => (
                <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                  {alias}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Nutrition Information */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Nutrition Information (per 100g)</h2>
          
          {/* Macronutrients */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-orange-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-orange-600">{ingredient.nutritionPer100g.calories}</div>
              <div className="text-sm text-gray-600">Calories</div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600">{ingredient.nutritionPer100g.protein}g</div>
              <div className="text-sm text-gray-600">Protein</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-600">{ingredient.nutritionPer100g.carbs}g</div>
              <div className="text-sm text-gray-600">Carbs</div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-yellow-600">{ingredient.nutritionPer100g.fat}g</div>
              <div className="text-sm text-gray-600">Fat</div>
            </div>
          </div>

          {/* Vitamins & Minerals */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold mb-3">Vitamins</h3>
              <div className="space-y-2">
                {Object.entries(ingredient.nutritionPer100g.vitamins).map(([vitamin, value]) => {
                  if (value) {
                    return (
                      <div key={vitamin} className="flex justify-between">
                        <span className="text-gray-700 capitalize">
                          {vitamin.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                        <span className="font-medium">{value}{vitamin.includes('vitamin') ? 'mg' : 'mcg'}</span>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold mb-3">Minerals</h3>
              <div className="space-y-2">
                {Object.entries(ingredient.nutritionPer100g.minerals).map(([mineral, value]) => {
                  if (value) {
                    return (
                      <div key={mineral} className="flex justify-between">
                        <span className="text-gray-700 capitalize">{mineral}</span>
                        <span className="font-medium">{value}{mineral === 'selenium' ? 'mcg' : 'mg'}</span>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Culinary Information */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Culinary Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Flavor Profile</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {ingredient.culinaryInfo.flavorProfile.map((flavor, index) => (
                  <span key={index} className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-sm">
                    {flavor}
                  </span>
                ))}
              </div>

              <h3 className="font-semibold mb-2">Cooking Methods</h3>
              <div className="flex flex-wrap gap-2">
                {ingredient.culinaryInfo.cookingMethods.map((method, index) => (
                  <span key={index} className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-sm">
                    {method}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Pairs Well With</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {ingredient.culinaryInfo.pairings.map((pairing, index) => (
                  <span key={index} className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm">
                    {pairing}
                  </span>
                ))}
              </div>

              <div className="space-y-2">
                <div>
                  <span className="font-medium">Texture:</span> {ingredient.culinaryInfo.texture}
                </div>
                <div>
                  <span className="font-medium">Color:</span> {ingredient.culinaryInfo.color}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Storage & Purchasing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="font-semibold mb-3 flex items-center space-x-2">
              <Thermometer className="h-5 w-5 text-blue-600" />
              <span>Storage Information</span>
            </h3>
            <div className="space-y-2 text-sm">
              <div><span className="font-medium">Method:</span> {ingredient.storage.method}</div>
              <div><span className="font-medium">Temperature:</span> {ingredient.storage.temperature}</div>
              {ingredient.storage.humidity && (
                <div><span className="font-medium">Humidity:</span> {ingredient.storage.humidity}</div>
              )}
              <div><span className="font-medium">Shelf Life:</span> {ingredient.storage.shelfLife}</div>
              <div>
                <span className="font-medium">Freezable:</span> 
                <span className={`ml-1 ${ingredient.storage.freezable ? 'text-green-600' : 'text-red-600'}`}>
                  {ingredient.storage.freezable ? 'Yes' : 'No'}
                </span>
              </div>
              {ingredient.storage.freezerLife && (
                <div><span className="font-medium">Freezer Life:</span> {ingredient.storage.freezerLife}</div>
              )}
            </div>
          </div>

          <div className="bg-green-50 rounded-lg p-4">
            <h3 className="font-semibold mb-3 flex items-center space-x-2">
              <ShoppingCart className="h-5 w-5 text-green-600" />
              <span>Purchasing Guide</span>
            </h3>
            <div className="space-y-3">
              <div>
                <span className="font-medium text-sm">Selection Tips:</span>
                <ul className="text-sm text-gray-700 mt-1 space-y-1">
                  {ingredient.purchasing.selectionTips.map((tip, index) => (
                    <li key={index}>• {tip}</li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="font-medium text-sm">Quality Indicators:</span>
                <ul className="text-sm text-gray-700 mt-1 space-y-1">
                  {ingredient.purchasing.qualityIndicators.map((indicator, index) => (
                    <li key={index}>• {indicator}</li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="font-medium text-sm">Price Range:</span>
                <span className={`ml-2 px-2 py-1 rounded text-xs ${
                  ingredient.purchasing.priceRange === 'budget' ? 'bg-green-100 text-green-700' :
                  ingredient.purchasing.priceRange === 'moderate' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {ingredient.purchasing.priceRange}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Seasonality */}
        <div className="bg-yellow-50 rounded-lg p-4">
          <h3 className="font-semibold mb-3 flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-yellow-600" />
            <span>Seasonality & Availability</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-medium">Peak Season:</span>
              <div className="mt-1">
                {ingredient.seasonality.peak.map((season, index) => (
                  <span key={index} className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded mr-1 text-xs">
                    {season}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <span className="font-medium">Available:</span>
              <div className="mt-1">
                {ingredient.seasonality.available.map((period, index) => (
                  <span key={index} className="bg-green-200 text-green-800 px-2 py-1 rounded mr-1 text-xs">
                    {period}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <span className="font-medium">Regions:</span>
              <div className="mt-1">
                {ingredient.seasonality.regions.map((region, index) => (
                  <span key={index} className="bg-blue-200 text-blue-800 px-2 py-1 rounded mr-1 text-xs">
                    {region}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Dietary Information & Allergens */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-3 flex items-center space-x-2">
              <Leaf className="h-5 w-5 text-green-600" />
              <span>Dietary Information</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {Object.entries(ingredient.dietaryInfo).map(([key, value]) => {
                if (value) {
                  return (
                    <span key={key} className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </span>
                  );
                }
                return null;
              })}
            </div>
          </div>

          {ingredient.allergens.length > 0 && (
            <div>
              <h3 className="font-semibold mb-3 flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <span>Allergen Information</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {ingredient.allergens.map((allergen, index) => (
                  <span key={index} className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
                    {allergen}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Substitutions */}
        {ingredient.substitutions.length > 0 && (
          <div>
            <h3 className="font-semibold mb-3">Substitutions</h3>
            <div className="space-y-3">
              {ingredient.substitutions.map((sub, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium">{sub.ingredient}</span>
                    <span className="text-sm text-gray-600">Ratio: {sub.ratio}</span>
                  </div>
                  <p className="text-sm text-gray-700">{sub.notes}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IngredientDetail;