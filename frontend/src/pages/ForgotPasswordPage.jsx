import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import Layout from '../components/Layout';

const ForgotPasswordPage = () => {
    const [identifier, setIdentifier] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        setLoading(true);

        try {
            const response = await api.post('/auth/forgot-password', {
                identifier: identifier
            });

            setMessage(response.data.message || 'Password reset email sent! Please check your inbox.');
            setIdentifier('');

            // Redirect to login after 3 seconds
            setTimeout(() => {
                navigate('/signin');
            }, 3000);

        } catch (err) {
            setError(err.response?.data?.message || 'Failed to send reset email. Please try again.');
        } finally {
            setLoading(false);
        }
    };

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
                        Forgot Password
                    </h2>

                    <p style={{
                        textAlign: 'center',
                        color: '#666',
                        marginBottom: '24px',
                        fontSize: '14px'
                    }}>
                        Enter your register number or email to receive a password reset link
                    </p>

                    {/* Success Message */}
                    {message && (
                        <div style={{
                            backgroundColor: '#d4edda',
                            color: '#155724',
                            padding: '12px',
                            borderRadius: '8px',
                            marginBottom: '20px',
                            border: '1px solid #c3e6cb',
                            fontSize: '14px'
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

                    {/* Form */}
                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '24px' }}>
                            <input
                                type="text"
                                value={identifier}
                                onChange={(e) => setIdentifier(e.target.value)}
                                required
                                placeholder="Register Number or Email"
                                style={{
                                    width: '100%',
                                    padding: '14px',
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
                            {loading ? 'Sending...' : 'Send Reset Link'}
                        </button>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default ForgotPasswordPage;
