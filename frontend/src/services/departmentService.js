import api from './api';

const departmentService = {
    /**
     * Get all departments
     */
    getAllDepartments: async () => {
        const response = await api.get('/departments');
        return response.data;
    },

    /**
     * Get department by code
     */
    getDepartmentByCode: async (code) => {
        const response = await api.get(`/departments/${code}`);
        return response.data;
    },

    /**
     * Get all faculty
     */
    getAllFaculty: async () => {
        const response = await api.get('/faculty');
        return response.data;
    },

    /**
     * Get faculty by department code
     */
    getFacultyByDepartment: async (code) => {
        const response = await api.get(`/faculty/department/${code}`);
        return response.data;
    },
};

export default departmentService;