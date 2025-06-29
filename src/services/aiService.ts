import { UserProfile, MenuItem, User, AIResponse } from '../types';
import { openAIService } from './openaiService';

interface AIContext {
  user?: User;
  userProfile?: UserProfile;
  menuItem?: MenuItem;
  conversationHistory?: any[];
  timestamp: Date;
}

export class AdvancedAIService {
  static async processAdvancedMessage(message: string, context: AIContext): Promise<AIResponse> {
    try {
      // Try OpenAI first
      const response = await openAIService.processAdvancedMessage(message, context);
      
      // Check if OpenAI returned an error
      if (response.error) {
        console.warn('OpenAI API unavailable, using fallback:', response.error);
        return this.getFallbackResponse(message, context);
      }
      
      return response;
    } catch (error) {
      console.warn('AI Service fallback triggered:', error);
      // Fallback to local processing
      return this.getFallbackResponse(message, context);
    }
  }

  private static getFallbackResponse(message: string, context: AIContext): AIResponse {
    const lowerMessage = message.toLowerCase();
    
    // Personalized greeting based on user context
    if (this.isGreeting(lowerMessage)) {
      return this.generatePersonalizedGreeting(context);
    }

    // Calorie and nutrition analysis
    if (this.containsKeywords(lowerMessage, ['calorie', 'calories', 'nutrition', 'macro'])) {
      return this.handleNutritionAnalysis(message, context);
    }

    // Meal planning and recommendations
    if (this.containsKeywords(lowerMessage, ['meal plan', 'recommend', 'suggest', 'what should i eat'])) {
      return this.generateMealRecommendations(message, context);
    }

    // Weight management
    if (this.containsKeywords(lowerMessage, ['lose weight', 'gain weight', 'weight loss', 'diet plan'])) {
      return this.handleWeightManagement(message, context);
    }

    // Default comprehensive response
    return this.generateComprehensiveResponse(message, context);
  }

  private static isGreeting(message: string): boolean {
    const greetings = ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening'];
    return greetings.some(greeting => message.includes(greeting));
  }

  private static containsKeywords(message: string, keywords: string[]): boolean {
    return keywords.some(keyword => message.includes(keyword));
  }

  private static generatePersonalizedGreeting(context: AIContext): AIResponse {
    const { user, userProfile } = context;
    let greeting = `Hello${user ? ` ${user.name}` : ''}! 👋\n\n`;
    
    if (userProfile) {
      greeting += `I see you're focused on ${userProfile.goal.replace('-', ' ')} with a ${userProfile.activityLevel.replace('-', ' ')} lifestyle. `;
      greeting += `I'm here to provide personalized nutrition advice tailored to your goals!\n\n`;
    }
    
    greeting += `I can help you with:\n`;
    greeting += `🎯 Personalized meal planning\n`;
    greeting += `📊 Nutrition tracking and analysis\n`;
    greeting += `🍽️ Recipe suggestions\n`;
    greeting += `💪 Fitness nutrition advice\n`;
    greeting += `🏥 Health condition management\n`;
    greeting += `🛒 Smart food ordering\n\n`;
    greeting += `What would you like to explore today?`;

    return {
      content: greeting,
      confidence: 0.95,
      suggestions: [
        "Calculate my daily calorie needs",
        "Suggest a meal plan for my goals",
        "Analyze my current diet"
      ]
    };
  }

