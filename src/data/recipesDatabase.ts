import { Ingredient } from './ingredientsDatabase';

export interface RecipeIngredient {
  ingredientId: string;
  amount: number;
  unit: string;
  preparation?: string;
  optional?: boolean;
  substitutions?: {
    ingredientId: string;
    amount: number;
    unit: string;
    notes: string;
  }[];
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  cuisine: string;
  category: 'breakfast' | 'lunch' | 'dinner' | 'snack' | 'dessert' | 'beverage' | 'appetizer';
  skillLevel: 1 | 2 | 3 | 4 | 5;
  skillDescription: string;
  timing: {
    prepTime: number; // minutes
    activeTime: number; // minutes
    passiveTime: number; // minutes
    totalTime: number; // minutes
  };
  yield: {
    servings: number;
    volume?: string;
    weight?: string;
  };
  ingredients: RecipeIngredient[];
  equipment: {
    essential: string[];
    optional: string[];
    substitutions: { tool: string; alternative: string; notes: string }[];
  };
  method: {
    step: number;
    instruction: string;
    technique?: string;
    temperature?: string;
    timing?: string;
    visualCues?: string[];
    tips?: string[];
  }[];
  nutritionPerServing: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
    sugar: number;
    sodium: number;
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
    keto: boolean;
    paleo: boolean;
    lowCarb: boolean;
    lowFat: boolean;
    highProtein: boolean;
  };
  storage: {
    refrigerator: string;
    freezer?: string;
    roomTemp?: string;
  };
  reheating: {
    method: string;
    temperature?: string;
    time?: string;
    notes: string;
  }[];
  tips: {
    success: string[];
    troubleshooting: { problem: string; solution: string }[];
    variations: { name: string; changes: string }[];
  };
  photos: {
    main: string;
    steps?: { step: number; url: string; caption: string }[];
    final?: string[];
  };
  source?: string;
  author: string;
  dateCreated: string;
  lastModified: string;
  rating?: number;
  reviews?: number;
  tags: string[];
  costEstimate: 'budget' | 'moderate' | 'expensive';
  region: string;
  season?: string[];
  occasion?: string[];
}

