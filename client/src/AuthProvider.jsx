// AuthProvider.jsx
import React, { createContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { authService } from "./services/authServices";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  // Verify auth on mount and location changes
  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const response = await authService.verifyAuth();
        setUser(response);
      } catch (error) {
        // Clear user and redirect to login if on a protected route
        setUser(null);
        if (location.pathname.startsWith('/admin/dashboard')) {
          navigate('/admin', { replace: true }); // Using replace to prevent back navigation
        }
      } finally {
        setLoading(false);
      }
    };

    verifyAuth();
  }, [location.pathname, navigate]);

  // Handle logout
  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      navigate('/admin', { replace: true }); // Replace current history entry
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};