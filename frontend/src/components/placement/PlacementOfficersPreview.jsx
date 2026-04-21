import React from "react";
import { useNavigate } from "react-router-dom";

const PlacementOfficersPreview = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="officers-preview-wrapper">
        <h2 className="officers-preview-title">Placement Officers</h2>

        <div className="officers-preview-section">
          <div className="officers-content">
            {/* Left: Image */}
            <div className="officers-image">
              <img
                src="/images/placement/records/placementofficers.jpg"
                alt="Placement Officers Team"
                onError={(e) => {
                  e.target.src = "/images/placement/default-team.jpg";
                }}
              />
            </div>

            {/* Right: Text */}
            <div className="officers-text">
              <p>
                Our dedicated Placement Officers team works tirelessly to bridge the gap between
                academia and industry. Led by our experienced Placement Heads, our team of skilled
                trainers provides comprehensive training and guidance to students, preparing them
                for successful careers.
              </p>
              <p>
                The team organizes campus recruitment drives, conducts pre-placement training sessions,
                and maintains strong relationships with leading companies across various sectors.
                Their commitment ensures that our students are well-prepared and confident when
                they step into the professional world.
              </p>
            </div>
          </div>

          <div className="btn-container">
            <div
              className="officers-box-btn"
              onClick={() => navigate("/placement-officers")}
            >
              Meet Our Placement Officers
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .officers-preview-wrapper {
          width: 100%;
          background-color: #f0f8f0;
          padding: 0;
          margin-top: 0;
        }

        .officers-preview-title {
          text-align: center;
          color: green;
          font-size: 2.4rem;
          margin: 0;
          padding: 1rem 0;
          background-color: white;
        }

        .officers-preview-section {
          padding: 1.5rem;
        }

        .officers-content {
          display: flex;
          gap: 2.5cm;
          align-items: center;
          margin-bottom: 0.5rem;
        }

        .officers-image {
          flex: 0;
          max-width: 300px;
          display: flex;
          align-items: center;
          
        }

        .officers-image img {
          width: 300px;
          height: 300px;
          border-radius: 50%;
          object-fit: cover;
          margin-left: 2cm;
          box-shadow: 0 0 25px rgba(0, 128, 0, 0.35);
          transition: box-shadow 0.3s ease-in-out;
        }

        .officers-image img:hover {
          box-shadow: 0 0 35px rgba(0, 128, 0, 0.55);
        }

        .officers-text {
          flex: 1;
          max-width: calc(100% - 270px - 2cm);
          margin-right: 2cm;
          margin-left: 2cm;
          margin-bottom: 2rem;
        }

        .officers-text p {
          font-size: 1.1rem;
          line-height: 1.8;
          color: #333;
          margin-bottom: 1rem;
          text-align: justify;
        }

        .btn-container {
          text-align: center;
          margin-top: 1rem;
        }

        .officers-box-btn {
          display: inline-block;
          padding: 1rem 1.5rem;
          border: 2px solid #228b22;
          background-color: #ffffff;
          border-radius: 10px;
          color: #228b22;
          font-weight: bold;
          font-size: 1.1rem;
          margin-right: 7cm;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .officers-box-btn:hover {
          background-color: #eaf8ea;
        }

        @media (max-width: 768px) {
          .officers-preview-section {
            padding: 1.5rem 1rem;
          }

          .officers-content {
            flex-direction: column;
            gap: 1.5rem;
          }

          .officers-image {
            max-width: 100%;
          }

          .officers-text p {
            font-size: 1rem;
          }
        }
      `}</style>
    </>
  );
};

export default PlacementOfficersPreview;