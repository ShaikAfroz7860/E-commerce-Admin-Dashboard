import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FiEdit2, FiTrash2, FiStar } from 'react-icons/fi';

const ProductCard = ({ product, onDelete }) => {
  const navigate = useNavigate();

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      onDelete(product.id);
    }
  };

  return (
    <Card 
      className="h-100 shadow-sm product-card"
      style={{
        backgroundColor: 'var(--card-bg)',
        border: '1px solid var(--card-border)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.boxShadow = 'var(--shadow-lg, 0 10px 20px rgba(0,0,0,0.15))';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'var(--shadow-sm, 0 1px 2px 0 rgba(0,0,0,0.05))';
      }}
    >
      <div style={{ height: '180px', overflow: 'hidden', backgroundColor: '#f5f5f5' }}>
        <Card.Img 
          variant="top" 
          src={product.thumbnail || product.image || 'https://via.placeholder.com/300'} 
          style={{ 
            objectFit: 'cover', 
            height: '100%',
            width: '100%',
            transition: 'transform 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        />
      </div>
      
      {/* Card Body - Using flex column to push buttons to bottom */}
      <Card.Body style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1
      }}>
        <div className="d-flex justify-content-between align-items-start mb-2">
          <Card.Title className="mb-0" style={{ color: 'var(--text-primary)', fontSize: '1rem', fontWeight: 'bold' }}>
            {product.title}
          </Card.Title>
          <Badge bg="secondary" style={{ backgroundColor: 'var(--primary)' }}>${product.price}</Badge>
        </div>
        
    
        <Card.Text style={{ 
          color: 'var(--text-secondary)', 
          fontSize: '0.85rem',
          minHeight: '60px',
          marginBottom: '12px'
        }}>
          {product.description?.substring(0, 80)}...
        </Card.Text>
        

        <div className="mb-3">
          <Badge bg="info" className="me-1" style={{ backgroundColor: 'var(--info)' }}>{product.category}</Badge>
          <div className="mt-2" style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
            <FiStar className="text-warning" /> {product.rating || 4.5} / 5
          </div>
        </div>
        
      
        <div className="d-flex gap-2 mt-auto" style={{ marginTop: 'auto' }}>
          <Button 
            variant="primary" 
            size="sm" 
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/edit-product/${product.id}`);
            }}
            style={{ 
              flex: 1,
              backgroundColor: 'var(--primary)', 
              borderColor: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '5px',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--primary-dark)';
              e.currentTarget.style.transform = 'scale(1.02)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--primary)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <FiEdit2 /> Edit
          </Button>
          <Button 
            variant="danger" 
            size="sm" 
            onClick={(e) => {
              e.stopPropagation();
              handleDelete();
            }}
            style={{ 
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '5px',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <FiTrash2 /> Delete
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;