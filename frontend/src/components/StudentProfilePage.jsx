import React from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../data/authCredentials";

const StudentProfilePage = () => {
  const navigate = useNavigate();

  const handleViewProfiles = (e) => {
    e.preventDefault();
    if (isAuthenticated()) {
      navigate("/student-profile/welcome");
    } else {
      navigate("/sign-in");
    }
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    if (isAuthenticated()) {
      navigate("/update-profile-form");
    } else {
      navigate("/sign-in");
    }
  };

  return (
    <>
      {/* Student Profile Section */}
      <div className="home-wrapper">
        <h2 className="home-title">SIET Student Profiles</h2>
        <div className="home-section">
          <div className="home-image">
            <img src="/images/student-profile/main-profile.jpg" alt="Student Team" />
          </div>
          <div className="home-info">
            <p>
              The SIET Student Academic Profile System is a comprehensive digital platform that showcases student achievements, skills, and academic progress. It enables students to build a strong academic identity and track their journey semester by semester. The system provides access to detailed profiles including academic records, projects, certifications, and placement status. It supports transparency and academic planning for students and faculty. The platform encourages continuous improvement and goal-oriented learning. Overall, it strengthens student visibility and career readiness.
            </p>
            <div className="home-box">
              <button type="button" className="home-link" onClick={handleViewProfiles}>
                Visit Student Profiles
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Update Profile Section */}
      <div className="home-wrapper">
        <h2 className="home-title">Update Your Profile</h2>
        <div className="home-section">
          <div className="home-info update-info">
            <p>
              Keep your academic and contact information updated to maintain an accurate placement profile. Ensure your latest details are available for training and recruitment activities. Regularly update your skills, projects, and certifications to improve visibility among recruiters. This helps placement teams match you with suitable opportunities. Staying updated enhances your chances of career success. It ensures your profile reflects your true potential.
            </p>
            <div className="home-box">
              <button type="button" className="home-link" onClick={handleUpdateProfile}>
                Update Profile
              </button>
            </div>
          </div>
          <div className="home-image">
            <img src="/images/Update-image.jpg" alt="Update Form" />
          </div>
        </div>
      </div>

      {/* Styles */}
      <style>{`
        .home-wrapper {
          width: 100%;
          background-color: #f0f8f0;
          padding: 0;
          margin-top: 0;
        }

        .home-title {
          text-align: center;
          color: green;
          font-size: 2.4rem;
          margin: 0;
          padding: 1rem 0;
          background-color: white;
        }

        .home-section {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
        }

        .home-image img {
          width: 300px;
          height: 300px;
          object-fit: cover;
          border-radius: 50%;
          margin: 0 2cm;
          box-shadow: 0 0 25px rgba(0, 128, 0, 0.35);
          transition: box-shadow 0.3s ease-in-out;
        }

        .home-image img:hover {
          box-shadow: 0 0 35px rgba(0, 128, 0, 0.55);
        }

        .home-info {
          flex: 1;
          max-width: calc(100% - 270px - 2cm);
          margin: 1rem;
        }

        .update-info {
          margin-left: 2cm;
        }

        .home-info p {
          color: #444;
          font-size: 1.2rem;
          line-height: 1.8;
          margin-bottom: 1.2rem;
        }

        .home-box {
          display: inline-block;
          padding: 1rem 1.5rem;
          border: 2px solid #228b22;
          background-color: #ffffff;
          border-radius: 10px;
          transition: background-color 0.3s ease;
          margin-top: 1rem;
        }

        .home-box:hover {
          background-color: #eaf8ea;
        }

        .home-link {
          color: #228b22;
          font-weight: bold;
          font-size: 1.1rem;
          text-decoration: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
        }

        .home-link:hover {
          /* No underline on hover */
        }

        @media (max-width: 768px) {
          .home-section {
            flex-direction: column;
            gap: 2rem;
          }

          .home-image img {
            margin: 0 auto;
          }

          .home-info {
            max-width: 100%;
            text-align: center;
          }
        }
      `}</style>
    </>
  );
};

export default StudentProfilePage;