import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';
import studentService from '../services/studentService';
import { getCurrentUser } from '../data/authCredentials';
import SIETLoader from '../components/SIETLoader';
import { FiPlus, FiTrash2 } from 'react-icons/fi';

const UpdateForm = () => {
  const navigate = useNavigate();
  const { regNo } = useParams();
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [uploadsInProgress, setUploadsInProgress] = useState(0);
  const [infoModal, setInfoModal] = useState({ show: false, title: '', message: '', type: 'success', onClose: null });

  // Dynamic multi-entry arrays
  const [certifications, setCertifications] = useState([{ course: '', domain: '', date: '', file: null, filePath: null }]);
  const [projects, setProjects] = useState([{ title: '', domain: '', languages: '', abstract: '', demoVideo: null, demoVideoPath: null, reportPdf: null, reportPdfPath: null }]);
  const [publications, setPublications] = useState([{ title: '', journal: '', authors: '', abstract: '', date: '', paperPdf: null, paperPdfPath: null, certificatePdf: null, certificatePdfPath: null }]);
  const [patents, setPatents] = useState([{ title: '', patentNumber: '', filingDate: '', abstract: '', inventors: '', domain: '', publicationDate: '', certificateFile: null, certificateFilePath: null, patentLink: '' }]);

  // Resume file states
  const [resumeFilePath, setResumeFilePath] = useState(null);
  const [fourPageResumeFilePath, setFourPageResumeFilePath] = useState(null);

  useEffect(() => {
    const fetchStudentData = async () => {
      let studentRegNo = regNo;
      if (!studentRegNo) {
        const currentUser = getCurrentUser();
        if (currentUser && currentUser.regNo) {
          studentRegNo = currentUser.regNo;
        }
      }
      if (!studentRegNo) {
        navigate('/sign-in');
        return;
      }
      try {
        const student = await studentService.getStudentByRegNo(studentRegNo);
        if (!student) {
          setInfoModal({ show: true, title: 'Student Not Found', message: 'No student record found for this register number.', type: 'error', onClose: () => { setInfoModal(m => ({...m, show: false})); navigate('/sign-in?next=update-profile'); } });
          return;
        }
        setStudentData(student);
        setFormData({
          name: student.name || '',
          regNo: student.registerNumber || '',
          dob: student.dateOfBirth || '',
          department: student.department || '',
          bloodGroup: student.bloodGroup || '',
          address: student.address || '',
          academicYear: student.academicYear || '',
          yearOfPassing: student.yearOfPassing || '',
          trainingBatch: student.trainingBatch || '',
          email: '', phone: '',
          sslcBoard: '', sslcInstitution: '', sslcYear: '', sslcPercentage: '',
          hscBoard: '', hscInstitution: '', hscYear: '', hscPercentage: '',
          ugDepartment: '', ugInstitution: '', ugYear: '', ugCgpa: '',
          sgpa1: '', sgpa2: '', sgpa3: '', sgpa4: '',
          sgpa5: '', sgpa6: '', sgpa7: '', sgpa8: '',
          overallCgpa: '',
          linkedin: '', githubProfile: '', leetcodeProfile: '',
          skills: '',
          resumeName: '',
          placementStatus: '',
          extracurricularActivities: '',
          coCurricularActivities: ''
        });
        setInfoModal({ show: true, title: 'Data Loaded Successfully!', message: 'You can now modify and update your profile.', type: 'success', onClose: () => setInfoModal(m => ({...m, show: false})) });
      } catch (error) {
        console.error('Error fetching student:', error);
        setInfoModal({ show: true, title: 'Error', message: 'Error loading student data. Please try again.', type: 'error', onClose: () => { setInfoModal(m => ({...m, show: false})); navigate('/sign-in'); } });
      } finally {
        setLoading(false);
      }
    };
    fetchStudentData();
  }, [regNo, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ======= DYNAMIC ARRAY HANDLERS =======

  // Certifications
  const addCertification = () => setCertifications(prev => [...prev, { course: '', domain: '', date: '', file: null, filePath: null }]);
  const removeCertification = (idx) => setCertifications(prev => prev.length > 1 ? prev.filter((_, i) => i !== idx) : prev);
  const updateCertification = (idx, field, value) => {
    setCertifications(prev => {
      const updated = prev.map((item, i) => i === idx ? { ...item, [field]: value } : item);
      return updated;
    });
  };

  // Projects
  const addProject = () => setProjects(prev => [...prev, { title: '', domain: '', languages: '', abstract: '', demoVideo: null, demoVideoPath: null, reportPdf: null, reportPdfPath: null }]);
  const removeProject = (idx) => setProjects(prev => prev.length > 1 ? prev.filter((_, i) => i !== idx) : prev);
  const updateProject = (idx, field, value) => {
    setProjects(prev => {
      const updated = prev.map((item, i) => i === idx ? { ...item, [field]: value } : item);
      return updated;
    });
  };

  // Publications
  const addPublication = () => setPublications(prev => [...prev, { title: '', journal: '', authors: '', abstract: '', date: '', paperPdf: null, paperPdfPath: null, certificatePdf: null, certificatePdfPath: null }]);
  const removePublication = (idx) => setPublications(prev => prev.length > 1 ? prev.filter((_, i) => i !== idx) : prev);
  const updatePublication = (idx, field, value) => {
    setPublications(prev => {
      const updated = prev.map((item, i) => i === idx ? { ...item, [field]: value } : item);
      return updated;
    });
  };

  // Patents
  const addPatent = () => setPatents(prev => [...prev, { title: '', patentNumber: '', filingDate: '', abstract: '', inventors: '', domain: '', publicationDate: '', certificateFile: null, certificateFilePath: null, patentLink: '' }]);
  const removePatent = (idx) => setPatents(prev => prev.length > 1 ? prev.filter((_, i) => i !== idx) : prev);
  const updatePatent = (idx, field, value) => {
    setPatents(prev => {
      const updated = prev.map((item, i) => i === idx ? { ...item, [field]: value } : item);
      return updated;
    });
  };

  // ======= FILE UPLOAD HANDLER =======
  const uploadFileToS3 = async (file, category, index, entityType, pathField) => {
    setUploadsInProgress(prev => prev + 1);
    const formDataToSend = new FormData();
    formDataToSend.append('file', file);
    formDataToSend.append('registerNumber', formData.regNo);
    formDataToSend.append('category', category);
    try {
      const response = await api.post('/files/temp/upload', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      const filePath = response.data.filePath;
      // Update the correct array entry with the S3 path
      if (entityType === 'certification') {
        updateCertification(index, pathField, filePath);
      } else if (entityType === 'project') {
        updateProject(index, pathField, filePath);
      } else if (entityType === 'publication') {
        updatePublication(index, pathField, filePath);
      } else if (entityType === 'patent') {
        updatePatent(index, pathField, filePath);
      } else if (entityType === 'resume') {
        setResumeFilePath(filePath);
      } else if (entityType === 'fourPageResume') {
        setFourPageResumeFilePath(filePath);
      }
      return filePath;
    } catch (error) {
      console.error('❌ File upload error:', error);
      return null;
    } finally {
      setUploadsInProgress(prev => prev - 1);
    }
  };

  // ======= SUBMIT =======
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Build certifications array for backend
    const certsData = certifications
      .filter(c => c.course && c.course.trim())
      .map(c => ({
        course: c.course,
        domain: c.domain,
        date: c.date,
        filePath: c.filePath || null
      }));

    // Build projects array for backend
    const projectsData = projects
      .filter(p => p.title && p.title.trim())
      .map(p => ({
        title: p.title,
        domain: p.domain,
        languages: p.languages ? p.languages.split(',').map(l => l.trim()).filter(l => l) : [],
        abstract: p.abstract,
        demoVideoPath: p.demoVideoPath || null,
        reportPdfPath: p.reportPdfPath || null
      }));

    // Build publications array for backend
    const pubsData = publications
      .filter(p => p.title && p.title.trim())
      .map(p => ({
        title: p.title,
        journal: p.journal,
        authors: p.authors ? p.authors.split(',').map(a => a.trim()).filter(a => a) : [],
        abstract: p.abstract,
        date: p.date,
        paperPdfPath: p.paperPdfPath || null,
        certificatePdfPath: p.certificatePdfPath || null
      }));

    // Build patents array for backend
    const patentsData = patents
      .filter(p => p.title && p.title.trim())
      .map(p => ({
        title: p.title,
        patentNumber: p.patentNumber,
        filingDate: p.filingDate,
        abstract: p.abstract,
        inventors: p.inventors ? p.inventors.split(',').map(i => i.trim()).filter(i => i) : [],
        domain: p.domain,
        publicationDate: p.publicationDate,
        certificateUrl: p.certificateFilePath || null,
        patentLink: p.patentLink
      }));

    const submittedData = {
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      sslcBoard: formData.sslcBoard,
      sslcInstitution: formData.sslcInstitution,
      sslcYear: formData.sslcYear,
      sslcPercentage: formData.sslcPercentage,
      hscBoard: formData.hscBoard,
      hscInstitution: formData.hscInstitution,
      hscYear: formData.hscYear,
      hscPercentage: formData.hscPercentage,
      ugDepartment: formData.ugDepartment,
      ugInstitution: formData.ugInstitution,
      ugYear: formData.ugYear,
      ugCgpa: formData.ugCgpa,
      overallCgpa: formData.overallCgpa,
      sgpaList: [
        formData.sgpa1, formData.sgpa2, formData.sgpa3, formData.sgpa4,
        formData.sgpa5, formData.sgpa6, formData.sgpa7, formData.sgpa8
      ].filter(s => s),
      linkedin: formData.linkedin,
      githubProfile: formData.githubProfile,
      leetcodeProfile: formData.leetcodeProfile,
      skills: formData.skills ? formData.skills.split(',').map(s => s.trim()).filter(s => s) : [],
      extracurricularActivities: formData.extracurricularActivities
        ? (Array.isArray(formData.extracurricularActivities)
          ? formData.extracurricularActivities.filter(a => a.trim())
          : formData.extracurricularActivities.split('\n').filter(a => a.trim()))
        : [],
      coCurricularActivities: formData.coCurricularActivities
        ? (Array.isArray(formData.coCurricularActivities)
          ? formData.coCurricularActivities.filter(a => a.trim())
          : formData.coCurricularActivities.split('\n').filter(a => a.trim()))
        : [],

      // Arrays of entries
      certificationsArray: certsData,
      projectsArray: projectsData,
      publicationsArray: pubsData,
      patentsArray: patentsData,

      // Resume paths
      resumeFilePath: resumeFilePath || null,
      fourPageResumeFilePath: fourPageResumeFilePath || null,
    };

    // Remove empty/null values
    const filterEmptyValues = (obj) => {
      const filtered = {};
      for (const [key, value] of Object.entries(obj)) {
        if (value === null || value === undefined || value === '') continue;
        if (Array.isArray(value) && value.length === 0) continue;
        if (typeof value === 'object' && !Array.isArray(value)) {
          const nestedFiltered = filterEmptyValues(value);
          if (Object.keys(nestedFiltered).length > 0) filtered[key] = nestedFiltered;
        } else {
          filtered[key] = value;
        }
      }
      return filtered;
    };

    const cleanedData = filterEmptyValues(submittedData);

    const updateRecord = {
      studentRegNo: formData.regNo,
      studentName: formData.name,
      submittedData: cleanedData,
      submittedOn: new Date().toISOString().split('T')[0],
      status: 'pending'
    };

    api.post('/update-requests', updateRecord)
      .then(response => {
        setIsSubmitting(false);
        setShowSuccessModal(true);
      })
      .catch(error => {
        console.error('Error submitting update request:', error.message);
        setInfoModal({ show: true, title: 'Submission Error', message: 'Error submitting update request. Please try again.', type: 'error', onClose: () => setInfoModal(m => ({...m, show: false})) });
        setIsSubmitting(false);
      });
  };

  if (loading || !studentData) {
    return <SIETLoader />;
  }

  return (
    <>
      {/* Top Header Banner */}
      <div className="update-navbar">
        <div className="navbar-left">🎓 <span className="profile-title">Update Student Profile</span></div>
        <div className="navbar-right">
          <span className="student-info">{formData.name} ({formData.regNo})</span>
        </div>
      </div>

      {/* Main Form Container */}
      <div className="update-page-container">
        <form onSubmit={handleSubmit} className="update-form">

          {/* PERSONAL DETAILS (Read-only) */}
          <fieldset disabled className="form-fieldset disabled-fieldset">
            <legend className="form-legend">Personal Details (Read-Only)</legend>
            <label className="form-label">Name</label>
            <input value={formData.name || ''} className="form-input" readOnly />
            <label className="form-label">Registration Number</label>
            <input value={formData.regNo || ''} className="form-input" readOnly />
            <label className="form-label">Date of Birth</label>
            <input value={formData.dob || ''} className="form-input" readOnly />
            <label className="form-label">Department</label>
            <input value={formData.department || ''} className="form-input" readOnly />
            <label className="form-label">Blood Group</label>
            <input value={formData.bloodGroup || ''} className="form-input" readOnly />
            <label className="form-label">Academic Year</label>
            <input value={formData.academicYear || ''} className="form-input" readOnly />
            <label className="form-label">Year of Passing</label>
            <input value={formData.yearOfPassing || ''} className="form-input" readOnly />
            <label className="form-label">Training Batch</label>
            <input value={formData.trainingBatch || ''} className="form-input" readOnly />
          </fieldset>

          {/* CONTACT */}
          <fieldset className="form-fieldset">
            <legend className="form-legend">Contact Information</legend>
            <label className="form-label">Email</label>
            <input name="email" value={formData.email || ''} onChange={handleChange} placeholder="Email" className="form-input" />
            <label className="form-label">Phone</label>
            <input name="phone" value={formData.phone || ''} onChange={handleChange} placeholder="Phone" className="form-input" />
            <label className="form-label">Address</label>
            <textarea name="address" value={formData.address || ''} onChange={handleChange} placeholder="Address" className="form-textarea"></textarea>
          </fieldset>

          {/* SSLC */}
          <fieldset className="form-fieldset">
            <legend className="form-legend">SSLC Details</legend>
            <label className="form-label">Board</label>
            <input name="sslcBoard" value={formData.sslcBoard || ''} onChange={handleChange} placeholder="Board (e.g., State Board, CBSE)" className="form-input" />
            <label className="form-label">Institution</label>
            <input name="sslcInstitution" value={formData.sslcInstitution || ''} onChange={handleChange} placeholder="School Name" className="form-input" />
            <label className="form-label">Year of Passing</label>
            <input name="sslcYear" value={formData.sslcYear || ''} onChange={handleChange} placeholder="Year (e.g., 2019)" className="form-input" />
            <label className="form-label">Percentage</label>
            <input name="sslcPercentage" value={formData.sslcPercentage || ''} onChange={handleChange} placeholder="Percentage (e.g., 95%)" className="form-input" />
          </fieldset>

          {/* HSC */}
          <fieldset className="form-fieldset">
            <legend className="form-legend">HSC Details</legend>
            <label className="form-label">Board</label>
            <input name="hscBoard" value={formData.hscBoard || ''} onChange={handleChange} placeholder="Board (e.g., State Board, CBSE)" className="form-input" />
            <label className="form-label">Institution</label>
            <input name="hscInstitution" value={formData.hscInstitution || ''} onChange={handleChange} placeholder="School Name" className="form-input" />
            <label className="form-label">Year of Passing</label>
            <input name="hscYear" value={formData.hscYear || ''} onChange={handleChange} placeholder="Year (e.g., 2021)" className="form-input" />
            <label className="form-label">Percentage</label>
            <input name="hscPercentage" value={formData.hscPercentage || ''} onChange={handleChange} placeholder="Percentage (e.g., 92%)" className="form-input" />
          </fieldset>

          {/* UG */}
          <fieldset className="form-fieldset">
            <legend className="form-legend">UG Details</legend>
            <label className="form-label">Department</label>
            <input name="ugDepartment" value={formData.ugDepartment || ''} onChange={handleChange} placeholder="Department" className="form-input" />
            <label className="form-label">Institution</label>
            <input name="ugInstitution" value={formData.ugInstitution || ''} onChange={handleChange} placeholder="College Name" className="form-input" />
            <label className="form-label">Year of Passing</label>
            <input name="ugYear" value={formData.ugYear || ''} onChange={handleChange} placeholder="Year (e.g., 2025)" className="form-input" />
            <label className="form-label">CGPA</label>
            <input name="ugCgpa" value={formData.ugCgpa || ''} onChange={handleChange} placeholder="CGPA (e.g., 8.7)" className="form-input" />
          </fieldset>

          {/* SGPA */}
          <fieldset className="form-fieldset">
            <legend className="form-legend">SGPA (Semester-wise)</legend>
            <div className="sgpa-grid">
              {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                <div key={sem}>
                  <label className="form-label">Semester {sem}</label>
                  <input name={`sgpa${sem}`} value={formData[`sgpa${sem}`] || ''} onChange={handleChange} placeholder="8.5" className="form-input" />
                </div>
              ))}
            </div>
          </fieldset>

          {/* CGPA */}
          <fieldset className="form-fieldset">
            <legend className="form-legend">CGPA</legend>
            <label className="form-label">Overall CGPA</label>
            <input name="overallCgpa" value={formData.overallCgpa || ''} onChange={handleChange} placeholder="8.85" className="form-input" />
          </fieldset>

          {/* SOCIAL PROFILES */}
          <fieldset className="form-fieldset">
            <legend className="form-legend">Social Profiles</legend>
            <label className="form-label">LinkedIn Profile</label>
            <input name="linkedin" value={formData.linkedin || ''} onChange={handleChange} placeholder="LinkedIn URL" className="form-input" />
            <label className="form-label">GitHub Profile</label>
            <input name="githubProfile" value={formData.githubProfile || ''} onChange={handleChange} placeholder="GitHub Profile URL" className="form-input" />
            <label className="form-label">LeetCode Profile</label>
            <input name="leetcodeProfile" value={formData.leetcodeProfile || ''} onChange={handleChange} placeholder="LeetCode Profile URL" className="form-input" />
          </fieldset>

          {/* SKILLS */}
          <fieldset className="form-fieldset">
            <legend className="form-legend">Skills</legend>
            <p className="form-hint">Enter skills separated by commas</p>
            <textarea name="skills" value={formData.skills || ''} onChange={handleChange} placeholder="Java, Python, React, Node.js..." className="form-textarea"></textarea>
          </fieldset>

          {/* ===================== CERTIFICATIONS (MULTI) ===================== */}
          <fieldset className="form-fieldset">
            <legend className="form-legend">
              Certifications
              <button type="button" className="add-btn" onClick={addCertification} title="Add another certification">
                <FiPlus size={18} />
              </button>
            </legend>
            {certifications.map((cert, idx) => (
              <div key={idx} className="multi-entry-card">
                <div className="entry-header">
                  <span className="entry-number">Certification {idx + 1}</span>
                  {certifications.length > 1 && (
                    <button type="button" className="remove-btn" onClick={() => removeCertification(idx)} title="Remove">
                      <FiTrash2 size={16} />
                    </button>
                  )}
                </div>
                <label className="form-label">Course Name</label>
                <input value={cert.course} onChange={(e) => updateCertification(idx, 'course', e.target.value)} placeholder="Full Stack Web Development" className="form-input" />
                <label className="form-label">Domain</label>
                <input value={cert.domain} onChange={(e) => updateCertification(idx, 'domain', e.target.value)} placeholder="Web Development" className="form-input" />
                <label className="form-label">Date (Month Year)</label>
                <input value={cert.date} onChange={(e) => updateCertification(idx, 'date', e.target.value)} placeholder="June 2025" className="form-input" />
                <label className="form-label">Upload Certificate (PDF/Image)</label>
                <input type="file" accept=".pdf,.jpg,.jpeg,.png" className="form-input"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      updateCertification(idx, 'file', file);
                      uploadFileToS3(file, 'certifications', idx, 'certification', 'filePath');
                    }
                  }}
                />
                {cert.filePath && <p className="file-info">✓ Uploaded successfully</p>}
              </div>
            ))}
          </fieldset>

          {/* ===================== PROJECTS (MULTI) ===================== */}
          <fieldset className="form-fieldset">
            <legend className="form-legend">
              Projects
              <button type="button" className="add-btn" onClick={addProject} title="Add another project">
                <FiPlus size={18} />
              </button>
            </legend>
            {projects.map((proj, idx) => (
              <div key={idx} className="multi-entry-card">
                <div className="entry-header">
                  <span className="entry-number">Project {idx + 1}</span>
                  {projects.length > 1 && (
                    <button type="button" className="remove-btn" onClick={() => removeProject(idx)} title="Remove">
                      <FiTrash2 size={16} />
                    </button>
                  )}
                </div>
                <label className="form-label">Project Title</label>
                <input value={proj.title} onChange={(e) => updateProject(idx, 'title', e.target.value)} placeholder="Project Title" className="form-input" />
                <label className="form-label">Domain</label>
                <input value={proj.domain} onChange={(e) => updateProject(idx, 'domain', e.target.value)} placeholder="Domain (e.g., Web Development)" className="form-input" />
                <label className="form-label">Languages/Technologies</label>
                <input value={proj.languages} onChange={(e) => updateProject(idx, 'languages', e.target.value)} placeholder="HTML, CSS, Node.js (comma-separated)" className="form-input" />
                <label className="form-label">Abstract</label>
                <textarea value={proj.abstract} onChange={(e) => updateProject(idx, 'abstract', e.target.value)} placeholder="Project description..." className="form-textarea"></textarea>
                <label className="form-label">Upload Demo Video</label>
                <input type="file" accept="video/*" className="form-input"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      updateProject(idx, 'demoVideo', file);
                      uploadFileToS3(file, 'projects', idx, 'project', 'demoVideoPath');
                    }
                  }}
                />
                {proj.demoVideoPath && <p className="file-info">✓ Video uploaded</p>}
                <label className="form-label">Upload Project Report (PDF)</label>
                <input type="file" accept=".pdf" className="form-input"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      updateProject(idx, 'reportPdf', file);
                      uploadFileToS3(file, 'projects', idx, 'project', 'reportPdfPath');
                    }
                  }}
                />
                {proj.reportPdfPath && <p className="file-info">✓ Report uploaded</p>}
              </div>
            ))}
          </fieldset>

          {/* ===================== PUBLICATIONS (MULTI) ===================== */}
          <fieldset className="form-fieldset">
            <legend className="form-legend">
              Publications
              <button type="button" className="add-btn" onClick={addPublication} title="Add another publication">
                <FiPlus size={18} />
              </button>
            </legend>
            {publications.map((pub, idx) => (
              <div key={idx} className="multi-entry-card">
                <div className="entry-header">
                  <span className="entry-number">Publication {idx + 1}</span>
                  {publications.length > 1 && (
                    <button type="button" className="remove-btn" onClick={() => removePublication(idx)} title="Remove">
                      <FiTrash2 size={16} />
                    </button>
                  )}
                </div>
                <label className="form-label">Publication Title</label>
                <input value={pub.title} onChange={(e) => updatePublication(idx, 'title', e.target.value)} placeholder="Publication Title" className="form-input" />
                <label className="form-label">Journal</label>
                <input value={pub.journal} onChange={(e) => updatePublication(idx, 'journal', e.target.value)} placeholder="Journal Name (e.g., IJEI)" className="form-input" />
                <label className="form-label">Authors</label>
                <input value={pub.authors} onChange={(e) => updatePublication(idx, 'authors', e.target.value)} placeholder="Authors (comma-separated)" className="form-input" />
                <label className="form-label">Abstract</label>
                <textarea value={pub.abstract} onChange={(e) => updatePublication(idx, 'abstract', e.target.value)} placeholder="Publication abstract..." className="form-textarea"></textarea>
                <label className="form-label">Publication Date</label>
                <input value={pub.date} onChange={(e) => updatePublication(idx, 'date', e.target.value)} placeholder="Date (e.g., Feb 2025)" className="form-input" />
                <label className="form-label">Upload Paper (PDF)</label>
                <input type="file" accept=".pdf" className="form-input"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      updatePublication(idx, 'paperPdf', file);
                      uploadFileToS3(file, 'publications', idx, 'publication', 'paperPdfPath');
                    }
                  }}
                />
                {pub.paperPdfPath && <p className="file-info">✓ Paper uploaded</p>}
                <label className="form-label">Upload Certificate (PDF)</label>
                <input type="file" accept=".pdf" className="form-input"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      updatePublication(idx, 'certificatePdf', file);
                      uploadFileToS3(file, 'publications', idx, 'publication', 'certificatePdfPath');
                    }
                  }}
                />
                {pub.certificatePdfPath && <p className="file-info">✓ Certificate uploaded</p>}
              </div>
            ))}
          </fieldset>

          {/* ===================== PATENTS (MULTI) ===================== */}
          <fieldset className="form-fieldset">
            <legend className="form-legend">
              Patents
              <button type="button" className="add-btn" onClick={addPatent} title="Add another patent">
                <FiPlus size={18} />
              </button>
            </legend>
            {patents.map((pat, idx) => (
              <div key={idx} className="multi-entry-card">
                <div className="entry-header">
                  <span className="entry-number">Patent {idx + 1}</span>
                  {patents.length > 1 && (
                    <button type="button" className="remove-btn" onClick={() => removePatent(idx)} title="Remove">
                      <FiTrash2 size={16} />
                    </button>
                  )}
                </div>
                <label className="form-label">Patent Title</label>
                <input value={pat.title} onChange={(e) => updatePatent(idx, 'title', e.target.value)} placeholder="Patent Title" className="form-input" />
                <label className="form-label">Patent Number</label>
                <input value={pat.patentNumber} onChange={(e) => updatePatent(idx, 'patentNumber', e.target.value)} placeholder="IN2023123456A" className="form-input" />
                <label className="form-label">Filing Date</label>
                <input value={pat.filingDate} onChange={(e) => updatePatent(idx, 'filingDate', e.target.value)} placeholder="12-07-2023" className="form-input" />
                <label className="form-label">Abstract</label>
                <textarea value={pat.abstract} onChange={(e) => updatePatent(idx, 'abstract', e.target.value)} placeholder="Patent Abstract..." className="form-textarea"></textarea>
                <label className="form-label">Inventors</label>
                <input value={pat.inventors} onChange={(e) => updatePatent(idx, 'inventors', e.target.value)} placeholder="Inventors (comma-separated)" className="form-input" />
                <label className="form-label">Domain</label>
                <input value={pat.domain} onChange={(e) => updatePatent(idx, 'domain', e.target.value)} placeholder="Artificial Intelligence / IoT" className="form-input" />
                <label className="form-label">Publication Date</label>
                <input value={pat.publicationDate} onChange={(e) => updatePatent(idx, 'publicationDate', e.target.value)} placeholder="15-01-2024" className="form-input" />
                <label className="form-label">Upload Certificate/Document (PDF/Image)</label>
                <input type="file" accept=".pdf,.jpg,.jpeg,.png" className="form-input"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      updatePatent(idx, 'certificateFile', file);
                      uploadFileToS3(file, 'patents', idx, 'patent', 'certificateFilePath');
                    }
                  }}
                />
                {pat.certificateFilePath && <p className="file-info">✓ Certificate uploaded</p>}
                <label className="form-label">Patent Link</label>
                <input value={pat.patentLink} onChange={(e) => updatePatent(idx, 'patentLink', e.target.value)} placeholder="Official Patent Portal URL" className="form-input" />
              </div>
            ))}
          </fieldset>

          {/* RESUME */}
          <fieldset className="form-fieldset">
            <legend className="form-legend">Resume</legend>
            <label className="form-label">Upload One-Page Resume (PDF)</label>
            <input type="file" accept=".pdf" className="form-input"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  uploadFileToS3(file, 'resumes', 0, 'resume', 'filePath');
                }
              }}
            />
            {resumeFilePath && <p className="file-info">✓ Resume uploaded</p>}
            <label className="form-label">Upload 4-Page Resume (PDF)</label>
            <input type="file" accept=".pdf" className="form-input"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  uploadFileToS3(file, 'resumes', 0, 'fourPageResume', 'filePath');
                }
              }}
            />
            {fourPageResumeFilePath && <p className="file-info">✓ 4-Page Resume uploaded</p>}
          </fieldset>

          {/* EXTRACURRICULAR ACTIVITIES */}
          <fieldset className="form-fieldset">
            <legend className="form-legend">Extracurricular Activities</legend>
            <p className="form-hint">Enter each activity on a new line</p>
            <textarea name="extracurricularActivities" value={formData.extracurricularActivities || ''} onChange={handleChange} placeholder={"Participated in inter-college cultural events\nMember of sports team"} className="form-textarea-large"></textarea>
          </fieldset>

          {/* CO-CURRICULAR ACTIVITIES */}
          <fieldset className="form-fieldset">
            <legend className="form-legend">Co-Curricular Activities</legend>
            <p className="form-hint">Enter each activity on a new line</p>
            <textarea name="coCurricularActivities" value={formData.coCurricularActivities || ''} onChange={handleChange} placeholder={"Attended workshops & seminars\nParticipated in hackathons"} className="form-textarea-large"></textarea>
          </fieldset>

          {/* SUBMIT BUTTON */}
          <div className="submit-container">
            <button type="submit" className="submit-button" disabled={isSubmitting || uploadsInProgress > 0}>
              {uploadsInProgress > 0 ? `Uploading ${uploadsInProgress} file(s)...` : isSubmitting ? 'Submitting...' : 'Submit Update Request'}
            </button>
          </div>
        </form>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <h2 className="modal-title">Update Request Submitted Successfully!</h2>
            <div className="modal-content">
              <p className="modal-note">You will be notified once your profile is updated.</p>
            </div>
            <button className="modal-button" onClick={() => { setShowSuccessModal(false); navigate('/'); }}>
              OK
            </button>
          </div>
        </div>
      )}

      {/* Info/Error Modal */}
      {infoModal.show && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className={`modal-icon ${infoModal.type === 'error' ? 'modal-icon-error' : 'modal-icon-success'}`}>
              {infoModal.type === 'error' ? '✕' : '✓'}
            </div>
            <h2 className="modal-title" style={{ color: infoModal.type === 'error' ? '#d32f2f' : '#0A8F47' }}>{infoModal.title}</h2>
            <div className="modal-content">
              <p className="modal-note">{infoModal.message}</p>
            </div>
            <button className="modal-button" style={{ backgroundColor: infoModal.type === 'error' ? '#d32f2f' : '#0A8F47' }} onClick={infoModal.onClose || (() => setInfoModal(m => ({...m, show: false})))}>
              OK
            </button>
          </div>
        </div>
      )}

      <style>{pageStyles}</style>
    </>
  );
};

