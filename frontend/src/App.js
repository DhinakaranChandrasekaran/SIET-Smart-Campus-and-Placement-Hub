import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layout Component
import Layout from './components/Layout';

// Main Pages
import HomePage from './pages/HomePage';
import ChairmanDetails from './pages/ChairmanDetails';
import PrincipalDetails from './pages/PrincipalDetails';
import DepartmentList from './pages/DepartmentList';
import DepartmentDetails from './pages/DepartmentDetails';

// Authentication
import SignInPage from './pages/SignInPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import DashboardPage from './pages/DashboardPage';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';

// Student Profile Flow
import WelcomePage from './pages/WelcomePage';
import BatchSelectionPage from './pages/BatchSelectionPage';
import DepartmentSelectionPage from './pages/DepartmentSelectionPage';
import StudentListPage from './pages/StudentListPage';
import StudentProfileDetail from './pages/StudentProfileDetail';

// Update Profile Form
import UpdateForm from './pages/UpdateForm';

// Project, Publication & Patent Detail View
import ProjectDetailPage from './pages/ProjectDetailPage';
import PublicationDetailPage from './pages/PublicationDetailPage';
import PatentDetailPage from './pages/PatentDetailPage';

// Placement Pages
import PlacementBatchSelection from './pages/PlacementBatchSelection';
import PlacementPage from './pages/PlacementPage';
import PlacementStatistics from './pages/PlacementStatistics';
import PlacementProfiles from './pages/PlacementProfiles';
import PlacementOfficersPage from './pages/PlacementOfficersPage';

// Admin Shortlisting Pages
import AdminBatchSelection from './pages/AdminBatchSelection';
import AdminHiringTrackSelection from './pages/AdminHiringTrackSelection';
import AdminFilterPage from './pages/AdminFilterPage';
import AdminResultsPage from './pages/AdminResultsPage';


// Admin Panel Pages
import AdminProtectedRoute from './components/AdminProtectedRoute';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUpdateRequests from './pages/admin/AdminUpdateRequests';
import AdminUpdateRequestDetail from './pages/admin/AdminUpdateRequestDetail';
import AdminStudentManagement from './pages/admin/AdminStudentManagement';
import AdminPlacementManagement from './pages/admin/AdminPlacementManagement';
import AdminDepartmentManagement from './pages/admin/AdminDepartmentManagement';
import AdminDataManagement from './pages/admin/AdminDataManagement';
import AdminAnalytics from './pages/admin/AdminAnalytics';

