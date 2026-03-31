/**
 * Todos Screen
 *
 * Main screen for displaying and managing todos.
 *
 * TODO: Implement this screen following the requirements below:
 *
 * Requirements:
 * 1. Fetch todos on component mount using fetchTodos() API
 * 2. Display list of todos using TodoItem component
 * 3. Add new todos using AddTodoForm component
 * 4. Implement toggle completion (call updateTodo API)
 * 5. Implement delete todo (call deleteTodo API)
 * 6. Show loading state while fetching
 * 7. Show empty state when no todos exist
 * 8. Add logout button in header
 * 9. Display todo statistics (active/completed count)
 * 10. Implement optimistic updates for better UX
 *
 * Hints:
 * - Use the API functions from '../api/todos.api'
 * - Use the TodoItem and AddTodoForm components
 * - Use the useAuth hook to access logout function
 * - Use useState for managing todos state
 * - Use useEffect to fetch todos on mount
 * - Handle errors gracefully
 */

import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import { RootStackScreenProps } from '../navigation/types';
// TODO: Import API functions from todos.api
// TODO: Import components (TodoItem, AddTodoForm, LoadingSpinner, Button)
// TODO: Import useAuth hook
// TODO: Import Todo type
// TODO: Import theme for styling

type Props = RootStackScreenProps<'Todos'>;

const TodosScreen: React.FC<Props> = ({ navigation }) => {
  // TODO: Add state for todos, loading, error
  // TODO: Get logout function from useAuth

  /**
   * Fetch todos from API
   * TODO: Implement this function
   */
  const loadTodos = async () => {
    // TODO: Implement
  };

  /**
   * Load todos on component mount
   */
  useEffect(() => {
    // TODO: Call loadTodos
  }, []);

  /**
   * Handle adding a new todo
   * TODO: Implement this function
   */
  const handleAddTodo = async (title: string) => {
    // TODO: Implement
  };

  /**
   * Handle toggling todo completion
   * TODO: Implement this function
   */
  const handleToggleTodo = async (id: number, completed: boolean) => {
    // TODO: Implement with optimistic update
  };

  /**
   * Handle deleting a todo
   * TODO: Implement this function
   */
  const handleDeleteTodo = async (id: number) => {
    // TODO: Implement with optimistic update
  };

  /**
   * Handle logout
   * TODO: Implement this function
   */
  const handleLogout = async () => {
    // TODO: Call logout from useAuth
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Todos Screen</Text>
        <Text style={styles.subtitle}>TODO: Implement todos management</Text>

        {/* TODO: Add header with logout button */}
        {/* TODO: Add AddTodoForm component */}
        {/* TODO: Show loading spinner while fetching */}
        {/* TODO: Show error message if error exists */}
        {/* TODO: Show empty state if no todos */}
        {/* TODO: Map over todos and render TodoItem components */}
        {/* TODO: Show statistics (active/completed count) */}
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

export default TodosScreen;
