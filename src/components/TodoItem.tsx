import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, borderRadius, spacing, typography } from '../styles/theme';
import { Todo } from '../types/todo.types';

export interface TodoItemProps {
  todo: Todo;
  onToggle: () => void;
  onDelete: () => void;
  actionsDisabled?: boolean;
  testID?: string;
}

/**
 * TodoItem component displays a single todo with toggle and delete actions
 */
export const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete, actionsDisabled = false, testID }) => {
  return (
    <View style={styles.todoItem} testID={testID}>
      <TouchableOpacity style={styles.todoContent} onPress={onToggle} testID={`${testID}-toggle-button`}>
        <View style={[styles.checkbox, todo.completed && styles.checkboxChecked]}>
          {todo.completed && <Text style={styles.checkmark}>✓</Text>}
        </View>
        <Text style={[styles.todoText, todo.completed && styles.todoTextCompleted]}>
          {todo.title}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity disabled={actionsDisabled} onPress={onDelete} style={styles.deleteButton} testID={`${testID}-delete-button`}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: spacing.lg,
    borderRadius: borderRadius.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  todoContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.primary,
    marginRight: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
  },
  checkmark: {
    color: colors.white,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
  },
  todoText: {
    fontSize: typography.fontSize.md,
    color: colors.text,
    flex: 1,
  },
  todoTextCompleted: {
    textDecorationLine: 'line-through',
    color: colors.textTertiary,
  },
  deleteButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
  },
  deleteButtonText: {
    color: colors.danger,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
  },
});
