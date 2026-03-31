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
import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import { RootStackScreenProps } from '../navigation/types';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { useAuth } from '@/context/AuthContext';
import { styles as appStyles } from '@/styles/App.styles';

type Props = RootStackScreenProps<'Login'>;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const authContext = useAuth();

  const handleLogin = async () => {
    try {
      await authContext.login(email, password);

      setEmail('');
      setPassword('');

      // No need to manually navigate to TodosScreen, RootNavigator will automatically switch to that screen once isAuthenticated is true
      // navigation.replace('Todos')
    } catch (err) {
      console.error('handleLogin error:', err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <Text style={styles.title}>Login Screen</Text>
        <Text style={styles.subtitle}>Enter your email and password below.</Text>

        <View style={appStyles.form}>
          <Input placeholder="Email" value={email} onChangeText={text => setEmail(text)} />
          <View style={styles.spacer} />
          <Input placeholder="Password" value={password} onChangeText={text => setPassword(text)} secureTextEntry />
        </View>

        <Button title="Log in" disabled={authContext.isLoading || (!email || !password)} onPress={handleLogin} />

        {authContext.error && (
          <Text style={appStyles.error}>{authContext.error}</Text>
        )}

        {authContext.isLoading && (
          <LoadingSpinner text="Logging in..." />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
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
    marginBottom: 20,
  },
  spacer: {
    height: 12,
  }
});

export default LoginScreen;
