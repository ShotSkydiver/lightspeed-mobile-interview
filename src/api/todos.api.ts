/**
 * Todos API
 *
 * API calls for todo CRUD operations.
 *
 * TODO: Implement these functions following the pattern in auth.api.ts
 *
 * Available endpoints (from mock server):
 * - GET    /todos           - Get all todos
 * - POST   /todos           - Create todo (body: { title: string })
 * - PATCH  /todos/:id       - Update todo (body: { completed?: boolean, title?: string })
 * - DELETE /todos/:id       - Delete todo
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
 * TODO: Implement this function
 * Hint: Use GET /todos and return the array of todos
 *
 * @returns Promise with array of todos
 * @throws Error if request fails
 */
export const getTodos = async (): Promise<Todo[]> => {
  // TODO: Implement
  throw new Error('getTodos not implemented');
};

/**
 * Create a new todo
 *
 * TODO: Implement this function
 * Hint: Use POST /todos with the todo data
 *
 * @param todo - Todo data (title)
 * @returns Promise with the created todo
 * @throws Error if creation fails
 */
export const createTodo = async (todo: CreateTodoRequest): Promise<Todo> => {
  // TODO: Implement
  throw new Error('createTodo not implemented');
};

/**
 * Update an existing todo (toggle completion or edit title)
 *
 * TODO: Implement this function
 * Hint: Use PATCH /todos/:id with the update data
 *
 * @param id - Todo ID
 * @param updates - Fields to update (completed, title)
 * @returns Promise with the updated todo
 * @throws Error if update fails
 */
export const updateTodo = async (id: number, updates: UpdateTodoRequest): Promise<Todo> => {
  // TODO: Implement
  throw new Error('updateTodo not implemented');
};

/**
 * Delete a todo
 *
 * TODO: Implement this function
 * Hint: Use DELETE /todos/:id
 *
 * @param id - Todo ID
 * @returns Promise that resolves when deletion is complete
 * @throws Error if deletion fails
 */
export const deleteTodo = async (id: number): Promise<void> => {
  // TODO: Implement
  throw new Error('deleteTodo not implemented');
};
