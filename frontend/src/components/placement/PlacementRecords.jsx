import React from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../../data/authCredentials";

const PlacementRecords = () => {
  const navigate = useNavigate();

  const handleViewRecords = () => {
    if (isAuthenticated()) {
      // User is logged in, go directly to placement batch selection
      navigate("/placement-batch-selection");
    } else {
      // User not logged in, redirect to sign-in first
      navigate("/sign-in");
    }
  };

  return (
    <>
      <div className="records-wrapper">
        <h2 className="records-title">Student Placement Records</h2>

        <div className="records-section">
          <div className="records-info">
            <p>
              Explore the successful placement records of SIET students across various
              batches and departments. Our comprehensive placement database showcases the
              achievements of our graduates who have secured positions in leading companies
              across diverse industries.
            </p>
            <p>
              View detailed statistics, company-wise placements, and
              individual success stories that highlight the quality of education and
              preparation provided at SIET.
            </p>
            <div className="records-box-btn" onClick={handleViewRecords}>
              View Placement Records
            </div>
          </div>
          <div className="records-image">
            <img src="/images/placement/records/placementrecord.jpg" alt="Placement Records" />
          </div>
        </div>
      </div>

      <style>{`
        .records-wrapper {
          width: 100%;
          background-color: #f0f8f0;
          padding: 0;
          margin-top: 0;
        }

        .records-title {
          text-align: center;
          color: green;
          font-size: 2.4rem;
          margin: 0;
          padding: 1rem 0;
          background-color: white;
        }

        .records-section {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          column-gap: 2.5cm;
        }

        .records-image img {
          width: 300px;
          height: 300px;
          object-fit: cover;
          border-radius: 50%;
          margin-right: 2cm;
          box-shadow: 0 0 25px rgba(0, 128, 0, 0.35);
          transition: box-shadow 0.3s ease-in-out;
        }

        .records-image img:hover {
          box-shadow: 0 0 35px rgba(0, 128, 0, 0.55);
        }

        .records-info {
          flex: 1;
          max-width: calc(100% - 270px - 2cm);
          margin-left: 2cm;
        }

        .records-info p {
          color: #444;
          font-size: 1.2rem;
          line-height: 1.8;
          margin-bottom: 1.2rem;
        }

        .records-box-btn {
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
          margin-top: 1rem;
        }

        .records-box-btn:hover {
          background-color: #eaf8ea;
        }

        @media (max-width: 768px) {
          .records-section {
            flex-direction: column;
            gap: 2rem;
          }

          .records-image img {
            margin: 0 auto;
          }

          .records-info {
            max-width: 100%;
            text-align: center;
          }
        }
      `}</style>
    </>
  );
};

export default PlacementRecords;
