// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function useAuth(){
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Set from localStorage on initial load
  useEffect(() => {
    const stored = localStorage.getItem("isLoggedIn");
    console.log("context useEffect");
    setIsLoggedIn(stored === "true");
  }, []);

  // Add this: Listen for storage changes
  const login = () => {
    console.log("Login function called"); // Keep this for debugging
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
    console.log(`isloggedin is ${isLoggedIn}`);
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
    localStorage.clear();
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn,login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};