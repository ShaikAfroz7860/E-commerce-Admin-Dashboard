import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

import {
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

import {
  FiTrendingUp,
  FiTrendingDown,
  FiDollarSign,
  FiShoppingCart
} from 'react-icons/fi';

import { useFetch } from '../hooks/useFetch';

const Analytics = () => {

  const { data: productsData } =
    useFetch('https://dummyjson.com/products?limit=100');

  const [stats, setStats] = useState({
    totalRevenue: 45890,
    totalOrders: 156,
    averageOrderValue: 294,
    conversionRate: 3.2
  });

  const monthlyData = [
    { month: 'Jan', revenue: 24000, orders: 120 },
    { month: 'Feb', revenue: 18000, orders: 90 },
    { month: 'Mar', revenue: 30000, orders: 150 },
    { month: 'Apr', revenue: 27000, orders: 135 },
    { month: 'May', revenue: 36000, orders: 180 },
    { month: 'Jun', revenue: 33000, orders: 165 }
  ];

  const topProducts = [
    {
      name: 'iPhone 14',
      sales: 125,
      revenue: 124875
    },
    {
      name: 'Samsung TV',
      sales: 89,
      revenue: 62300
    },
    {
      name: 'MacBook Pro',
      sales: 67,
      revenue: 134000
    },
    {
      name: 'AirPods',
      sales: 234,
      revenue: 46800
    }
  ];

  const categorySales = [
    { name: 'Electronics', value: 45 },
    { name: 'Clothing', value: 25 },
    { name: 'Books', value: 15 },
    { name: 'Home', value: 15 }
  ];

  const COLORS = [
    '#0088FE',
    '#00C49F',
    '#FFBB28',
    '#FF8042'
  ];

  useEffect(() => {

    if (productsData?.products) {

      const totalProductsValue =
        productsData.products.reduce(
          (sum, p) => sum + p.price,
          0
        );

      setStats(prev => ({
        ...prev,
        totalRevenue: totalProductsValue,
        totalOrders: productsData.products.length
      }));
    }

  }, [productsData]);

  return (

    <Container>

      <h2 className="mb-4">
        Analytics Dashboard
      </h2>

      {/* Stats Cards */}
      <Row className="mb-4">

        <Col lg={3} md={6} className="mb-3">

          <Card className="border-0 shadow-sm">
            <Card.Body>

              <div className="d-flex justify-content-between align-items-center">

                <div>
                  <h6 className="text-muted">
                    Total Revenue
                  </h6>

                  <h3 className="mb-0">
                    ${stats.totalRevenue.toLocaleString()}
                  </h3>

                  <small className="text-success">
                    <FiTrendingUp /> +12%
                  </small>
                </div>

                <FiDollarSign
                  size={40}
                  color="#28a745"
                />

              </div>

            </Card.Body>
          </Card>

        </Col>

        <Col lg={3} md={6} className="mb-3">

          <Card className="border-0 shadow-sm">
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
                    <FiTrendingUp /> +8%
                  </small>
                </div>

                <FiShoppingCart
                  size={40}
                  color="#0d6efd"
                />

              </div>

            </Card.Body>
          </Card>

        </Col>

        <Col lg={3} md={6} className="mb-3">

          <Card className="border-0 shadow-sm">
            <Card.Body>

              <div className="d-flex justify-content-between align-items-center">

                <div>
                  <h6 className="text-muted">
                    Avg. Order Value
                  </h6>

                  <h3 className="mb-0">
                    ${stats.averageOrderValue}
                  </h3>

                  <small className="text-danger">
                    <FiTrendingDown /> -3%
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

        <Col lg={3} md={6} className="mb-3">

          <Card className="border-0 shadow-sm">
            <Card.Body>

              <div className="d-flex justify-content-between align-items-center">

                <div>
                  <h6 className="text-muted">
                    Conversion Rate
                  </h6>

                  <h3 className="mb-0">
                    {stats.conversionRate}%
                  </h3>

                  <small className="text-success">
                    <FiTrendingUp /> +0.5%
                  </small>
                </div>

                <FiTrendingUp
                  size={40}
                  color="#17a2b8"
                />

              </div>

            </Card.Body>
          </Card>

        </Col>

      </Row>

      {/* Charts */}
      <Row className="mb-4">

        {/* Area Chart */}
        <Col lg={8} className="mb-4">

          <Card className="border-0 shadow-sm">

            <Card.Header className="bg-transparent">
              <h5 className="mb-0">
                Revenue & Orders Trend
              </h5>
            </Card.Header>

            <Card.Body>

              <ResponsiveContainer
                width="100%"
                height={350}
              >

                <AreaChart data={monthlyData}>

                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="month" />

                  <YAxis yAxisId="left" />

                  <YAxis
                    yAxisId="right"
                    orientation="right"
                  />

                  <Tooltip />

                  <Legend />

                  <Area
                    yAxisId="left"
                    type="monotone"
                    dataKey="revenue"
                    stroke="#8884d8"
                    fill="#8884d8"
                    name="Revenue ($)"
                  />

                  <Area
                    yAxisId="right"
                    type="monotone"
                    dataKey="orders"
                    stroke="#82ca9d"
                    fill="#82ca9d"
                    name="Orders"
                  />

                </AreaChart>

              </ResponsiveContainer>

            </Card.Body>

          </Card>

        </Col>

        {/* Pie Chart */}
        <Col lg={4} className="mb-4">

          <Card className="border-0 shadow-sm">

            <Card.Header className="bg-transparent">
              <h5 className="mb-0">
                Sales by Category
              </h5>
            </Card.Header>

            <Card.Body>

              <ResponsiveContainer
                width="100%"
                height={350}
              >

                <PieChart>

                  <Pie
                    data={categorySales}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ value }) => `${value}%`}
                  >

                    {categorySales.map((entry, index) => (
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
      <Row>

        <Col lg={12}>

          <Card className="border-0 shadow-sm">

            <Card.Header className="bg-transparent">
              <h5 className="mb-0">
                Top Selling Products
              </h5>
            </Card.Header>

            <Card.Body>

              <div className="table-responsive">

                <table className="table table-hover">

                  <thead>
                    <tr>
                      <th>Product Name</th>
                      <th>Units Sold</th>
                      <th>Revenue</th>
                      <th>Performance</th>
                    </tr>
                  </thead>

                  <tbody>

                    {topProducts.map((product, index) => (

                      <tr key={index}>

                        <td>
                          <strong>
                            {product.name}
                          </strong>
                        </td>

                        <td>
                          {product.sales} units
                        </td>

                        <td>
                          ${product.revenue.toLocaleString()}
                        </td>

                        <td>

                          <div
                            className="progress"
                            style={{ height: '8px' }}
                          >

                            <div
                              className="progress-bar bg-success"
                              style={{
                                width: `${(product.sales / 234) * 100}%`
                              }}
                            ></div>

                          </div>

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            </Card.Body>

          </Card>

        </Col>

      </Row>

    </Container>
  );
};

export default Analytics;