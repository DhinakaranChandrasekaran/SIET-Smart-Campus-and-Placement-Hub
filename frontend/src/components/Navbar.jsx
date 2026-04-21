import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated, logoutUser, getCurrentUser, isAdmin, isStudent } from "../data/authCredentials";

const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const navigate = useNavigate();
  const loggedIn = isAuthenticated();
  const currentUser = getCurrentUser();
  const adminUser = isAdmin();
  const studentUser = isStudent();

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const handleMouseLeave = () => {
    setOpenDropdown(null);
  };

  const handleLogout = () => {
    logoutUser();
    navigate('/sign-in');
    window.location.reload();
  };

  const handleNavigation = (path) => {
    navigate(path);
    setOpenDropdown(null);
  };

  return (
    <>
      <nav className="navbar" onMouseLeave={handleMouseLeave}>
        <ul className="navList">
          {/* Home */}
          <li className="navItem">
            <a href="/" className="link">Home</a>
          </li>

          {/* About Us Dropdown */}
          <li className="navItem" onMouseEnter={() => toggleDropdown("about")}>
            <button type="button" className="link dropdown-toggle">
              About Us {openDropdown === "about" ? <span>&#9650;</span> : <span>&#9660;</span>}
            </button>
            {openDropdown === "about" && (
              <ul className="dropdown">
                <li className="dropdownItem"><a href="/ChairmanDetails">Chairman</a></li>
                <li className="dropdownItem"><a href="/PrincipalDetails">Principal</a></li>
              </ul>
            )}
          </li>

          {/* Departments Dropdown */}
          <li className="navItem" onMouseEnter={() => toggleDropdown("departments")}>
            <button type="button" className="link dropdown-toggle">
              Departments {openDropdown === "departments" ? <span>&#9650;</span> : <span>&#9660;</span>}
            </button>
            {openDropdown === "departments" && (
              <ul className="dropdown deptDropdown">
                <li className="dropdownItem"><a href="/department/agri">Agricultural Engineering</a></li>
                <li className="dropdownItem"><a href="/department/ai-ds">Artificial Intelligence and Data Science</a></li>
                <li className="dropdownItem"><a href="/department/ai-ml">Artificial Intelligence and Machine Learning</a></li>
                <li className="dropdownItem"><a href="/department/biomed">Biomedical Engineering</a></li>
                <li className="dropdownItem"><a href="/department/biotech">Biotechnology</a></li>
                <li className="dropdownItem"><a href="/department/civil">Civil Engineering</a></li>
                <li className="dropdownItem"><a href="/department/cse">Computer Science and Engineering</a></li>
                <li className="dropdownItem"><a href="/department/cse-cyber">Computer Science and Engineering (Cyber Security)</a></li>
                <li className="dropdownItem"><a href="/department/eee">Electrical and Electronics Engineering</a></li>
                <li className="dropdownItem"><a href="/department/ece">Electronics and Communication Engineering</a></li>
                <li className="dropdownItem"><a href="/department/foodtech">Food Technology</a></li>
                <li className="dropdownItem"><a href="/department/it">Information Technology</a></li>
                <li className="dropdownItem"><a href="/department/mech">Mechanical Engineering</a></li>
                <li className="dropdownItem"><a href="/department/vlsi">Electronics Engineering (VLSI Design and Technology)</a></li>
              </ul>
            )}
          </li>

          {/* Placement Dropdown */}
          <li className="navItem" onMouseEnter={() => toggleDropdown("placement")}>
            <button type="button" className="link dropdown-toggle">
              Placement {openDropdown === "placement" ? <span>&#9650;</span> : <span>&#9660;</span>}
            </button>
            {openDropdown === "placement" && (
              <ul className="dropdown">
                <li className="dropdownItem"><a href="/placement">Placement Overview</a></li>
                <li className="dropdownItem"><a href="/placement-batch-selection">Placement Records</a></li>
                <li className="dropdownItem"><a href="/placement#statistics">Placement Statistics</a></li>
                <li className="dropdownItem"><a href="/placement#recruiters">Our Recruiters</a></li>
              </ul>
            )}
          </li>

          {/* Student Profile Dropdown */}
          <li className="navItem" onMouseEnter={() => toggleDropdown("student")}>
            <button type="button" className="link dropdown-toggle">
              Student Profile {openDropdown === "student" ? <span>&#9650;</span> : <span>&#9660;</span>}
            </button>
            {openDropdown === "student" && (
              <ul className="dropdown">
                <li className="dropdownItem"><a href="/student-profile/welcome">View Profile</a></li>
                {/* Update Profile - Only for Students */}
                {studentUser && (
                  <li className="dropdownItem"><a href="/update-profile-form">Update Profile</a></li>
                )}
              </ul>
            )}
          </li>

          {/* Shortlisting Dropdown - Admin Only */}
          {adminUser && (
            <li className="navItem" onMouseEnter={() => toggleDropdown("shortlisting")}>
              <button type="button" className="link dropdown-toggle">
                Shortlisting {openDropdown === "shortlisting" ? <span>&#9650;</span> : <span>&#9660;</span>}
              </button>
              {openDropdown === "shortlisting" && (
                <ul className="dropdown">
                  <li className="dropdownItem">
                    <button type="button" onClick={() => handleNavigation('/admin/shortlisting/batches')}>
                      Filter Students
                    </button>
                  </li>
                </ul>
              )}
            </li>
          )}

          {/* User account - only shown when logged in */}
          {loggedIn && (
            <li className="navItem userItem" onMouseEnter={() => toggleDropdown("user")}>
              <button type="button" className="link dropdown-toggle">
                👤 {currentUser?.name ? currentUser.name.split(' ')[0] : 'Account'} {openDropdown === "user" ? <span>&#9650;</span> : <span>&#9660;</span>}
              </button>
              {openDropdown === "user" && (
                <ul className="dropdown userDropdown">
                  <li className="dropdownItem">
                    <button type="button" onClick={() => handleNavigation('/dashboard')}>
                      Dashboard
                    </button>
                  </li>
                  <li className="dropdownItem logoutItem">
                    <button type="button" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </li>
          )}
        </ul>
      </nav>

      <style>{`
        .navbar {
          background-color: #f0f8f0;
          border-bottom: 1px solid #ddd;
          padding: 0 20px;
          font-family: Arial, sans-serif;
        }

        .navList {
          list-style: none;
          display: flex;
          margin: 0;
          padding: 0;
          flex-wrap: wrap;
        }

        .navItem {
          position: relative;
          padding: 20px 25px;
          cursor: pointer;
          display: flex;
          align-items: center;
        }

        .userItem {
          margin-left: auto;
        }

        .link {
          text-decoration: none;
          color: #333;
          font-weight: 600;
          text-transform: uppercase;
          font-size: 14px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          font-family: Arial, sans-serif;
        }

        .dropdown-toggle {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .dropdown {
          position: absolute;
          top: 60px;
          left: 0;
          background-color: #fff;
          border: 1px solid #ddd;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          list-style: none;
          margin: 0;
          padding: 10px 0;
          min-width: 220px;
          z-index: 1000;
        }

        .deptDropdown {
          min-width: 350px;
        }

        .userDropdown {
          right: 0;
          left: auto;
          min-width: 150px;
        }

        .dropdownItem {
          padding: 10px 20px;
        }

        .dropdownItem a,
        .dropdownItem button {
          text-decoration: none;
          color: #333;
          display: block;
          font-size: 14px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          width: 100%;
          text-align: left;
          font-family: Arial, sans-serif;
          white-space: nowrap;
        }

        .dropdownItem:hover {
          background-color: #f0f8f0;
        }

        .dropdownItem a:hover,
        .dropdownItem button:hover {
          color: #0A8F47;
        }

        .logoutItem button {
          color: #dc3545;
        }

        .logoutItem:hover {
          background-color: #ffe6e6;
        }

        .logoutItem button:hover {
          color: #c82333;
        }

        /* Responsive styles */
        @media (max-width: 768px) {
          .navList {
            flex-direction: column;
          }

          .navItem {
            width: 100%;
            justify-content: space-between;
            padding: 15px 10px;
          }

          .userItem {
            margin-left: 0;
            border-top: 2px solid #0A8F47;
          }

          .dropdown {
            position: static;
            box-shadow: none;
            border: none;
            padding: 0;
          }

          .deptDropdown {
            min-width: auto;
          }

          .userDropdown {
            right: auto;
            left: 0;
          }

          .dropdownItem {
            padding: 10px 20px;
            background: #f9f9f9;
            border-top: 1px solid #ddd;
          }

          .dropdownItem a,
          .dropdownItem button {
            white-space: normal;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;
