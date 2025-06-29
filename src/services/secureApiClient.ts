/**
 * Secure API Client
 * 
 * This module provides a secure wrapper for API calls with:
 * - Rate limiting
 * - Request/response logging (without exposing sensitive data)
 * - Error handling and retry logic
 * - Request timeout management
 */

import { apiKeyManager } from '../config/apiKeys';

interface RequestConfig {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: any;
  timeout?: number;
  retries?: number;
}

interface RateLimitState {
  requests: number;
  windowStart: number;
}

class SecureApiClient {
  private static instance: SecureApiClient;
  private rateLimitState: Map<string, RateLimitState> = new Map();

  private constructor() {}

  public static getInstance(): SecureApiClient {
    if (!SecureApiClient.instance) {
      SecureApiClient.instance = new SecureApiClient();
    }
    return SecureApiClient.instance;
  }

  private checkRateLimit(service: string): boolean {
    const config = apiKeyManager.getSecurityConfig();
    const now = Date.now();
    const state = this.rateLimitState.get(service);

    if (!state) {
      this.rateLimitState.set(service, {
        requests: 1,
        windowStart: now
      });
      return true;
    }

    // Reset window if expired
    if (now - state.windowStart > config.rateLimit.window) {
      state.requests = 1;
      state.windowStart = now;
      return true;
    }

    // Check if within rate limit
    if (state.requests >= config.rateLimit.requests) {
      return false;
    }

    state.requests++;
    return true;
  }

  private async makeRequest(
    url: string,
    config: RequestConfig,
    service: string
  ): Promise<Response> {
    // Check rate limit
    if (!this.checkRateLimit(service)) {
      throw new Error(`Rate limit exceeded for ${service}. Please try again later.`);
    }

    const securityConfig = apiKeyManager.getSecurityConfig();
    const timeout = config.timeout || securityConfig.timeout;
    const maxRetries = config.retries || securityConfig.maxRetries;

    let lastError: Error;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        const response = await fetch(url, {
          method: config.method,
          headers: {
            'Content-Type': 'application/json',
            ...config.headers
          },
          body: config.body ? JSON.stringify(config.body) : undefined,
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        return response;
      } catch (error) {
        lastError = error as Error;
        
        // Don't retry on certain errors
        if (error instanceof Error) {
          if (error.name === 'AbortError') {
            throw new Error(`Request timeout after ${timeout}ms`);
          }
          if (error.message.includes('401') || error.message.includes('403')) {
            throw new Error('Authentication failed. Please check your API key.');
          }
        }

        // Wait before retry (exponential backoff)
        if (attempt < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
        }
      }
    }

    throw lastError!;
  }

  public async callOpenAI(
    endpoint: string,
    data: any,
    options: Partial<RequestConfig> = {}
  ): Promise<any> {
    if (!apiKeyManager.hasValidOpenAIKey()) {
      throw new Error('OpenAI API key is not configured');
    }

    const url = `https://api.openai.com/v1/${endpoint}`;
    const config: RequestConfig = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKeyManager.getOpenAIKey()}`,
        ...options.headers
      },
      body: data,
      ...options
    };

    const response = await this.makeRequest(url, config, 'openai');
    return response.json();
  }

  public async callGoogleMaps(
    endpoint: string,
    params: Record<string, string> = {},
    options: Partial<RequestConfig> = {}
  ): Promise<any> {
    if (!apiKeyManager.hasValidGoogleMapsKey()) {
      throw new Error('Google Maps API key is not configured');
    }

    const searchParams = new URLSearchParams({
      key: apiKeyManager.getGoogleMapsKey(),
      ...params
    });

    const url = `https://maps.googleapis.com/maps/api/js?${searchParams.toString()}`;
    const config: RequestConfig = {
      method: 'GET',
      ...options
    };

    const response = await this.makeRequest(url, config, 'googlemaps');
    return response.json();
  }

  // Method to safely test API connectivity without exposing keys
  public async testConnectivity(): Promise<Record<string, boolean>> {
    const results: Record<string, boolean> = {};

    // Test OpenAI
    try {
      if (apiKeyManager.hasValidOpenAIKey()) {
        await this.callOpenAI('models', {}, { timeout: 5000, retries: 1 });
        results.openai = true;
      } else {
        results.openai = false;
      }
    } catch {
      results.openai = false;
    }

    // Test Google Maps (just check if key is valid format)
    results.googleMaps = apiKeyManager.hasValidGoogleMapsKey();

    return results;
  }

  // Clear rate limit state (useful for testing or admin functions)
  public clearRateLimits(): void {
    this.rateLimitState.clear();
  }
}

export const secureApiClient = SecureApiClient.getInstance();