  private static handleNutritionAnalysis(message: string, context: AIContext): AIResponse {
    const { userProfile, menuItem } = context;
    let response = "";

    if (menuItem && message.includes('analyze')) {
      response += `🔍 **Nutrition Analysis: ${menuItem.name}**\n\n`;
      if (menuItem.nutritionInfo) {
        response += `📊 **Nutritional Breakdown:**\n`;
        response += `• Calories: ${menuItem.nutritionInfo.calories}\n`;
        response += `• Protein: ${menuItem.nutritionInfo.protein}g\n`;
        response += `• Carbohydrates: ${menuItem.nutritionInfo.carbs}g\n`;
        response += `• Fat: ${menuItem.nutritionInfo.fat}g\n\n`;

        if (userProfile) {
          const dailyCalories = this.calculateDailyCalories(userProfile);
          const mealPercentage = ((menuItem.nutritionInfo.calories / dailyCalories) * 100).toFixed(1);
          response += `💡 **Personal Impact:**\n`;
          response += `• This represents ${mealPercentage}% of your daily calorie goal\n`;
          response += `• ${this.getMealRecommendation(menuItem.nutritionInfo.calories, dailyCalories, userProfile.goal)}\n\n`;
        }
      }
    } else if (userProfile) {
      const dailyCalories = this.calculateDailyCalories(userProfile);
      const macros = this.calculateMacros(dailyCalories, userProfile.goal);
      
      response += `🎯 **Your Personalized Nutrition Plan**\n\n`;
      response += `📊 **Daily Targets:**\n`;
      response += `• Calories: ${dailyCalories}\n`;
      response += `• Protein: ${macros.protein}g\n`;
      response += `• Carbs: ${macros.carbs}g\n`;
      response += `• Fat: ${macros.fat}g\n\n`;
      
      response += this.getGoalSpecificAdvice(userProfile.goal);
    } else {
      response = `To provide accurate nutrition analysis, I'd need to know more about you! Please set up your profile with:\n\n`;
      response += `• Age, height, and weight\n`;
      response += `• Activity level\n`;
      response += `• Health goals\n`;
      response += `• Any dietary restrictions\n\n`;
      response += `This will allow me to give you personalized recommendations! 🎯`;
    }

    return {
      content: response,
      confidence: 0.9,
      suggestions: [
        "Create a meal plan for me",
        "What foods should I focus on?",
        "How can I track my progress?"
      ]
    };
  }

  private static generateMealRecommendations(message: string, context: AIContext): AIResponse {
    const { userProfile } = context;
    let response = "";

    if (!userProfile) {
      return {
        content: "I'd love to create personalized meal recommendations for you! Please set up your profile first so I can suggest meals that perfectly match your goals, dietary restrictions, and preferences. 🎯",
        confidence: 0.8
      };
    }

    response += `🍽️ **Personalized Meal Recommendations**\n\n`;
    
    const dailyCalories = this.calculateDailyCalories(userProfile);
    const goalMeals = this.getGoalSpecificMeals(userProfile.goal);
    
    response += `**Based on your ${userProfile.goal.replace('-', ' ')} goal:**\n\n`;
    
    response += `🌅 **Breakfast (${Math.round(dailyCalories * 0.25)} calories):**\n`;
    response += goalMeals.breakfast.map(meal => `• ${meal}`).join('\n') + '\n\n';
    
    response += `🌞 **Lunch (${Math.round(dailyCalories * 0.35)} calories):**\n`;
    response += goalMeals.lunch.map(meal => `• ${meal}`).join('\n') + '\n\n';
    
    response += `🌙 **Dinner (${Math.round(dailyCalories * 0.30)} calories):**\n`;
    response += goalMeals.dinner.map(meal => `• ${meal}`).join('\n') + '\n\n';

    return {
      content: response,
      confidence: 0.95,
      suggestions: [
        "Give me specific recipes",
        "How do I meal prep?",
        "What about dining out options?"
      ]
    };
  }

