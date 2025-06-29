/**
 * API Key Validation Utilities
 * 
 * This module provides utilities to validate API keys and check their status
 * without exposing the actual key values.
 */

import { apiKeyManager, getKeyStatus } from '../config/apiKeys';

export interface APIKeyValidationResult {
  isValid: boolean;
  service: string;
  error?: string;
  lastChecked: Date;
}

export interface APIKeyStatusReport {
  openai: APIKeyValidationResult;
  googleMaps: APIKeyValidationResult;
  anthropic?: APIKeyValidationResult;
  gemini?: APIKeyValidationResult;
  overall: {
    allValid: boolean;
    criticalServicesValid: boolean;
    warnings: string[];
  };
}

class APIKeyValidator {
  private static instance: APIKeyValidator;
  private lastValidation: Date | null = null;
  private validationCache: Map<string, APIKeyValidationResult> = new Map();

  private constructor() {}

  public static getInstance(): APIKeyValidator {
    if (!APIKeyValidator.instance) {
      APIKeyValidator.instance = new APIKeyValidator();
    }
    return APIKeyValidator.instance;
  }

  public async validateAllKeys(): Promise<APIKeyStatusReport> {
    const now = new Date();
    const keyStatus = getKeyStatus();
    
    const openaiResult: APIKeyValidationResult = {
      isValid: keyStatus.openai,
      service: 'OpenAI',
      lastChecked: now,
      error: keyStatus.openai ? undefined : 'API key not configured or invalid format'
    };

    const googleMapsResult: APIKeyValidationResult = {
      isValid: keyStatus.googleMaps,
      service: 'Google Maps',
      lastChecked: now,
      error: keyStatus.googleMaps ? undefined : 'API key not configured or invalid format'
    };

    const anthropicResult: APIKeyValidationResult | undefined = keyStatus.anthropic ? {
      isValid: true,
      service: 'Anthropic',
      lastChecked: now
    } : undefined;

    const geminiResult: APIKeyValidationResult | undefined = keyStatus.gemini ? {
      isValid: true,
      service: 'Gemini',
      lastChecked: now
    } : undefined;

    // Check critical services
    const criticalServicesValid = openaiResult.isValid && googleMapsResult.isValid;
    const allValid = criticalServicesValid && 
      (anthropicResult?.isValid !== false) && 
      (geminiResult?.isValid !== false);

    const warnings: string[] = [];
    if (!openaiResult.isValid) {
      warnings.push('OpenAI API key is required for AI features');
    }
    if (!googleMapsResult.isValid) {
      warnings.push('Google Maps API key is required for location features');
    }

    this.lastValidation = now;

    return {
      openai: openaiResult,
      googleMaps: googleMapsResult,
      anthropic: anthropicResult,
      gemini: geminiResult,
      overall: {
        allValid,
        criticalServicesValid,
        warnings
      }
    };
  }

  public getLastValidationTime(): Date | null {
    return this.lastValidation;
  }

  public async testAPIConnectivity(): Promise<Record<string, boolean>> {
    try {
      // This would test actual API connectivity
      // For now, we'll just return the key validation status
      return getKeyStatus();
    } catch (error) {
      console.error('API connectivity test failed:', error);
      return {
        openai: false,
        googleMaps: false,
        anthropic: false,
        gemini: false
      };
    }
  }

  public generateSecurityReport(): {
    keyCount: number;
    validKeys: number;
    securityScore: number;
    recommendations: string[];
  } {
    const keyStatus = getKeyStatus();
    const keys = Object.values(keyStatus);
    const validKeys = keys.filter(Boolean).length;
    const keyCount = keys.length;
    
    const securityScore = Math.round((validKeys / keyCount) * 100);
    
    const recommendations: string[] = [];
    
    if (!keyStatus.openai) {
      recommendations.push('Configure OpenAI API key for AI functionality');
    }
    if (!keyStatus.googleMaps) {
      recommendations.push('Configure Google Maps API key for location services');
    }
    if (securityScore < 100) {
      recommendations.push('Consider setting up all optional API keys for full functionality');
    }
    
    recommendations.push('Regularly rotate API keys for security');
    recommendations.push('Monitor API usage and set up billing alerts');
    recommendations.push('Use environment variables to store API keys securely');

    return {
      keyCount,
      validKeys,
      securityScore,
      recommendations
    };
  }
}

export const apiKeyValidator = APIKeyValidator.getInstance();

// Utility functions for components
export const validateAPIKeys = () => apiKeyValidator.validateAllKeys();
export const getSecurityReport = () => apiKeyValidator.generateSecurityReport();
export const testConnectivity = () => apiKeyValidator.testAPIConnectivity();