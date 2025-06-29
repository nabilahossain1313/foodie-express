export interface Ingredient {
  id: string;
  name: string;
  aliases: string[];
  category: 'protein' | 'vegetable' | 'fruit' | 'grain' | 'dairy' | 'spice' | 'herb' | 'fat' | 'sweetener' | 'beverage';
  nutritionPer100g: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
    sugar: number;
    sodium: number;
    vitamins: {
      vitaminA?: number; // mcg
      vitaminC?: number; // mg
      vitaminD?: number; // mcg
      vitaminE?: number; // mg
      vitaminK?: number; // mcg
      thiamine?: number; // mg
      riboflavin?: number; // mg
      niacin?: number; // mg
      vitaminB6?: number; // mg
      folate?: number; // mcg
      vitaminB12?: number; // mcg
    };
    minerals: {
      calcium?: number; // mg
      iron?: number; // mg
      magnesium?: number; // mg
      phosphorus?: number; // mg
      potassium?: number; // mg
      zinc?: number; // mg
      copper?: number; // mg
      manganese?: number; // mg
      selenium?: number; // mcg
    };
  };
  culinaryInfo: {
    flavorProfile: string[];
    cookingMethods: string[];
    pairings: string[];
    texture: string;
    color: string;
  };
  storage: {
    method: string;
    temperature: string;
    humidity?: string;
    shelfLife: string;
    freezable: boolean;
    freezerLife?: string;
  };
  seasonality: {
    peak: string[];
    available: string[];
    regions: string[];
  };
  purchasing: {
    selectionTips: string[];
    qualityIndicators: string[];
    priceRange: 'budget' | 'moderate' | 'premium';
  };
  allergens: string[];
  dietaryInfo: {
    vegan: boolean;
    vegetarian: boolean;
    glutenFree: boolean;
    dairyFree: boolean;
    nutFree: boolean;
    kosher: boolean;
    halal: boolean;
  };
  substitutions: {
    ingredient: string;
    ratio: string;
    notes: string;
  }[];
  origin: string;
  description: string;
}

