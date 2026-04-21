import React from 'react';
import { Navigate } from 'react-router-dom';
import authService from '../services/authService';

/**
 * AdminProtectedRoute Component
 * Protects admin-only routes
 */
const AdminProtectedRoute = ({ children }) => {
    const user = authService.getCurrentUser();
    const isAuthenticated = authService.isAuthenticated();

    // Check if user is authenticated and is admin
    if (!isAuthenticated) {
        return <Navigate to="/signin" replace />;
    }

    // Check if user has admin role
    if (!user || user.role !== 'admin') {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

export default AdminProtectedRoute;
