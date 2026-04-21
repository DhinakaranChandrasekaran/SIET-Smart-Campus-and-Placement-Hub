import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import SIETLoader from "../components/SIETLoader";

const BatchSelectionPage = () => {
  const navigate = useNavigate();
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch batches from backend
  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const response = await api.get("/students/batches");
        const currentYear = new Date().getFullYear();
        // Convert to format with label and status
        const batchData = response.data.map(batch => {
          // Extract end year from batch (e.g., "2023-2027" -> 2027)
          const endYear = parseInt(batch.split('-')[1]);
          // If end year is less than or equal to current year, batch is completed
          const status = endYear <= currentYear ? "Completed" : "Ongoing";
          return {
            label: batch,
            status: status
          };
        });
        setBatches(batchData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching batches:", err);
        setLoading(false);
      }
    };

    fetchBatches();
  }, []);

  const handleSelect = (batch) => {
    sessionStorage.setItem("selectedBatch", batch.label);
    navigate("/select-department", { state: { batch: batch.label } });
  };

  return (
    <div style={styles.wrapper}>
      {/* White Header Banner */}
      <div style={styles.headerBanner}>
        <h2 style={styles.title}>Select Your Batch</h2>
      </div>

      {/* Subtitle below header */}
      <p style={styles.subtitle}>🎓 Choose your graduation year to continue</p>

      <div style={styles.content}>
        {loading ? (
          <SIETLoader />
        ) : (
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
              </div>
            ))}
          </div>
        )}
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
  icon: {
    fontSize: "2.2rem",
    color: "#2e7d32",
    marginBottom: "0.75rem",
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
};

export default BatchSelectionPage;