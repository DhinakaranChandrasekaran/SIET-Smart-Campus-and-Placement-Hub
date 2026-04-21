import axios from 'axios';
import api from './api';

const fileService = {
    /**
     * Upload file to temp folder
     */
    uploadTempFile: async (file, registerNumber, category) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('registerNumber', registerNumber);
        formData.append('category', category);

        const token = sessionStorage.getItem('token');
        const response = await axios.post(`${api.defaults.baseURL}/files/temp/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: token ? `Bearer ${token}` : '',
            },
        });

        return response.data;
    },

    /**
     * Upload file to approved folder
     */
    uploadApprovedFile: async (file, registerNumber, category) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('registerNumber', registerNumber);
        formData.append('category', category);

        const token = sessionStorage.getItem('token');
        const response = await axios.post(`${api.defaults.baseURL}/files/approved/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: token ? `Bearer ${token}` : '',
            },
        });

        return response.data;
    },

    /**
     * Download file
     */
    downloadFile: async (filePath) => {
        const token = sessionStorage.getItem('token');
        const response = await axios.get(`${api.defaults.baseURL}/files/download?path=${encodeURIComponent(filePath)}`, {
            headers: {
                Authorization: token ? `Bearer ${token}` : '',
            },
            responseType: 'blob',
        });

        return response.data;
    },

    /**
     * Delete file
     */
    deleteFile: async (filePath) => {
        const token = sessionStorage.getItem('token');
        const response = await axios.delete(`${api.defaults.baseURL}/files?path=${encodeURIComponent(filePath)}`, {
            headers: {
                Authorization: token ? `Bearer ${token}` : '',
            },
        });

        return response.data;
    },

    /**
     * Check if file exists
     */
    fileExists: async (filePath) => {
        const token = sessionStorage.getItem('token');
        const response = await axios.get(`${api.defaults.baseURL}/files/exists?path=${encodeURIComponent(filePath)}`, {
            headers: {
                Authorization: token ? `Bearer ${token}` : '',
            },
        });

        return response.data.exists;
    },
};

export default fileService;