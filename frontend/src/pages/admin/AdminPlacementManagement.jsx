import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
import placementService from '../../services/placementService';
import api from '../../services/api';
import SIETLoader from '../../components/SIETLoader';

/**
 * AdminPlacementManagement Page
 * View and manage placement records with filters
 */
const AdminPlacementManagement = () => {
    const [records, setRecords] = useState([]);
    const [stats, setStats] = useState(null);
    const [officers, setOfficers] = useState({ heads: [], trainers: [] });
    const [activeTab, setActiveTab] = useState('records');
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(null);

    // Filters
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedBatch, setSelectedBatch] = useState('');
    const [selectedCompany, setSelectedCompany] = useState('');

    const batches = ['2021-2025', '2022-2026', '2023-2027', '2024-2028'];
    const departments = ['CSE', 'ECE', 'EEE', 'MECH', 'CIVIL', 'IT', 'AIDS', 'CSBS'];

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [recordsData, statsData, officersData] = await Promise.all([
                placementService.getAllRecords(),
                placementService.getStats(),
                placementService.getOfficers(),
            ]);
            setRecords(recordsData);
            setStats(statsData);
            setOfficers(officersData);
        } catch (error) {
            console.error('Error fetching placement data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteRecord = async (id) => {
        if (!window.confirm('Are you sure you want to delete this placement record?')) {
            return;
        }
        try {
            setDeleting(id);
            await api.delete(`/admin/placement-records/${id}`);
            alert('Record deleted successfully');
            fetchData();
        } catch (error) {
            console.error('Error deleting record:', error);
            alert('Failed to delete record');
        } finally {
            setDeleting(null);
        }
    };

    const handleDeleteOfficer = async (id, type) => {
        if (!window.confirm(`Are you sure you want to delete this ${type}?`)) {
            return;
        }
        try {
            await api.delete(`/admin/placement-officers/${id}`);
            alert(`${type} deleted successfully`);
            fetchData();
        } catch (error) {
            console.error('Error deleting officer:', error);
            alert(`Failed to delete ${type}`);
        }
    };

    // Get unique companies for filter
    const companies = [...new Set(records.map(r => r.company).filter(Boolean))];

    const filteredRecords = records.filter((record) => {
        const search = searchTerm.toLowerCase();
        const matchesSearch =
            record.name?.toLowerCase().includes(search) ||
            record.regNo?.toLowerCase().includes(search) ||
            record.company?.toLowerCase().includes(search);
        const matchesBatch = !selectedBatch || record.batch === selectedBatch;
        const matchesCompany = !selectedCompany || record.company === selectedCompany;
        return matchesSearch && matchesBatch && matchesCompany;
    });

    const clearFilters = () => {
        setSearchTerm('');
        setSelectedBatch('');
        setSelectedCompany('');
    };

    // Calculate year-wise and dept-wise statistics
    const getYearWiseStats = () => {
        const yearStats = {};
        batches.forEach(batch => {
            yearStats[batch] = records.filter(r => r.batch === batch).length;
        });
        return yearStats;
    };

    const getDeptWiseStats = () => {
        const deptStats = {};
        departments.forEach(dept => {
            deptStats[dept] = records.filter(r =>
                r.department && r.department.toUpperCase() === dept.toUpperCase()
            ).length;
        });
        return deptStats;
    };

    const tabs = [
        { id: 'records', label: 'Placement Records' },
        { id: 'officers', label: 'Officers' },
        { id: 'stats', label: 'Statistics' },
    ];

    // Website-matching styles
    const selectStyle = {
        padding: '10px 14px',
        borderRadius: '4px',
        border: '1px solid #ddd',
        background: '#fff',
        color: '#333',
        fontSize: '14px',
        fontFamily: 'Arial, sans-serif',
        cursor: 'pointer',
        minWidth: '150px',
        outline: 'none',
        appearance: 'none',
        WebkitAppearance: 'none',
        MozAppearance: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23333' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 12px center',
        paddingRight: '36px',
    };

    const inputStyle = {
        padding: '10px 14px',
        borderRadius: '4px',
        border: '1px solid #ddd',
        background: '#fff',
        color: '#333',
        fontSize: '14px',
        fontFamily: 'Arial, sans-serif',
        minWidth: '280px',
        outline: 'none',
    };

    const buttonStyle = {
        padding: '10px 16px',
        borderRadius: '4px',
        border: '1px solid #ddd',
        background: '#fff',
        color: '#333',
        fontSize: '14px',
        fontFamily: 'Arial, sans-serif',
        cursor: 'pointer',
    };

    return (
        <AdminLayout>
            <div className="admin-page-header">
                <h1 className="admin-page-title">Placement Management</h1>
                <p className="admin-page-subtitle">Manage placement records and officers</p>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}>
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`admin-btn ${activeTab === tab.id ? 'admin-btn-primary' : 'admin-btn-outline'}`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {loading ? (
                <SIETLoader />
            ) : (
                <>
                    {/* Records Tab */}
                    {activeTab === 'records' && (
                        <div>
                            {/* Filters */}
                            <div style={{
                                display: 'flex',
                                gap: '12px',
                                marginBottom: '20px',
                                flexWrap: 'wrap',
                                alignItems: 'center'
                            }}>
                                <input
                                    type="text"
                                    placeholder="Search by name, reg no, company..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    style={inputStyle}
                                    onFocus={(e) => e.target.style.borderColor = '#0A8F47'}
                                    onBlur={(e) => e.target.style.borderColor = '#ddd'}
                                />
                                <select
                                    value={selectedBatch}
                                    onChange={(e) => setSelectedBatch(e.target.value)}
                                    style={selectStyle}
                                    onFocus={(e) => e.target.style.borderColor = '#0A8F47'}
                                    onBlur={(e) => e.target.style.borderColor = '#ddd'}
                                >
                                    <option value="">All Batches</option>
                                    {batches.map(batch => (
                                        <option key={batch} value={batch}>{batch}</option>
                                    ))}
                                </select>
                                <select
                                    value={selectedCompany}
                                    onChange={(e) => setSelectedCompany(e.target.value)}
                                    style={selectStyle}
                                    onFocus={(e) => e.target.style.borderColor = '#0A8F47'}
                                    onBlur={(e) => e.target.style.borderColor = '#ddd'}
                                >
                                    <option value="">All Companies</option>
                                    {companies.map(company => (
                                        <option key={company} value={company}>{company}</option>
                                    ))}
                                </select>
                                {(searchTerm || selectedBatch || selectedCompany) && (
                                    <button
                                        onClick={clearFilters}
                                        style={buttonStyle}
                                        onMouseOver={(e) => e.target.style.backgroundColor = '#f0f8f0'}
                                        onMouseOut={(e) => e.target.style.backgroundColor = '#fff'}
                                    >
                                        Clear Filters
                                    </button>
                                )}
                            </div>

                            <div className="admin-table-container">
                                <div className="admin-table-header">
                                    <h3 className="admin-table-title">
                                        Placement Records
                                        <span style={{ color: '#888', marginLeft: '10px', fontWeight: 400 }}>
                                            ({filteredRecords.length} of {records.length})
                                        </span>
                                    </h3>
                                </div>

                                {filteredRecords.length > 0 ? (
                                    <table className="admin-table">
                                        <thead>
                                            <tr>
                                                <th>Register Number</th>
                                                <th>Name</th>
                                                <th>Department</th>
                                                <th>Company</th>
                                                <th>Job Role</th>
                                                <th>Package</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredRecords.slice(0, 50).map((record) => (
                                                <tr key={record.id}>
                                                    <td>{record.regNo}</td>
                                                    <td>{record.name}</td>
                                                    <td>{record.department || '-'}</td>
                                                    <td style={{ color: '#0A8F47', fontWeight: 500 }}>
                                                        {record.company}
                                                    </td>
                                                    <td>{record.jobRole}</td>
                                                    <td style={{ color: '#2e7d32', fontWeight: 500 }}>
                                                        {record.packageAmount}
                                                    </td>
                                                    <td>
                                                        <button
                                                            onClick={() => handleDeleteRecord(record.id)}
                                                            disabled={deleting === record.id}
                                                            className="admin-btn admin-btn-danger"
                                                            style={{ padding: '6px 12px', fontSize: '13px' }}
                                                        >
                                                            {deleting === record.id ? '...' : 'Delete'}
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div className="admin-empty">
                                        <p>No placement records found</p>
                                    </div>
                                )}

                                {filteredRecords.length > 50 && (
                                    <p style={{ padding: '16px', color: '#666', textAlign: 'center' }}>
                                        Showing 50 of {filteredRecords.length} records. Use filters to narrow down results.
                                    </p>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Officers Tab */}
                    {activeTab === 'officers' && (
                        <div>
                            {/* Placement Heads Table */}
                            <div className="admin-table-container" style={{ marginBottom: '24px' }}>
                                <div className="admin-table-header">
                                    <h3 className="admin-table-title">
                                        Placement Heads
                                        <span style={{ color: '#888', marginLeft: '10px', fontWeight: 400 }}>
                                            ({officers.heads?.length || 0})
                                        </span>
                                    </h3>
                                </div>

                                {officers.heads?.length > 0 ? (
                                    <table className="admin-table">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Position</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {officers.heads.map((officer, idx) => (
                                                <tr key={officer.id || idx}>
                                                    <td style={{ fontWeight: 500 }}>{officer.name}</td>
                                                    <td>{officer.position || '-'}</td>
                                                    <td>
                                                        <button
                                                            onClick={() => handleDeleteOfficer(officer.id, 'Placement Head')}
                                                            className="admin-btn admin-btn-danger"
                                                            style={{ padding: '6px 12px', fontSize: '13px' }}
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div className="admin-empty">
                                        <p>No placement heads found</p>
                                    </div>
                                )}
                            </div>

                            {/* Trainers Table */}
                            <div className="admin-table-container">
                                <div className="admin-table-header">
                                    <h3 className="admin-table-title">
                                        Trainers
                                        <span style={{ color: '#888', marginLeft: '10px', fontWeight: 400 }}>
                                            ({officers.trainers?.length || 0})
                                        </span>
                                    </h3>
                                </div>

                                {officers.trainers?.length > 0 ? (
                                    <table className="admin-table">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Position</th>
                                                <th>Training Batch</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {officers.trainers.map((officer, idx) => (
                                                <tr key={officer.id || idx}>
                                                    <td style={{ fontWeight: 500 }}>{officer.name}</td>
                                                    <td>{officer.position || 'Trainer'}</td>
                                                    <td>{officer.trainingBatch || '-'}</td>
                                                    <td>
                                                        <button
                                                            onClick={() => handleDeleteOfficer(officer.id, 'Trainer')}
                                                            className="admin-btn admin-btn-danger"
                                                            style={{ padding: '6px 12px', fontSize: '13px' }}
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div className="admin-empty">
                                        <p>No trainers found</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Stats Tab */}
                    {activeTab === 'stats' && (
                        <div>
                            {/* Overview Stats */}
                            <div className="admin-stats-grid" style={{ marginBottom: '30px' }}>
                                <div className="admin-card">
                                    <h4 style={{ color: '#555', margin: '0 0 8px 0' }}>Total Offers Made</h4>
                                    <p style={{ color: '#0A8F47', fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>
                                        {stats?.totalOffersMade || records.length}
                                    </p>
                                </div>
                                <div className="admin-card">
                                    <h4 style={{ color: '#555', margin: '0 0 8px 0' }}>Companies Visited</h4>
                                    <p style={{ color: '#0A8F47', fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>
                                        {stats?.totalCompaniesVisited || companies.length}
                                    </p>
                                </div>
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
                            </div>

                            {/* Year-wise Statistics */}
                            <div className="admin-table-container" style={{ marginBottom: '24px' }}>
                                <div className="admin-table-header">
                                    <h3 className="admin-table-title">Year-wise Statistics</h3>
                                </div>
                                <table className="admin-table">
                                    <thead>
                                        <tr>
                                            <th>Batch</th>
                                            <th>Total Placements</th>
                                            <th>Percentage</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Object.entries(getYearWiseStats()).map(([batch, count]) => (
                                            <tr key={batch}>
                                                <td style={{ fontWeight: 500 }}>{batch}</td>
                                                <td style={{ color: '#0A8F47', fontWeight: 500 }}>{count}</td>
                                                <td>
                                                    {records.length > 0
                                                        ? `${((count / records.length) * 100).toFixed(1)}%`
                                                        : '0%'}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Department-wise Statistics */}
                            <div className="admin-table-container">
                                <div className="admin-table-header">
                                    <h3 className="admin-table-title">Department-wise Statistics</h3>
                                </div>
                                <table className="admin-table">
                                    <thead>
                                        <tr>
                                            <th>Department</th>
                                            <th>Total Placements</th>
                                            <th>Percentage</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Object.entries(getDeptWiseStats()).map(([dept, count]) => (
                                            <tr key={dept}>
                                                <td style={{ fontWeight: 500 }}>{dept}</td>
                                                <td style={{ color: '#0A8F47', fontWeight: 500 }}>{count}</td>
                                                <td>
                                                    {records.length > 0
                                                        ? `${((count / records.length) * 100).toFixed(1)}%`
                                                        : '0%'}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </>
            )}
        </AdminLayout>
    );
};

export default AdminPlacementManagement;
