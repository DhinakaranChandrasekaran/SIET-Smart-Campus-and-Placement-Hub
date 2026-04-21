import React from 'react';
import { useNavigate } from 'react-router-dom';

const Department = () => {
  const navigate = useNavigate();

  const handleImageClick = () => {
    navigate('/departments');
  };

  return (
    <>
      <div className="dept-wrapper">
        <h2 className="dept-title">About Department</h2>

        <div className="department-section">
          <div className="department-image">
            <img
              src="/images/dept.jpg"
              alt="Department"
              onClick={handleImageClick}
              style={{ cursor: 'pointer' }}
            />
          </div>

          <div className="department-info">
            <p>
              The departments at SIET are designed to provide a strong academic foundation, practical exposure, and research opportunities for students. Each department offers a specialized curriculum supported by industry-oriented training and state-of-the-art laboratories. Faculty members focus on innovation-driven learning and real-world problem solving. Students are encouraged to participate in projects, internships, and technical competitions. Strong industry collaborations enhance career readiness and professional growth. Overall, SIET departments nurture technical excellence, leadership qualities, and holistic development.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .dept-wrapper {
          width: 100%;
          background-color: #f0f8f0;
          padding: 0;
          margin-top: 0;
        }

        .dept-title {
          text-align: center;
          color: green;
          font-size: 2.4rem;
          margin: 0;
          padding: 1rem 0;
          background-color: white;
        }

        .department-section {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          padding: 2rem 1.5rem 1.5rem 1.5rem;
          column-gap: 2.5cm;
        }

        .department-image img {
          width: 300px;
          height: 300px;
          object-fit: cover;
          border-radius: 50%;
          margin-left: 2cm;
          box-shadow: 0 0 25px rgba(0, 128, 0, 0.35);
          transition: box-shadow 0.3s ease-in-out;
        }

        .department-image img:hover {
          box-shadow: 0 0 35px rgba(0, 128, 0, 0.55);
        }

        .department-info {
          flex: 1;
          max-width: calc(100% - 270px - 2cm);
          margin-right: 1.5cm;
        }

        .department-info p {
          color: #444;
          font-size: 1.2rem;
          line-height: 1.8;
          margin-bottom: 1.2rem;
        }

        @media (max-width: 768px) {
          .department-section {
            flex-direction: column;
            gap: 2rem;
          }

          .department-image img {
            margin: 0 auto;
          }

          .department-info {
            margin-right: 0;
            max-width: 100%;
            text-align: center;
          }
        }
      `}</style>
    </>
  );
};

export default Department;
