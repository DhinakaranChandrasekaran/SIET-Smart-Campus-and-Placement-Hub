import React, { useEffect } from 'react';

const PrincipalDetails = () => {
  // ⬆️ Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="principal-page">
      <div className="profile-about-container">
        <div className="profile-right">
          <div className="about-card">
            <h3 className="section-title">About</h3>

            <h4 className="sub-title">Personal Profile</h4>
            <p>
              Dr. N. K. Sakthivel serves as the Principal of Sri Shakthi Institute of Engineering and
              Technology with a passion for empowering students through innovative learning. His academic
              leadership and deep expertise in engineering education have led to transformative changes at SIET.
            </p>

            <h4 className="sub-title">Academic Background</h4>
            <ul>
              <li>Ph.D. in Computer Science, Anna University</li>
              <li>M.Tech in Information Technology, NIT</li>
              <li>B.E. in Computer Engineering</li>
            </ul>

            <h4 className="sub-title">Professional Experience</h4>
            <ul>
              <li><strong>Principal, SIET</strong><br />2015 – Present<br />Driving academic vision and research excellence</li>
              <li><strong>Head of Department, CSE</strong><br />2010 – 2015<br />Curriculum innovation and faculty development</li>
            </ul>

            <h4 className="sub-title">Achievements & Recognition</h4>
            <ul>
              <li>Innovative Educator Award - ISTE (2021)</li>
              <li>Research Excellence Award - AICTE (2019)</li>
            </ul>

            <h4 className="sub-title">Contact Information</h4>
            <ul>
              <li><strong>Email:</strong> principal@siet.ac.in</li>
              <li><strong>Phone:</strong> +91 98765 43211</li>
              <li><strong>Office:</strong> Room No. 102, Admin Block, SIET Campus</li>
            </ul>
          </div>
        </div>

        <div className="profile-left">
          <div className="image-block">
            <img src="/images/principal.jpg" alt="Dr. N. K. Sakthivel" className="chairman-photo-large" />
            <h2>Dr. N. K. Sakthivel, M.Tech, Ph.D.</h2>
            <p className="degree">Principal, SIET</p>
            <p className="role">
              Academic leader with deep expertise in engineering education and a passion for empowering students through innovative learning.
            </p>
          </div>
        </div>
      </div>

      <div className="vision-card">
        <h3 className="section-title">Principal's Vision</h3>
        <p>
          SRI SHAKTHI INSTITUTE OF ENGINEERING AND TECHNOLOGY is committed to developing Learners' minds through a wide range of innovative learning opportunities that prepare them for their professional journeys.
        </p>
        <p>
          Striving with a futuristic outlook, SIET aims at fostering the unending pool of talent that every student possesses.
        </p>
        <p>
          We seek to mould the curious student community mind with Critical Thinking, Problem-Solving Abilities, Leadership Qualities along with ethical responsibility that will create change makers and future leaders.
        </p>
        <p>
          We at SIET firmly believe in Outcome Oriented, Student-Centric Teaching Learning Processes that will inculcate the required Industry Demanding Skills and Abilities.
        </p>
        <p>
          We mainly aim at instilling advanced engineering skills and cutting-edge technologies for transforming engineering practices and contributing to more efficient, sustainable, and innovative solutions across various industries.
        </p>
        <p>
          I look forward to working together with the SIET family jointly with our Alumni and Industry Partners to cultivate vibrant and inclusive academic and Research experiences.
        </p>
        <p>
          I invite all stakeholders to join us in shaping a brighter future together.
        </p>
        <p>
          “The heights by great men reached and kept were not attained by sudden flight, but they while their companions slept, were toiling upward in the night.” — Henry Wadsworth
        </p>
        <p>
          As Henry Wadsworth said, My Primary motto and Objective is to encourage all my Learners Community to put their tremendous efforts with Commitment and Dedication to succeed and attain great heights.
        </p>
        <p>With all good wishes</p>
      </div>

      <style>{`
        .principal-page {
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

          .profile-left, .profile-right {
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

export default PrincipalDetails;