  private static handleWeightManagement(message: string, context: AIContext): AIResponse {
    const { userProfile } = context;
    
    if (!userProfile) {
      return {
        content: "For personalized weight management advice, please set up your profile! I can then create a customized plan based on your current stats, goals, and lifestyle. 📊",
        confidence: 0.7
      };
    }

    const dailyCalories = this.calculateDailyCalories(userProfile);
    let response = `🎯 **Your ${userProfile.goal.replace('-', ' ').toUpperCase()} Plan**\n\n`;
    
    response += `📊 **Your Numbers:**\n`;
    response += `• Current: ${userProfile.weight}kg, ${userProfile.height}cm\n`;
    response += `• Daily Calories: ${dailyCalories}\n`;
    response += `• Activity Level: ${userProfile.activityLevel.replace('-', ' ')}\n\n`;
    
    switch (userProfile.goal) {
      case 'lose-weight':
        response += `🔥 **Weight Loss Strategy:**\n`;
        response += `• Create a moderate 500-calorie daily deficit\n`;
        response += `• Aim for 1-2 pounds per week loss\n`;
        response += `• Focus on high-protein, high-fiber foods\n`;
        response += `• Stay hydrated and get adequate sleep\n\n`;
        break;
        
      case 'gain-weight':
        response += `💪 **Weight Gain Strategy:**\n`;
        response += `• Create a 500-calorie daily surplus\n`;
        response += `• Aim for 1-2 pounds per week gain\n`;
        response += `• Focus on nutrient-dense, calorie-rich foods\n`;
        response += `• Include strength training\n\n`;
        break;
        
      case 'build-muscle':
        response += `🏋️ **Muscle Building Strategy:**\n`;
        response += `• Moderate calorie surplus (300-500 calories)\n`;
        response += `• High protein intake (1.6-2.2g per kg body weight)\n`;
        response += `• Time protein around workouts\n`;
        response += `• Include complex carbs for energy\n\n`;
        break;
    }

    return {
      content: response,
      confidence: 0.92,
      suggestions: [
        "Create a weekly meal plan",
        "What exercises complement my diet?",
        "How do I track my progress?"
      ]
    };
  }

  private static generateComprehensiveResponse(message: string, context: AIContext): AIResponse {
    let response = `🤖 **AI Food Assistant - Comprehensive Help**\n\n`;
    
    response += `I'm here to help with all your food and nutrition needs! I can assist you with:\n\n`;
    
    response += `🎯 **Personalized Nutrition:**\n`;
    response += `• Calculate your daily calorie and macro needs\n`;
    response += `• Create meal plans based on your goals\n`;
    response += `• Analyze food choices and suggest improvements\n\n`;
    
    response += `🍽️ **Meal Planning & Recipes:**\n`;
    response += `• Suggest recipes for your dietary needs\n`;
    response += `• Help with meal prep strategies\n`;
    response += `• Provide cooking tips and techniques\n\n`;
    
    response += `🏥 **Health & Wellness:**\n`;
    response += `• Nutrition advice for health conditions\n`;
    response += `• Weight management strategies\n`;
    response += `• Sports nutrition guidance\n\n`;
    
    if (context.userProfile) {
      response += `💡 **Quick Tip for You:** Based on your ${context.userProfile.goal.replace('-', ' ')} goal, `;
      response += this.getQuickPersonalizedTip(context.userProfile);
    } else {
      response += `💡 **Get Started:** Set up your profile for personalized recommendations!\n`;
    }
    
    response += `\n❓ **What would you like to explore?** Just ask me anything about food, nutrition, or healthy living!`;

    return {
      content: response,
      confidence: 0.75,
      suggestions: [
        "Set up my nutrition profile",
        "Create a meal plan for me",
        "Help me with my current diet"
      ]
    };
  }

  // Helper methods
  private static calculateDailyCalories(profile: UserProfile): number {
    let bmr: number;
    if (profile.gender === 'male') {
      bmr = 10 * profile.weight + 6.25 * profile.height - 5 * profile.age + 5;
    } else {
      bmr = 10 * profile.weight + 6.25 * profile.height - 5 * profile.age - 161;
    }

    const activityMultipliers = {
      'sedentary': 1.2,
      'lightly-active': 1.375,
      'moderately-active': 1.55,
      'very-active': 1.725,
      'extremely-active': 1.9
    };

    const tdee = bmr * activityMultipliers[profile.activityLevel];

    switch (profile.goal) {
      case 'lose-weight': return Math.round(tdee - 500);
      case 'gain-weight': return Math.round(tdee + 500);
      case 'build-muscle': return Math.round(tdee + 300);
      default: return Math.round(tdee);
    }
  }

