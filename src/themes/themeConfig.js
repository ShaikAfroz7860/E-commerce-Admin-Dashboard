export const designTokens = {
  colors: {
    primary: {
      50: '#e7f1ff',
      100: '#cce4ff',
      200: '#99c9ff',
      300: '#66adff',
      400: '#3392ff',
      500: '#0d6efd',
      600: '#0a58ca',
      700: '#084298',
      800: '#052c65',
      900: '#031633'
    },
    secondary: {
      50: '#f8f9fa',
      100: '#e9ecef',
      200: '#dee2e6',
      300: '#ced4da',
      400: '#adb5bd',
      500: '#6c757d',
      600: '#5c636a',
      700: '#495057',
      800: '#343a40',
      900: '#212529'
    },
    success: {
      500: '#28a745',
      600: '#1e7e34'
    },
    danger: {
      500: '#dc3545',
      600: '#c82333'
    },
    warning: {
      500: '#ffc107',
      600: '#e0a800'
    },
    info: {
      500: '#17a2b8',
      600: '#138496'
    }
  },
  typography: {
    fontFamily: {
      primary: "'Inter', 'Segoe UI', 'Roboto', sans-serif",
      monospace: "'SF Mono', 'Courier New', monospace"
    },
    fontSize: {
      xs: '0.75rem',     // 12px
      sm: '0.875rem',    // 14px
      base: '1rem',      // 16px
      lg: '1.125rem',    // 18px
      xl: '1.25rem',     // 20px
      '2xl': '1.5rem',   // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem'   // 36px
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75
    }
  },
  spacing: {
    0: '0',
    1: '0.25rem',   // 4px
    2: '0.5rem',    // 8px
    3: '0.75rem',   // 12px
    4: '1rem',      // 16px
    5: '1.25rem',   // 20px
    6: '1.5rem',    // 24px
    8: '2rem',      // 32px
    10: '2.5rem',   // 40px
    12: '3rem',     // 48px
    16: '4rem',     // 64px
    20: '5rem',     // 80px
    24: '6rem'      // 96px
  },
  borderRadius: {
    none: '0',
    sm: '0.125rem',   // 2px
    base: '0.25rem',  // 4px
    md: '0.375rem',   // 6px
    lg: '0.5rem',     // 8px
    xl: '0.75rem',    // 12px
    '2xl': '1rem',    // 16px
    full: '9999px'
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)'
  },
  transitions: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
    timing: 'cubic-bezier(0.4, 0, 0.2, 1)'
  },
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070
  }
};

// Light Theme
export const lightTheme = {
  id: 'light',
  name: 'Light',
  type: 'light',
  
  colors: {
    primary: designTokens.colors.primary[500],
    primaryLight: designTokens.colors.primary[100],
    primaryDark: designTokens.colors.primary[600],
    
    secondary: designTokens.colors.secondary[500],
    secondaryLight: designTokens.colors.secondary[100],
    secondaryDark: designTokens.colors.secondary[600],
    
    success: designTokens.colors.success[500],
    successLight: '#d4edda',
    danger: designTokens.colors.danger[500],
    dangerLight: '#f8d7da',
    warning: designTokens.colors.warning[500],
    warningLight: '#fff3cd',
    info: designTokens.colors.info[500],
    infoLight: '#d1ecf1',
    
    background: '#f8f9fa',
    surface: '#ffffff',
    text: '#212529',
    textMuted: '#6c757d',
    border: '#dee2e6',
    divider: '#e9ecef',
    
    sidebarBg: '#ffffff',
    sidebarText: '#212529',
    sidebarHover: '#f8f9fa',
    sidebarActive: designTokens.colors.primary[100],
    
    headerBg: '#ffffff',
    headerText: '#212529',
    
    cardBg: '#ffffff',
    cardBorder: '#dee2e6',
    
    tableHeaderBg: '#f8f9fa',
    tableRowHover: '#f8f9fa'
  },
  
  typography: designTokens.typography,
  spacing: designTokens.spacing,
  borderRadius: designTokens.borderRadius,
  shadows: designTokens.shadows,
  transitions: designTokens.transitions
};

