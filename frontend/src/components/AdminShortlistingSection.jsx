import React from 'react';
import { useNavigate } from 'react-router-dom';
import { isAdmin } from '../data/authCredentials';

const AdminShortlistingSection = () => {
  const navigate = useNavigate();

  // Only show this section if the user is admin
  if (!isAdmin()) {
    return null;
  }

  const handleViewShortlisting = () => {
    navigate('/admin/shortlisting/batches');
  };

  return (
    <>
      <div className="shortlisting-wrapper">
        {/* Title */}
        <h2 className="shortlisting-title">Student Shortlisting & Sorting</h2>

        <div className="shortlisting-section">
          {/* Image Left */}
          <div className="shortlisting-image">
            <img src="/images/student-profile/main-profile.jpg" alt="Shortlisting" />
          </div>

          {/* Text Right */}
          <div className="shortlisting-info">
            <p>
              The Admin Shortlisting System allows you to filter and sort students based on various criteria
              including CGPA, projects, domains, technologies, and departments.
            </p>
            <p>
              Easily shortlist candidates for placement drives by applying multiple filters
              and export the results to CSV for further analysis. Search students by name or register number and view detailed profiles
              for company-specific recruitment needs.
            </p>

            {/* Box-style button */}
            <div className="shortlisting-box-btn" onClick={handleViewShortlisting}>
              Start Shortlisting
            </div>
          </div>
        </div>
      </div>

      {/* CSS Styles */}
      <style>{`
        .shortlisting-wrapper {
          width: 100%;
          background-color: #f0f8f0;
          padding: 0;
          margin-top: 0;
        }

        .shortlisting-title {
          text-align: center;
          color: green;
          font-size: 2.4rem;
          margin: 0;
          padding: 1rem 0;
          background-color: white;
        }

        .shortlisting-section {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          column-gap: 2.5cm;
        }

        .shortlisting-info {
          flex: 1;
          max-width: calc(100% - 270px - 2cm);
          margin-right: 2cm;
        }

        .shortlisting-info p {
          color: #444;
          font-size: 1.2rem;
          line-height: 1.8;
          margin-bottom: 1.2rem;
        }

        /* Box-style button */
        .shortlisting-box-btn {
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

        .shortlisting-box-btn:hover {
          background-color: #eaf8ea;
        }

        .shortlisting-image img {
          width: 300px;
          height: 300px;
          object-fit: cover;
          border-radius: 50%;
          margin-left: 2cm;

          /* Green highlight glow */
          box-shadow: 0 0 25px rgba(0, 128, 0, 0.35);
          transition: box-shadow 0.3s ease-in-out;
        }

        .shortlisting-image img:hover {
          box-shadow: 0 0 35px rgba(0, 128, 0, 0.55);
        }

        @media (max-width: 768px) {
          .shortlisting-section {
            flex-direction: column;
            gap: 2rem;
          }

          .shortlisting-info {
            margin: 0;
            max-width: 100%;
            text-align: center;
          }

          .shortlisting-image img {
            margin: 0 auto;
          }
        }
      `}</style>
    </>
  );
};

export default AdminShortlistingSection;
