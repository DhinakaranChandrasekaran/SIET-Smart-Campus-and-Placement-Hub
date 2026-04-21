import React, { useState, useEffect } from "react";
import placementService from "../services/placementService";
import SIETLoader from "../components/SIETLoader";

const PlacementOfficersPage = () => {
    const [placementOfficers, setPlacementOfficers] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOfficers = async () => {
            try {
                const data = await placementService.getOfficers();
                setPlacementOfficers(data);
            } catch (error) {
                console.error('Error fetching officers:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchOfficers();
    }, []);

    if (loading) {
        return <SIETLoader />;
    }

    if (!placementOfficers) {
        return (
            <div style={{ backgroundColor: "#f0f8f0", minHeight: "100vh", padding: "2rem", textAlign: "center" }}>
                <h2>No data available</h2>
            </div>
        );
    }

    const { heads, trainers } = placementOfficers;

    return (
        <div style={{ backgroundColor: "#f0f8f0", minHeight: "100vh", paddingBottom: "2rem" }}>
            {/* Placement Heads Section */}
            <div style={{ marginBottom: "3rem" }}>
                <div
                    style={{
                        backgroundColor: "white",
                        padding: "0.5rem 0",
                        textAlign: "center",
                        marginBottom: "2rem",
                    }}
                >
                    <h2 style={{ fontSize: "2.2rem", color: "#2e7d32", margin: 0 }}>
                        Placement Heads
                    </h2>
                </div>

                <div
                    style={{
                        padding: "2rem 4rem",
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 350px)",
                        gap: "8rem",
                        justifyContent: "center",
                        alignItems: "start",
                    }}
                    className="placement-cards-container"
                >
                    {heads.map((head, idx) => (
                        <div
                            key={idx}
                            className="placement-card"
                            style={{
                                width: "350px",
                                height: "350px",
                                backgroundColor: "white",
                                borderRadius: "16px",
                                overflow: "hidden",
                                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                                cursor: "pointer",
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            {/* Image Section - 3/4 of card */}
                            <div
                                style={{
                                    flex: "3",
                                    backgroundColor: "#e8f5e9",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    overflow: "hidden",
                                }}
                            >
                                <img
                                    src={head.photo}
                                    alt={head.name}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                    }}
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.style.display = "none";
                                        e.target.parentElement.innerHTML = `
                      <div style="
                        width: 120px;
                        height: 120px;
                        border-radius: 50%;
                        background-color: #2e7d32;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: white;
                        font-size: 3rem;
                        font-weight: bold;
                      ">${head.name.charAt(0).toUpperCase()}</div>
                    `;
                                    }}
                                />
                            </div>

                            {/* Name & Position Section - 1/4 of card */}
                            <div
                                style={{
                                    flex: "1",
                                    padding: "0.5rem",
                                    background: "linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%)",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    textAlign: "center",
                                }}
                            >
                                <h4
                                    style={{
                                        margin: "0 0 0.3rem 0",
                                        color: "white",
                                        fontSize: "1rem",
                                        fontWeight: "600",
                                        lineHeight: "1.2",
                                    }}
                                >
                                    {head.name}
                                </h4>
                                <p
                                    style={{
                                        margin: 0,
                                        color: "rgba(255, 255, 255, 0.9)",
                                        fontSize: "0.85rem",
                                        fontStyle: "italic",
                                    }}
                                >
                                    {head.position}
                                </p>
                                {head.trainingBatch && (
                                    <p
                                        style={{
                                            margin: "0.2rem 0 0 0",
                                            color: "rgba(255, 255, 255, 0.8)",
                                            fontSize: "0.75rem",
                                            fontWeight: "500",
                                        }}
                                    >
                                        Batch: {head.trainingBatch}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Placement Trainers Section */}
            <div>
                <div
                    style={{
                        backgroundColor: "white",
                        padding: "0.5rem 0",
                        textAlign: "center",
                        marginBottom: "2rem",
                    }}
                >
                    <h2 style={{ fontSize: "2.2rem", color: "#2e7d32", margin: 0 }}>
                        Placement Trainers
                    </h2>
                </div>

                <div
                    style={{
                        padding: "2rem 4rem",
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 350px)",
                        gap: "8rem",
                        justifyContent: "center",
                        alignItems: "start",
                    }}
                    className="placement-cards-container"
                >
                    {trainers.map((trainer, idx) => (
                        <div
                            key={idx}
                            className="placement-card"
                            style={{
                                width: "350px",
                                height: "350px",
                                backgroundColor: "white",
                                borderRadius: "16px",
                                overflow: "hidden",
                                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                                cursor: "pointer",
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            {/* Image Section - 3/4 of card */}
                            <div
                                style={{
                                    flex: "3",
                                    backgroundColor: "#e8f5e9",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    overflow: "hidden",
                                }}
                            >
                                <img
                                    src={trainer.photo}
                                    alt={trainer.name}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                    }}
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.style.display = "none";
                                        e.target.parentElement.innerHTML = `
                      <div style="
                        width: 120px;
                        height: 120px;
                        border-radius: 50%;
                        background-color: #2e7d32;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: white;
                        font-size: 3rem;
                        font-weight: bold;
                      ">${trainer.name.charAt(0).toUpperCase()}</div>
                    `;
                                    }}
                                />
                            </div>

                            {/* Name & Position Section - 1/4 of card */}
                            <div
                                style={{
                                    flex: "1",
                                    padding: "0.5rem",
                                    background: "linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%)",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    textAlign: "center",
                                }}
                            >
                                <h4
                                    style={{
                                        margin: "0 0 0.3rem 0",
                                        color: "white",
                                        fontSize: "1rem",
                                        fontWeight: "600",
                                        lineHeight: "1.2",
                                    }}
                                >
                                    {trainer.name}
                                </h4>
                                <p
                                    style={{
                                        margin: 0,
                                        color: "rgba(255, 255, 255, 0.9)",
                                        fontSize: "0.85rem",
                                        fontStyle: "italic",
                                    }}
                                >
                                    {trainer.position}
                                </p>
                                {trainer.trainingBatch && (
                                    <p
                                        style={{
                                            margin: "0.2rem 0 0 0",
                                            color: "rgba(255, 255, 255, 0.8)",
                                            fontSize: "0.75rem",
                                            fontWeight: "500",
                                        }}
                                    >
                                        Batch: {trainer.trainingBatch}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Scoped CSS */}
            <style>{`
        .placement-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 30px rgba(46, 125, 50, 0.25);
        }

        @media (max-width: 1024px) {
          .placement-cards-container {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 4rem !important;
          }
        }

        @media (max-width: 768px) {
          .placement-cards-container {
            grid-template-columns: 1fr !important;
            padding: 1rem !important;
            gap: 2rem !important;
          }
        }
      `}</style>
        </div>
    );
};

export default PlacementOfficersPage;
