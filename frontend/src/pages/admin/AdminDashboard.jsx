import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';
import adminService from '../../services/adminService';
import SIETLoader from '../../components/SIETLoader';

/**
 * AdminDashboard Page
 * Main admin landing page with statistics and quick actions
 */
const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [pendingRequests, setPendingRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            const [dashboardStats, pending] = await Promise.all([
                adminService.getDashboardStats(),
                adminService.getPendingUpdateRequests(),
            ]);
            setStats(dashboardStats);
            setPendingRequests(pending.slice(0, 5));
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <SIETLoader />;
    }

    return (
        <AdminLayout>
            <div className="admin-page-header">
                <h1 className="admin-page-title">Dashboard</h1>
                <p className="admin-page-subtitle">Welcome to SIET Admin Panel</p>
            </div>

            {/* Statistics Cards */}
            <div className="admin-stats-grid">
                <div className="admin-card">
                    <h4 style={{ color: '#555', margin: '0 0 8px 0' }}>Total Students</h4>
                    <p style={{ color: '#0A8F47', fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>
                        {stats?.totalStudents || 0}
                    </p>
                </div>

                <div className="admin-card">
                    <h4 style={{ color: '#555', margin: '0 0 8px 0' }}>Pending Requests</h4>
                    <p style={{ color: '#0A8F47', fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>
                        {stats?.pendingUpdateRequests || 0}
                    </p>
                </div>

                <div className="admin-card">
                    <h4 style={{ color: '#555', margin: '0 0 8px 0' }}>Placement Rate</h4>
                    <p style={{ color: '#0A8F47', fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>
                        {stats?.placementRate || '0%'}
                    </p>
                </div>

                <div className="admin-card">
                    <h4 style={{ color: '#555', margin: '0 0 8px 0' }}>Partner Companies</h4>
                    <p style={{ color: '#0A8F47', fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>
                        {stats?.totalCompanies || 0}
                    </p>
                </div>
            </div>

            {/* Quick Stats Row */}
            <div className="admin-stats-grid" style={{ marginBottom: '30px' }}>
                <div className="admin-card">
                    <h4 style={{ color: '#555', margin: '0 0 8px 0' }}>Highest Package</h4>
                    <p style={{ color: '#0A8F47', fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>
                        {stats?.highestPackage || 'N/A'}
                    </p>
                </div>
                <div className="admin-card">
                    <h4 style={{ color: '#555', margin: '0 0 8px 0' }}>Average Package</h4>
                    <p style={{ color: '#2e7d32', fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>
                        {stats?.averagePackage || 'N/A'}
                    </p>
                </div>
                <div className="admin-card">
                    <h4 style={{ color: '#555', margin: '0 0 8px 0' }}>Approved Requests</h4>
                    <p style={{ color: '#2e7d32', fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>
                        {stats?.approvedUpdateRequests || 0}
                    </p>
                </div>
                <div className="admin-card">
                    <h4 style={{ color: '#555', margin: '0 0 8px 0' }}>Rejected Requests</h4>
                    <p style={{ color: '#c62828', fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>
                        {stats?.rejectedUpdateRequests || 0}
                    </p>
                </div>
            </div>

            {/* Pending Update Requests */}
            <div className="admin-table-container">
                <div className="admin-table-header">
                    <h3 className="admin-table-title">Recent Pending Requests</h3>
                    <Link to="/admin/update-requests" className="admin-btn admin-btn-primary">
                        View All
                    </Link>
                </div>

                {pendingRequests.length > 0 ? (
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Student</th>
                                <th>Reg. No</th>
                                <th>Submitted On</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pendingRequests.map((request) => (
                                <tr key={request.id}>
                                    <td>{request.studentName}</td>
                                    <td>{request.studentRegNo}</td>
                                    <td>
                                        {new Date(request.submittedOn).toLocaleDateString('en-IN', {
                                            day: '2-digit',
                                            month: 'short',
                                            year: 'numeric',
                                        })}
                                    </td>
                                    <td>
                                        <span className="admin-badge admin-badge-pending">
                                            {request.status}
                                        </span>
                                    </td>
                                    <td>
                                        <Link
                                            to={`/admin/update-requests/${request.id}`}
                                            className="admin-btn admin-btn-outline"
                                        >
                                            Review
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="admin-empty">
                        <p>No pending requests</p>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default AdminDashboard;
