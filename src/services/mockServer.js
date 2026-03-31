/**
 * Mock API Server for React Native Todo Interview
 *
 * This is a simple Express server that simulates a real backend API.
 * It provides authentication and CRUD operations for todos.
 *
 * All data is stored in memory and resets when the server restarts.
 */

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());

// CORS middleware - allow all origins for development
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
});

// Logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// ============================================================================
// In-Memory Data Storage
// ============================================================================

// Mock users database
const users = [
  {
    id: 1,
    email: 'test@example.com',
    password: 'password', // In real app, this would be hashed!
    name: 'Test User',
  },
  {
    id: 2,
    email: 'demo@example.com',
    password: 'demo123',
    name: 'Demo User',
  },
];

// Mock todos database (user_id -> todos mapping)
let todosDb = {
  1: [
    { id: 1, title: 'Complete authentication context', completed: false, createdAt: new Date().toISOString() },
    { id: 2, title: 'Implement login screen', completed: false, createdAt: new Date().toISOString() },
    { id: 3, title: 'Build todos API integration', completed: false, createdAt: new Date().toISOString() },
    { id: 4, title: 'Create todos screen', completed: false, createdAt: new Date().toISOString() },
    { id: 5, title: 'Write tests', completed: false, createdAt: new Date().toISOString() },
  ],
  2: [
    { id: 1, title: 'Welcome to the Todo App!', completed: true, createdAt: new Date().toISOString() },
  ],
};

let todoIdCounter = 10;

// Mock tokens (in real app, use JWT)
const tokens = new Map(); // token -> userId mapping

// ============================================================================
// Helper Functions
// ============================================================================

