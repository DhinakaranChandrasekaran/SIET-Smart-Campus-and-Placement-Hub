import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { validateStudent, validateAdmin, isAuthenticated } from '../data/authCredentials';

const SignInPage = () => {
  const [regNo, setRegNo] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // If already logged in, redirect to home
    if (isAuthenticated()) {
      navigate('/');
      return;
    }

    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Check if it's admin login (email format with @siet.ac.in)
      if (regNo.includes('@') && regNo.endsWith('@siet.ac.in')) {
        // Admin login
        const adminResult = await validateAdmin(regNo, password);
        if (adminResult) {
          navigate('/');
          return;
        } else {
          setError('Invalid admin credentials.');
          return;
        }
      }

      // Student login using regNo
      const studentData = await validateStudent(regNo, password);
      if (studentData) {
        // Also store in loggedStudent for backwards compatibility
        sessionStorage.setItem('loggedStudent', JSON.stringify(studentData));

        navigate('/');
      } else {
        setError('Invalid registration number or password.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Login failed. Please try again.');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        height: '100vh',
        fontFamily: 'Segoe UI, sans-serif',
      }}
    >
      {/* Left carousel */}
      <div
        style={{
          flex: 1,
          height: isMobile ? '250px' : '100vh',
          backgroundColor: '#f0f0f0',
        }}
      >
        <Carousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          showArrows={false}
          interval={2000}
          transitionTime={1000}
          swipeable
          emulateTouch
        >
          <div>
            <img
              src="/images/student-profile/loginslide-1.jpg"
              alt="Slide 1"
              style={{
                width: '100%',
                height: isMobile ? '250px' : '100vh',
                objectFit: 'cover',
              }}
            />
          </div>
          <div>
            <img
              src="/images/student-profile/loginslide-2.jpg"
              alt="Slide 2"
              style={{
                width: '100%',
                height: isMobile ? '250px' : '100vh',
                objectFit: 'cover',
              }}
            />
          </div>
        </Carousel>
      </div>

      {/* Right login form */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f0f8f0',
          padding: isMobile ? '30px 20px' : '40px',
        }}
      >
        <div
          style={{
            backgroundColor: '#fff',
            padding: '40px 35px',
            borderRadius: '16px',
            boxShadow: '0 10px 30px rgba(0, 128, 0, 0.12)',
            maxWidth: '400px',
            width: '100%',
          }}
        >
          {/* Logo */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '24px',
            }}
          >
            <div
              style={{
                width: '140px',
                height: '140px',
                borderRadius: '50%',
                backgroundColor: '#fff',
                border: 'none',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
              }}
            >
              <img
                src="/images/student-profile/siet-logo.jpg"
                alt="College Logo"
                style={{ width: '85%', height: 'auto', objectFit: 'contain' }}
              />
            </div>
          </div>

          {/* Title */}
          <h2
            style={{
              fontSize: '1.6rem',
              fontWeight: 'bold',
              color: '#0A8F47',
              marginBottom: '24px',
              textAlign: 'center',
              margin: '0 0 24px 0',
            }}
          >
            Login
          </h2>

          <form onSubmit={handleLogin}>
            {error && (
              <div
                style={{
                  color: '#dc3545',
                  fontSize: '14px',
                  marginBottom: '16px',
                  textAlign: 'center',
                  padding: '10px',
                  backgroundColor: '#ffe6e6',
                  borderRadius: '6px',
                }}
              >
                {error}
              </div>
            )}

            {/* Username input */}
            <div style={{ marginBottom: '20px' }}>
              <input
                type="text"
                id="regNo"
                value={regNo}
                onChange={(e) => setRegNo(e.target.value)}
                required
                placeholder="Username"
                style={{
                  width: '100%',
                  padding: '14px',
                  fontSize: '15px',
                  borderRadius: '8px',
                  border: '1px solid #0A8F47',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.3s ease',
                  outline: 'none',
                }}
                onFocus={(e) => e.target.style.borderColor = '#0A8F47'}
                onBlur={(e) => e.target.style.borderColor = '#0A8F47'}
              />
            </div>

            {/* Password input */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Password"
                  style={{
                    width: '100%',
                    padding: '14px 60px 14px 14px',
                    fontSize: '15px',
                    borderRadius: '8px',
                    border: '1px solid #0A8F47',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.3s ease',
                    outline: 'none',
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#0A8F47'}
                  onBlur={(e) => e.target.style.borderColor = '#0A8F47'}
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    fontSize: '13px',
                    color: '#0A8F47',
                    cursor: 'pointer',
                    fontWeight: '500',
                  }}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </span>
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '14px',
                backgroundColor: '#0A8F47',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease, transform 0.2s ease',
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#077a3c';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = '#0A8F47';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              Login
            </button>

            {/* Forgot Password Link */}
            <div style={{ textAlign: 'center', marginTop: '16px' }}>
              <a
                href="/forgot-password"
                style={{
                  color: '#0A8F47',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: '500',
                  transition: 'color 0.3s ease'
                }}
                onMouseOver={(e) => e.target.style.color = '#077a3c'}
                onMouseOut={(e) => e.target.style.color = '#0A8F47'}
              >
                Forgot Password?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;