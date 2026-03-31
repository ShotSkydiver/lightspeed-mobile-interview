# Git Workflow Instructions

## Overview

This project uses git for version control. We ask that you make **meaningful, incremental commits** as you work through the assignment. This helps us understand your development process and thought patterns.

---

## Quick Start

The project is already initialized with git. Verify setup:
```bash
git log  # Should see: "Initial project scaffolding"
git status  # Should see clean working directory
```

Configure your identity if needed:
```bash
git config user.name "Your Name"
git config user.email "your.email@example.com"
```

---

## Recommended Workflow

**Work on tasks in order:**
1. AuthContext → 2. LoginScreen → 3. Todos API → 4. TodosScreen → 5. Testing

**Commit after completing each logical unit:**

```bash
# Example: After completing AuthContext
git add src/context/AuthContext.tsx
git commit -m "Implement login and logout in AuthContext

- Add login API call with token storage
- Implement logout with state cleanup
- Add token persistence check on startup"

# Example: After completing LoginScreen
git add src/screens/LoginScreen.tsx
git commit -m "Build LoginScreen with form validation

- Add email and password inputs
- Show loading states and error messages
- Disable button when fields empty"
```

---

## Commit Message Guidelines

**Good examples:**
```
✅ "Implement login function in AuthContext"
✅ "Add error handling for network failures"
✅ "Implement TodosScreen with CRUD operations"
```

**Poor examples:**
```
❌ "WIP"
❌ "fix stuff"
❌ "updates"
❌ "done"
```

**Format:**
```
Brief description of what was done (50 chars or less)

Optional body explaining why/how (if needed)
```

---

## How Many Commits?

**Aim for 5-8 meaningful commits**, such as:
1. Implement AuthContext (login/logout/persistence)
2. Build LoginScreen with validation
3. Implement todos API functions
4. Create TodosScreen with CRUD operations
5. Add optimistic updates (optional)
6. Add tests and complete SOLUTION.md

**Don't:**
- Make one giant commit at the end
- Make a commit for every tiny change
- Use "WIP" or empty commit messages

---

## Checking Your Work

Before submitting, review your commits:
```bash
git log --oneline              # See all commits
git status                     # Check for uncommitted changes
```

You should see:
- ✅ 5-8 clear, descriptive commit messages
- ✅ Logical progression through tasks
- ✅ No uncommitted changes

---

## Common Issues

**Forgot to commit something?**
```bash
git add <files>
git commit --amend  # Add to last commit
# OR
git commit -m "Add missing functionality"  # New commit
```

**Want to combine recent commits?**
```bash
git rebase -i HEAD~3  # Combine last 3 commits
# Change 'pick' to 'squash' in editor
```

---

## Submission Checklist

- [ ] All code committed (run `git status`)
- [ ] 5-8 meaningful commit messages
- [ ] SOLUTION.md completed and committed
- [ ] Tests pass: `npm test`
- [ ] App runs: `npm start`

**Create submission zip:**
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

---

Good luck! 🚀
