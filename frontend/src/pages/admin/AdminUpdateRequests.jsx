import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';
import adminService from '../../services/adminService';
import SIETLoader from '../../components/SIETLoader';

/**
 * AdminUpdateRequests Page
 * Lists all update requests with filtering
 */
const AdminUpdateRequests = () => {
    const [requests, setRequests] = useState([]);
    const [filter, setFilter] = useState('all'); // all, pending, approved, rejected
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                setLoading(true);
                let data;
                if (filter === 'pending') {
                    data = await adminService.getPendingUpdateRequests();
                } else {
                    data = await adminService.getAllUpdateRequests();
                    if (filter !== 'all') {
                        data = data.filter((r) => r.status === filter);
                    }
                }
                setRequests(data);
            } catch (error) {
                console.error('Error fetching requests:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRequests();
    }, [filter]);

    const getStatusBadgeClass = (status) => {
        switch (status) {
            case 'pending':
                return 'admin-badge-pending';
            case 'approved':
                return 'admin-badge-approved';
            case 'rejected':
                return 'admin-badge-rejected';
            default:
                return '';
        }
    };

    return (
        <AdminLayout>
            <div className="admin-page-header">
                <h1 className="admin-page-title">Update Requests</h1>
                <p className="admin-page-subtitle">Manage student profile update requests</p>
            </div>

            {/* Filter Tabs */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}>
                {['all', 'pending', 'approved', 'rejected'].map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`admin-btn ${filter === f ? 'admin-btn-primary' : 'admin-btn-outline'}`}
                        style={{ textTransform: 'capitalize' }}
                    >
                        {f}
                    </button>
                ))}
            </div>

            {/* Requests Table */}
            <div className="admin-table-container">
                <div className="admin-table-header">
                    <h3 className="admin-table-title">
                        {filter === 'all' ? 'All Requests' : `${filter.charAt(0).toUpperCase() + filter.slice(1)} Requests`}
                        <span style={{ color: 'rgba(255,255,255,0.5)', marginLeft: '10px' }}>
                            ({requests.length})
                        </span>
                    </h3>
                </div>

                {loading ? (
                    <SIETLoader />
                ) : requests.length > 0 ? (
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Student Name</th>
                                <th>Register No</th>
                                <th>Submitted On</th>
                                <th>Status</th>
                                <th>Reviewed By</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map((request) => (
                                <tr key={request.id}>
                                    <td>#{request.id}</td>
                                    <td>{request.studentName}</td>
                                    <td>{request.studentRegNo}</td>
                                    <td>
                                        {new Date(request.submittedOn).toLocaleDateString('en-IN', {
                                            day: '2-digit',
                                            month: 'short',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </td>
                                    <td>
                                        <span className={`admin-badge ${getStatusBadgeClass(request.status)}`}>
                                            {request.status}
                                        </span>
                                    </td>
                                    <td>{request.reviewedBy || '-'}</td>
                                    <td>
                                        <Link
                                            to={`/admin/update-requests/${request.id}`}
                                            className="admin-btn admin-btn-outline"
                                        >
                                            {request.status === 'pending' ? 'Review' : 'View'}
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="admin-empty">
                        <p>No {filter !== 'all' ? filter : ''} requests found</p>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default AdminUpdateRequests;
