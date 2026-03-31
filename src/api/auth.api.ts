/**
 * Authentication API
 *
 * API calls for authentication (login, logout, get current user).
 * This file is FULLY IMPLEMENTED as a reference for candidates.
 */

import { apiClient, getErrorMessage } from './client';
import { LoginRequest, LoginResponse, User } from '../types/auth.types';

/**
 * Login with email and password
 *
 * @param credentials - User email and password
 * @returns Promise with token and user data
 * @throws Error if login fails
 */
export const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
  try {
    const response = await apiClient.post<LoginResponse>('/auth/login', credentials);
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

/**
 * Get current authenticated user
 *
 * @returns Promise with user data
 * @throws Error if request fails
 */
export const getCurrentUser = async (): Promise<User> => {
  try {
    const response = await apiClient.get<{ user: User }>('/auth/me');
    return response.data.user;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

/**
 * Logout current user
 *
 * @returns Promise that resolves when logout is complete
 * @throws Error if logout fails
 */
export const logout = async (): Promise<void> => {
  try {
    await apiClient.post('/auth/logout');
  } catch (error) {
    // Log error but don't throw - we still want to clear local state
    console.error('Logout error:', getErrorMessage(error));
  }
};
