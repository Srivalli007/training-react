# Development Guide

Comprehensive guide for setting up, developing, and maintaining the TODO application.

## Table of Contents

1. [Quick Start](#quick-start)
2. [Project Structure](#project-structure)
3. [Development Workflow](#development-workflow)
4. [Environment Setup](#environment-setup)
5. [Build and Deployment](#build-and-deployment)
6. [Code Standards](#code-standards)
7. [Testing Strategy](#testing-strategy)
8. [Troubleshooting](#troubleshooting)

---

## Quick Start

### Prerequisites

- **Node.js**: 18.0.0 or higher
- **npm**: 9.0.0 or higher
- **Git**: Latest version
- **Firebase Account**: For authentication setup

### Installation

```bash
# Clone the repository
git clone https://github.com/Srivalli007/training-react.git

# Navigate to project directory
cd training-react

# Install dependencies
npm install

# Start development server
npm run dev
```

### Initial Setup

1. **Configure Firebase**:
   ```bash
   # Update src/firebase.js with your Firebase config
   # Create a Firebase project at https://console.firebase.google.com
   ```

2. **Enable Authentication**:
   ```bash
   # In Firebase console:
   # 1. Go to Authentication > Sign-in method
   # 2. Enable Email/Password authentication
   ```

3. **Access the Application**:
   ```bash
   # Development server runs on http://localhost:5173
   # Create a test user account to access the TODO features
   ```

---

## Project Structure

```
├── public/                     # Static assets
│   ├── vite.svg               # Vite logo
│   └── favicon.ico            # Favicon
├── src/                       # Source code
│   ├── Components/            # Reusable components
│   │   ├── ProtectedRoute.jsx # Route protection
│   │   └── ui/               # UI components
│   │       └── button.jsx    # Button component
│   ├── app/                  # App-specific components
│   │   ├── App.jsx          # Main app component (demo)
│   │   └── App.css          # App-specific styles
│   ├── assets/              # Static assets
│   │   └── react.svg        # React logo
│   ├── context/             # React contexts
│   │   └── AuthContext.jsx  # Authentication context
│   ├── pages/               # Page components
│   │   ├── Todo.jsx         # TODO page
│   │   └── login.jsx        # Login page
│   ├── firebase.js          # Firebase configuration
│   ├── index.css           # Global styles
│   └── main.jsx            # Application entry point
├── eslint.config.js        # ESLint configuration
├── index.html             # HTML template
├── jsconfig.json          # JavaScript configuration
├── package.json           # Dependencies and scripts
├── postcss.config.cjs     # PostCSS configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── vite.config.js         # Vite configuration
└── README.md              # Project README
```

### File Naming Conventions

- **Components**: PascalCase (e.g., `TodoItem.jsx`, `UserProfile.jsx`)
- **Pages**: PascalCase (e.g., `Todo.jsx`, `Login.jsx`)
- **Utilities**: camelCase (e.g., `apiHelpers.js`, `dateUtils.js`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_ENDPOINTS.js`)
- **Styles**: kebab-case (e.g., `component-styles.css`)

---

## Development Workflow

### 1. Setting Up Development Environment

```bash
# Install development dependencies
npm install

# Start development server with hot reload
npm run dev

# Run linter
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```

### 2. Feature Development Process

1. **Create Feature Branch**:
   ```bash
   git checkout -b feature/new-feature-name
   ```

2. **Develop Feature**:
   ```bash
   # Make your changes
   # Follow the component structure and naming conventions
   # Add appropriate TypeScript interfaces (in comments)
   ```

3. **Test Changes**:
   ```bash
   # Manual testing in browser
   # Run linter
   npm run lint

   # Fix any linting issues
   npm run lint -- --fix
   ```

4. **Commit Changes**:
   ```bash
   git add .
   git commit -m "feat: add new feature description"
   ```

5. **Push and Create PR**:
   ```bash
   git push origin feature/new-feature-name
   # Create pull request via GitHub
   ```

### 3. Code Review Checklist

- [ ] Component follows single responsibility principle
- [ ] Proper prop types defined (in comments if no TypeScript)
- [ ] Accessibility considerations addressed
- [ ] Responsive design implemented
- [ ] Error handling implemented
- [ ] Local storage operations are safe
- [ ] Firebase auth integration follows patterns
- [ ] Styling follows Tailwind conventions

---

## Environment Setup

### Development Environment Variables

Create a `.env.local` file for local development:

```bash
# Firebase Configuration (optional - currently hardcoded)
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Development Settings
VITE_DEV_MODE=true
VITE_LOG_LEVEL=debug
```

### Firebase Setup

1. **Create Firebase Project**:
   ```bash
   # Visit https://console.firebase.google.com
   # Click "Create a project"
   # Follow the setup wizard
   ```

2. **Enable Authentication**:
   ```bash
   # In Firebase Console:
   # Authentication > Sign-in method > Email/Password > Enable
   ```

3. **Get Configuration**:
   ```bash
   # Project settings > General > Your apps > Web app
   # Copy the configuration object
   # Update src/firebase.js with your config
   ```

4. **Security Rules** (if using Firestore):
   ```javascript
   // Firestore rules
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /users/{userId} {
         allow read, write: if request.auth != null && request.auth.uid == userId;
       }
     }
   }
   ```

### IDE Configuration

#### VS Code Settings (`.vscode/settings.json`)

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "emmet.includeLanguages": {
    "javascript": "javascriptreact"
  },
  "tailwindCSS.includeLanguages": {
    "javascript": "javascript",
    "html": "HTML"
  }
}
```

#### Recommended Extensions

- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- ESLint
- Prettier
- Auto Rename Tag
- Bracket Pair Colorizer

---

## Build and Deployment

### Development Build

```bash
# Start development server
npm run dev

# Server runs on http://localhost:5173
# Features hot module replacement
# Includes source maps for debugging
```

### Production Build

```bash
# Create optimized production build
npm run build

# Output directory: dist/
# Includes:
# - Minified JavaScript
# - Optimized CSS
# - Compressed assets
# - Source maps (if enabled)
```

### Preview Production Build

```bash
# Preview production build locally
npm run preview

# Serves the dist/ directory
# Runs on http://localhost:4173
```

### Deployment Options

#### 1. Firebase Hosting

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase hosting
firebase init hosting

# Build and deploy
npm run build
firebase deploy
```

#### 2. Netlify

```bash
# Build the project
npm run build

# Deploy to Netlify
# Drag and drop dist/ folder to Netlify dashboard
# Or connect GitHub repository for auto-deployment
```

#### 3. Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
npm run build
vercel --prod
```

### Environment-Specific Builds

```bash
# Development
NODE_ENV=development npm run build

# Staging
NODE_ENV=staging npm run build

# Production
NODE_ENV=production npm run build
```

---

## Code Standards

### JavaScript/React Standards

#### Component Structure

```javascript
// Imports (external libraries first, then internal)
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';

import { auth } from '../firebase';
import { useAuth } from '../context/AuthContext';
import { Button } from '../Components/ui/button';

// Component definition
function ComponentName({ prop1, prop2 }) {
  // State declarations
  const [state1, setState1] = useState(initialValue);
  const [state2, setState2] = useState(initialValue);

  // Hooks
  const navigate = useNavigate();
  const { user } = useAuth();

  // Effects
  useEffect(() => {
    // Effect logic
  }, [dependency]);

  // Event handlers
  const handleEvent = () => {
    // Handler logic
  };

  // Helper functions (if needed)
  const helperFunction = () => {
    // Helper logic
  };

  // Render
  return (
    <div>
      {/* JSX content */}
    </div>
  );
}

// Export
export default ComponentName;
```

#### Naming Conventions

```javascript
// Variables and functions: camelCase
const userProfile = {};
const handleSubmit = () => {};

// Components: PascalCase
const UserProfile = () => {};
const TodoItem = () => {};

// Constants: UPPER_SNAKE_CASE
const API_BASE_URL = 'https://api.example.com';
const MAX_RETRY_ATTEMPTS = 3;

// Boolean variables: is/has/can prefix
const isLoggedIn = true;
const hasPermission = false;
const canEdit = true;
```

#### Props and State

```javascript
// Destructure props immediately
function Component({ title, onSubmit, isLoading = false }) {
  // Use descriptive state names
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({});
  const [validationErrors, setValidationErrors] = useState([]);

  // Group related state
  const [user, setUser] = useState({
    id: null,
    email: '',
    name: '',
  });
}
```

### CSS/Styling Standards

#### Tailwind CSS Usage

```javascript
// Prefer utility classes over custom CSS
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
  <h2 className="text-xl font-semibold text-gray-800">Title</h2>
  <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
    Action
  </button>
</div>

// Group classes logically
const buttonClasses = [
  // Layout
  'flex items-center justify-center',
  // Spacing
  'px-4 py-2 m-2',
  // Appearance
  'bg-blue-600 text-white rounded-md',
  // States
  'hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500',
  // Responsive
  'md:px-6 md:py-3'
].join(' ');
```

#### Responsive Design

```javascript
// Mobile-first approach
<div className="
  p-4                    // Base (mobile)
  md:p-6                 // Medium screens and up
  lg:p-8                 // Large screens and up
  xl:p-10                // Extra large screens and up
">
  <h1 className="
    text-2xl             // Base (mobile)
    md:text-3xl          // Medium screens and up
    lg:text-4xl          // Large screens and up
  ">
    Responsive Title
  </h1>
</div>
```

### Error Handling Standards

```javascript
// Async function error handling
const handleAsyncOperation = async () => {
  try {
    setIsLoading(true);
    const result = await apiCall();
    setData(result);
  } catch (error) {
    console.error('Operation failed:', error);
    setError(error.message);
    // Optionally show user-friendly message
    toast.error('Something went wrong. Please try again.');
  } finally {
    setIsLoading(false);
  }
};

// Form validation
const validateForm = (formData) => {
  const errors = {};
  
  if (!formData.email) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(formData.email)) {
    errors.email = 'Please enter a valid email';
  }
  
  if (!formData.password) {
    errors.password = 'Password is required';
  } else if (formData.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }
  
  return errors;
};
```

---

## Testing Strategy

### Manual Testing Checklist

#### Authentication Flow
- [ ] User can sign in with valid credentials
- [ ] User sees error with invalid credentials
- [ ] User is redirected after successful login
- [ ] Protected routes are inaccessible when logged out
- [ ] User can log out successfully

#### TODO Functionality
- [ ] User can add new todos
- [ ] User can delete todos
- [ ] Todos persist in localStorage
- [ ] Todos load correctly on page refresh
- [ ] Empty todo input is handled gracefully

#### UI/UX Testing
- [ ] Application is responsive on different screen sizes
- [ ] All interactive elements have hover states
- [ ] Focus states are visible for accessibility
- [ ] Loading states are shown where appropriate
- [ ] Error messages are user-friendly

#### Browser Compatibility
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

### Automated Testing (Future Implementation)

```javascript
// Example test structure
describe('Todo Component', () => {
  beforeEach(() => {
    // Setup test environment
  });

  it('should add a new todo item', () => {
    // Test implementation
  });

  it('should delete a todo item', () => {
    // Test implementation
  });

  it('should persist todos in localStorage', () => {
    // Test implementation
  });
});
```

### Performance Testing

```javascript
// Lighthouse audit targets
const performanceTargets = {
  performance: 90,
  accessibility: 95,
  bestPractices: 90,
  seo: 80
};

// Core Web Vitals targets
const webVitalsTargets = {
  LCP: '< 2.5s',  // Largest Contentful Paint
  FID: '< 100ms', // First Input Delay
  CLS: '< 0.1'    // Cumulative Layout Shift
};
```

---

## Troubleshooting

### Common Issues and Solutions

#### 1. Firebase Authentication Errors

**Issue**: "Firebase: Error (auth/user-not-found)"
```javascript
// Solution: Handle auth errors gracefully
const handleLogin = async (e) => {
  e.preventDefault();
  try {
    await signInWithEmailAndPassword(auth, email, password);
    navigate("/");
  } catch (error) {
    let userMessage = "Login failed. Please try again.";
    
    switch (error.code) {
      case 'auth/user-not-found':
        userMessage = "No account found with this email.";
        break;
      case 'auth/wrong-password':
        userMessage = "Incorrect password.";
        break;
      case 'auth/invalid-email':
        userMessage = "Please enter a valid email address.";
        break;
    }
    
    alert(userMessage);
  }
};
```

#### 2. LocalStorage Issues

**Issue**: "Cannot read property of null"
```javascript
// Solution: Always provide fallback values
const loadTodos = () => {
  try {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  } catch (error) {
    console.error("Failed to load todos:", error);
    return [];
  }
};
```

#### 3. Build Errors

**Issue**: "Module not found" errors
```bash
# Solution: Check import paths and file structure
# Ensure proper case sensitivity
# Use relative paths correctly
import Component from './Component'; // Not './component'
```

#### 4. Styling Issues

**Issue**: Tailwind classes not applying
```bash
# Solution: Check Tailwind configuration
# Ensure content paths are correct in tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // ...
}

# Rebuild the project
npm run dev
```

#### 5. Development Server Issues

**Issue**: "EADDRINUSE: address already in use"
```bash
# Solution: Kill process on port 5173
npx kill-port 5173

# Or use different port
npm run dev -- --port 3000
```

### Debug Mode

```javascript
// Enable debug logging
const DEBUG = import.meta.env.DEV;

const debugLog = (message, data) => {
  if (DEBUG) {
    console.log(`[DEBUG] ${message}:`, data);
  }
};

// Usage
debugLog('User login attempt', { email, timestamp: Date.now() });
```

### Performance Debugging

```javascript
// Monitor component re-renders
const useRenderCount = (componentName) => {
  const renderCount = useRef(0);
  
  useEffect(() => {
    renderCount.current += 1;
    console.log(`${componentName} rendered ${renderCount.current} times`);
  });
};

// Usage in component
function ExpensiveComponent() {
  useRenderCount('ExpensiveComponent');
  // ... component logic
}
```

---

## Getting Help

### Resources

- **React Documentation**: https://reactjs.org/docs
- **Vite Documentation**: https://vitejs.dev/guide
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Firebase Documentation**: https://firebase.google.com/docs
- **React Router**: https://reactrouter.com/docs

### Community Support

- **GitHub Issues**: Report bugs and request features
- **Stack Overflow**: Ask technical questions with tags: `reactjs`, `firebase`, `vite`
- **Discord/Slack**: Join React and Firebase communities

### Development Tools

```bash
# Useful development commands
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Check code quality
npm run lint:fix     # Fix linting issues automatically
```

---

*This development guide provides comprehensive information for developers working on the TODO application. Keep this document updated as the project evolves and new patterns emerge.*