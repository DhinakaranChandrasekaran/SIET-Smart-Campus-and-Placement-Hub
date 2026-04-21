import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
import adminService from '../../services/adminService';
import SIETLoader from '../../components/SIETLoader';

/**
 * AdminAnalytics Page
 * Charts and reports for admin
 */
const AdminAnalytics = () => {
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAnalytics();
    }, []);

    const fetchAnalytics = async () => {
        try {
            setLoading(true);
            const data = await adminService.getAnalytics();
            setAnalytics(data);
        } catch (error) {
            console.error('Error fetching analytics:', error);
        } finally {
            setLoading(false);
        }
    };

    const getBarWidth = (value, max) => {
        return max > 0 ? `${(value / max) * 100}%` : '0%';
    };

    if (loading) {
        return <SIETLoader />;
    }

    return (
        <AdminLayout>
            <div className="admin-page-header">
                <h1 className="admin-page-title">Analytics</h1>
                <p className="admin-page-subtitle">System statistics and insights</p>
            </div>

            {/* Request Status Breakdown */}
            <div className="admin-card" style={{ marginBottom: '24px' }}>
                <h3 style={{ color: '#2e7d32', marginBottom: '20px' }}>Update Request Status</h3>
                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                    {analytics?.requestStatusBreakdown && Object.entries(analytics.requestStatusBreakdown).map(([status, count]) => (
                        <div
                            key={status}
                            style={{
                                flex: '1',
                                minWidth: '150px',
                                background: '#f8fdf8',
                                padding: '20px',
                                borderRadius: '12px',
                                textAlign: 'center',
                                border: '1px solid #e8f5e9'
                            }}
                        >
                            <p style={{
                                color: status === 'pending' ? '#e65100' : status === 'approved' ? '#2e7d32' : '#c62828',
                                fontSize: '2rem',
                                fontWeight: 700,
                                margin: '0 0 8px 0',
                            }}>
                                {count}
                            </p>
                            <p style={{ color: '#555', textTransform: 'capitalize', margin: 0 }}>
                                {status}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Department-wise Students */}
            <div className="admin-card" style={{ marginBottom: '24px' }}>
                <h3 style={{ color: '#2e7d32', marginBottom: '20px' }}>Students by Department</h3>
                {analytics?.departmentWiseStudents?.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {(() => {
                            const maxCount = Math.max(...analytics.departmentWiseStudents.map(d => d.studentCount));
                            return analytics.departmentWiseStudents.map((dept, idx) => (
                                <div key={idx}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                        <span style={{ color: '#333' }}>{dept.department || 'Unknown'}</span>
                                        <span style={{ color: '#666' }}>{dept.studentCount}</span>
                                    </div>
                                    <div style={{
                                        height: '8px',
                                        background: '#e8f5e9',
                                        borderRadius: '4px',
                                        overflow: 'hidden',
                                    }}>
                                        <div style={{
                                            height: '100%',
                                            width: getBarWidth(dept.studentCount, maxCount),
                                            background: 'linear-gradient(90deg, #0A8F47 0%, #077a3c 100%)',
                                            borderRadius: '4px',
                                            transition: 'width 0.3s ease',
                                        }} />
                                    </div>
                                </div>
                            ));
                        })()}
                    </div>
                ) : (
                    <p style={{ color: '#888' }}>No department data available</p>
                )}
            </div>

            {/* Batch-wise Placements */}
            <div className="admin-card" style={{ marginBottom: '24px' }}>
                <h3 style={{ color: '#2e7d32', marginBottom: '20px' }}>Batch-wise Placements</h3>
                {analytics?.batchWisePlacements?.length > 0 ? (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                        {analytics.batchWisePlacements.map((batch, idx) => (
                            <div
                                key={idx}
                                style={{
                                    background: '#f8fdf8',
                                    padding: '20px',
                                    borderRadius: '12px',
                                    border: '1px solid #e8f5e9'
                                }}
                            >
                                <p style={{ color: '#0A8F47', fontWeight: 600, marginBottom: '12px' }}>{batch.batch}</p>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                    <span style={{ color: '#666' }}>Total Students</span>
                                    <span style={{ color: '#333', fontWeight: 600 }}>{batch.totalStudents}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                    <span style={{ color: '#666' }}>Placed</span>
                                    <span style={{ color: '#2e7d32', fontWeight: 600 }}>{batch.placedStudents}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: '#666' }}>Rate</span>
                                    <span style={{ color: '#1976d2', fontWeight: 600 }}>{batch.placementRate}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p style={{ color: '#888' }}>No batch data available</p>
                )}
            </div>

            {/* Top Companies */}
            <div className="admin-card">
                <h3 style={{ color: '#2e7d32', marginBottom: '20px' }}>Top Hiring Companies</h3>
                {analytics?.topCompanies?.length > 0 ? (
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Rank</th>
                                <th>Company</th>
                                <th>Hired</th>
                                <th>Avg Package</th>
                            </tr>
                        </thead>
                        <tbody>
                            {analytics.topCompanies.slice(0, 10).map((company, idx) => (
                                <tr key={idx}>
                                    <td>
                                        <span style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: '28px',
                                            height: '28px',
                                            borderRadius: '50%',
                                            background: idx < 3 ? 'linear-gradient(135deg, #ffc107 0%, #ff9800 100%)' : '#e8f5e9',
                                            color: idx < 3 ? '#333' : '#555',
                                            fontWeight: 600,
                                            fontSize: '0.85rem',
                                        }}>
                                            {idx + 1}
                                        </span>
                                    </td>
                                    <td style={{ fontWeight: 600 }}>{company.company}</td>
                                    <td>
                                        <span style={{ color: '#2e7d32', fontWeight: 600 }}>{company.hiredCount}</span>
                                    </td>
                                    <td>{company.avgPackage}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p style={{ color: '#888' }}>No company data available</p>
                )}
            </div>
        </AdminLayout>
    );
};

export default AdminAnalytics;
