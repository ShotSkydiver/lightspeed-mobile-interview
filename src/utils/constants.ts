/**
 * Application Constants
 *
 * Centralized configuration values for the application.
 */

// API Configuration
export const API_BASE_URL = __DEV__
  ? 'http://localhost:3001'
  : 'https://api.production.com'; // Replace with actual production URL

export const API_TIMEOUT = 10000; // 10 seconds

// Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: '@todo_app:auth_token',
  USER_DATA: '@todo_app:user_data',
} as const;

// App Configuration
export const APP_CONFIG = {
  MAX_TODO_LENGTH: 200,
  MIN_PASSWORD_LENGTH: 6,
  DEBOUNCE_DELAY: 300,
} as const;

// Test Credentials (for mock API)
export const TEST_CREDENTIALS = {
  email: 'test@example.com',
  password: 'password',
} as const;
