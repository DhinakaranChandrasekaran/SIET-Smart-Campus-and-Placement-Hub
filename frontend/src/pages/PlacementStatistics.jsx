import React, { useState, useEffect } from "react";
import placementService from "../services/placementService";
import SIETLoader from "../components/SIETLoader";

// Department abbreviation mapping for proper display
const deptAbbreviations = {
  'computer science and engineering': 'CSE',
  'computer science': 'CSE',
  'cse': 'CSE',
  'electronics and communication engineering': 'ECE',
  'electronics and communication': 'ECE',
  'ece': 'ECE',
  'electrical and electronics engineering': 'EEE',
  'electrical and electronics': 'EEE',
  'eee': 'EEE',
  'mechanical engineering': 'MECH',
  'mechanical': 'MECH',
  'mech': 'MECH',
  'civil engineering': 'CIVIL',
  'civil': 'CIVIL',
  'information technology': 'IT',
  'it': 'IT',
  'artificial intelligence and data science': 'AI-DS',
  'ai and ds': 'AI-DS',
  'aids': 'AI-DS',
  'ai-ds': 'AI-DS',
  'computer science and business systems': 'CSBS',
  'csbs': 'CSBS',
  'agriculture engineering': 'AGRI',
  'agricultural engineering': 'AGRI',
  'agri': 'AGRI',
};

const getDeptShortName = (dept) => {
  const lowerDept = dept.toLowerCase().trim();
  return deptAbbreviations[lowerDept] || dept.toUpperCase().substring(0, 4);
};

