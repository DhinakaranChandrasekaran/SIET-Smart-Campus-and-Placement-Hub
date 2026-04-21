import React from "react";
import placementOfficers from "../../data/placementOfficers";

const PlacementOfficers = () => {
    const { heads, trainers } = placementOfficers;

    return (
        <div style={{ backgroundColor: "#f0f8f0", paddingBottom: "2rem" }}>
            {/* Section Title */}
            <div
                style={{
                    backgroundColor: "white",
                    padding: "0.5rem 0",
                    textAlign: "center",
                    marginBottom: "2rem",
                }}
            >
                <h2 style={{ fontSize: "2.4rem", color: "#2e7d32", margin: 0 }}>
                    Placement Officers
                </h2>
            </div>

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
                    <h3 style={{ fontSize: "2rem", color: "#2e7d32", margin: 0 }}>
                        Placement Heads
                    </h3>
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
                        borderRadius: 50%;
                        backgroundColor: #2e7d32;
                        display: flex;
                        alignItems: center;
                        justifyContent: center;
                        color: white;
                        fontSize: 3rem;
                        fontWeight: bold;
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
                    <h3 style={{ fontSize: "2rem", color: "#2e7d32", margin: 0 }}>
                        Placement Trainers
                    </h3>
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
                        borderRadius: 50%;
                        backgroundColor: #2e7d32;
                        display: flex;
                        alignItems: center;
                        justifyContent: center;
                        color: white;
                        fontSize: 3rem;
                        fontWeight: bold;
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

export default PlacementOfficers;
