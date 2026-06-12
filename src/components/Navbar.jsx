import React from 'react';
import { Navbar, Nav, Container, Button, Dropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiLogOut, FiBell } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import ThemeSwitcher from './ThemeSwitcher';

const TopNavbar = () => {
  const { darkMode, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  return (
    <Navbar 
      bg={darkMode ? 'dark' : 'light'} 
      variant={darkMode ? 'dark' : 'light'}
      className="px-3"
      style={{ marginLeft: '260px', borderBottom: '1px solid var(--theme-border)' }}
    >
      <Container fluid>
        <Navbar.Brand className="d-lg-none">E-Commerce Admin</Navbar.Brand>
        <div className="ms-auto d-flex align-items-center gap-3">
          <ThemeSwitcher />
          <Dropdown align="end">
            <Dropdown.Toggle variant="outline-secondary" size="sm">
              <FiBell />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>🔔 New order received</Dropdown.Item>
              <Dropdown.Item>📊 Monthly report ready</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown align="end">
            <Dropdown.Toggle variant="outline-primary" size="sm">
              <FiUser className="me-1" /> {user?.name || 'Admin'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={logout}>
                <FiLogOut className="me-2" /> Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Container>
    </Navbar>
  );
};

export default TopNavbar;