import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FiEdit2, FiTrash2, FiStar } from 'react-icons/fi';
import { useNotification } from '../hooks/useNotification';

const ProductCard = ({ product, onDelete }) => {
  const navigate = useNavigate();
  const { showSuccess } = useNotification();

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      onDelete(product.id);
      showSuccess('Product deleted successfully!');
    }
  };

  return (
    <Card className="product-card h-100 d-flex flex-column">

      {/* ✅ Image */}
      <div style={{ height: '200px', overflow: 'hidden' }}>
        <Card.Img
          variant="top"
          src={product.thumbnail || product.image || 'https://via.placeholder.com/300'}
          style={{
            objectFit: 'cover',
            height: '100%',
            width: '100%'
          }}
        />
      </div>

      {/* ✅ FLEX BODY (IMPORTANT) */}
      <Card.Body className="d-flex flex-column">

        {/* ✅ Title + Price */}
        <div className="d-flex justify-content-between align-items-start mb-2">
          <Card.Title
            className="mb-0"
            style={{ fontSize: '1.1rem' }}
          >
            {product.title}
          </Card.Title>

          <Badge bg="secondary">${product.price}</Badge>
        </div>

        {/* ✅ Description (Flexible & Limited Lines) */}
        <Card.Text
          className="text-muted small"
          style={{
            flexGrow: 1,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {product.description}
        </Card.Text>
        <div className="mb-2">
          <Badge bg="info" className="me-1 text-dark">
            {product.category}
          </Badge>

          <div className="mt-2">
            <FiStar className="text-warning" /> {product.rating || 4.5} / 5
          </div>
        </div>
        <div className="mt-auto d-flex gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigate(`/edit-product/${product.id}`)}
            className="flex-grow-1"
          >
            <FiEdit2 /> Edit
          </Button>

          <Button
            variant="danger"
            size="sm"
            onClick={handleDelete}
            className="flex-grow-1"
          >
            <FiTrash2 /> Delete
          </Button>
        </div>

      </Card.Body>
    </Card>
  );
};

export default ProductCard;