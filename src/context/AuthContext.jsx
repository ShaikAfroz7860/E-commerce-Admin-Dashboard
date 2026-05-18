import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

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

  // Custom Admin Credentials
  const ADMIN_EMAIL = 'shaikafroz@gmail.com';
  const ADMIN_PASSWORD = 'Shaik123';

  // Check user on page refresh
  useEffect(() => {
    const storedUser = localStorage.getItem('adminUser');
    const token = localStorage.getItem('adminToken');

    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  // Login Function
  const login = async (email, password) => {

    // Correct Credentials
    if (
      email === ADMIN_EMAIL &&
      password === ADMIN_PASSWORD
    ) {

      const adminUser = {
        id: 1,
        email: ADMIN_EMAIL,
        name: 'Shaik Afroz',
        role: 'admin'
      };

      const token = 'admin-jwt-token-' + Date.now();

      // Save user in localStorage
      localStorage.setItem(
        'adminUser',
        JSON.stringify(adminUser)
      );

      localStorage.setItem(
        'adminToken',
        token
      );

      // Update state
      setUser(adminUser);

      toast.success('Login successful!');

      return true;
    }

    // Wrong Credentials
    toast.error('Wrong credentials');

    return false;
  };

  // Logout Function
  const logout = () => {
    localStorage.removeItem('adminUser');
    localStorage.removeItem('adminToken');

    setUser(null);

    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};