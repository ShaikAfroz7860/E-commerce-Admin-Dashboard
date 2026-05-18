import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Button, Row, Col } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { useNotification } from '../hooks/useNotification';

const EditProduct = () => {
  const { id } = useParams();
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

  useEffect(() => {
    const products = JSON.parse(localStorage.getItem('adminProducts') || '[]');
    const product = products.find(p => p.id == id);
    if (product) {
      setFormData({
        title: product.title,
        description: product.description || '',
        price: product.price,
        category: product.category,
        stock: product.stock || '',
        image: product.thumbnail || product.image || ''
      });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const products = JSON.parse(localStorage.getItem('adminProducts') || '[]');
    const updatedProducts = products.map(product => 
      product.id == id 
        ? { ...product, ...formData, price: parseFloat(formData.price), thumbnail: formData.image }
        : product
    );
    
    localStorage.setItem('adminProducts', JSON.stringify(updatedProducts));
    showSuccess('Product updated successfully!');
    setTimeout(() => navigate('/products'), 1500);
  };

  const categories = ['Electronics', 'Clothing', 'Books', 'Home', 'Sports', 'Toys'];

  return (
    <Container>
      <h2 className="mb-4">Edit Product</h2>
      
      <Card className="shadow-sm">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Product Title</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </Form.Group>
              </Col>
              
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Stock Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </Form.Group>

            {formData.image && (
              <div className="mb-3">
                <img 
                  src={formData.image} 
                  alt="Preview" 
                  style={{ maxWidth: '200px', maxHeight: '200px', objectFit: 'cover' }}
                  className="border rounded p-1"
                />
              </div>
            )}

            <div className="d-flex gap-2">
              <Button variant="primary" type="submit">
                Update Product
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

export default EditProduct;