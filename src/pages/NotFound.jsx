import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Container className="text-center mt-5">
      <Row>
        <Col>
          <h1 className="display-1">404</h1>
          <h2 className="mb-4">Page Not Found</h2>
          <p className="mb-4">The page you're looking for doesn't exist.</p>
          <Button as={Link} to="/dashboard" variant="primary">
            Go to Dashboard
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;