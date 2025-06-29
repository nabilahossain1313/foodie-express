import React, { useState } from 'react';
import { Search, Filter, Book, ChefHat, Clock, Users, Star, Utensils } from 'lucide-react';
import { Recipe, recipesDatabase, searchRecipes, getRecipesByCategory } from '../../data/recipesDatabase';
import { Ingredient, ingredientsDatabase, searchIngredients } from '../../data/ingredientsDatabase';
import RecipeCard from './RecipeCard';
import IngredientCard from './IngredientCard';
import RecipeDetail from './RecipeDetail';
import IngredientDetail from './IngredientDetail';

type ViewMode = 'recipes' | 'ingredients' | 'recipe-detail' | 'ingredient-detail';

const CookbookDashboard: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('recipes');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [selectedIngredient, setSelectedIngredient] = useState<Ingredient | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filteredRecipes = searchQuery 
    ? searchRecipes(searchQuery)
    : selectedCategory === 'all' 
      ? recipesDatabase 
      : getRecipesByCategory(selectedCategory as any);

  const filteredIngredients = searchQuery 
    ? searchIngredients(searchQuery)
    : ingredientsDatabase;

  const categories = ['all', 'breakfast', 'lunch', 'dinner', 'snack', 'dessert', 'appetizer'];
  const skillLevels = [
    { level: 1, label: 'Beginner', description: 'Basic cooking skills' },
    { level: 2, label: 'Easy', description: 'Some experience helpful' },
    { level: 3, label: 'Intermediate', description: 'Moderate cooking skills' },
    { level: 4, label: 'Advanced', description: 'Experienced cook' },
    { level: 5, label: 'Expert', description: 'Professional level' }
  ];

  const handleRecipeClick = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setViewMode('recipe-detail');
  };

  const handleIngredientClick = (ingredient: Ingredient) => {
    setSelectedIngredient(ingredient);
    setViewMode('ingredient-detail');
  };

  const renderHeader = () => (
    <div className="bg-gradient-to-r from-orange-600 to-red-500 text-white p-6 rounded-lg mb-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2 flex items-center space-x-3">
            <Book className="h-8 w-8" />
            <span>Digital Cookbook & Ingredient Guide</span>
          </h1>
          <p className="text-orange-100">
            Comprehensive culinary database with detailed recipes and ingredient information
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold">{recipesDatabase.length}</div>
          <div className="text-sm text-orange-200">Recipes</div>
        </div>
      </div>
    </div>
  );

  const renderNavigation = () => (
    <div className="flex items-center justify-between mb-6">
      <div className="flex space-x-4">
        <button
          onClick={() => setViewMode('recipes')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
            viewMode === 'recipes' || viewMode === 'recipe-detail'
              ? 'bg-orange-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          <ChefHat className="h-4 w-4" />
          <span>Recipes</span>
        </button>
        <button
          onClick={() => setViewMode('ingredients')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
            viewMode === 'ingredients' || viewMode === 'ingredient-detail'
              ? 'bg-orange-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          <Utensils className="h-4 w-4" />
          <span>Ingredients</span>
        </button>
      </div>

      <button
        onClick={() => setShowFilters(!showFilters)}
        className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <Filter className="h-4 w-4" />
        <span>Filters</span>
      </button>
    </div>
  );

  const renderSearchAndFilters = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      <div className="flex items-center space-x-4 mb-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder={`Search ${viewMode === 'recipes' ? 'recipes' : 'ingredients'}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
      </div>

      {showFilters && viewMode === 'recipes' && (
        <div className="border-t pt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Skill Level</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500">
                <option value="">All Levels</option>
                {skillLevels.map(skill => (
                  <option key={skill.level} value={skill.level}>
                    {skill.label} - {skill.description}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Dietary</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500">
                <option value="">All Diets</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="vegan">Vegan</option>
                <option value="glutenFree">Gluten Free</option>
                <option value="dairyFree">Dairy Free</option>
                <option value="halal">Halal</option>
                <option value="kosher">Kosher</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderRecipeGrid = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredRecipes.map(recipe => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          onClick={() => handleRecipeClick(recipe)}
        />
      ))}
    </div>
  );

  const renderIngredientGrid = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredIngredients.map(ingredient => (
        <IngredientCard
          key={ingredient.id}
          ingredient={ingredient}
          onClick={() => handleIngredientClick(ingredient)}
        />
      ))}
    </div>
  );

  if (viewMode === 'recipe-detail' && selectedRecipe) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => setViewMode('recipes')}
          className="mb-4 text-orange-600 hover:text-orange-700 font-medium"
        >
          ← Back to Recipes
        </button>
        <RecipeDetail recipe={selectedRecipe} />
      </div>
    );
  }

  if (viewMode === 'ingredient-detail' && selectedIngredient) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => setViewMode('ingredients')}
          className="mb-4 text-orange-600 hover:text-orange-700 font-medium"
        >
          ← Back to Ingredients
        </button>
        <IngredientDetail ingredient={selectedIngredient} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {renderHeader()}
      {renderNavigation()}
      {renderSearchAndFilters()}
      
      {viewMode === 'recipes' && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {searchQuery ? `Search Results for "${searchQuery}"` : 'All Recipes'}
            </h2>
            <span className="text-gray-600">{filteredRecipes.length} recipes found</span>
          </div>
          {renderRecipeGrid()}
        </div>
      )}

      {viewMode === 'ingredients' && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {searchQuery ? `Search Results for "${searchQuery}"` : 'All Ingredients'}
            </h2>
            <span className="text-gray-600">{filteredIngredients.length} ingredients found</span>
          </div>
          {renderIngredientGrid()}
        </div>
      )}
    </div>
  );
};

export default CookbookDashboard;