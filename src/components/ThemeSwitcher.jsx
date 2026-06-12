import React, { useState } from 'react';
import { Button, Modal, Card, Row, Col } from 'react-bootstrap';
import { FiCheck, FiSettings } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

const ThemeSwitcher = () => {
  const { theme, themes, switchTheme } = useTheme();
  const [showModal, setShowModal] = useState(false);

  const getThemeColor = (themeId) => {
    switch(themeId) {
      case 'light': return '#f8f9fa';
      case 'dark': return '#1a1a1a';
      case 'ecommerce': return '#ff6b35';
      case 'corporate': return '#1a56db';
      default: return '#0d6efd';
    }
  };

  const ThemePreview = ({ themeOption }) => (
    <Card 
      className={`mb-3 cursor-pointer ${theme.id === themeOption.id ? 'border-primary border-2 shadow' : 'border'}`}
      style={{ cursor: 'pointer' }}
      onClick={() => {
        switchTheme(themeOption.id);
        setShowModal(false);
      }}
    >
      <Card.Body className="p-3">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <div className="d-flex align-items-center gap-2 mb-2">
              <span style={{ fontSize: '20px' }}>{themeOption.icon}</span>
              <strong>{themeOption.name}</strong>
            </div>
            <div className="d-flex gap-1">
              <div className="rounded-circle" style={{ width: '30px', height: '30px', backgroundColor: getThemeColor(themeOption.id), border: '1px solid #ddd' }}></div>
              <div className="rounded-circle" style={{ width: '30px', height: '30px', backgroundColor: '#6c757d', border: '1px solid #ddd' }}></div>
              <div className="rounded-circle" style={{ width: '30px', height: '30px', backgroundColor: '#dee2e6', border: '1px solid #ddd' }}></div>
            </div>
          </div>
          {theme.id === themeOption.id && <FiCheck className="text-primary" size={20} />}
        </div>
      </Card.Body>
    </Card>
  );

  return (
    <>
      <Button 
        variant="outline-secondary" 
        onClick={() => setShowModal(true)}
        className="d-flex align-items-center gap-2"
      >
        <FiSettings /> {theme.name}
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="md" centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <FiSettings className="me-2" /> Theme Customization
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-muted mb-3">Choose a theme for your dashboard</p>
          <Row>
            {themes.map(themeOption => (
              <Col key={themeOption.id} sm={12}>
                <ThemePreview themeOption={themeOption} />
              </Col>
            ))}
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ThemeSwitcher;