import React, { useState, useEffect } from 'react';
import { Container, Card, Table, Form, Row, Col, Pagination, Badge, Button } from 'react-bootstrap';
import { FiSearch, FiUsers } from 'react-icons/fi';
import { useFetch } from '../hooks/useFetch';

const Customers = () => {
  const { data, loading } = useFetch('https://dummyjson.com/users?limit=50');
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  
  const customersPerPage = 10;

  useEffect(() => {
    if (data?.users) {
      setCustomers(data.users);
    }
  }, [data]);

  const filteredCustomers = customers.filter(customer => {
    const fullName = `${customer.firstName} ${customer.lastName}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase()) ||
           customer.email.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = filteredCustomers.slice(indexOfFirstCustomer, indexOfLastCustomer);
  const totalPages = Math.ceil(filteredCustomers.length / customersPerPage);

  if (loading) return <div className="spinner-container">Loading customers...</div>;

  return (
    <Container>
      <h2 className="mb-4">Customer Management</h2>
      
      <Card className="shadow-sm mb-4">
        <Card.Body>
          <Row>
            <Col md={8}>
              <Form.Group>
                <Form.Label>Search Customers</Form.Label>
                <div className="d-flex">
                  <Form.Control
                    type="text"
                    placeholder="Search by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </Form.Group>
            </Col>
            
            <Col md={4} className="d-flex align-items-end">
              <Button 
                variant="outline-secondary" 
                onClick={() => setSearchTerm('')}
              >
                Reset Search
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
                <th>#</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Orders</th>
              </tr>
            </thead>
            <tbody>
              {currentCustomers.map((customer, index) => (
                <tr key={customer.id}>
                  <td>{indexOfFirstCustomer + index + 1}</td>
                  <td>
                    <strong>{customer.firstName} {customer.lastName}</strong>
                  </td>
                  <td>{customer.email}</td>
                  <td>{customer.phone || 'N/A'}</td>
                  <td>{customer.age}</td>
                  <td>
                    <Badge bg={customer.gender === 'male' ? 'info' : 'danger'}>
                      {customer.gender}
                    </Badge>
                  </td>
                  <td>
                    <Badge bg="secondary">12 orders</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        
        {filteredCustomers.length === 0 && (
          <div className="text-center p-5">
            <FiUsers size={48} className="text-muted mb-3" />
            <p className="text-muted">No customers found</p>
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

export default Customers;