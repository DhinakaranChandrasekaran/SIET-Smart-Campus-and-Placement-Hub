import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
import departmentService from '../../services/departmentService';
import api from '../../services/api';
import SIETLoader from '../../components/SIETLoader';

/**
 * AdminDepartmentManagement Page
 * Manage departments, HODs, and faculty members
 */
const AdminDepartmentManagement = () => {
    const [departments, setDepartments] = useState([]);
    const [selectedDept, setSelectedDept] = useState('');
    const [deptDetails, setDeptDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');

    useEffect(() => {
        fetchDepartments();
    }, []);

    useEffect(() => {
        if (selectedDept) {
            fetchDepartmentDetails(selectedDept);
        }
    }, [selectedDept]);

    const fetchDepartments = async () => {
        try {
            setLoading(true);
            const data = await departmentService.getAllDepartments();
            setDepartments(data);
        } catch (error) {
            console.error('Error fetching departments:', error);
            setDepartments([]);
        } finally {
            setLoading(false);
        }
    };

    const fetchDepartmentDetails = async (deptCode) => {
        try {
            const deptData = await departmentService.getDepartmentByCode(deptCode);
            setDeptDetails(deptData);
        } catch (error) {
            console.error('Error fetching department details:', error);
            setDeptDetails(null);
        }
    };

    const handleDeleteHod = async () => {
        if (!window.confirm('Are you sure you want to remove the HOD?')) return;
        try {
            await api.delete(`/admin/hod/delete/${selectedDept}`);
            alert('HOD removed successfully');
            fetchDepartmentDetails(selectedDept);
        } catch (error) {
            console.error('Error deleting HOD:', error);
            alert('Failed to remove HOD');
        }
    };

    const handleDeleteFaculty = async (facultyId) => {
        if (!window.confirm('Are you sure you want to delete this faculty member?')) return;
        try {
            await api.delete(`/admin/faculty/${facultyId}`);
            alert('Faculty member deleted successfully');
            fetchDepartmentDetails(selectedDept);
        } catch (error) {
            console.error('Error deleting faculty:', error);
            alert('Failed to delete faculty');
        }
    };

    const tabs = [
        { id: 'overview', label: 'All Departments' },
        { id: 'details', label: 'Department Details' },
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
        minWidth: '250px',
        outline: 'none',
        appearance: 'none',
        WebkitAppearance: 'none',
        MozAppearance: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23333' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 12px center',
        paddingRight: '36px',
    };

    return (
        <AdminLayout>
            <div className="admin-page-header">
                <h1 className="admin-page-title">Department Management</h1>
                <p className="admin-page-subtitle">Manage departments, HODs, and faculty members</p>
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
                    {/* Overview Tab - All Departments */}
                    {activeTab === 'overview' && (
                        <div className="admin-table-container">
                            <div className="admin-table-header">
                                <h3 className="admin-table-title">
                                    All Departments
                                    <span style={{ color: '#888', marginLeft: '10px', fontWeight: 400 }}>
                                        ({departments.length})
                                    </span>
                                </h3>
                            </div>

                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>Code</th>
                                        <th>Department Name</th>
                                        <th>HOD</th>
                                        <th>Faculty Count</th>
                                        <th>Student Count</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {departments.map((dept) => (
                                        <tr key={dept.id}>
                                            <td style={{ fontWeight: 500 }}>{dept.id}</td>
                                            <td>{dept.name}</td>
                                            <td style={{ color: '#0A8F47' }}>{dept.hod?.name || 'Not Assigned'}</td>
                                            <td>{dept.staff?.length || 0}</td>
                                            <td>{dept.studentCount || 0}</td>
                                            <td>
                                                <button
                                                    onClick={() => {
                                                        setSelectedDept(dept.id);
                                                        setActiveTab('details');
                                                    }}
                                                    className="admin-btn admin-btn-outline"
                                                    style={{ padding: '6px 12px', fontSize: '13px' }}
                                                >
                                                    Manage
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Details Tab - Department Details */}
                    {activeTab === 'details' && (
                        <div>
                            {/* Department Selector */}
                            <div style={{ marginBottom: '24px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', color: '#555', fontSize: '14px' }}>
                                    Select Department
                                </label>
                                <select
                                    value={selectedDept}
                                    onChange={(e) => setSelectedDept(e.target.value)}
                                    style={selectStyle}
                                    onFocus={(e) => e.target.style.borderColor = '#0A8F47'}
                                    onBlur={(e) => e.target.style.borderColor = '#ddd'}
                                >
                                    <option value="">Choose a department</option>
                                    {departments.map(dept => (
                                        <option key={dept.id} value={dept.id}>{dept.id} - {dept.name}</option>
                                    ))}
                                </select>
                            </div>

                            {selectedDept ? (
                                <>
                                    {/* HOD Section */}
                                    <div className="admin-table-container" style={{ marginBottom: '24px' }}>
                                        <div className="admin-table-header">
                                            <h3 className="admin-table-title">Head of Department</h3>
                                        </div>

                                        {deptDetails?.hod?.name ? (
                                            <table className="admin-table">
                                                <thead>
                                                    <tr>
                                                        <th>Name</th>
                                                        <th>Designation</th>
                                                        <th>Joining Year</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td style={{ fontWeight: 500, color: '#0A8F47' }}>{deptDetails.hod.name}</td>
                                                        <td>{deptDetails.hod.designation || 'N/A'}</td>
                                                        <td>{deptDetails.hod.joiningYear || 'N/A'}</td>
                                                        <td>
                                                            <button
                                                                onClick={handleDeleteHod}
                                                                className="admin-btn admin-btn-danger"
                                                                style={{ padding: '6px 12px', fontSize: '13px' }}
                                                            >
                                                                Delete
                                                            </button>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        ) : (
                                            <div className="admin-empty">
                                                <p>No HOD assigned</p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Faculty Section */}
                                    <div className="admin-table-container">
                                        <div className="admin-table-header">
                                            <h3 className="admin-table-title">
                                                Faculty Members
                                                <span style={{ color: '#888', marginLeft: '10px', fontWeight: 400 }}>
                                                    ({deptDetails?.staff?.length || 0})
                                                </span>
                                            </h3>
                                        </div>

                                        {deptDetails?.staff?.length > 0 ? (
                                            <table className="admin-table">
                                                <thead>
                                                    <tr>
                                                        <th>Name</th>
                                                        <th>Position</th>
                                                        <th>Joining Year</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {deptDetails.staff.map((member, index) => (
                                                        <tr key={index}>
                                                            <td style={{ fontWeight: 500 }}>{member.name}</td>
                                                            <td>{member.position || 'N/A'}</td>
                                                            <td>{member.joiningYear || 'N/A'}</td>
                                                            <td>
                                                                <button
                                                                    onClick={() => handleDeleteFaculty(member.id)}
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
                                                <p>No faculty members found</p>
                                            </div>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <div className="admin-empty">
                                    <p>Please select a department to view details</p>
                                </div>
                            )}
                        </div>
                    )}
                </>
            )}
        </AdminLayout>
    );
};

export default AdminDepartmentManagement;
