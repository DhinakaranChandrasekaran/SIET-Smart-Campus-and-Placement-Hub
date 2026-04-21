import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import studentService from "../services/studentService";
import SIETLoader from "../components/SIETLoader";

const StudentListPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const batch = location.state?.batch || sessionStorage.getItem("selectedBatch") || "Unknown";
  const department = location.state?.department || "Unknown";

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch students from backend
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        // Fetch students by department and batch
        const data = await studentService.getStudentsByYear(batch);

        // Filter by department with flexible matching
        const filteredStudents = data.filter(student => {
          if (department === "Unknown") return true;

          // Handle partial matches (e.g., "Computer Science" matches "Computer Science and Engineering")
          const studentDept = (student.department || "").toLowerCase();
          const selectedDept = department.toLowerCase();

          return (studentDept.includes("computer") && selectedDept.includes("computer")) ||
            (studentDept.includes("agricultural") && selectedDept.includes("agricultural")) ||
            studentDept === selectedDept;
        });

        setStudents(filteredStudents);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching students:", err);
        setError("Failed to load students");
        setLoading(false);
      }
    };

    fetchStudents();
  }, [batch, department]);

  const handleClick = (regNo) => {
    navigate(`/student-profile/${regNo}`);
  };

  if (loading) {
    return <SIETLoader />;
  }

  return (
    <div className="student-list-page">
      {/* White Header Banner */}
      <div className="header-banner">
        <h2 className="list-heading">Student Register Numbers</h2>
      </div>

      {/* Subtitle below header */}
      <p className="context-info">🎓 Batch: {batch} | 📘 Department: {department}</p>

      <div className="list-container">
        {error && <p style={{ textAlign: 'center', color: '#d32f2f' }}>{error}</p>}
        {!error && students.length === 0 && (
          <p style={{ textAlign: 'center', color: '#666' }}>No students found for this batch and department.</p>
        )}
        {!error && students.map((student, index) => (
          <div
            className="list-card"
            key={index}
            onClick={() => handleClick(student.registerNumber)}
          >
            {student.registerNumber} - {student.name}
          </div>
        ))}
      </div>

      <style>{`
        .student-list-page {
          background-color: #f0f8f0;
          min-height: 100vh;
          font-family: 'Segoe UI', sans-serif;
        }

        .header-banner {
          background-color: white;
          padding: 1.5rem 0;
          text-align: center;
          margin-bottom: 0.5rem;
        }

        .list-heading {
          font-size: 2.4rem;
          font-weight: bold;
          color: #2e7d32;
          margin: 0;
        }

        .context-info {
          font-size: 1.1rem;
          color: #555;
          text-align: center;
          margin-bottom: 1.5rem;
        }

        .list-container {
          max-width: 960px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          padding: 0 1.5rem 2rem;
        }

        .list-card {
          background-color: #ffffff;
          border-radius: 8px;
          padding: 1rem 1.2rem;
          font-size: 1.05rem;
          color: #2e7d32;
          box-shadow: 0 4px 6px rgba(0, 128, 0, 0.06);
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .list-card:hover {
          background-color: #e8f5e9;
          transform: translateY(-2px);
        }

        @media (max-width: 600px) {
          .list-card {
            font-size: 0.95rem;
            padding: 0.8rem 1rem;
          }

          .list-heading {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default StudentListPage;