import React from 'react';
import AdminSidebar from './AdminSidebar';
import './AdminLayout.css';

/**
 * AdminLayout Component
 * Layout wrapper for admin pages with sidebar
 */
const AdminLayout = ({ children }) => {
    return (
        <div className="admin-layout">
            <AdminSidebar />
            <main className="admin-main">
                <div className="admin-content">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
