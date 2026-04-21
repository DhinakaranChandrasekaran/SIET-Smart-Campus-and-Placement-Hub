import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';
import adminService from '../../services/adminService';
import authService from '../../services/authService';
import SIETLoader from '../../components/SIETLoader';

/**
 * AdminUpdateRequestDetail Page
 * Review individual update request with approve/reject actions
 */
const AdminUpdateRequestDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [request, setRequest] = useState(null);
    const [submittedData, setSubmittedData] = useState(null);
    const [comments, setComments] = useState('');
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);

    // Modal states
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState(''); // 'approve', 'reject', 'success'
    const [modalMessage, setModalMessage] = useState('');

    useEffect(() => {
        const fetchRequest = async () => {
            try {
                setLoading(true);
                const allRequests = await adminService.getAllUpdateRequests();
                const found = allRequests.find((r) => r.id === parseInt(id));
                if (found) {
                    setRequest(found);
                    if (found.submittedData) {
                        try {
                            setSubmittedData(JSON.parse(found.submittedData));
                        } catch (e) {
                            console.error('Error parsing submitted data:', e);
                        }
                    }
                }
            } catch (error) {
                console.error('Error fetching request:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRequest();
    }, [id]);

    const openConfirmModal = (type) => {
        if (type === 'reject' && !comments.trim()) {
            // Show toast-like message for 3 seconds
            setModalType('toast');
            setModalMessage('Please provide a reason for rejection');
            setShowModal(true);
            setTimeout(() => {
                setShowModal(false);
            }, 3000);
            return;
        }
        setModalType(type);
        setModalMessage(type === 'approve'
            ? 'Are you sure you want to approve this request?'
            : 'Are you sure you want to reject this request?'
        );
        setShowModal(true);
    };

    const handleConfirmAction = async () => {
        try {
            setProcessing(true);
            const user = authService.getCurrentUser();

            if (modalType === 'approve') {
                await adminService.approveUpdateRequest(id, user?.email || 'Admin', comments);
                setModalType('success');
                setModalMessage('Request approved successfully!');
            } else {
                await adminService.rejectUpdateRequest(id, user?.email || 'Admin', comments);
                setModalType('success');
                setModalMessage('Request has been rejected');
            }

            // Auto close after 3 seconds and redirect
            setTimeout(() => {
                setShowModal(false);
                navigate('/admin/update-requests');
            }, 3000);

        } catch (error) {
            console.error('Error processing request:', error);
            setModalType('toast');
            setModalMessage('Failed to process request');
            setTimeout(() => {
                setShowModal(false);
            }, 3000);
        } finally {
            setProcessing(false);
        }
    };

    const renderDataSection = (title, data) => {
        if (!data || (Array.isArray(data) && data.length === 0)) return null;

        return (
            <div className="admin-card" style={{ marginBottom: '16px' }}>
                <h4 style={{ color: '#0A8F47', marginBottom: '12px' }}>{title}</h4>
                {Array.isArray(data) ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {data.map((item, idx) => (
                            <div key={idx} style={{
                                background: '#f8fdf8',
                                padding: '12px',
                                borderRadius: '6px',
                                color: '#333',
                                border: '1px solid #e8f5e9'
                            }}>
                                {typeof item === 'object' ? (
                                    Object.entries(item).map(([key, value]) => (
                                        <div key={key} style={{ marginBottom: '4px' }}>
                                            <strong style={{ color: '#555' }}>{key}:</strong>{' '}
                                            <span>{String(value)}</span>
                                        </div>
                                    ))
                                ) : (
                                    <span>{String(item)}</span>
                                )}
                            </div>
                        ))}
                    </div>
                ) : typeof data === 'object' ? (
                    <div style={{ color: '#333' }}>
                        {Object.entries(data).map(([key, value]) => (
                            <div key={key} style={{ marginBottom: '8px' }}>
                                <strong style={{ color: '#555' }}>{key}:</strong>{' '}
                                <span>{String(value)}</span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p style={{ color: '#333' }}>{String(data)}</p>
                )}
            </div>
        );
    };

    // Modal Component
    const Modal = () => {
        if (!showModal) return null;

        const isSuccess = modalType === 'success';
        const isToast = modalType === 'toast';

        // Toast notification (auto-close, no buttons, centered)
        if (isToast) {
            return (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 9999,
                }}>
                    <div style={{
                        background: '#fff',
                        borderRadius: '8px',
                        padding: '32px',
                        textAlign: 'center',
                        maxWidth: '350px',
                    }}>
                        <p style={{ color: '#333', fontSize: '16px', margin: 0 }}>
                            {modalMessage}
                        </p>
                    </div>
                </div>
            );
        }

        // Success notification (auto-close, no buttons)
        if (isSuccess) {
            return (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 9999,
                }}>
                    <div style={{
                        background: '#fff',
                        borderRadius: '8px',
                        padding: '32px',
                        textAlign: 'center',
                        maxWidth: '350px',
                    }}>
                        <p style={{ color: '#333', fontSize: '16px', margin: 0 }}>
                            {modalMessage}
                        </p>
                    </div>
                </div>
            );
        }

        // Confirmation modal
        return (
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 9999,
            }}>
                <div style={{
                    background: '#fff',
                    borderRadius: '8px',
                    padding: '24px',
                    maxWidth: '400px',
                    width: '90%',
                }}>
                    <h3 style={{
                        color: '#333',
                        marginTop: 0,
                        marginBottom: '16px',
                        fontSize: '18px'
                    }}>
                        Confirm {modalType === 'approve' ? 'Approval' : 'Rejection'}
                    </h3>

                    <p style={{ color: '#555', marginBottom: '24px', lineHeight: 1.5 }}>
                        {modalMessage}
                    </p>

                    <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                        <button
                            onClick={() => setShowModal(false)}
                            disabled={processing}
                            style={{
                                padding: '10px 20px',
                                background: '#fff',
                                border: '1px solid #ddd',
                                borderRadius: '6px',
                                color: '#333',
                                fontSize: '14px',
                                cursor: 'pointer',
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleConfirmAction}
                            disabled={processing}
                            style={{
                                padding: '10px 20px',
                                background: modalType === 'approve' ? '#0A8F47' : '#d32f2f',
                                border: 'none',
                                borderRadius: '6px',
                                color: '#fff',
                                fontSize: '14px',
                                cursor: processing ? 'not-allowed' : 'pointer',
                                opacity: processing ? 0.7 : 1,
                            }}
                        >
                            {processing ? 'Processing...' : 'Yes'}
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    if (loading) {
        return <SIETLoader />;
    }

    if (!request) {
        return (
            <AdminLayout>
                <div className="admin-empty">
                    <p>Request not found</p>
                    <button onClick={() => navigate('/admin/update-requests')} className="admin-btn admin-btn-primary">
                        Back to Requests
                    </button>
                </div>
            </AdminLayout>
        );
    }

    const isPending = request.status === 'pending';

    return (
        <AdminLayout>
            <Modal />

            <div className="admin-page-header">
                <h1 className="admin-page-title">Update Request #{request.id}</h1>
                <p className="admin-page-subtitle">Review student profile update submission</p>
            </div>

            {/* Request Info Card */}
            <div className="admin-card" style={{ marginBottom: '24px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                    <div>
                        <p style={{ color: '#666', marginBottom: '4px', fontSize: '14px' }}>Student Name</p>
                        <p style={{ color: '#333', fontSize: '16px', fontWeight: 600, margin: 0 }}>{request.studentName}</p>
                    </div>
                    <div>
                        <p style={{ color: '#666', marginBottom: '4px', fontSize: '14px' }}>Register Number</p>
                        <p style={{ color: '#333', fontSize: '16px', fontWeight: 600, margin: 0 }}>{request.studentRegNo}</p>
                    </div>
                    <div>
                        <p style={{ color: '#666', marginBottom: '4px', fontSize: '14px' }}>Submitted On</p>
                        <p style={{ color: '#333', fontSize: '16px', fontWeight: 600, margin: 0 }}>
                            {new Date(request.submittedOn).toLocaleString('en-IN')}
                        </p>
                    </div>
                    <div>
                        <p style={{ color: '#666', marginBottom: '4px', fontSize: '14px' }}>Status</p>
                        <span className={`admin-badge admin-badge-${request.status}`}>
                            {request.status}
                        </span>
                    </div>
                </div>

                {request.reviewedBy && (
                    <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #e8f5e9' }}>
                        <p style={{ color: '#666', marginBottom: '8px', fontSize: '14px' }}>
                            Reviewed by: <strong style={{ color: '#333' }}>{request.reviewedBy}</strong>
                            {request.reviewedOn && ` on ${new Date(request.reviewedOn).toLocaleString('en-IN')}`}
                        </p>
                        {request.reviewComments && (
                            <p style={{ color: '#333', margin: 0 }}>
                                Comments: {request.reviewComments}
                            </p>
                        )}
                    </div>
                )}
            </div>

            {/* Submitted Data */}
            <div className="admin-card" style={{ marginBottom: '24px' }}>
                <h3 style={{ color: '#2e7d32', marginBottom: '20px' }}>Submitted Changes</h3>

                {submittedData ? (
                    <div>
                        {submittedData.sslc && renderDataSection('SSLC Details', submittedData.sslc)}
                        {submittedData.hsc && renderDataSection('HSC Details', submittedData.hsc)}
                        {submittedData.ugDegree && renderDataSection('UG Degree', submittedData.ugDegree)}
                        {submittedData.sgpa && renderDataSection('SGPA', submittedData.sgpa)}
                        {submittedData.projects && submittedData.projects.length > 0 &&
                            renderDataSection('Projects', submittedData.projects)}
                        {submittedData.publications && submittedData.publications.length > 0 &&
                            renderDataSection('Publications', submittedData.publications)}
                        {submittedData.patents && submittedData.patents.length > 0 &&
                            renderDataSection('Patents', submittedData.patents)}
                        {submittedData.certifications && submittedData.certifications.length > 0 &&
                            renderDataSection('Certifications', submittedData.certifications)}
                        {submittedData.extracurricular && submittedData.extracurricular.length > 0 &&
                            renderDataSection('Extracurricular Activities', submittedData.extracurricular)}
                        {submittedData.cocurricular && submittedData.cocurricular.length > 0 &&
                            renderDataSection('Co-curricular Activities', submittedData.cocurricular)}
                        {submittedData.socialLinks && renderDataSection('Social Links', submittedData.socialLinks)}
                    </div>
                ) : (
                    <p style={{ color: '#888' }}>No data to display</p>
                )}
            </div>

            {/* Action Section */}
            {isPending && (
                <div className="admin-card">
                    <h3 style={{ color: '#2e7d32', marginBottom: '16px' }}>Take Action</h3>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ color: '#555', display: 'block', marginBottom: '6px', fontSize: '14px' }}>
                            Comments (required for rejection)
                        </label>
                        <textarea
                            value={comments}
                            onChange={(e) => setComments(e.target.value)}
                            placeholder="Enter your comments here..."
                            style={{
                                width: '100%',
                                minHeight: '100px',
                                padding: '10px 12px',
                                borderRadius: '6px',
                                border: '1px solid #ddd',
                                background: '#fff',
                                color: '#333',
                                fontSize: '14px',
                                resize: 'vertical',
                                boxSizing: 'border-box',
                                fontFamily: 'inherit',
                            }}
                        />
                    </div>

                    <div style={{ display: 'flex', gap: '12px' }}>
                        <button
                            onClick={() => openConfirmModal('approve')}
                            className="admin-btn admin-btn-success"
                        >
                            Approve
                        </button>
                        <button
                            onClick={() => openConfirmModal('reject')}
                            className="admin-btn admin-btn-danger"
                        >
                            Reject
                        </button>
                        <button
                            onClick={() => navigate('/admin/update-requests')}
                            className="admin-btn admin-btn-outline"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

        </AdminLayout>
    );
};

export default AdminUpdateRequestDetail;
