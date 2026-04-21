import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { isAdmin } from "../data/authCredentials";

const AdminFilterPage = () => {
    const navigate = useNavigate();
    const { batch, track } = useParams();

    // Redirect if not admin
    React.useEffect(() => {
        if (!isAdmin()) {
            navigate('/');
        }
    }, [navigate]);

    // Filter states
    const [filters, setFilters] = useState({
        regNo: "",
        name: "",
        minCgpa: "",
        minProjects: "",
        projectDomain: "",
        technologies: ""
    });

    const handleFilterChange = (field, value) => {
        setFilters(prev => ({ ...prev, [field]: value }));
    };

    const handleApplyFilters = () => {
        // Store filters in sessionStorage and navigate to results page
        sessionStorage.setItem('adminFilters', JSON.stringify(filters));
        navigate(`/admin/shortlisting/${encodeURIComponent(batch)}/${encodeURIComponent(track)}/results`);
    };

    const handleClearFilters = () => {
        setFilters({
            regNo: "",
            name: "",
            minCgpa: "",
            minProjects: "",
            projectDomain: "",
            technologies: ""
        });
    };

    // Check if at least one filter has a value
    const hasAnyFilter = Object.values(filters).some(val => val !== "");

    return (
        <div style={styles.wrapper}>
            {/* White Header Banner - Title Only */}
            <div style={styles.headerBanner}>
                <h2 style={styles.title}>Filter Students</h2>
            </div>

            {/* Batch and Track info below header */}
            <p style={styles.contextInfo}>
                🎓 Batch: {decodeURIComponent(batch)} | 📚 Training Batch: {decodeURIComponent(track)}
            </p>

            {/* Filter Form */}
            <div style={styles.filterContainer}>
                {/* Search Section */}
                <fieldset style={styles.formFieldset}>
                    <legend style={styles.formLegend}>Search By</legend>

                    <label style={styles.formLabel}>Register Number</label>
                    <input
                        type="text"
                        placeholder="e.g., 714023104001"
                        value={filters.regNo}
                        onChange={(e) => handleFilterChange("regNo", e.target.value)}
                        style={styles.formInput}
                        className="filter-input"
                    />

                    <label style={styles.formLabel}>Name</label>
                    <input
                        type="text"
                        placeholder="e.g., Dhinakaran"
                        value={filters.name}
                        onChange={(e) => handleFilterChange("name", e.target.value)}
                        style={styles.formInput}
                        className="filter-input"
                    />
                </fieldset>

                {/* Shortlisting Section */}
                <fieldset style={styles.formFieldset}>
                    <legend style={styles.formLegend}>Shortlisting Options</legend>

                    <label style={styles.formLabel}>Minimum CGPA</label>
                    <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="10"
                        placeholder="e.g., 7.5"
                        value={filters.minCgpa}
                        onChange={(e) => handleFilterChange("minCgpa", e.target.value)}
                        style={styles.formInput}
                        className="filter-input"
                    />

                    <label style={styles.formLabel}>Minimum Projects</label>
                    <input
                        type="number"
                        min="0"
                        placeholder="e.g., 1"
                        value={filters.minProjects}
                        onChange={(e) => handleFilterChange("minProjects", e.target.value)}
                        style={styles.formInput}
                        className="filter-input"
                    />

                    <label style={styles.formLabel}>Project Domain</label>
                    <input
                        type="text"
                        placeholder="e.g., Web / AI / Cloud"
                        value={filters.projectDomain}
                        onChange={(e) => handleFilterChange("projectDomain", e.target.value)}
                        style={styles.formInput}
                        className="filter-input"
                    />

                    <label style={styles.formLabel}>Technologies</label>
                    <input
                        type="text"
                        placeholder="e.g., React, Java, Python"
                        value={filters.technologies}
                        onChange={(e) => handleFilterChange("technologies", e.target.value)}
                        style={styles.formInput}
                        className="filter-input"
                    />
                </fieldset>

                {/* Buttons */}
                <div style={styles.buttonContainer}>
                    <button
                        style={hasAnyFilter ? styles.submitButton : styles.submitButtonDisabled}
                        onClick={hasAnyFilter ? handleApplyFilters : undefined}
                        disabled={!hasAnyFilter}
                        className="filter-button"
                    >
                        Proceed
                    </button>
                    <button
                        style={styles.clearButton}
                        onClick={handleClearFilters}
                        className="filter-button"
                    >
                        Clear
                    </button>
                </div>
            </div>

            {/* Hover and Focus Effects */}
            <style>{`
                .filter-input:focus {
                    outline: none;
                    border-color: #0A8F47;
                    box-shadow: 0 0 4px rgba(10, 143, 71, 0.3);
                }
                .filter-button:hover:not(:disabled) {
                    background-color: #eaf8ea;
                }
            `}</style>
        </div>
    );
};

