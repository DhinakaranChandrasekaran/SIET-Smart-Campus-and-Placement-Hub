import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
import api from '../../services/api';
import { getImageUrl } from '../../utils/imageUtils';

/**
 * AdminDataManagement Page
 * Data entry forms aligned with backend entities - ALL fields including images
 */
const AdminDataManagement = () => {
    const [activeModule, setActiveModule] = useState(null);
    const [formData, setFormData] = useState({});
    const [photoFile, setPhotoFile] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [showPopup, setShowPopup] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    // Dynamic data from backend
    const [departments, setDepartments] = useState([]);
    const [departmentMap, setDepartmentMap] = useState({}); // Map of name -> code and code -> name
    const [batches, setBatches] = useState([]);

    // Fetch departments and batches from backend
    useEffect(() => {
        const fetchDropdownData = async () => {
            try {
                // Fetch departments
                const deptResponse = await api.get('/departments');
                if (deptResponse.status === 200) {
                    const deptData = deptResponse.data;
                    // Create mapping of code <-> name for department lookup
                    const mapping = {};
                    deptData.forEach(d => {
                        if (d.code && d.name) {
                            mapping[d.code.toUpperCase()] = d.name.toUpperCase();
                            mapping[d.name.toUpperCase()] = d.code.toUpperCase();
                        }
                    });
                    setDepartmentMap(mapping);
                    // Use full names in dropdown (students are stored with full names)
                    const deptNames = deptData.map(d => d.name?.toUpperCase()).filter(Boolean);
                    setDepartments(deptNames.length > 0 ? deptNames : ['COMPUTER SCIENCE AND ENGINEERING', 'ELECTRONICS AND COMMUNICATION ENGINEERING', 'ELECTRICAL AND ELECTRONICS ENGINEERING', 'MECHANICAL ENGINEERING', 'CIVIL ENGINEERING']);
                }

                // Fetch batches
                const batchResponse = await api.get('/students/batches');
                if (batchResponse.status === 200) {
                    const batchData = batchResponse.data;
                    setBatches(batchData.length > 0 ? batchData : ['2021-2025', '2022-2026', '2023-2027', '2024-2028']);
                }
            } catch (error) {
                console.error('Failed to fetch dropdown data:', error);
                // Fallback to defaults if API fails
                setDepartments(['COMPUTER SCIENCE AND ENGINEERING', 'ELECTRONICS AND COMMUNICATION ENGINEERING', 'ELECTRICAL AND ELECTRONICS ENGINEERING', 'MECHANICAL ENGINEERING', 'CIVIL ENGINEERING']);
                setBatches(['2021-2025', '2022-2026', '2023-2027', '2024-2028']);
            }
        };
        fetchDropdownData();
    }, []);

    // Handle browser back button - when in form, go back to module selection
    useEffect(() => {
        // Only set up popstate handler when a module is active
        if (!activeModule) return;

        // Push a state when entering a form so back button can return to module list
        window.history.pushState({ inForm: true }, '', window.location.pathname);

        const handlePopState = (e) => {
            // Only handle if we pushed a state (user clicked back from form)
            if (e.state?.inForm === undefined) {
                // User is navigating back from form to module selection
                setActiveModule(null);
            }
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, [activeModule]);

    const dataModules = [
        // ==================== STUDENT ====================
        {
            id: 'student',
            label: 'Add Student',
            description: 'Add new student (personal details)',
            endpoint: '/api/admin/students',
            fields: [
                { name: 'registerNumber', label: 'Register Number', type: 'text', required: true, placeholder: '714023104020' },
                { name: 'name', label: 'Full Name', type: 'text', required: true, placeholder: 'Arun Kumar S' },
                { name: 'email', label: 'Email', type: 'email', required: true, placeholder: 'arun.kumar@siet.ac.in' },
                { name: 'phone', label: 'Mobile', type: 'text', placeholder: '9876543210' },
                { name: 'department', label: 'Department', type: 'select', required: true, options: departments },
                { name: 'academicYear', label: 'Batch', type: 'select', required: true, options: batches },
                { name: 'dateOfBirth', label: 'Date of Birth', type: 'date' },
                { name: 'bloodGroup', label: 'Blood Group', type: 'select', options: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] },
                { name: 'photoPath', label: 'Photo', type: 'file', accept: 'image/*', uploadType: 'students', uploadIdField: 'registerNumber' },
                { name: 'address', label: 'Address', type: 'textarea', placeholder: 'No. 12, Gandhi Street, Chennai - 600001' },
            ]
        },
        // ==================== PLACEMENT RECORD ====================
        {
            id: 'placement',
            label: 'Add Placement Record',
            description: 'Record student placement',
            endpoint: '/api/admin/placement-records',
            fields: [
                { name: 'studentRegNo', label: 'Register Number', type: 'text', required: true, placeholder: '714023104020' },
                { name: 'company', label: 'Company', type: 'text', required: true, placeholder: 'Infosys' },
                { name: 'jobRole', label: 'Job Role', type: 'text', required: true, placeholder: 'Systems Engineer' },
                { name: 'packageAmount', label: 'Package (LPA)', type: 'number', required: true, placeholder: '3.6' },
                { name: 'batch', label: 'Batch', type: 'select', required: true, options: batches },
            ]
        },
        // ==================== HOD ====================
        {
            id: 'hod',
            label: 'Add/Update HOD',
            description: 'Set HOD for a department',
            endpoint: '/api/admin/hod',
            fields: [
                { name: 'departmentCode', label: 'Department', type: 'select', required: true, options: departments },
                { name: 'hodName', label: 'HOD Name', type: 'text', required: true, placeholder: 'Dr. Ramesh Babu K' },
                { name: 'hodDesignation', label: 'Designation', type: 'text', required: true, placeholder: 'Professor & Head' },
                { name: 'hodJoiningYear', label: 'Joining Year', type: 'number', placeholder: '2010' },
                { name: 'hodPhotoPath', label: 'Photo', type: 'file', accept: 'image/*', uploadType: 'faculty', uploadIdField: 'hodName' },
                { name: 'hodDescription', label: 'Personal Profile', type: 'textarea', placeholder: 'A dedicated academician with expertise in...' },
                { name: 'hodAcademicBackground', label: 'Academic Background', type: 'textarea', placeholder: 'One degree per line. E.g:\nPh.D in Computer Science from IIT Madras (2008)\nM.Tech in Software Engineering from Anna University (2003)' },
                { name: 'hodExperience', label: 'Professional Experience', type: 'textarea', placeholder: 'Format: Title | Period | Description (one per line). E.g:\nProfessor & HOD, SIET | 2015 - Present | Leading research and teaching\nAssociate Professor | 2010 - 2015 | Research in AI' },
                { name: 'hodSummary', label: 'Summary', type: 'textarea', placeholder: 'Published 50+ papers in reputed journals' },
            ]
        },
        // ==================== FACULTY ====================
        {
            id: 'faculty',
            label: 'Add Faculty',
            description: 'Add faculty member',
            endpoint: '/api/admin/faculty',
            fields: [
                { name: 'departmentCode', label: 'Department', type: 'select', required: true, options: departments },
                { name: 'name', label: 'Full Name', type: 'text', required: true, placeholder: 'Dr. Priya Venkatesh' },
                { name: 'position', label: 'Position', type: 'select', required: true, options: ['Professor', 'Associate Professor', 'Assistant Professor', 'Lecturer'] },
                { name: 'joiningYear', label: 'Joining Year', type: 'number', placeholder: '2012' },
                { name: 'photoPath', label: 'Photo', type: 'file', accept: 'image/*', uploadType: 'faculty', uploadIdField: 'name' },
                { name: 'displayOrder', label: 'Display Order', type: 'number', placeholder: '1' },
            ]
        },
        // ==================== PLACEMENT HEAD ====================
        {
            id: 'placementHead',
            label: 'Add Placement Head',
            description: 'Add placement head',
            endpoint: '/api/admin/placement-officers',
            fields: [
                { name: 'name', label: 'Name', type: 'text', required: true, placeholder: 'Mr. Suresh Kumar' },
                { name: 'position', label: 'Designation', type: 'text', required: true, placeholder: 'Training & Placement Officer' },
                { name: 'photoPath', label: 'Photo', type: 'file', accept: 'image/*', uploadType: 'officers', uploadIdField: 'name' },
                { name: 'type', label: 'Type', type: 'hidden', defaultValue: 'HEAD' },
                { name: 'displayOrder', label: 'Display Order', type: 'number', placeholder: '1' },
            ]
        },
        // ==================== PLACEMENT TRAINER ====================
        {
            id: 'placementTrainer',
            label: 'Add Placement Trainer',
            description: 'Add placement trainer',
            endpoint: '/api/admin/placement-officers',
            fields: [
                { name: 'name', label: 'Name', type: 'text', required: true, placeholder: 'Mrs. Lakshmi R' },
                { name: 'position', label: 'Specialization', type: 'text', required: true, placeholder: 'Soft Skills & Communication' },
                { name: 'photoPath', label: 'Photo', type: 'file', accept: 'image/*', uploadType: 'officers', uploadIdField: 'name' },
                { name: 'type', label: 'Type', type: 'hidden', defaultValue: 'TRAINER' },
                { name: 'trainingBatch', label: 'Training Batch', type: 'text', placeholder: '2021-2025' },
                { name: 'displayOrder', label: 'Display Order', type: 'number', placeholder: '1' },
            ]
        },
        // ==================== COMPANY (Recruiter) ====================
        {
            id: 'company',
            label: 'Add Company',
            description: 'Register recruiting company',
            endpoint: '/api/admin/recruiters',
            fields: [
                { name: 'companyName', label: 'Company Name', type: 'text', required: true, placeholder: 'Wipro Technologies' },
                { name: 'industry', label: 'Industry', type: 'text', placeholder: 'IT Services' },
                { name: 'avgPackage', label: 'Avg Package', type: 'text', placeholder: '4.0 LPA' },
                { name: 'year', label: 'Year', type: 'number', placeholder: '2024' },
                { name: 'logoPath', label: 'Logo URL', type: 'text', placeholder: '/images/companies/wipro.png' },
            ]
        },
        // ==================== PLACEMENT DRIVE ====================
        {
            id: 'drive',
            label: 'Add Placement Drive',
            description: 'Schedule placement drive',
            endpoint: '/api/admin/placement-drives',
            fields: [
                { name: 'companyName', label: 'Company Name', type: 'text', required: true, placeholder: 'Cognizant' },
                { name: 'driveDate', label: 'Drive Date', type: 'date', required: true },
                { name: 'venue', label: 'Venue', type: 'text', required: true, placeholder: 'Main Auditorium' },
                { name: 'packageOffered', label: 'Package Offered', type: 'text', placeholder: '3.5 - 5.0 LPA' },
                { name: 'reportingTime', label: 'Reporting Time', type: 'text', placeholder: '08:30 AM' },
                { name: 'imagePath', label: 'Image URL', type: 'text', placeholder: '/images/drives/cognizant-drive.jpg' },
            ]
        },
    ];

    // Update Modules - for updating existing records (same order as Add Records)
    const updateModules = [
        // ==================== UPDATE STUDENT ====================
        {
            id: 'updateStudent',
            label: 'Update Student',
            description: 'Update existing student details',
            endpoint: '/api/admin/students',
            method: 'PUT',
            searchField: 'registerNumber',
            searchLabel: 'Register Number',
            searchPlaceholder: '714023104020',
            isUpdate: true,
            fields: [
                { name: 'registerNumber', label: 'Register Number', type: 'text', required: true, placeholder: '714023104020', disabled: true },
                { name: 'name', label: 'Full Name', type: 'text', required: true, placeholder: 'Arun Kumar S' },
                { name: 'email', label: 'Email', type: 'email', required: true, placeholder: 'arun.kumar@siet.ac.in' },
                { name: 'phone', label: 'Mobile', type: 'text', placeholder: '9876543210' },
                { name: 'department', label: 'Department', type: 'select', required: true, options: departments },
                { name: 'academicYear', label: 'Batch', type: 'select', required: true, options: batches },
                { name: 'dateOfBirth', label: 'Date of Birth', type: 'date' },
                { name: 'bloodGroup', label: 'Blood Group', type: 'select', options: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] },
                { name: 'photoPath', label: 'Photo', type: 'file', accept: 'image/*', uploadType: 'students', uploadIdField: 'registerNumber' },
                { name: 'address', label: 'Address', type: 'textarea', placeholder: 'No. 12, Gandhi Street, Chennai - 600001' },
            ]
        },
        // ==================== UPDATE PLACEMENT RECORD ====================
        {
            id: 'updatePlacement',
            label: 'Update Placement Record',
            description: 'Update placement record details',
            endpoint: '/api/admin/placement-records',
            method: 'PUT',
            searchField: 'studentRegNo',
            searchLabel: 'Register Number',
            searchPlaceholder: '714023104020',
            isUpdate: true,
            fields: [
                { name: 'id', label: 'Placement ID', type: 'text', required: true, disabled: true },
                { name: 'studentRegNo', label: 'Register Number', type: 'text', required: true, placeholder: '714023104020', disabled: true },
                { name: 'company', label: 'Company', type: 'text', required: true, placeholder: 'Infosys' },
                { name: 'jobRole', label: 'Job Role', type: 'text', required: true, placeholder: 'Systems Engineer' },
                { name: 'packageAmount', label: 'Package (LPA)', type: 'number', required: true, placeholder: '3.6' },
                { name: 'batch', label: 'Batch', type: 'select', required: true, options: batches },
            ]
        },
        // ==================== UPDATE HOD ====================
        {
            id: 'updateHod',
            label: 'Update HOD',
            description: 'Update HOD details for a department',
            endpoint: '/api/admin/hod',
            method: 'PUT',
            searchField: 'departmentCode',
            searchLabel: 'Department',
            searchType: 'select',
            searchOptions: departments,
            isUpdate: true,
            fields: [
                { name: 'departmentCode', label: 'Department', type: 'select', required: true, options: departments, disabled: true },
                { name: 'hodName', label: 'HOD Name', type: 'text', required: true, placeholder: 'Dr. Ramesh Babu K' },
                { name: 'hodDesignation', label: 'Designation', type: 'text', required: true, placeholder: 'Professor & Head' },
                { name: 'hodJoiningYear', label: 'Joining Year', type: 'number', placeholder: '2010' },
                { name: 'hodPhotoPath', label: 'Photo', type: 'file', accept: 'image/*', uploadType: 'faculty', uploadIdField: 'hodName' },
                { name: 'hodDescription', label: 'Personal Profile', type: 'textarea', placeholder: 'A dedicated academician with expertise in...' },
                { name: 'hodAcademicBackground', label: 'Academic Background', type: 'textarea', placeholder: 'One degree per line. E.g:\nPh.D in Computer Science from IIT Madras (2008)\nM.Tech in Software Engineering from Anna University (2003)' },
                { name: 'hodExperience', label: 'Professional Experience', type: 'textarea', placeholder: 'Format: Title | Period | Description (one per line). E.g:\nProfessor & HOD, SIET | 2015 - Present | Leading research and teaching\nAssociate Professor | 2010 - 2015 | Research in AI' },
                { name: 'hodSummary', label: 'Summary', type: 'textarea', placeholder: 'Published 50+ papers in reputed journals' },
            ]
        },
        // ==================== UPDATE FACULTY ====================
        {
            id: 'updateFaculty',
            label: 'Update Faculty',
            description: 'Update faculty member details',
            endpoint: '/api/admin/faculty',
            method: 'PUT',
            searchField: 'id',
            searchLabel: 'Faculty ID',
            searchPlaceholder: '1',
            isUpdate: true,
            fields: [
                { name: 'id', label: 'Faculty ID', type: 'text', required: true, disabled: true },
                { name: 'departmentCode', label: 'Department', type: 'select', required: true, options: departments },
                { name: 'name', label: 'Full Name', type: 'text', required: true, placeholder: 'Dr. Priya Venkatesh' },
                { name: 'position', label: 'Position', type: 'select', required: true, options: ['Professor', 'Associate Professor', 'Assistant Professor', 'Lecturer'] },
                { name: 'joiningYear', label: 'Joining Year', type: 'number', placeholder: '2012' },
                { name: 'photoPath', label: 'Photo', type: 'file', accept: 'image/*', uploadType: 'faculty', uploadIdField: 'name' },
                { name: 'displayOrder', label: 'Display Order', type: 'number', placeholder: '1' },
            ]
        },
        // ==================== UPDATE PLACEMENT HEAD ====================
        {
            id: 'updatePlacementHead',
            label: 'Update Placement Head',
            description: 'Update placement head details',
            endpoint: '/api/admin/placement-officers',
            method: 'PUT',
            searchField: 'id',
            searchLabel: 'Officer ID',
            searchPlaceholder: '1',
            isUpdate: true,
            fields: [
                { name: 'id', label: 'Officer ID', type: 'text', required: true, disabled: true },
                { name: 'name', label: 'Name', type: 'text', required: true, placeholder: 'Mr. Suresh Kumar' },
                { name: 'position', label: 'Designation', type: 'text', required: true, placeholder: 'Training & Placement Officer' },
                { name: 'photoPath', label: 'Photo', type: 'file', accept: 'image/*', uploadType: 'officers', uploadIdField: 'name' },
                { name: 'type', label: 'Type', type: 'hidden', defaultValue: 'HEAD' },
                { name: 'displayOrder', label: 'Display Order', type: 'number', placeholder: '1' },
            ]
        },
        // ==================== UPDATE PLACEMENT TRAINER ====================
        {
            id: 'updatePlacementTrainer',
            label: 'Update Placement Trainer',
            description: 'Update placement trainer details',
            endpoint: '/api/admin/placement-officers',
            method: 'PUT',
            searchField: 'id',
            searchLabel: 'Trainer ID',
            searchPlaceholder: '1',
            isUpdate: true,
            fields: [
                { name: 'id', label: 'Trainer ID', type: 'text', required: true, disabled: true },
                { name: 'name', label: 'Name', type: 'text', required: true, placeholder: 'Mrs. Lakshmi R' },
                { name: 'position', label: 'Specialization', type: 'text', required: true, placeholder: 'Soft Skills & Communication' },
                { name: 'photoPath', label: 'Photo', type: 'file', accept: 'image/*', uploadType: 'officers', uploadIdField: 'name' },
                { name: 'type', label: 'Type', type: 'hidden', defaultValue: 'TRAINER' },
                { name: 'trainingBatch', label: 'Training Batch', type: 'text', placeholder: '2021-2025' },
                { name: 'displayOrder', label: 'Display Order', type: 'number', placeholder: '1' },
            ]
        },
        // ==================== UPDATE COMPANY ====================
        {
            id: 'updateCompany',
            label: 'Update Company',
            description: 'Update company details',
            endpoint: '/api/admin/recruiters',
            method: 'PUT',
            searchField: 'id',
            searchLabel: 'Company ID',
            searchPlaceholder: '1',
            isUpdate: true,
            fields: [
                { name: 'id', label: 'Company ID', type: 'text', required: true, disabled: true },
                { name: 'companyName', label: 'Company Name', type: 'text', required: true, placeholder: 'Wipro Technologies' },
                { name: 'industry', label: 'Industry', type: 'text', placeholder: 'IT Services' },
                { name: 'avgPackage', label: 'Avg Package', type: 'text', placeholder: '4.0 LPA' },
                { name: 'year', label: 'Year', type: 'number', placeholder: '2024' },
                { name: 'logoPath', label: 'Logo URL', type: 'text', placeholder: '/images/companies/wipro.png' },
            ]
        },
        // ==================== UPDATE PLACEMENT DRIVE ====================
        {
            id: 'updateDrive',
            label: 'Update Placement Drive',
            description: 'Update placement drive details',
            endpoint: '/api/admin/placement-drives',
            method: 'PUT',
            searchField: 'id',
            searchLabel: 'Drive ID',
            searchPlaceholder: '1',
            isUpdate: true,
            fields: [
                { name: 'id', label: 'Drive ID', type: 'text', required: true, disabled: true },
                { name: 'companyName', label: 'Company Name', type: 'text', required: true, placeholder: 'Cognizant' },
                { name: 'driveDate', label: 'Drive Date', type: 'date', required: true },
                { name: 'venue', label: 'Venue', type: 'text', required: true, placeholder: 'Main Auditorium' },
                { name: 'packageOffered', label: 'Package Offered', type: 'text', placeholder: '3.5 - 5.0 LPA' },
                { name: 'reportingTime', label: 'Reporting Time', type: 'text', placeholder: '08:30 AM' },
                { name: 'imagePath', label: 'Image URL', type: 'text', placeholder: '/images/drives/cognizant-drive.jpg' },
            ]
        },
    ];

    const handleModuleClick = (module) => {
        setActiveModule(module);
        const defaults = {};
        module.fields.forEach(field => {
            if (field.defaultValue) defaults[field.name] = field.defaultValue;
        });
        setFormData(defaults);
        setMessage({ type: '', text: '' });
        setSearchValue(''); // Reset search value when changing modules
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Handle photo file selection
    const handlePhotoChange = (e, fieldName) => {
        const file = e.target.files[0];
        if (file) {
            setPhotoFile({ file, fieldName });
            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => setPhotoPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    // Upload photo to S3 and return the S3 path
    const uploadPhotoToS3 = async (file, type, id) => {
        const uploadData = new FormData();
        uploadData.append('file', file);
        uploadData.append('type', type);
        uploadData.append('id', id || 'unknown');

        const response = await api.post('/files/image/upload', uploadData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data.filePath;
    };

    // Fetch existing data for update forms
    const handleFetchData = async () => {
        if (!searchValue.trim()) {
            setMessage({ type: 'error', text: 'Please enter a value to search' });
            setShowPopup(true);
            return;
        }

        setFetchLoading(true);
        setMessage({ type: '', text: '' });

        try {
            // Determine fetch endpoint based on module
            let fetchEndpoint = '';

            if (activeModule.id === 'updateStudent') {
                fetchEndpoint = `/api/students/${searchValue}`;
            } else if (activeModule.id === 'updateHod') {
                fetchEndpoint = `/api/admin/hod/${searchValue}`;
            } else if (activeModule.id === 'updatePlacement') {
                // Placement records use register number to fetch
                fetchEndpoint = `/api/admin/placement-records/by-regno/${searchValue}`;
            } else {
                // For other updates, use admin endpoints with ID
                fetchEndpoint = `${activeModule.endpoint}/${searchValue}`;
            }

            const response = await api.get(fetchEndpoint.replace('/api', ''));

            if (response.status === 200) {
                const data = response.data;
                console.log('Fetched data:', data); // Debug log

                // Map the response data to form fields with special handling for different modules
                const newFormData = {};

                if (activeModule.id === 'updateStudent') {
                    // Special mapping for Student - backend uses different field names
                    newFormData.registerNumber = data.registerNumber || searchValue;
                    newFormData.name = data.name || '';
                    newFormData.email = data.email || (data.contact?.email) || '';
                    newFormData.phone = data.contact?.phone || '';
                    // Department: try to match with dropdown options (which uses full names)
                    let dept = data.department?.toUpperCase() || '';
                    // If dept is a code, convert to full name using departmentMap
                    if (departmentMap[dept]) {
                        dept = departmentMap[dept];
                    }
                    newFormData.department = dept;
                    newFormData.academicYear = data.academicYear || '';
                    // Format date for HTML date input (requires yyyy-MM-dd)
                    let dob = data.dob || '';
                    if (dob && typeof dob === 'string') {
                        // Try to ensure it's in yyyy-MM-dd format
                        // If it's already in correct format, use as-is
                        // If it has time component, extract just the date part
                        if (dob.includes('T')) {
                            dob = dob.split('T')[0];
                        }
                    }
                    console.log('DOB value:', dob); // Debug
                    newFormData.dateOfBirth = dob;
                    newFormData.bloodGroup = data.bloodGroup || '';
                    newFormData.photoPath = data.photoPath || '';
                    newFormData.address = data.address || '';
                } else if (activeModule.id === 'updateHod') {
                    // Special mapping for HOD - format arrays as readable text
                    activeModule.fields.forEach(field => {
                        if (data[field.name] !== undefined && data[field.name] !== null) {
                            newFormData[field.name] = data[field.name];
                        } else if (field.defaultValue) {
                            newFormData[field.name] = field.defaultValue;
                        }
                    });

                    // Format Academic Background array as readable text (one per line)
                    if (Array.isArray(data.hodAcademicBackground)) {
                        newFormData.hodAcademicBackground = data.hodAcademicBackground.join('\n');
                    } else if (typeof data.hodAcademicBackground === 'string') {
                        // If already a string, use as-is (might be JSON or plain text)
                        try {
                            const parsed = JSON.parse(data.hodAcademicBackground);
                            if (Array.isArray(parsed)) {
                                newFormData.hodAcademicBackground = parsed.join('\n');
                            }
                        } catch {
                            // Not JSON, use as-is
                        }
                    }

                    // Format Professional Experience array as readable text
                    if (Array.isArray(data.hodExperience)) {
                        newFormData.hodExperience = data.hodExperience.map(exp => {
                            // Format each experience as: "Title | Period | Description"
                            return `${exp.title || ''} | ${exp.period || ''} | ${exp.description || ''}`;
                        }).join('\n');
                    } else if (typeof data.hodExperience === 'string') {
                        // If already a string, try to parse and format
                        try {
                            const parsed = JSON.parse(data.hodExperience);
                            if (Array.isArray(parsed)) {
                                newFormData.hodExperience = parsed.map(exp => {
                                    return `${exp.title || ''} | ${exp.period || ''} | ${exp.description || ''}`;
                                }).join('\n');
                            }
                        } catch {
                            // Not JSON, use as-is
                        }
                    }

                    // Set the search field value
                    newFormData[activeModule.searchField] = searchValue;
                } else {
                    // General mapping for other modules
                    activeModule.fields.forEach(field => {
                        if (data[field.name] !== undefined && data[field.name] !== null) {
                            newFormData[field.name] = data[field.name];
                        } else if (field.defaultValue) {
                            newFormData[field.name] = field.defaultValue;
                        }
                    });

                    // Also set the search field value
                    newFormData[activeModule.searchField] = searchValue;
                }

                setFormData(newFormData);
                setMessage({ type: 'success', text: 'Data fetched successfully! You can now modify and update.' });
                setShowPopup(true);
            } else if (response.status === 404) {
                setMessage({ type: 'error', text: 'Record not found. Please check the ID/key and try again.' });
                setShowPopup(true);
            }
        } catch (error) {
            console.error('Fetch error:', error);
            if (error.response?.status === 404) {
                setMessage({ type: 'error', text: 'Record not found. Please check the ID/key and try again.' });
                setShowPopup(true);
            } else {
                setMessage({ type: 'error', text: error.response?.data || 'Failed to connect to server' });
                setShowPopup(true);
            }
        } finally {
            setFetchLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setMessage({ type: '', text: '' });

        try {
            // Determine the endpoint and method based on update or add
            const method = activeModule.method || 'POST';

            // If a photo file was selected, upload it to S3 first
            if (photoFile) {
                const fileField = activeModule.fields.find(f => f.name === photoFile.fieldName);
                if (fileField) {
                    const uploadId = formData[fileField.uploadIdField] || 'unknown';
                    const s3Path = await uploadPhotoToS3(photoFile.file, fileField.uploadType, uploadId);
                    // Set the photo path in form data
                    formData[photoFile.fieldName] = s3Path;
                }
            }

            // For updates, only send non-empty fields (partial update)
            let dataToSend = formData;
            if (activeModule.isUpdate) {
                dataToSend = {};
                Object.entries(formData).forEach(([key, value]) => {
                    // Include field if it has a value (not empty string, null, or undefined)
                    if (value !== '' && value !== null && value !== undefined) {
                        dataToSend[key] = value;
                    }
                });
            }

            // Special handling for HOD forms - convert formatted text back to JSON
            if (activeModule.id === 'hod' || activeModule.id === 'updateHod') {
                // Convert Academic Background from lines to JSON array
                if (dataToSend.hodAcademicBackground && typeof dataToSend.hodAcademicBackground === 'string') {
                    const lines = dataToSend.hodAcademicBackground.split('\n').filter(line => line.trim());
                    dataToSend.hodAcademicBackground = JSON.stringify(lines);
                }

                // Convert Professional Experience from formatted text to JSON array of objects
                if (dataToSend.hodExperience && typeof dataToSend.hodExperience === 'string') {
                    const lines = dataToSend.hodExperience.split('\n').filter(line => line.trim());
                    const experiences = lines.map(line => {
                        const parts = line.split('|').map(p => p.trim());
                        return {
                            title: parts[0] || '',
                            period: parts[1] || '',
                            description: parts[2] || ''
                        };
                    });
                    dataToSend.hodExperience = JSON.stringify(experiences);
                }
            }

            console.log('Sending data:', dataToSend); // Debug log

            let response;
            const apiEndpoint = activeModule.endpoint.replace('/api', '');
            const fullEndpoint = activeModule.isUpdate && activeModule.searchField
                ? `${apiEndpoint}/${formData[activeModule.searchField]}`
                : apiEndpoint;

            if (method === 'POST') {
                response = await api.post(fullEndpoint, dataToSend);
            } else if (method === 'PUT') {
                response = await api.put(fullEndpoint, dataToSend);
            }

            if (response.status === 200 || response.status === 201) {
                const successText = activeModule.isUpdate ? 'Updated successfully!' : 'Added successfully!';
                setMessage({ type: 'success', text: successText });
                setShowPopup(true);
                // Reset photo state
                setPhotoFile(null);
                setPhotoPreview(null);
                if (!activeModule.isUpdate) {
                    const defaults = {};
                    activeModule.fields.forEach(field => {
                        if (field.defaultValue) defaults[field.name] = field.defaultValue;
                    });
                    setFormData(defaults);
                }
            }
        } catch (error) {
            const failText = activeModule.isUpdate ? 'Failed to update data' : 'Failed to add data';
            setMessage({ type: 'error', text: error.response?.data || failText });
            setShowPopup(true);
        } finally {
            setSubmitting(false);
        }
    };
    const styles = {
        moduleCard: { background: '#fff', border: '1px solid #e0e0e0', borderRadius: '8px', padding: '20px', cursor: 'pointer', transition: 'all 0.2s ease' },
        formGroup: { marginBottom: '16px' },
        label: { display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#333' },
        required: { color: '#d32f2f', marginLeft: '2px' },
        input: { width: '100%', padding: '10px 12px', fontSize: '14px', border: '1px solid #ddd', borderRadius: '6px', background: '#fff', color: '#333', boxSizing: 'border-box', fontFamily: 'Arial, sans-serif', accentColor: '#0A8F47' },
        dateInput: { width: '100%', padding: '10px 12px', fontSize: '14px', border: '1px solid #ddd', borderRadius: '6px', background: '#fff', color: '#333', boxSizing: 'border-box', fontFamily: 'Arial, sans-serif', accentColor: '#0A8F47', colorScheme: 'light' },
        select: { width: '100%', padding: '10px 12px', fontSize: '14px', border: '1px solid #ddd', borderRadius: '6px', background: '#fff', color: '#333', boxSizing: 'border-box', fontFamily: 'Arial, sans-serif', cursor: 'pointer', appearance: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23333' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', paddingRight: '36px' },
        formGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' },
        fullWidth: { gridColumn: '1 / -1' },
        successMsg: { padding: '12px 16px', borderRadius: '6px', marginBottom: '20px', background: '#e8f5e9', color: '#2e7d32', border: '1px solid #a5d6a7' },
        errorMsg: { padding: '12px 16px', borderRadius: '6px', marginBottom: '20px', background: '#ffebee', color: '#c62828', border: '1px solid #ef9a9a' },
    };

    const popupStyles = {
        overlay: {
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            zIndex: 9999
        },
        container: {
            backgroundColor: '#ffffff', borderRadius: '16px', padding: '2rem',
            maxWidth: '450px', width: '90%', textAlign: 'center',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)'
        },
        icon: {
            width: '50px', height: '50px', borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 1rem', fontSize: '1.5rem', fontWeight: 'bold', color: 'white'
        },
        title: {
            fontSize: '1.4rem', fontWeight: 'bold', marginBottom: '1.5rem'
        },
        content: {
            backgroundColor: '#f0f8f0', borderRadius: '10px',
            padding: '1.2rem', marginBottom: '1.5rem'
        },
        text: {
            color: '#666', fontSize: '0.95rem', margin: 0
        },
        button: {
            color: 'white', border: 'none', borderRadius: '8px',
            padding: '0.8rem 2.5rem', fontSize: '1rem', fontWeight: '600',
            cursor: 'pointer', transition: 'all 0.3s ease'
        }
    };

    const renderField = (field, isFullWidth = false) => {
        if (field.type === 'hidden') return null;
        const wrapperStyle = isFullWidth ? { ...styles.formGroup, ...styles.fullWidth } : styles.formGroup;
        const disabledStyle = field.disabled ? { backgroundColor: '#f5f5f5', cursor: 'not-allowed' } : {};

        return (
            <div key={field.name} style={wrapperStyle}>
                <label style={styles.label}>
                    {field.label}
                    {field.required && <span style={styles.required}>*</span>}
                </label>
                {field.type === 'select' ? (
                    <select
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleInputChange}
                        required={field.required}
                        disabled={field.disabled}
                        style={{ ...styles.select, ...disabledStyle }}
                        onFocus={(e) => !field.disabled && (e.target.style.borderColor = '#0A8F47')}
                        onBlur={(e) => !field.disabled && (e.target.style.borderColor = '#ddd')}
                    >
                        <option value="">Select {field.label}</option>
                        {field.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                ) : field.type === 'textarea' ? (
                    <textarea
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleInputChange}
                        placeholder={field.placeholder}
                        disabled={field.disabled}
                        style={{ ...styles.input, ...disabledStyle }}
                        rows={3}
                        onFocus={(e) => !field.disabled && (e.target.style.borderColor = '#0A8F47')}
                        onBlur={(e) => !field.disabled && (e.target.style.borderColor = '#ddd')}
                    />
                ) : field.type === 'file' ? (
                    <div>
                        <input
                            type="file"
                            accept={field.accept || 'image/*'}
                            onChange={(e) => handlePhotoChange(e, field.name)}
                            style={{ ...styles.input, padding: '8px' }}
                        />
                        {/* Show current photo if exists (for updates) */}
                        {formData[field.name] && !photoPreview && (
                            <div style={{ marginTop: '8px' }}>
                                <img
                                    src={getImageUrl(formData[field.name])}
                                    alt="Current"
                                    style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px', border: '2px solid #0A8F47' }}
                                    onError={(e) => { e.target.style.display = 'none'; }}
                                />
                                <p style={{ fontSize: '12px', color: '#666', margin: '4px 0 0' }}>Current photo</p>
                            </div>
                        )}
                        {/* Show preview of new photo */}
                        {photoPreview && photoFile?.fieldName === field.name && (
                            <div style={{ marginTop: '8px' }}>
                                <img
                                    src={photoPreview}
                                    alt="Preview"
                                    style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px', border: '2px solid #0A8F47' }}
                                />
                                <p style={{ fontSize: '12px', color: '#0A8F47', margin: '4px 0 0', fontWeight: '500' }}>✓ New photo selected</p>
                            </div>
                        )}
                    </div>
                ) : (
                    <input
                        type={field.type}
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleInputChange}
                        required={field.required}
                        placeholder={field.placeholder}
                        disabled={field.disabled}
                        style={{ ...(field.type === 'date' ? styles.dateInput : styles.input), ...disabledStyle }}
                        step={field.type === 'number' ? '0.01' : undefined}
                        onFocus={(e) => !field.disabled && (e.target.style.borderColor = '#0A8F47')}
                        onBlur={(e) => !field.disabled && (e.target.style.borderColor = '#ddd')}
                    />
                )}
            </div>
        );
    };

    return (
        <AdminLayout>
            <div className="admin-page-header">
                <h1 className="admin-page-title">Data Management</h1>
                <p className="admin-page-subtitle">Add and manage system data</p>
            </div>

            {!activeModule ? (
                <>
                    {/* Add Records Section */}
                    <h2 style={{ color: '#2e7d32', marginBottom: '16px', fontSize: '1.4rem', fontWeight: '600', borderBottom: '2px solid #e8f5e9', paddingBottom: '10px' }}>
                        Add Records
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px', marginBottom: '40px' }}>
                        {dataModules.map((module) => (
                            <div
                                key={module.id}
                                onClick={() => handleModuleClick(module)}
                                style={{
                                    background: '#fff',
                                    border: '1px solid #e0e0e0',
                                    borderRadius: '10px',
                                    padding: '24px',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.04)'
                                }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.borderColor = '#0A8F47';
                                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(10, 143, 71, 0.15)';
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.borderColor = '#e0e0e0';
                                    e.currentTarget.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.04)';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                }}
                            >
                                <h3 style={{ color: '#0A8F47', marginTop: 0, marginBottom: '8px', fontSize: '17px', fontWeight: '600' }}>{module.label}</h3>
                                <p style={{ color: '#666', margin: 0, fontSize: '14px', lineHeight: '1.5' }}>{module.description}</p>
                            </div>
                        ))}
                    </div>

                    {/* Update Records Section */}
                    <h2 style={{ color: '#2e7d32', marginBottom: '16px', fontSize: '1.4rem', fontWeight: '600', borderBottom: '2px solid #e8f5e9', paddingBottom: '10px' }}>
                        Update Records
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                        {updateModules.map((module) => (
                            <div
                                key={module.id}
                                onClick={() => handleModuleClick(module)}
                                style={{
                                    background: '#fff',
                                    border: '1px solid #e0e0e0',
                                    borderRadius: '10px',
                                    padding: '24px',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.04)'
                                }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.borderColor = '#0A8F47';
                                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(10, 143, 71, 0.15)';
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.borderColor = '#e0e0e0';
                                    e.currentTarget.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.04)';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                }}
                            >
                                <h3 style={{ color: '#0A8F47', marginTop: 0, marginBottom: '8px', fontSize: '17px', fontWeight: '600' }}>{module.label}</h3>
                                <p style={{ color: '#666', margin: 0, fontSize: '14px', lineHeight: '1.5' }}>{module.description}</p>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div>
                    {/* Heading outside white box */}
                    <h2 style={{ color: '#0A8F47', marginTop: 0, marginBottom: '8px', fontSize: '22px', fontWeight: 'bold' }}>{activeModule.label}</h2>
                    <p style={{ color: '#666', marginTop: 0, marginBottom: '20px', fontSize: '14px' }}>{activeModule.description}</p>

                    {/* Form container - full width */}
                    <div style={{
                        background: '#fff',
                        border: '1px solid #e0e0e0',
                        borderRadius: '10px',
                        padding: '28px',
                        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.04)'
                    }}>
                        

                        {/* Search/Fetch section for Update modules */}
                        {activeModule.isUpdate && (
                            <div style={{
                                marginBottom: '24px',
                                padding: '20px',
                                background: '#fff',
                                borderRadius: '8px',
                                border: '1px solid #e0e0e0'
                            }}>
                                <label style={{ display: 'block', marginBottom: '10px', fontSize: '14px', fontWeight: '600', color: '#333' }}>
                                    Enter {activeModule.searchLabel} to fetch existing data
                                </label>
                                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                    {activeModule.searchType === 'select' ? (
                                        <select
                                            value={searchValue}
                                            onChange={(e) => setSearchValue(e.target.value)}
                                            style={{
                                                flex: 1,
                                                padding: '12px 14px',
                                                fontSize: '15px',
                                                border: '1px solid #ddd',
                                                borderRadius: '6px',
                                                background: '#fff'
                                            }}
                                        >
                                            <option value="">Select {activeModule.searchLabel}</option>
                                            {activeModule.searchOptions?.map(opt => (
                                                <option key={opt} value={opt}>{opt}</option>
                                            ))}
                                        </select>
                                    ) : (
                                        <input
                                            type="text"
                                            value={searchValue}
                                            onChange={(e) => setSearchValue(e.target.value)}
                                            placeholder={activeModule.searchPlaceholder || `Enter ${activeModule.searchLabel}`}
                                            style={{
                                                flex: 1,
                                                padding: '12px 14px',
                                                fontSize: '15px',
                                                border: '1px solid #ddd',
                                                borderRadius: '6px'
                                            }}
                                        />
                                    )}
                                    <button
                                        type="button"
                                        onClick={handleFetchData}
                                        disabled={fetchLoading}
                                        style={{
                                            padding: '12px 24px',
                                            background: '#0A8F47',
                                            color: '#fff',
                                            border: 'none',
                                            borderRadius: '6px',
                                            fontSize: '15px',
                                            fontWeight: '500',
                                            cursor: fetchLoading ? 'not-allowed' : 'pointer',
                                            opacity: fetchLoading ? 0.7 : 1,
                                            whiteSpace: 'nowrap'
                                        }}
                                    >
                                        {fetchLoading ? 'Fetching...' : 'Fetch'}
                                    </button>
                                </div>

                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div style={styles.formGrid}>
                                {activeModule.fields.map((field) => renderField(field, field.type === 'textarea'))}
                            </div>
                            <div style={{ marginTop: '28px', display: 'flex', gap: '14px' }}>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    style={{
                                        padding: '12px 28px',
                                        background: '#0A8F47',
                                        color: '#fff',
                                        border: 'none',
                                        borderRadius: '6px',
                                        fontSize: '15px',
                                        fontWeight: '500',
                                        cursor: submitting ? 'not-allowed' : 'pointer',
                                        opacity: submitting ? 0.7 : 1,
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    {submitting
                                        ? (activeModule.isUpdate ? 'Updating...' : 'Adding...')
                                        : (activeModule.isUpdate ? 'Update Data' : 'Add Data')
                                    }
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setActiveModule(null)}
                                    style={{
                                        padding: '12px 28px',
                                        background: '#fff',
                                        color: '#333',
                                        border: '1px solid #ccc',
                                        borderRadius: '6px',
                                        fontSize: '15px',
                                        fontWeight: '500',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {showPopup && message.text && (
                <div style={popupStyles.overlay}>
                    <div style={popupStyles.container}>
                        <div style={{
                            ...popupStyles.icon,
                            backgroundColor: message.type === 'success' ? '#0A8F47' : '#d32f2f'
                        }}>
                            {message.type === 'success' ? '✓' : '✕'}
                        </div>
                        <h2 style={{
                            ...popupStyles.title,
                            color: message.type === 'success' ? '#0A8F47' : '#d32f2f'
                        }}>
                            {message.type === 'success' ? 'Success!' : 'Error'}
                        </h2>
                        <div style={popupStyles.content}>
                            <p style={popupStyles.text}>{message.text}</p>
                        </div>
                        <button
                            style={{
                                ...popupStyles.button,
                                backgroundColor: message.type === 'success' ? '#0A8F47' : '#d32f2f'
                            }}
                            onClick={() => { setShowPopup(false); setMessage({ type: '', text: '' }); }}
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default AdminDataManagement;
