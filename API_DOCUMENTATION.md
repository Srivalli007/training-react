# TODO App - API Documentation

A comprehensive guide to all public APIs, components, and functions in the TODO application.

## Table of Contents

1. [Overview](#overview)
2. [Firebase Configuration](#firebase-configuration)
3. [Context APIs](#context-apis)
4. [Components](#components)
5. [Pages](#pages)
6. [Utility Functions](#utility-functions)
7. [Usage Examples](#usage-examples)

## Overview

The TODO app is built with React, Firebase Authentication, and local storage for task persistence. It features a protected routing system and responsive UI built with Tailwind CSS.

### Tech Stack
- **React 19.1.0** - Frontend framework
- **Firebase 12.0.0** - Authentication
- **React Router DOM 7.7.1** - Routing
- **Tailwind CSS** - Styling
- **Vite** - Build tool

---

## Firebase Configuration

### `src/firebase.js`

Firebase configuration and authentication setup.

#### Exports

```javascript
export const auth
```

**Description**: Firebase authentication instance configured with the project credentials.

**Type**: `Auth`

**Usage**:
```javascript
import { auth } from './firebase.js';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

// Sign in
await signInWithEmailAndPassword(auth, email, password);

// Sign out
await signOut(auth);
```

---

## Context APIs

### `src/context/AuthContext.jsx`

Authentication context provider for managing user state across the application.

#### AuthProvider

```javascript
function AuthProvider({ children })
```

**Description**: Context provider that wraps the app and provides authentication state.

**Props**:
- `children` (ReactNode) - Child components to wrap

**Provides**:
- `user` (User | null) - Current authenticated user or null

**Usage**:
```javascript
import { AuthProvider } from './context/AuthContext.jsx';

<AuthProvider>
  <App />
</AuthProvider>
```

#### useAuth Hook

```javascript
function useAuth()
```

**Description**: Custom hook to access authentication context.

**Returns**: 
- `{ user }` (Object) - Object containing current user state

**Usage**:
```javascript
import { useAuth } from './context/AuthContext.jsx';

function MyComponent() {
  const { user } = useAuth();
  
  if (user) {
    return <div>Welcome, {user.email}!</div>;
  }
  
  return <div>Please log in</div>;
}
```

---

## Components

### `src/Components/ProtectedRoute.jsx`

Route protection component that redirects unauthenticated users.

#### ProtectedRoute

```javascript
function ProtectedRoute({ children })
```

**Description**: Wrapper component that protects routes from unauthenticated access.

**Props**:
- `children` (ReactNode) - Components to render if user is authenticated

**Behavior**:
- If user is authenticated: renders children
- If user is not authenticated: redirects to `/login`

**Usage**:
```javascript
import ProtectedRoute from './Components/ProtectedRoute.jsx';

<Route 
  path="/dashboard" 
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  } 
/>
```

### `src/Components/ui/button.jsx`

Reusable button component with consistent styling.

#### Button

```javascript
const Button = React.forwardRef(function Button({ className, ...props }, ref))
```

**Description**: Styled button component with forwarded ref support.

**Props**:
- `className` (string, optional) - Additional CSS classes to apply
- `...props` (Object) - All other HTML button props
- `ref` (Ref) - Forwarded ref to the button element

**Default Styling**: Blue background, white text, padding, rounded corners

**Usage**:
```javascript
import { Button } from './Components/ui/button.jsx';

// Basic usage
<Button>Click Me</Button>

// With custom styling
<Button className="bg-red-500 hover:bg-red-600">
  Delete
</Button>

// With onClick handler
<Button onClick={() => console.log('Clicked!')}>
  Action Button
</Button>

// With ref
const buttonRef = useRef();
<Button ref={buttonRef}>Ref Button</Button>
```

---

## Pages

### `src/pages/login.jsx`

Authentication page for user login.

#### Login

```javascript
function Login()
```

**Description**: Login form component with email/password authentication.

**Features**:
- Email and password input fields
- Form validation
- Firebase authentication integration
- Error handling with alerts
- Automatic redirect to home page on success

**State**:
- `email` (string) - User's email input
- `password` (string) - User's password input

**Methods**:
- `handleLogin(e)` - Async function that processes login form submission

**Usage**:
```javascript
import Login from './pages/login.jsx';

// In routing
<Route path="/login" element={<Login />} />
```

**Form Structure**:
```html
<form onSubmit={handleLogin}>
  <input type="email" placeholder="Email" />
  <input type="password" placeholder="Password" />
  <button type="submit">Login</button>
</form>
```

### `src/pages/Todo.jsx`

Main TODO application page with task management functionality.

#### Todo

```javascript
function Todo()
```

**Description**: Complete TODO management interface with CRUD operations and persistence.

**Features**:
- Add new tasks
- Delete existing tasks
- Local storage persistence
- User logout functionality
- Responsive design

**State**:
- `task` (string) - Current task input
- `todos` (Array<string>) - List of all tasks

**Methods**:

##### handleAdd
```javascript
const handleAdd = () => void
```
**Description**: Adds a new task to the list if input is not empty.
**Behavior**: 
- Validates task is not empty/whitespace
- Adds task to todos array
- Clears input field
- Auto-saves to localStorage

##### handleDelete
```javascript
const handleDelete = (indexToDelete: number) => void
```
**Description**: Removes a task from the list by index.
**Parameters**:
- `indexToDelete` (number) - Index of task to remove
**Behavior**:
- Filters out task at specified index
- Updates state and localStorage

##### handleLogout
```javascript
const handleLogout = async () => void
```
**Description**: Signs out user and redirects to login page.
**Behavior**:
- Calls Firebase signOut
- Navigates to `/login`

**Local Storage Integration**:
- Automatically loads tasks on component mount
- Saves tasks whenever todos state changes
- Key: `"todos"`
- Format: JSON stringified array

**Usage**:
```javascript
import Todo from './pages/Todo.jsx';

// In routing
<Route path="/" element={
  <ProtectedRoute>
    <Todo />
  </ProtectedRoute>
} />
```

---

## Utility Functions

### LocalStorage Operations

The app uses browser localStorage for task persistence:

#### Save Tasks
```javascript
localStorage.setItem("todos", JSON.stringify(todos));
```

#### Load Tasks
```javascript
const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
```

#### Clear Tasks
```javascript
localStorage.removeItem("todos");
```

---

## Usage Examples

### Complete App Setup

```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Login from './pages/login.jsx';
import Todo from './pages/Todo.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Todo />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
```

### Authentication Flow

```javascript
// 1. User visits protected route
// 2. ProtectedRoute checks authentication status
// 3. If not authenticated, redirect to /login
// 4. User enters credentials in Login component
// 5. handleLogin processes authentication
// 6. On success, navigate to protected route
// 7. ProtectedRoute now allows access

// Login process
const handleLogin = async (e) => {
  e.preventDefault();
  try {
    await signInWithEmailAndPassword(auth, email, password);
    navigate("/"); // Redirect to protected route
  } catch (error) {
    alert(error.message); // Show error
  }
};
```

### TODO Operations

```javascript
// Add a task
const addTask = (taskText) => {
  if (taskText.trim() !== "") {
    setTodos([...todos, taskText]);
    setTask(""); // Clear input
  }
};

// Delete a task
const deleteTask = (index) => {
  const updatedTodos = todos.filter((_, i) => i !== index);
  setTodos(updatedTodos);
  localStorage.setItem("todos", JSON.stringify(updatedTodos));
};

// Load tasks on app start
useEffect(() => {
  const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  setTodos(savedTodos);
}, []);

// Auto-save when todos change
useEffect(() => {
  localStorage.setItem("todos", JSON.stringify(todos));
}, [todos]);
```

### Custom Hook Usage

```javascript
// Using the authentication hook
function MyComponent() {
  const { user } = useAuth();
  
  return (
    <div>
      {user ? (
        <div>
          <h1>Welcome {user.email}</h1>
          <button onClick={() => signOut(auth)}>Logout</button>
        </div>
      ) : (
        <div>Please log in</div>
      )}
    </div>
  );
}
```

### Component Composition

```javascript
// Creating a protected page
function MyProtectedPage() {
  return (
    <ProtectedRoute>
      <div>
        <h1>Protected Content</h1>
        <Button onClick={() => console.log('Action')}>
          Do Something
        </Button>
      </div>
    </ProtectedRoute>
  );
}
```

---

## API Response Types

### Firebase Auth User
```typescript
interface User {
  uid: string;
  email: string;
  emailVerified: boolean;
  displayName: string | null;
  photoURL: string | null;
  // ... other Firebase user properties
}
```

### Todo Item
```typescript
type TodoItem = string;
type TodoList = TodoItem[];
```

---

## Error Handling

### Authentication Errors
```javascript
try {
  await signInWithEmailAndPassword(auth, email, password);
} catch (error) {
  // Common errors:
  // - auth/user-not-found
  // - auth/wrong-password
  // - auth/invalid-email
  alert(error.message);
}
```

### Local Storage Errors
```javascript
try {
  const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  setTodos(savedTodos);
} catch (error) {
  console.error("Failed to load todos from localStorage:", error);
  setTodos([]); // Fallback to empty array
}
```

---

## Security Considerations

1. **Firebase Configuration**: API keys are exposed in client-side code (normal for Firebase web apps)
2. **Route Protection**: All sensitive routes should be wrapped with `ProtectedRoute`
3. **Data Validation**: Always validate user input before processing
4. **Error Messages**: Avoid exposing sensitive information in error messages

---

## Performance Notes

1. **Local Storage**: Synchronous operations may block UI for large datasets
2. **Authentication State**: Uses Firebase onAuthStateChanged listener for real-time updates
3. **Re-renders**: useEffect dependencies are properly configured to prevent unnecessary renders
4. **Memory Leaks**: Firebase listener is properly unsubscribed in cleanup function

---

## Browser Compatibility

- **Local Storage**: Supported in all modern browsers (IE8+)
- **Firebase**: Requires modern browser with ES6 support
- **React 19**: Requires modern browser with ES6+ support

---

*Last updated: [Current Date]*
*Version: 1.0.0*