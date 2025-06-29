import { AIMessage, UserProfile, MenuItem, CalorieRecommendation } from '../types';
import { CalorieCalculator } from './calorieCalculator';

export class AIFoodAssistant {
  private static knowledgeBase = {
    nutrition: {
      macronutrients: {
        protein: "Essential for muscle building and repair. Found in meat, fish, eggs, dairy, legumes, and nuts.",
        carbohydrates: "Primary energy source. Choose complex carbs like whole grains, vegetables, and fruits.",
        fats: "Important for hormone production and nutrient absorption. Include healthy fats from nuts, avocados, and olive oil."
      },
      vitamins: {
        "vitamin-d": "Important for bone health and immune function. Found in fatty fish, fortified foods, and sunlight exposure.",
        "vitamin-b12": "Essential for nerve function and red blood cell formation. Found in animal products and fortified foods.",
        "vitamin-c": "Antioxidant that supports immune system. Found in citrus fruits, berries, and vegetables."
      },
      minerals: {
        iron: "Essential for oxygen transport. Found in red meat, spinach, and legumes.",
        calcium: "Important for bone health. Found in dairy products, leafy greens, and fortified foods.",
        potassium: "Helps regulate blood pressure. Found in bananas, potatoes, and leafy greens."
      }
    },
    dietaryRestrictions: {
      vegetarian: "Plant-based diet excluding meat and fish. Ensure adequate protein, B12, and iron intake.",
      vegan: "Plant-based diet excluding all animal products. Pay attention to B12, iron, calcium, and omega-3 fatty acids.",
      "gluten-free": "Avoid wheat, barley, and rye. Choose naturally gluten-free grains like rice and quinoa.",
      keto: "Very low-carb, high-fat diet. Limit carbs to 20-50g per day and focus on healthy fats.",
      paleo: "Whole foods diet excluding processed foods, grains, and legumes. Focus on meat, fish, vegetables, and fruits."
    },
    healthConditions: {
      diabetes: "Monitor carbohydrate intake and choose low glycemic index foods. Regular meal timing is important.",
      hypertension: "Limit sodium intake and increase potassium-rich foods. Follow DASH diet principles.",
      "heart-disease": "Limit saturated fats and trans fats. Increase omega-3 fatty acids and fiber intake.",
      "food-allergies": "Carefully read ingredient labels and avoid trigger foods. Consider working with a dietitian."
    }
  };

  static async processMessage(
    message: string, 
    userProfile?: UserProfile, 
    context?: { menuItem?: MenuItem; calorieData?: CalorieRecommendation }
  ): Promise<string> {
    const lowerMessage = message.toLowerCase();
    
    // Calorie and nutrition questions
    if (this.containsKeywords(lowerMessage, ['calorie', 'calories', 'how many calories'])) {
      return this.handleCalorieQuestions(message, userProfile, context);
    }
    
    // Meal recommendations
    if (this.containsKeywords(lowerMessage, ['recommend', 'suggest', 'what should i eat', 'meal plan'])) {
      return this.handleMealRecommendations(message, userProfile);
    }
    
    // Nutrition information
    if (this.containsKeywords(lowerMessage, ['nutrition', 'protein', 'carbs', 'fat', 'vitamins', 'minerals'])) {
      return this.handleNutritionQuestions(message, userProfile);
    }
    
    // Weight management
    if (this.containsKeywords(lowerMessage, ['lose weight', 'gain weight', 'weight loss', 'diet'])) {
      return this.handleWeightManagementQuestions(message, userProfile);
    }
    
    // Food allergies and restrictions
    if (this.containsKeywords(lowerMessage, ['allergy', 'allergic', 'vegetarian', 'vegan', 'gluten'])) {
      return this.handleDietaryRestrictions(message, userProfile);
    }
    
    // Health conditions
    if (this.containsKeywords(lowerMessage, ['diabetes', 'blood pressure', 'heart', 'cholesterol'])) {
      return this.handleHealthConditions(message, userProfile);
    }
    
    // Cooking and preparation
    if (this.containsKeywords(lowerMessage, ['cook', 'recipe', 'prepare', 'how to make'])) {
      return this.handleCookingQuestions(message);
    }
    
    // Food safety
    if (this.containsKeywords(lowerMessage, ['safe', 'spoiled', 'expired', 'food poisoning'])) {
      return this.handleFoodSafetyQuestions(message);
    }
    
    // Default response with general food advice
    return this.generateGeneralFoodAdvice(userProfile);
  }

  private static containsKeywords(message: string, keywords: string[]): boolean {
    return keywords.some(keyword => message.includes(keyword));
  }

