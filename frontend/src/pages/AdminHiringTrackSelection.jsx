import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { isAdmin } from "../data/authCredentials";
import studentService from "../services/studentService";
import SIETLoader from "../components/SIETLoader";

const AdminHiringTrackSelection = () => {
    const navigate = useNavigate();
    const { batch } = useParams();
    const [tracks, setTracks] = useState([]);
    const [loading, setLoading] = useState(true);

    // Redirect if not admin
    React.useEffect(() => {
        if (!isAdmin()) {
            navigate('/');
        }
    }, [navigate]);

    // Fetch training batches from backend
    useEffect(() => {
        const fetchTracks = async () => {
            try {
                const data = await studentService.getTrainingBatches();
                setTracks(data);
            } catch (error) {
                console.error('Error fetching training batches:', error);
                // Fallback to default tracks
                setTracks(["Java", "Python", "Cloud", "MERN Stack", "DevOps"]);
            } finally {
                setLoading(false);
            }
        };
        fetchTracks();
    }, []);

    const handleSelect = (track) => {
        navigate(`/admin/shortlisting/${encodeURIComponent(batch)}/${encodeURIComponent(track)}/filters`);
    };

    if (loading) {
        return <SIETLoader />;
    }

    return (
        <div style={styles.wrapper}>
            {/* White Header Banner */}
            <div style={styles.headerBanner}>
                <h2 style={styles.title}>Batch: {decodeURIComponent(batch)}</h2>
            </div>

            {/* Subtitle below header */}
            <p style={styles.subtitle}>📚 Select a Training Batch</p>

            <div className="track-grid" style={styles.grid}>
                {tracks.map((track, index) => (
                    <motion.div
                        key={index}
                        className="track-card"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.02 }}
                        onClick={() => handleSelect(track)}
                    >
                        {track}
                    </motion.div>
                ))}
            </div>

            <style>{`
                .track-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
                    gap: 2.2rem;
                    max-width: 1100px;
                    margin: 0 auto;
                    padding: 1.5rem 2rem;
                }

                .track-card {
                    background: #ffffff;
                    padding: 2.8rem;
                    border-radius: 14px;
                    text-align: center;
                    font-size: 1.1rem;
                    font-weight: 600;
                    color: #2e7d32;
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
                    cursor: pointer;
                    transition: all 0.3s ease-in-out;
                    min-height: 100px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    user-select: none;
                }

                .track-card:hover {
                    background-color: #e8f9e8;
                    box-shadow: 0 12px 24px rgba(34, 139, 34, 0.15);
                }

                @media (max-width: 768px) {
                    .track-card {
                        font-size: 1rem;
                        padding: 2rem;
                        min-height: 90px;
                    }

                    .track-grid {
                        gap: 1.8rem;
                    }
                }

                @media (max-width: 480px) {
                    .track-card {
                        font-size: 0.95rem;
                        padding: 1.6rem;
                        min-height: 80px;
                    }

                    .track-grid {
                        gap: 1.5rem;
                    }
                }
            `}</style>
        </div>
    );
};

const styles = {
    wrapper: {
        backgroundColor: "#f0f8f0",
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
        fontWeight: "bold",
        margin: 0,
    },
    subtitle: {
        fontSize: "1.1rem",
        color: "#555",
        textAlign: "center",
        marginBottom: "1rem",
    },
    grid: {
        zIndex: 1,
    },
};

export default AdminHiringTrackSelection;
