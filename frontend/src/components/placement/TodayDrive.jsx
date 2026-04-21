import React, { useState, useEffect } from "react";
import placementService from "../../services/placementService";
import SIETLoader from "../SIETLoader";

const TodayDrive = () => {
  const [todayDrive, setTodayDrive] = useState({ available: false });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTodayDrive = async () => {
      try {
        const data = await placementService.getTodayDrive();
        setTodayDrive(data);
      } catch (error) {
        console.error('Error fetching today\'s drive:', error);
        setTodayDrive({ available: false });
      } finally {
        setLoading(false);
      }
    };
    fetchTodayDrive();
  }, []);

  if (loading) {
    return <SIETLoader />;
  }

  return (
    <>
      <div className="drive-wrapper">
        <h2 className="drive-title">Today's Placement Drive</h2>

        <div className="drive-section">
          {todayDrive.available ? (
            <div className="drive-content">
              <div className="drive-logo">
                <img
                  src={todayDrive.companyLogo}
                  alt={todayDrive.company}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="placeholder-logo">
                  {todayDrive.company.charAt(0)}
                </div>
              </div>
              <div className="drive-info">
                <p><strong>Company:</strong> {todayDrive.company}</p>
                <p><strong>Package:</strong> {todayDrive.package}</p>
                <p><strong>Date:</strong> {todayDrive.date}</p>
                <p><strong>Reporting Time:</strong> {todayDrive.reportingTime}</p>
                <p><strong>Venue:</strong> {todayDrive.venue}</p>
              </div>
            </div>
          ) : (
            <div className="no-drive-content">
              <p>📅 No placement drive scheduled for today</p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .drive-wrapper {
          width: 100%;
          background-color: #f0f8f0;
          padding: 0;
          margin-top: 0;
        }

        .drive-title {
          text-align: center;
          color: green;
          font-size: 2.4rem;
          margin: 0;
          padding: 1rem 0;
          background-color: white;
        }

        .drive-section {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          column-gap: 2.5cm;
        }

        .drive-content {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: 2rem;
        }

        .drive-logo {
          width: 200px;
          height: 200px;
          border-radius: 50%;
          overflow: hidden;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 20px rgba(0, 128, 0, 0.3);
        }

        .drive-logo img {
          max-width: 120px;
          max-height: 120px;
          object-fit: contain;
        }

        .placeholder-logo {
          display: none;
          width: 100%;
          height: 100%;
          background: #2e7d32;
          color: white;
          font-size: 3rem;
          font-weight: bold;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
        }

        .drive-info {
          color: #444;
          font-size: 1.2rem;
          line-height: 2;
        }

        .drive-info p {
          margin: 0.3rem 0;
        }

        .no-drive-content {
          text-align: center;
          padding: 2rem;
          font-size: 1.2rem;
          color: #555;
        }

        @media (max-width: 768px) {
          .drive-content {
            flex-direction: column;
            text-align: center;
          }
          
          .drive-logo {
            width: 120px;
            height: 120px;
          }
          
          .drive-logo img {
            max-width: 100px;
            max-height: 100px;
          }
        }
      `}</style>
    </>
  );
};

export default TodayDrive;
