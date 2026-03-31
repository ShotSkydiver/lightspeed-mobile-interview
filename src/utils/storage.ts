/**
 * Storage Utility
 *
 * Wrapper around AsyncStorage for type-safe local storage operations.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Save a string value to storage
 */
export const setItem = async (key: string, value: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.error(`Error saving ${key} to storage:`, error);
    throw error;
  }
};

/**
 * Get a string value from storage
 */
export const getItem = async (key: string): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    console.error(`Error getting ${key} from storage:`, error);
    return null;
  }
};

/**
 * Save an object to storage (automatically stringifies)
 */
export const setObject = async <T>(key: string, value: T): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    console.error(`Error saving object ${key} to storage:`, error);
    throw error;
  }
};

/**
 * Get an object from storage (automatically parses)
 */
export const getObject = async <T>(key: string): Promise<T | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error(`Error getting object ${key} from storage:`, error);
    return null;
  }
};

/**
 * Remove an item from storage
 */
export const removeItem = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing ${key} from storage:`, error);
    throw error;
  }
};

/**
 * Clear all items from storage
 */
export const clear = async (): Promise<void> => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error('Error clearing storage:', error);
    throw error;
  }
};

/**
 * Get all keys in storage
 */
export const getAllKeys = async (): Promise<string[]> => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    return keys as string[];
  } catch (error) {
    console.error('Error getting all keys from storage:', error);
    return [];
  }
};
