import React from "react";

const TrainingActivities = () => {
  const activities = [
    "Mock interviews conducted by industry professionals",
    "Aptitude training sessions (Quantitative, Logical, Verbal)",
    "Resume building and review workshops",
    "Technical assessments and coding practice",
    "Soft skills development programs",
    "Group discussion practice sessions",
    "Communication and presentation skills training",
    "Industry-specific domain knowledge sessions"
  ];

  return (
    <>
      <div className="training-wrapper">
        <h2 className="training-title">Training & Placement Activities</h2>

        <div className="training-section">
          <div className="training-image">
            <img src="/images/placement/records/training.jpg" alt="Training Activities" />
          </div>
          <div className="training-info">
            <ul className="training-list">
              {activities.map((activity, index) => (
                <li key={index}>{activity}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <style>{`
        .training-wrapper {
          width: 100%;
          background-color: #f0f8f0;
          padding: 0;
          margin-top: 0;
        }

        .training-title {
          text-align: center;
          color: green;
          font-size: 2.4rem;
          margin: 0;
          padding: 1rem 0;
          background-color: white;
        }

        .training-section {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          column-gap: 2.5cm;
        }

        .training-image img {
          width: 300px;
          height: 300px;
          object-fit: cover;
          border-radius: 50%;
          margin: 0 2cm;
          box-shadow: 0 0 25px rgba(0, 128, 0, 0.35);
          transition: box-shadow 0.3s ease-in-out;
        }

        .training-image img:hover {
          box-shadow: 0 0 35px rgba(0, 128, 0, 0.55);
        }

        .training-info {
          flex: 1;
          max-width: calc(100% - 270px - 2cm);
          margin: 1rem;
        }

        .training-list {
          list-style: disc;
          padding-left: 1.5rem;
          color: #444;
          font-size: 1.2rem;
          line-height: 2;
          margin: 0;
        }

        .training-list li {
          margin-bottom: 0.3rem;
        }

        @media (max-width: 768px) {
          .training-section {
            flex-direction: column;
            gap: 2rem;
          }

          .training-image img {
            margin: 0 auto;
          }

          .training-info {
            max-width: 100%;
            text-align: left;
          }
        }
      `}</style>
    </>
  );
};

export default TrainingActivities;
