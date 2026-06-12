// src/components/ThemedButton.jsx
import React from 'react';
import { Button } from 'react-bootstrap';

const ThemedButton = ({ variant = 'primary', children, ...props }) => {
  const variants = {
    primary: {
      backgroundColor: 'var(--theme-primary)',
      borderColor: 'var(--theme-primary)',
      color: 'white'
    },
    secondary: {
      backgroundColor: 'var(--theme-secondary)',
      borderColor: 'var(--theme-secondary)',
      color: 'white'
    },
    outline: {
      backgroundColor: 'transparent',
      borderColor: 'var(--theme-primary)',
      color: 'var(--theme-primary)'
    }
  };

  const style = variants[variant] || variants.primary;

  return (
    <Button 
      {...props}
      style={{
        ...style,
        borderRadius: 'var(--theme-radius-md, 6px)',
        padding: 'var(--theme-spacing-2, 8px) var(--theme-spacing-4, 16px)',
        fontWeight: 'var(--token-typography-fontWeight-medium, 500)',
        transition: 'all var(--token-transitions-fast, 150ms) ease'
      }}
      onMouseEnter={(e) => {
        if (variant === 'primary') {
          e.target.style.backgroundColor = 'var(--theme-primary-dark)';
        }
      }}
      onMouseLeave={(e) => {
        if (variant === 'primary') {
          e.target.style.backgroundColor = 'var(--theme-primary)';
        }
      }}
    >
      {children}
    </Button>
  );
};

export default ThemedButton;