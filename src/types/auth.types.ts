/**
 * Authentication Type Definitions
 */

/**
 * User model representing an authenticated user
 */
export interface User {
  id: number;
  email: string;
  name: string;
}

/**
 * Login request payload
 */
export interface LoginRequest {
  email: string;
  password: string;
}

/**
 * Login response from the API
 */
export interface LoginResponse {
  token: string;
  user: User;
}

/**
 * Authentication state for the application
 */
export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

/**
 * Auth context value interface
 */
export interface AuthContextValue extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
}