  private static handleCalorieQuestions(message: string, userProfile?: UserProfile, context?: any): string {
    if (!userProfile) {
      return "To provide accurate calorie recommendations, I need to know more about you. Please set up your profile with your age, weight, height, activity level, and goals. Generally, adults need 1,800-2,400 calories per day, but this varies significantly based on individual factors.";
    }

    const recommendations = CalorieCalculator.generateRecommendations(userProfile);
    
    if (context?.menuItem) {
      const item = context.menuItem;
      const mealEvaluation = CalorieCalculator.evaluateMealChoice(
        item.nutritionInfo?.calories || 0,
        recommendations.mealCalories.lunch
      );
      
      return `The ${item.name} contains ${item.nutritionInfo?.calories || 'unknown'} calories. ${mealEvaluation.message}\n\nBased on your profile:\n- Daily calorie goal: ${recommendations.dailyCalories} calories\n- Lunch target: ${recommendations.mealCalories.lunch} calories\n- This meal provides ${item.nutritionInfo?.protein || 0}g protein, ${item.nutritionInfo?.carbs || 0}g carbs, and ${item.nutritionInfo?.fat || 0}g fat.`;
    }

    return `Based on your profile, here are your personalized calorie recommendations:\n\n🎯 Daily Goal: ${recommendations.dailyCalories} calories\n\n📊 Meal Breakdown:\n• Breakfast: ${recommendations.mealCalories.breakfast} calories\n• Lunch: ${recommendations.mealCalories.lunch} calories\n• Dinner: ${recommendations.mealCalories.dinner} calories\n• Snacks: ${recommendations.mealCalories.snacks} calories\n\n💪 Daily Macros:\n• Protein: ${recommendations.macros.protein}g\n• Carbs: ${recommendations.macros.carbs}g\n• Fat: ${recommendations.macros.fat}g`;
  }

  private static handleMealRecommendations(message: string, userProfile?: UserProfile): string {
    if (!userProfile) {
      return "I'd love to give you personalized meal recommendations! Please set up your profile first so I can suggest foods that match your goals, dietary restrictions, and preferences.";
    }

    const recommendations = CalorieCalculator.generateRecommendations(userProfile);
    let response = "Here are some personalized meal recommendations based on your profile:\n\n";

    // Goal-specific recommendations
    switch (userProfile.goal) {
      case 'lose-weight':
        response += "🥗 Weight Loss Meals:\n• Grilled chicken salad with mixed vegetables\n• Salmon with steamed broccoli and quinoa\n• Vegetable stir-fry with tofu\n• Greek yogurt with berries and nuts\n\n";
        break;
      case 'gain-weight':
        response += "💪 Weight Gain Meals:\n• Chicken and rice bowl with avocado\n• Pasta with meat sauce and cheese\n• Smoothie with protein powder, banana, and peanut butter\n• Nuts and dried fruit trail mix\n\n";
        break;
      case 'build-muscle':
        response += "🏋️ Muscle Building Meals:\n• Lean beef with sweet potato\n• Protein smoothie with oats and berries\n• Tuna sandwich on whole grain bread\n• Cottage cheese with fruit\n\n";
        break;
    }

    response += `💡 Your daily calorie target is ${recommendations.dailyCalories} calories.\n\n`;
    response += recommendations.recommendations.slice(0, 2).join('\n');

    return response;
  }

  private static handleNutritionQuestions(message: string, userProfile?: UserProfile): string {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('protein')) {
      let response = "🥩 Protein Information:\n" + this.knowledgeBase.nutrition.macronutrients.protein + "\n\n";
      if (userProfile) {
        const recommendations = CalorieCalculator.generateRecommendations(userProfile);
        response += `Based on your profile, you should aim for ${recommendations.macros.protein}g of protein daily.`;
      }
      return response;
    }
    
    if (lowerMessage.includes('carb')) {
      let response = "🍞 Carbohydrate Information:\n" + this.knowledgeBase.nutrition.macronutrients.carbohydrates + "\n\n";
      if (userProfile) {
        const recommendations = CalorieCalculator.generateRecommendations(userProfile);
        response += `Your daily carb target is ${recommendations.macros.carbs}g.`;
      }
      return response;
    }
    
    if (lowerMessage.includes('fat')) {
      let response = "🥑 Fat Information:\n" + this.knowledgeBase.nutrition.macronutrients.fats + "\n\n";
      if (userProfile) {
        const recommendations = CalorieCalculator.generateRecommendations(userProfile);
        response += `Your daily fat target is ${recommendations.macros.fat}g.`;
      }
      return response;
    }

