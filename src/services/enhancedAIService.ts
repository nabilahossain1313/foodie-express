import { UserProfile, MenuItem, User, AIResponse, MapLocation } from '../types';
import { openAIService } from './openaiService';

interface EnhancedAIContext {
  user?: User;
  userProfile?: UserProfile;
  menuItem?: MenuItem;
  conversationHistory?: any[];
  location?: MapLocation;
  weather?: any;
  orderHistory?: any[];
  preferences?: any;
  timestamp: Date;
}

export class EnhancedAIService {
  static async processAdvancedMessage(message: string, context: EnhancedAIContext): Promise<AIResponse> {
    try {
      // Try OpenAI first with enhanced context
      const response = await openAIService.processAdvancedMessage(message, context);
      
      if (response.error) {
        console.warn('OpenAI API unavailable, using enhanced fallback:', response.error);
        return this.getEnhancedFallbackResponse(message, context);
      }
      
      return response;
    } catch (error) {
      console.warn('Enhanced AI Service fallback triggered:', error);
      return this.getEnhancedFallbackResponse(message, context);
    }
  }

  private static getEnhancedFallbackResponse(message: string, context: EnhancedAIContext): AIResponse {
    const lowerMessage = message.toLowerCase();
    
    // Voice command processing
    if (this.isVoiceCommand(lowerMessage)) {
      return this.handleVoiceCommand(message, context);
    }

    // Location-based queries
    if (this.containsKeywords(lowerMessage, ['near me', 'nearby', 'closest', 'around here'])) {
      return this.handleLocationBasedQuery(message, context);
    }

    // Order management
    if (this.containsKeywords(lowerMessage, ['order', 'track', 'cancel', 'modify', 'reorder'])) {
      return this.handleOrderManagement(message, context);
    }

    // Smart recommendations
    if (this.containsKeywords(lowerMessage, ['recommend', 'suggest', 'what should', 'best'])) {
      return this.generateSmartRecommendations(message, context);
    }

    // Weather-based suggestions
    if (this.containsKeywords(lowerMessage, ['weather', 'hot', 'cold', 'rainy', 'sunny'])) {
      return this.handleWeatherBasedSuggestions(message, context);
    }

    // Nutrition analysis with AI insights
    if (this.containsKeywords(lowerMessage, ['nutrition', 'calories', 'healthy', 'diet'])) {
      return this.handleAdvancedNutritionAnalysis(message, context);
    }

    // Cultural and local food insights
    if (this.containsKeywords(lowerMessage, ['bengali', 'bangladeshi', 'local', 'traditional'])) {
      return this.handleCulturalFoodInsights(message, context);
    }

    // Price and budget optimization
    if (this.containsKeywords(lowerMessage, ['cheap', 'budget', 'affordable', 'expensive', 'price'])) {
      return this.handleBudgetOptimization(message, context);
    }

    // Default enhanced response
    return this.generateEnhancedResponse(message, context);
  }

  private static isVoiceCommand(message: string): boolean {
    const voicePatterns = [
      'order', 'find', 'search', 'call', 'navigate', 'show me', 'get me'
    ];
    return voicePatterns.some(pattern => message.includes(pattern));
  }

  private static containsKeywords(message: string, keywords: string[]): boolean {
    return keywords.some(keyword => message.includes(keyword));
  }

  private static handleVoiceCommand(message: string, context: EnhancedAIContext): AIResponse {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('order')) {
      return {
        content: `🎤 **Voice Command Recognized!**\n\nI can help you place an order! Here are some options:\n\n🍽️ **Quick Actions:**\n• "Order biryani from Kacchi Bhai"\n• "Find pizza near me"\n• "Reorder my last meal"\n• "Show me healthy options"\n\n📍 **Location Services:**\n• "Find restaurants nearby"\n• "What's open now?"\n\n💬 **Just say what you want and I'll help you find it!**`,
        confidence: 0.9,
        suggestions: [
          "Find biryani restaurants",
          "Show me healthy options",
          "What's popular nearby?"
        ],
        actions: [
          {
            type: 'search',
            data: { query: 'restaurants', location: context.location }
          }
        ]
      };
    }

