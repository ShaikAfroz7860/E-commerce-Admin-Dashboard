import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Sidebar from './Sidebar';
import TopNavbar from './Navbar';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return <div className="spinner-container">Loading...</div>;
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return (
    <div className="main-layout">
      <Sidebar />
      <div style={{ flex: 1, marginLeft: '260px' }}>
        <TopNavbar />
        <div className="main-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default PrivateRoute;