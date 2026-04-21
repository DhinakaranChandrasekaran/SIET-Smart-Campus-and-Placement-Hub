import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import studentService from '../services/studentService';
import { getCurrentUser, logoutUser, isAuthenticated } from '../data/authCredentials';
import SIETLoader from '../components/SIETLoader';

const DashboardPage = () => {
    const navigate = useNavigate();
    const currentUser = getCurrentUser();
    const [studentProfile, setStudentProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    // Redirect if not authenticated
    useEffect(() => {
        if (!isAuthenticated()) {
            navigate('/sign-in');
        }
    }, [navigate]);

    // Fetch student profile if user is a student
    useEffect(() => {
        const fetchStudentProfile = async () => {
            if (currentUser?.role === 'student' && currentUser?.regNo) {
                try {
                    const data = await studentService.getStudentByRegNo(currentUser.regNo);
                    setStudentProfile(data);
                } catch (error) {
                    console.error('Failed to fetch student profile:', error);
                    // Use data from sessionStorage as fallback
                    setStudentProfile({
                        registerNumber: currentUser.regNo,
                        name: currentUser.name,
                        department: currentUser.department,
                        email: currentUser.email,
                        academicYear: currentUser.academicYear
                    });
                }
            }
            setLoading(false);
        };

        fetchStudentProfile();
    }, [currentUser]);

    const handleLogout = () => {
        logoutUser();
        navigate('/sign-in');
        window.location.reload();
    };

    if (loading && currentUser?.role === 'student') {
        return <SIETLoader />;
    }

    // Use student profile if available, otherwise use currentUser
    const displayData = studentProfile || currentUser;

    return (
        <div style={styles.pageWrapper}>
            {/* Dashboard Content */}
            <div style={styles.container}>
                <div style={styles.card}>
                    {/* User Avatar */}
                    <div style={styles.avatarContainer}>
                        <div style={styles.avatar}>
                            {displayData?.name ? displayData.name.charAt(0).toUpperCase() : 'U'}
                        </div>
                    </div>

                    {/* Title */}
                    <h1 style={styles.title}>My Account</h1>

                    {/* User Details */}
                    <div style={styles.detailsContainer}>
                        {currentUser?.role === 'student' && (
                            <div style={styles.detailRow}>
                                <span style={styles.detailLabel}>Registration No:</span>
                                <span style={styles.detailValue}>{displayData?.registerNumber || currentUser?.regNo || 'N/A'}</span>
                            </div>
                        )}
                        <div style={styles.detailRow}>
                            <span style={styles.detailLabel}>Name:</span>
                            <span style={styles.detailValue}>{displayData?.name || 'N/A'}</span>
                        </div>
                        {currentUser?.role === 'student' && (
                            <>
                                <div style={styles.detailRow}>
                                    <span style={styles.detailLabel}>Department:</span>
                                    <span style={styles.detailValue}>{displayData?.department || 'N/A'}</span>
                                </div>
                                <div style={styles.detailRow}>
                                    <span style={styles.detailLabel}>Batch:</span>
                                    <span style={styles.detailValue}>{displayData?.academicYear || 'N/A'}</span>
                                </div>
                                <div style={styles.detailRow}>
                                    <span style={styles.detailLabel}>Email:</span>
                                    <span style={styles.detailValue}>{displayData?.email || currentUser?.email || 'N/A'}</span>
                                </div>
                            </>
                        )}
                        {currentUser?.role !== 'student' && (
                            <div style={styles.detailRow}>
                                <span style={styles.detailLabel}>Role:</span>
                                <span style={styles.detailValue}>{currentUser?.role?.toUpperCase() || 'N/A'}</span>
                            </div>
                        )}
                    </div>

                    {/* Admin Panel Button - Only for Admin Users */}
                    {currentUser?.role === 'admin' && (
                        <button
                            onClick={() => navigate('/admin/dashboard')}
                            style={styles.adminButton}
                            onMouseOver={(e) => {
                                e.target.style.backgroundColor = '#1b5e20';
                                e.target.style.transform = 'translateY(-2px)';
                            }}
                            onMouseOut={(e) => {
                                e.target.style.backgroundColor = '#2e7d32';
                                e.target.style.transform = 'translateY(0)';
                            }}
                        >
                            🎛️ Open Admin Panel
                        </button>
                    )}

                    {/* Logout Button */}
                    <button
                        onClick={handleLogout}
                        style={styles.logoutButton}
                        onMouseOver={(e) => {
                            e.target.style.backgroundColor = '#077a3c';
                            e.target.style.transform = 'translateY(-2px)';
                        }}
                        onMouseOut={(e) => {
                            e.target.style.backgroundColor = '#0A8F47';
                            e.target.style.transform = 'translateY(0)';
                        }}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

const styles = {
    pageWrapper: {
        minHeight: '60vh',
        backgroundColor: '#f0f8f0',
        fontFamily: "'Segoe UI', sans-serif"
    },
    container: {
        maxWidth: '500px',
        margin: '0 auto',
        padding: '60px 20px'
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: '16px',
        padding: '40px 30px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        textAlign: 'center'
    },
    avatarContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '20px'
    },
    avatar: {
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        backgroundColor: '#0A8F47',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '2rem',
        fontWeight: 'bold',
        boxShadow: '0 4px 15px rgba(10, 143, 71, 0.3)'
    },
    title: {
        fontSize: '1.5rem',
        color: '#2e7d32',
        margin: '0 0 30px 0',
        fontWeight: 'bold'
    },
    detailsContainer: {
        textAlign: 'left',
        marginBottom: '30px'
    },
    detailRow: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '12px 0',
        borderBottom: '1px solid #e8f5e9'
    },
    detailLabel: {
        fontWeight: '600',
        color: '#555',
        fontSize: '14px'
    },
    detailValue: {
        color: '#333',
        fontSize: '14px'
    },
    adminButton: {
        width: '100%',
        padding: '14px',
        backgroundColor: '#2e7d32',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        marginBottom: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px'
    },
    logoutButton: {
        width: '100%',
        padding: '14px',
        backgroundColor: '#0A8F47',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.3s ease'
    }
};

export default DashboardPage;
