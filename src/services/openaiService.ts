import OpenAI from 'openai';
import { UserProfile, MenuItem, User, AIResponse } from '../types';
import { apiKeyManager } from '../config/apiKeys';

interface AIContext {
  user?: User;
  userProfile?: UserProfile;
  menuItem?: MenuItem;
  conversationHistory?: any[];
  location?: { lat: number; lng: number };
  timestamp: Date;
}

class OpenAIService {
  private openai: OpenAI | null = null;
  private isInitialized = false;

  constructor() {
    this.initializeOpenAI();
  }

  private initializeOpenAI(): void {
    try {
      if (apiKeyManager.hasValidOpenAIKey()) {
        this.openai = new OpenAI({
          apiKey: apiKeyManager.getOpenAIKey(),
          dangerouslyAllowBrowser: true
        });
        this.isInitialized = true;
        console.log('✅ OpenAI service initialized successfully');
      } else {
        console.warn('⚠️ OpenAI API key not configured');
      }
    } catch (error) {
      console.error('❌ OpenAI initialization failed:', error);
      this.openai = null;
      this.isInitialized = false;
    }
  }

  async processAdvancedMessage(message: string, context: AIContext): Promise<AIResponse> {
    try {
      if (!this.isInitialized || !this.openai) {
        throw new Error('OpenAI service not properly initialized');
      }

      const systemPrompt = this.buildSystemPrompt(context);
      const userMessage = this.buildUserMessage(message, context);

      console.log('🤖 Sending request to OpenAI...');

      const completion = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMessage }
        ],
        max_tokens: 1500,
        temperature: 0.7,
        presence_penalty: 0.1,
        frequency_penalty: 0.1,
      });

      const content = completion.choices[0]?.message?.content || 
        "I apologize, but I'm having trouble processing your request right now. Please try again.";

      console.log('✅ OpenAI response received');

      return {
        content,
        confidence: 0.95,
        suggestions: this.generateSuggestions(message, context),
        actions: this.generateActions(message, context)
      };
    } catch (error: any) {
      console.error('❌ OpenAI API Error:', error);
      
      // Handle specific error types
      if (error.code === 'insufficient_quota') {
        return {
          content: "",
          confidence: 0,
          error: "OpenAI API quota exceeded. Please check your billing settings."
        };
      } else if (error.code === 'invalid_api_key') {
        return {
          content: "",
          confidence: 0,
          error: "Invalid OpenAI API key. Please check your configuration."
        };
      } else if (error.code === 'rate_limit_exceeded') {
        return {
          content: "",
          confidence: 0,
          error: "Rate limit exceeded. Please try again in a moment."
        };
      }

      return {
        content: "",
        confidence: 0,
        error: error.message || "OpenAI API error occurred"
      };
    }
  }

  private buildSystemPrompt(context: AIContext): string {
    let prompt = `You are an advanced AI Food and Nutrition Assistant for FoodieExpress, a premium food delivery app specialized for Bangladesh. You are an expert in:

🍽️ **Core Expertise:**
- Bengali and Bangladeshi cuisine and culture
- Personalized nutrition advice and meal planning
- Calorie calculation and macro tracking
- Dietary restrictions and food allergies
- Health condition management through nutrition
- Recipe suggestions and cooking tips
- Food safety and storage guidelines
- Restaurant menu optimization
- Weight management strategies
- Sports nutrition and fitness diet planning
- Traditional Bengali cooking methods and ingredients

🇧🇩 **Cultural Context:**
- Deep understanding of Bengali cuisine preferences (rice, fish, lentils, spices)
- Awareness of Islamic dietary requirements (halal food)
- Knowledge of local ingredients and cooking methods
- Respect for cultural food traditions and festivals
- Understanding of family meal importance in Bengali culture
- Familiarity with Bangladeshi food prices and availability

🎯 **Personality & Style:**
- Be friendly, knowledgeable, encouraging, and professional
- Use emojis appropriately to make responses engaging
- Show cultural awareness of Bangladesh and Bengali traditions
- Provide actionable, specific advice
- Use bullet points and clear formatting
- Include relevant nutritional data when available
- Always prioritize user safety and health
- Suggest consulting healthcare professionals for medical conditions
- Reference Bengali/Bangladeshi food culture when relevant
- Use both English and occasional Bengali terms when appropriate

💡 **Response Guidelines:**
- Keep responses comprehensive but concise
- Provide practical, actionable advice
- Include specific food recommendations
- Consider local availability and pricing
- Respect cultural and religious dietary preferences
- Always prioritize health and safety
- Be encouraging and supportive

`;

    if (context.user) {
      prompt += `\n👤 **User Context:**
- Name: ${context.user.name}
- Role: ${context.user.role}
- Preferences: ${context.user.preferences ? JSON.stringify(context.user.preferences) : 'Not specified'}
`;
    }

    if (context.userProfile) {
      const profile = context.userProfile;
      const bmr = this.calculateBMR(profile);
      const tdee = this.calculateTDEE(profile, bmr);
      const dailyCalories = this.calculateDailyCalories(profile, tdee);

      prompt += `\n📊 **User Health Profile:**
- Age: ${profile.age} years
- Gender: ${profile.gender}
- Height: ${profile.height}cm
- Weight: ${profile.weight}kg
- Activity Level: ${profile.activityLevel.replace('-', ' ')}
- Goal: ${profile.goal.replace('-', ' ')}
- BMR: ${Math.round(bmr)} calories
- TDEE: ${Math.round(tdee)} calories
- Daily Calorie Goal: ${dailyCalories} calories
- Medical Conditions: ${profile.medicalConditions?.join(', ') || 'None'}
- Allergies: ${profile.allergies?.join(', ') || 'None'}

Use this information to provide personalized nutrition advice and calorie recommendations.
`;
    }

    if (context.menuItem) {
      const item = context.menuItem;
      prompt += `\n🍽️ **Current Menu Item Analysis:**
- Name: ${item.name}
- Description: ${item.description}
- Price: ৳${item.price}
- Category: ${item.category}
- Vegetarian: ${item.isVegetarian ? 'Yes' : 'No'}
- Spicy: ${item.isSpicy ? 'Yes' : 'No'}
- Popular: ${item.isPopular ? 'Yes' : 'No'}
`;

      if (item.nutritionInfo) {
        prompt += `- Nutrition (per serving):
  * Calories: ${item.nutritionInfo.calories}
  * Protein: ${item.nutritionInfo.protein}g
  * Carbs: ${item.nutritionInfo.carbs}g
  * Fat: ${item.nutritionInfo.fat}g
`;
      }

      if (item.allergens && item.allergens.length > 0) {
        prompt += `- Allergens: ${item.allergens.join(', ')}
`;
      }
    }

    if (context.location) {
      prompt += `\n📍 **Location Context:**
- User is in Dhaka, Bangladesh
- Coordinates: ${context.location.lat}, ${context.location.lng}
- Consider local restaurant availability and delivery zones
`;
    }

    prompt += `\n🎯 **Current Task:**
Provide helpful, accurate, and culturally appropriate food and nutrition advice. Always consider the user's health profile, cultural preferences, and local context when making recommendations.`;

    return prompt;
  }

  private buildUserMessage(message: string, context: AIContext): string {
    let userMessage = message;

    if (context.conversationHistory && context.conversationHistory.length > 0) {
      const recentHistory = context.conversationHistory.slice(-3);
      userMessage = `Previous conversation context: ${JSON.stringify(recentHistory)}\n\nCurrent question: ${message}`;
    }

    return userMessage;
  }

  private generateSuggestions(message: string, context: AIContext): string[] {
    const suggestions = [];
    
    if (context.userProfile) {
      suggestions.push("Create a personalized meal plan for me");
      suggestions.push("Calculate my daily nutrition needs");
      suggestions.push("Suggest foods for my fitness goals");
    } else {
      suggestions.push("Help me set up my nutrition profile");
    }

    if (context.menuItem) {
      suggestions.push("Is this food good for my goals?");
      suggestions.push("Suggest healthier alternatives");
      suggestions.push("Analyze the nutritional value");
    }

    suggestions.push("Give me healthy Bengali recipe ideas");
    suggestions.push("Help me with meal prep strategies");
    suggestions.push("Find traditional Bengali dishes");
    suggestions.push("Show me budget-friendly healthy options");

    return suggestions.slice(0, 4);
  }

  private generateActions(message: string, context: AIContext): any[] {
    const actions = [];
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes('find') || lowerMessage.includes('search')) {
      actions.push({
        type: 'search',
        data: { query: 'restaurants', location: context.location }
      });
    }

    if (lowerMessage.includes('order') || lowerMessage.includes('buy')) {
      actions.push({
        type: 'order',
        data: { menuItem: context.menuItem }
      });
    }

    if (lowerMessage.includes('navigate') || lowerMessage.includes('directions')) {
      actions.push({
        type: 'navigate',
        data: { location: context.location }
      });
    }

    return actions;
  }

  // Helper methods for calorie calculations
  private calculateBMR(profile: UserProfile): number {
    const { age, gender, height, weight } = profile;
    
    if (gender === 'male') {
      return 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      return 10 * weight + 6.25 * height - 5 * age - 161;
    }
  }

  private calculateTDEE(profile: UserProfile, bmr: number): number {
    const activityMultipliers = {
      'sedentary': 1.2,
      'lightly-active': 1.375,
      'moderately-active': 1.55,
      'very-active': 1.725,
      'extremely-active': 1.9
    };
    
    return bmr * activityMultipliers[profile.activityLevel];
  }

  private calculateDailyCalories(profile: UserProfile, tdee: number): number {
    switch (profile.goal) {
      case 'lose-weight': return Math.round(tdee - 500);
      case 'gain-weight': return Math.round(tdee + 500);
      case 'build-muscle': return Math.round(tdee + 300);
      default: return Math.round(tdee);
    }
  }

  // Public method to check if service is ready
  public isReady(): boolean {
    return this.isInitialized && this.openai !== null;
  }

  // Public method to reinitialize (useful if API key is updated)
  public reinitialize(): void {
    this.initializeOpenAI();
  }
}

export const openAIService = new OpenAIService();