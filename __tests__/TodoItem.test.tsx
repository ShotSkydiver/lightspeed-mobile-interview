/**
 * TodoItem Component Tests
 *
 * Example test file demonstrating how to test React Native components.
 * Use this as a reference for writing your own tests.
 */

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { TodoItem } from '../src/components/TodoItem';
import { AddTodoForm } from '@/components/AddTodoForm';
import { Todo } from '../src/types/todo.types';

describe('TodoItem Component', () => {
  const mockTodo: Todo = {
    id: 1,
    title: 'Test Todo',
    completed: false,
  };

  const mockOnToggle = jest.fn();
  const mockOnDelete = jest.fn();
  const mockOnChangeText = jest.fn();
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders todo title correctly', () => {
    const { getByText } = render(
      <TodoItem todo={mockTodo} onToggle={mockOnToggle} onDelete={mockOnDelete} />
    );

    expect(getByText('Test Todo')).toBeTruthy();
  });

  it('calls onSubmit when a new todo item is created by the user', () => {
    const { getByTestId, rerender } = render(
      <AddTodoForm
        value=""
        onChangeText={mockOnChangeText}
        onSubmit={mockOnSubmit}
        testID="add-todo-form"
      />
    );

    const addTodoFormTextInput = getByTestId('add-todo-form-text-input');
    fireEvent.changeText(addTodoFormTextInput, 'Test Todo #2');
    expect(mockOnChangeText).toHaveBeenCalledWith('Test Todo #2');

    rerender(
      <AddTodoForm
        value="Test Todo #2"
        onChangeText={mockOnChangeText}
        onSubmit={mockOnSubmit}
        testID="add-todo-form"
      />
    );

    const addButton = getByTestId('add-todo-form-add-button');
    fireEvent.press(addButton);

    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });

  it('displays an error when a new todo item is created with nothing in the text input', () => {
    const { getByTestId } = render(
      <AddTodoForm
        value=""
        onChangeText={mockOnChangeText}
        onSubmit={mockOnSubmit}
        testID="add-todo-form"
      />
    );

    const addButton = getByTestId('add-todo-form-add-button');
    fireEvent.press(addButton);

    const errorText = getByTestId('add-todo-form-text-input-error');
    expect(errorText).toBeTruthy();
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
    const touchable = getByTestId('todo-item-toggle-button');
    fireEvent.press(touchable);

    expect(mockOnToggle).toHaveBeenCalledTimes(1);
  });

  it('calls onDelete when delete button is pressed', () => {
    const { getByTestId } = render(
      <TodoItem
        todo={mockTodo}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
        testID="todo-item"
      />
    );

    const deleteButton = getByTestId('todo-item-delete-button');
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

    expect(titleText.props.style).not.toContainEqual(
      expect.objectContaining({
        textDecorationLine: 'line-through',
      })
    );
  });
});
