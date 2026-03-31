/**
 * Root Navigator
 *
 * Main navigation component that handles the app's navigation structure.
 * Conditionally renders Login or Todos screen based on authentication state.
 *
 * This file is wired up to show your LoginScreen and TodosScreen components.
 * As you implement the AuthContext and screen functionality, you'll see
 * the app come to life with proper authentication flow and navigation.
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { useAuth } from '@/context/AuthContext';
import LoginScreen from '../screens/LoginScreen';
import TodosScreen from '../screens/TodosScreen';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * RootNavigator component
 *
 * Manages app-wide navigation and conditional rendering based on auth state.
 *
 * How it works:
 * - Shows loading spinner while checking authentication (isLoading = true)
 * - Shows LoginScreen when not authenticated (isAuthenticated = false)
 * - Shows TodosScreen when authenticated (isAuthenticated = true)
 *
 * As you implement AuthContext, login(), and logout(), this navigation
 * will automatically switch between screens based on authentication state.
 */
export const RootNavigator: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  // Show loading spinner while checking auth state
  if (isLoading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false, // Hide header for all screens
        }}
      >
        {!isAuthenticated ? (
          // Not authenticated - show login screen
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : (
          // Authenticated - show todos screen
          <Stack.Screen name="Todos" component={TodosScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
