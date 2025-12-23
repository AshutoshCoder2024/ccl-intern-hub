/**
 * Application Constants
 * Centralized configuration and constants for the application
 */

// Application Status Constants
export const APPLICATION_STATUS = {
  PENDING: 'pending',
  UNDER_REVIEW: 'under-review',
  ACCEPTED: 'accepted',
  REJECTED: 'rejected',
} as const;

export type ApplicationStatus = typeof APPLICATION_STATUS[keyof typeof APPLICATION_STATUS];

// API Endpoints
export const API_ENDPOINTS = {
  // User endpoints
  USER_REGISTER: '/api/users/register',
  USER_LOGIN: '/api/users/login',
  USER_PROFILE: '/api/users/profile',
  
  // Application endpoints
  APPLICATIONS: '/api/applications',
  MY_APPLICATIONS: '/api/applications/my-applications',
  APPLICATION_STATUS: (id: string) => `/api/applications/${id}/status`,
  
  // Admin endpoints
  ADMIN_REGISTER: '/api/admin/register',
  ADMIN_LOGIN: '/api/admin/login',
  ADMIN_LIST: '/api/admin',
  
  // Internship endpoints
  INTERNSHIPS: '/api/internships',
  INTERNSHIP: (id: string) => `/api/internships/${id}`,
  
  // Health check
  HEALTH: '/api/health',
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  USER_TOKEN: 'userToken',
  USER_NAME: 'userName',
  USER_EMAIL: 'userEmail',
  ADMIN_TOKEN: 'adminToken',
} as const;

// Month Period Options
export const MONTH_PERIODS = [
  { value: 'Jan-Feb', label: 'January - February' },
  { value: 'Mar-Apr', label: 'March - April' },
  { value: 'May-Jun', label: 'May - June' },
  { value: 'Jul-Aug', label: 'July - August' },
  { value: 'Sep-Oct', label: 'September - October' },
  { value: 'Nov-Dec', label: 'November - December' },
] as const;

// Status Badge Configurations
export const STATUS_CONFIG = {
  [APPLICATION_STATUS.PENDING]: {
    variant: 'secondary' as const,
    label: 'Pending',
    color: 'text-yellow-600',
  },
  [APPLICATION_STATUS.UNDER_REVIEW]: {
    variant: 'default' as const,
    label: 'Under Review',
    color: 'text-blue-600',
  },
  [APPLICATION_STATUS.ACCEPTED]: {
    variant: 'default' as const,
    label: 'Accepted',
    color: 'text-green-600',
  },
  [APPLICATION_STATUS.REJECTED]: {
    variant: 'destructive' as const,
    label: 'Rejected',
    color: 'text-red-600',
  },
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'Unauthorized. Please login again.',
  NOT_FOUND: 'Resource not found.',
  SERVER_ERROR: 'Server error. Please try again later.',
  DATABASE_ERROR: 'Database connection error. Please try again later.',
  VALIDATION_ERROR: 'Please fill all required fields correctly.',
  DUPLICATE_APPLICATION: 'You have already applied for this internship.',
  SEATS_FULL: 'This internship is no longer accepting applications. All seats have been filled.',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  APPLICATION_SUBMITTED: 'Application submitted successfully!',
  PROFILE_UPDATED: 'Profile updated successfully!',
  STATUS_UPDATED: 'Application status updated successfully!',
  INTERNSHIP_CREATED: 'Internship created successfully!',
  INTERNSHIP_UPDATED: 'Internship updated successfully!',
  INTERNSHIP_DELETED: 'Internship deleted successfully!',
} as const;

// Default Admin Credentials (for initial setup)
export const DEFAULT_ADMIN = {
  EMAIL: 'admin@ccl.com',
  PASSWORD: 'password123',
  ROLE: 'super-admin',
} as const;


