import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
//import App from './App.jsx';
import { HashRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/login.jsx';
import Signup from './pages/signup.jsx';
import Todo from './pages/Todo.jsx';
import ProtectedRoute from './Components/ProtectedRoute.jsx';
import { AuthProvider } from './context/AuthContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Todo />
              </ProtectedRoute>
            }
          />
        </Routes>
      </HashRouter>
    </AuthProvider>
  </React.StrictMode>
);