const styles = {
    wrapper: {
        background: "#f0f8f0",
        minHeight: "100vh",
        fontFamily: "'Segoe UI', sans-serif",
        paddingBottom: "2rem",
    },
    headerBanner: {
        backgroundColor: "white",
        padding: "1.5rem 0",
        textAlign: "center",
        marginBottom: "0.5rem",
    },
    title: {
        fontSize: "2.4rem",
        color: "#2e7d32",
        margin: 0,
        fontWeight: "bold",
    },
    contextInfo: {
        fontSize: "1.1rem",
        color: "#555",
        textAlign: "center",
        marginBottom: "1.5rem",
    },
    filterContainer: {
        maxWidth: "600px",
        margin: "0 auto",
        padding: "2rem",
    },
    formFieldset: {
        marginBottom: "2rem",
        border: "1px solid #2e7d32",
        borderRadius: "12px",
        padding: "1.5rem",
        backgroundColor: "#ffffff",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
    },
    formLegend: {
        color: "#0A8F47",
        fontWeight: "bold",
        fontSize: "1.2rem",
        padding: "0 0.5rem",
    },
    formLabel: {
        display: "block",
        color: "#333",
        fontWeight: "500",
        marginBottom: "0.3rem",
        marginTop: "0.8rem",
        fontSize: "1rem",
    },
    formInput: {
        display: "block",
        width: "100%",
        padding: "0.8rem",
        marginBottom: "0.5rem",
        borderRadius: "8px",
        border: "1px solid #ccc",
        boxSizing: "border-box",
        fontSize: "1rem",
        fontFamily: "'Segoe UI', sans-serif",
        transition: "border-color 0.3s ease",
    },
    buttonContainer: {
        display: "flex",
        gap: "1rem",
        justifyContent: "center",
        flexWrap: "wrap",
        marginTop: "2rem",
    },
    submitButton: {
        display: "inline-block",
        padding: "0.8rem 1.5rem",
        border: "2px solid #228b22",
        backgroundColor: "#ffffff",
        borderRadius: "10px",
        color: "#228b22",
        fontWeight: "bold",
        fontSize: "1rem",
        cursor: "pointer",
        transition: "background-color 0.3s ease",
    },
    submitButtonDisabled: {
        display: "inline-block",
        padding: "0.8rem 1.5rem",
        border: "2px solid #ccc",
        backgroundColor: "#f5f5f5",
        borderRadius: "10px",
        color: "#999",
        fontWeight: "bold",
        fontSize: "1rem",
        cursor: "not-allowed",
    },
    clearButton: {
        display: "inline-block",
        padding: "0.8rem 1.5rem",
        border: "2px solid #228b22",
        backgroundColor: "#ffffff",
        borderRadius: "10px",
        color: "#228b22",
        fontWeight: "bold",
        fontSize: "1rem",
        cursor: "pointer",
        transition: "background-color 0.3s ease",
    },
};

export default AdminFilterPage;
