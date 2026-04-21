import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import departmentService from "../services/departmentService";
import { departmentContent } from "../data/departmentContent";
import SIETLoader from "../components/SIETLoader";
import { getImageUrl } from "../utils/imageUtils";

const DepartmentDetailPage = () => {
  const { id } = useParams();
  const [department, setDepartment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("about");

  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const data = await departmentService.getDepartmentByCode(id);
        // Merge backend data with frontend static content
        const content = departmentContent[id] || {};
        const fullDepartment = {
          ...data,
          about: content.about || [],
          vision: content.vision || '',
          mission: content.mission || [],
          objectives: content.objectives || ''
        };
        setDepartment(fullDepartment);
      } catch (error) {
        console.error('Error fetching department:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDepartment();
  }, [id]);

  if (loading) {
    return <SIETLoader />;
  }

  if (!department) {
    return <div style={{ padding: "2rem" }}>Department not found.</div>;
  }

  const { name, image, hod, staff } = department;

  // Helper function to safely parse JSON strings
  const parseJsonField = (field) => {
    if (!field) return [];
    if (Array.isArray(field)) return field;
    if (typeof field === 'string') {
      try {
        return JSON.parse(field);
      } catch {
        return [];
      }
    }
    return [];
  };

  // Parse HOD profile fields if they exist
  const hodProfile = hod?.profile ? {
    ...hod.profile,
    academicBackground: parseJsonField(hod.profile.academicBackground),
    experience: parseJsonField(hod.profile.experience)
  } : null;

  return (
    <div style={{ backgroundColor: "#f0f8f0", minHeight: "100vh" }}>
      {/* Title Header with Logo */}
      <div
        style={{
          backgroundColor: "white",
          padding: "1.5rem 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          marginBottom: "0.5rem",
        }}
      >
        {/* College Logo - Left Corner */}
        <img
          src="/images/department/siet-logo.jpg"
          alt="College Logo"
          style={{
            position: "absolute",
            left: "1.5rem",
            height: "50px",
            width: "auto",
          }}
        />
        <h2 style={{ fontSize: "2.4rem", color: "#2e7d32", margin: 0 }}>{name}</h2>
      </div>

      {/* About Section */}
      <div className="about-college">
        {/* Left: Image + Tabs */}
        <div className="left">
          <img src={image} alt={name} />
          <div className="vertical-tabs">
            {["about", "vision", "mission"].map((key) => (
              <span
                key={key}
                onClick={() => setTab(key)}
                className={`tab-item ${tab === key ? "active" : ""}`}
              >
                {key[0].toUpperCase() + key.slice(1)}
              </span>
            ))}
          </div>
        </div>

        {/* Right: Dynamic Content */}
        <div className="right">
          <h3>{tab[0].toUpperCase() + tab.slice(1)}</h3>
          {tab === "mission" && Array.isArray(department[tab]) ? (
            <ul className="mission-list">
              {department[tab].map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          ) : Array.isArray(department[tab])
            ? department[tab].map((para, i) => <p key={i}>{para}</p>)
            : <p>{department[tab]}</p>}
        </div>
      </div>

      {/* Head of Department Section */}
      {hod && (
        <div style={{ marginTop: "4rem" }}>
          <div
            style={{
              backgroundColor: "white",
              padding: "1rem 0",
              margin: "0 -2rem",
              textAlign: "center",
              marginBottom: "2rem",
            }}
          >
            <h2 style={{ fontSize: "2rem", color: "#2e7d32", margin: 0 }}>
              Head of the Department
            </h2>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "2rem",
              justifyContent: "center",
              padding: "0 1rem",
            }}
          >
            {/* HOD Bio */}
            <div style={{ flex: 2.5, minWidth: "300px", lineHeight: "1.6", marginLeft: "1cm" }}>
              <h2 style={{ color: "green", marginBottom: "1.5rem" }}>About</h2>
              <h3 style={{ color: "green" }}>Personal Profile</h3>
              <p style={{ textAlign: "justify" }}>{hodProfile?.description || hod.profile?.description}</p>

              <h3 style={{ color: "green", marginTop: "1rem" }}>Academic Background</h3>
              <ul style={{ paddingLeft: "1.2rem" }}>
                {hodProfile?.academicBackground?.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>

              <h3 style={{ color: "green", marginTop: "1rem" }}>Professional Experience</h3>
              <ul style={{ paddingLeft: "1.2rem" }}>
                {hodProfile?.experience?.map((exp, i) => (
                  <li key={i}>
                    <strong>{exp.title}</strong><br />
                    {exp.period}<br />
                    {exp.description}
                  </li>
                ))}
              </ul>
            </div>

            {/* HOD Photo */}
            <div
              style={{
                flex: 1.5,
                minWidth: "260px",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                src={hod.photo}
                alt={hod.name}
                style={{
                  width: "260px",
                  height: "260px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
                }}
              />
              <h3 style={{ marginTop: "1rem", fontSize: "1.6rem", fontWeight: "bold" }}>{hod.name}</h3>
              <p style={{ fontStyle: "italic", color: "#555" }}>{hod.designation}</p>
              <p
                style={{
                  marginTop: "1rem",
                  color: "green",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  maxWidth: "280px",
                  lineHeight: "1.6",
                }}
              >
                {hod.profile.summary}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Faculty Members Cards */}
      {staff && staff.length > 0 && (
        <div style={{ marginTop: "2rem" }}>
          <div
            style={{
              backgroundColor: "white",
              padding: "0.5rem 0",
              textAlign: "center",
            }}
          >
            <h2 style={{ fontSize: "2rem", color: "#2e7d32", margin: 0 }}>Faculty Members</h2>
          </div>

          <div
            style={{
              padding: "4rem 4rem",
              display: "grid",
              gridTemplateColumns: "repeat(3, 350px)",
              gap: "8rem",
              justifyContent: "center",
              alignItems: "start",
            }}
            className="faculty-cards-container"
          >
            {staff.map((member, idx) => (
              <div
                key={idx}
                className="faculty-card"
                style={{
                  width: "350px",
                  height: "350px",
                  backgroundColor: "white",
                  borderRadius: "16px",
                  overflow: "hidden",
                  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Image Section - 3/4 of card */}
                <div
                  style={{
                    flex: "3",
                    backgroundColor: "#e8f5e9",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={member.photo ? getImageUrl(member.photo) : `/images/department/faculty/${id}/${member.name.toLowerCase().replace(/\s+/g, '-').replace(/\./g, '')}.jpg`}
                    alt={member.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = `
                        <div style="
                          width: 120px;
                          height: 120px;
                          borderRadius: 50%;
                          backgroundColor: #2e7d32;
                          display: flex;
                          alignItems: center;
                          justifyContent: center;
                          color: white;
                          fontSize: 3rem;
                          fontWeight: bold;
                        ">${member.name.charAt(0).toUpperCase()}</div>
                      `;
                    }}
                  />
                </div>

                {/* Name & Position Section - 1/4 of card */}
                <div
                  style={{
                    flex: "1",
                    padding: "0.5rem",
                    background: "linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <h4
                    style={{
                      margin: "0 0 0.3rem 0",
                      color: "white",
                      fontSize: "1rem",
                      fontWeight: "600",
                      lineHeight: "1.2",
                    }}
                  >
                    {member.name}
                  </h4>
                  <p
                    style={{
                      margin: 0,
                      color: "rgba(255, 255, 255, 0.9)",
                      fontSize: "0.85rem",
                      fontStyle: "italic",
                    }}
                  >
                    {member.position}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Scoped CSS */}
      <style>{`
        .about-college {
          display: flex;
          flex-wrap: wrap;
          gap: 3rem;
          align-items: flex-start;
          padding: 0 2rem;
        }

        .about-college .left {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .about-college .left img {
          width: 320px;
          height: 320px;
          object-fit: cover;
          border-radius: 50%;
          box-shadow: 0 12px 20px rgba(0, 0, 0, 0.2);
          margin-top: 1.5rem;
        }

        .vertical-tabs {
          margin-top: 2rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .tab-item {
          font-size: 1rem;
          color: #2e7d32;
          cursor: pointer;
          font-weight: 500;
          text-align: center;
        }

        .tab-item.active {
          font-weight: 700;
          text-decoration: underline;
        }

        .about-college .right {
          flex: 2;
          min-width: 300px;
          padding-right: 2rem;
        }

        .about-college .right h3 {
          font-size: 1.6rem;
          color: #2e7d32;
          margin-bottom: 1rem;
        }

        .about-college .right p {
          font-size: 1.1rem;
          line-height: 1.6;
          color: #333;
          margin-bottom: 1rem;
          text-align: justify;
        }

        .about-college .right .mission-list {
          padding-left: 1.5rem;
          margin: 0;
        }

        .about-college .right .mission-list li {
          font-size: 1.1rem;
          line-height: 1.6;
          color: #333;
          margin-bottom: 0.8rem;
          text-align: justify;
        }

        /* Faculty Card Styles */
        .faculty-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 30px rgba(46, 125, 50, 0.25);
        }

        @media (max-width: 1024px) {
          .faculty-cards-container {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        @media (max-width: 768px) {
          .about-college {
            flex-direction: column;
            align-items: center;
          }

          .about-college .right {
            text-align: center;
          }

          .vertical-tabs {
            flex-direction: row;
            gap: 1rem;
            justify-content: center;
            flex-wrap: wrap;
          }

          .tab-item {
            font-size: 0.95rem;
          }

          .faculty-cards-container {
            grid-template-columns: 1fr !important;
            padding: 1rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default DepartmentDetailPage;