import './App.css';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>

        {/* ---------- Home Page (has its own layout) ---------- */}
        <Route path="/" element={<HomePage />} />

        {/* ---------- Authentication (no header/footer) ---------- */}
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

        {/* ---------- Main Pages with Layout ---------- */}
        <Route path="/ChairmanDetails" element={
          <Layout>
            <ChairmanDetails />
          </Layout>
        } />
        <Route path="/PrincipalDetails" element={
          <Layout>
            <PrincipalDetails />
          </Layout>
        } />
        <Route path="/departments" element={
          <Layout>
            <DepartmentList />
          </Layout>
        } />
        <Route path="/department/:id" element={
          <Layout>
            <DepartmentDetails />
          </Layout>
        } />

        {/* ---------- Dashboard (Protected) ---------- */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Layout>
              <DashboardPage />
            </Layout>
          </ProtectedRoute>
        } />

        {/* ---------- Student Profile Flow (Protected) ---------- */}
        <Route path="/student-profile/welcome" element={
          <ProtectedRoute>
            <Layout>
              <WelcomePage />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/select-batch" element={
          <ProtectedRoute>
            <Layout>
              <BatchSelectionPage />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/select-department" element={
          <ProtectedRoute>
            <Layout>
              <DepartmentSelectionPage />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/student-list" element={
          <ProtectedRoute>
            <Layout>
              <StudentListPage />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/student-profile/:regNo" element={
          <ProtectedRoute>
            <Layout>
              <StudentProfileDetail />
            </Layout>
          </ProtectedRoute>
        } />

        {/* ---------- Update Profile Flow (Protected) ---------- */}
        <Route path="/update-profile-form" element={
          <ProtectedRoute>
            <Layout>
              <UpdateForm />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/student/update/:regNo" element={
          <ProtectedRoute>
            <Layout>
              <UpdateForm />
            </Layout>
          </ProtectedRoute>
        } />

        {/* ---------- Detail Pages (Protected) ---------- */}
        <Route path="/projects/:title" element={
          <ProtectedRoute>
            <Layout>
              <ProjectDetailPage />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/publications/:title" element={
          <ProtectedRoute>
            <Layout>
              <PublicationDetailPage />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/patents/:title" element={
          <ProtectedRoute>
            <Layout>
              <PatentDetailPage />
            </Layout>
          </ProtectedRoute>
        } />

        {/* ---------- Placement Pages (Protected) ---------- */}
        <Route path="/placement" element={
          <ProtectedRoute>
            <Layout>
              <PlacementPage />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/placement-batch-selection" element={
          <ProtectedRoute>
            <Layout>
              <PlacementBatchSelection />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/placement-statistics" element={
          <ProtectedRoute>
            <Layout>
              <PlacementStatistics />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/placement-profiles/:batch" element={
          <ProtectedRoute>
            <Layout>
              <PlacementProfiles />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/placement-officers" element={
          <ProtectedRoute>
            <Layout>
              <PlacementOfficersPage />
            </Layout>
          </ProtectedRoute>
        } />

        {/* ---------- Student Profile View (shared, Protected) ---------- */}
        <Route path="/student/profile/:regNo" element={
          <ProtectedRoute>
            <Layout>
              <StudentProfileDetail />
            </Layout>
          </ProtectedRoute>
        } />

        {/* ---------- Admin Shortlisting Pages ---------- */}
        <Route path="/admin/shortlisting/batches" element={
          <ProtectedRoute>
            <Layout>
              <AdminBatchSelection />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/admin/shortlisting/:batch/hiring-track" element={
          <ProtectedRoute>
            <Layout>
              <AdminHiringTrackSelection />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/admin/shortlisting/:batch/:track/filters" element={
          <ProtectedRoute>
            <Layout>
              <AdminFilterPage />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/admin/shortlisting/:batch/:track/results" element={
          <ProtectedRoute>
            <Layout>
              <AdminResultsPage />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/admin/student/:regNo" element={
          <ProtectedRoute>
            <Layout>
              <StudentProfileDetail />
            </Layout>
          </ProtectedRoute>
        } />

        {/* ---------- Admin Panel Pages (Admin Only) ---------- */}
        <Route path="/admin/dashboard" element={
          <AdminProtectedRoute>
            <AdminDashboard />
          </AdminProtectedRoute>
        } />
        <Route path="/admin/update-requests" element={
          <AdminProtectedRoute>
            <AdminUpdateRequests />
          </AdminProtectedRoute>
        } />
        <Route path="/admin/update-requests/:id" element={
          <AdminProtectedRoute>
            <AdminUpdateRequestDetail />
          </AdminProtectedRoute>
        } />
        <Route path="/admin/students" element={
          <AdminProtectedRoute>
            <AdminStudentManagement />
          </AdminProtectedRoute>
        } />
        <Route path="/admin/placements" element={
          <AdminProtectedRoute>
            <AdminPlacementManagement />
          </AdminProtectedRoute>
        } />
        <Route path="/admin/departments" element={
          <AdminProtectedRoute>
            <AdminDepartmentManagement />
          </AdminProtectedRoute>
        } />
        <Route path="/admin/data-management" element={
          <AdminProtectedRoute>
            <AdminDataManagement />
          </AdminProtectedRoute>
        } />
        <Route path="/admin/analytics" element={
          <AdminProtectedRoute>
            <AdminAnalytics />
          </AdminProtectedRoute>
        } />

      </Routes>
    </Router>
  );
}

export default App;