    if (lowerMessage.includes('find') || lowerMessage.includes('search')) {
      return {
        content: `🔍 **Search Command Activated!**\n\nI'm ready to help you find exactly what you're craving!\n\n🎯 **Search Options:**\n• Cuisine type (Bengali, Italian, Thai)\n• Specific dishes (Biryani, Pizza, Kebab)\n• Restaurant names\n• Dietary preferences (Vegetarian, Halal)\n\n📍 **Location-Based Search:**\n• Restaurants near your location\n• Delivery zones and timing\n• Popular spots in your area\n\n💡 **Pro Tip:** Be specific! Say "Find spicy Bengali food under 300 taka" for best results.`,
        confidence: 0.95,
        suggestions: [
          "Find Bengali restaurants near me",
          "Search for vegetarian options",
          "Show me restaurants under 200 taka"
        ]
      };
    }

    return {
      content: `🎤 **Voice Command Processing...**\n\nI heard: "${message}"\n\nI can help you with:\n• 🍽️ Ordering food\n• 🔍 Finding restaurants\n• 📍 Location-based search\n• 📞 Restaurant information\n• 🚚 Delivery tracking\n\nPlease be more specific about what you'd like to do!`,
      confidence: 0.8,
      suggestions: [
        "Order food from nearby restaurants",
        "Find specific cuisine",
        "Track my current order"
      ]
    };
  }

  private static handleLocationBasedQuery(message: string, context: EnhancedAIContext): AIResponse {
    const { location, user } = context;
    
    let response = `📍 **Location-Based Recommendations**\n\n`;
    
    if (location) {
      response += `Based on your location in Dhaka, here are the best options:\n\n`;
      response += `🏪 **Nearby Restaurants:**\n`;
      response += `• Kacchi Bhai - 0.8 km away (Bengali, ৳৳)\n`;
      response += `• Star Kabab - 1.2 km away (Mughlai, ৳৳)\n`;
      response += `• Pizza Hut - 1.5 km away (Italian, ৳৳৳)\n`;
      response += `• Thai Garden - 2.1 km away (Thai, ৳৳৳)\n\n`;
      
      response += `⚡ **Quick Delivery (Under 30 min):**\n`;
      response += `• Chillox - Continental food\n`;
      response += `• Local tea stalls and snacks\n\n`;
      
      response += `💰 **Budget-Friendly Options:**\n`;
      response += `• Street food vendors\n`;
      response += `• Local Bengali restaurants\n`;
      response += `• Tea stalls and light snacks\n\n`;
    } else {
      response += `I'd love to show you nearby restaurants! Please enable location access or tell me your area in Dhaka.\n\n`;
      response += `🏙️ **Popular Areas in Dhaka:**\n`;
      response += `• Dhanmondi - Trendy restaurants\n`;
      response += `• Gulshan - Upscale dining\n`;
      response += `• Old Dhaka - Traditional food\n`;
      response += `• Uttara - Family restaurants\n`;
    }

    return {
      content: response,
      confidence: 0.92,
      suggestions: [
        "Show me the closest restaurant",
        "Find budget options nearby",
        "What's popular in my area?"
      ],
      actions: [
        {
          type: 'navigate',
          data: { type: 'nearby_restaurants', location }
        }
      ]
    };
  }

  private static handleOrderManagement(message: string, context: EnhancedAIContext): AIResponse {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('track')) {
      return {
        content: `📦 **Order Tracking**\n\nI can help you track your orders!\n\n🔍 **Tracking Options:**\n• Current active orders\n• Order history\n• Delivery status updates\n• Estimated delivery time\n\n📱 **Real-time Updates:**\n• Order confirmation\n• Restaurant preparation\n• Rider assignment\n• Live delivery tracking\n\n💡 **Quick Actions:**\n• Call restaurant\n• Contact delivery rider\n• Modify delivery instructions`,
        confidence: 0.9,
        suggestions: [
          "Show my current orders",
          "Track my last order",
          "Contact delivery rider"
        ]
      };
    }

    if (lowerMessage.includes('reorder')) {
      return {
        content: `🔄 **Reorder Assistant**\n\nI can help you reorder your favorites!\n\n⭐ **Recent Orders:**\n• Kacchi Biryani from Kacchi Bhai\n• Chicken Tikka from Star Kabab\n• Margherita Pizza from Pizza Hut\n\n🎯 **Smart Reordering:**\n• Same items, updated prices\n• Check restaurant availability\n• Suggest similar alternatives\n• Apply current promotions\n\n💡 **Pro Tip:** I can also suggest variations based on your preferences!`,
        confidence: 0.95,
        suggestions: [
          "Reorder my last meal",
          "Show my favorite orders",
          "Find similar restaurants"
        ]
      };
    }

    return {
      content: `📋 **Order Management Hub**\n\nI'm here to help with all your order needs!\n\n🛍️ **Available Actions:**\n• 📦 Track current orders\n• 🔄 Reorder favorites\n• ❌ Cancel pending orders\n• ✏️ Modify order details\n• 📞 Contact restaurant/rider\n\n📊 **Order History:**\n• View past orders\n• Rate and review\n• Save favorites\n• Spending insights\n\nWhat would you like to do with your orders?`,
      confidence: 0.88,
      suggestions: [
        "Track my current order",
        "Reorder my last meal",
        "Show order history"
      ]
    };
  }

  private static generateSmartRecommendations(message: string, context: EnhancedAIContext): AIResponse {
    const { userProfile, user, location } = context;
    
    let response = `🤖 **AI-Powered Smart Recommendations**\n\n`;
    
    if (userProfile) {
      response += `Based on your profile (${userProfile.goal.replace('-', ' ')}, ${userProfile.activityLevel.replace('-', ' ')}), here are personalized suggestions:\n\n`;
      
      if (userProfile.goal === 'lose-weight') {
        response += `🥗 **Weight Loss Friendly:**\n`;
        response += `• Grilled chicken salads\n`;
        response += `• Fish curry with minimal oil\n`;
        response += `• Vegetable stir-fries\n`;
        response += `• Dal with brown rice\n\n`;
      } else if (userProfile.goal === 'build-muscle') {
        response += `💪 **Muscle Building Options:**\n`;
        response += `• High-protein biryanis\n`;
        response += `• Grilled kebabs\n`;
        response += `• Chicken tikka\n`;
        response += `• Protein-rich Bengali fish curry\n\n`;
      }
    }
    
    response += `🌟 **Trending Now in Bangladesh:**\n`;
    response += `• Kacchi Biryani - Most ordered this week\n`;
    response += `• Beef Kebabs - Highly rated\n`;
    response += `• Thai Curry - New and popular\n`;
    response += `• Chicken Pizza - Weekend favorite\n\n`;
    
    response += `🎯 **Personalized for You:**\n`;
    if (user?.preferences?.favoritesCuisines?.length) {
      response += `• Based on your love for ${user.preferences.favoritesCuisines.join(', ')}\n`;
    }
    response += `• Restaurants with high ratings\n`;
    response += `• Fast delivery options\n`;
    response += `• Budget-friendly choices\n\n`;
    
    response += `🌤️ **Weather-Based Suggestions:**\n`;
    response += `• Hot soup for rainy days\n`;
    response += `• Cold beverages for sunny weather\n`;
    response += `• Comfort food for cozy evenings`;

    return {
      content: response,
      confidence: 0.94,
      suggestions: [
        "Show me healthy options",
        "Find trending restaurants",
        "Recommend based on weather"
      ]
    };
  }

  private static handleWeatherBasedSuggestions(message: string, context: EnhancedAIContext): AIResponse {
    // Simulate weather data (in real app, integrate with weather API)
    const weather = {
      condition: 'rainy',
      temperature: 28,
      humidity: 85
    };

    let response = `🌦️ **Weather-Smart Food Suggestions**\n\n`;
    response += `Current weather in Dhaka: ${weather.condition}, ${weather.temperature}°C\n\n`;
    
    if (weather.condition === 'rainy') {
      response += `☔ **Perfect for Rainy Weather:**\n`;
      response += `• Hot Khichuri with fried fish\n`;
      response += `• Steaming biryani\n`;
      response += `• Spicy beef curry\n`;
      response += `• Hot tea and snacks\n`;
      response += `• Comfort food like pasta\n\n`;
      
      response += `🍲 **Warm & Comforting:**\n`;
      response += `• Chicken soup\n`;
      response += `• Hot noodles\n`;
      response += `• Spicy Thai curry\n`;
    } else if (weather.condition === 'hot') {
      response += `☀️ **Cool Down Options:**\n`;
      response += `• Fresh salads\n`;
      response += `• Cold beverages\n`;
      response += `• Light fish dishes\n`;
      response += `• Fruit-based desserts\n`;
    }
    
    response += `\n💡 **Weather Tip:** Rainy weather is perfect for ordering comfort food and staying cozy indoors!`;

    return {
      content: response,
      confidence: 0.87,
      suggestions: [
        "Show me comfort food",
        "Find hot beverages",
        "Recommend light meals"
      ]
    };
  }

  private static handleAdvancedNutritionAnalysis(message: string, context: EnhancedAIContext): AIResponse {
    const { userProfile, menuItem } = context;
    
    let response = `🧬 **Advanced Nutrition Analysis**\n\n`;
    
    if (menuItem) {
      response += `📊 **Analyzing: ${menuItem.name}**\n\n`;
      if (menuItem.nutritionInfo) {
        const nutrition = menuItem.nutritionInfo;
        response += `**Nutritional Breakdown:**\n`;
        response += `• Calories: ${nutrition.calories} kcal\n`;
        response += `• Protein: ${nutrition.protein}g (${((nutrition.protein * 4 / nutrition.calories) * 100).toFixed(1)}%)\n`;
        response += `• Carbs: ${nutrition.carbs}g (${((nutrition.carbs * 4 / nutrition.calories) * 100).toFixed(1)}%)\n`;
        response += `• Fat: ${nutrition.fat}g (${((nutrition.fat * 9 / nutrition.calories) * 100).toFixed(1)}%)\n\n`;
        
        response += `🎯 **Health Insights:**\n`;
        if (nutrition.protein > 25) {
          response += `• ✅ High protein content - great for muscle building\n`;
        }
        if (nutrition.calories < 400) {
          response += `• ✅ Moderate calorie content - good for weight management\n`;
        }
        if (nutrition.fat > 20) {
          response += `• ⚠️ High fat content - consider portion size\n`;
        }
        
        if (userProfile) {
          const dailyCalories = this.calculateDailyCalories(userProfile);
          const mealPercentage = ((nutrition.calories / dailyCalories) * 100).toFixed(1);
          response += `\n💡 **Personal Impact:**\n`;
          response += `• This represents ${mealPercentage}% of your daily calorie goal\n`;
          response += `• ${this.getMealRecommendation(nutrition.calories, dailyCalories, userProfile.goal)}\n`;
        }
      }
    } else if (userProfile) {
      const dailyCalories = this.calculateDailyCalories(userProfile);
      const macros = this.calculateMacros(dailyCalories, userProfile.goal);
      
      response += `🎯 **Your Personalized Nutrition Plan**\n\n`;
      response += `**Daily Targets:**\n`;
      response += `• Calories: ${dailyCalories} kcal\n`;
      response += `• Protein: ${macros.protein}g (${((macros.protein * 4 / dailyCalories) * 100).toFixed(1)}%)\n`;
      response += `• Carbs: ${macros.carbs}g (${((macros.carbs * 4 / dailyCalories) * 100).toFixed(1)}%)\n`;
      response += `• Fat: ${macros.fat}g (${((macros.fat * 9 / dailyCalories) * 100).toFixed(1)}%)\n\n`;
      
      response += `🧠 **AI Recommendations:**\n`;
      response += this.getGoalSpecificAdvice(userProfile.goal);
      
      response += `\n\n🍽️ **Meal Timing:**\n`;
      response += `• Breakfast: ${Math.round(dailyCalories * 0.25)} kcal\n`;
      response += `• Lunch: ${Math.round(dailyCalories * 0.35)} kcal\n`;
      response += `• Dinner: ${Math.round(dailyCalories * 0.30)} kcal\n`;
      response += `• Snacks: ${Math.round(dailyCalories * 0.10)} kcal\n`;
    }

    return {
      content: response,
      confidence: 0.96,
      suggestions: [
        "Analyze another food item",
        "Create a meal plan",
        "Show healthy alternatives"
      ]
    };
  }

  private static handleCulturalFoodInsights(message: string, context: EnhancedAIContext): AIResponse {
    let response = `🇧🇩 **Bengali & Bangladeshi Food Culture**\n\n`;
    
    response += `🍛 **Traditional Bengali Cuisine:**\n`;
    response += `• **Biryani** - The crown jewel of Bengali cuisine, especially Kacchi Biryani\n`;
    response += `• **Fish Curry** - Bengal's love affair with fish, especially Hilsa\n`;
    response += `• **Dal** - Various lentil preparations, a staple in every meal\n`;
    response += `• **Rice** - The foundation of Bengali meals\n\n`;
    
    response += `🏛️ **Cultural Significance:**\n`;
    response += `• **Iftar during Ramadan** - Special foods like dates, chickpeas, and sweets\n`;
    response += `• **Pohela Boishakh** - Traditional New Year foods\n`;
    response += `• **Wedding Feasts** - Elaborate spreads with multiple courses\n`;
    response += `• **Street Food Culture** - Fuchka, Chotpoti, Jhalmuri\n\n`;
    
    response += `🌶️ **Flavor Profiles:**\n`;
    response += `• **Panch Phoron** - Five-spice blend unique to Bengal\n`;
    response += `• **Mustard Oil** - Traditional cooking medium\n`;
    response += `• **Sweet & Savory Balance** - Characteristic of Bengali cuisine\n`;
    response += `• **Fish & Rice Combination** - The heart of Bengali meals\n\n`;
    
    response += `🍰 **Famous Sweets:**\n`;
    response += `• **Rasgulla** - Spongy cottage cheese balls in syrup\n`;
    response += `• **Mishti Doi** - Sweet yogurt\n`;
    response += `• **Sandesh** - Delicate cottage cheese sweet\n`;
    response += `• **Chomchom** - Cylindrical sweet delicacy\n\n`;
    
    response += `💡 **Modern Fusion:**\n`;
    response += `• Traditional recipes with contemporary presentation\n`;
    response += `• Health-conscious adaptations of classic dishes\n`;
    response += `• International cuisines with Bengali twists`;

    return {
      content: response,
      confidence: 0.93,
      suggestions: [
        "Find traditional Bengali restaurants",
        "Show me fusion Bengali food",
        "Recommend authentic street food"
      ]
    };
  }

  private static handleBudgetOptimization(message: string, context: EnhancedAIContext): AIResponse {
    let response = `💰 **Smart Budget Food Optimization**\n\n`;
    
    response += `🎯 **Budget Categories:**\n`;
    response += `• **Under ৳150** - Street food, local snacks\n`;
    response += `• **৳150-300** - Regular restaurant meals\n`;
    response += `• **৳300-500** - Premium restaurant dishes\n`;
    response += `• **৳500+** - Luxury dining experiences\n\n`;
    
    response += `💡 **Money-Saving Tips:**\n`;
    response += `• **Combo Deals** - Look for meal combinations\n`;
    response += `• **Happy Hours** - Many restaurants offer discounts\n`;
    response += `• **Group Orders** - Share delivery fees with friends\n`;
    response += `• **Loyalty Programs** - Earn points for future discounts\n`;
    response += `• **Local Restaurants** - Often cheaper than chains\n\n`;
    
    response += `🍽️ **Best Value Options:**\n`;
    response += `• **Kacchi Biryani** - Large portions, filling meal\n`;
    response += `• **Dal-Rice Combos** - Nutritious and affordable\n`;
    response += `• **Local Bengali Thalis** - Complete meal deals\n`;
    response += `• **Street Food Platters** - Variety at low cost\n\n`;
    
    response += `📊 **Smart Ordering Strategy:**\n`;
    response += `• Order during off-peak hours for faster delivery\n`;
    response += `• Check for minimum order requirements\n`;
    response += `• Compare delivery fees across platforms\n`;
    response += `• Look for first-time user discounts\n\n`;
    
    response += `🎁 **Current Deals:**\n`;
    response += `• Free delivery on orders over ৳200\n`;
    response += `• 20% off on Bengali restaurants\n`;
    response += `• Buy 2 Get 1 Free on selected items`;

    return {
      content: response,
      confidence: 0.91,
      suggestions: [
        "Show me budget restaurants",
        "Find current deals and offers",
        "Recommend value meals"
      ]
    };
  }

  private static generateEnhancedResponse(message: string, context: EnhancedAIContext): AIResponse {
    let response = `🤖 **Enhanced AI Food Assistant**\n\n`;
    
    response += `I'm your intelligent food companion, powered by advanced AI! I can help you with:\n\n`;
    
    response += `🎯 **Smart Features:**\n`;
    response += `• 🗣️ Voice commands and natural language processing\n`;
    response += `• 📍 Location-based restaurant recommendations\n`;
    response += `• 🌤️ Weather-aware food suggestions\n`;
    response += `• 🧬 Advanced nutrition analysis\n`;
    response += `• 🇧🇩 Cultural food insights and traditions\n`;
    response += `• 💰 Budget optimization and deals\n\n`;
    
    response += `🚀 **AI Capabilities:**\n`;
    response += `• Real-time order tracking and management\n`;
    response += `• Personalized meal planning\n`;
    response += `• Smart reordering based on preferences\n`;
    response += `• Health-conscious recommendations\n`;
    response += `• Cultural and dietary accommodation\n\n`;
    
    if (context.user) {
      response += `👋 **Welcome back, ${context.user.name}!**\n`;
      response += `I remember your preferences and can provide even more personalized assistance.\n\n`;
    }
    
    response += `💬 **Try saying:**\n`;
    response += `• "Find spicy Bengali food near me"\n`;
    response += `• "Order my usual biryani"\n`;
    response += `• "What's good for rainy weather?"\n`;
    response += `• "Show me healthy options under 300 taka"\n`;
    response += `• "Track my current order"\n\n`;
    
    response += `🎉 **What would you like to explore today?**`;

    return {
      content: response,
      confidence: 0.85,
      suggestions: [
        "Find restaurants near me",
        "Show me healthy meal options",
        "Help me track my order"
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
        return `🔥 **Weight Loss Focus:** Prioritize protein and fiber to stay satisfied while in a calorie deficit. Choose grilled over fried options.`;
      case 'gain-weight':
        return `💪 **Weight Gain Focus:** Include healthy, calorie-dense foods like nuts, avocados, and whole grains. Don't skip meals.`;
      case 'build-muscle':
        return `🏋️ **Muscle Building Focus:** Consume protein within 30 minutes post-workout. Include complex carbs for energy.`;
      default:
        return `⚖️ **Maintenance Focus:** Focus on balanced nutrition and consistent eating patterns. Listen to your hunger cues.`;
    }
  }
}