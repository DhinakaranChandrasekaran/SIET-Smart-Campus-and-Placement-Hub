import React from 'react';
import { useNavigate } from 'react-router-dom'; // For routing

const PlacementSection = () => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate("/placement");
  };

  return (
    <>
      <div className="placement-wrapper">
        {/* Title */}
        <h2 className="placement-title">SIET Placements</h2>

        <div className="placement-section">
          {/* Text Left */}
          <div className="placement-info">
            <p>
              Our dedicated placement cell at SIET consistently delivers excellent placement outcomes through structured training and career guidance. Students receive expert support through mock interviews, resume workshops, and aptitude development programs. Strong industry collaborations help bridge the gap between academics and professional expectations. With a 95% placement rate and over 100 recruiting companies visiting campus, students gain access to diverse career opportunities. The placement cell focuses on holistic career development and long-term success. This ensures every student is well-prepared for competitive hiring environments
            </p>

            {/* Box-style button */}
            <div className="placement-box-btn" onClick={handleViewDetails}>
              View Placement Details
            </div>
          </div>

          {/* Image Right */}
          <div className="placement-image">
            <img src="/images/placement.jpg" alt="Placement" />
          </div>
        </div>
      </div>

      {/* CSS Styles */}
      <style>{`
        .placement-wrapper {
          width: 100%;
          background-color: #f0f8f0;
          padding: 0;
          margin-top: 0;
        }

        .placement-title {
          text-align: center;
          color: green;
          font-size: 2.4rem;
          margin: 0;
          padding: 1rem 0;
          background-color: white;
        }

        .placement-section {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          column-gap: 2.5cm;
        }

        .placement-info {
          flex: 1;
          max-width: calc(100% - 270px - 2cm);
          margin-left: 2cm;
        }

        .placement-info p {
          color: #444;
          font-size: 1.2rem;
          line-height: 1.8;
          margin-bottom: 1.2rem;
        }

        /* Box-style button */
        .placement-box-btn {
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
          text-align: center;
        }

        .placement-box-btn:hover {
          background-color: #eaf8ea;
        }

        .placement-image img {
          width: 300px;
          height: 300px;
          object-fit: cover;
          border-radius: 50%;
          margin-right: 2cm;

          /* Green highlight glow */
          box-shadow: 0 0 25px rgba(0, 128, 0, 0.35);
          transition: box-shadow 0.3s ease-in-out;
        }

        .placement-image img:hover {
          box-shadow: 0 0 35px rgba(0, 128, 0, 0.55);
        }

        @media (max-width: 768px) {
          .placement-section {
            flex-direction: column-reverse;
            gap: 2rem;
          }

          .placement-info {
            margin: 0;
            max-width: 100%;
            text-align: center;
          }

          .placement-image img {
            margin: 0 auto;
          }
        }
      `}</style>
    </>
  );
};

export default PlacementSection;
