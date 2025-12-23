// Utility function to safely parse JSON responses
export async function safeJsonParse<T>(response: Response): Promise<T> {
  const text = await response.text();
  
  if (!text) {
    throw new Error('Empty response from server');
  }
  
  try {
    return JSON.parse(text) as T;
  } catch (error) {
    throw new Error(`Invalid JSON response: ${text.substring(0, 100)}`);
  }
}

// Helper function for API calls with error handling
export async function apiCall<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    const data = await safeJsonParse<T>(response);

    if (!response.ok) {
      throw new Error(
        (data as any)?.message || `HTTP error! status: ${response.status}`
      );
    }

    return data;
  } catch (error) {
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new Error('Cannot connect to server. Please make sure the backend server is running on port 5000.');
    }
    throw error;
  }
}

