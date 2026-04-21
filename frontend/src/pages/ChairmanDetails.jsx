import React, { useEffect } from 'react';

const ChairmanDetails = () => {
  // 👉 Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="chairman-page">
      <div className="profile-about-container">
        <div className="profile-right">
          <div className="about-card">
            <h3 className="section-title">About</h3>

            <h4 className="sub-title">Personal Profile</h4>
            <p>
              Dr. S. Thangavelu serves as the Chairman of Sri Shakthi Institute of Engineering and
              Technology with unwavering commitment to educational excellence. His visionary
              leadership has transformed SIET into one of the premier engineering institutions in
              Tamil Nadu.
            </p>

            <h4 className="sub-title">Academic Background</h4>
            <ul>
              <li>Ph.D. in Mechanical Engineering, IIT Madras (1992)</li>
              <li>M.Tech in Production Engineering, NIT Trichy (1987)</li>
              <li>B.E. in Mechanical Engineering, PSG College of Technology (1985)</li>
            </ul>

            <h4 className="sub-title">Professional Experience</h4>
            <ul>
              <li><strong>Chairman, SIET</strong><br />2010 – Present<br />Leading institutional growth and academic excellence</li>
              <li><strong>Director, SIET</strong><br />2005 – 2010<br />Spearheaded infrastructure development and accreditation</li>
            </ul>

            <h4 className="sub-title">Achievements & Recognition</h4>
            <ul>
              <li>Best Educational Leader Award - Tamil Nadu Government (2020)</li>
              <li>Excellence in Engineering Education - AICTE (2018)</li>
            </ul>

            <h4 className="sub-title">Contact Information</h4>
            <ul>
              <li><strong>Email:</strong> chairman@siet.ac.in</li>
              <li><strong>Phone:</strong> +91 98765 43210</li>
              <li><strong>Office:</strong> Room No. 101, Admin Block, SIET Campus</li>
            </ul>
          </div>
        </div>

        <div className="profile-left">
          <div className="image-block">
            <img src="/images/chairman.jpg" alt="Dr. S. Thangavelu" className="chairman-photo-large" />
            <h2>Dr. S. Thangavelu</h2>
            <p className="degree">Chairman, SIET</p>
            <p className="role">
              Visionary leader with over 25 years of experience in educational excellence, dedicated to fostering innovation and holistic growth.
            </p>
          </div>
        </div>
      </div>

      <div className="vision-card">
        <h3 className="section-title">Chairman's Vision</h3>
        <p>
          I have always been inspired by Dr. Martin Luther King's statement:<br />
          <em>"I have a dream — a dream I believe will come true — a dream that my children will one day live in a world where they will not be judged by the colour of their skin, but by the content of their character."</em>
        </p>
        <p>
          This need for tolerance — to create an equal society with no discrimination in caste, creed or colour — was best exemplified in the words of Mahatma Gandhi:
        </p>
        <p>
          <em>
            "I do not want my institution to be walled off on all sides. I want the culture of all lands to be blown about my institution as freely as possible. But I refuse to be blown off by any one of them. Mine is not a religion of the prison house. It has room for the least among God's creations but it is proof against insolent pride of race, religion or colour."
          </em>
        </p>
        <p>
          And this I believe will be the watchword of each and every Shakthian.
        </p>
        <p>
          The vision for Sri Shakthi is to make the institution one of our nation's great engineering schools — recognized nationally and internationally for excellence in teaching, research, and public service.
        </p>
        <p>
          We seek to be the preferred destination for students and practitioners seeking engineering education, for employers hiring engineering graduates, and for organizations seeking engineering knowledge.
        </p>
      </div>

      <style>{`
        .chairman-page {
          padding: 2rem;
          background-color: #f0f8f0;
          font-family: Arial, sans-serif;
        }

        .profile-about-container {
          display: flex;
          flex-wrap: wrap;
          gap: 2rem;
          align-items: flex-start;
        }

        .profile-right {
          flex: 2.5;
          min-width: 300px;
        }

        .profile-left {
          flex: 1.5;
          min-width: 280px;
          display: flex;
          justify-content: center;
          align-items: flex-start;
        }

        .image-block {
          text-align: center;
        }

        .chairman-photo-large {
          width: 350px;
          height: 350px;
          object-fit: cover;
          border-radius: 50%;
          margin-bottom: 1rem;
        }

        .degree {
          color: #444;
          font-style: italic;
          margin-bottom: 0.3rem;
        }

        .role {
          color: green;
          font-weight: bold;
        }

        .about-card {
          background-color: transparent;
          padding: 2rem;
          border-radius: 15px;
          height: 100%;
        }

        .section-title {
          margin-top: 0;
          color: green;
          font-size: 1.8rem;
        }

        .sub-title {
          margin-top: 1.5rem;
          color: green;
          font-weight: bold;
        }

        ul {
          padding-left: 1.2rem;
          color: #444;
        }

        li {
          margin-bottom: 0.8rem;
          line-height: 1.6;
        }

        p {
          color: #444;
          line-height: 1.6;
          text-align: justify;
        }

        .vision-card {
          margin-top: 2rem;
          background-color: transparent;
          padding: 2rem;
          border-radius: 15px;
        }

        @media (max-width: 768px) {
          .profile-about-container {
            flex-direction: column;
          }

          .profile-left,
          .profile-right {
            width: 100%;
          }

          .chairman-photo-large {
            width: 250px;
            height: 250px;
          }
        }
      `}</style>
    </div>
  );
};

export default ChairmanDetails;