function generateToken(userId) {
  const token = `mock-token-${userId}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  tokens.set(token, userId);
  return token;
}

function getUserFromToken(token) {
  if (!token) return null;

  // Remove 'Bearer ' prefix if present
  const cleanToken = token.startsWith('Bearer ') ? token.slice(7) : token;

  const userId = tokens.get(cleanToken);
  if (!userId) return null;

  return users.find(u => u.id === userId);
}

/**
 * Simulate network delay before sending response
 * @param {Object} res - Express response object
 * @param {number} statusCode - HTTP status code
 * @param {Object} data - Response data
 * @param {number} delay - Delay in milliseconds
 */
function sendWithDelay(res, statusCode, data, delay = 200) {
  setTimeout(() => {
    res.status(statusCode).json(data);
  }, delay);
}

// ============================================================================
// Authentication Middleware
// ============================================================================

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'No authorization token provided' });
  }

  const user = getUserFromToken(authHeader);

  if (!user) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }

  req.user = user;
  next();
}

// ============================================================================
// Routes
// ============================================================================

// Health check
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Mock API Server is running',
    endpoints: {
      auth: {
        login: 'POST /auth/login',
        me: 'GET /auth/me',
      },
      todos: {
        list: 'GET /todos',
        create: 'POST /todos',
        update: 'PATCH /todos/:id',
        delete: 'DELETE /todos/:id',
      }
    }
  });
});

// ----------------------------------------------------------------------------
// Auth Routes
// ----------------------------------------------------------------------------

/**
 * POST /auth/login
 * Login with email and password
 *
 * Request body:
 * {
 *   "email": "test@example.com",
 *   "password": "password"
 * }
 *
 * Response:
 * {
 *   "token": "mock-token-...",
 *   "user": { "id": 1, "email": "...", "name": "..." }
 * }
 */
app.post('/auth/login', (req, res) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    return res.status(400).json({
      error: 'Email and password are required'
    });
  }

  // Find user
  const user = users.find(u => u.email === email);

  if (!user || user.password !== password) {
    // Simulate delay for failed login
    return sendWithDelay(res, 401, { error: 'Invalid email or password' }, 500);
  }

  // Generate token
  const token = generateToken(user.id);

  // Return user data (without password)
  const { password: _, ...userWithoutPassword } = user;

  // Simulate network delay
  sendWithDelay(res, 200, { token, user: userWithoutPassword }, 300);
});

/**
 * GET /auth/me
 * Get current user profile (requires authentication)
 *
 * Headers:
 * Authorization: Bearer <token>
 *
 * Response:
 * {
 *   "user": { "id": 1, "email": "...", "name": "..." }
 * }
 */
app.get('/auth/me', authMiddleware, (req, res) => {
  const { password, ...userWithoutPassword } = req.user;
  res.json({ user: userWithoutPassword });
});

/**
 * POST /auth/logout
 * Logout (invalidate token)
 */
app.post('/auth/logout', authMiddleware, (req, res) => {
  const authHeader = req.headers.authorization;
  const cleanToken = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;

  tokens.delete(cleanToken);

  res.json({ message: 'Logged out successfully' });
});

// ----------------------------------------------------------------------------
// Todo Routes
// ----------------------------------------------------------------------------

/**
 * GET /todos
 * Get all todos for the authenticated user
 */
app.get('/todos', authMiddleware, (req, res) => {
  const userId = req.user.id;
  const userTodos = todosDb[userId] || [];

  // Simulate network delay
  sendWithDelay(res, 200, { todos: userTodos });
});

/**
 * POST /todos
 * Create a new todo
 *
 * Request body:
 * {
 *   "title": "Buy groceries"
 * }
 */
app.post('/todos', authMiddleware, (req, res) => {
  const { title } = req.body;
  const userId = req.user.id;

  if (!title || title.trim().length === 0) {
    return res.status(400).json({
      error: 'Title is required'
    });
  }

  // Initialize user's todos array if it doesn't exist
  if (!todosDb[userId]) {
    todosDb[userId] = [];
  }

  // Create new todo
  const newTodo = {
    id: ++todoIdCounter,
    title: title.trim(),
    completed: false,
    createdAt: new Date().toISOString(),
  };

  todosDb[userId].push(newTodo);

  // Simulate network delay
  sendWithDelay(res, 201, { todo: newTodo });
});

/**
 * PATCH /todos/:id
 * Update a todo (toggle completion or edit title)
 *
 * Request body:
 * {
 *   "completed": true,
 *   "title": "Updated title" // optional
 * }
 */
app.patch('/todos/:id', authMiddleware, (req, res) => {
  const todoId = parseInt(req.params.id);
  const userId = req.user.id;
  const { completed, title } = req.body;

  const userTodos = todosDb[userId] || [];
  const todoIndex = userTodos.findIndex(t => t.id === todoId);

  if (todoIndex === -1) {
    return res.status(404).json({
      error: 'Todo not found'
    });
  }

  // Update todo
  if (typeof completed === 'boolean') {
    userTodos[todoIndex].completed = completed;
  }

  if (title !== undefined && title.trim().length > 0) {
    userTodos[todoIndex].title = title.trim();
  }

  userTodos[todoIndex].updatedAt = new Date().toISOString();

  // Simulate network delay
  sendWithDelay(res, 200, { todo: userTodos[todoIndex] });
});

/**
 * DELETE /todos/:id
 * Delete a todo
 */
app.delete('/todos/:id', authMiddleware, (req, res) => {
  const todoId = parseInt(req.params.id);
  const userId = req.user.id;

  const userTodos = todosDb[userId] || [];
  const todoIndex = userTodos.findIndex(t => t.id === todoId);

  if (todoIndex === -1) {
    return res.status(404).json({
      error: 'Todo not found'
    });
  }

  // Remove todo
  userTodos.splice(todoIndex, 1);

  // Simulate network delay
  sendWithDelay(res, 200, { message: 'Todo deleted successfully' });
});

// ============================================================================
// Error Handling
// ============================================================================

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    path: req.path,
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: err.message,
  });
});

// ============================================================================
// Start Server
// ============================================================================

app.listen(PORT, '0.0.0.0', () => {
  console.log('========================================');
  console.log('🚀 Mock API Server Started');
  console.log('========================================');
  console.log(`📍 URL: http://localhost:${PORT}`);
  console.log(`📅 Started at: ${new Date().toISOString()}`);
  console.log('');
  console.log('📚 Available Test Users:');
  console.log('  - Email: test@example.com, Password: password');
  console.log('  - Email: demo@example.com, Password: demo123');
  console.log('');
  console.log('🔗 Endpoints:');
  console.log('  POST   /auth/login      - Login');
  console.log('  GET    /auth/me         - Get current user');
  console.log('  POST   /auth/logout     - Logout');
  console.log('  GET    /todos           - Get all todos');
  console.log('  POST   /todos           - Create todo');
  console.log('  PATCH  /todos/:id       - Update todo');
  console.log('  DELETE /todos/:id       - Delete todo');
  console.log('========================================');
});
