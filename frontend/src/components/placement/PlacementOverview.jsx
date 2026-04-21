import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import placementService from "../../services/placementService";
import SIETLoader from "../SIETLoader";

const PlacementOverview = () => {
  const navigate = useNavigate();
  const [statsData, setStatsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await placementService.getStats();
        setStatsData(data);
      } catch (error) {
        console.error('Error fetching stats:', error);
        // Set default values if fetch fails
        setStatsData({
          totalCompaniesVisited: 0,
          totalOffersMade: 0,
          highestPackage: 'N/A',
          averagePackage: 'N/A'
        });
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  // Default values if no data
  const stats = statsData || {
    totalCompaniesVisited: 0,
    totalOffersMade: 0,
    highestPackage: 'N/A',
    averagePackage: 'N/A'
  };

  return (
    <>
      <div className="overview-wrapper">
        <h2 className="overview-title">Overview & Statistics</h2>

        {loading ? (
          <SIETLoader />
        ) : (
          <div className="overview-section">
            <div className="stats-row">
              <div className="stat-card">
                <div className="stat-number">{stats.totalCompaniesVisited}+</div>
                <div className="stat-label">Companies Visited</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{stats.totalOffersMade}+</div>
                <div className="stat-label">Offers Made</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{stats.highestPackage}</div>
                <div className="stat-label">Highest Package</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{stats.averagePackage}</div>
                <div className="stat-label">Average Package</div>
              </div>
            </div>

            <div className="btn-container">
              <div className="overview-box-btn" onClick={() => navigate("/placement-statistics")}>
                View Full Statistics
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .overview-wrapper {
          width: 100%;
          background-color: #f0f8f0;
          padding: 0;
          margin-top: 0;
        }

        .overview-title {
          text-align: center;
          color: green;
          font-size: 2.4rem;
          margin: 0;
          padding: 1rem 0;
          background-color: white;
        }

        .overview-section {
          padding: 0.5rem 2rem 1.5rem 2rem;
        }

        .stats-row {
          display: flex;
          justify-content: center;
          gap: 1.5rem;
          flex-wrap: wrap;
          margin-top: 1rem;
          margin-bottom: 1.5rem;
        }

        .stat-card {
          background: #fff;
          padding: 1.5rem 2rem;
          border-radius: 12px;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
          text-align: center;
          min-width: 160px;
          flex: 1;
          max-width: 220px;
        }

        .stat-number {
          font-size: 2rem;
          font-weight: bold;
          color: #2e7d32;
        }

        .stat-label {
          margin-top: 0.5rem;
          font-size: 0.95rem;
          color: #555;
        }

        .btn-container {
          text-align: center;
        }

        .overview-box-btn {
          display: inline-block;
          padding: 1rem 1.5rem;
          border: 2px solid #228b22;
          background-color: #ffffff;
          border-radius: 10px;
          color: #228b22;
          font-weight: bold;
          font-size: 1.1rem;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .overview-box-btn:hover {
          background-color: #eaf8ea;
        }

        @media (max-width: 768px) {
          .stat-card {
            min-width: 140px;
          }
        }
      `}</style>
    </>
  );
};

export default PlacementOverview;
