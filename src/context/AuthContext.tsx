/**
 * Authentication Context
 *
 * Global state management for user authentication.
 *
 * TODO: Implement this context following the requirements below:
 *
 * Requirements:
 * 1. Manage authentication state (user, token, isLoading, isAuthenticated)
 * 2. Implement login() function that:
 *    - Calls the login API
 *    - Stores token in AsyncStorage
 *    - Updates context state
 * 3. Implement logout() function that:
 *    - Clears token from AsyncStorage
 *    - Resets context state
 * 4. On mount, check AsyncStorage for existing token and validate it
 * 5. Handle errors and expose them via context
 *
 * Hints:
 * - Use the login() and getCurrentUser() functions from '../api/auth.api'
 * - Use setItem(), getItem(), removeItem() from '../utils/storage'
 * - Use STORAGE_KEYS.AUTH_TOKEN from '../utils/constants'
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthContextValue, User } from '../types/auth.types';
// TODO: Import API functions from auth.api
// TODO: Import storage functions from storage
// TODO: Import STORAGE_KEYS from constants

// Create the context with undefined as initial value
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

/**
 * AuthProvider component
 *
 * Wraps the app and provides authentication state and functions to all children.
 */
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // TODO: Add state for user, token, isLoading, error
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Check for existing token on mount
   *
   * TODO: Implement this useEffect
   * 1. Get token from AsyncStorage
   * 2. If token exists, validate it by calling getCurrentUser()
   * 3. Update state based on result
   * 4. Set isLoading to false when done
   */
  useEffect(() => {
    // TODO: Implement token check
    setIsLoading(false); // Placeholder - remove when implementing
  }, []);

  /**
   * Login function
   *
   * TODO: Implement this function
   * @param email - User email
   * @param password - User password
   */
  const login = async (email: string, password: string): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);

      // TODO: Call login API
      // TODO: Save token to AsyncStorage
      // TODO: Update state with user and token

      throw new Error('Login not implemented');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login failed';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Logout function
   *
   * TODO: Implement this function
   */
  const logout = async (): Promise<void> => {
    try {
      setIsLoading(true);

      // TODO: Call logout API (optional, can fail gracefully)
      // TODO: Remove token from AsyncStorage
      // TODO: Clear state

      throw new Error('Logout not implemented');
    } catch (err) {
      console.error('Logout error:', err);
      // Even if API call fails, clear local state
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContextValue = {
    user,
    token,
    isLoading,
    isAuthenticated: !!user && !!token,
    login,
    logout,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * useAuth hook
 *
 * Custom hook to access authentication context.
 * Must be used within AuthProvider.
 */
export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
