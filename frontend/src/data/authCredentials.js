import authService from '../services/authService';

/**
 * Authentication Credentials
 * Students login with REGISTER NUMBER
 * Admins/Faculty/HOD/Officers login with EMAIL (@siet.ac.in)
 * Uses sessionStorage for session-based auth
 */

/**
 * Validate student login using register number
 */
export const validateStudent = async (regNo, password) => {
    try {
        const response = await authService.login(regNo, password);

        if (response && response.token && response.role === 'STUDENT') {
            sessionStorage.setItem('token', response.token);

            const userData = {
                regNo: response.registerNumber || response.identifier,
                email: response.identifier.includes('@') ? response.identifier : '',
                name: response.name,
                role: 'student',
                token: response.token,
                department: response.department,
                photoPath: response.photoPath,
                academicYear: response.academicYear
            };

            sessionStorage.setItem('user', JSON.stringify(userData));
            return userData;
        }

        return null;
    } catch (error) {
        console.error('Student login error:', error);
        throw error;
    }
};

/**
 * Validate admin/faculty/HOD/officer login using email
 */
export const validateAdmin = async (email, password) => {
    try {
        const response = await authService.login(email, password);

        if (response && response.token) {
            sessionStorage.setItem('token', response.token);

            const userData = {
                email: response.identifier,
                name: response.name,
                role: response.role.toLowerCase(), // 'admin', 'hod', 'faculty', 'placement_officer', 'trainer'
                token: response.token
            };

            sessionStorage.setItem('user', JSON.stringify(userData));
            return userData;
        }

        return null;
    } catch (error) {
        console.error('Admin login error:', error);
        throw error;
    }
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = () => {
    const token = sessionStorage.getItem('token');
    const user = sessionStorage.getItem('user');
    return !!(token && user);
};

/**
 * Get current user from sessionStorage
 */
export const getCurrentUser = () => {
    const userStr = sessionStorage.getItem('user');
    if (userStr) {
        try {
            return JSON.parse(userStr);
        } catch (e) {
            return null;
        }
    }
    return null;
};

/**
 * Logout user
 */
export const logoutUser = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
};

/**
 * Get user role
 */
export const getUserRole = () => {
    const user = getCurrentUser();
    return user?.role || null;
};

/**
 * Check if current user is admin
 */
export const isAdmin = () => {
    const role = getUserRole();
    return role === 'admin' || role === 'hod' || role === 'principal' || role === 'faculty' || role === 'placement_officer' || role === 'trainer' || role === 'dean';
};

/**
 * Check if current user is student
 */
export const isStudent = () => {
    const role = getUserRole();
    return role === 'student';
};
