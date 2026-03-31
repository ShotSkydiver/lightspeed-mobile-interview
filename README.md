# React Native Todo App - Take-Home Assignment

## Overview

A focused React Native TypeScript application to evaluate your mobile development skills. You'll implement authentication and basic todo management in a realistic codebase.

## What's Already Built

We've provided significant scaffolding so you can focus on core logic:

- ✅ Complete project setup (Expo, TypeScript, Navigation)
- ✅ All UI components (Button, Input, LoadingSpinner)
- ✅ Navigation structure with TypeScript types
- ✅ API client with Axios configuration
- ✅ Mock API server (no backend needed!)
- ✅ TypeScript types for all data models
- ✅ Storage utilities (AsyncStorage wrapper)
- ✅ Styling theme and constants

### Core Requirements

> **🤖 AI Assistant Strongly Recommended**
>
> This assignment is designed to be completed with AI assistance. This reflects how modern React Native development works and is part of what we're evaluating.
>
> **Suggested AI tools (free tiers available):**
> - **ChatGPT** (free at chat.openai.com) - General coding assistance
> - **Claude** (free at claude.ai) - Code generation and debugging
> - **GitHub Copilot** (free for students/some accounts) - Inline code suggestions
> - **Cursor** (free tier available) - AI-powered code editor
> - Or any other AI coding assistant you prefer
>
> **Expected completion time:**
> - With AI assistance: 2-4 hours
> - Without AI assistance: 8+ hours
>
> We're looking for developers who can effectively leverage AI tools to be productive. The focus is on your ability to **guide, review, and adapt** AI-generated code rather than writing everything from scratch.
>
> **Important:** In the follow-up interview, you'll be asked to explain your implementation decisions and walk through your code. Treat AI as a productivity tool, not a way to skip understanding what you're building.
>
> **Recommended approach:**
> - Work through the requirements **step-by-step**
> - Use AI to implement, debug, and refine your code
> - **Review and understand** all AI-generated code before committing
> - Make meaningful commits showing your thought process (not just "AI generated this")
> - Adapt the code to fit the project's patterns and your understanding
>
> We'll review your commit history to understand your development process, so meaningful incremental commits are important!

**1. Authentication Context**

Implement `src/context/AuthContext.tsx`:
- [ ] Create context to manage auth state (user, token, isLoading)
- [ ] Implement `login()` function using provided API
- [ ] Implement `logout()` function
- [ ] Store/retrieve token from AsyncStorage
- [ ] Provide auth state to app

**2. Login Screen**

Complete `src/screens/LoginScreen.tsx`:
- [ ] Build login form (use provided Input/Button components)
- [ ] Call `login()` from AuthContext
- [ ] Show loading state during login
- [ ] Display error messages
- [ ] Navigate to TodosScreen on success

**3. Todo API Integration**

Implement `src/api/todos.api.ts`:
- [ ] `getTodos()` - GET request
- [ ] `createTodo()` - POST request
- [ ] `updateTodo()` - PATCH request
- [ ] `deleteTodo()` - DELETE request

**4. Todos Screen**

Complete `src/screens/TodosScreen.tsx`:
- [ ] Fetch and display todos
- [ ] Add new todo (simple input + button)
- [ ] Toggle todo completion
- [ ] Delete todos
- [ ] Show loading spinner while fetching
- [ ] Handle empty state
- [ ] Prevent duplicate submissions (disable button/input during API calls)

**5. Testing**

Add at least **2 additional meaningful tests** in `__tests__/TodoItem.test.tsx`:
- [ ] Test a different user interaction (e.g., delete button)
- [ ] Test an edge case or error state

Use the existing TodoItem.test.tsx as a reference for testing patterns.

## Git Workflow (IMPORTANT!)

**This project uses git for version control.** We ask that you make meaningful, incremental commits as you work.

### Quick Start:
1. The project is already initialized with git
2. Make commits as you complete each task
3. Use clear, descriptive commit messages
4. Aim for 5-8 commits total