export const recipesDatabase: Recipe[] = [
  {
    id: 'chicken-biryani',
    title: 'Authentic Chicken Biryani',
    description: 'Traditional layered rice dish with marinated chicken, aromatic spices, and saffron',
    cuisine: 'Bengali',
    category: 'dinner',
    skillLevel: 4,
    skillDescription: 'Advanced - requires multiple cooking techniques and timing',
    timing: {
      prepTime: 45,
      activeTime: 60,
      passiveTime: 45,
      totalTime: 150
    },
    yield: {
      servings: 6,
      weight: '2.5 kg'
    },
    ingredients: [
      {
        ingredientId: 'basmati-rice',
        amount: 500,
        unit: 'g',
        preparation: 'soaked for 30 minutes'
      },
      {
        ingredientId: 'chicken-breast',
        amount: 1000,
        unit: 'g',
        preparation: 'cut into pieces'
      },
      {
        ingredientId: 'garam-masala',
        amount: 2,
        unit: 'tsp'
      },
      {
        ingredientId: 'tomato',
        amount: 2,
        unit: 'medium',
        preparation: 'chopped'
      }
    ],
    equipment: {
      essential: ['Heavy-bottomed pot with lid', 'Large mixing bowl', 'Strainer', 'Small pan'],
      optional: ['Pressure cooker', 'Rice cooker'],
      substitutions: [
        { tool: 'Heavy-bottomed pot', alternative: 'Dutch oven', notes: 'Ensures even heat distribution' }
      ]
    },
    method: [
      {
        step: 1,
        instruction: 'Marinate chicken pieces with yogurt, garam masala, salt, and ginger-garlic paste',
        timing: '30 minutes minimum',
        tips: ['Longer marination (2-4 hours) gives better flavor']
      },
      {
        step: 2,
        instruction: 'Soak basmati rice in water for 30 minutes, then drain',
        visualCues: ['Rice grains should be slightly swollen'],
        tips: ['This prevents rice from breaking during cooking']
      },
      {
        step: 3,
        instruction: 'Heat oil in heavy-bottomed pot and fry onions until golden brown',
        temperature: 'Medium-high heat',
        timing: '8-10 minutes',
        visualCues: ['Onions should be crispy and deep golden'],
        tips: ['Save some fried onions for garnish']
      },
      {
        step: 4,
        instruction: 'Add marinated chicken and cook until 70% done',
        timing: '15-20 minutes',
        temperature: 'Medium heat',
        visualCues: ['Chicken should be mostly white but slightly pink inside']
      },
      {
        step: 5,
        instruction: 'Boil water with whole spices, add rice and cook until 70% done',
        temperature: 'Rolling boil',
        timing: '8-10 minutes',
        visualCues: ['Rice should be firm but cooked on outside']
      },
      {
        step: 6,
        instruction: 'Layer rice over chicken, sprinkle saffron milk and fried onions',
        technique: 'Dum cooking',
        tips: ['Create tight seal with aluminum foil before placing lid']
      },
      {
        step: 7,
        instruction: 'Cook on high heat for 3 minutes, then reduce to lowest heat for 45 minutes',
        temperature: 'High then lowest',
        timing: '48 minutes total',
        visualCues: ['Steam should escape initially, then minimal steam']
      }
    ],
    nutritionPerServing: {
      calories: 520,
      protein: 35,
      carbs: 65,
      fat: 12,
      fiber: 2,
      sugar: 4,
      sodium: 680
    },
    allergens: ['dairy'],
    dietaryInfo: {
      vegan: false,
      vegetarian: false,
      glutenFree: true,
      dairyFree: false,
      nutFree: true,
      kosher: false,
      halal: true,
      keto: false,
      paleo: false,
      lowCarb: false,
      lowFat: false,
      highProtein: true
    },
    storage: {
      refrigerator: '3-4 days in airtight container',
      freezer: '2-3 months in freezer-safe container'
    },
    reheating: [
      {
        method: 'Microwave',
        temperature: 'Medium power',
        time: '2-3 minutes',
        notes: 'Add 1-2 tbsp water to prevent drying'
      },
      {
        method: 'Stovetop',
        temperature: 'Low heat',
        time: '5-7 minutes',
        notes: 'Cover and stir occasionally'
      }
    ],
    tips: {
      success: [
        'Use aged basmati rice for best results',
        'Don\'t skip the marination time',
        'Maintain proper layering for authentic taste',
        'Let it rest for 10 minutes before serving'
      ],
      troubleshooting: [
        { problem: 'Rice is mushy', solution: 'Reduce cooking time for rice, ensure 70% cooking only' },
        { problem: 'Chicken is dry', solution: 'Increase marination time and don\'t overcook' },
        { problem: 'Bottom is burnt', solution: 'Use heavy-bottomed pot and lowest heat setting' }
      ],
      variations: [
        { name: 'Vegetable Biryani', changes: 'Replace chicken with mixed vegetables and paneer' },
        { name: 'Mutton Biryani', changes: 'Use mutton pieces, increase cooking time by 30 minutes' }
      ]
    },
    photos: {
      main: 'https://images.pexels.com/photos/11220209/pexels-photo-11220209.jpeg?auto=compress&cs=tinysrgb&w=800',
      steps: [
        { step: 3, url: 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg', caption: 'Golden fried onions' },
        { step: 6, url: 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg', caption: 'Layered rice and chicken' }
      ]
    },
    author: 'Chef Rahman',
    dateCreated: '2024-01-15',
    lastModified: '2024-01-20',
    rating: 4.8,
    reviews: 156,
    tags: ['traditional', 'festive', 'aromatic', 'one-pot', 'special occasion'],
    costEstimate: 'moderate',
    region: 'Bangladesh',
    season: ['year-round'],
    occasion: ['dinner', 'special occasions', 'festivals']
  },
  {
    id: 'dal-tadka',
    title: 'Dal Tadka (Tempered Lentils)',
    description: 'Comforting yellow lentils with aromatic tempering of spices',
    cuisine: 'Bengali',
    category: 'lunch',
    skillLevel: 2,
    skillDescription: 'Beginner-Intermediate - basic cooking skills required',
    timing: {
      prepTime: 10,
      activeTime: 25,
      passiveTime: 5,
      totalTime: 40
    },
    yield: {
      servings: 4,
      volume: '800ml'
    },
    ingredients: [
      {
        ingredientId: 'yellow-lentils',
        amount: 200,
        unit: 'g',
        preparation: 'washed and drained'
      },
      {
        ingredientId: 'tomato',
        amount: 1,
        unit: 'medium',
        preparation: 'chopped'
      },
      {
        ingredientId: 'garam-masala',
        amount: 0.5,
        unit: 'tsp'
      }
    ],
    equipment: {
      essential: ['Medium saucepan', 'Small pan for tempering', 'Wooden spoon'],
      optional: ['Pressure cooker', 'Immersion blender'],
      substitutions: [
        { tool: 'Pressure cooker', alternative: 'Regular pot', notes: 'Increase cooking time by 15 minutes' }
      ]
    },
    method: [
      {
        step: 1,
        instruction: 'Wash lentils until water runs clear, then boil with turmeric and salt',
        timing: '15-20 minutes',
        visualCues: ['Lentils should be soft and mushy'],
        tips: ['Add water gradually to achieve desired consistency']
      },
      {
        step: 2,
        instruction: 'Heat ghee in small pan, add cumin seeds and let them splutter',
        temperature: 'Medium heat',
        timing: '30 seconds',
        technique: 'Tempering (Tadka)',
        visualCues: ['Cumin seeds should sizzle and become aromatic']
      },
      {
        step: 3,
        instruction: 'Add chopped onions and cook until translucent',
        timing: '3-4 minutes',
        visualCues: ['Onions should be soft and slightly golden']
      },
      {
        step: 4,
        instruction: 'Add ginger-garlic paste, cook for 1 minute, then add tomatoes',
        timing: '3-4 minutes',
        visualCues: ['Tomatoes should break down and become pulpy']
      },
      {
        step: 5,
        instruction: 'Pour tempering over cooked lentils, simmer for 5 minutes',
        timing: '5 minutes',
        tips: ['Adjust consistency with hot water if needed']
      }
    ],
    nutritionPerServing: {
      calories: 180,
      protein: 12,
      carbs: 28,
      fat: 4,
      fiber: 8,
      sugar: 3,
      sodium: 420
    },
    allergens: ['dairy'],
    dietaryInfo: {
      vegan: false,
      vegetarian: true,
      glutenFree: true,
      dairyFree: false,
      nutFree: true,
      kosher: true,
      halal: true,
      keto: false,
      paleo: false,
      lowCarb: false,
      lowFat: true,
      highProtein: true
    },
    storage: {
      refrigerator: '4-5 days in airtight container',
      freezer: '3 months in freezer-safe container'
    },
    reheating: [
      {
        method: 'Stovetop',
        temperature: 'Medium heat',
        time: '3-5 minutes',
        notes: 'Add water if too thick, stir frequently'
      }
    ],
    tips: {
      success: [
        'Don\'t skip the tempering - it adds essential flavor',
        'Adjust consistency to your preference',
        'Fresh coriander garnish enhances taste'
      ],
      troubleshooting: [
        { problem: 'Dal is too thick', solution: 'Add hot water gradually while stirring' },
        { problem: 'Lacks flavor', solution: 'Ensure proper tempering and adequate salt' }
      ],
      variations: [
        { name: 'Mixed Dal', changes: 'Use combination of different lentils' },
        { name: 'Spinach Dal', changes: 'Add chopped spinach in last 5 minutes' }
      ]
    },
    photos: {
      main: 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    author: 'Chef Fatima',
    dateCreated: '2024-01-10',
    lastModified: '2024-01-15',
    rating: 4.6,
    reviews: 89,
    tags: ['comfort food', 'healthy', 'protein-rich', 'everyday meal'],
    costEstimate: 'budget',
    region: 'Bangladesh',
    season: ['year-round'],
    occasion: ['lunch', 'dinner', 'everyday meal']
  }
];

export const getRecipeById = (id: string): Recipe | undefined => {
  return recipesDatabase.find(recipe => recipe.id === id);
};

export const searchRecipes = (query: string): Recipe[] => {
  const lowercaseQuery = query.toLowerCase();
  return recipesDatabase.filter(recipe =>
    recipe.title.toLowerCase().includes(lowercaseQuery) ||
    recipe.description.toLowerCase().includes(lowercaseQuery) ||
    recipe.cuisine.toLowerCase().includes(lowercaseQuery) ||
    recipe.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};

export const getRecipesByCategory = (category: string): Recipe[] => {
  return recipesDatabase.filter(recipe => recipe.category === category);
};

export const getRecipesByCuisine = (cuisine: string): Recipe[] => {
  return recipesDatabase.filter(recipe => recipe.cuisine.toLowerCase() === cuisine.toLowerCase());
};

export const getRecipesBySkillLevel = (level: number): Recipe[] => {
  return recipesDatabase.filter(recipe => recipe.skillLevel === level);
};

export const getRecipesByDietaryRestriction = (restriction: keyof Recipe['dietaryInfo']): Recipe[] => {
  return recipesDatabase.filter(recipe => recipe.dietaryInfo[restriction] === true);
};