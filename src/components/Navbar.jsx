import React, { useState } from 'react';
import { Navbar, Nav, Container, Button, Dropdown, Badge } from 'react-bootstrap';
import { FiSun, FiMoon, FiUser, FiLogOut, FiBell } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const TopNavbar = () => {
  const { darkMode, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  // Notifications state
  const [notifications, setNotifications] = useState([
    'New order received! 🎉',
    'Product out of stock ⚠️',
    'Monthly report ready 📊'
  ]);

  // Clear notifications
  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <Navbar
      bg={darkMode ? 'dark' : 'light'}
      variant={darkMode ? 'dark' : 'light'}
      style={{
        marginLeft: '260px',
        borderBottom: `1px solid ${darkMode ? '#404040' : '#dee2e6'}`,
        padding: '10px 20px'
      }}
    >
      <Container fluid>
        <Navbar.Brand className="d-lg-none">
          AdminHub
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">

            {/* Theme Toggle */}
            <Button
              variant="outline-secondary"
              onClick={toggleTheme}
              className="me-3"
              size="sm"
            >
              {darkMode ? <FiSun /> : <FiMoon />}
            </Button>

            {/* Notifications */}
            <Dropdown align="end" className="me-3">
              <Dropdown.Toggle
                variant="outline-secondary"
                size="sm"
                style={{ position: 'relative' }}
              >
                <FiBell />

                {notifications.length > 0 && (
                  <Badge
                    bg="danger"
                    pill
                    className="position-absolute top-0 start-100 translate-middle"
                  >
                    {notifications.length}
                  </Badge>
                )}
              </Dropdown.Toggle>

              <Dropdown.Menu style={{ minWidth: '280px' }}>
                {notifications.length > 0 ? (
                  <>
                    {notifications.map((notification, index) => (
                      <Dropdown.Item key={index}>
                        {notification}
                      </Dropdown.Item>
                    ))}

                    <Dropdown.Divider />

                    <div className="px-3 pb-2">
                      <Button
                        variant="danger"
                        size="sm"
                        className="w-100"
                        onClick={clearNotifications}
                      >
                        Clear Notifications
                      </Button>
                    </div>
                  </>
                ) : (
                  <Dropdown.ItemText className="text-center text-muted">
                    No notifications
                  </Dropdown.ItemText>
                )}
              </Dropdown.Menu>
            </Dropdown>

            {/* User Dropdown */}
            <Dropdown align="end">
              <Dropdown.Toggle variant="outline-success" size="sm">
                <FiUser className="me-1" />
                {user?.name || 'Admin'}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={logout}>
                  <FiLogOut className="me-2" />
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default TopNavbar;