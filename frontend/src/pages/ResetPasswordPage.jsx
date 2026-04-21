import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import Layout from '../components/Layout';
import SIETLoader from '../components/SIETLoader';

const ResetPasswordPage = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [validatingToken, setValidatingToken] = useState(true);
    const [tokenValid, setTokenValid] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Validate token on component mount
    useEffect(() => {
        const validateToken = async () => {
            try {
                const response = await api.get(`/auth/validate-token/${token}`);
                setTokenValid(response.data.valid);
                if (!response.data.valid) {
                    setError('This reset link is invalid or has expired. Please request a new one.');
                }
            } catch (err) {
                setTokenValid(false);
                setError('Failed to validate reset link. Please try again.');
            } finally {
                setValidatingToken(false);
            }
        };

        if (token) {
            validateToken();
        }
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        // Validation
        if (newPassword.length < 6) {
            setError('Password must be at least 6 characters long');
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);

        try {
            const response = await api.post('/auth/reset-password', {
                token: token,
                newPassword: newPassword
            });

            setMessage(response.data.message || 'Password reseted successfully!');
            setNewPassword('');
            setConfirmPassword('');

            // Redirect to login after 2 seconds
            setTimeout(() => {
                navigate('/signin');
            }, 2000);

        } catch (err) {
            setError(err.response?.data?.message || 'Failed to reset password. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (validatingToken) {
        return <SIETLoader />;
    }
    return (
        <Layout>
            <div style={{
                minHeight: '80vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #f0f8f0 0%, #e8f5e9 100%)',
                padding: '20px'
            }}>
                <div style={{
                    backgroundColor: '#fff',
                    padding: '40px',
                    borderRadius: '16px',
                    boxShadow: '0 10px 30px rgba(0, 128, 0, 0.12)',
                    maxWidth: '450px',
                    width: '100%'
                }}>
                    {/* Logo */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginBottom: '24px'
                    }}>
                        <div style={{
                            width: '150px',
                            height: '150px',
                            borderRadius: '50%',
                            backgroundColor: '#fff',
                            border: 'none',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            overflow: 'hidden'
                        }}>
                            <img
                                src="/images/student-profile/siet-logo.jpg"
                                alt="College Logo"
                                style={{ width: '85%', height: 'auto', objectFit: 'contain' }}
                            />
                        </div>
                    </div>

                    {/* Title */}
                    <h2 style={{
                        fontSize: '1.8rem',
                        fontWeight: 'bold',
                        color: '#0A8F47',
                        marginBottom: '12px',
                        textAlign: 'center'
                    }}>
                        Reset Password
                    </h2>

                    <p style={{
                        textAlign: 'center',
                        color: '#666',
                        marginBottom: '24px',
                        fontSize: '14px'
                    }}>
                        Enter your new password below
                    </p>

                    {/* Success Message */}
                    {message && (
                        <div style={{
                            backgroundColor: '#f0f8f0',
                            color: '#0A8F47',
                            padding: '20px',
                            borderRadius: '12px',
                            marginBottom: '20px',
                            border: '1px solid #0A8F47',
                            fontSize: '15px',
                            textAlign: 'center'
                        }}>
                            {message}
                        </div>
                    )}

                    {/* Error Message */}
                    {error && (
                        <div style={{
                            backgroundColor: '#f8d7da',
                            color: '#721c24',
                            padding: '12px',
                            borderRadius: '8px',
                            marginBottom: '20px',
                            border: '1px solid #f5c6cb',
                            fontSize: '14px'
                        }}>
                            {error}
                        </div>
                    )}

                    {/* Form - Only show if token is valid */}
                    {tokenValid && !message && (
                        <form onSubmit={handleSubmit}>
                            {/* New Password */}
                            <div style={{ marginBottom: '20px' }}>
                                <div style={{ position: 'relative' }}>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        required
                                        placeholder="New Password"
                                        style={{
                                            width: '100%',
                                            padding: '14px 60px 14px 14px',
                                            fontSize: '15px',
                                            borderRadius: '8px',
                                            border: '1px solid #0A8F47',
                                            boxSizing: 'border-box',
                                            transition: 'border-color 0.3s ease',
                                            outline: 'none'
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = '#0A8F47'}
                                        onBlur={(e) => e.target.style.borderColor = '#0A8F47'}
                                    />
                                    <span
                                        onClick={() => setShowPassword(!showPassword)}
                                        style={{
                                            position: 'absolute',
                                            right: '14px',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            fontSize: '13px',
                                            color: '#0A8F47',
                                            cursor: 'pointer',
                                            fontWeight: '500'
                                        }}
                                    >
                                        {showPassword ? 'Hide' : 'Show'}
                                    </span>
                                </div>
                            </div>

                            {/* Confirm Password */}
                            <div style={{ marginBottom: '24px' }}>
                                <div style={{ position: 'relative' }}>
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                        placeholder="Confirm Password"
                                        style={{
                                            width: '100%',
                                            padding: '14px 60px 14px 14px',
                                            fontSize: '15px',
                                            borderRadius: '8px',
                                            border: '1px solid #0A8F47',
                                            boxSizing: 'border-box',
                                            transition: 'border-color 0.3s ease',
                                            outline: 'none'
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = '#0A8F47'}
                                        onBlur={(e) => e.target.style.borderColor = '#0A8F47'}
                                    />
                                    <span
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        style={{
                                            position: 'absolute',
                                            right: '14px',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            fontSize: '13px',
                                            color: '#0A8F47',
                                            cursor: 'pointer',
                                            fontWeight: '500'
                                        }}
                                    >
                                        {showConfirmPassword ? 'Hide' : 'Show'}
                                    </span>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                style={{
                                    width: '100%',
                                    padding: '14px',
                                    backgroundColor: loading ? '#ccc' : '#0A8F47',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '8px',
                                    fontSize: '16px',
                                    fontWeight: '600',
                                    cursor: loading ? 'not-allowed' : 'pointer',
                                    transition: 'background-color 0.3s ease',
                                    marginBottom: '16px'
                                }}
                                onMouseOver={(e) => {
                                    if (!loading) e.target.style.backgroundColor = '#077a3c';
                                }}
                                onMouseOut={(e) => {
                                    if (!loading) e.target.style.backgroundColor = '#0A8F47';
                                }}
                            >
                                {loading ? 'Resetting...' : 'Reset Password'}
                            </button>
                        </form>
                    )}


                </div>

                {/* CSS for spinner animation */}
                <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
            </div>
        </Layout>
    );
};

export default ResetPasswordPage;
