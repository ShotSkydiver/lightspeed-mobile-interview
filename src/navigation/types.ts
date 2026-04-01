/**
 * Navigation Types
 *
 * TypeScript type definitions for React Navigation.
 * This provides type safety for navigation props and route params.
 */

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
 * @see https://reactnavigation.org/docs/typescript/#specifying-default-types-for-usenavigation-etc
 */
declare global {
  // React Navigation types `useNavigation` via global interface merging on `ReactNavigation.RootParamList`, not ES modules.
  // eslint-disable-next-line @typescript-eslint/no-namespace -- required global augmentation for React Navigation
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
