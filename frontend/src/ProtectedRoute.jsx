import React from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('feastoUser'));

  if (!user) {
    // Optional: Show a toast message informing the user why they were redirected
    // We use a unique toastId to prevent duplicates if the component re-renders
    toast.error('Please login to access this page.', {
        toastId: 'auth-error'
    });
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
