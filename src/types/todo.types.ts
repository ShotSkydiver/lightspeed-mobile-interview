/**
 * Todo Type Definitions
 */

/**
 * Todo model representing a todo item
 */
export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Request payload for creating a new todo
 */
export interface CreateTodoRequest {
  title: string;
}

/**
 * Request payload for updating a todo
 */
export interface UpdateTodoRequest {
  completed?: boolean;
  title?: string;
}

/**
 * Response from the API when fetching todos
 */
export interface TodosResponse {
  todos: Todo[];
}

/**
 * Response from the API when creating/updating a todo
 */
export interface TodoResponse {
  todo: Todo;
}
