const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

let globalToken: string | null = null;

export const setAuthToken = (token: string | null) => {
  globalToken = token;
};

/**
 * Standard fetch wrapper for API calls.
 */
export const fetchApi = async <T,>(endpoint: string, options: RequestInit = {}): Promise<T> => {
  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string> || {}),
    };

    if (globalToken) {
      headers['Authorization'] = `Bearer ${globalToken}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || `API Error: ${response.status}`);
    }

    const unwrapped = (data.data !== undefined) ? data.data : data;
    
    if (unwrapped !== null && typeof unwrapped === 'object') {
      if (Array.isArray(unwrapped)) {
        (unwrapped as any).data = unwrapped;
      } else if (!('data' in unwrapped)) {
        Object.defineProperty(unwrapped, 'data', {
          value: unwrapped,
          enumerable: false, // Don't show up in Object.keys
          configurable: true
        });
      }
    }
    
    return unwrapped;

  } catch (error) {
    console.error(`API Fetch Error [${endpoint}]:`, error);
    throw error;
  }
};

/**
 * Convenience method for GET requests.
 */
export const getApi = <T,>(endpoint: string) => {
  return fetchApi<T>(endpoint, { method: 'GET' });
};

/**
 * Convenience method for POST requests.
 */
export const postApi = <T,>(endpoint: string, body: any) => {
  return fetchApi<T>(endpoint, {
    method: 'POST',
    body: JSON.stringify(body),
  });
};