export const ingredientsDatabase: Ingredient[] = [
  {
    id: 'basmati-rice',
    name: 'Basmati Rice',
    aliases: ['Long-grain rice', 'Aromatic rice', 'Indian rice'],
    category: 'grain',
    nutritionPer100g: {
      calories: 365,
      protein: 7.1,
      carbs: 78.2,
      fat: 0.9,
      fiber: 1.3,
      sugar: 0.1,
      sodium: 5,
      vitamins: {
        thiamine: 0.07,
        niacin: 1.6,
        vitaminB6: 0.16,
        folate: 8
      },
      minerals: {
        iron: 0.8,
        magnesium: 25,
        phosphorus: 115,
        potassium: 115,
        zinc: 1.1
      }
    },
    culinaryInfo: {
      flavorProfile: ['nutty', 'aromatic', 'delicate'],
      cookingMethods: ['boiling', 'steaming', 'pilaf', 'biryani'],
      pairings: ['saffron', 'cardamom', 'cinnamon', 'curry', 'coconut'],
      texture: 'fluffy, separate grains',
      color: 'white to light golden'
    },
    storage: {
      method: 'airtight container',
      temperature: 'room temperature',
      humidity: 'low',
      shelfLife: '2-3 years',
      freezable: true,
      freezerLife: '6 months cooked'
    },
    seasonality: {
      peak: ['year-round'],
      available: ['year-round'],
      regions: ['India', 'Pakistan', 'Bangladesh', 'Thailand']
    },
    purchasing: {
      selectionTips: ['Look for long, slender grains', 'Check for uniform color', 'Avoid broken grains'],
      qualityIndicators: ['Aromatic smell', 'No musty odor', 'Minimal broken grains'],
      priceRange: 'moderate'
    },
    allergens: [],
    dietaryInfo: {
      vegan: true,
      vegetarian: true,
      glutenFree: true,
      dairyFree: true,
      nutFree: true,
      kosher: true,
      halal: true
    },
    substitutions: [
      { ingredient: 'Jasmine rice', ratio: '1:1', notes: 'Similar texture, slightly different aroma' },
      { ingredient: 'Long-grain white rice', ratio: '1:1', notes: 'Less aromatic but similar cooking properties' }
    ],
    origin: 'Indian subcontinent',
    description: 'Premium long-grain rice known for its distinctive aroma and fluffy texture when cooked.'
  },
  {
    id: 'chicken-breast',
    name: 'Chicken Breast',
    aliases: ['Boneless chicken', 'Chicken fillet', 'White meat'],
    category: 'protein',
    nutritionPer100g: {
      calories: 165,
      protein: 31,
      carbs: 0,
      fat: 3.6,
      fiber: 0,
      sugar: 0,
      sodium: 74,
      vitamins: {
        niacin: 14.8,
        vitaminB6: 1.0,
        vitaminB12: 0.3,
        riboflavin: 0.1
      },
      minerals: {
        phosphorus: 228,
        potassium: 256,
        selenium: 27.6,
        zinc: 0.9
      }
    },
    culinaryInfo: {
      flavorProfile: ['mild', 'neutral', 'lean'],
      cookingMethods: ['grilling', 'baking', 'pan-frying', 'poaching', 'stir-frying'],
      pairings: ['lemon', 'herbs', 'garlic', 'ginger', 'spices'],
      texture: 'tender when cooked properly',
      color: 'white to pale pink raw, white when cooked'
    },
    storage: {
      method: 'refrigerated in original packaging',
      temperature: '0-4°C',
      shelfLife: '1-2 days fresh, 9 months frozen',
      freezable: true,
      freezerLife: '9 months'
    },
    seasonality: {
      peak: ['year-round'],
      available: ['year-round'],
      regions: ['global']
    },
    purchasing: {
      selectionTips: ['Pink color', 'No strong odor', 'Firm texture'],
      qualityIndicators: ['Fresh smell', 'No slimy texture', 'Proper packaging'],
      priceRange: 'moderate'
    },
    allergens: [],
    dietaryInfo: {
      vegan: false,
      vegetarian: false,
      glutenFree: true,
      dairyFree: true,
      nutFree: true,
      kosher: false,
      halal: true
    },
    substitutions: [
      { ingredient: 'Turkey breast', ratio: '1:1', notes: 'Similar cooking time and texture' },
      { ingredient: 'Firm tofu', ratio: '1:1', notes: 'For vegetarian option, marinate well' }
    ],
    origin: 'Domesticated worldwide',
    description: 'Lean protein source that is versatile and takes on flavors well.'
  },
  {
    id: 'tomato',
    name: 'Tomato',
    aliases: ['Fresh tomato', 'Ripe tomato', 'Red tomato'],
    category: 'vegetable',
    nutritionPer100g: {
      calories: 18,
      protein: 0.9,
      carbs: 3.9,
      fat: 0.2,
      fiber: 1.2,
      sugar: 2.6,
      sodium: 5,
      vitamins: {
        vitaminC: 14,
        vitaminK: 7.9,
        folate: 15,
        vitaminA: 42
      },
      minerals: {
        potassium: 237,
        phosphorus: 24,
        magnesium: 11,
        calcium: 10
      }
    },
    culinaryInfo: {
      flavorProfile: ['sweet', 'acidic', 'umami', 'fresh'],
      cookingMethods: ['raw', 'roasting', 'grilling', 'sautéing', 'stewing'],
      pairings: ['basil', 'mozzarella', 'olive oil', 'garlic', 'onion'],
      texture: 'juicy, soft flesh with seeds',
      color: 'red when ripe'
    },
    storage: {
      method: 'room temperature until ripe, then refrigerate',
      temperature: 'room temp or 7-10°C',
      shelfLife: '3-5 days ripe, 1 week refrigerated',
      freezable: true,
      freezerLife: '8 months (for cooking only)'
    },
    seasonality: {
      peak: ['summer', 'early fall'],
      available: ['year-round'],
      regions: ['global', 'greenhouse production']
    },
    purchasing: {
      selectionTips: ['Firm but yielding', 'Deep red color', 'Fresh smell'],
      qualityIndicators: ['No soft spots', 'Attached stem', 'Heavy for size'],
      priceRange: 'budget'
    },
    allergens: [],
    dietaryInfo: {
      vegan: true,
      vegetarian: true,
      glutenFree: true,
      dairyFree: true,
      nutFree: true,
      kosher: true,
      halal: true
    },
    substitutions: [
      { ingredient: 'Canned tomatoes', ratio: '1:1', notes: 'For cooking applications' },
      { ingredient: 'Red bell pepper', ratio: '1:1', notes: 'For color and sweetness, less acidity' }
    ],
    origin: 'South America',
    description: 'Versatile fruit used as vegetable, rich in lycopene and vitamin C.'
  },
  {
    id: 'garam-masala',
    name: 'Garam Masala',
    aliases: ['Indian spice blend', 'Warm spice mix'],
    category: 'spice',
    nutritionPer100g: {
      calories: 379,
      protein: 14.3,
      carbs: 50.5,
      fat: 15.8,
      fiber: 24.6,
      sugar: 2.1,
      sodium: 52,
      vitamins: {
        vitaminC: 7.3,
        vitaminA: 48,
        niacin: 4.4,
        vitaminB6: 0.3
      },
      minerals: {
        iron: 16.2,
        calcium: 1652,
        magnesium: 252,
        potassium: 1267,
        zinc: 4.7
      }
    },
    culinaryInfo: {
      flavorProfile: ['warm', 'aromatic', 'complex', 'slightly sweet'],
      cookingMethods: ['tempering', 'dry roasting', 'grinding fresh'],
      pairings: ['meat', 'vegetables', 'rice', 'lentils', 'yogurt'],
      texture: 'fine powder',
      color: 'brown to reddish-brown'
    },
    storage: {
      method: 'airtight container, dark place',
      temperature: 'room temperature',
      shelfLife: '6 months ground, 1 year whole spices',
      freezable: false
    },
    seasonality: {
      peak: ['year-round'],
      available: ['year-round'],
      regions: ['India', 'Pakistan', 'Bangladesh']
    },
    purchasing: {
      selectionTips: ['Buy whole spices and grind fresh', 'Check expiration date', 'Strong aroma'],
      qualityIndicators: ['Vibrant color', 'Strong fragrance', 'No clumping'],
      priceRange: 'moderate'
    },
    allergens: [],
    dietaryInfo: {
      vegan: true,
      vegetarian: true,
      glutenFree: true,
      dairyFree: true,
      nutFree: true,
      kosher: true,
      halal: true
    },
    substitutions: [
      { ingredient: 'Individual spices', ratio: 'varies', notes: 'Cinnamon, cardamom, cloves, cumin, coriander' },
      { ingredient: 'Curry powder', ratio: '1:1', notes: 'Different flavor profile but similar warmth' }
    ],
    origin: 'Indian subcontinent',
    description: 'Traditional spice blend that adds warmth and complexity to dishes.'
  }
];

export const getIngredientById = (id: string): Ingredient | undefined => {
  return ingredientsDatabase.find(ingredient => ingredient.id === id);
};

export const searchIngredients = (query: string): Ingredient[] => {
  const lowercaseQuery = query.toLowerCase();
  return ingredientsDatabase.filter(ingredient =>
    ingredient.name.toLowerCase().includes(lowercaseQuery) ||
    ingredient.aliases.some(alias => alias.toLowerCase().includes(lowercaseQuery)) ||
    ingredient.category.toLowerCase().includes(lowercaseQuery)
  );
};

export const getIngredientsByCategory = (category: string): Ingredient[] => {
  return ingredientsDatabase.filter(ingredient => ingredient.category === category);
};