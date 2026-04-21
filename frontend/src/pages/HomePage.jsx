import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Carousel from '../components/Carousel';
import AboutCollege from '../components/AboutCollege';
import ChairmanPrincipal from '../components/ChairmanPrincipal';
import Department from '../components/Department';
import Footer from '../components/Footer';
import PlacementSection from '../components/PlacementSection';
import StudentProfilePage from '../components/StudentProfilePage';
import AdminShortlistingSection from '../components/AdminShortlistingSection';
import { isAuthenticated, isAdmin } from '../data/authCredentials';

const HomePage = () => {
  const navigate = useNavigate();
  const [showRedirectNotice, setShowRedirectNotice] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const adminUser = isAdmin(); // Check if user is admin

  useEffect(() => {
    // Check if user is logged in
    if (isAuthenticated()) {
      // User is logged in, no redirect needed
      return;
    }

    // User is not logged in, start 10-second countdown
    setShowRedirectNotice(true);

    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          navigate('/sign-in');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [navigate]);

  return (
    <div>
      {/* Redirect Notice Banner */}
      {showRedirectNotice && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            backgroundColor: '#0A8F47',
            color: '#fff',
            padding: '12px 20px',
            textAlign: 'center',
            zIndex: 9999,
            fontSize: '14px',
            fontFamily: 'Segoe UI, sans-serif',
            boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
          }}
        >
          Please login to access all features. Redirecting to login in <strong>{countdown}</strong> seconds...
          <button
            onClick={() => navigate('/sign-in')}
            style={{
              marginLeft: '15px',
              padding: '6px 16px',
              backgroundColor: 'transparent',
              color: '#fff',
              border: '1px solid #fff',
              borderRadius: '4px',
              fontWeight: '600',
              cursor: 'pointer',
              fontSize: '13px',
            }}
          >
            Login Now
          </button>
        </div>
      )}

      {/* College Banner */}
      <div style={{ width: "100%", overflow: "hidden", marginTop: showRedirectNotice ? '50px' : '0' }}>
        <img
          src="/images/college-banner.jpg"
          alt="College Banner"
          style={{
            width: "100%",
            height: "auto",
            display: "block"
          }}
        />
      </div>

      <Navbar />
      <Carousel />
      <AboutCollege />
      <ChairmanPrincipal />
      <Department />
      <PlacementSection />
      <StudentProfilePage />
      {/* Admin Shortlisting Section - Only for Admin Users */}
      {adminUser && <AdminShortlistingSection />}
      <Footer />
    </div>
  );
};

export default HomePage;
