import React, { createContext, useState, useEffect, useContext } from 'react';

// Create the context to hold the authentication state
const AuthContext = createContext(null);

// Create a custom hook to make it easier to use the auth context in other components
export const useAuth = () => {
    return useContext(AuthContext);
}

// Create the provider component that will wrap your application
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // This effect runs once when the app loads to check if a user is logged in
  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }
  }, []);

  // Function to handle user login
  const login = (userData) => {
    localStorage.setItem('userInfo', JSON.stringify(userData));
    setUser(userData);
  };

  // Function to handle user logout
  const logout = () => {
    localStorage.removeItem('userInfo');
    setUser(null);
  };

  // The value provided to all components wrapped by this provider
  const value = {
      user,
      login,
      logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

