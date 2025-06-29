import { UserProfile, CalorieRecommendation } from '../types';

export class CalorieCalculator {
  // Calculate Basal Metabolic Rate using Mifflin-St Jeor Equation
  static calculateBMR(profile: UserProfile): number {
    const { age, gender, height, weight } = profile;
    
    if (gender === 'male') {
      return 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      return 10 * weight + 6.25 * height - 5 * age - 161;
    }
  }

  // Calculate Total Daily Energy Expenditure
  static calculateTDEE(profile: UserProfile): number {
    const bmr = this.calculateBMR(profile);
    const activityMultipliers = {
      'sedentary': 1.2,
      'lightly-active': 1.375,
      'moderately-active': 1.55,
      'very-active': 1.725,
      'extremely-active': 1.9
    };
    
    return bmr * activityMultipliers[profile.activityLevel];
  }

  // Calculate daily calorie goal based on user's goal
  static calculateDailyCalorieGoal(profile: UserProfile): number {
    const tdee = this.calculateTDEE(profile);
    
    switch (profile.goal) {
      case 'lose-weight':
        return Math.round(tdee - 500); // 500 calorie deficit for 1lb/week loss
      case 'gain-weight':
        return Math.round(tdee + 500); // 500 calorie surplus for 1lb/week gain
      case 'build-muscle':
        return Math.round(tdee + 300); // Moderate surplus for muscle building
      case 'maintain-weight':
      default:
        return Math.round(tdee);
    }
  }

  // Generate comprehensive calorie recommendations
  static generateRecommendations(profile: UserProfile): CalorieRecommendation {
    const dailyCalories = this.calculateDailyCalorieGoal(profile);
    
    // Default macro distribution
    const defaultMacros = {
      protein: 25, // 25% protein
      carbs: 45,   // 45% carbs
      fat: 30      // 30% fat
    };

    // Adjust macros based on goal
    let macros = { ...defaultMacros };
    if (profile.goal === 'build-muscle') {
      macros = { protein: 30, carbs: 40, fat: 30 };
    } else if (profile.goal === 'lose-weight') {
      macros = { protein: 30, carbs: 35, fat: 35 };
    }

    // Calculate meal distribution
    const mealCalories = {
      breakfast: Math.round(dailyCalories * 0.25),
      lunch: Math.round(dailyCalories * 0.35),
      dinner: Math.round(dailyCalories * 0.30),
      snacks: Math.round(dailyCalories * 0.10)
    };

    // Generate personalized recommendations
    const recommendations = this.generatePersonalizedRecommendations(profile, dailyCalories);

    return {
      dailyCalories,
      mealCalories,
      macros: {
        protein: Math.round((dailyCalories * macros.protein / 100) / 4), // grams
        carbs: Math.round((dailyCalories * macros.carbs / 100) / 4), // grams
        fat: Math.round((dailyCalories * macros.fat / 100) / 9) // grams
      },
      recommendations
    };
  }

  private static generatePersonalizedRecommendations(profile: UserProfile, dailyCalories: number): string[] {
    const recommendations: string[] = [];
    
    // Age-based recommendations
    if (profile.age < 25) {
      recommendations.push("Focus on building healthy eating habits early. Include calcium-rich foods for bone development.");
    } else if (profile.age > 50) {
      recommendations.push("Prioritize protein intake to maintain muscle mass. Consider foods rich in vitamin D and B12.");
    }

    // Goal-based recommendations
    switch (profile.goal) {
      case 'lose-weight':
        recommendations.push("Create a moderate calorie deficit. Focus on high-protein, high-fiber foods to stay satisfied.");
        recommendations.push("Consider intermittent fasting or smaller, frequent meals to manage hunger.");
        break;
      case 'gain-weight':
        recommendations.push("Eat calorie-dense, nutritious foods. Include healthy fats like nuts, avocados, and olive oil.");
        recommendations.push("Consider protein shakes between meals to increase calorie intake.");
        break;
      case 'build-muscle':
        recommendations.push("Consume protein within 30 minutes after workouts. Aim for 1.6-2.2g protein per kg body weight.");
        recommendations.push("Include complex carbohydrates to fuel your workouts and recovery.");
        break;
    }

    // Activity level recommendations
    if (profile.activityLevel === 'very-active' || profile.activityLevel === 'extremely-active') {
      recommendations.push("Increase carbohydrate intake on training days. Stay well-hydrated and consider electrolyte replacement.");
    }

    // General health recommendations
    recommendations.push("Aim for 5-9 servings of fruits and vegetables daily for optimal micronutrient intake.");
    recommendations.push("Choose whole grains over refined grains for better fiber and nutrient content.");

    return recommendations;
  }

  // Check if a meal fits within calorie goals
  static evaluateMealChoice(mealCalories: number, targetCalories: number, tolerance: number = 0.2): {
    status: 'perfect' | 'good' | 'high' | 'low';
    message: string;
  } {
    const lowerBound = targetCalories * (1 - tolerance);
    const upperBound = targetCalories * (1 + tolerance);

    if (mealCalories >= lowerBound && mealCalories <= upperBound) {
      return { status: 'perfect', message: 'Perfect calorie match for your goals!' };
    } else if (mealCalories < lowerBound) {
      const deficit = Math.round(lowerBound - mealCalories);
      return { status: 'low', message: `Consider adding ${deficit} more calories to meet your goals.` };
    } else if (mealCalories <= upperBound * 1.3) {
      const excess = Math.round(mealCalories - upperBound);
      return { status: 'high', message: `This meal is ${excess} calories over your target. Consider a smaller portion.` };
    } else {
      return { status: 'high', message: 'This meal is significantly over your calorie target.' };
    }
  }
}