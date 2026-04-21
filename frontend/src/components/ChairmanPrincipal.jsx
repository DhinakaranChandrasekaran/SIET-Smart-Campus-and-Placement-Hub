import React from 'react';
import { useNavigate } from 'react-router-dom';

const ChairmanPrincipal = () => {
  const navigate = useNavigate();

  return (
    <>
      <h2 className="section-title">Our Leadership</h2>
      <div className="leadership-row">
        {/* Chairman Card */}
        <div className="leader-section">
          <h3 className="role-title">Chairman</h3>
          <div className="leader-card clickable" onClick={() => navigate('/ChairmanDetails')}>
            <img src="/images/chairman.jpg" alt="Chairman" className="leader-image" />
            <div className="leader-info">
              <h4>Dr. S. Thangavelu, M.Tech, Ph.D.</h4>
              <p className="designation">Chairman, SIET</p>
            </div>
          </div>
        </div>

        {/* Principal Card */}
        <div className="leader-section">
          <h3 className="role-title">Principal</h3>
          <div className="leader-card leader-card-reverse clickable" onClick={() => navigate('/PrincipalDetails')}>
            <div className="leader-info">
              <h4>Dr. N. K. Sakthivel, M.Tech, Ph.D.</h4>
              <p className="designation">Principal, SIET</p>
            </div>
            <img src="/images/principal.jpg" alt="Principal" className="leader-image" />
          </div>
        </div>
      </div>

      <style>{`
        .section-title {
          text-align: center;
          color: green;
          font-size: 2.4rem;
          margin: 0;
          padding: 1rem 0;
          background-color: white;
        }

        .leadership-row {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          gap: 8rem;
          padding: 1.5rem 5%;
          background-color: #f0f8f0;
          flex-wrap: nowrap; /* ✅ Keeps both in same row */
        }

        .leader-section {
          width: 50%;
          max-width: 600px;
        }

        .role-title {
          font-size: 1.8rem;
          margin-bottom: 1rem;
          color: green;
          text-align: center;
        }

        .leader-card {
          display: flex;
          align-items: center;
          background-color: transparent;
          padding: 2rem;
          transition: transform 0.2s ease;
        }

        .leader-card.clickable {
          cursor: pointer;
        }

        .leader-card.clickable:hover {
          transform: translateY(-5px);
        }

        .leader-image {
          width: 140px;
          height: 140px;
          border-radius: 50%;
          object-fit: cover;
          margin-right: 2rem;
          flex-shrink: 0;
        }

        .leader-card-reverse .leader-image {
          margin-right: 0;
          margin-left: 2rem;
        }

        .leader-card-reverse .leader-info {
          text-align: right;
        }

        .leader-info h4 {
          font-size: 1.4rem;
          margin-bottom: 0.3rem;
          color: #222;
        }

        .designation {
          color: #007B55;
          font-weight: bold;
          margin-bottom: 0.8rem;
        }

        .description {
          color: #555;
          font-size: 1rem;
          line-height: 1.5;
        }

        @media (max-width: 1024px) {
          .leadership-row {
            flex-direction: column;
            align-items: center;
          }

          .leader-section {
            width: 90%;
            max-width: 700px;
          }

          .leader-card {
            flex-direction: column;
            text-align: center;
          }

          .leader-image {
            margin: 0 0 1.5rem 0;
          }
        }
      `}</style>
    </>
  );
};

export default ChairmanPrincipal;
