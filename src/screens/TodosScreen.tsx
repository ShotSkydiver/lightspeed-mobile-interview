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
import { getTodos, createTodo, updateTodo, deleteTodo } from '@/api/todos.api';

import { TodoItem } from '@/components/TodoItem';
import { AddTodoForm } from '@/components/AddTodoForm';
import { Button } from '@/components/common/Button';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

import { useAuth } from '@/context/AuthContext';
import { Todo } from '@/types/todo.types';
import { styles as appStyles } from '@/styles/App.styles';

type Props = RootStackScreenProps<'Todos'>;

const TodosScreen: React.FC<Props> = ({ navigation }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const authContext = useAuth();

  /**
   * Fetch todos from API
   */
  const loadTodos = async () => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const loadedTodos = await getTodos();
      setTodos(loadedTodos);
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'There was an error loading the todos list! Please try again.');
    }
    setIsLoading(false);
  };

  /**
   * Load todos on component mount
   */
  useEffect(() => {
    loadTodos();
  }, []);

  /**
   * Handle adding a new todo
   */
  const handleAddTodo = async (title: string) => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const newTodo = await createTodo({ title });
      setTodos([ newTodo, ...todos ]);
      setNewTodo('');
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'There was an error creating this todo.');
    }
    setIsLoading(false);
  };

  /**
   * Handle toggling todo completion
   */
  const handleToggleTodo = async (id: number, completed: boolean) => {
    const previousTodos = todos;

    setErrorMessage('');
    setTodos(previous => previous.map(todo => todo.id === id ? { ...todo, completed: !completed } : todo));

    try {
      const updatedTodo = await updateTodo(id, { completed: !completed });
      setTodos(previous => previous.map(todo => todo.id === id ? updatedTodo : todo));
    } catch (err) {
      setTodos(previousTodos);
      setErrorMessage(err instanceof Error ? err.message : 'Failed to delete todo.')
    }
  };

  /**
   * Handle deleting a todo
   */
  const handleDeleteTodo = async (id: number) => {
    const previousTodos = todos;

    setErrorMessage('');
    setTodos(previous => previous.filter(todo => todo.id !== id));

    try {
      await deleteTodo(id);
    } catch (err) {
      setTodos(previousTodos);
      setErrorMessage(err instanceof Error ? err.message : 'Failed to delete todo.')
    }
  };

  /**
   * Handle logout
   */
  const handleLogout = async () => {
    try {
      await authContext.logout();
      setTodos([]);
    } catch (err) {
      console.error('handleLogout error:', err);
      navigation.replace('Login');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <Text style={styles.title}>Todos Screen</Text>
        <Text style={styles.subtitle}>View and manage your todos</Text>

        <View style={appStyles.todoHeader}>
          <Text style={appStyles.todoHeaderText}>Todos</Text>
          <Button title="Log out" disabled={isLoading} onPress={handleLogout} />
        </View>

        <AddTodoForm
          value={newTodo}
          onChangeText={text => setNewTodo(text)}
          onSubmit={() => handleAddTodo(newTodo)}
        />

        <ScrollView style={styles.todoListScrollView} contentContainerStyle={appStyles.todoList}>
          {isLoading ? (
            <LoadingSpinner text="Loading todos..." />
          ) : errorMessage ? (
            <Text style={appStyles.error}>{errorMessage}</Text>
          ) : todos.length === 0 ? (
            <View style={appStyles.emptyState}>
              <Text style={appStyles.emptyStateText}>No Todos</Text>
              <Text style={appStyles.emptyStateSubtext}>Create a new todo from the field above.</Text>
            </View>
          ) : (
            <View style={styles.todoListItemsContainer}>
              {todos.map((todo, index) => (
                <TodoItem key={index} todo={todo} onToggle={() => handleToggleTodo(todo.id, todo.completed)} onDelete={() => handleDeleteTodo(todo.id)} />
              ))}
            </View>
          )}

        </ScrollView>

        <View style={appStyles.stats}>
          <Text style={appStyles.statsText}>{todos.filter(todo => todo.completed).length} Completed / {todos.length} Total</Text>
        </View>
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
  todoListScrollView: {
    width: '80%',
    paddingHorizontal: 24,
    paddingVertical: 12
  },
  todoListItemsContainer: {
    width: '100%'
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