### Example commit flow:
```bash
git add src/context/AuthContext.tsx
git commit -m "Implement login and logout in AuthContext"

git add src/screens/LoginScreen.tsx
git commit -m "Build LoginScreen with validation and error handling"

git add src/api/todos.api.ts
git commit -m "Implement todos API functions"

# ... continue for each task
```

**📖 For detailed git workflow instructions, see [GIT_WORKFLOW.md](./GIT_WORKFLOW.md)**

**Your commit history will be reviewed as part of the evaluation.**

## Setup & Running

### Prerequisites
- Node.js 18+ and npm
- OR Docker and Docker Compose (for containerized setup)

### Option 1: Local Setup (Recommended)

**1. Install Dependencies**
```bash
cd mobile-interview-takehome
npm install
```

**2. Start Mock API Server** (in one terminal)
```bash
npm run server
```
Mock API runs on `http://localhost:3001`

**3. Start Expo** (in another terminal)
```bash
npm start
```
Then press `w` for web or use Expo Go app on your phone

### Option 2: Docker Setup

**1. Start Everything with Docker Compose**
```bash
docker-compose up --build
```

This will:
- Build the Docker image
- Start the mock API server on `http://localhost:3001`
- Start Expo dev server with web on `http://localhost:19006`

**2. Access the App**
- Web: Open browser to `http://localhost:19006`
- Mobile: Scan QR code from terminal with Expo Go app

**3. Stop Services**
```bash
docker-compose down
```

### Running Tests
```bash
npm test                 # Run all tests once
npm run test:watch       # Run in watch mode
npm run test:coverage    # Generate coverage report
```

## Mock API

**Login:**
```bash
POST /auth/login
{
  "email": "test@example.com",
  "password": "password"
}
# Returns: { token, user }
```

**Todos:** (all require `Authorization: Bearer <token>`)
```bash
GET    /todos           # Get all
POST   /todos           # Create: { title }
PATCH  /todos/:id       # Update: { completed }
DELETE /todos/:id       # Delete
```

**Test Credentials:**
- Email: `test@example.com`
- Password: `password`

## Project Structure

```
mobile-interview-takehome/
├── README.md
├── SOLUTION.md                         # 📝 Template for your documentation
├── package.json
├── tsconfig.json
├── .gitignore
├── .eslintrc.js
├── .prettierrc
├── app.json
├── App.tsx                             # 📱 Demo app (for reference)
├── babel.config.js
├── metro.config.js
├── Dockerfile
├── docker-compose.yml
├── src/
│   ├── api/
│   │   ├── client.ts                  # ✅ Axios client with interceptors
│   │   ├── auth.api.ts                # ✅ Auth API (reference implementation)
│   │   └── todos.api.ts               # ⚠️  YOU IMPLEMENT THIS
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.tsx             # ✅ Reusable button component
│   │   │   ├── Input.tsx              # ✅ Reusable input component
│   │   │   └── LoadingSpinner.tsx     # ✅ Loading indicator
│   │   ├── TodoItem.tsx               # ✅ Todo item component
│   │   └── AddTodoForm.tsx            # ✅ Add todo form component
│   ├── screens/
│   │   ├── LoginScreen.tsx            # ⚠️  YOU IMPLEMENT THIS
│   │   └── TodosScreen.tsx            # ⚠️  YOU IMPLEMENT THIS
│   ├── navigation/
│   │   ├── types.ts                   # ✅ TypeScript navigation types
│   │   └── RootNavigator.tsx          # ✅ Navigation structure
│   ├── context/
│   │   └── AuthContext.tsx            # ⚠️  YOU IMPLEMENT THIS
│   ├── types/
│   │   ├── auth.types.ts              # ✅ Authentication types
│   │   └── todo.types.ts              # ✅ Todo types
│   ├── utils/
│   │   ├── storage.ts                 # ✅ AsyncStorage wrapper
│   │   └── constants.ts               # ✅ App configuration
│   ├── services/
│   │   └── mockServer.js              # ✅ Mock API server
│   └── styles/
│       ├── theme.ts                   # ✅ Design system (colors, spacing)
│       └── App.styles.ts              # ✅ App component styles
└── __tests__/
    └── TodoItem.test.tsx               # ✅ Example test (reference)
```

