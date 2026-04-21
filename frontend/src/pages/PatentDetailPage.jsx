import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FiDownload, FiExternalLink } from "react-icons/fi";
import { getFileUrl } from "../utils/imageUtils";

const PatentDetailPage = () => {
  const location = useLocation();
  const patent = location.state;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!patent) {
    return <div style={{ padding: "2rem" }}>No Patent Found.</div>;
  }

  const getFileName = (path) => {
    if (!path) return "";
    const parts = path.split("/").pop().split(".");
    return parts[0];
  };

  return (
    <div className="patent-detail-wrapper">
      <div className="patent-title">{patent.title}</div>

      <div className="patent-content">
        <p className="section-heading">Abstract</p>
        <p>{patent.abstractText}</p>

        <hr className="section-divider" />

        <p><strong>Patent Number:</strong> {patent.patentNumber}</p>

        <p><strong>Filing Date:</strong> {patent.filingDate}</p>

        <p><strong>Inventors:</strong></p>
        {Array.isArray(patent.inventors) ? (
          <ul>
            {patent.inventors.map((inventor, index) => (
              <li key={index}>{inventor}</li>
            ))}
          </ul>
        ) : (
          <p>{patent.inventors}</p>
        )}

        <p><strong>Domain:</strong> {patent.domain}</p>

        <p><strong>Publication Date:</strong> {patent.publicationDate}</p>

        <hr className="section-divider" />

        {/* Certificate Section */}
        {patent.certificateUrl && (
          <>
            <div className="media-box">
              <h4 className="media-title">Certificate / Document</h4>
              <div className="file-card" onClick={() => window.open(getFileUrl(patent.certificateUrl), '_blank')} style={{ cursor: 'pointer' }}>
                <div className="file-name">{getFileName(patent.certificateUrl)}</div>
                <a
                  href={getFileUrl(patent.certificateUrl)}
                  download
                  onClick={(e) => e.stopPropagation()}
                  className="download-icon"
                  title="Download Certificate"
                >
                  <FiDownload size={20} />
                </a>
              </div>
            </div>
            <hr className="section-divider" />
          </>
        )}

        {/* Patent Link Section */}
        {patent.patentLink && (
          <div className="patent-link-section">
            <h4 className="media-title">Patent Link</h4>
            <a
              href={patent.patentLink}
              target="_blank"
              rel="noopener noreferrer"
              className="patent-external-link"
            >
              View Patent on Official Portal <FiExternalLink size={16} style={{ marginLeft: '0.5rem' }} />
            </a>
          </div>
        )}
      </div>

      <style>{`
        .patent-detail-wrapper {
          background-color: #f0f8f0;
          min-height: 100vh;
          font-family: "Segoe UI", sans-serif;
        }

        .patent-title {
          background-color: white;
          color: green;
          padding: 1.5rem;
          font-size: 2rem;
          font-weight: bold;
          text-align: center;
          margin: 0;
          width: 100%;
        }

        .patent-content {
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

        .file-card {
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

        .file-name {
          font-weight: bold;
          font-size: 1.1rem;
          color: green;
        }

        .file-card .download-icon {
          position: absolute;
          right: 1rem;
          bottom: 1rem;
          color: green;
          text-decoration: none;
          opacity: 1;
          transition: opacity 0.5s ease;
        }

        .file-card .download-icon:active {
          opacity: 0.3;
        }

        .patent-link-section {
          margin-top: 1rem;
        }

        .patent-external-link {
          display: inline-flex;
          align-items: center;
          color: #006400;
          font-size: 1.1rem;
          text-decoration: underline;
          cursor: pointer;
          transition: color 0.3s ease;
        }

        .patent-external-link:hover {
          color: #004d00;
        }

        @media (max-width: 768px) {
          .patent-content {
            padding: 1rem;
          }

          .patent-title {
            font-size: 1.6rem;
          }

          .file-card {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default PatentDetailPage;
