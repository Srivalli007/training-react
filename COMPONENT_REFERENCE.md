# Component Reference Guide

Detailed reference for all React components in the TODO application.

## Table of Contents

1. [Component Overview](#component-overview)
2. [UI Components](#ui-components)
3. [Page Components](#page-components)
4. [Utility Components](#utility-components)
5. [Styling Guide](#styling-guide)
6. [Component Testing](#component-testing)

---

## Component Overview

### Component Architecture

```
src/
├── Components/
│   ├── ProtectedRoute.jsx      # Route protection wrapper
│   └── ui/
│       └── button.jsx          # Reusable button component
├── pages/
│   ├── Todo.jsx               # Main TODO page
│   └── login.jsx              # Authentication page
└── context/
    └── AuthContext.jsx        # Authentication context provider
```

### Design Principles

- **Composition over Inheritance**: Components are designed to be composed together
- **Single Responsibility**: Each component has a focused purpose
- **Prop Drilling Avoidance**: Context is used for shared state
- **Accessibility**: Components follow ARIA guidelines where applicable

---

## UI Components

### Button Component

**File**: `src/Components/ui/button.jsx`

#### Interface

```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
}
```

#### Implementation Details

```javascript
const Button = React.forwardRef(function Button({ className = "", ...props }, ref) {
  return (
    <button
      ref={ref}
      className={`bg-blue-600 text-white px-4 py-2 rounded ${className}`}
      {...props}
    />
  );
});
```

#### Features

- **Forwarded Ref**: Supports ref forwarding for direct DOM access
- **Prop Spreading**: Accepts all standard button HTML attributes
- **Customizable Styling**: Allows additional CSS classes via `className`
- **Default Styling**: Consistent blue theme with hover states

#### Usage Examples

```javascript
// Basic button
<Button>Click Me</Button>

// Button with custom styling
<Button className="bg-red-500 hover:bg-red-600 text-lg">
  Delete Item
</Button>

// Button with event handler
<Button onClick={() => handleSubmit()}>
  Submit Form
</Button>

// Button with ref
const buttonRef = useRef(null);
<Button ref={buttonRef} onClick={() => buttonRef.current.focus()}>
  Focus Me
</Button>

// Disabled button
<Button disabled className="opacity-50 cursor-not-allowed">
  Disabled
</Button>

// Button with icon (using Lucide React)
<Button className="flex items-center gap-2">
  <Plus size={16} />
  Add Item
</Button>
```

#### Styling Variants

```javascript
// Primary button (default)
<Button>Primary Action</Button>

// Secondary button
<Button className="bg-gray-500 hover:bg-gray-600">
  Secondary Action
</Button>

// Danger button
<Button className="bg-red-500 hover:bg-red-600">
  Delete
</Button>

// Success button
<Button className="bg-green-500 hover:bg-green-600">
  Save
</Button>

// Outline button
<Button className="bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
  Outline
</Button>

// Large button
<Button className="px-6 py-3 text-lg">
  Large Button
</Button>

// Small button
<Button className="px-2 py-1 text-sm">
  Small
</Button>
```

---

## Page Components

### Todo Component

**File**: `src/pages/Todo.jsx`

#### Interface

```typescript
interface TodoState {
  task: string;
  todos: string[];
}

interface TodoMethods {
  handleAdd: () => void;
  handleDelete: (index: number) => void;
  handleLogout: () => Promise<void>;
}
```

#### State Management

```javascript
const [task, setTask] = useState("");          // Current input value
const [todos, setTodos] = useState([]);        // Array of todo items
```

#### Lifecycle Methods

```javascript
// Load todos from localStorage on mount
useEffect(() => {
  const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  setTodos(savedTodos);
}, []);

// Save todos to localStorage when todos change
useEffect(() => {
  localStorage.setItem("todos", JSON.stringify(todos));
}, [todos]);
```

#### Event Handlers

```javascript
// Add new todo
const handleAdd = () => {
  if (task.trim() !== "") {
    setTodos([...todos, task]);
    setTask("");
  }
};

// Delete todo by index
const handleDelete = (indexToDelete) => {
  const updatedTodos = todos.filter((_, index) => index !== indexToDelete);
  setTodos(updatedTodos);
  localStorage.setItem("todos", JSON.stringify(updatedTodos));
};

// Logout user
const handleLogout = async () => {
  await signOut(auth);
  navigate("/login");
};
```

#### Usage Examples

```javascript
// Basic usage (protected by route)
<Route path="/" element={
  <ProtectedRoute>
    <Todo />
  </ProtectedRoute>
} />

// Custom wrapper (if needed)
function CustomTodoWrapper() {
  return (
    <div className="custom-wrapper">
      <Todo />
    </div>
  );
}
```

#### Component Structure

```jsx
<div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100">
  {/* Header */}
  <h1 className="text-3xl font-bold mb-6">My Todo App</h1>

  {/* Input Section */}
  <div className="flex gap-2 w-full max-w-md">
    <input {...inputProps} />
    <button {...addButtonProps}>Add</button>
  </div>

  {/* Todo List */}
  <ul className="mt-6 w-full max-w-md space-y-2">
    {todos.map((item, index) => (
      <li key={index} {...listItemProps}>
        <span>{item}</span>
        <button {...deleteButtonProps}>Delete</button>
      </li>
    ))}
  </ul>

  {/* Logout Button */}
  <button {...logoutButtonProps}>Logout</button>
</div>
```

### Login Component

**File**: `src/pages/login.jsx`

#### Interface

```typescript
interface LoginState {
  email: string;
  password: string;
}

interface LoginMethods {
  handleLogin: (e: FormEvent) => Promise<void>;
}
```

#### State Management

```javascript
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const navigate = useNavigate();
```

#### Event Handlers

```javascript
const handleLogin = async (e) => {
  e.preventDefault();
  try {
    await signInWithEmailAndPassword(auth, email, password);
    navigate("/");
  } catch (error) {
    alert(error.message);
  }
};
```

#### Form Structure

```jsx
<div className="flex justify-center items-center min-h-screen bg-gray-100">
  <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-96">
    <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
    
    <input
      type="email"
      placeholder="Email"
      className="w-full mb-4 p-3 border border-gray-300 rounded"
      onChange={(e) => setEmail(e.target.value)}
      required
    />
    
    <input
      type="password"
      placeholder="Password"
      className="w-full mb-6 p-3 border border-gray-300 rounded"
      onChange={(e) => setPassword(e.target.value)}
      required
    />
    
    <button
      type="submit"
      className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
    >
      Login
    </button>
  </form>
</div>
```

#### Enhanced Features (Optional)

```javascript
// Loading state
const [isLoading, setIsLoading] = useState(false);

const handleLogin = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  
  try {
    await signInWithEmailAndPassword(auth, email, password);
    navigate("/");
  } catch (error) {
    alert(error.message);
  } finally {
    setIsLoading(false);
  }
};

// Form validation
const isFormValid = email.includes('@') && password.length >= 6;

// Error state
const [error, setError] = useState('');

const handleLogin = async (e) => {
  e.preventDefault();
  setError('');
  
  try {
    await signInWithEmailAndPassword(auth, email, password);
    navigate("/");
  } catch (error) {
    setError(error.message);
  }
};
```

---

## Utility Components

### ProtectedRoute Component

**File**: `src/Components/ProtectedRoute.jsx`

#### Interface

```typescript
interface ProtectedRouteProps {
  children: React.ReactNode;
}
```

#### Implementation

```javascript
function ProtectedRoute({ children }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}
```

#### Usage Patterns

```javascript
// Single protected route
<Route path="/dashboard" element={
  <ProtectedRoute>
    <Dashboard />
  </ProtectedRoute>
} />

// Multiple protected routes
const protectedRoutes = [
  { path: "/", element: <Todo /> },
  { path: "/profile", element: <Profile /> },
  { path: "/settings", element: <Settings /> }
];

protectedRoutes.map(route => (
  <Route 
    key={route.path}
    path={route.path} 
    element={
      <ProtectedRoute>
        {route.element}
      </ProtectedRoute>
    } 
  />
))

// Nested protected routes
<Route path="/app" element={
  <ProtectedRoute>
    <AppLayout />
  </ProtectedRoute>
}>
  <Route index element={<Dashboard />} />
  <Route path="todos" element={<Todo />} />
  <Route path="profile" element={<Profile />} />
</Route>
```

#### Enhanced Protection

```javascript
// Role-based protection
function ProtectedRoute({ children, requiredRole = null }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
}

// Loading state during auth check
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}
```

### AuthProvider Component

**File**: `src/context/AuthContext.jsx`

#### Interface

```typescript
interface AuthContextValue {
  user: User | null;
  loading?: boolean;
  error?: string;
}

interface AuthProviderProps {
  children: React.ReactNode;
}
```

#### Enhanced Implementation

```javascript
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth, 
      (currentUser) => {
        setUser(currentUser);
        setLoading(false);
        setError(null);
      },
      (error) => {
        setError(error.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const value = {
    user,
    loading,
    error
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
```

---

## Styling Guide

### Tailwind CSS Classes Used

#### Layout Classes
```css
/* Flexbox */
.flex, .flex-col, .items-center, .justify-center, .justify-between
.space-x-8, .space-y-2, .gap-2

/* Sizing */
.min-h-screen, .w-full, .max-w-md, .max-w-4xl, .h-24, .w-24

/* Spacing */
.p-6, .p-8, .px-4, .py-2, .px-6, .py-3, .mb-4, .mb-6, .mt-6, .mt-10
```

#### Color Classes
```css
/* Backgrounds */
.bg-gray-100, .bg-white, .bg-blue-500, .bg-blue-600, .bg-red-600

/* Text Colors */
.text-white, .text-gray-800, .text-gray-600, .text-gray-500, .text-red-600

/* Borders */
.border, .border-gray-300
```

#### Interactive Classes
```css
/* Hover States */
.hover:bg-blue-600, .hover:bg-red-600, .hover:underline, .hover:scale-110

/* Transitions */
.transition-colors, .transition-transform

/* Animations */
.animate-spin-slow
```

### Custom CSS

**File**: `src/index.css`

```css
/* Custom animations */
@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.animate-spin-slow {
  animation: spin-slow 3s linear infinite;
}

/* Custom utilities */
.shadow-custom {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}
```

### Component-Specific Styling

```javascript
// Button variants
const buttonVariants = {
  primary: "bg-blue-600 hover:bg-blue-700 text-white",
  secondary: "bg-gray-600 hover:bg-gray-700 text-white",
  danger: "bg-red-600 hover:bg-red-700 text-white",
  outline: "border border-gray-300 hover:bg-gray-50 text-gray-700"
};

// Size variants
const sizeVariants = {
  sm: "px-2 py-1 text-sm",
  md: "px-4 py-2", // default
  lg: "px-6 py-3 text-lg"
};
```

---

## Component Testing

### Testing Utilities

```javascript
// Test setup
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';

// Test wrapper
function TestWrapper({ children }) {
  return (
    <BrowserRouter>
      <AuthProvider>
        {children}
      </AuthProvider>
    </BrowserRouter>
  );
}
```

### Component Test Examples

```javascript
// Button component tests
describe('Button Component', () => {
  it('renders with default styling', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-blue-600', 'text-white');
  });

  it('applies custom className', () => {
    render(<Button className="custom-class">Click me</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

// Todo component tests
describe('Todo Component', () => {
  it('adds new todo item', () => {
    render(<Todo />, { wrapper: TestWrapper });
    
    const input = screen.getByPlaceholderText('Enter a task');
    const addButton = screen.getByText('Add');
    
    fireEvent.change(input, { target: { value: 'New task' } });
    fireEvent.click(addButton);
    
    expect(screen.getByText('New task')).toBeInTheDocument();
  });

  it('deletes todo item', () => {
    render(<Todo />, { wrapper: TestWrapper });
    
    // Add a task first
    const input = screen.getByPlaceholderText('Enter a task');
    fireEvent.change(input, { target: { value: 'Task to delete' } });
    fireEvent.click(screen.getByText('Add'));
    
    // Delete the task
    fireEvent.click(screen.getByText('Delete'));
    
    expect(screen.queryByText('Task to delete')).not.toBeInTheDocument();
  });
});
```

---

## Accessibility Considerations

### ARIA Labels and Roles

```javascript
// Button with aria-label
<Button aria-label="Add new todo item">
  <Plus size={16} />
</Button>

// Form with proper labels
<form>
  <label htmlFor="email">Email Address</label>
  <input 
    id="email" 
    type="email" 
    aria-describedby="email-help"
    aria-required="true"
  />
  <div id="email-help">Enter your email address</div>
</form>

// Todo list with proper structure
<ul role="list" aria-label="Todo items">
  {todos.map((item, index) => (
    <li key={index} role="listitem">
      <span>{item}</span>
      <button 
        aria-label={`Delete ${item}`}
        onClick={() => handleDelete(index)}
      >
        Delete
      </button>
    </li>
  ))}
</ul>
```

### Keyboard Navigation

```javascript
// Keyboard event handling
const handleKeyDown = (e) => {
  if (e.key === 'Enter') {
    handleAdd();
  }
  if (e.key === 'Escape') {
    setTask('');
  }
};

<input 
  onKeyDown={handleKeyDown}
  // ... other props
/>
```

### Focus Management

```javascript
// Focus management in forms
const inputRef = useRef(null);

const handleAdd = () => {
  if (task.trim() !== "") {
    setTodos([...todos, task]);
    setTask("");
    inputRef.current?.focus(); // Keep focus on input
  }
};

<input ref={inputRef} {...props} />
```

---

*This component reference provides detailed information about each component's interface, usage patterns, styling options, and testing approaches. Use this guide when developing new features or maintaining existing components.*