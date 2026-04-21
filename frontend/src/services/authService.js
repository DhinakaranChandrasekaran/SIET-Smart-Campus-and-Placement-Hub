import api from './api';

const authService = {
    /**
     * Login user (student, admin, faculty, HOD, officer, trainer)
     */
    login: async (identifier, password) => {
        try {
            const response = await api.post('/auth/login', {
                identifier,
                password,
            });

            // Store token and user data in sessionStorage
            if (response.data.token) {
                sessionStorage.setItem('token', response.data.token);
                sessionStorage.setItem('user', JSON.stringify(response.data.user));
            }

            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'Login failed';
        }
    },

    /**
     * Logout user
     */
    logout: () => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
    },

    /**
     * Get current user from sessionStorage
     */
    getCurrentUser: () => {
        const userStr = sessionStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    },

    /**
     * Check if user is authenticated
     */
    isAuthenticated: () => {
        return !!sessionStorage.getItem('token');
    },
};

export default authService;
