/**
 * Navigation Types
 *
 * TypeScript type definitions for React Navigation.
 * This provides type safety for navigation props and route params.
 */

import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

/**
 * Root Stack Navigator - Main navigation structure
 */
export type RootStackParamList = {
  Login: undefined;
  Todos: undefined;
};

/**
 * Type helper for screen props
 */
export type RootStackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  T
>;

/**
 * Declare global types for navigation
 * This allows useNavigation() to be fully typed without explicit generics
 */
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
