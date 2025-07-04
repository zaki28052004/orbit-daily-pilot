
import { useAuth } from "@clerk/clerk-react";
import { useCallback } from "react";

export const useApiClient = () => {
  const { getToken } = useAuth();

  const authenticatedFetch = useCallback(async (url: string, options: RequestInit = {}) => {
    try {
      // Get the JWT token from Clerk
      const token = await getToken();
      if (!token) {
        throw new Error("No authentication token available");
      }

      console.log('Making authenticated request with JWT token');
      
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
  }, [getToken]);

  const post = useCallback(async (url: string, data: any) => {
    return authenticatedFetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }, [authenticatedFetch]);

  const get = useCallback(async (url: string) => {
    return authenticatedFetch(url, {
      method: 'GET',
    });
  }, [authenticatedFetch]);

  return { authenticatedFetch, post, get };
};
