import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/login.jsx';
import Todo from './pages/Todo.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx'; // 🔒 Protects Todo
import { AuthProvider } from './context/AuthContext.jsx';     // 👥 Auth context

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