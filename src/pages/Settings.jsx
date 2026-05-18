import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useTheme } from '../context/ThemeContext';
import { useNotification } from '../hooks/useNotification';
import { useAuth } from '../context/AuthContext';

const Settings = () => {
  const { darkMode, toggleTheme } = useTheme();
  const { showSuccess } = useNotification();
  const { user } = useAuth();
  const [settings, setSettings] = useState({
    emailNotifications: true,
    orderAlerts: true,
    lowStockAlerts: true,
    currency: 'USD',
    dateFormat: 'MM/DD/YYYY'
  });

  useEffect(() => {
    const savedSettings = localStorage.getItem('adminSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('adminSettings', JSON.stringify(settings));
    showSuccess('Settings saved successfully!');
  };

  return (
    <Container>
      <h2 className="mb-4">Settings</h2>
      
      <Row>
        <Col lg={8}>
          <Card className="shadow-sm mb-4">
            <Card.Header>
              <h5 className="mb-0">Appearance</h5>
            </Card.Header>
            <Card.Body>
              <Form.Group className="mb-3">
                <Form.Label>Theme Preference</Form.Label>
                <div>
                  <Button
                    variant={!darkMode ? 'outline-secondary' : 'outline-secondary'}
                    onClick={() => darkMode && toggleTheme()}
                    className="me-2"
                  >
                    Light Mode
                  </Button>
                  <Button
                    variant={darkMode ? 'outline-secondary' : 'outline-secondary'}
                    onClick={() => !darkMode && toggleTheme()}
                  >
                    Dark Mode
                  </Button>
                </div>
              </Form.Group>
            </Card.Body>
          </Card>
          
          <Card className="shadow-sm mb-4">
            <Card.Header>
              <h5 className="mb-0">Notifications</h5>
            </Card.Header>
            <Card.Body>
              <Form.Group className="mb-3">
                <Form.Check
                  type="switch"
                  label="Email Notifications"
                  checked={settings.emailNotifications}
                  onChange={(e) => setSettings({ ...settings, emailNotifications: e.target.checked})}
                />
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Check
                  type="switch"
                  label="Order Alerts"
                  checked={settings.orderAlerts}
                  onChange={(e) => setSettings({ ...settings, orderAlerts: e.target.checked })}
                />
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Check
                  type="switch"
                  label="Low Stock Alerts"
                  checked={settings.lowStockAlerts}
                  onChange={(e) => setSettings({ ...settings, lowStockAlerts: e.target.checked })}
                />
              </Form.Group>
            </Card.Body>
          </Card>
          
          <Card className="shadow-sm mb-4">
            <Card.Header>
              <h5 className="mb-0">Store Preferences</h5>
            </Card.Header>
            <Card.Body>
              <Form.Group className="mb-3">
                <Form.Label>Currency</Form.Label>
                <Form.Select
                  value={settings.currency}
                  onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                </Form.Select>
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>Date Format</Form.Label>
                <Form.Select
                  value={settings.dateFormat}
                  onChange={(e) => setSettings({ ...settings, dateFormat: e.target.value })}
                >
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </Form.Select>
              </Form.Group>
            </Card.Body>
          </Card>
          
          <div className="mb-4">
            <Button variant="success" onClick={handleSave}>
              Save All Settings
            </Button>
          </div>
        </Col>
        
        <Col lg={4}>
          <Card className="shadow-sm">
            <Card.Header>
              <h5 className="mb-0">Admin Account</h5>
            </Card.Header>
            <Card.Body className="text-center">
              <div className="rounded-circle bg-success text-white d-inline-flex align-items-center justify-content-center mb-3" 
                   style={{ width: '80px', height: '80px', fontSize: '32px' }}>
                A
              </div>
              <h5>{user?.name}</h5>
              <p className="text-muted">{user?.email}</p>
              <Alert variant="info" className="mt-3">
                <small>Role: Super Admin</small><br />
                <small>Account created: {new Date().toLocaleDateString()}</small>
              </Alert>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Settings;