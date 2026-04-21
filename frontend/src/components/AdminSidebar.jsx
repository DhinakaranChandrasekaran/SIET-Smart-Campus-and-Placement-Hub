import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './AdminSidebar.css';

/**
 * AdminSidebar Component
 * Navigation sidebar for admin panel
 */
const AdminSidebar = () => {
    const location = useLocation();

    const menuItems = [
        { path: '/admin/dashboard', label: 'Dashboard' },
        { path: '/admin/update-requests', label: 'Update Requests' },
        { path: '/admin/students', label: 'Students' },
        { path: '/admin/placements', label: 'Placements' },
        { path: '/admin/departments', label: 'Departments' },
        { path: '/admin/data-management', label: 'Data Management' },
        { path: '/admin/analytics', label: 'Analytics' },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <aside className="admin-sidebar">
            <div className="admin-sidebar-header">
                <h2>🎓 SIET Admin</h2>
            </div>

            <nav className="admin-sidebar-nav">
                {menuItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`admin-sidebar-item ${isActive(item.path) ? 'active' : ''}`}
                    >
                        {item.label}
                    </Link>
                ))}
            </nav>

        </aside>
    );
};

export default AdminSidebar;
