import React, { useState } from 'react';
import { Container, Card, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../hooks/useNotification';

const AddProduct = () => {
  const navigate = useNavigate();
  const { showSuccess, showError } = useNotification();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    image: ''
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.price) newErrors.price = 'Price is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.image) newErrors.image = 'Image URL is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      const newProduct = {
        id: Date.now(),
        ...formData,
        price: parseFloat(formData.price),
        rating: 0,
        thumbnail: formData.image
      };
      
      // Save to localStorage
      const existingProducts = JSON.parse(localStorage.getItem('adminProducts') || '[]');
      const updatedProducts = [newProduct, ...existingProducts];
      localStorage.setItem('adminProducts', JSON.stringify(updatedProducts));
      
      showSuccess('Product added successfully!');
      setTimeout(() => navigate('/products'), 1500);
    } else {
      setErrors(newErrors);
      showError('Please fix the errors');
    }
  };

  const categories = ['Electronics', 'Clothing', 'Books', 'Home', 'Sports', 'Toys'];

  return (
    <Container>
      <h2 className="mb-4">Add New Product</h2>
      
      <Card className="shadow-sm">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Product Title *</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter product title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    isInvalid={!!errors.title}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.title}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Price *</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    placeholder="Enter price"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    isInvalid={!!errors.price}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.price}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Category *</Form.Label>
                  <Form.Select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    isInvalid={!!errors.category}
                  >
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.category}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Stock Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter stock"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Image URL *</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image URL"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                isInvalid={!!errors.image}
              />
              <Form.Control.Feedback type="invalid">
                {errors.image}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Enter product description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </Form.Group>

            {formData.image && (
              <div className="mb-3">
                <Form.Label>Preview:</Form.Label>
                <img 
                  src={formData.image} 
                  alt="Preview" 
                  style={{ maxWidth: '200px', maxHeight: '200px', objectFit: 'cover' }}
                  className="border rounded p-1"
                  onError={(e) => e.target.src = 'https://via.placeholder.com/200'}
                />
              </div>
            )}

            <div className="d-flex gap-2">
              <Button variant="success" type="submit">
                Add Product
              </Button>
              <Button variant="secondary" onClick={() => navigate('/products')}>
                Cancel
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AddProduct;