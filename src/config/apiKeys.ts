/**
 * Secure API Key Configuration
 * 
 * This module handles API key management with security best practices:
 * - Environment variable validation
 * - Key rotation support
 * - Error handling for missing keys
 * - Development vs production configurations
 */

interface APIKeyConfig {
  openai: string;
  googleMaps: string;
  anthropic?: string;
  gemini?: string;
}

interface SecurityConfig {
  maxRetries: number;
  timeout: number;
  rateLimit: {
    requests: number;
    window: number; // in milliseconds
  };
}

class APIKeyManager {
  private static instance: APIKeyManager;
  private keys: Partial<APIKeyConfig> = {};
  private securityConfig: SecurityConfig;

  private constructor() {
    this.securityConfig = {
      maxRetries: 3,
      timeout: 30000, // 30 seconds
      rateLimit: {
        requests: 100,
        window: 60000 // 1 minute
      }
    };
    this.loadKeys();
  }

  public static getInstance(): APIKeyManager {
    if (!APIKeyManager.instance) {
      APIKeyManager.instance = new APIKeyManager();
    }
    return APIKeyManager.instance;
  }

  private loadKeys(): void {
    // Load and validate API keys from environment variables
    const openaiKey = import.meta.env.VITE_OPENAI_API_KEY;
    const googleMapsKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    const anthropicKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
    const geminiKey = import.meta.env.VITE_GEMINI_API_KEY;

    // Validate required keys
    if (!openaiKey || openaiKey === 'your_openai_api_key_here') {
      console.warn('OpenAI API key is missing or using placeholder value');
    } else if (this.validateOpenAIKey(openaiKey)) {
      this.keys.openai = openaiKey;
    }

    if (!googleMapsKey || googleMapsKey === 'your_google_maps_api_key_here') {
      console.warn('Google Maps API key is missing or using placeholder value');
    } else if (this.validateGoogleMapsKey(googleMapsKey)) {
      this.keys.googleMaps = googleMapsKey;
    }

    // Optional keys
    if (anthropicKey && anthropicKey !== 'your_anthropic_api_key_here') {
      this.keys.anthropic = anthropicKey;
    }

    if (geminiKey && geminiKey !== 'your_gemini_api_key_here') {
      this.keys.gemini = geminiKey;
    }
  }

  private validateOpenAIKey(key: string): boolean {
    // OpenAI keys start with 'sk-' and have specific length requirements
    const openaiKeyPattern = /^sk-[a-zA-Z0-9]{48,}$/;
    return openaiKeyPattern.test(key);
  }

  private validateGoogleMapsKey(key: string): boolean {
    // Google Maps API keys are typically 39 characters long
    const googleMapsKeyPattern = /^[A-Za-z0-9_-]{35,45}$/;
    return googleMapsKeyPattern.test(key);
  }

  public getOpenAIKey(): string {
    if (!this.keys.openai) {
      throw new Error('OpenAI API key is not configured or invalid');
    }
    return this.keys.openai;
  }

  public getGoogleMapsKey(): string {
    if (!this.keys.googleMaps) {
      throw new Error('Google Maps API key is not configured or invalid');
    }
    return this.keys.googleMaps;
  }

  public getAnthropicKey(): string | undefined {
    return this.keys.anthropic;
  }

  public getGeminiKey(): string | undefined {
    return this.keys.gemini;
  }

  public hasValidOpenAIKey(): boolean {
    return !!this.keys.openai;
  }

  public hasValidGoogleMapsKey(): boolean {
    return !!this.keys.googleMaps;
  }

  public getSecurityConfig(): SecurityConfig {
    return { ...this.securityConfig };
  }

  // Method to safely log key status without exposing actual keys
  public getKeyStatus(): Record<string, boolean> {
    return {
      openai: this.hasValidOpenAIKey(),
      googleMaps: this.hasValidGoogleMapsKey(),
      anthropic: !!this.keys.anthropic,
      gemini: !!this.keys.gemini
    };
  }

  // Method to refresh keys (useful for key rotation)
  public refreshKeys(): void {
    this.keys = {};
    this.loadKeys();
  }
}

// Export singleton instance
export const apiKeyManager = APIKeyManager.getInstance();

// Export individual getters for convenience
export const getOpenAIKey = () => apiKeyManager.getOpenAIKey();
export const getGoogleMapsKey = () => apiKeyManager.getGoogleMapsKey();
export const getAnthropicKey = () => apiKeyManager.getAnthropicKey();
export const getGeminiKey = () => apiKeyManager.getGeminiKey();

// Export validation functions
export const hasValidOpenAIKey = () => apiKeyManager.hasValidOpenAIKey();
export const hasValidGoogleMapsKey = () => apiKeyManager.hasValidGoogleMapsKey();

// Export security config
export const getSecurityConfig = () => apiKeyManager.getSecurityConfig();

// Export key status for debugging
export const getKeyStatus = () => apiKeyManager.getKeyStatus();