const pageStyles = `
  body {
    margin: 0;
    font-family: "Segoe UI", sans-serif;
  }

  .update-navbar {
    position: sticky;
    top: 0;
    z-index: 999;
    background-color: #0A8F47;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.2rem 2rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .navbar-left {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .profile-title {
    font-size: 1.6rem;
    font-weight: bold;
  }

  .navbar-right .student-info {
    font-size: 1rem;
    color: #c1f0c1;
  }

  .update-page-container {
    background-color: #f0f8f0;
    min-height: calc(100vh - 70px);
    padding: 2rem;
  }

  .loading-container {
    text-align: center;
    padding: 3rem;
    font-size: 1.2rem;
    color: #333;
  }

  .update-form {
    max-width: 800px;
    margin: 0 auto;
  }

  .form-fieldset {
    margin-bottom: 2rem;
    border: 1px solid #2e7d32;
    border-radius: 12px;
    padding: 1.5rem;
    background-color: #ffffff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }

  .disabled-fieldset {
    opacity: 0.85;
    background-color: #f9f9f9;
  }

  .form-legend {
    color: #0A8F47;
    font-weight: bold;
    font-size: 1.2rem;
    padding: 0 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .form-label {
    display: block;
    color: #333;
    font-weight: 500;
    margin-bottom: 0.3rem;
    margin-top: 0.8rem;
    font-size: 1rem;
  }

  .form-hint {
    color: #666;
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
    font-style: italic;
  }

  .form-input {
    display: block;
    width: 100%;
    padding: 0.8rem;
    margin-bottom: 0.5rem;
    border-radius: 8px;
    border: 1px solid #ccc;
    box-sizing: border-box;
    font-size: 1rem;
    font-family: "Segoe UI", sans-serif;
    transition: border-color 0.3s ease;
  }

  .form-input:focus {
    outline: none;
    border-color: #0A8F47;
    box-shadow: 0 0 4px rgba(10, 143, 71, 0.3);
  }

  .form-textarea {
    width: 100%;
    height: 100px;
    padding: 0.8rem;
    border-radius: 8px;
    border: 1px solid #ccc;
    box-sizing: border-box;
    font-size: 1rem;
    font-family: "Segoe UI", sans-serif;
    resize: vertical;
  }

  .form-textarea-large {
    width: 100%;
    height: 150px;
    padding: 0.8rem;
    border-radius: 8px;
    border: 1px solid #ccc;
    box-sizing: border-box;
    font-size: 1rem;
    font-family: "Segoe UI", sans-serif;
    resize: vertical;
  }

  .form-textarea:focus,
  .form-textarea-large:focus {
    outline: none;
    border-color: #0A8F47;
    box-shadow: 0 0 4px rgba(10, 143, 71, 0.3);
  }

  .sgpa-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .file-info {
    color: #0A8F47;
    font-size: 0.9rem;
    margin-top: 0.3rem;
    margin-bottom: 0.8rem;
    font-weight: 500;
    padding: 0.5rem;
    background-color: #e8f5e9;
    border-radius: 6px;
    border-left: 3px solid #0A8F47;
  }

  /* ===== MULTI-ENTRY STYLES ===== */
  .add-btn {
    background: none;
    color: #0A8F47;
    border: none;
    font-size: 1.5rem;
    font-weight: bold;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: color 0.3s ease, transform 0.2s ease;
    margin-left: 0.3rem;
    padding: 0;
    line-height: 1;
  }

  .add-btn:hover {
    color: #077a3c;
    transform: scale(1.2);
  }

  .multi-entry-card {
    background-color: #f9fdf9;
    border: 1px solid #c8e6c9;
    border-radius: 10px;
    padding: 1.2rem;
    margin-bottom: 1rem;
    position: relative;
    transition: box-shadow 0.3s ease;
  }

  .multi-entry-card:hover {
    box-shadow: 0 2px 12px rgba(10, 143, 71, 0.1);
  }

  .entry-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
  }

  .entry-number {
    font-weight: 600;
    color: #0A8F47;
    font-size: 1rem;
  }

  .remove-btn {
    background-color: #ff5252;
    color: white;
    border: none;
    border-radius: 6px;
    padding: 0.35rem 0.5rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.3rem;
    font-size: 0.85rem;
    transition: background-color 0.3s ease;
  }

  .remove-btn:hover {
    background-color: #d32f2f;
  }

  .submit-container {
    text-align: center;
    margin-top: 2rem;
    padding-bottom: 2rem;
  }

  .submit-button {
    padding: 1rem 2.5rem;
    background-color: #ffffff;
    color: #228b22;
    border: 2px solid #228b22;
    border-radius: 10px;
    cursor: pointer;
    font-size: 1.1rem;
    font-weight: bold;
    transition: background-color 0.3s ease;
  }

  .submit-button:hover {
    background-color: #eaf8ea;
  }

  .submit-button:disabled {
    background-color: #f5f5f5;
    color: #999;
    border: 2px solid #ccc;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    .update-navbar {
      flex-direction: column;
      gap: 0.5rem;
      padding: 1rem;
    }

    .navbar-right .student-info {
      font-size: 0.9rem;
    }

    .update-page-container {
      padding: 1rem;
    }

    .form-fieldset {
      padding: 1rem;
    }

    .sgpa-grid {
      grid-template-columns: 1fr;
    }

    .submit-button {
      width: 100%;
      padding: 1rem;
    }

    .modal-container {
      width: 90%;
      max-width: 400px;
    }
  }

  /* Success Modal Styles */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }

  .modal-container {
    background-color: #ffffff;
    border-radius: 16px;
    padding: 2rem;
    max-width: 450px;
    width: 90%;
    text-align: center;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
    animation: modalSlideIn 0.3s ease-out;
  }

  @keyframes modalSlideIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .modal-title {
    color: #0A8F47;
    font-size: 1.4rem;
    font-weight: bold;
    margin-bottom: 1.5rem;
  }

  .modal-content {
    background-color: #f0f8f0;
    border-radius: 10px;
    padding: 1.2rem;
    margin-bottom: 1.5rem;
  }

  .modal-note {
    color: #666;
    font-size: 0.9rem;
    font-style: italic;
    margin: 0;
  }

  .modal-button {
    background-color: #0A8F47;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 0.8rem 2.5rem;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
  }

  .modal-button:hover {
    background-color: #077a3c;
    transform: translateY(-2px);
  }

  .modal-icon {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1rem;
    font-size: 1.5rem;
    font-weight: bold;
    color: white;
  }

  .modal-icon-success {
    background-color: #0A8F47;
  }

  .modal-icon-error {
    background-color: #d32f2f;
  }
`;

export default UpdateForm;