  private static calculateMacros(calories: number, goal: string) {
    let proteinPercent = 25, carbPercent = 45, fatPercent = 30;
    
    if (goal === 'build-muscle') {
      proteinPercent = 30; carbPercent = 40; fatPercent = 30;
    } else if (goal === 'lose-weight') {
      proteinPercent = 30; carbPercent = 35; fatPercent = 35;
    }

    return {
      protein: Math.round((calories * proteinPercent / 100) / 4),
      carbs: Math.round((calories * carbPercent / 100) / 4),
      fat: Math.round((calories * fatPercent / 100) / 9)
    };
  }

  private static getMealRecommendation(mealCalories: number, dailyCalories: number, goal: string): string {
    const percentage = (mealCalories / dailyCalories) * 100;
    
    if (percentage < 20) return "This is a light meal - consider adding some healthy sides.";
    if (percentage < 35) return "This fits well within your daily calorie goals!";
    if (percentage < 50) return "This is a substantial meal - balance with lighter options today.";
    return "This is quite calorie-dense - consider sharing or saving half for later.";
  }

  private static getGoalSpecificAdvice(goal: string): string {
    switch (goal) {
      case 'lose-weight':
        return `🔥 **Weight Loss Focus:** Prioritize protein and fiber to stay satisfied while in a calorie deficit.`;
      case 'gain-weight':
        return `💪 **Weight Gain Focus:** Include healthy, calorie-dense foods like nuts, avocados, and whole grains.`;
      case 'build-muscle':
        return `🏋️ **Muscle Building Focus:** Consume protein within 30 minutes post-workout.`;
      default:
        return `⚖️ **Maintenance Focus:** Focus on balanced nutrition and consistent eating patterns.`;
    }
  }

  private static getGoalSpecificMeals(goal: string) {
    const meals = {
      'lose-weight': {
        breakfast: [
          "Greek yogurt with berries and granola",
          "Vegetable omelet with whole grain toast",
          "Overnight oats with chia seeds"
        ],
        lunch: [
          "Large salad with grilled chicken",
          "Vegetable soup with whole grain bread",
          "Quinoa bowl with roasted vegetables"
        ],
        dinner: [
          "Grilled salmon with steamed broccoli",
          "Chicken stir-fry with mixed vegetables",
          "Lentil curry with cauliflower rice"
        ]
      },
      'gain-weight': {
        breakfast: [
          "Oatmeal with nuts and dried fruit",
          "Whole grain pancakes with nut butter",
          "Smoothie with protein powder and oats"
        ],
        lunch: [
          "Quinoa bowl with chickpeas and avocado",
          "Sandwich with lean meat and cheese",
          "Pasta salad with olive oil"
        ],
        dinner: [
          "Salmon with quinoa and vegetables",
          "Chicken thighs with sweet potato",
          "Beef stir-fry with brown rice"
        ]
      },
      'build-muscle': {
        breakfast: [
          "Protein pancakes with Greek yogurt",
          "Scrambled eggs with spinach",
          "Protein smoothie with banana"
        ],
        lunch: [
          "Grilled chicken with quinoa",
          "Tuna salad with chickpeas",
          "Turkey and avocado wrap"
        ],
        dinner: [
          "Lean beef with sweet potato",
          "Grilled fish with brown rice",
          "Turkey meatballs with pasta"
        ]
      }
    };

    return meals[goal as keyof typeof meals] || meals['lose-weight'];
  }

  private static getQuickPersonalizedTip(profile: UserProfile): string {
    switch (profile.goal) {
      case 'lose-weight':
        return "focus on high-protein, high-fiber foods to stay satisfied.";
      case 'gain-weight':
        return "include healthy, calorie-dense foods in every meal.";
      case 'build-muscle':
        return "consume protein within 30 minutes after workouts.";
      default:
        return "maintain balanced nutrition with consistent meal timing.";
    }
  }
}