
import { useAuth } from "@clerk/clerk-react";

// API client utility for authenticated requests
export class ApiClient {
  private static async getAuthToken(): Promise<string> {
    // This will be called from a React component context
    const { getToken } = useAuth();
    const token = await getToken();
    if (!token) {
      throw new Error("No authentication token available");
    }
    return token;
  }

  static async authenticatedFetch(url: string, options: RequestInit = {}): Promise<Response> {
    try {
      // Get the JWT token from Clerk
      const token = await this.getAuthToken();
      
      // Add Authorization header with Bearer token
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...options.headers,
      };

      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response;
    } catch (error) {
      console.error('Authenticated request failed:', error);
      throw error;
    }
  }

  static async post(url: string, data: any): Promise<Response> {
    return this.authenticatedFetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  static async get(url: string): Promise<Response> {
    return this.authenticatedFetch(url, {
      method: 'GET',
    });
  }
}
