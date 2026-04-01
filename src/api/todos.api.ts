/**
 * Todos API
 *
 * API calls for todo CRUD operations.
 */

import { apiClient, getErrorMessage } from './client';
import {
  Todo,
  TodosResponse,
  TodoResponse,
  CreateTodoRequest,
  UpdateTodoRequest,
} from '@/types/todo.types';

/**
 * Fetch all todos for the authenticated user
 *
 * @returns Promise with array of todos
 * @throws Error if request fails
 */
export const getTodos = async (): Promise<Todo[]> => {
  try {
    const response = await apiClient.get<TodosResponse>('/todos');
    return response.data.todos;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

/**
 * Create a new todo
 *
 * @param todo - Todo data (title)
 * @returns Promise with the created todo
 * @throws Error if creation fails
 */
export const createTodo = async (todo: CreateTodoRequest): Promise<Todo> => {
  try {
    const response = await apiClient.post<TodoResponse>('/todos', todo);
    return response.data.todo;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

/**
 * Update an existing todo (toggle completion or edit title)
 *
 * @param id - Todo ID
 * @param updates - Fields to update (completed, title)
 * @returns Promise with the updated todo
 * @throws Error if update fails
 */
export const updateTodo = async (id: number, updates: UpdateTodoRequest): Promise<Todo> => {
  try {
    const response = await apiClient.patch<TodoResponse>(`/todos/${id}`, updates);
    return response.data.todo;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

/**
 * Delete a todo
 *
 * @param id - Todo ID
 * @returns Promise that resolves when deletion is complete
 * @throws Error if deletion fails
 */
export const deleteTodo = async (id: number): Promise<void> => {
  try {
    await apiClient.delete(`/todos/${id}`);
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};
