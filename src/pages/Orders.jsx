import React, { useState } from 'react';
import { Container, Card, Table, Badge, Form, Row, Col, Pagination, Button } from 'react-bootstrap';
import { FiSearch } from 'react-icons/fi';

const Orders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  
  const ordersPerPage = 10;

  const [orders] = useState([
    { id: '#ORD-1001', customer: 'John Doe', email: 'john@example.com', amount: 299, status: 'delivered', date: '2024-01-15', items: 2 },
    { id: '#ORD-1002', customer: 'Jane Smith', email: 'jane@example.com', amount: 499, status: 'pending', date: '2024-01-14', items: 3 },
    { id: '#ORD-1003', customer: 'Mike Johnson', email: 'mike@example.com', amount: 149, status: 'processing', date: '2024-01-14', items: 1 },
    { id: '#ORD-1004', customer: 'Sarah Wilson', email: 'sarah@example.com', amount: 899, status: 'delivered', date: '2024-01-13', items: 4 },
    { id: '#ORD-1005', customer: 'David Brown', email: 'david@example.com', amount: 399, status: 'cancelled', date: '2024-01-12', items: 2 },
    { id: '#ORD-1006', customer: 'Emily Davis', email: 'emily@example.com', amount: 649, status: 'processing', date: '2024-01-11', items: 3 },
    { id: '#ORD-1007', customer: 'Robert Taylor', email: 'robert@example.com', amount: 199, status: 'pending', date: '2024-01-10', items: 1 },
    { id: '#ORD-1008', customer: 'Lisa Anderson', email: 'lisa@example.com', amount: 749, status: 'delivered', date: '2024-01-09', items: 5 }
  ]);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const getStatusBadge = (status) => {
    const variants = {
      delivered: 'success',
      pending: 'warning',
      processing: 'info',
      cancelled: 'danger'
    };
    return <Badge bg={variants[status]}>{status}</Badge>;
  };

  return (
    <Container>
      <h2 className="mb-4">Order Management</h2>
      
      <Card className="shadow-sm mb-4">
        <Card.Body>
          <Row>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Search Orders</Form.Label>
                <div className="d-flex">
                  <Form.Control
                    type="text"
                    placeholder="Search by customer, email, or order ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  
                </div>
              </Form.Group>
            </Col>
            
            <Col md={4}>
              <Form.Group>
                <Form.Label>Filter by Status</Form.Label>
                <Form.Select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="">All Orders</option>
                  <option value="delivered">Delivered</option>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="cancelled">Cancelled</option>
                </Form.Select>
              </Form.Group>
            </Col>
            
            <Col md={2} className="d-flex align-items-end">
              <Button 
                variant="outline-secondary" 
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('');
                }}
              >
                Reset Filters
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      
      <Card className="shadow-sm">
        <div className="table-responsive">
          <Table hover className="mb-0">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Email</th>
                <th>Items</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.map(order => (
                <tr key={order.id}>
                  <td><strong>{order.id}</strong></td>
                  <td>{order.customer}</td>
                  <td>{order.email}</td>
                  <td>{order.items}</td>
                  <td>${order.amount}</td>
                  <td>{getStatusBadge(order.status)}</td>
                  <td>{order.date}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        
        {filteredOrders.length === 0 && (
          <div className="text-center p-5">
            <p className="text-muted">No orders found</p>
          </div>
        )}
        
        {totalPages > 1 && (
          <div className="d-flex justify-content-center p-3">
            <Pagination>
              <Pagination.First onClick={() => setCurrentPage(1)} disabled={currentPage === 1} />
              <Pagination.Prev onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} />
              <Pagination.Item active>{currentPage}</Pagination.Item>
              <Pagination.Next onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages} />
              <Pagination.Last onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} />
            </Pagination>
          </div>
        )}
      </Card>
    </Container>
  );
};

export default Orders;