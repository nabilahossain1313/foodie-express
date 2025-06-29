import OpenAI from 'openai';
import { UserProfile, MenuItem, User, AIResponse } from '../types';
import { apiKeyManager } from '../config/apiKeys';

interface AIContext {
  user?: User;
  userProfile?: UserProfile;
  menuItem?: MenuItem;
  conversationHistory?: any[];
  timestamp: Date;
}

class OpenAIService {
  private openai: OpenAI | null = null;

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
      }
    } catch (error) {
      console.warn('OpenAI initialization failed:', error);
      this.openai = null;
    }
  }

  async processAdvancedMessage(message: string, context: AIContext): Promise<AIResponse> {
    try {
      if (!this.openai) {
        throw new Error('OpenAI client not initialized');
      }

      const systemPrompt = this.buildSystemPrompt(context);
      const userMessage = this.buildUserMessage(message, context);

      const completion = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMessage }
        ],
        max_tokens: 1000,
        temperature: 0.7,
      });

      const content = completion.choices[0]?.message?.content || "I apologize, but I'm having trouble processing your request right now. Please try again.";

      return {
        content,
        confidence: 0.95,
        suggestions: this.generateSuggestions(message, context)
      };
    } catch (error: any) {
      console.error('OpenAI API Error:', error.message);
      return {
        content: "",
        confidence: 0,
        error: error.message || "OpenAI API error occurred"
      };
    }
  }

  private buildSystemPrompt(context: AIContext): string {
    let prompt = `You are an advanced AI Food and Nutrition Assistant for FoodieExpress, a premium food delivery app specialized for Bangladesh. You are an expert in:

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

PERSONALITY: Be friendly, knowledgeable, encouraging, and professional. Use emojis appropriately to make responses engaging. Show cultural awareness of Bangladesh and Bengali traditions.

RESPONSE STYLE:
- Provide actionable, specific advice
- Use bullet points and clear formatting
- Include relevant nutritional data when available
- Always prioritize user safety and health
- Suggest consulting healthcare professionals for medical conditions
- Reference Bengali/Bangladeshi food culture when relevant
- Use both English and occasional Bengali terms when appropriate

CULTURAL CONTEXT:
- Understand Bengali cuisine preferences (rice, fish, lentils, spices)
- Be aware of Islamic dietary requirements (halal food)
- Consider local ingredients and cooking methods
- Respect cultural food traditions and festivals
- Understand the importance of family meals in Bengali culture

`;

    if (context.user) {
      prompt += `\nUSER CONTEXT:
- User Name: ${context.user.name}
- User Role: ${context.user.role}
`;
    }

    if (context.userProfile) {
      const profile = context.userProfile;
      prompt += `\nUSER PROFILE:
- Age: ${profile.age} years
- Gender: ${profile.gender}
- Height: ${profile.height}cm
- Weight: ${profile.weight}kg
- Activity Level: ${profile.activityLevel.replace('-', ' ')}
- Goal: ${profile.goal.replace('-', ' ')}
- Medical Conditions: ${profile.medicalConditions?.join(', ') || 'None'}
- Allergies: ${profile.allergies?.join(', ') || 'None'}

Calculate their daily calorie needs using the Mifflin-St Jeor equation and adjust based on their goal.
`;
    }

    if (context.menuItem) {
      const item = context.menuItem;
      prompt += `\nCURRENT MENU ITEM:
- Name: ${item.name}
- Description: ${item.description}
- Price: ৳${item.price}
- Calories: ${item.nutritionInfo?.calories || 'Unknown'}
- Protein: ${item.nutritionInfo?.protein || 'Unknown'}g
- Carbs: ${item.nutritionInfo?.carbs || 'Unknown'}g
- Fat: ${item.nutritionInfo?.fat || 'Unknown'}g
- Vegetarian: ${item.isVegetarian ? 'Yes' : 'No'}
- Spicy: ${item.isSpicy ? 'Yes' : 'No'}
`;
    }

    return prompt;
  }

  private buildUserMessage(message: string, context: AIContext): string {
    let userMessage = message;

    if (context.conversationHistory && context.conversationHistory.length > 0) {
      userMessage = `Previous conversation context: ${JSON.stringify(context.conversationHistory.slice(-3))}\n\nCurrent question: ${message}`;
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
    }

    suggestions.push("Give me healthy Bengali recipe ideas");
    suggestions.push("Help me with meal prep strategies");
    suggestions.push("Find traditional Bengali dishes");

    return suggestions.slice(0, 3);
  }
}

export const openAIService = new OpenAIService();