import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    const savedTheme = localStorage.getItem('ecommerce_admin_theme');
    return savedTheme || 'light';
  });
  useEffect(() => {
    document.body.classList.remove('dark-mode', 'ecommerce-mode', 'corporate-mode');
    if (currentTheme !== 'light') {
      document.body.classList.add(`${currentTheme}-mode`);
    }
    localStorage.setItem('ecommerce_admin_theme', currentTheme);
    
    console.log('Theme changed to:', currentTheme);
    
  }, [currentTheme]);

  const switchTheme = useCallback((themeId) => {
    setCurrentTheme(themeId);
  }, []);

  const themes = [
    { id: 'light', name: 'Light', icon: '☀️' },
    { id: 'dark', name: 'Dark', icon: '🌙' },
    { id: 'ecommerce', name: 'E-commerce', icon: '🛍️' },
    { id: 'corporate', name: 'Corporate', icon: '🏢' },
  ];

  return (
    <ThemeContext.Provider value={{
      theme: { id: currentTheme, name: themes.find(t => t.id === currentTheme)?.name || 'Light' },
      themes,
      switchTheme,
    }}>
      {children}
    </ThemeContext.Provider>
  );
};