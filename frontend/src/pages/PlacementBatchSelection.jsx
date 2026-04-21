import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import placementService from "../services/placementService";
import SIETLoader from "../components/SIETLoader";

const PlacementBatchSelection = () => {
    const navigate = useNavigate();
    const [batches, setBatches] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBatches = async () => {
            try {
                // Try to get batches from backend
                const records = await placementService.getAllRecords();
                // Extract unique batches
                const uniqueBatches = [...new Set(records.map(r => r.batch).filter(Boolean))];
                const batchData = uniqueBatches.map(batch => ({
                    label: batch,
                    status: batch === "2023-2027" ? "Current Batch" : "Completed",
                    placedCount: records.filter(r => r.batch === batch).length
                }));
                // If no records, use default batches
                if (batchData.length === 0) {
                    setBatches([
                        { label: "2023-2027", status: "Current Batch", placedCount: 0 },
                        { label: "2022-2026", status: "Completed", placedCount: 0 },
                    ]);
                } else {
                    setBatches(batchData);
                }
            } catch (error) {
                console.error('Error fetching batches:', error);
                // Fallback to default batches
                setBatches([
                    { label: "2023-2027", status: "Current Batch", placedCount: 0 },
                    { label: "2022-2026", status: "Completed", placedCount: 0 },
                ]);
            } finally {
                setLoading(false);
            }
        };
        fetchBatches();
    }, []);

    const handleSelect = (batch) => {
        sessionStorage.setItem("selectedPlacementBatch", batch.label);
        navigate(`/placement-profiles/${encodeURIComponent(batch.label)}`);
    };

    if (loading) {
        return <SIETLoader />;
    }

    return (
        <div style={styles.wrapper}>
            {/* White Header Banner */}
            <div style={styles.headerBanner}>
                <h2 style={styles.title}>Select Placement Batch</h2>
            </div>

            {/* Subtitle below header */}
            <p style={styles.subtitle}>📊 Choose a batch to view placement records</p>

            <div style={styles.content}>
                <div style={styles.grid}>
                    {batches.map((b, i) => (
                        <div
                            key={i}
                            style={styles.card}
                            className="batch-card"
                            onClick={() => handleSelect(b)}
                        >
                            <div style={styles.label}>{b.label}</div>
                            <div style={styles.status}>{b.status}</div>
                            <div style={styles.placedCount}>{b.placedCount} Students Placed</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Hover Effect */}
            <style>{`
        .batch-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
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
    subtitle: {
        fontSize: "1.1rem",
        color: "#555",
        textAlign: "center",
        marginBottom: "1.5rem",
    },
    content: {
        textAlign: "center",
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "0 1rem",
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "2rem",
        padding: "1rem",
    },
    card: {
        background: "#fff",
        borderRadius: "14px",
        padding: "2.8rem",
        boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
        cursor: "pointer",
        transition: "all 0.3s ease",
        textAlign: "center",
        userSelect: "none",
    },
    label: {
        fontSize: "1.3rem",
        fontWeight: "600",
        color: "#333",
    },
    status: {
        fontSize: "0.95rem",
        color: "#777",
        marginTop: "0.4rem",
    },
    placedCount: {
        fontSize: "0.9rem",
        color: "#2e7d32",
        marginTop: "0.6rem",
        fontWeight: "500",
    },
};

export default PlacementBatchSelection;
