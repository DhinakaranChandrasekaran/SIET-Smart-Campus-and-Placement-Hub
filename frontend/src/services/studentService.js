import api from './api';

const studentService = {
    /**
     * Get all students
     */
    getAllStudents: async () => {
        const response = await api.get('/students');
        return response.data;
    },

    /**
     * Get student by register number
     */
    getStudentByRegNo: async (regNo) => {
        const response = await api.get(`/students/${regNo}`);
        return response.data;
    },

    /**
     * Get students by department
     */
    getStudentsByDepartment: async (department) => {
        const response = await api.get(`/students/department/${department}`);
        return response.data;
    },

    /**
     * Get students by year
     */
    getStudentsByYear: async (year) => {
        const response = await api.get(`/students/year/${year}`);
        return response.data;
    },

    /**
     * Get students by training batch
     */
    getStudentsByTrainingBatch: async (batch) => {
        const response = await api.get(`/students/training/${batch}`);
        return response.data;
    },

    /**
     * Search students by name
     */
    searchStudents: async (name) => {
        const response = await api.get(`/students/search?name=${encodeURIComponent(name)}`);
        return response.data;
    },

    /**
     * Get batches with status (Completed, Ongoing, Upcoming)
     */
    getBatchesWithStatus: async () => {
        const response = await api.get('/students/batches-with-status');
        return response.data;
    },

    /**
     * Get all training batches (Java, Python, etc.)
     */
    getTrainingBatches: async () => {
        const response = await api.get('/students/training-batches');
        return response.data;
    },

    /**
     * Get filter options for shortlisting
     */
    getFilterOptions: async () => {
        const response = await api.get('/students/filter-options');
        return response.data;
    },

    /**
     * Filter students (server-side)
     */
    filterStudents: async (filters) => {
        const response = await api.post('/students/filter', filters);
        return response.data;
    },
};

export default studentService;
