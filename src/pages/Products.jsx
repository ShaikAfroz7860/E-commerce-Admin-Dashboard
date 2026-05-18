import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Button, InputGroup, Pagination } from 'react-bootstrap';
import { FiSearch, FiFilter } from 'react-icons/fi';
import ProductCard from '../components/ProductCard';
import { useFetch } from '../hooks/useFetch';
import { useNotification } from '../hooks/useNotification';
import Loader from '../components/Loader';

const Products = () => {
  const { data, loading, error } = useFetch('https://dummyjson.com/products?limit=100');
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState(1000);
  const { showSuccess } = useNotification();
  
  const productsPerPage = 12;

  useEffect(() => {
    // Load products from localStorage first
    const storedProducts = localStorage.getItem('adminProducts');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    } else if (data?.products) {
      setProducts(data.products);
      localStorage.setItem('adminProducts', JSON.stringify(data.products));
    }
  }, [data]);

  const handleDeleteProduct = (productId) => {
    const updatedProducts = products.filter(p => p.id !== productId);
    setProducts(updatedProducts);
    localStorage.setItem('adminProducts', JSON.stringify(updatedProducts));
    showSuccess('Product deleted');
  };

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !category || product.category === category;
    const matchesPrice = product.price <= priceRange;
    return matchesSearch && matchesCategory && matchesPrice;
  });

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Get unique categories
  const categories = [...new Set(products.map(p => p.category))];

  if (loading) return <Loader />;
  if (error) return <div className="text-center text-danger">Error: {error}</div>;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Product Management</h2>
      </div>
      
      {/* Filters */}
      <Row className="mb-4">
        <Col md={4}>
          <InputGroup>
            <InputGroup.Text><FiSearch /></InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </Col>
        
        <Col md={3}>
          <Form.Select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </Form.Select>
        </Col>
        
        <Col md={3}>
          <Form.Label>Max Price: ${priceRange}</Form.Label>
          <Form.Range
            min="0"
            max="1000"
            value={priceRange}
            onChange={(e) => setPriceRange(Number(e.target.value))}
          />
        </Col>
        
        <Col md={2}>
          <Button variant="outline-secondary" onClick={() => {
            setSearchTerm('');
            setCategory('');
            setPriceRange(1000);
          }}>
            <FiFilter /> Reset
          </Button>
        </Col>
      </Row>
      
      {/* Product Count */}
      <div className="mb-3">
        <small className="text-muted">
          Showing {currentProducts.length} of {filteredProducts.length} products
        </small>
      </div>
      
      {/* Products Grid */}
      <Row>
        {currentProducts.map(product => (
          <Col key={product.id} md={6} lg={4} xl={3} className="mb-4">
            <ProductCard product={product} onDelete={handleDeleteProduct} />
          </Col>
        ))}
      </Row>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-4">
          <Pagination>
            <Pagination.First onClick={() => setCurrentPage(1)} disabled={currentPage === 1} />
            <Pagination.Prev onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} />
            
            {[...Array(totalPages).keys()].slice(
              Math.max(0, currentPage - 3),
              Math.min(totalPages, currentPage + 2)
            ).map(number => (
              <Pagination.Item
                key={number + 1}
                active={number + 1 === currentPage}
                onClick={() => setCurrentPage(number + 1)}
              >
                {number + 1}
              </Pagination.Item>
            ))}
            
            <Pagination.Next onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages} />
            <Pagination.Last onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} />
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default Products;