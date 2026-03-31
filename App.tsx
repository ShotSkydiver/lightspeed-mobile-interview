/**
 * App Entry Point
 *
 * This is the root component of the application.
 * It wraps the app with the AuthProvider and renders the RootNavigator.
 *
 * As you implement the AuthContext, LoginScreen, and TodosScreen,
 * you'll also need to wire them up in src/navigation/RootNavigator.tsx
 * to make everything work together.
 */

import React from 'react';
import { AuthProvider } from '@/context/AuthContext';
import { RootNavigator } from '@/navigation/RootNavigator';

export default function App() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}
