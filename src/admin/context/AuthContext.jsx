import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as loginRequest, fetchMe, logout as logoutRequest } from '../services/authService.js';
import api, { setAuthToken } from '../services/api.js';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('admin_token'));
  const [loading, setLoading] = useState(true);

  const handleLogin = async (credentials) => {
    try {
      const response = await loginRequest(credentials);
      const jwtToken = response.token || response.data?.token;
      const currentUser = response.user || response.data || response;

      if (!jwtToken) {
        throw new Error('Token missing from server response');
      }

      localStorage.setItem('admin_token', jwtToken);
      setAuthToken(jwtToken);
      setToken(jwtToken);
      setUser(currentUser);
      toast.success('Welcome back!');
      navigate('/admin', { replace: true });
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || 'Login failed');
      throw error;
    }
  };

  const handleLogout = async () => {
    try {
      await logoutRequest();
    } catch (error) {
      // ignore server logout errors
    }
    localStorage.removeItem('admin_token');
    setToken(null);
    setUser(null);
    setAuthToken(null);
    navigate('/admin/login', { replace: true });
  };

  const loadCurrentUser = async () => {
    if (!token) {
      setLoading(false);
      return;
    }
    setAuthToken(token);
    try {
      const response = await fetchMe();
      setUser(response.data || response.user);
    } catch (error) {
      setUser(null);
      localStorage.removeItem('admin_token');
      setAuthToken(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCurrentUser();
  }, [token]);

  useEffect(() => {
    const handleUnauthorized = () => {
      toast.error('Session expired. Please log in again.');
      handleLogout();
    };
    window.addEventListener('unauthorized', handleUnauthorized);
    return () => window.removeEventListener('unauthorized', handleUnauthorized);
  }, []);

  const value = useMemo(
    () => ({ user, loading, token, login: handleLogin, logout: handleLogout }),
    [user, loading, token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export default AuthContext;
