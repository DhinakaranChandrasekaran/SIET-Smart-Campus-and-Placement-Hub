import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FiDownload } from "react-icons/fi";
import { getFileUrl } from "../utils/imageUtils";

const PublicationDetailPage = () => {
  const location = useLocation();
  const publication = location.state;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!publication) {
    return <div style={{ padding: "2rem" }}>No Publication Found.</div>;
  }

  const getFileName = (path) => {
    if (!path) return "";
    const parts = path.split("/").pop().split(".");
    return parts[0];
  };

  return (
    <div className="publication-detail-wrapper">
      <div className="publication-title">{publication.title}</div>

      <div className="publication-content">
        <p className="section-heading">Abstract</p>
        <p>{publication.abstractText}</p>

        <hr className="section-divider" />

        <p><strong>Journal Name:</strong> {publication.journal}</p>

        <p><strong>Authors:</strong></p>
        {Array.isArray(publication.authors) ? (
          <ul>
            {publication.authors.map((author, index) => (
              <li key={index}>{author}</li>
            ))}
          </ul>
        ) : (
          <p>{publication.authors}</p>
        )}

        <p><strong>Published Date:</strong> {publication.date}</p>

        <hr className="section-divider" />

        {/* Published Paper Section */}
        {publication.paperPdf && (
          <>
            <div className="media-box">
              <h4 className="media-title">Published Paper</h4>
              <div className="file-card" onClick={() => window.open(getFileUrl(publication.paperPdf), '_blank')} style={{ cursor: 'pointer' }}>
                <div className="file-name">{getFileName(publication.paperPdf)}</div>
                <a
                  href={getFileUrl(publication.paperPdf)}
                  download
                  onClick={(e) => e.stopPropagation()}
                  className="download-icon"
                  title="Download Published Paper"
                >
                  <FiDownload size={20} />
                </a>
              </div>
            </div>
            <hr className="section-divider" />
          </>
        )}

        {/* Certificate Section */}
        {publication.certificatePdf && (
          <>
            <div className="media-box">
              <h4 className="media-title">Certificate</h4>
              <div className="file-card" onClick={() => window.open(getFileUrl(publication.certificatePdf), '_blank')} style={{ cursor: 'pointer' }}>
                <div className="file-name">{getFileName(publication.certificatePdf)}</div>
                <a
                  href={getFileUrl(publication.certificatePdf)}
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
      </div>

      <style>{`
        .publication-detail-wrapper {
          background-color: #f0f8f0;
          min-height: 100vh;
          font-family: "Segoe UI", sans-serif;
        }

        .publication-title {
          background-color: white;
          color: green;
          padding: 1.5rem;
          font-size: 2rem;
          font-weight: bold;
          text-align: center;
          margin: 0;
          width: 100%;
        }

        .publication-content {
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

        @media (max-width: 768px) {
          .publication-content {
            padding: 1rem;
          }

          .publication-title {
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

export default PublicationDetailPage;
