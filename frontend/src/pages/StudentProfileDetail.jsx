import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-scroll";
import { FiDownload } from "react-icons/fi";
import studentService from "../services/studentService";
import SIETLoader from "../components/SIETLoader";
import { getImageUrl, getFileUrl } from "../utils/imageUtils";

const StudentProfileDetail = () => {
  const { regNo } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const data = await studentService.getStudentByRegNo(regNo);
        setStudent(data);
      } catch (error) {
        console.error('Error fetching student:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStudent();
  }, [regNo]);

  if (loading) return <SIETLoader />;
  if (!student) return <div style={{ padding: '2rem', textAlign: 'center' }}>Student not found</div>;

  // Map backend data to expected structure
  const personalDetails = {
    regNo: student.registerNumber,
    name: student.name,
    dob: student.dob || student.dateOfBirth || '',
    department: student.department,
    bloodGroup: student.bloodGroup,
    address: student.address,
    academicYear: student.academicYear,
    yearOfPassing: student.yearOfPassing,
    photo: student.photoPath ? getImageUrl(student.photoPath) : '/images/default-avatar.png'
  };

  const academicDetails = {
    sslc: student.sslc || {
      board: 'N/A',
      institution: 'N/A',
      year: 'N/A',
      percentage: 'N/A'
    },
    hsc: student.hsc || {
      board: 'N/A',
      institution: 'N/A',
      year: 'N/A',
      percentage: 'N/A'
    },
    ug: student.ug || {
      department: student.department || 'N/A',
      institution: 'SIET',
      year: student.yearOfPassing || 'N/A',
      cgpa: student.overallCgpa || 'N/A'
    }
  };

  const sgpaList = student.sgpaList || [];
  const overallCgpa = student.overallCgpa || 'N/A';
  const skills = Array.isArray(student.skills) ? student.skills : [];
  const certifications = student.certifications || [];
  const project = student.project || { title: 'N/A', domain: 'N/A', languages: [] };
  const projects = student.projects || (project.title !== 'N/A' ? [project] : []);
  const publication = student.publication || { title: 'N/A', journal: 'N/A', authors: [], date: 'N/A' };
  const publications = student.publications || (publication.title !== 'N/A' ? [publication] : []);
  const patents = student.patents || [];
  const resume = student.resume || { file: null, fourPageFile: null };
  const placementPortal = student.placementPortal || { label: 'Not Set', url: '#' };
  const linkedin = student.linkedin || '#';
  const githubProfile = student.githubProfile || '';
  const leetcodeProfile = student.leetcodeProfile || '';
  const extracurricularActivities = Array.isArray(student.extracurricularActivities) ? student.extracurricularActivities : [];
  const coCurricularActivities = Array.isArray(student.coCurricularActivities) ? student.coCurricularActivities : [];
  const contact = student.contact || { email: 'N/A', phone: 'N/A' };

  return (
    <>
      <div className="student-navbar">
        <div className="navbar-left">
          🎓 <span className="profile-title">Student Profile</span>
        </div>
        <div className="navbar-right">
          <Link activeClass="active" to="personal" spy smooth duration={500}>Personal</Link>
          <Link activeClass="active" to="academic" spy smooth duration={500}>Academic</Link>
          <Link activeClass="active" to="cgpa" spy smooth duration={500}>CGPA</Link>
          <Link activeClass="active" to="skills" spy smooth duration={500}>Skills</Link>
          <Link activeClass="active" to="certifications" spy smooth duration={500}>Certifications</Link>
          <Link activeClass="active" to="projects" spy smooth duration={500}>Projects</Link>
          <Link activeClass="active" to="publications" spy smooth duration={500}>Publications</Link>
          <Link activeClass="active" to="patents" spy smooth duration={500}>Patents</Link>
          <Link activeClass="active" to="resume" spy smooth duration={500}>Resume</Link>
          <Link activeClass="active" to="placement" spy smooth duration={500}>Placement</Link>
          <Link activeClass="active" to="linkedin" spy smooth duration={500}>LinkedIn</Link>
          <Link activeClass="active" to="github" spy smooth duration={500}>GitHub</Link>
          <Link activeClass="active" to="leetcode" spy smooth duration={500}>LeetCode</Link>
          <Link activeClass="active" to="extracurricular" spy smooth duration={500}>Extracurricular</Link>
          <Link activeClass="active" to="cocurricular" spy smooth duration={500}>Co-Curricular</Link>
          <Link activeClass="active" to="contact" spy smooth duration={500}>Contact</Link>
        </div>
      </div>

      <div className="student-profile-container">
        {/* Personal Details */}
        <div id="personal" className="profile-section personal-section">
          <div className="personal-title">Personal Details</div>
          <div className="personal-details">
            <div className="details-text">
              <p><strong>Reg No:</strong> {personalDetails.regNo}</p>
              <p><strong>Name:</strong> {personalDetails.name}</p>
              <p><strong>Date of Birth:</strong> {personalDetails.dob}</p>
              <p><strong>Department:</strong> {personalDetails.department}</p>
              <p><strong>Blood Group:</strong> {personalDetails.bloodGroup}</p>
              <p><strong>Address:</strong> {personalDetails.address}</p>
              <p><strong>Academic Year:</strong> {personalDetails.academicYear}</p>
              <p><strong>Year of Passing:</strong> {personalDetails.yearOfPassing}</p>
            </div>
            <div className="details-photo">
              <img src={personalDetails.photo} alt="Student" />
            </div>
          </div>
        </div>

        <hr className="section-divider" />

        {/* Academic Details */}
        <div id="academic" className="profile-section academic-section">
          <div className="academic-title">Academic Details</div>
          <div className="academic-details">
            <div className="academic-block">
              <p className="academic-heading"><strong>SSLC:</strong></p>
              <div className="academic-info">
                <p><strong>Board:</strong> {academicDetails.sslc.board}</p>
                <p><strong>Institution:</strong> {academicDetails.sslc.institution}</p>
                <p><strong>Year of Passing:</strong> {academicDetails.sslc.year}</p>
                <p><strong>Percentage:</strong> {academicDetails.sslc.percentage}</p>
              </div>
            </div>

            <div className="academic-block">
              <p className="academic-heading"><strong>HSC:</strong></p>
              <div className="academic-info">
                <p><strong>Board:</strong> {academicDetails.hsc.board}</p>
                <p><strong>Institution:</strong> {academicDetails.hsc.institution}</p>
                <p><strong>Year of Passing:</strong> {academicDetails.hsc.year}</p>
                <p><strong>Percentage:</strong> {academicDetails.hsc.percentage}</p>
              </div>
            </div>

            <div className="academic-block">
              <p className="academic-heading"><strong>UG:</strong></p>
              <div className="academic-info">
                <p><strong>Department:</strong> {academicDetails.ug.department}</p>
                <p><strong>Institution:</strong> {academicDetails.ug.institution}</p>
                <p><strong>Year of Passing:</strong> {academicDetails.ug.year}</p>
                <p><strong>CGPA:</strong> {academicDetails.ug.cgpa}</p>
              </div>
            </div>
          </div>
        </div>

        <hr className="section-divider" />

        {/* CGPA & SGPA Section */}
        <div id="cgpa" className="profile-section cgpa-sgpa-container">
          {/* Left Column - CGPA */}
          <div className="cgpa-column">
            <h2 className="cgpa-heading">CGPA</h2>
            <div className="cgpa-box">
              <h2>{overallCgpa}</h2>
            </div>
          </div>

          {/* Right Column - SGPA */}
          <div className="sgpa-column">
            <h2 className="sgpa-heading">SGPA</h2>
            <div className="sgpa-list">
              <ul>
                {sgpaList.map((sgpa, i) => (
                  <li key={i}>Semester {i + 1} : {sgpa}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <hr className="section-divider" />

        {/* Skills */}
        <div id="skills" className="profile-section skills-section">
          <div className="skills-title">Skills</div>
          <div className="skills-container">
            {skills.map((skill, i) => <div key={i} className="skill-card">{skill}</div>)}
          </div>
        </div>

        <hr className="section-divider" />

        {/* Certifications */}
        <div id="certifications" className="profile-section certifications-section">
          <div className="certifications-title">Certifications</div>
          <div className="certification-cards">
            {certifications.filter(cert => cert.course && cert.course.trim() !== '').length > 0 ? (
              certifications
                .filter(cert => cert.course && cert.course.trim() !== '')
                .map((cert, idx) => (
                  <div className="cert-card" key={idx} onClick={() => cert.filePath && window.open(getFileUrl(cert.filePath), '_blank')} style={{ cursor: cert.filePath ? 'pointer' : 'default' }}>
                    <div className="cert-course">{cert.course}</div>
                    <div className="cert-domain">{cert.domain}</div>
                    <div className="cert-date">Certified: {cert.date}</div>
                    {cert.filePath && (
                      <a href={getFileUrl(cert.filePath)} download onClick={(e) => e.stopPropagation()} className="download-icon" title="Download Certificate">
                        <FiDownload size={20} />
                      </a>
                    )}
                  </div>
                ))
            ) : (
              <p className="no-data-text">No certifications available</p>
            )}
          </div>
        </div>

        <hr className="section-divider" />

        {/* Projects */}
        <div id="projects" className="profile-section projects-section">
          <div className="projects-title">Projects</div>
          <div className="project-cards">
            {projects.length > 0 ? (
              projects.filter(p => p.title && p.title !== 'N/A').map((proj, idx) => (
                <div className="project-card" key={idx} onClick={() => navigate(`/projects/${encodeURIComponent(proj.title)}`, { state: proj })} style={{ cursor: 'pointer' }}>
                  <div className="project-title">{proj.title}</div>
                  <div className="project-domain">Domain: {proj.domain}</div>
                  <div className="project-languages">Languages: {Array.isArray(proj.languages) ? proj.languages.join(', ') : proj.languages}</div>
                </div>
              ))
            ) : (
              <p className="no-data-text">No projects available</p>
            )}
          </div>
        </div>

        <hr className="section-divider" />

        {/* Publications */}
        <div id="publications" className="profile-section publications-section">
          <div className="publications-title">Publications</div>
          <div className="publication-cards">
            {publications.length > 0 ? (
              publications.filter(p => p.title && p.title !== 'N/A').map((pub, idx) => (
                <div className="publication-card" key={idx} onClick={() => navigate(`/publications/${encodeURIComponent(pub.title)}`, { state: pub })} style={{ cursor: 'pointer' }}>
                  <div className="publication-title">{pub.title}</div>
                  <div className="publication-journal">Journal: {pub.journal}</div>
                  <div className="publication-authors">Authors: {Array.isArray(pub.authors) ? pub.authors.join(', ') : pub.authors}</div>
                  <div className="publication-date">Published: {pub.date}</div>
                </div>
              ))
            ) : (
              <p className="no-data-text">No publications available</p>
            )}
          </div>
        </div>

        <hr className="section-divider" />

        {/* Patents Section */}
        <div id="patents" className="profile-section patents-section">
          <div className="patents-title">Patents</div>
          <div className="patent-cards">
            {patents && patents.filter(p => p.title && p.title.trim() !== '').length > 0 ? (
              patents
                .filter(p => p.title && p.title.trim() !== '')
                .map((patent, idx) => (
                  <div className="patent-card" key={idx} onClick={() => navigate(`/patents/${encodeURIComponent(patent.title)}`, { state: patent })} style={{ cursor: 'pointer' }}>
                    <div className="patent-card-title">{patent.title}</div>
                    <div className="patent-number">Patent No.: {patent.patentNumber}</div>
                    <div className="patent-filing-date">Filing Date: {patent.filingDate}</div>
                    <div className="patent-inventors">Inventors: {Array.isArray(patent.inventors) ? patent.inventors.join(", ") : patent.inventors}</div>
                  </div>
                ))
            ) : (
              <p className="no-data-text">No patents available</p>
            )}
          </div>
        </div>

        <hr className="section-divider" />

        {/* Resume */}
        <div id="resume" className="profile-section resume-section">
          <div className="resume-title">Resume</div>
          <div className="resume-cards">
            {/* One Page Resume */}
            {resume.file ? (
              <div className="resume-card" onClick={() => window.open(getFileUrl(resume.file), '_blank')} style={{ cursor: 'pointer' }}>
                <div className="resume-name">One Page Resume</div>
                <a href={getFileUrl(resume.file)} download onClick={(e) => e.stopPropagation()} className="download-icon" title="Download One Page Resume">
                  <FiDownload size={20} />
                </a>
              </div>
            ) : null}
            {/* Four Page Resume */}
            {resume.fourPageFile ? (
              <div className="resume-card" onClick={() => window.open(getFileUrl(resume.fourPageFile), '_blank')} style={{ cursor: 'pointer' }}>
                <div className="resume-name">Four Page Resume</div>
                <a href={getFileUrl(resume.fourPageFile)} download onClick={(e) => e.stopPropagation()} className="download-icon" title="Download Four Page Resume">
                  <FiDownload size={20} />
                </a>
              </div>
            ) : null}
            {!resume.file && !resume.fourPageFile && (
              <p className="no-data-text">No resume uploaded</p>
            )}
          </div>
        </div>

        <hr className="section-divider" />

        {/* Placement Portal */}
        <div id="placement" className="profile-section placement-section">
          <div className="placement-title">Placement Status</div>
          <div className="placement-details">
            <p><strong>{placementPortal.label}:</strong></p>
            <a href={placementPortal.url} target="_blank" rel="noopener noreferrer">
              {placementPortal.url}
            </a>
            {student.trainingBatch && (
              <p style={{ marginTop: '1rem' }}><strong>Training Batch:</strong> {student.trainingBatch}</p>
            )}
          </div>
        </div>

        <hr className="section-divider" />

        {/* LinkedIn Section */}
        <div id="linkedin" className="profile-section linkedin-section">
          <div className="linkedin-title">LinkedIn Profile</div>
          <div className="linkedin-link">
            <a href={linkedin} target="_blank" rel="noopener noreferrer">
              {linkedin}
            </a>
          </div>
        </div>

        <hr className="section-divider" />

        {/* GitHub Profile Section */}
        {githubProfile && (
          <>
            <div id="github" className="profile-section github-section">
              <div className="github-title">GitHub Profile</div>
              <div className="github-link">
                <a href={githubProfile} target="_blank" rel="noopener noreferrer">
                  {githubProfile}
                </a>
              </div>
            </div>
            <hr className="section-divider" />
          </>
        )}

        {/* LeetCode Profile Section */}
        {leetcodeProfile && (
          <>
            <div id="leetcode" className="profile-section leetcode-section">
              <div className="leetcode-title">LeetCode Profile</div>
              <div className="leetcode-link">
                <a href={leetcodeProfile} target="_blank" rel="noopener noreferrer">
                  {leetcodeProfile}
                </a>
              </div>
            </div>
            <hr className="section-divider" />
          </>
        )}

        {/* Extracurricular Activities Section */}
        <div id="extracurricular" className="profile-section extracurricular-section">
          <div className="extracurricular-title">Extracurricular Activities</div>
          {extracurricularActivities && extracurricularActivities.length > 0 ? (
            <ul className="activities-list">
              {extracurricularActivities.map((activity, idx) => (
                <li key={idx}>{activity}</li>
              ))}
            </ul>
          ) : (
            <p className="no-data-text">No extracurricular activities listed</p>
          )}
        </div>

        <hr className="section-divider" />

        {/* Co-Curricular Activities Section */}
        <div id="cocurricular" className="profile-section cocurricular-section">
          <div className="cocurricular-title">Co-Curricular Activities</div>
          {coCurricularActivities && coCurricularActivities.length > 0 ? (
            <ul className="activities-list">
              {coCurricularActivities.map((activity, idx) => (
                <li key={idx}>{activity}</li>
              ))}
            </ul>
          ) : (
            <p className="no-data-text">No co-curricular activities listed</p>
          )}
        </div>

        <hr className="section-divider" />

        {/* Contact Info */}
        <div id="contact" className="profile-section contact-section">
          <div className="contact-title">Contact Information</div>
          <div className="contact-details">
            <p><strong>Email:</strong> {contact.email}</p>
            <p><strong>Phone:</strong> {contact.phone}</p>
          </div>
        </div>

        <hr className="section-divider" />
      </div>

      <style>{`
        body {
            margin: 0;
            font-family: "Segoe UI", sans-serif;
        }

        .section-divider {
            border: none;
            border-top: 1px solid green;
            margin-top: 0.3cm;
            margin-bottom: 0.3cm;
            width: 95%;
        }

        .student-navbar {
            position: sticky;
            top: 0;
            z-index: 999;
            background-color: green;
            color: white;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1.2rem 2rem;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .profile-title {
            font-size: 1.6rem;
            font-weight: bold;
        }

        .navbar-right a {
            color: white;
            margin-left: 0.6rem;
            cursor: pointer;
            font-size: 0.85rem;
            text-decoration: none;
            padding-bottom: 3px;
        }

        .navbar-right a.active {
            color: #c1f0c1;
            border-bottom: 2px solid #c1f0c1;
        }

        .navbar-right a:hover {
            text-decoration: underline;
        }

        .student-profile-container {
            background-color: #f0f8f0;
            padding-bottom: 1rem;
        }

        .profile-section {
            padding: 1.5rem 2rem;
        }

        .personal-section {
            background: transparent;
            padding-left: 3cm;
            padding-right: 3cm;
            padding-top: 1.5cm;
            padding-bottom: 0.3rem;
        }

        .personal-section,
        .academic-section,
        .cgpa-section,
        .skills-section,
        .certifications-section {
            background: transparent;
            padding-left: 3cm;
            padding-right: 3cm;
            padding-top: 0.5cm;
        }
        
        .personal-section,
        .academic-section {
            padding-bottom: 0.3rem;
        }

        .personal-title,
        .academic-title,
        .cgpa-title,
        .skills-title,
        .certifications-title {
            font-size: 1.8rem;
            font-weight: bold;
            color: green;
            margin-bottom: 1.0rem;//
            text-align: left;
        }

        .personal-details {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
        }

        .details-text {
            flex: 1;
            font-size: 1.2rem;
            color: #333;
            line-height: 2.2rem;
            margin-top: -1rem;
            margin-bottom: -0.5rem;
        }

        .details-photo {
            margin-right: 3cm;
        }

        .details-photo img {
            width: 300px;
            height: 300px;
            border-radius: 50%;
            object-fit: cover;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
        }

        .academic-details {
            display: flex;
            flex-direction: column;
            margin-top: 0.5rem;
        }

        .academic-block {
            font-size: 1.2rem;
            color: #333;
            line-height: 1.8rem;
            margin-bottom: 0.5rem;
        }

        .academic-heading {
            font-size: 1.3rem;
            color: #006400;
            font-weight: bold;
            margin: 0 0 0.3rem 0;
            margin-left: 2rem;
        }

        .academic-info {
            margin-left: 6rem;
        }

        .academic-info p {
            margin: 0.2rem 0;
            line-height: 1.8rem;
        }

        .cgpa-section {
          background-color: #f0f8f0;
          padding: 0.5rem 3cm 1.5rem 3cm;
        }

        .cgpa-heading {
          font-size: 1.8rem;
          font-weight: bold;
          color: green;
          margin-bottom: 1rem;
          text-align: left;
        }

        .sgpa-heading {
          font-size: 1.8rem;
          font-weight: bold;
          color: green;
          margin-bottom: 1rem;
          text-align: left;
        }

        .cgpa-sgpa-container {
          display: flex;
          justify-content: space-between;
          gap: 2rem;
          margin-top: 0.3rem;
          padding-top: 0.3rem;
          padding-bottom: 0.3rem;
        }

        .cgpa-column {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          margin-left: 5rem;
        }

        .sgpa-column {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          margin-left: 3rem;
        }

        .sgpa-list ul {
          list-style: disc;
          padding-left: 2rem;
          color: #333;
          font-size: 1.2rem;
          margin: 0;
        }

        .sgpa-list li {
          line-height: 1.8rem;
          margin-bottom: 0.3rem;
          margin-left: 5rem;
        }

        /* Overall CGPA box */
        .cgpa-box {
          background-color: #d1e2d1ff;
          padding: 1rem 1.5rem;
          border-radius: 10px;
          text-align: center;
          min-width: 160px;
          min-height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
          margin-top: 3rem;
          margin-left: 5rem;
        }

        .cgpa-box p {
          font-size: 1rem;
          color: #006400;
          margin-bottom: 0.3rem;
        }

        .cgpa-box h2 {
          font-size: 2rem;
          color: #1b5e20;
          margin: 0;
        }

        .skills-container {
            display: flex;
            flex-wrap: wrap;
            gap: 1.5rem;
            margin-top: 3rem;
        }

        .skill-card {
            background-color: #ffffff;
            padding: 1.4rem 3rem;
            border-radius: 10px;
            font-size: 1.2rem;
            font-weight: 500;
            color: #333;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        }

        .certification-cards {
            display: flex;
            flex-wrap: wrap;
            gap: 1.5rem;
        }

        .cert-card {
            background-color: #ffffff;
            padding: 1rem 1.2rem;
            border-radius: 12px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            width: 260px;
            min-height: auto;
            position: relative;
            display: flex;
            flex-direction: column;
            gap: 0.4rem;
            transition: transform 0.2s, box-shadow 0.2s;
        }

        .cert-card:hover {
            transform: translateY(-3px);
            box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
        }

        .cert-course {
            font-size: 1rem;
            font-weight: bold;
            color: #333;
            line-height: 1.3;
        }

        .cert-domain {
            font-size: 0.9rem;
            color: #666;
        }

        .cert-date {
            font-size: 0.85rem;
            color: green;
        }

        .download-icon {
            position: absolute;
            right: 1rem;
            bottom: 1rem;
            color: green;
            text-decoration: none;
            opacity: 1;
            transition: opacity 0.5s ease;
        }

        .download-icon:active {
            opacity: 0.3;
        }

        /* Section: Projects, Publications, Patents, Resume (shared layout) */
        .projects-section,
        .publications-section,
        .patents-section,
        .resume-section {
          background: transparent;
          padding-left: 3cm;
          padding-right: 3cm;
          padding-top: 0.5cm;
        }

        /* Section Titles */
        .certifications-title,
        .projects-title,
        .publications-title,
        .patents-title,
        .resume-title {
          font-size: 1.8rem;
          font-weight: bold;
          color: green;
          margin-bottom: 1.0cm;
          text-align: left;
        }

        /* Cards Layout */
        .project-cards,
        .publication-cards,
        .patent-cards {
          display: flex;
          flex-wrap: wrap;
          gap: 1.5rem;
        }

        /* Project, Publication & Patent Card Style */
        .project-card,
        .publication-card,
        .patent-card {
          background-color: #ffffff;
          padding: 1.2rem;
          border-radius: 12px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          width: 260px;
          min-height: 160px;
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 0.5cm;
          font-size: 1rem;
          color: #333;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .project-card:hover,
        .publication-card:hover,
        .patent-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }

        /* Resume Cards Container */
        .resume-cards {
          display: flex;
          flex-wrap: wrap;
          gap: 1.5rem;
          margin-top: 1rem;
        }

        /* Resume Card */
        .resume-card {
          background-color: #ffffff;
          padding: 1.4rem 2rem;
          border-radius: 10px;
          font-size: 1.1rem;
          font-weight: 500;
          color: green;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          width: 260px;
          min-height: 90px;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        /* Resume Name Text */
        .resume-name {
          font-weight: bold;
          font-size: 1.1rem;
          color: green;
        }

        /* Resume Download Icon */
        .resume-card .download-icon {
          position: absolute;
          right: 1rem;
          bottom: 1rem;
          color: green;
          text-decoration: none;
          opacity: 1;
          transition: opacity 0.5s ease;
        }

        .resume-card .download-icon:active {
          opacity: 0.3;
        }


        /* Common Text Styles */
        .project-title,
        .publication-title,
        .patent-card-title {
          font-weight: bold;
          font-size: 1.1rem;
        }

        .project-domain,
        .project-languages,
        .publication-journal,
        .publication-authors,
        .publication-date,
        .patent-number,
        .patent-filing-date,
        .patent-inventors {
          color: #666;
          font-size: 0.95rem;
        }

        /* View Link Container - Left aligned */
        .view-link-container {
          display: flex;
          justify-content: flex-start;
          margin-top: auto;
          padding-top: 0.5rem;
        }

        /* Common View Link Style - Left aligned */
        .view-link {
          color: green;
          cursor: pointer;
          text-decoration: underline;
          font-size: 0.95rem;
          transition: color 0.3s ease;
          display: inline-block;
          margin-top: 0.5rem;
        }

        .view-link:hover {
          color: #004d00;
        }

        /* Placement Portal Section */
        .placement-section {
          background: transparent;
          padding-left: 3cm;
          padding-right: 3cm;
          padding-top: 0.5cm;
          padding-bottom: 0.3rem;
        }

        .placement-title {
          font-size: 1.8rem;
          font-weight: bold;
          color: green;
          margin-bottom: 1rem;
          text-align: left;
        }

        .portal-link {
          font-size: 1.1rem;
          color: #006400;
          text-decoration: underline;
          cursor: pointer;
        }

        /* LinkedIn Section */
        .linkedin-section {
          background: transparent;
          padding-left: 3cm;
          padding-right: 3cm;
          padding-top: 0.5cm;
        }

        .linkedin-title {
          font-size: 1.8rem;
          font-weight: bold;
          color: green;
          margin-bottom: 1rem;
          text-align: left;
        }

        .linkedin-link {
          font-size: 1.1rem;
        }

        .linkedin-link a {
          color: #0077b5;
          text-decoration: underline;
          cursor: pointer;
        }

        .linkedin-link a:hover {
          color: #005582;
        }

        /* GitHub Section */
        .github-section {
          background: transparent;
          padding-left: 3cm;
          padding-right: 3cm;
          padding-top: 0.5cm;
        }

        .github-title {
          font-size: 1.8rem;
          font-weight: bold;
          color: green;
          margin-bottom: 1rem;
          text-align: left;
        }

        .github-link {
          font-size: 1.1rem;
        }

        .github-link a {
          color: #0077b5;
          text-decoration: underline;
          cursor: pointer;
        }

        .github-link a:hover {
          color: #005582;
        }

        /* LeetCode Section */
        .leetcode-section {
          background: transparent;
          padding-left: 3cm;
          padding-right: 3cm;
          padding-top: 0.5cm;
        }

        .leetcode-title {
          font-size: 1.8rem;
          font-weight: bold;
          color: green;
          margin-bottom: 1rem;
          text-align: left;
        }

        .leetcode-link {
          font-size: 1.1rem;
        }

        .leetcode-link a {
          color: #0077b5;
          text-decoration: underline;
          cursor: pointer;
        }

        .leetcode-link a:hover {
          color: #005582;
        }

        /* Extracurricular Activities Section */
        .extracurricular-section {
          background: transparent;
          padding-left: 3cm;
          padding-right: 3cm;
          padding-top: 0.5cm;
          padding-bottom: 0.3rem;
        }

        .extracurricular-title {
          font-size: 1.8rem;
          font-weight: bold;
          color: green;
          margin-bottom: 1rem;
          text-align: left;
        }

        /* Co-Curricular Activities Section */
        .cocurricular-section {
          background: transparent;
          padding-left: 3cm;
          padding-right: 3cm;
          padding-top: 0.5cm;
          padding-bottom: 0.3rem;
        }

        .cocurricular-title {
          font-size: 1.8rem;
          font-weight: bold;
          color: green;
          margin-bottom: 1rem;
          text-align: left;
        }

        .activities-list {
          list-style: disc;
          padding-left: 2.5rem;
          color: #333;
          font-size: 1.2rem;
          margin: 0;
        }

        .activities-list li {
          line-height: 2rem;
          margin-bottom: 0.5rem;
        }

        .no-data-text {
          color: #666;
          font-style: italic;
          font-size: 1rem;
        }

        /* Contact Section */
        .contact-section {
          background: transparent;
          padding-left: 3cm;
          padding-right: 3cm;
          padding-top: 0.5cm;
          padding-bottom: 0.3rem;
        }

        .contact-title {
          font-size: 1.8rem;
          font-weight: bold;
          color: green;
          margin-bottom: 1rem;
          text-align: left;
        }

        .contact-details {
          font-size: 1.2rem;
          color: #333;
          line-height: 2.2rem;
          margin-bottom: 0;
        }

        /* ============================= */
        /* Responsive: Max-width 768px  */
        /* ============================= */
        @media (max-width: 768px) {
          .personal-details {
            flex-direction: column;
            align-items: center;
          }

          .details-text {
            text-align: center;
            margin-top: 1rem;
          }

          .details-photo {
            margin-right: 0;
            margin-top: 2rem;
          }

          .navbar-right {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            justify-content: flex-end;
          }

          /* Responsive padding adjustments for all sections */
          .academic-section,
          .cgpa-section,
          .skills-section,
          .certifications-section,
          .projects-section,
          .publications-section,
          .patents-section,
          .resume-section,
          .placement-section,
          .linkedin-section,
          .github-section,
          .leetcode-section,
          .extracurricular-section,
          .cocurricular-section,
          .contact-section {
            padding-left: 1rem;
            padding-right: 1rem;
          }

          /* Center-align all titles */
          .academic-title,
          .cgpa-title,
          .skills-title,
          .certifications-title,
          .projects-title,
          .publications-title,
          .patents-title,
          .resume-title,
          .placement-title,
          .linkedin-title,
          .github-title,
          .leetcode-title,
          .extracurricular-title,
          .cocurricular-title,
          .contact-title {
            text-align: center;
          }

          /* Skills layout adjustment */
          .skills-container {
            justify-content: center;
            gap: 1rem;
          }

          .skill-card {
            padding: 1rem 2rem;
            font-size: 1rem;
          }

          /* Card containers center alignment */
          .certification-cards,
          .project-cards,
          .publication-cards,
          .patent-cards {
            justify-content: center;
          }

          /* Card width reduction for smaller screens */
          .cert-card,
          .project-card,
          .publication-card,
          .patent-card {
            width: 90%;
          }

          /* Resume card responsiveness */
          .resume-card {
            width: 90%;
            margin: auto;
          }

          /* Activities list responsiveness */
          .activities-list {
            padding-left: 1.5rem;
          }
        }

      `}</style>
    </>
  );
};

export default StudentProfileDetail;