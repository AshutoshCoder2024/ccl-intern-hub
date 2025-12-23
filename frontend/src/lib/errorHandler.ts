/**
 * Error Handling Utilities
 * Centralized error handling for the application
 */

export interface ApiError {
  message: string;
  status?: number;
  error?: string;
}

/**
 * Handles API response errors
 */
export async function handleApiError(response: Response): Promise<ApiError> {
  let errorData: ApiError = {
    message: `HTTP ${response.status}: ${response.statusText}`,
    status: response.status,
  };

  try {
    const errorText = await response.text();
    if (errorText) {
      const parsed = JSON.parse(errorText);
      errorData = {
        message: parsed.message || errorData.message,
        status: response.status,
        error: parsed.error,
      };
    }
  } catch {
    // If JSON parsing fails, use default error message
  }

  return errorData;
}

/**
 * Handles fetch errors and network issues
 */
export function handleFetchError(error: unknown): string {
  if (error instanceof TypeError && error.message === 'Failed to fetch') {
    return 'Cannot connect to server. Please make sure the backend server is running.';
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'An unexpected error occurred. Please try again later.';
}

/**
 * Validates email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates phone number (Indian format)
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone.replace(/\D/g, ''));
}

/**
 * Validates password strength
 */
export function isValidPassword(password: string): boolean {
  return password.length >= 6;
}

/**
 * Sanitizes string input
 */
export function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, '');
}


