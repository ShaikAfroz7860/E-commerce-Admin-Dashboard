import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiPackage, FiShoppingCart, FiUsers, FiBarChart2, FiSettings, FiPlusCircle } from 'react-icons/fi';

const Sidebar = () => {
  const location = useLocation();
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
    <div style={{
      width: '260px',
      backgroundColor: 'var(--sidebar-bg)',
      borderRight: '1px solid var(--border-color)',
      position: 'fixed',
      left: 0,
      top: 0,
      height: '100vh',
      padding: '20px',
      overflowY: 'auto'
    }}>
      <div className="text-center mb-4 pb-3" style={{ borderBottom: '1px solid var(--border-color)' }}>
        <h3 style={{ color: 'var(--sidebar-text)' }}>🛍️ AdminHub</h3>
        <small style={{ color: 'var(--text-secondary)' }}>E-Commerce Dashboard</small>
      </div>
      <Nav className="flex-column">
        {menuItems.map(item => (
          <Nav.Link
            key={item.path}
            as={Link}
            to={item.path}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '10px 15px',
              margin: '4px 0',
              borderRadius: '8px',
              color: location.pathname === item.path ? 'var(--sidebar-active)' : 'var(--sidebar-text)',
              backgroundColor: location.pathname === item.path ? 'var(--sidebar-hover)' : 'transparent'
            }}
          >
            {item.icon}
            {item.label}
          </Nav.Link>
        ))}
      </Nav>
    </div>
  );
};
export default Sidebar;