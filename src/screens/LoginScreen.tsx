/**
 * Login Screen
 *
 * Screen for user authentication.
 *
 * TODO: Implement this screen following the requirements below:
 *
 * Requirements:
 * 1. Create a form with email and password inputs (use Input component)
 * 2. Add a login button (use Button component)
 * 3. Use the useAuth hook to access login function
 * 4. Call login() when button is pressed
 * 5. Show loading state while logging in
 * 6. Display error messages if login fails
 * 7. Disable button when fields are empty
 * 8. Clear form after successful login
 *
 * Hints:
 * - Use the Button and Input components from '../components/common'
 * - Use the useAuth hook from '../context/AuthContext'
 * - Use SafeAreaView, ScrollView for proper layout
 * - Show the LoadingSpinner component while isLoading is true
 * - Test credentials: test@example.com / password
 */

import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import { RootStackScreenProps } from '../navigation/types';
// TODO: Import Button, Input, LoadingSpinner from components
// TODO: Import useAuth hook
// TODO: Import theme and create styles

type Props = RootStackScreenProps<'Login'>;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  // TODO: Add state for email and password
  // TODO: Get login function and state from useAuth

  // TODO: Implement handleLogin function

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Login Screen</Text>
        <Text style={styles.subtitle}>TODO: Implement login form</Text>

        {/* TODO: Add Input components for email and password */}
        {/* TODO: Add Button component for login */}
        {/* TODO: Show error message if error exists */}
        {/* TODO: Show loading spinner while isLoading */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
});

export default LoginScreen;
