import api from './api';

const placementService = {
    /**
     * Get all placement records
     */
    getAllRecords: async () => {
        const response = await api.get('/placements/records');
        return response.data;
    },

    /**
     * Get placement records by batch
     */
    getRecordsByBatch: async (batch) => {
        const response = await api.get(`/placements/records/batch/${batch}`);
        return response.data;
    },

    /**
     * Get placement records by department
     */
    getRecordsByDepartment: async (department) => {
        const response = await api.get(`/placements/records/department/${department}`);
        return response.data;
    },

    /**
     * Get placement records by company
     */
    getRecordsByCompany: async (company) => {
        const response = await api.get(`/placements/records/company/${company}`);
        return response.data;
    },

    /**
     * Get placement statistics
     */
    getStats: async () => {
        const response = await api.get('/placements/stats');
        return response.data;
    },

    /**
     * Get placement statistics by batch
     */
    getStatsByBatch: async (batch) => {
        const response = await api.get(`/placements/stats/batch/${batch}`);
        return response.data;
    },

    /**
     * Get placement statistics by department
     */
    getStatsByDepartment: async (department) => {
        const response = await api.get(`/placements/stats/department/${department}`);
        return response.data;
    },

    /**
     * Get all placement officers
     */
    getOfficers: async () => {
        const response = await api.get('/placements/officers');
        return response.data;
    },

    /**
     * Get placement officer heads only
     */
    getHeads: async () => {
        const response = await api.get('/placements/officers/heads');
        return response.data;
    },

    /**
     * Get placement officer trainers only
     */
    getTrainers: async () => {
        const response = await api.get('/placements/officers/trainers');
        return response.data;
    },

    /**
     * Get all recruiters
     */
    getRecruiters: async () => {
        const response = await api.get('/recruiters');
        return response.data;
    },

    /**
     * Get recruiters by year
     */
    getRecruitersByYear: async (year) => {
        const response = await api.get(`/recruiters/year/${year}`);
        return response.data;
    },

    /**
     * Get today's placement drive
     */
    getTodayDrive: async () => {
        const response = await api.get('/placements/today-drive');
        return response.data;
    },
};

export default placementService;