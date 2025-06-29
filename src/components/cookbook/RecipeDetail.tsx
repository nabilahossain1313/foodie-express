import React, { useState } from 'react';
import { Clock, Users, Star, ChefHat, Thermometer, Timer, AlertCircle, Lightbulb, Printer as Print, Share2 } from 'lucide-react';
import { Recipe } from '../../data/recipesDatabase';
import { getIngredientById } from '../../data/ingredientsDatabase';

interface RecipeDetailProps {
  recipe: Recipe;
}

const RecipeDetail: React.FC<RecipeDetailProps> = ({ recipe }) => {
  const [activeTab, setActiveTab] = useState<'ingredients' | 'method' | 'nutrition' | 'tips'>('ingredients');
  const [servingMultiplier, setServingMultiplier] = useState(1);

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

  const adjustedServings = recipe.yield.servings * servingMultiplier;

  const renderIngredientsList = () => (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Ingredients</h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Servings:</span>
          <div className="flex items-center space-x-1">
            <button
              onClick={() => setServingMultiplier(Math.max(0.5, servingMultiplier - 0.5))}
              className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-sm font-medium"
            >
              -
            </button>
            <span className="w-12 text-center font-medium">{adjustedServings}</span>
            <button
              onClick={() => setServingMultiplier(servingMultiplier + 0.5)}
              className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-sm font-medium"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {recipe.ingredients.map((ingredient, index) => {
        const ingredientData = getIngredientById(ingredient.ingredientId);
        const adjustedAmount = ingredient.amount * servingMultiplier;
        
        return (
          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex-1">
              <div className="font-medium text-gray-900">
                {ingredientData?.name || ingredient.ingredientId}
              </div>
              {ingredient.preparation && (
                <div className="text-sm text-gray-600">{ingredient.preparation}</div>
              )}
              {ingredient.optional && (
                <span className="text-xs text-orange-600 font-medium">(Optional)</span>
              )}
            </div>
            <div className="text-right">
              <div className="font-medium">
                {adjustedAmount} {ingredient.unit}
              </div>
              {ingredient.substitutions && ingredient.substitutions.length > 0 && (
                <div className="text-xs text-gray-500">
                  Alt: {ingredient.substitutions[0].ingredientId}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderMethod = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Cooking Method</h3>
      
      {recipe.method.map((step, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-start space-x-4">
            <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
              {step.step}
            </div>
            <div className="flex-1">
              <p className="text-gray-900 mb-2">{step.instruction}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                {step.timing && (
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Timer className="h-4 w-4" />
                    <span>{step.timing}</span>
                  </div>
                )}
                
                {step.temperature && (
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Thermometer className="h-4 w-4" />
                    <span>{step.temperature}</span>
                  </div>
                )}
                
                {step.technique && (
                  <div className="flex items-center space-x-2 text-gray-600">
                    <ChefHat className="h-4 w-4" />
                    <span>{step.technique}</span>
                  </div>
                )}
              </div>

              {step.visualCues && step.visualCues.length > 0 && (
                <div className="mt-2 p-2 bg-blue-50 rounded">
                  <div className="text-sm font-medium text-blue-900 mb-1">Visual Cues:</div>
                  <ul className="text-sm text-blue-800 space-y-1">
                    {step.visualCues.map((cue, cueIndex) => (
                      <li key={cueIndex}>• {cue}</li>
                    ))}
                  </ul>
                </div>
              )}

              {step.tips && step.tips.length > 0 && (
                <div className="mt-2 p-2 bg-yellow-50 rounded">
                  <div className="text-sm font-medium text-yellow-900 mb-1">Tips:</div>
                  <ul className="text-sm text-yellow-800 space-y-1">
                    {step.tips.map((tip, tipIndex) => (
                      <li key={tipIndex}>• {tip}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderNutrition = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Nutrition Information (Per Serving)</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-orange-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-orange-600">{recipe.nutritionPerServing.calories}</div>
          <div className="text-sm text-gray-600">Calories</div>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-blue-600">{recipe.nutritionPerServing.protein}g</div>
          <div className="text-sm text-gray-600">Protein</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-green-600">{recipe.nutritionPerServing.carbs}g</div>
          <div className="text-sm text-gray-600">Carbs</div>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-yellow-600">{recipe.nutritionPerServing.fat}g</div>
          <div className="text-sm text-gray-600">Fat</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <div className="text-xl font-bold text-gray-600">{recipe.nutritionPerServing.fiber}g</div>
          <div className="text-sm text-gray-600">Fiber</div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <div className="text-xl font-bold text-gray-600">{recipe.nutritionPerServing.sodium}mg</div>
          <div className="text-sm text-gray-600">Sodium</div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h4 className="font-semibold mb-3">Dietary Information</h4>
        <div className="flex flex-wrap gap-2">
          {Object.entries(recipe.dietaryInfo).map(([key, value]) => {
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
    </div>
  );

  const renderTips = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
          <Lightbulb className="h-5 w-5 text-yellow-500" />
          <span>Success Tips</span>
        </h3>
        <ul className="space-y-2">
          {recipe.tips.success.map((tip, index) => (
            <li key={index} className="flex items-start space-x-2">
              <span className="text-green-500 mt-1">✓</span>
              <span className="text-gray-700">{tip}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
          <AlertCircle className="h-5 w-5 text-red-500" />
          <span>Troubleshooting</span>
        </h3>
        <div className="space-y-3">
          {recipe.tips.troubleshooting.map((item, index) => (
            <div key={index} className="bg-red-50 border border-red-200 rounded-lg p-3">
              <div className="font-medium text-red-900 mb-1">Problem: {item.problem}</div>
              <div className="text-red-800">Solution: {item.solution}</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Recipe Variations</h3>
        <div className="space-y-3">
          {recipe.tips.variations.map((variation, index) => (
            <div key={index} className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="font-medium text-blue-900 mb-1">{variation.name}</div>
              <div className="text-blue-800">{variation.changes}</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Storage & Reheating</h3>
        <div className="bg-gray-50 rounded-lg p-4 space-y-3">
          <div>
            <span className="font-medium">Refrigerator:</span> {recipe.storage.refrigerator}
          </div>
          {recipe.storage.freezer && (
            <div>
              <span className="font-medium">Freezer:</span> {recipe.storage.freezer}
            </div>
          )}
          <div className="border-t pt-3">
            <div className="font-medium mb-2">Reheating Instructions:</div>
            {recipe.reheating.map((method, index) => (
              <div key={index} className="mb-2">
                <span className="font-medium">{method.method}:</span> {method.notes}
                {method.temperature && ` (${method.temperature})`}
                {method.time && ` for ${method.time}`}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="relative">
        <img
          src={recipe.photos.main}
          alt={recipe.title}
          className="w-full h-64 md:h-80 object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="absolute bottom-4 left-4 text-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{recipe.title}</h1>
          <p className="text-lg text-gray-200 mb-2">{recipe.description}</p>
          <div className="flex items-center space-x-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${skillLevelColors[recipe.skillLevel]}`}>
              {skillLevelLabels[recipe.skillLevel]}
            </span>
            <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">
              {recipe.cuisine}
            </span>
            {recipe.rating && (
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="text-sm">{recipe.rating}</span>
              </div>
            )}
          </div>
        </div>
        <div className="absolute top-4 right-4 flex space-x-2">
          <button className="bg-white bg-opacity-90 p-2 rounded-full hover:bg-white transition-colors">
            <Print className="h-5 w-5 text-gray-700" />
          </button>
          <button className="bg-white bg-opacity-90 p-2 rounded-full hover:bg-white transition-colors">
            <Share2 className="h-5 w-5 text-gray-700" />
          </button>
        </div>
      </div>

      {/* Quick Info */}
      <div className="p-6 border-b border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="flex items-center justify-center space-x-1 text-gray-600 mb-1">
              <Clock className="h-4 w-4" />
              <span className="text-sm">Total Time</span>
            </div>
            <div className="text-xl font-bold text-gray-900">{recipe.timing.totalTime} min</div>
          </div>
          <div>
            <div className="flex items-center justify-center space-x-1 text-gray-600 mb-1">
              <Users className="h-4 w-4" />
              <span className="text-sm">Servings</span>
            </div>
            <div className="text-xl font-bold text-gray-900">{recipe.yield.servings}</div>
          </div>
          <div>
            <div className="flex items-center justify-center space-x-1 text-gray-600 mb-1">
              <ChefHat className="h-4 w-4" />
              <span className="text-sm">Calories</span>
            </div>
            <div className="text-xl font-bold text-gray-900">{recipe.nutritionPerServing.calories}</div>
          </div>
          <div>
            <div className="flex items-center justify-center space-x-1 text-gray-600 mb-1">
              <span className="text-sm">Cost</span>
            </div>
            <div className={`text-xl font-bold ${
              recipe.costEstimate === 'budget' ? 'text-green-600' :
              recipe.costEstimate === 'moderate' ? 'text-yellow-600' :
              'text-red-600'
            }`}>
              {recipe.costEstimate}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-6">
          {[
            { id: 'ingredients', label: 'Ingredients' },
            { id: 'method', label: 'Method' },
            { id: 'nutrition', label: 'Nutrition' },
            { id: 'tips', label: 'Tips & Storage' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'ingredients' && renderIngredientsList()}
        {activeTab === 'method' && renderMethod()}
        {activeTab === 'nutrition' && renderNutrition()}
        {activeTab === 'tips' && renderTips()}
      </div>
    </div>
  );
};

export default RecipeDetail;