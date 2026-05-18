import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { 
  FiHome, 
  FiPackage, 
  FiShoppingCart, 
  FiUsers, 
  FiBarChart2, 
  FiSettings,
  FiPlusCircle
} from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

const Sidebar = () => {
  const location = useLocation();
  const { darkMode } = useTheme();

  const menuItems = [
    { path: '/dashboard', icon: <FiHome />, label: 'Dashboard' },
    { path: '/products', icon: <FiPackage />, label: 'Products' },
    { path: '/add-product', icon: <FiPlusCircle />, label: 'Add Product' },
    { path: '/orders', icon: <FiShoppingCart />, label: 'Orders' },
    { path: '/customers', icon: <FiUsers />, label: 'Customers' },
    { path: '/analytics', icon: <FiBarChart2 />, label: 'Analytics' },
    { path: '/settings', icon: <FiSettings />, label: 'Settings' },
  ];

  return (
    <div className="sidebar" style={{
      width: '260px',
      background: darkMode ? '#2d2d2d' : '#ffffff',
      borderRight: `1px solid ${darkMode ? '#404040' : '#dee2e6'}`,
      minHeight: '100vh',
      position: 'fixed',
      left: 0,
      top: 0,
      paddingTop: '20px',
      zIndex: 100
    }}>
      <div className="text-center mb-4 pb-3 border-bottom" style={{
        borderBottomColor: darkMode ? '#404040' : '#dee2e6'
      }}>
        <h3 style={{ color: darkMode ? '#fff' : '#333' }}>
        AdminHub
        </h3>
        <p className="small text-muted mb-0">E-Commerce Dashboard</p>
      </div>
      
      <Nav className="flex-column">
        {menuItems.map(item => (
          <Nav.Link
            key={item.path}
            as={Link}
            to={item.path}
            style={{
              color: location.pathname === item.path 
                ? '#0d6efd' 
                : (darkMode ? '#fff' : '#333'),
              backgroundColor: location.pathname === item.path 
                ? (darkMode ? '#404040' : '#e7f1ff')
                : 'transparent',
              margin: '5px 15px',
              borderRadius: '8px',
              padding: '12px 15px',
              transition: 'all 0.2s'
            }}
          >
            <span style={{ marginRight: '12px', fontSize: '18px' }}>{item.icon}</span>
            {item.label}
          </Nav.Link>
        ))}
      </Nav>
    </div>
  );
};

export default Sidebar;