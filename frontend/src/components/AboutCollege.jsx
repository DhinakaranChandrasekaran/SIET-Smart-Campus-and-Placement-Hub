import React from "react";

const AboutCollege = () => {
  return (
    <>
      <div className="about-college">
        <div className="left">
          <img src="/images/about.jpg" alt="About SIET" />
        </div>
        <div className="right">
          <h2>ABOUT SIET</h2>
          <p>
            Sri Shakthi Institute of Engineering and Technology is the most sought after Institution among the premier technical Institutions in South India. Since its establishment in the year 1998, the Institution has marched towards the pinnacle of glory through its remarkable achievements in the field of Engineering Education. It is an Autonomous Institution, Affiliated to Anna University with 7 programmes being accredited by NBA and it offers 11 UG programmes, 4 PG programmes, 1 integrated programme and 8 research programmes. The Institution offers an exciting academic environment with well qualified dedicated faculty members to inspire and nurture the student fraternity. With industry drafted Choice Based Credit System (CBCS) curriculum and syllabi, the Institution takes every effort to bring its students to the forefront of the society as skillful and responsible engineers.
          </p>
        </div>
      </div>

      <div className="college-stats">
        <div className="stat-card">
          <div className="stat-number">15+</div>
          <div className="stat-label">Departments</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">5000+</div>
          <div className="stat-label">Students</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">300+</div>
          <div className="stat-label">Faculty</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">95%</div>
          <div className="stat-label">Placement</div>
        </div>
      </div>

      <style>{`
        .about-college {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 3rem;
          padding: 2.5rem 2rem; /* slightly reduced padding */
          background-color: #f0f8f0;
          border-radius: 12px;
          box-shadow: 0 6px 16px rgba(0,0,0,0.05);
          margin-top: 0px; /* pulled higher */
          min-height: 450px;
        }

        .about-college .left {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
        }

        .about-college .left img {
          width: 450px;
          height: 320px;
          object-fit: cover;
          border-radius: 12px;
          box-shadow: 0 12px 20px rgba(0,0,0,0.2);
          position: relative;
          top: -20px;
          z-index: 2;
        }

        .about-college .right {
          flex: 2;
          min-width: 300px;
          margin-bottom: 50px;
        }

        .about-college .right h2 {
          font-size: 2.2rem;
          color: #2e7d32; /* green */
          margin-bottom: 1rem;
        }

        .about-college .right p {
          font-size: 1.1rem;
          line-height: 1.7;
          color: #333;
          text-align: justify;
        }

        .college-stats {
          background-color: #f0f8f0;
          display: flex;
          justify-content: center;
          gap: 1.5rem;
          padding: 1.5rem 2rem; /* reduced padding */
          flex-wrap: wrap;
          margin-top: -80px; /* move closer to About section */
        }

        .stat-card {
          background: #fff;
          padding: 1.5rem 2rem;
          border-radius: 12px;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
          text-align: center;
          min-width: 160px;
          flex: 1;
          max-width: 220px;
        }

        .stat-number {
          font-size: 2rem;
          font-weight: bold;
          color: #2e7d32; /* green */
        }

        .stat-label {
          margin-top: 0.5rem;
          font-size: 0.95rem;
          color: #555;
        }

        @media (max-width: 768px) {
          .about-college {
            flex-direction: column;
            text-align: center;
          }

          .about-college .left img {
            top: 0;
          }

          .college-stats {
            flex-direction: column;
            align-items: center;
          }

          .stat-card {
            width: 100%;
            max-width: 300px;
          }
        }
      `}</style>
    </>
  );
};

export default AboutCollege;
