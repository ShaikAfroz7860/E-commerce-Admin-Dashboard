import React, { useState, useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';

import {
  FiPackage,
  FiShoppingCart,
  FiUsers,
  FiDollarSign
} from 'react-icons/fi';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

import { useFetch } from '../hooks/useFetch';

const Dashboard = () => {

  const { data: productsData } =
    useFetch('https://dummyjson.com/products?limit=100');

  const { data: usersData } =
    useFetch('https://dummyjson.com/users?limit=100');

  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 156,
    totalCustomers: 0,
    totalRevenue: 45890
  });

  const [recentOrders] = useState([
    {
      id: '#ORD-001',
      customer: 'John Doe',
      amount: 299,
      status: 'delivered',
      date: '2024-01-15'
    },
    {
      id: '#ORD-002',
      customer: 'Jane Smith',
      amount: 499,
      status: 'pending',
      date: '2024-01-14'
    },
    {
      id: '#ORD-003',
      customer: 'Mike Johnson',
      amount: 149,
      status: 'processing',
      date: '2024-01-14'
    },
    {
      id: '#ORD-004',
      customer: 'Sarah Wilson',
      amount: 899,
      status: 'delivered',
      date: '2024-01-13'
    }
  ]);

  const salesData = [
    { month: 'Jan', sales: 4000, revenue: 24000 },
    { month: 'Feb', sales: 3000, revenue: 18000 },
    { month: 'Mar', sales: 5000, revenue: 30000 },
    { month: 'Apr', sales: 4500, revenue: 27000 },
    { month: 'May', sales: 6000, revenue: 36000 },
    { month: 'Jun', sales: 5500, revenue: 33000 }
  ];

  const categoryData = [
    { name: 'Electronics', value: 35 },
    { name: 'Clothing', value: 25 },
    { name: 'Books', value: 20 },
    { name: 'Home', value: 20 }
  ];

  const COLORS = [
    '#0088FE',
    '#00C49F',
    '#FFBB28',
    '#FF8042'
  ];

  useEffect(() => {

    if (productsData) {
      setStats(prev => ({
        ...prev,
        totalProducts:
          productsData.products?.length || 0
      }));
    }

    if (usersData) {
      setStats(prev => ({
        ...prev,
        totalCustomers:
          usersData.users?.length || 0
      }));
    }

  }, [productsData, usersData]);

  return (
    <div className="fade-in">

      <h2 className="mb-4">
        Dashboard Overview
      </h2>

      {/* Stats Cards */}
      <Row className="mb-4">

        <Col lg={3} md={6} className="mb-3">
          <Card className="card-hover border-0 shadow-sm">
            <Card.Body>

              <div className="d-flex justify-content-between align-items-center">

                <div>
                  <h6 className="text-muted">
                    Total Products
                  </h6>

                  <h3 className="mb-0">
                    {stats.totalProducts}
                  </h3>

                  <small className="text-success">
                    +12% this week
                  </small>
                </div>

                <FiPackage
                  size={40}
                  color="#0d6efd"
                />

              </div>

            </Card.Body>
          </Card>
        </Col>

        <Col lg={3} md={6} className="mb-3">
          <Card className="card-hover border-0 shadow-sm">
            <Card.Body>

              <div className="d-flex justify-content-between align-items-center">

                <div>
                  <h6 className="text-muted">
                    Total Orders
                  </h6>

                  <h3 className="mb-0">
                    {stats.totalOrders}
                  </h3>

                  <small className="text-success">
                    +8% this week
                  </small>
                </div>

                <FiShoppingCart
                  size={40}
                  color="#28a745"
                />

              </div>

            </Card.Body>
          </Card>
        </Col>

        <Col lg={3} md={6} className="mb-3">
          <Card className="card-hover border-0 shadow-sm">
            <Card.Body>

              <div className="d-flex justify-content-between align-items-center">

                <div>
                  <h6 className="text-muted">
                    Total Customers
                  </h6>

                  <h3 className="mb-0">
                    {stats.totalCustomers}
                  </h3>

                  <small className="text-success">
                    +15% this week
                  </small>
                </div>

                <FiUsers
                  size={40}
                  color="#17a2b8"
                />

              </div>

            </Card.Body>
          </Card>
        </Col>

        <Col lg={3} md={6} className="mb-3">
          <Card className="card-hover border-0 shadow-sm">
            <Card.Body>

              <div className="d-flex justify-content-between align-items-center">

                <div>
                  <h6 className="text-muted">
                    Total Revenue
                  </h6>

                  <h3 className="mb-0">
                    ${stats.totalRevenue.toLocaleString()}
                  </h3>

                  <small className="text-danger">
                    -5% this week
                  </small>
                </div>

                <FiDollarSign
                  size={40}
                  color="#ffc107"
                />

              </div>

            </Card.Body>
          </Card>
        </Col>

      </Row>

      {/* Charts */}
      <Row className="mb-4">

        <Col lg={8} className="mb-4">

          <Card className="border-0 shadow-sm">

            <Card.Header className="bg-transparent">
              <h5 className="mb-0">
                Sales Overview
              </h5>
            </Card.Header>

            <Card.Body>

              <ResponsiveContainer
                width="100%"
                height={300}
              >

                <LineChart data={salesData}>

                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="month" />

                  <YAxis yAxisId="left" />

                  <YAxis
                    yAxisId="right"
                    orientation="right"
                  />

                  <Tooltip />

                  <Legend />

                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="sales"
                    stroke="#8884d8"
                    name="Sales ($)"
                  />

                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="revenue"
                    stroke="#82ca9d"
                    name="Revenue ($)"
                  />

                </LineChart>

              </ResponsiveContainer>

            </Card.Body>

          </Card>

        </Col>

        <Col lg={4} className="mb-4">

          <Card className="border-0 shadow-sm">

            <Card.Header className="bg-transparent">
              <h5 className="mb-0">
                Categories
              </h5>
            </Card.Header>

            <Card.Body>

              <ResponsiveContainer
                width="100%"
                height={300}
              >

                <PieChart>

                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={(entry) =>
                      `${entry.value}%`
                    }
                  >

                    {categoryData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          COLORS[index % COLORS.length]
                        }
                      />
                    ))}

                  </Pie>

                  <Tooltip />

                  <Legend
                    verticalAlign="bottom"
                    height={36}
                  />

                </PieChart>

              </ResponsiveContainer>

            </Card.Body>

          </Card>

        </Col>

      </Row>

      {/* Recent Orders */}
      <Row>

        <Col lg={12}>

          <Card className="border-0 shadow-sm">

            <Card.Header className="bg-transparent">
              <h5 className="mb-0">
                Recent Orders
              </h5>
            </Card.Header>

            <Card.Body className="p-0">

              <div className="table-responsive">

                <table className="table table-hover mb-0">

                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Date</th>
                    </tr>
                  </thead>

                  <tbody>

                    {recentOrders.map(order => (

                      <tr key={order.id}>

                        <td>{order.id}</td>

                        <td>{order.customer}</td>

                        <td>${order.amount}</td>

                        <td>
                          <span
                            className={`status-${order.status}`}
                          >
                            {order.status}
                          </span>
                        </td>

                        <td>{order.date}</td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            </Card.Body>

          </Card>

        </Col>

      </Row>

    </div>
  );
};

export default Dashboard;