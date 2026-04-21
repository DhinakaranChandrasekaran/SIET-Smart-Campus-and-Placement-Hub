import api from './api';

/**
 * Admin Service
 * API calls for admin panel operations
 */
const adminService = {
    /**
     * Get dashboard statistics
     */
    getDashboardStats: async () => {
        const response = await api.get('/admin/dashboard');
        return response.data;
    },

    /**
     * Get analytics data for charts
     */
    getAnalytics: async () => {
        const response = await api.get('/admin/analytics');
        return response.data;
    },

    /**
     * Get all students for management
     */
    getAllStudents: async () => {
        const response = await api.get('/admin/students');
        return response.data;
    },

    /**
     * Update student directly
     */
    updateStudent: async (regNo, data) => {
        const response = await api.put(`/admin/students/${regNo}`, data);
        return response.data;
    },

    /**
     * Delete student
     */
    deleteStudent: async (regNo) => {
        const response = await api.delete(`/admin/students/${regNo}`);
        return response.data;
    },

    /**
     * Get all update requests
     */
    getAllUpdateRequests: async () => {
        const response = await api.get('/update-requests');
        return response.data;
    },

    /**
     * Get pending update requests
     */
    getPendingUpdateRequests: async () => {
        const response = await api.get('/update-requests/pending');
        return response.data;
    },

    /**
     * Get update request by ID
     */
    getUpdateRequestById: async (id) => {
        const response = await api.get(`/update-requests/${id}`);
        return response.data;
    },

    /**
     * Approve update request
     */
    approveUpdateRequest: async (id, reviewedBy, comments) => {
        const response = await api.put(`/update-requests/${id}/approve`, {
            reviewedBy,
            comments,
        });
        return response.data;
    },

    /**
     * Reject update request
     */
    rejectUpdateRequest: async (id, reviewedBy, comments) => {
        const response = await api.put(`/update-requests/${id}/reject`, {
            reviewedBy,
            comments,
        });
        return response.data;
    },
};

export default adminService;
