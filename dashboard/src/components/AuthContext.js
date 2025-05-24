// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Set from localStorage on initial load
  useEffect(() => {
    const stored = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(stored === "true");
  }, []);

  // Add this: Listen for storage changes
  useEffect(() => {
    const handleStorageChange = () => {
      const stored = localStorage.getItem("isLoggedIn");
      setIsLoggedIn(stored === "true");
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const login = () => {
    console.log("Login function called"); // Keep this for debugging
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);