const PlacementStatistics = () => {
  const [yearWiseData, setYearWiseData] = useState([]);
  const [departmentWiseData, setDepartmentWiseData] = useState([]);
  const [companyData, setCompanyData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all placement records
        const records = await placementService.getAllRecords();

        // Calculate year-wise stats
        const batchCounts = {};
        records.forEach(record => {
          if (record.batch) {
            batchCounts[record.batch] = (batchCounts[record.batch] || 0) + 1;
          }
        });
        const yearData = Object.entries(batchCounts).map(([batch, count]) => ({
          year: batch,
          placed: count,
          status: batch >= "2023-2027" ? "Ongoing" : "Completed"
        })).sort((a, b) => a.year.localeCompare(b.year));

        // Calculate department-wise stats (from student data in records)
        const deptCounts = {};
        records.forEach(record => {
          if (record.department) {
            deptCounts[record.department] = (deptCounts[record.department] || 0) + 1;
          }
        });
        const deptData = Object.entries(deptCounts).map(([dept, count]) => ({
          department: dept,
          shortName: getDeptShortName(dept),
          placed: count
        }));

        // Calculate company-wise stats with year breakdown
        const companyCounts = {};
        const years = new Set();
        records.forEach(record => {
          if (record.company) {
            if (!companyCounts[record.company]) {
              companyCounts[record.company] = { total: 0, byYear: {}, packages: [] };
            }
            companyCounts[record.company].total++;
            // Track by batch/year
            if (record.batch) {
              years.add(record.batch);
              companyCounts[record.company].byYear[record.batch] =
                (companyCounts[record.company].byYear[record.batch] || 0) + 1;
            }
            if (record.packageAmount) {
              companyCounts[record.company].packages.push(record.packageAmount);
            }
          }
        });

        // Get unique years sorted
        const sortedYears = Array.from(years).sort().slice(-2); // Last 2 years

        const companyStats = Object.entries(companyCounts).map(([company, data]) => ({
          company,
          total: data.total,
          byYear: data.byYear,
          packageRange: data.packages.length > 0 ? data.packages[0] : "N/A"
        })).sort((a, b) => b.total - a.total).slice(0, 5);

        // Store years for table headers
        window.placementYears = sortedYears;

        setYearWiseData(yearData.length > 0 ? yearData : [
          { year: "2023-2027", placed: 0, status: "Ongoing" },
          { year: "2022-2026", placed: 0, status: "Completed" }
        ]);
        setDepartmentWiseData(deptData.length > 0 ? deptData : [
          { department: "Computer Science", shortName: "CSE", placed: 0 }
        ]);
        setCompanyData(companyStats);
      } catch (error) {
        console.error('Error fetching statistics:', error);
        // Fallback to default data
        setYearWiseData([
          { year: "2023-2027", placed: 0, status: "Ongoing" }
        ]);
        setDepartmentWiseData([
          { department: "Unknown", shortName: "N/A", placed: 0 }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const maxYearValue = Math.max(...yearWiseData.map(d => d.placed), 1);
  const maxDeptValue = Math.max(...departmentWiseData.map(d => d.placed), 1);

  if (loading) {
    return <SIETLoader />;
  }

  return (
    <div>
      <div className="stats-wrapper">
        {/* Year-wise Stats Chart */}
        <div className="chart-section">
          <h3 className="chart-heading">Year-wise Placement Statistics</h3>
          <div className="vertical-chart-container">
            <div className="vertical-bars">
              {yearWiseData.map((item, index) => (
                <div key={index} className="vbar-column">
                  <div className="vbar-value">{item.placed}</div>
                  <div className="vbar-track">
                    <div
                      className={`vbar-fill ${item.status === 'Ongoing' ? 'fill-ongoing' : 'fill-completed'}`}
                      style={{ height: `${(item.placed / maxYearValue) * 100}%` }}
                    ></div>
                  </div>
                  <div className="vbar-label">{item.year}</div>
                  <div className={`vbar-status ${item.status === 'Ongoing' ? 'status-ongoing' : 'status-completed'}`}>
                    {item.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Department-wise Stats */}
        <div className="chart-section">
          <h3 className="chart-heading">Department-wise Placement Statistics</h3>
          <div className="vertical-chart-container">
            <div className="vertical-bars">
              {departmentWiseData.map((item, index) => (
                <div key={index} className="vbar-column">
                  <div className="vbar-value">{item.placed}</div>
                  <div className="vbar-track">
                    <div
                      className="vbar-fill fill-dept"
                      style={{ height: `${(item.placed / maxDeptValue) * 100}%` }}
                    ></div>
                  </div>
                  <div className="vbar-label">{item.shortName}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Company-wise Offers Table */}
        <div className="chart-section">
          <h3 className="chart-heading">Company-wise Offers</h3>
          <div className="table-wrapper">
            <table className="stats-table">
              <thead>
                <tr>
                  <th>Company</th>
                  {companyData.length > 0 && companyData[0].byYear &&
                    Object.keys(companyData[0].byYear).sort().map((year, i) => (
                      <th key={i}>{year}</th>
                    ))
                  }
                  <th>Total Offers</th>
                  <th>Package</th>
                </tr>
              </thead>
              <tbody>
                {companyData.length > 0 ? companyData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.company}</td>
                    {item.byYear && Object.keys(item.byYear).sort().map((year, i) => (
                      <td key={i}>{item.byYear[year] || 0}</td>
                    ))}
                    <td><strong>{item.total}</strong></td>
                    <td>{item.packageRange}</td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="4" style={{ textAlign: 'center' }}>No data available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <style>{`
        .stats-wrapper {
          background-color: #f0f8f0;
          min-height: 80vh;
          padding: 0;
          overflow-x: hidden;
          max-width: 100vw;
        }

        .chart-section {
          width: 100%;
          max-width: 100%;
          background-color: #fff;
          overflow: hidden;
        }

        .chart-heading {
          color: #2e7d32;
          font-size: 1.6rem;
          text-align: center;
          padding: 1.5rem 0;
          margin: 0;
          background-color: #fff;
          font-weight: bold;
        }

        /* Vertical Bar Chart */
        .vertical-chart-container {
          width: 100%;
          max-width: 100%;
          padding: 2rem 1rem;
          background-color: #f0f8f0;
          box-sizing: border-box;
          overflow: hidden;
        }

        .vertical-bars {
          display: flex;
          justify-content: space-around;
          align-items: flex-end;
          height: 300px;
          max-width: 100%;
        }

        .vbar-column {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex: 1;
          max-width: 120px;
        }

        .vbar-value {
          font-size: 1.2rem;
          font-weight: bold;
          color: #2e7d32;
          margin-bottom: 10px;
        }

        .vbar-track {
          width: 50px;
          height: 200px;
          background-color: #e8f5e9;
          border-radius: 8px 8px 0 0;
          display: flex;
          align-items: flex-end;
          overflow: hidden;
        }

        .vbar-fill {
          width: 100%;
          border-radius: 8px 8px 0 0;
          transition: height 1s ease-out;
        }

        .fill-completed {
          background: linear-gradient(180deg, #4caf50 0%, #2e7d32 100%);
        }

        .fill-ongoing {
          background: linear-gradient(180deg, #42a5f5 0%, #1565c0 100%);
        }

        .fill-dept {
          background: linear-gradient(180deg, #4caf50 0%, #0A8F47 100%);
        }

        .vbar-label {
          font-size: 1rem;
          font-weight: 600;
          color: #333;
          margin-top: 12px;
          text-align: center;
        }

        .vbar-status {
          font-size: 0.75rem;
          font-weight: 600;
          padding: 4px 12px;
          border-radius: 12px;
          margin-top: 8px;
        }

        .status-completed {
          background-color: #e8f5e9;
          color: #2e7d32;
        }

        .status-ongoing {
          background-color: #e3f2fd;
          color: #1565c0;
        }

        /* Table Styles */
        .table-wrapper {
          width: 100%;
          max-width: 100%;
          padding: 2rem 1rem;
          background-color: #f0f8f0;
          overflow-x: auto;
          box-sizing: border-box;
        }

        .stats-table {
          width: 100%;
          border-collapse: collapse;
          background-color: #fff;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .stats-table th {
          background-color: #2e7d32;
          color: #fff;
          padding: 1.2rem 1.5rem;
          text-align: center;
          font-size: 1rem;
        }

        .stats-table td {
          padding: 1.2rem 1.5rem;
          font-size: 1rem;
          color: #333;
          border-bottom: 1px solid #e8f5e9;
          text-align: center;
        }

        .stats-table tr:hover {
          background-color: #f8fdf8;
        }

        @media (max-width: 768px) {
          .vertical-bars {
            height: 250px;
          }

          .vbar-track {
            width: 35px;
            height: 160px;
          }

          .vbar-value {
            font-size: 0.9rem;
          }

          .vbar-label {
            font-size: 0.75rem;
          }

          .vbar-status {
            font-size: 0.6rem;
            padding: 3px 6px;
          }

          .table-wrapper {
            padding: 1rem 0.5rem;
          }

          .stats-table th,
          .stats-table td {
            padding: 0.8rem 0.6rem;
            font-size: 0.85rem;
          }
        }
      `}</style>
    </div>
  );
};

export default PlacementStatistics;
