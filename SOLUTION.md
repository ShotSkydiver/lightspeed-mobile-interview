# Solution Documentation

**Candidate Name:** Conner Owen
**Date Completed:** 03/31/2026
**Time Spent:** 5 hours

---

## Implementation Summary

### Completed Tasks
- [ ] Authentication Context (`src/context/AuthContext.tsx`)
- [ ] Login Screen (`src/screens/LoginScreen.tsx`)
- [ ] Todo API Integration (`src/api/todos.api.ts`)
- [ ] Todos Screen (`src/screens/TodosScreen.tsx`)
- [ ] Testing (`__tests__/`)

### What I Implemented

Implemented all required tasks defined in the README. Full authentication flow with error handling and token storage, CRUD operations for the TodosScreen, and optimistic updates where appropriate. Added additional error validation UX and combined that with loading states where relevant for a good user experience.


---

## Key Decisions

**State Management:**
AuthContext for authentication-related storage; everything else is useState variables scoped to their respective components.

**Error Handling:**
Lots of try-catch blocks, with user-facing error messages implemented when appropriate. Certain errors (invalid email address, no text in the Add Todo text input) are displayed on the text input itself, changing the border to red and displaying a small error message below.

**Optimistic Updates:**
Yes, just for the toggle and delete functions, since those are the simplest UI updates and are the least jarring to revert back if the API call fails and the UI must revert to its previous state.

---

## Challenges & Solutions

**Challenge 1:**
One challenge was writing new tests, I decided to add a test for correctly showing an error when trying to create a new Todo when the text input is empty, I had originally written the error handling logic within the TodosScreen component but because the test is only testing on the AddTodoForm component, mocking that error state (and not being able to get the value prop to update) was not working out.
**Solution:**
I moved all the error handling logic/UX into the AddTodoForm component instead, which made it much easier to test and resulted in cleaner code in the TodosScreen.

**Challenge 2:**
A smaller challenge was implementing good error handling and deciding where it made sense to bother implementing without going too overboard. Having overly complicated error validation and handling would just lead to more code bloat and overhead than the actual usefulness the error validation would create in the first place.
**Solution:** Deciding to just focus on the only two text input fields that could feasibly have an error, and implementing just one type of error checking for each, kept the scope down while still providing the benefit of covering the most essential error scenarios.

---

## Testing

I added tests centered around creating new todos; with the error handling I implemented I wanted to make sure it was being tested. Having two tests that covered a successful todo creation and unsuccessful todo creation that would trigger the error validation made sense.

---

## What I'd Improve With More Time

1. There are so many more UI/UX improvements and cleanup I'd like to do, specifically with improving how errors are displayed and presented to the user. Maybe something in a custom Alert component that the user can take action on.
2. Better UI/UX and optimization per-platform; I would definitely have spent more time testing on each platform (iOS/Android/Web), and implementing UX that makes the app feel more native on that platform.
3. More robust features for the todo list; I'd spend time to implement more features like editing todos, implementing a category feature so you can group todos under user-created categories and switch between those lists, etc.

---

## How to Run

```bash
# Install and start
npm install
npm run server  # Terminal 1
npm start       # Terminal 2 (press 'w' for web)

# Test
npm test

# Login credentials
# Email: test@example.com
# Password: password
```

---

## Additional Notes

I had a lot of fun working on this! It's very much in line with my past experience, and I enjoyed getting the opportunity to develop for mobile again. I'm looking forward to chatting with you guys about this project!

---

Thank you for reviewing my submission! I'm happy to discuss any part of my implementation.
