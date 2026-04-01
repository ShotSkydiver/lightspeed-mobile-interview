/**
 * Login Screen
 *
 * Screen for user authentication.
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

const LoginScreen: React.FC<Props> = () => {
  const [email, setEmail] = useState<string>('');
  const [emailValidationError, setEmailValidationError] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const authContext = useAuth();

  const validateEmail = (inputText: string) => {
    const emailRegex = /\S+@\S+\.\S+/;

    return emailRegex.test(inputText);
  };

  const handleLogin = async () => {
    if (!validateEmail(email)) {
      setEmailValidationError(true);
      return;
    }

    try {
      await authContext.login(email, password);

      setEmail('');
      setPassword('');

      // No need to manually navigate to TodosScreen, RootNavigator will automatically switch to that screen once isAuthenticated is true
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
          <Input
            placeholder="Email"
            value={email}
            hasError={emailValidationError}
            errorMessage="Not a valid email address"
            onChangeText={text => {
              setEmailValidationError(false);
              setEmail(text);
            }}
            keyboardType="email-address"
          />
          <View style={styles.spacer} />
          <Input placeholder="Password" value={password} onChangeText={text => setPassword(text)} secureTextEntry />
        </View>

        <Button title="Log in" disabled={authContext.isLoading || (!email || !password)} onPress={handleLogin} />

        {authContext.error && (
          <Text style={appStyles.errorText}>{authContext.error}</Text>
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
