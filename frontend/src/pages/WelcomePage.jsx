import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to batch selection after animation
    const timer = setTimeout(() => {
      navigate("/select-batch");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="welcome-container">
      <img
        src="/images/student-profile/siet-logo.jpg"
        alt="SIET Logo"
        className="welcome-logo"
      />
      <h1 className="welcome-title">SRI SHAKTHI</h1>
      <p className="welcome-subtitle">Welcomes you to</p>
      <h2 className="welcome-highlight">STUDENT PLACEMENT PROFILE</h2>
      <p className="welcome-tagline">Empowering Talent for Tomorrow</p>
      <div className="progress-bar"></div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500;700&display=swap');

        .welcome-container {
          height: 100vh;
          width: 100%;
          background: linear-gradient(135deg, #e0f7e9, #ffffff);
          background-size: 200% 200%;
          animation: backgroundShift 10s ease infinite;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-family: 'Montserrat', sans-serif;
          text-align: center;
          padding: 0 1rem;
        }

        @keyframes backgroundShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .welcome-logo {
          width: 220px;
          height: auto;
          margin-bottom: 2rem;
          animation: fadeIn 1.5s ease-in-out;
        }

        .welcome-title {
          font-size: 3rem;
          font-weight: bold;
          color: #28a745;
          margin: 0.5rem 0;
          animation: fadeIn 2s ease-in-out;
        }

        .welcome-subtitle {
          font-size: 1.5rem;
          color: #333;
          margin: 0.2rem 0;
          animation: fadeIn 2.2s ease-in-out;
        }

        .welcome-highlight {
          font-size: 2rem;
          font-weight: bold;
          color: #28a745;
          margin-top: 1rem;
          animation: fadeIn 2.4s ease-in-out;
        }

        .welcome-tagline {
          font-size: 1rem;
          color: #666;
          margin-top: 0.5rem;
          letter-spacing: 1px;
          animation: fadeIn 2.6s ease-in-out;
        }

        .progress-bar {
          width: 0%;
          height: 4px;
          background-color: #28a745;
          animation: progress 5s linear forwards;
          margin-top: 2rem;
        }

        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default WelcomePage;