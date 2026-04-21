import React, { useState, useEffect } from "react";
import placementService from "../../services/placementService";
import SIETLoader from "../SIETLoader";

const CompanyRecruiters = () => {
  const [companyData, setCompanyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startIndex, setStartIndex] = useState(0);
  const visibleCards = 5;

  useEffect(() => {
    const fetchRecruiters = async () => {
      try {
        const data = await placementService.getRecruiters();
        setCompanyData(data);
      } catch (error) {
        console.error('Error fetching recruiters:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecruiters();
  }, []);

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setStartIndex((prev) => Math.min(companyData.length - visibleCards, prev + 1));
  };

  const visibleCompanies = companyData.slice(startIndex, startIndex + visibleCards);

  if (loading) {
    return <SIETLoader />;
  }

  return (
    <>
      <div className="recruiters-wrapper">
        <h2 className="recruiters-title">Company Recruiters</h2>

        <div className="recruiters-section">
          <span
            className={`arrow-btn ${startIndex === 0 ? 'disabled' : ''}`}
            onClick={startIndex > 0 ? handlePrev : undefined}
          >
            ‹
          </span>

          <div className="company-cards">
            {visibleCompanies.map((company, index) => (
              <div className="company-card" key={index}>
                <div className="company-logo">
                  <img
                    src={company.logo}
                    alt={company.name}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="placeholder-logo">
                    {company.name.charAt(0)}
                  </div>
                </div>
                <div className="company-name">{company.name}</div>
                <div className="company-industry">{company.industry}</div>
                <div className="company-package">Avg: {company.avgPackage}</div>
                <div className="company-since">Since {company.visitingSince}</div>
              </div>
            ))}
          </div>

          <span
            className={`arrow-btn ${startIndex >= companyData.length - visibleCards ? 'disabled' : ''}`}
            onClick={startIndex < companyData.length - visibleCards ? handleNext : undefined}
          >
            ›
          </span>
        </div>
      </div>

      <style>{`
        .recruiters-wrapper {
          width: 100%;
          background-color: #f0f8f0;
          padding: 0;
          margin-top: 0;
        }

        .recruiters-title {
          text-align: center;
          color: green;
          font-size: 2.4rem;
          margin: 0;
          padding: 1rem 0;
          background-color: white;
        }

        .recruiters-section {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          gap: 1rem;
        }

        .arrow-btn {
          color: green;
          font-size: 3rem;
          cursor: pointer;
          transition: all 0.2s ease;
          user-select: none;
          line-height: 1;
        }

        .arrow-btn:hover:not(.disabled) {
          color: #228b22;
        }

        .arrow-btn.disabled {
          color: #ccc;
          cursor: not-allowed;
        }

        .company-cards {
          display: flex;
          gap: 1.5rem;
        }

        .company-card {
          background: #fff;
          padding: 1.5rem;
          border-radius: 12px;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
          text-align: center;
          min-width: 180px;
          max-width: 200px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .company-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
        }

        .company-logo {
          width: 70px;
          height: 70px;
          margin: 0 auto 1rem auto;
          border-radius: 50%;
          overflow: hidden;
          background: #f5f5f5;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .company-logo img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }

        .placeholder-logo {
          display: none;
          width: 100%;
          height: 100%;
          background: #2e7d32;
          color: white;
          font-size: 1.8rem;
          font-weight: bold;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
        }

        .company-name {
          font-size: 1.1rem;
          font-weight: bold;
          color: #333;
          margin-bottom: 0.3rem;
        }

        .company-industry {
          font-size: 0.9rem;
          color: #777;
          margin-bottom: 0.5rem;
        }

        .company-package {
          font-size: 1rem;
          font-weight: 600;
          color: #2e7d32;
          margin-bottom: 0.3rem;
        }

        .company-since {
          font-size: 0.85rem;
          color: #888;
        }

        @media (max-width: 1024px) {
          .company-cards {
            gap: 1rem;
          }
          .company-card {
            min-width: 150px;
          }
        }

        @media (max-width: 768px) {
          .company-card {
            min-width: 130px;
            padding: 1rem;
          }
          .arrow-btn {
            font-size: 2rem;
          }
        }
      `}</style>
    </>
  );
};

export default CompanyRecruiters;