    return "Nutrition is complex! Here are the key macronutrients:\n\n🥩 Protein: " + this.knowledgeBase.nutrition.macronutrients.protein + "\n\n🍞 Carbs: " + this.knowledgeBase.nutrition.macronutrients.carbohydrates + "\n\n🥑 Fats: " + this.knowledgeBase.nutrition.macronutrients.fats;
  }

  private static handleWeightManagementQuestions(message: string, userProfile?: UserProfile): string {
    if (!userProfile) {
      return "For personalized weight management advice, please set up your profile with your current weight, goal weight, and activity level. Generally, safe weight loss is 1-2 pounds per week through a combination of diet and exercise.";
    }

    const recommendations = CalorieCalculator.generateRecommendations(userProfile);
    let response = "";

    switch (userProfile.goal) {
      case 'lose-weight':
        response = `🎯 Weight Loss Plan:\n\n• Daily calorie target: ${recommendations.dailyCalories} calories\n• This creates a moderate deficit for healthy weight loss\n• Focus on protein-rich foods to maintain muscle\n• Include plenty of vegetables for fiber and nutrients\n\n`;
        break;
      case 'gain-weight':
        response = `💪 Weight Gain Plan:\n\n• Daily calorie target: ${recommendations.dailyCalories} calories\n• Eat calorie-dense, nutritious foods\n• Include healthy fats and complex carbs\n• Consider strength training to build muscle\n\n`;
        break;
      default:
        response = `⚖️ Weight Maintenance:\n\n• Daily calorie target: ${recommendations.dailyCalories} calories\n• Focus on balanced nutrition\n• Regular physical activity is important\n\n`;
    }

    response += "💡 Key Tips:\n" + recommendations.recommendations.slice(0, 3).join('\n');
    return response;
  }

  private static handleDietaryRestrictions(message: string, userProfile?: UserProfile): string {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('vegetarian')) {
      return "🌱 Vegetarian Diet:\n" + this.knowledgeBase.dietaryRestrictions.vegetarian + "\n\nKey nutrients to focus on: protein (legumes, nuts, dairy), iron (spinach, lentils), and B12 (fortified foods or supplements).";
    }
    
    if (lowerMessage.includes('vegan')) {
      return "🌿 Vegan Diet:\n" + this.knowledgeBase.dietaryRestrictions.vegan + "\n\nEssential supplements: B12, and consider vitamin D, omega-3, and iron based on your diet.";
    }
    
    if (lowerMessage.includes('gluten')) {
      return "🌾 Gluten-Free Diet:\n" + this.knowledgeBase.dietaryRestrictions['gluten-free'] + "\n\nAlways check labels carefully, as gluten can be hidden in sauces, seasonings, and processed foods.";
    }

    return "I can help with various dietary restrictions including vegetarian, vegan, gluten-free, keto, and paleo diets. What specific dietary needs do you have?";
  }

  private static handleHealthConditions(message: string, userProfile?: UserProfile): string {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('diabetes')) {
      return "🩺 Diabetes Management:\n" + this.knowledgeBase.healthConditions.diabetes + "\n\nFocus on complex carbohydrates, lean proteins, and healthy fats. Monitor portion sizes and consider working with a registered dietitian.";
    }
    
    if (lowerMessage.includes('blood pressure') || lowerMessage.includes('hypertension')) {
      return "❤️ Blood Pressure Management:\n" + this.knowledgeBase.healthConditions.hypertension + "\n\nThe DASH diet is particularly effective for managing blood pressure.";
    }

    return "For specific health conditions, it's important to work with healthcare professionals. I can provide general nutrition information, but always consult your doctor or a registered dietitian for medical nutrition therapy.";
  }

  private static handleCookingQuestions(message: string): string {
    return "👨‍🍳 Cooking Tips:\n\n• Start with simple recipes and basic techniques\n• Meal prep on weekends to save time\n• Use herbs and spices instead of salt for flavor\n• Try different cooking methods: grilling, roasting, steaming\n• Keep healthy ingredients on hand for quick meals\n\nWhat specific cooking technique or recipe are you interested in?";
  }

  private static handleFoodSafetyQuestions(message: string): string {
    return "🛡️ Food Safety Guidelines:\n\n• Keep hot foods hot (above 140°F) and cold foods cold (below 40°F)\n• When in doubt, throw it out\n• Follow the 2-hour rule: don't leave perishable foods at room temperature for more than 2 hours\n• Check expiration dates regularly\n• Wash hands and surfaces frequently\n• Cook meat to proper internal temperatures\n\nWhat specific food safety concern do you have?";
  }

  private static generateGeneralFoodAdvice(userProfile?: UserProfile): string {
    let advice = "🍎 General Nutrition Tips:\n\n";
    advice += "• Eat a variety of colorful fruits and vegetables\n";
    advice += "• Choose whole grains over refined grains\n";
    advice += "• Include lean protein sources in your meals\n";
    advice += "• Stay hydrated with water throughout the day\n";
    advice += "• Practice portion control\n";
    advice += "• Limit processed foods and added sugars\n\n";
    
    if (userProfile) {
      const recommendations = CalorieCalculator.generateRecommendations(userProfile);
      advice += `Based on your profile, your daily calorie goal is ${recommendations.dailyCalories} calories.\n\n`;
    }
    
    advice += "💬 I can help you with:\n";
    advice += "• Calorie and nutrition information\n";
    advice += "• Meal recommendations\n";
    advice += "• Weight management advice\n";
    advice += "• Dietary restrictions and allergies\n";
    advice += "• Cooking tips and food safety\n\n";
    advice += "What would you like to know about food and nutrition?";
    
    return advice;
  }
}