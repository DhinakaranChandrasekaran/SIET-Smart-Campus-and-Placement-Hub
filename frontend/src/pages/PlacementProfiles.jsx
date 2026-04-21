import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import placementService from "../services/placementService";
import SIETLoader from "../components/SIETLoader";

const PlacementProfiles = () => {
  const { batch } = useParams();
  const navigate = useNavigate();
  const decodedBatch = decodeURIComponent(batch);
  const [placementRecords, setPlacementRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlacementRecords = async () => {
      try {
        const data = await placementService.getRecordsByBatch(decodedBatch);
        setPlacementRecords(data);
      } catch (error) {
        console.error('Error fetching placement records:', error);
        // Fallback to empty array
        setPlacementRecords([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPlacementRecords();
  }, [decodedBatch]);

  if (loading) {
    return <SIETLoader />;
  }

  const handleRegNoClick = (regNo) => {
    navigate(`/student/profile/${regNo}`);
  };

  return (
    <>
      <div className="profiles-wrapper">
        <div className="profiles-header">
          <h2 className="profiles-title">Placed Students : {decodedBatch}</h2>
        </div>

        <div className="table-container">
          {placementRecords.length > 0 ? (
            <table className="placement-table">
              <thead>
                <tr>
                  <th>Register Number</th>
                  <th>Name</th>
                  <th>Department</th>
                  <th>Company</th>
                  <th>Job Role</th>
                  <th>Package</th>
                </tr>
              </thead>
              <tbody>
                {placementRecords.map((record, index) => (
                  <tr key={index}>
                    <td
                      className="reg-no-cell"
                      onClick={() => handleRegNoClick(record.regNo)}
                    >
                      {record.regNo}
                    </td>
                    <td>{record.name}</td>
                    <td>{record.department}</td>
                    <td>{record.company}</td>
                    <td>{record.jobRole}</td>
                    <td>{record.packageAmount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="no-students">
              <p>No students found for batch {decodedBatch}</p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .profiles-wrapper {
          background: #f0f8f0;
          min-height: 100vh;
          font-family: 'Segoe UI', sans-serif;
        }

        .profiles-header {
          background: white;
          padding: 0.5rem 0;
          text-align: center;
        }

        .profiles-title {
          font-size: 2.4rem;
          color: green;
          margin: 0;
          padding: 0.5rem 0;
        }

        .back-container {
          padding: 1rem 2rem;
        }

        .back-btn {
          padding: 0.6rem 1.2rem;
          font-size: 0.95rem;
          color: #2e7d32;
          background-color: #fff;
          border: 2px solid #2e7d32;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .back-btn:hover {
          background-color: #eaf8ea;
        }

        .table-container {
          padding: 0 2rem 2rem;
          overflow-x: auto;
        }

        .placement-table {
          width: 100%;
          border-collapse: collapse;
          background-color: #fff;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 10px rgba(0,0,0,0.05);
        }

        .placement-table th {
          background-color: #2e7d32;
          color: #fff;
          padding: 1rem;
          text-align: center;
          font-size: 0.95rem;
          font-weight: 600;
          border-right: 1px solid rgba(255,255,255,0.2);
        }

        .placement-table th:last-child {
          border-right: none;
        }

        /* Column widths */
        .placement-table th:nth-child(1),
        .placement-table td:nth-child(1) {
          width: 12%;
        }

        .placement-table th:nth-child(2),
        .placement-table td:nth-child(2) {
          width: 20%;
        }

        .placement-table tr {
          border-bottom: 1px solid #eee;
          transition: background-color 0.2s ease;
        }

        .placement-table tr:hover {
          background-color: #f5f5f5;
        }

        .placement-table td {
          padding: 1rem;
          font-size: 0.95rem;
          color: #333;
          text-align: center;
          border-right: 1px solid #eee;
        }

        .placement-table td:last-child {
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

        .no-students {
          text-align: center;
          padding: 3rem;
          color: #666;
        }

        @media (max-width: 768px) {
          .table-container {
            padding: 0 1rem 1rem;
          }
          
          .placement-table th,
          .placement-table td {
            padding: 0.75rem 0.5rem;
            font-size: 0.85rem;
          }
        }
      `}</style>
    </>
  );
};

export default PlacementProfiles;