// Dark Theme
export const darkTheme = {
  id: 'dark',
  name: 'Dark',
  type: 'dark',
  
  colors: {
    primary: '#4d9eff',
    primaryLight: '#1e3a5f',
    primaryDark: '#3a7bc8',
    
    secondary: '#9aa6b5',
    secondaryLight: '#2d3748',
    secondaryDark: '#7a8799',
    
    success: '#48bb78',
    successLight: '#1a3a2a',
    danger: '#fc8181',
    dangerLight: '#4a1a1a',
    warning: '#f6ad55',
    warningLight: '#4a2a10',
    info: '#63b3ed',
    infoLight: '#1a365d',
    
    background: '#1a1a1a',
    surface: '#2d2d2d',
    text: '#ffffff',
    textMuted: '#a0aec0',
    border: '#404040',
    divider: '#333333',
    
    sidebarBg: '#2d2d2d',
    sidebarText: '#ffffff',
    sidebarHover: '#3d3d3d',
    sidebarActive: '#1e3a5f',
    
    headerBg: '#2d2d2d',
    headerText: '#ffffff',
    
    cardBg: '#2d2d2d',
    cardBorder: '#404040',
    
    tableHeaderBg: '#2d2d2d',
    tableRowHover: '#3d3d3d'
  },
  
  typography: designTokens.typography,
  spacing: designTokens.spacing,
  borderRadius: designTokens.borderRadius,
  shadows: {
    ...designTokens.shadows,
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.3)',
    base: '0 1px 3px 0 rgb(0 0 0 / 0.3)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.3)'
  },
  transitions: designTokens.transitions
};

// E-commerce Theme
export const ecommerceTheme = {
  id: 'ecommerce',
  name: 'E-commerce',
  type: 'light',
  
  colors: {
    primary: '#ff6b35',
    primaryLight: '#fff0eb',
    primaryDark: '#e55a2b',
    
    secondary: '#2d3436',
    secondaryLight: '#ecf0f1',
    secondaryDark: '#1e272e',
    
    success: '#20bf6b',
    successLight: '#e0f9e8',
    danger: '#eb3b5a',
    dangerLight: '#ffe5e8',
    warning: '#f9ca24',
    warningLight: '#fff5e0',
    info: '#45aaf2',
    infoLight: '#e3f2fd',
    
    background: '#f5f6fa',
    surface: '#ffffff',
    text: '#2d3436',
    textMuted: '#636e72',
    border: '#dfe6e9',
    divider: '#f0f1f3',
    
    sidebarBg: '#ffffff',
    sidebarText: '#2d3436',
    sidebarHover: '#ff6b3520',
    sidebarActive: '#ff6b35',
    
    headerBg: '#ffffff',
    headerText: '#2d3436',
    
    cardBg: '#ffffff',
    cardBorder: '#e0e0e0',
    
    tableHeaderBg: '#f8f9fa',
    tableRowHover: '#f8f9fa'
  },
  
  typography: designTokens.typography,
  spacing: designTokens.spacing,
  borderRadius: designTokens.borderRadius,
  shadows: designTokens.shadows,
  transitions: designTokens.transitions
};

// Corporate Theme
export const corporateTheme = {
  id: 'corporate',
  name: 'Corporate',
  type: 'light',
  
  colors: {
    primary: '#1a56db',
    primaryLight: '#dbeafe',
    primaryDark: '#1e40af',
    
    secondary: '#4b5563',
    secondaryLight: '#e5e7eb',
    secondaryDark: '#374151',
    
    success: '#059669',
    successLight: '#d1fae5',
    danger: '#dc2626',
    dangerLight: '#fee2e2',
    warning: '#d97706',
    warningLight: '#fed7aa',
    info: '#3b82f6',
    infoLight: '#dbeafe',
    
    background: '#f3f4f6',
    surface: '#ffffff',
    text: '#111827',
    textMuted: '#6b7280',
    border: '#e5e7eb',
    divider: '#f3f4f6',
    
    sidebarBg: '#1e3a8a',
    sidebarText: '#ffffff',
    sidebarHover: '#1e40af',
    sidebarActive: '#3b82f6',
    
    headerBg: '#ffffff',
    headerText: '#111827',
    
    cardBg: '#ffffff',
    cardBorder: '#e5e7eb',
    
    tableHeaderBg: '#f9fafb',
    tableRowHover: '#f9fafb'
  },
  
  typography: designTokens.typography,
  spacing: designTokens.spacing,
  borderRadius: designTokens.borderRadius,
  shadows: designTokens.shadows,
  transitions: designTokens.transitions
};

export const availableThemes = {
  light: lightTheme,
  dark: darkTheme,
  ecommerce: ecommerceTheme,
  corporate: corporateTheme
};