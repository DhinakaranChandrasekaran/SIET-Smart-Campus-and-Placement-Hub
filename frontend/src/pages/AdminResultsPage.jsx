import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { isAdmin } from "../data/authCredentials";
import studentService from "../services/studentService";
import SIETLoader from "../components/SIETLoader";

const AdminResultsPage = () => {
    const navigate = useNavigate();
    const { batch, track } = useParams();
    const decodedBatch = decodeURIComponent(batch);
    const decodedTrack = decodeURIComponent(track);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    // Redirect if not admin
    React.useEffect(() => {
        if (!isAdmin()) {
            navigate('/');
        }
    }, [navigate]);

    // Fetch filtered students from backend (server-side filtering)
    useEffect(() => {
        const fetchFilteredStudents = async () => {
            try {
                // Get filters from sessionStorage
                const stored = sessionStorage.getItem('adminFilters');
                const filters = stored ? JSON.parse(stored) : {};

                // Build filter request for backend
                const filterRequest = {
                    batch: decodedBatch,
                    trainingBatch: decodedTrack,
                    regNo: filters.regNo || null,
                    name: filters.name || null,
                    minCgpa: filters.minCgpa ? parseFloat(filters.minCgpa) : null,
                    minProjects: filters.minProjects ? parseInt(filters.minProjects) : null,
                    projectDomain: filters.projectDomain || null,
                    technologies: filters.technologies || null
                };

                // Call server-side filter API
                const data = await studentService.filterStudents(filterRequest);

                // Map backend data to expected structure
                const mapped = data.map(s => ({
                    personalDetails: {
                        regNo: s.registerNumber,
                        name: s.name,
                        department: s.department,
                        academicYear: s.academicYear
                    },
                    overallCgpa: s.overallCgpa,
                    trainingBatch: s.trainingBatch
                }));
                setFilteredStudents(mapped);
            } catch (error) {
                console.error('Error fetching filtered students:', error);
                setFilteredStudents([]);
            } finally {
                setLoading(false);
            }
        };
        fetchFilteredStudents();
    }, [decodedBatch, decodedTrack]);

    const handleExportCSV = () => {
        const headers = ["Register Number", "Name", "Training Batch", "Department", "CGPA"];
        const rows = filteredStudents.map(student => [
            student.personalDetails.regNo,
            student.personalDetails.name,
            student.trainingBatch || "N/A",
            student.personalDetails.department,
            student.overallCgpa
        ]);

        const csvContent = [
            headers.join(","),
            ...rows.map(row => row.map(cell => `"${cell}"`).join(","))
        ].join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", `shortlisted_students_${batch}_${track}.csv`);
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleViewProfile = (regNo) => {
        navigate(`/admin/student/${regNo}`);
    };

    if (loading) {
        return <SIETLoader />;
    }

    return (
        <>
            <div className="results-wrapper">
                <div className="results-header">
                    <h2 className="results-title">Shortlisted Students : {decodedBatch}</h2>
                </div>

                <div className="table-container">
                    {filteredStudents.length > 0 ? (
                        <>
                            <table className="shortlist-table">
                                <thead>
                                    <tr>
                                        <th>Register Number</th>
                                        <th>Name</th>
                                        <th>Department</th>
                                        <th>Training Batch</th>
                                        <th>CGPA</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredStudents.map((student, index) => (
                                        <tr key={index}>
                                            <td
                                                className="reg-no-cell"
                                                onClick={() => handleViewProfile(student.personalDetails.regNo)}
                                            >
                                                {student.personalDetails.regNo}
                                            </td>
                                            <td>{student.personalDetails.name}</td>
                                            <td>{student.personalDetails.department}</td>
                                            <td>{student.trainingBatch || "N/A"}</td>
                                            <td>{student.overallCgpa || "N/A"}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {/* Export button below table */}
                            <div className="export-container">
                                <div className="export-btn" onClick={handleExportCSV}>
                                    Export
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="no-students">
                            <p>No students match the selected criteria.</p>
                        </div>
                    )}
                </div>
            </div>

            <style>{`
                .results-wrapper {
                    background: #f0f8f0;
                    min-height: 100vh;
                    font-family: 'Segoe UI', sans-serif;
                }

                .results-header {
                    background: white;
                    padding: 0.5rem 0;
                    text-align: center;
                }

                .results-title {
                    font-size: 2.4rem;
                    color: green;
                    margin: 0;
                    padding: 0.5rem 0;
                }

                .table-container {
                    padding: 0 2rem 2rem;
                    overflow-x: auto;
                }

                .shortlist-table {
                    width: 100%;
                    border-collapse: collapse;
                    background-color: #fff;
                    border-radius: 12px;
                    overflow: hidden;
                    box-shadow: 0 4px 10px rgba(0,0,0,0.05);
                }

                .shortlist-table th {
                    background-color: #2e7d32;
                    color: #fff;
                    padding: 1rem;
                    text-align: center;
                    font-size: 0.95rem;
                    font-weight: 600;
                    border-right: 1px solid rgba(255,255,255,0.2);
                }

                .shortlist-table th:last-child {
                    border-right: none;
                }

                /* Column widths */
                .shortlist-table th:nth-child(1),
                .shortlist-table td:nth-child(1) {
                    width: 12%;
                }

                .shortlist-table th:nth-child(2),
                .shortlist-table td:nth-child(2) {
                    width: 25%;
                }

                .shortlist-table tr {
                    border-bottom: 1px solid #eee;
                    transition: background-color 0.2s ease;
                }

                .shortlist-table tr:hover {
                    background-color: #f5f5f5;
                }

                .shortlist-table td {
                    padding: 1rem;
                    font-size: 0.95rem;
                    color: #333;
                    text-align: center;
                    border-right: 1px solid #eee;
                }

                .shortlist-table td:last-child {
                    border-right: none;
                }

                .reg-no-cell {
                    color: #2e7d32;
                    font-weight: 600;
                    cursor: pointer;
                    transition: color 0.2s ease;
                }

                .reg-no-cell:hover {
                    color: #1b5e20;
                }

                .export-container {
                    display: flex;
                    justify-content: center;
                    margin-top: 1.5rem;
                }

                .export-btn {
                    display: inline-block;
                    padding: 0.8rem 1.5rem;
                    border: 2px solid #228b22;
                    background-color: #ffffff;
                    border-radius: 10px;
                    color: #228b22;
                    font-weight: bold;
                    font-size: 1rem;
                    cursor: pointer;
                    transition: background-color 0.3s ease;
                }

                .export-btn:hover {
                    background-color: #eaf8ea;
                }

                .no-students {
                    text-align: center;
                    padding: 3rem;
                    color: #666;
                }

                @media (max-width: 768px) {
                    .table-container {
                        padding: 0 1rem 1rem;
                    }
                    
                    .shortlist-table th,
                    .shortlist-table td {
                        padding: 0.75rem 0.5rem;
                        font-size: 0.85rem;
                    }
                }
            `}</style>
        </>
    );
};

export default AdminResultsPage;

