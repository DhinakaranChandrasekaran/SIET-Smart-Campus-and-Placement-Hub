import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FiDownload } from "react-icons/fi";
import { getFileUrl } from "../utils/imageUtils";

const ProjectDetailPage = () => {
  const location = useLocation();
  const project = location.state;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project) return <div style={{ padding: "2rem" }}>No Project Found.</div>;

  const getFileName = (path) => {
    if (!path) return "";
    const parts = path.split("/").pop().split(".");
    return parts[0]; // Remove .pdf extension
  };

  return (
    <div className="project-detail-wrapper">
      <div className="project-title">{project.title}</div>

      <div className="project-content">
        <p className="section-heading">Abstract</p>
        <p>{project.abstractText}</p>

        <hr className="section-divider" />

        <p><strong>Domain:</strong> {project.domain}</p>
        <p><strong>Technologies Used:</strong> {Array.isArray(project.languages) ? project.languages.join(", ") : project.languages}</p>

        <hr className="section-divider" />

        {/* Report Section */}
        {project.reportPdf && (
          <>
            <div className="media-box">
              <h4 className="media-title">Project Report</h4>
              <div className="report-card" onClick={() => window.open(getFileUrl(project.reportPdf), '_blank')} style={{ cursor: 'pointer' }}>
                <div className="report-name">{getFileName(project.reportPdf)}</div>
                <a
                  href={getFileUrl(project.reportPdf)}
                  download
                  onClick={(e) => e.stopPropagation()}
                  className="download-icon"
                  title="Download Report"
                >
                  <FiDownload size={20} />
                </a>
              </div>
            </div>
            <hr className="section-divider" />
          </>
        )}

        {/* Video Section */}
        {project.demoVideo && (
          <>
            <div className="media-box">
              <h4 className="media-title">Project Demo Video</h4>
              <video width="100%" height="auto" controls>
                <source src={getFileUrl(project.demoVideo)} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <hr className="section-divider" />
          </>
        )}
      </div>

      <style>{`
        .project-detail-wrapper {
          background-color: #f0f8f0;
          min-height: 100vh;
          font-family: "Segoe UI", sans-serif;
        }

        .project-title {
          background-color: white;
          color: green;
          padding: 1.5rem;
          font-size: 2rem;
          font-weight: bold;
          text-align: center;
          margin: 0;
          width: 100%;
        }

        .project-content {
          padding: 2rem 3cm;
          font-size: 1.2rem;
          line-height: 1.8rem;
          color: #333;
        }

        .section-heading {
          font-size: 1.4rem;
          font-weight: bold;
          color: #006400;
          margin-top: 1.5rem;
          margin-bottom: 0.5rem;
        }

        .section-divider {
          border: none;
          border-top: 1px solid green;
          margin: 1.5rem 0;
        }

        .media-box {
          display: flex;
          flex-direction: column;
          margin-top: 1rem;
        }

        .media-title {
          font-size: 1.2rem;
          font-weight: bold;
          color: #004d00;
          margin-bottom: 1.5rem;
        }

        .report-card {
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

        .report-name {
          font-weight: bold;
          font-size: 1.1rem;
          color: green;
        }

        .report-card .download-icon {
          position: absolute;
          right: 1rem;
          bottom: 1rem;
          color: green;
          text-decoration: none;
          opacity: 1;
          transition: opacity 0.5s ease;
        }

        .report-card .download-icon:active {
          opacity: 0.3;
        }

        video {
          border-radius: 8px;
          max-width: 100%;
          margin-top: 0.5rem;
        }

        @media (max-width: 768px) {
          .project-content {
            padding: 1rem;
          }

          .project-title {
            font-size: 1.6rem;
          }

          .report-card {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default ProjectDetailPage;
