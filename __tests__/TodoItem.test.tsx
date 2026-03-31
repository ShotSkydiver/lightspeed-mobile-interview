/**
 * TodoItem Component Tests
 *
 * Example test file demonstrating how to test React Native components.
 * Use this as a reference for writing your own tests.
 */

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { TodoItem } from '../src/components/TodoItem';
import { Todo } from '../src/types/todo.types';

describe('TodoItem Component', () => {
  const mockTodo: Todo = {
    id: 1,
    title: 'Test Todo',
    completed: false,
  };

  const mockOnToggle = jest.fn();
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders todo title correctly', () => {
    const { getByText } = render(
      <TodoItem todo={mockTodo} onToggle={mockOnToggle} onDelete={mockOnDelete} />
    );

    expect(getByText('Test Todo')).toBeTruthy();
  });

  it('calls onToggle when checkbox is pressed', () => {
    const { getByTestId } = render(
      <TodoItem
        todo={mockTodo}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
        testID="todo-item"
      />
    );

    // Find the touchable area that contains the checkbox
    const todoItem = getByTestId('todo-item');
    const touchable = todoItem.children[0]; // First child is the TouchableOpacity

    fireEvent.press(touchable);

    expect(mockOnToggle).toHaveBeenCalledTimes(1);
  });

  it('calls onDelete when delete button is pressed', () => {
    const { getByText } = render(
      <TodoItem todo={mockTodo} onToggle={mockOnToggle} onDelete={mockOnDelete} />
    );

    const deleteButton = getByText('Delete');
    fireEvent.press(deleteButton);

    expect(mockOnDelete).toHaveBeenCalledTimes(1);
  });

  it('displays completed todo with strikethrough style', () => {
    const completedTodo: Todo = {
      ...mockTodo,
      completed: true,
    };

    const { getByText } = render(
      <TodoItem todo={completedTodo} onToggle={mockOnToggle} onDelete={mockOnDelete} />
    );

    const titleText = getByText('Test Todo');
    expect(titleText.props.style).toContainEqual(
      expect.objectContaining({
        textDecorationLine: 'line-through',
      })
    );
  });

  it('does not display strikethrough for incomplete todo', () => {
    const { getByText } = render(
      <TodoItem todo={mockTodo} onToggle={mockOnToggle} onDelete={mockOnDelete} />
    );

    const titleText = getByText('Test Todo');
    const hasStrikethrough = titleText.props.style.some(
      (style: any) => style?.textDecorationLine === 'line-through'
    );

    expect(hasStrikethrough).toBeFalsy();
  });
});
