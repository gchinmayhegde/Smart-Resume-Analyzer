import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [csrfToken, setCsrfToken] = useState('');

  // Configure axios defaults
  axios.defaults.baseURL = 'http://localhost:8000';
  axios.defaults.withCredentials = true;

  // Add CSRF token to requests
  useEffect(() => {
    const fetchCSRFToken = async () => {
      try {
        const response = await axios.get('/api/csrf-token/');
        setCsrfToken(response.data.csrfToken);
        axios.defaults.headers.common['X-CSRFToken'] = response.data.csrfToken;
      } catch (error) {
        console.error('Error fetching CSRF token:', error);
      }
    };
    fetchCSRFToken();
  }, []);

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('/api/profile/');
        setUser(response.data.user);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (username, password) => {
    try {
      const response = await axios.post('/api/login/', {
        username,
        password
      });
      
      if (response.data.success) {
        setUser(response.data.user);
        return { success: true };
      }
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Login failed' 
      };
    }
  };

  const signup = async (username, email, password) => {
    try {
      const response = await axios.post('/api/signup/', {
        username,
        email,
        password
      });
      
      if (response.data.success) {
        setUser(response.data.user);
        return { success: true };
      }
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Signup failed' 
      };
    }
  };

  const logout = async () => {
    try {
      await axios.post('/api/logout/');
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      setUser(null);
    }
  };

  const updateProfile = async (email) => {
    try {
      const response = await axios.put('/api/profile/', { email });
      if (response.data.success) {
        setUser(response.data.user);
        return { success: true };
      }
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Update failed' 
      };
    }
  };

  const value = {
    user,
    login,
    signup,
    logout,
    updateProfile,
    loading,
    csrfToken
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};