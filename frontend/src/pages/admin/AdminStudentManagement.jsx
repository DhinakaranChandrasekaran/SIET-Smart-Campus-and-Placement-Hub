import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';
import adminService from '../../services/adminService';
import SIETLoader from '../../components/SIETLoader';

/**
 * AdminStudentManagement Page
 * View and manage student profiles with filters
 */
const AdminStudentManagement = () => {
    const [students, setStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedBatch, setSelectedBatch] = useState('');
    const [selectedDept, setSelectedDept] = useState('');
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(null);

    const departments = ['CSE', 'ECE', 'EEE', 'MECH', 'CIVIL', 'IT', 'AIDS', 'CSBS'];
    const batches = ['2021-2025', '2022-2026', '2023-2027', '2024-2028'];

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            setLoading(true);
            const data = await adminService.getAllStudents();
            setStudents(data);
        } catch (error) {
            console.error('Error fetching students:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (regNo, name) => {
        if (!window.confirm(`Are you sure you want to delete student "${name}" (${regNo})? This action cannot be undone.`)) {
            return;
        }
        try {
            setDeleting(regNo);
            await adminService.deleteStudent(regNo);
            setStudents(students.filter((s) => s.registerNumber !== regNo));
            alert('Student deleted successfully');
        } catch (error) {
            console.error('Error deleting student:', error);
            alert('Failed to delete student');
        } finally {
            setDeleting(null);
        }
    };

    const filteredStudents = students.filter((student) => {
        const search = searchTerm.toLowerCase();
        const matchesSearch =
            student.name?.toLowerCase().includes(search) ||
            student.registerNumber?.toLowerCase().includes(search) ||
            student.email?.toLowerCase().includes(search);
        const matchesBatch = !selectedBatch || student.academicYear === selectedBatch;
        const matchesDept = !selectedDept || student.department === selectedDept;
        return matchesSearch && matchesBatch && matchesDept;
    });

    const clearFilters = () => {
        setSearchTerm('');
        setSelectedBatch('');
        setSelectedDept('');
    };

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
                <h1 className="admin-page-title">Student Management</h1>
                <p className="admin-page-subtitle">View and manage student profiles</p>
            </div>

            {/* Filters */}
            <div style={{
                display: 'flex',
                gap: '12px',
                marginBottom: '24px',
                flexWrap: 'wrap',
                alignItems: 'center'
            }}>
                <input
                    type="text"
                    placeholder="Search by name, reg no, email..."
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
                    value={selectedDept}
                    onChange={(e) => setSelectedDept(e.target.value)}
                    style={selectStyle}
                    onFocus={(e) => e.target.style.borderColor = '#0A8F47'}
                    onBlur={(e) => e.target.style.borderColor = '#ddd'}
                >
                    <option value="">All Departments</option>
                    {departments.map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                    ))}
                </select>
                {(searchTerm || selectedBatch || selectedDept) && (
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

            {/* Students Table */}
            <div className="admin-table-container">
                <div className="admin-table-header">
                    <h3 className="admin-table-title">
                        Students
                        <span style={{ color: '#888', marginLeft: '10px', fontWeight: 400 }}>
                            ({filteredStudents.length} of {students.length})
                        </span>
                    </h3>
                </div>

                {loading ? (
                    <SIETLoader />
                ) : filteredStudents.length > 0 ? (
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Register No</th>
                                <th>Department</th>
                                <th>Batch</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredStudents.slice(0, 50).map((student) => (
                                <tr key={student.registerNumber}>
                                    <td>{student.name}</td>
                                    <td>{student.registerNumber}</td>
                                    <td>{student.department || '-'}</td>
                                    <td>{student.academicYear || '-'}</td>
                                    <td>{student.email || '-'}</td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            <Link
                                                to={`/admin/student/${student.registerNumber}`}
                                                className="admin-btn admin-btn-outline"
                                                style={{ padding: '6px 12px', fontSize: '13px' }}
                                            >
                                                View
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(student.registerNumber, student.name)}
                                                disabled={deleting === student.registerNumber}
                                                className="admin-btn admin-btn-danger"
                                                style={{ padding: '6px 12px', fontSize: '13px' }}
                                            >
                                                {deleting === student.registerNumber ? '...' : 'Delete'}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="admin-empty">
                        <p>No students found</p>
                    </div>
                )}

                {filteredStudents.length > 50 && (
                    <p style={{ padding: '16px', color: '#666', textAlign: 'center' }}>
                        Showing 50 of {filteredStudents.length} students. Use filters to narrow down results.
                    </p>
                )}
            </div>
        </AdminLayout>
    );
};

export default AdminStudentManagement;