### Legend
- ✅ **Fully implemented** - Use as reference
- ⚠️  **YOU IMPLEMENT THIS** - Your task to complete
- 📝 **Template** - Fill out when done
- 📱 **Demo** - Working example for testing

## Evaluation Focus

**Functionality (50%)** - Does it work?
- All 5 tasks complete and working
- Proper error handling
- Good user experience (loading states, feedback)

**Code Quality (30%)** - Clean, typed, organized code
- TypeScript types used effectively
- Clean component structure (no unused imports, TODOs removed)
- Proper use of provided utilities
- No unnecessary complexity

**React Patterns (20%)** - Proper hooks, state management, component structure
- Appropriate use of hooks (useState, useEffect, useContext)
- Good separation of concerns
- Proper Context API usage

## Deliverables

1. Working implementation of the 5 tasks above
2. Brief `SOLUTION.md` (5 min to write):
   - Any trade-offs or decisions you made
   - What you'd improve with more time
   - How to test your implementation

## Tips

- Don't over-engineer! Simple solutions are preferred, think KISS
- Focus on core functionality first
- Use the provided components and utilities
- TypeScript types are your friend
- Comments are helpful but code should be self-documenting
- If you get stuck, implement what you can and document blockers

### Code Quality Reminders

- **Clean up as you go**: Remove unused imports, TODO comments, and commented-out code
  - **Note**: Files you need to implement (`LoginScreen.tsx`, `TodosScreen.tsx`, `AuthContext.tsx`, `todos.api.ts`) have pre-imported utilities and types that may appear "unused" initially. These are intentional scaffolding - keep and use them in your implementation!
- **Use provided utilities**: `STORAGE_KEYS`, `getErrorMessage`, storage functions, etc.
- **Run checks before submitting**: `npm run lint`, `npm run type-check`, and `npm test`
- **TypeScript strict mode is enabled**: Fix all type errors and warnings
- **Keep code clean**: Think about what you'd want to see in a code review

## Bonus (Optional - Only if time permits)

If you finish early and want to showcase additional skills:
- Add pull-to-refresh
- Add todo editing functionality
- Improve error messages
- Add input validation
- Enhance styling
- Add more tests

## Submission Instructions

When you're ready to submit:

### 1. Final Checklist

**Functionality:**
- [ ] All 5 tasks completed and working
- [ ] App runs without errors: `npm start`
- [ ] Tests pass: `npm test`

**Code Quality:**
- [ ] No TypeScript errors: `npm run type-check`
- [ ] No lint warnings: `npm run lint`
- [ ] Unused imports removed
- [ ] TODO comments removed from implementation files
- [ ] Using provided utilities (STORAGE_KEYS, getErrorMessage, etc.)

**Submission:**
- [ ] All changes committed to git (no uncommitted files)
- [ ] Git history is clean and meaningful (5-8+ commits)
- [ ] SOLUTION.md filled out

### 2. Verify Your Commits
```bash
# Check for uncommitted changes
git status

# Review your commit history
git log --oneline

# You should see 5-8 meaningful commits
```

### 3. Create Submission Zip
```bash
# Run the submission script (uses git user.name automatically)
./create-submission-zip.sh

# Or provide your name explicitly
./create-submission-zip.sh "Your Name"
```

This script will create a properly formatted submission zip that:
- Includes your `.git` directory (required for commit history review)
- Excludes unnecessary files (node_modules, builds, etc.)
- Automatically names the file using your name (from CLI argument or git user.name)
- Creates `mobile-interview-takehome-submission-yourname.zip` in the current directory

**⚠️ Important:** The zip MUST include the `.git` directory so we can review your commit history!

### 4. Submit
Submit your zip file via the submission link provided in the email invitation we sent via **Greenhouse**.

---

## Questions?

If you have questions about requirements or encounter setup issues, please reach out to your hiring recruiter.

---

Good luck! We're excited to see your solution and discuss your approach in the follow-up interview. 🚀
