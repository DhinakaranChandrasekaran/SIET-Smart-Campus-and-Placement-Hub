import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children, showBanner = true }) => {
    return (
        <div className="layout">
            {/* College Banner */}
            {showBanner && (
                <div style={{ width: "100%", overflow: "hidden" }}>
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
            )}

            {/* Navbar */}
            <Navbar />

            {/* Page Content */}
            <main className="main-content">
                {children}
            </main>

            {/* Footer */}
            <Footer />

            <style>{`
        .layout {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .main-content {
          flex: 1;
        }
      `}</style>
        </div>
    );
};

export default Layout;
