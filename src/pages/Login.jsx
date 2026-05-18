import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert
} from 'react-bootstrap';

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

import {
  FiLock,
  FiMail,
  FiEye,
  FiEyeOff
} from 'react-icons/fi';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');

    const success = await login(email, password);

    if (success) {
      navigate('/dashboard');
    } else {
      setError('Wrong credentials');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background:
          'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}
    >
      <Container>
        <Row className="justify-content-center">

          <Col md={6} lg={5}>

            <Card className="shadow-lg border-0">
              <Card.Body className="p-5">

                {/* Header */}
                <div className="text-center mb-4">
                  <h2 className="mt-2">Admin Dashboard</h2>
                  <p className="text-muted">
                    E-Commerce Management System
                  </p>
                </div>

                {/* Error Message */}
                {error && (
                  <Alert variant="danger">
                    {error}
                  </Alert>
                )}

                {/* Login Form */}
                <Form onSubmit={handleSubmit}>

                  {/* Email Field */}
                  <Form.Group className="mb-3">
                    <Form.Label>Email Address</Form.Label>

                    <div className="position-relative">

                      <FiMail
                        className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
                        style={{ zIndex: 10 }}
                      />

                      <Form.Control
                        type="email"
                        placeholder="Enter email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="ps-5"
                        required
                      />
                    </div>
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Label>Password</Form.Label>

                    <div className="position-relative">
                      <FiLock
                        className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
                        style={{ zIndex: 10 }}
                      />
                      <Form.Control
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="ps-5 pe-5"
                        required
                      />
                      <span
                        className="position-absolute top-50 end-0 translate-middle-y me-3"
                        style={{ cursor: 'pointer', zIndex: 10 }}
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <FiEyeOff className="text-muted" />
                        ) : (
                          <FiEye className="text-muted" />
                        )}
                      </span>
                    </div>
                  </Form.Group>
                  <Button
                    variant="success"
                    type="submit"
                    className="w-100 py-2"
                  >
                    Login to Dashboard
                  </Button>

                </Form>

              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <style>
        {`
          input[type="password"]::-ms-reveal,
          input[type="password"]::-ms-clear,
          input[type="password"]::-webkit-textfield-decoration-container {
            display: none;
          }
        `}
      </style>
    </div>
  );
};

export default Login;
