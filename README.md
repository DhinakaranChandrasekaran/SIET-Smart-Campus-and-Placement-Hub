# 🎓 SIET Profile Management System

> **College Placement & Student Profile Management System for Sri Shakthi Institute of Engineering and Technology**
>
> A full-stack web application that manages student profiles, department information, faculty details, placement records, and admin shortlisting — featuring unified authentication, role-based access control, AWS S3 file storage, and a comprehensive admin panel with analytics.

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Tech Stack](#️-tech-stack)
- [System Architecture](#️-system-architecture)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Installation & Setup](#-installation--setup)
- [Running the Application](#️-running-the-application)
- [User Roles & Access](#-user-roles--access)
- [Frontend Pages](#️-frontend-pages)
- [Backend API Endpoints](#-backend-api-endpoints)
- [Database Schema](#️-database-schema)
- [Authentication System](#-authentication-system)
- [File Storage (AWS S3)](#-file-storage-aws-s3)
- [Email Integration](#-email-integration)
- [Configuration Guide](#-configuration-guide)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🔍 Overview

SIET Profile Management System is a **comprehensive student profile and placement management platform** built for Sri Shakthi Institute of Engineering and Technology. The system digitizes the entire student data lifecycle:

1. **Manages student profiles** — Academic records, SGPA/CGPA, skills, certifications, projects, publications, and patents
2. **Handles department data** — Department details, HOD information, faculty listings with photos
3. **Tracks placement activities** — Placement drives, placement officers, recruitment records, and statistics
4. **Provides admin shortlisting** — Filter students by batch, hiring track, CGPA, skills, and department with one-click shortlisting
5. **Supports profile updates** — Students submit update requests that admins can review, approve, or reject
6. **Delivers analytics** — Admin dashboard with department-wise statistics, placement trends, and student analytics
7. **Enables secure file uploads** — Photos, resumes, certificates, and project files stored on AWS S3

---

## ✨ Key Features

### 👤 Student Profile Management
- **Complete Academic Profile** — Personal details, SSLC, HSC, UG records with SGPA/CGPA tracking
- **Skills & Social Links** — Technical skills, LinkedIn, GitHub, and LeetCode profiles
- **Certifications & Projects** — Upload certificates, project reports, and demo videos
- **Publications & Patents** — Track research publications and patent filings
- **Resume Management** — Upload and manage 1-page and 4-page resumes
- **Profile Photo** — Student profile pictures stored on AWS S3

### 🏫 Department & Faculty
- **7 Engineering Departments** — CSE, ECE, EEE, MECH, CIVIL, IT, AI&DS
- **HOD Profiles** — Photo, designation, academic background, experience, and summary
- **Faculty Listings** — Staff members with photos, positions, and joining year
- **Chairman & Principal** — Dedicated pages for institutional leadership

### 📊 Placement Module
- **Placement Drives** — Today's drives, upcoming companies, reporting time, venue
- **Placement Records** — Student-wise placement history with company, role, and package
- **Placement Officers** — Heads and trainers with batch assignments
- **Placement Statistics** — Batch-wise placement percentages and package analytics
- **Recruiter Database** — Company logos, industry categories, and average packages

### 🔐 Unified Authentication
- **Dual Login System** — Students login with register number, admins with email
- **JWT Token Authentication** — Secure stateless authentication
- **BCrypt Password Encryption** — Industry-standard password hashing
- **Password Reset** — Email-based password reset with secure tokens
- **Role-Based Access Control** — STUDENT, ADMIN, HOD roles with different permissions

### 🛠️ Admin Panel
- **Dashboard** — Overview statistics with quick-access cards
- **Student Management** — View, search, and manage all student records
- **Update Request Review** — Approve or reject student profile update submissions
- **Placement Management** — Manage placement drives, officers, and records
- **Department Management** — Add/edit departments, faculty, and HOD details
- **Data Management** — Bulk operations and data import/export
- **Analytics** — Visual charts and department-wise performance metrics

### 🎯 Admin Shortlisting
- **Batch Selection** — Filter by academic batch (e.g., 2022–2026)
- **Hiring Track Selection** — Product-Based, Service-Based, or Core Engineering
- **Advanced Filters** — CGPA cutoff, skills, department, certifications
- **Results View** — Shortlisted students with profile details and export options

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| React | 19.1.0 | UI Component Library |
| React Router DOM | 7.6.3 | Client-Side Routing |
| React Scripts (CRA) | 5.0.1 | Build Tooling & Dev Server |
| Axios | 1.13.2 | HTTP Client for API Calls |
| Framer Motion | 12.23.0 | Animations & Transitions |
| React Icons | 5.5.0 | Icon Library (Feather Icons) |
| React Responsive Carousel | 3.2.23 | Image Carousels |
| React Scroll | 1.9.3 | Smooth Scroll Navigation |
| CSS3 | — | Custom Styling (Vanilla CSS) |

### Backend
| Technology | Version | Purpose |
|---|---|---|
| Java | 17 | Programming Language |
| Spring Boot | 3.2.1 | Application Framework |
| Spring Data JPA | — | Database ORM (Hibernate) |
| Spring Security | — | Authentication & Authorization |
| Spring Mail | — | Email Sending (SMTP) |
| Spring Validation | — | Input Validation |
| MySQL | 8.0+ | Relational Database |
| JWT (jjwt) | 0.12.3 | JSON Web Token Authentication |
| AWS SDK S3 | 2.25.16 | Cloud File Storage |
| Maven | 3.8+ | Build & Dependency Management |

### Infrastructure
| Technology | Purpose |
|---|---|
| MySQL 8.0+ | Primary Database |
| AWS S3 | File Storage (Photos, Resumes, Certificates) |
| Gmail SMTP | Password Reset Emails |

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        FRONTEND (React)                         │
│                     http://localhost:3000                        │
│                                                                 │
│  ┌──────────┐  ┌──────────────┐  ┌───────────────────────────┐  │
│  │ Home     │  │  Sign In     │  │  Student Portal           │  │
│  │ Page     │  │  (Unified    │  │  - Dashboard              │  │
│  │ Chairman │  │   Login)     │  │  - Profile View           │  │
│  │ Principal│  │              │  │  - Update Profile         │  │
│  │ Dept List│  │              │  │  - Placement Data         │  │
│  │          │  │              │  │  - Projects/Patents       │  │
│  └──────────┘  └──────────────┘  └───────────────────────────┘  │
│                                  ┌───────────────────────────┐  │
│                                  │  Admin Panel              │  │
│                                  │  - Dashboard & Analytics  │  │
│                                  │  - Student Management     │  │
│                                  │  - Update Request Review  │  │
│                                  │  - Placement Management   │  │
│                                  │  - Department Management  │  │
│                                  │  - Shortlisting Engine    │  │
│                                  │  - Data Management        │  │
│                                  └───────────────────────────┘  │
└───────────────────────────┬─────────────────────────────────────┘
                            │ HTTP (REST API)
                            │ Port 3000 → Port 8080
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                     BACKEND (Spring Boot)                       │
│                     http://localhost:8080/api                    │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                   REST Controllers                      │    │
│  │  Auth │ Student │ Admin │ Department │ Placement │ File │    │
│  └───────────────────────────┬─────────────────────────────┘    │
│                              │                                  │
│  ┌───────────────────────────┼─────────────────────────────┐    │
│  │                   Service Layer                         │    │
│  │  AuthService │ StudentService │ AdminService            │    │
│  │  DepartmentService │ PlacementService │ EmailService    │    │
│  └───────────────────────────┬─────────────────────────────┘    │
│                              │                                  │
│  ┌──────────┐ ┌──────────┐ ┌┴─────────┐ ┌────────────────┐     │
│  │   JWT    │ │  BCrypt  │ │  S3 File │ │  Email (SMTP)  │     │
│  │  Token   │ │ Password │ │  Storage │ │  Password      │     │
│  │ Provider │ │ Encoder  │ │  Service │ │  Reset         │     │
│  └──────────┘ └──────────┘ └──────────┘ └────────────────┘     │
│                              │                                  │
│  ┌───────────────────────────┼─────────────────────────────┐    │
│  │              JPA Repositories (Data Layer)              │    │
│  │  StudentRepo │ UserRepo │ DeptRepo │ PlacementRepo     │    │
│  └───────────────────────────┬─────────────────────────────┘    │
└──────────────────────────────┼──────────────────────────────────┘
                               │ JDBC
                               ▼
                    ┌──────────────────────┐
                    │   MySQL Database     │
                    │   siet_profile       │
                    │                      │
                    │  13 Tables:          │
                    │  - students          │
                    │  - users             │
                    │  - departments       │
                    │  - faculty           │
                    │  - certifications    │
                    │  - projects          │
                    │  - publications      │
                    │  - patents           │
                    │  - recruiters        │
                    │  - placement_drives  │
                    │  - placement_officers│
                    │  - placement_records │
                    │  - update_requests   │
                    └──────────────────────┘
                               ▲
         ┌─────────────────────┼──────────────────────┐
         │                     │                      │
┌────────┴─────────┐  ┌───────┴────────┐  ┌──────────┴───────┐
│  AWS S3 Bucket   │  │  Gmail SMTP    │  │   Auto Init      │
│ (File Storage)   │  │  (Email Send)  │  │  - Password Hash │
│ Photos, Resumes  │  │  Password      │  │  - User Creation │
│ Certificates     │  │  Reset Emails  │  │  - Data Seed     │
└──────────────────┘  └────────────────┘  └──────────────────┘
```

---

## 📁 Project Structure

```
SIET PROFILE PROJECT/
│
├── .github/                              # GitHub configuration
├── .gitignore                            # Git ignore rules
├── README.md                             # This file
├── QUICK_START.md                        # Quick start guide
│
├── backend/                              # Spring Boot Backend Application
│   ├── pom.xml                           # Maven dependencies & build config
│   ├── query.sql                         # Complete database setup (DDL + seed data)
│   ├── uploads/                          # Local file uploads directory
│   └── src/main/
│       ├── resources/
│       │   └── application.properties    # All application configuration
│       └── java/com/college/placement/
│           │
│           ├── PlacementApplication.java # Main Spring Boot entry point
│           │
│           ├── controllers/              # REST API Controllers
│           │   ├── AuthController.java          # Login, registration, JWT
│           │   ├── StudentController.java       # Student CRUD operations
│           │   ├── AdminController.java         # Admin panel operations
│           │   ├── DepartmentController.java    # Department & HOD APIs
│           │   ├── FacultyController.java       # Faculty management
│           │   ├── PlacementController.java     # Placement drives & officers
│           │   ├── PlacementRecordController.java # Placement records CRUD
│           │   ├── RecruiterController.java      # Recruiter management
│           │   ├── FileController.java          # File upload/download (S3)
│           │   ├── PasswordResetController.java  # Password reset flow
│           │   └── UpdateRequestController.java  # Profile update requests
│           │
│           ├── models/                   # JPA Entity Models (13 Tables)
│           │   ├── Student.java                 # Students table (Primary)
│           │   ├── User.java                    # Users table (Auth)
│           │   ├── Department.java              # Departments with HOD
│           │   ├── Faculty.java                 # Faculty members
│           │   ├── Certification.java           # Student certifications
│           │   ├── Project.java                 # Student projects
│           │   ├── Publication.java             # Research publications
│           │   ├── Patent.java                  # Patent filings
│           │   ├── Recruiter.java               # Company recruiters
│           │   ├── PlacementDrive.java          # Placement drives
│           │   ├── PlacementOfficer.java        # Placement officers
│           │   ├── PlacementRecord.java         # Placement records
│           │   └── UpdateRequest.java           # Profile update requests
│           │
│           ├── repositories/             # Spring Data JPA Repositories
│           │   ├── StudentRepository.java
│           │   ├── UserRepository.java
│           │   ├── DepartmentRepository.java
│           │   ├── FacultyRepository.java
│           │   ├── CertificationRepository.java
│           │   ├── ProjectRepository.java
│           │   ├── PublicationRepository.java
│           │   ├── PatentRepository.java
│           │   ├── RecruiterRepository.java
│           │   ├── PlacementDriveRepository.java
│           │   ├── PlacementOfficerRepository.java
│           │   ├── PlacementRecordRepository.java
│           │   └── UpdateRequestRepository.java
│           │
│           ├── services/                 # Business Logic Services
│           │   ├── AuthService.java             # Authentication logic
│           │   ├── StudentService.java          # Student operations
│           │   ├── AdminService.java            # Admin operations
│           │   ├── DepartmentService.java       # Department operations
│           │   ├── FacultyService.java          # Faculty operations
│           │   ├── PlacementDriveService.java   # Drive management
│           │   ├── PlacementOfficerService.java # Officer management
│           │   ├── PlacementRecordService.java  # Record management
│           │   ├── PlacementStatsService.java   # Placement statistics
│           │   ├── RecruiterService.java        # Recruiter management
│           │   ├── UpdateRequestService.java    # Update request workflow
│           │   ├── EmailService.java            # Email sending (SMTP)
│           │   ├── PasswordResetService.java    # Password reset logic
│           │   ├── InitializePasswordsService.java # Auto password init
│           │   ├── FileStorageService.java      # File storage interface
│           │   ├── S3FileStorageService.java    # AWS S3 implementation
│           │   └── LocalFileStorageService.java # Local storage fallback
│           │
│           ├── security/                 # Security Configuration
│           │   ├── SecurityConfig.java          # Spring Security config
│           │   ├── JwtTokenProvider.java        # JWT token generation
│           │   ├── JwtAuthenticationFilter.java # JWT request filter
│           │   └── JwtAuthenticationEntryPoint.java # Unauthorized handler
│           │
│           ├── dto/                      # Data Transfer Objects
│           │   ├── request/                     # Request DTOs
│           │   └── response/                    # Response DTOs
│           │
│           └── exception/                # Exception Handling
│               ├── GlobalExceptionHandler.java  # Global error handler
│               ├── ResourceNotFoundException.java
│               ├── UnauthorizedException.java
│               └── ...
│
└── frontend/                             # React Frontend Application
    ├── package.json                      # Node.js dependencies & scripts
    ├── package-lock.json                 # Locked dependency versions
    ├── .env                              # Environment variables
    ├── public/                           # Static assets (index.html, favicon)
    └── src/
        ├── index.js                      # React entry point
        ├── App.js                        # Root component with all routes
        ├── App.css                       # Global styles
        │
        ├── components/                   # Reusable UI Components
        │   ├── Layout.jsx                # Main page layout (Navbar + Footer)
        │   ├── Navbar.jsx                # Top navigation bar
        │   ├── Footer.jsx                # Page footer
        │   ├── Carousel.jsx              # Image carousel
        │   ├── Department.jsx            # Department card component
        │   ├── ChairmanPrincipal.jsx     # Leadership display
        │   ├── PlacementSection.jsx      # Placement overview section
        │   ├── AboutCollege.jsx          # About college section
        │   ├── StudentProfilePage.jsx    # Student profile display
        │   ├── AdminLayout.jsx           # Admin panel layout
        │   ├── AdminSidebar.jsx          # Admin sidebar navigation
        │   ├── AdminShortlistingSection.jsx # Shortlisting component
        │   ├── ProtectedRoute.jsx        # Auth guard for students
        │   ├── AdminProtectedRoute.jsx   # Auth guard for admins
        │   ├── ScrollToTop.jsx           # Auto scroll to top
        │   ├── SIETLoader.jsx            # Loading animation
        │   └── placement/               # Placement sub-components
        │       ├── PlacementOverview.jsx
        │       ├── PlacementRecords.jsx
        │       ├── PlacementOfficersPreview.jsx
        │       ├── TodayDrive.jsx
        │       └── TrainingActivities.jsx
        │
        ├── pages/                        # Page Components
        │   ├── HomePage.jsx              # Landing page with carousel
        │   ├── SignInPage.jsx            # Unified login page
        │   ├── ForgotPasswordPage.jsx    # Password reset request
        │   ├── ResetPasswordPage.jsx     # Password reset form
        │   ├── DashboardPage.jsx         # Student dashboard
        │   ├── WelcomePage.jsx           # Welcome page after login
        │   ├── ChairmanDetails.jsx       # Chairman profile page
        │   ├── PrincipalDetails.jsx      # Principal profile page
        │   ├── DepartmentList.jsx        # All departments list
        │   ├── DepartmentDetails.jsx     # Single department view
        │   ├── DepartmentSelectionPage.jsx # Department filter
        │   ├── BatchSelectionPage.jsx    # Batch filter
        │   ├── StudentListPage.jsx       # Students grid view
        │   ├── StudentProfileDetail.jsx  # Full student profile
        │   ├── UpdateForm.jsx            # Profile update form
        │   ├── ProjectDetailPage.jsx     # Project details view
        │   ├── PublicationDetailPage.jsx # Publication details view
        │   ├── PatentDetailPage.jsx      # Patent details view
        │   ├── PlacementPage.jsx         # Placement main page
        │   ├── PlacementBatchSelection.jsx # Placement batch filter
        │   ├── PlacementStatistics.jsx   # Placement stats view
        │   ├── PlacementProfiles.jsx     # Placed students list
        │   ├── PlacementOfficersPage.jsx # Officers & trainers
        │   ├── AdminBatchSelection.jsx   # Shortlisting: batch select
        │   ├── AdminHiringTrackSelection.jsx # Shortlisting: track
        │   ├── AdminFilterPage.jsx       # Shortlisting: filters
        │   ├── AdminResultsPage.jsx      # Shortlisting: results
        │   └── admin/                    # Admin Panel Pages
        │       ├── AdminDashboard.jsx
        │       ├── AdminStudentManagement.jsx
        │       ├── AdminUpdateRequests.jsx
        │       ├── AdminUpdateRequestDetail.jsx
        │       ├── AdminPlacementManagement.jsx
        │       ├── AdminDepartmentManagement.jsx
        │       ├── AdminDataManagement.jsx
        │       └── AdminAnalytics.jsx
        │
        ├── services/                     # API Service Layer
        │   ├── api.js                    # Axios instance with JWT interceptor
        │   ├── authService.js            # Login, register, token management
        │   ├── studentService.js         # Student CRUD API calls
        │   ├── adminService.js           # Admin panel API calls
        │   ├── departmentService.js      # Department API calls
        │   ├── placementService.js       # Placement API calls
        │   └── fileService.js            # File upload/download API calls
        │
        ├── data/                         # Static Data & Config
        │   ├── authCredentials.js        # Auth configuration
        │   ├── departmentContent.js      # Department static content
        │   └── galleryData.js            # Gallery images data
        │
        └── utils/                        # Utility Modules
            └── imageUtils.js             # Image processing helpers
```

---

## 📋 Prerequisites

Before running this project, ensure you have the following installed:

| Software | Minimum Version | Download Link |
|---|---|---|
| **Java JDK** | 17 or higher | [Oracle JDK](https://www.oracle.com/java/technologies/downloads/) or [OpenJDK](https://adoptium.net/) |
| **Node.js** | 16.x or higher | [Node.js](https://nodejs.org/) |
| **npm** | 8.x or higher | Comes with Node.js |
| **MySQL** | 8.0 or higher | [MySQL](https://dev.mysql.com/downloads/) |
| **Maven** | 3.8 or higher | [Apache Maven](https://maven.apache.org/download.cgi) |
| **Git** | 2.x | [Git](https://git-scm.com/downloads) |

### Verify Installations

```bash
# Check Java
java -version

# Check Node.js and npm
node -v
npm -v

# Check MySQL
mysql --version

# Check Maven
mvn -v

# Check Git
git --version
```

---

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/SIET-PROFILE-PROJECT.git
cd SIET-PROFILE-PROJECT
```

### 2. Database Setup

```bash
# Login to MySQL
mysql -u root -p

# Run the complete database setup
SOURCE backend/query.sql;

# Exit MySQL
EXIT;
```

This creates the `siet_profile` database with all 13 tables and seeds initial data (30 students, 1 admin, 7 HODs).

### 3. Backend Configuration

Edit the database credentials in `backend/src/main/resources/application.properties`:

```properties
# Update with YOUR MySQL credentials
spring.datasource.url=jdbc:mysql://localhost:3306/siet_profile?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true
spring.datasource.username=root
spring.datasource.password=YOUR_MYSQL_PASSWORD
```

#### Email Configuration (for password reset)

```properties
# Gmail SMTP (use App Password, not regular password)
spring.mail.username=your-email@gmail.com
spring.mail.password=your-gmail-app-password
```

> **Note:** For Gmail, you need to generate an [App Password](https://myaccount.google.com/apppasswords). Regular passwords won't work with SMTP.

#### AWS S3 Configuration (for file uploads)

```properties
aws.s3.access-key=YOUR_AWS_ACCESS_KEY
aws.s3.secret-key=YOUR_AWS_SECRET_KEY
aws.s3.bucket-name=YOUR_BUCKET_NAME
aws.s3.region=ap-south-2
```

### 4. Frontend Setup (Install Dependencies)

```bash
cd frontend
npm install
```

This single command installs all 10 required packages:
- `react`, `react-dom` — Core React library
- `react-router-dom` — Page routing
- `react-scripts` — Build tools (Create React App)
- `axios` — HTTP client for API calls
- `framer-motion` — Animations and transitions
- `react-icons` — Icon library
- `react-responsive-carousel` — Image carousels
- `react-scroll` — Smooth scroll navigation
- `web-vitals` — Performance monitoring

### 5. Backend Setup (Maven Dependencies)

```bash
cd backend
mvn clean install -DskipTests
```

This downloads all Java dependencies defined in `pom.xml`:
- Spring Boot Starter Web (REST APIs)
- Spring Data JPA (Database ORM)
- Spring Security (Authentication & Authorization)
- Spring Mail (Email sending)
- Spring Validation (Input validation)
- MySQL Connector/J (Database driver)
- JWT (jjwt) (Token authentication)
- AWS SDK S3 (Cloud file storage)

---

## ▶️ Running the Application

### Start Backend (Terminal 1)

```bash
cd backend
mvn spring-boot:run
```

The backend starts at **http://localhost:8080**.

You should see:
```
✅ Created X student user records
✅ Updated X student passwords
📝 Students login with: REGISTER NUMBER (password = register number)
```

### Start Frontend (Terminal 2)

```bash
cd frontend
npm start
```

The frontend starts at **http://localhost:3000** and automatically opens in your browser.

You should see:
```
Compiled successfully!
Local: http://localhost:3000
```

> **Important:** Both backend (port 8080) and frontend (port 3000) must be running simultaneously.

### Quick Start Commands Summary

| Action | Command | Directory |
|---|---|---|
| Start Backend | `mvn spring-boot:run` | `backend/` |
| Start Frontend | `npm start` | `frontend/` |
| Build Frontend (Production) | `npm run build` | `frontend/` |
| Install Frontend Dependencies | `npm install` | `frontend/` |
| Install Backend Dependencies | `mvn clean install -DskipTests` | `backend/` |

---

## 👥 User Roles & Access

The system supports three user roles with different access levels:

| Role | Login Method | Access Level | Capabilities |
|---|---|---|---|
| **STUDENT** | Register Number | Individual | View/update own profile, browse departments, view placements, submit update requests |
| **ADMIN** | Email | Global (Super Admin) | Full system access — manage all students, departments, placements, approve updates, analytics |
| **HOD** | Email | Department-Scoped | View department students, review department update requests |

### Default Login Credentials

#### Students (password = register number)
| Register Number | Name | Department |
|---|---|---|
| `714023104020` | Dhinakaran C | CSE |
| `714023104035` | Harini M | CSE |
| `714023104003` | Surya Prakash R | CSE |

#### Admin & HODs (password = `admin123`)
| Email | Name | Role |
|---|---|---|
| `admin@siet.ac.in` | System Admin | ADMIN |
| `hod.cse@siet.ac.in` | Dr. Ramesh Kumar | HOD |
| `hod.ece@siet.ac.in` | Dr. Lakshmi Priya | HOD |
| `hod.eee@siet.ac.in` | Dr. Senthil Murugan | HOD |
| `hod.mech@siet.ac.in` | Dr. Anand Babu | HOD |
| `hod.civil@siet.ac.in` | Dr. Kavitha Devi | HOD |
| `hod.it@siet.ac.in` | Dr. Vijay Shankar | HOD |
| `hod.aids@siet.ac.in` | Dr. Deepa Lakshmi | HOD |

### Authentication Flow
1. User enters register number (student) or email (admin/HOD) on the login page
2. Credentials are validated against the database (BCrypt hashed passwords)
3. JWT token is generated and returned to the frontend
4. Token is sent with every API request via `Authorization: Bearer <token>` header
5. Unauthorized requests (401) redirect to the login page

---

## 🖥️ Frontend Pages

### Public Pages (No Login Required)

| Route | Page | Description |
|---|---|---|
| `/` | Home Page | Landing page with carousel, departments, chairman/principal, placement overview |
| `/sign-in` | Sign In Page | Unified login for students and admins |
| `/forgot-password` | Forgot Password | Request password reset email |
| `/reset-password/:token` | Reset Password | Enter new password with reset token |
| `/ChairmanDetails` | Chairman Details | Chairman profile with photo and details |
| `/PrincipalDetails` | Principal Details | Principal profile with photo and details |
| `/departments` | Department List | All 7 departments with HOD info |
| `/department/:id` | Department Details | Single department — HOD, faculty, students |

### Student Portal (Login Required)

| Route | Page | Description |
|---|---|---|
| `/dashboard` | Dashboard | Student's personal dashboard with quick links |
| `/student-profile/welcome` | Welcome Page | Welcome screen after login |
| `/select-batch` | Batch Selection | Filter students by academic batch |
| `/select-department` | Department Selection | Filter students by department |
| `/student-list` | Student List | Grid view of students with search |
| `/student-profile/:regNo` | Student Profile | Full profile — academic, skills, projects, certifications |
| `/update-profile-form` | Update Profile | Submit profile update request |
| `/projects/:title` | Project Detail | Full project details with demo video |
| `/publications/:title` | Publication Detail | Publication details with PDF |
| `/patents/:title` | Patent Detail | Patent details with certificate |

### Placement Pages (Login Required)

| Route | Page | Description |
|---|---|---|
| `/placement` | Placement Home | Overview — today's drive, records, officers |
| `/placement-batch-selection` | Batch Selection | Select batch for placement stats |
| `/placement-statistics` | Statistics | Placement percentages, package analytics |
| `/placement-profiles/:batch` | Placed Profiles | Batch-wise placed students list |
| `/placement-officers` | Officers | Placement heads and trainers |

### Admin Shortlisting (Login Required)

| Route | Page | Description |
|---|---|---|
| `/admin/shortlisting/batches` | Batch Selection | Select batch for shortlisting |
| `/admin/shortlisting/:batch/hiring-track` | Hiring Track | Product/Service/Core selection |
| `/admin/shortlisting/:batch/:track/filters` | Filter Criteria | CGPA, skills, department filters |
| `/admin/shortlisting/:batch/:track/results` | Results | Shortlisted students with details |

### Admin Panel (Admin Only)

| Route | Page | Description |
|---|---|---|
| `/admin/dashboard` | Admin Dashboard | Overview stats and quick actions |
| `/admin/students` | Student Management | View, search, edit all students |
| `/admin/update-requests` | Update Requests | Pending student update submissions |
| `/admin/update-requests/:id` | Request Detail | Review and approve/reject updates |
| `/admin/placements` | Placement Management | Manage drives, officers, records |
| `/admin/departments` | Department Management | Add/edit departments and faculty |
| `/admin/data-management` | Data Management | Bulk operations and data tools |
| `/admin/analytics` | Analytics | Charts and department statistics |

---

## 🔌 Backend API Endpoints

### Authentication APIs

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/login` | Unified login (student/admin/HOD) |
| `POST` | `/api/auth/register` | Register new user |
| `POST` | `/api/password/forgot` | Request password reset email |
| `POST` | `/api/password/reset` | Reset password with token |

### Student APIs

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/students` | Get all students (with filters) |
| `GET` | `/api/students/{regNo}` | Get student by register number |
| `PUT` | `/api/students/{regNo}` | Update student profile |
| `GET` | `/api/students/department/{dept}` | Get students by department |
| `GET` | `/api/students/batch/{batch}` | Get students by training batch |

### Admin APIs

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/admin/dashboard` | Get admin dashboard stats |
| `GET` | `/api/admin/students` | Get all students for management |
| `POST` | `/api/admin/students` | Add new student |
| `DELETE` | `/api/admin/students/{regNo}` | Delete student record |

### Department APIs

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/departments` | Get all departments |
| `GET` | `/api/departments/{code}` | Get department by code |
| `POST` | `/api/departments` | Create department |
| `PUT` | `/api/departments/{code}` | Update department |
| `DELETE` | `/api/departments/{code}` | Delete department |

### Faculty APIs

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/faculty/department/{code}` | Get faculty by department |
| `POST` | `/api/faculty` | Add faculty member |
| `PUT` | `/api/faculty/{id}` | Update faculty |
| `DELETE` | `/api/faculty/{id}` | Delete faculty |

### Placement APIs

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/placement/drives` | Get all placement drives |
| `POST` | `/api/placement/drives` | Create placement drive |
| `GET` | `/api/placement/officers` | Get placement officers |
| `POST` | `/api/placement/officers` | Add placement officer |
| `GET` | `/api/placement/records` | Get placement records |
| `POST` | `/api/placement/records` | Add placement record |

### Recruiter APIs

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/recruiters` | Get all recruiters |
| `POST` | `/api/recruiters` | Add recruiter |
| `PUT` | `/api/recruiters/{id}` | Update recruiter |
| `DELETE` | `/api/recruiters/{id}` | Delete recruiter |

### Update Request APIs

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/update-requests` | Get all update requests |
| `GET` | `/api/update-requests/{id}` | Get request details |
| `POST` | `/api/update-requests` | Submit update request |
| `PUT` | `/api/update-requests/{id}/approve` | Approve request |
| `PUT` | `/api/update-requests/{id}/reject` | Reject request |

### File APIs

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/files/upload` | Upload file to S3 |
| `GET` | `/api/files/{key}` | Download file from S3 |
| `DELETE` | `/api/files/{key}` | Delete file from S3 |

---

## 🗄️ Database Schema

### Core Tables

#### `students` — Student Profiles (Primary Table)
| Column | Type | Description |
|---|---|---|
| register_number | VARCHAR(50) PK | Unique register number |
| name | VARCHAR(255) | Student full name |
| email | VARCHAR(255) | College email (@srishakthi.ac.in) |
| department | VARCHAR(255) | Department name |
| dob | DATE | Date of birth |
| blood_group | VARCHAR(10) | Blood group |
| address | TEXT | Residential address |
| academic_year | VARCHAR(20) | Academic year |
| year_of_passing | VARCHAR(10) | Graduation year |
| photo_path | VARCHAR(500) | S3 path to profile photo |
| sslc_board/institution/year/percentage | — | SSLC academic details |
| hsc_board/institution/year/percentage | — | HSC academic details |
| ug_department/institution/year/cgpa | — | UG academic details |
| sgpa_data | TEXT | JSON array of semester SGPAs |
| overall_cgpa | VARCHAR(10) | Overall CGPA |
| skills | TEXT | Comma-separated skills |
| linkedin/github_profile/leetcode_profile | VARCHAR(500) | Social links |
| resume_path/four_page_resume_path | VARCHAR(500) | Resume S3 paths |
| training_batch | VARCHAR(50) | Training batch assignment |
| password/reset_token/reset_token_expiry | — | Authentication fields |
| created_at/updated_at | DATETIME | Timestamps |

#### `users` — Authentication & User Accounts
| Column | Type | Description |
|---|---|---|
| id | BIGINT PK | Auto-generated ID |
| identifier | VARCHAR(255) UNIQUE | Login ID (register_no or email) |
| email | VARCHAR(255) UNIQUE | Email address |
| password | VARCHAR(255) | BCrypt hashed password |
| name | VARCHAR(255) | Display name |
| role | VARCHAR(50) | STUDENT, ADMIN, or HOD |
| is_active | BOOLEAN | Account active status |
| student_register_number | VARCHAR(50) FK | Link to students table |

#### `departments` — Department Information
| Column | Type | Description |
|---|---|---|
| id | BIGINT PK | Auto-generated ID |
| code | VARCHAR(50) UNIQUE | Department code (e.g., "cse") |
| name | VARCHAR(255) | Full department name |
| hod_name/designation/photo_path | — | HOD profile details |
| hod_description/academic_background/experience | TEXT | HOD detailed info (JSON) |

### Relationship Tables

| Table | Parent | Description |
|---|---|---|
| `faculty` | departments | Faculty members per department |
| `certifications` | students | Student certification records |
| `projects` | students | Student project records |
| `publications` | students | Research publications |
| `patents` | students | Patent filings |

### Placement Tables

| Table | Description |
|---|---|
| `placement_drives` | Scheduled placement drives with company, date, venue |
| `placement_officers` | Placement heads and trainers |
| `placement_records` | Student placement history (company, role, package) |
| `recruiters` | Company recruiter database with logos |

### Operational Tables

| Table | Description |
|---|---|
| `update_requests` | Student profile update submissions (pending/approved/rejected) |

---

## 🔐 Authentication System

### How It Works

```
┌──────────────┐    POST /api/auth/login     ┌──────────────────┐
│   Frontend   │ ──────────────────────────→ │  AuthController  │
│  (SignIn.jsx)│    {identifier, password}   │                  │
└──────────────┘                             └────────┬─────────┘
                                                      │
                                                      ▼
                                             ┌──────────────────┐
                                             │  AuthService     │
                                             │                  │
                                             │  1. Find user by │
                                             │     identifier   │
                                             │  2. BCrypt match │
                                             │     password     │
                                             │  3. Generate JWT │
                                             │     token        │
                                             └────────┬─────────┘
                                                      │
                    JWT Token                         │
│   Frontend   │ ←────────────────────────────────────┘
│  Stores in   │
│  localStorage│
│              │
│  Sends with  │    Authorization: Bearer <token>
│  every API   │ ──────────────────────────────────→  Backend
│  request     │
└──────────────┘
```

### Password Initialization
- On application startup, `InitializePasswordsService` runs automatically
- **Students**: Creates user records with `password = register_number` (BCrypt hashed)
- **Admins/HODs**: Sets default password `admin123` (BCrypt hashed) if not already set
- Passwords should be changed after first login

---

## ☁️ File Storage (AWS S3)

### Supported File Types
| File Type | Max Size | Usage |
|---|---|---|
| Student Photos | 10MB | Profile pictures |
| Resumes (1-page) | 10MB | Quick resume |
| Resumes (4-page) | 10MB | Detailed resume |
| Certificates | 100MB | Certification proofs |
| Project Reports | 100MB | Project documentation |
| Demo Videos | 100MB | Project demonstrations |
| Publication PDFs | 100MB | Research papers |
| Patent Certificates | 100MB | Patent documents |

### Storage Configuration
- **Bucket**: `managementprofilestore`
- **Region**: `ap-south-2` (Hyderabad)
- **Fallback**: Local `uploads/` directory if S3 is unavailable

---

## 📧 Email Integration

### Outbound (Password Reset via SMTP)
- Uses Gmail SMTP (port 587 with TLS)
- Sends password reset links with secure tokens
- Token expires after configured timeout

### Configuration
```properties
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=your-email@gmail.com
spring.mail.password=your-app-password
```

---

## ⚙️ Configuration Guide

All configuration is centralized in `backend/src/main/resources/application.properties`:

### Key Configuration Sections

| Section | Properties | Description |
|---|---|---|
| **Server** | `server.port=8080` | Backend server port |
| **Database** | `spring.datasource.*` | MySQL connection URL, username, password |
| **JPA/Hibernate** | `spring.jpa.*` | DDL auto-update, SQL logging, dialect |
| **JWT** | `jwt.secret`, `jwt.expiration` | Token secret key and expiry (24hrs) |
| **File Upload** | `spring.servlet.multipart.*` | Max file size (100MB), request size (200MB) |
| **AWS S3** | `aws.s3.*` | Access key, secret, bucket, region |
| **Email (SMTP)** | `spring.mail.*` | Gmail SMTP settings for password reset |
| **CORS** | `cors.*` | Allowed origins (localhost:3000, 5173) |
| **Logging** | `logging.*` | Log levels for different packages |

### Frontend Configuration (`.env`)
```env
REACT_APP_API_URL=http://localhost:8080/api
```

---

## 🔧 Troubleshooting

### Common Issues

| Issue | Solution |
|---|---|
| `npm install` fails | Delete `node_modules` and `package-lock.json`, then run `npm install` again |
| Port 8080 already in use | Kill the process: `netstat -ano \| findstr :8080` then `taskkill /F /PID <pid>` |
| Port 3000 already in use | Kill the process or set `PORT=3001 npm start` |
| MySQL connection refused | Ensure MySQL is running and credentials in `application.properties` are correct |
| Browser popup "Sign in" | Fixed in SecurityConfig.java — HTTP Basic Auth is disabled |
| `npm warn deprecated` messages | Safe to ignore — these are sub-dependency warnings, not errors |
| JWT token expired | Re-login to get a new token |
| File upload fails | Check AWS S3 credentials and bucket permissions |
| Password reset email not sent | Ensure Gmail App Password is configured (not regular password) |
| Frontend not connecting to backend | Verify `.env` has correct `REACT_APP_API_URL` and backend is running |

### Verification Checklist
- [ ] MySQL service running
- [ ] Database `siet_profile` created (13 tables)
- [ ] Backend running on http://localhost:8080
- [ ] Frontend running on http://localhost:3000
- [ ] Student login working (register number / register number)
- [ ] Admin login working (admin@siet.ac.in / admin123)
- [ ] Student profile displaying correctly
- [ ] Admin panel accessible
- [ ] File uploads working (S3 or local)

### Log Locations
- **Backend logs:** Console output from `mvn spring-boot:run`
- **Frontend logs:** Browser DevTools Console (F12)
- **Database logs:** MySQL error log

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

### Code Style
- **Frontend:** React functional components with hooks, vanilla CSS, Axios for API calls
- **Backend:** Spring Boot conventions, service-repository pattern, JPA entities (no Lombok)

---

## 📄 License

This project is developed for **Sri Shakthi Institute of Engineering and Technology (SIET)** for educational and institutional use.

---

## 👥 Authors

**SIET College Development Team**

---

<p align="center">
  <b>🎓 SIET Profile Management System — Complete Student & Placement Management 🎓</b><br>
  <i>Digitizing Student Profiles, Streamlining Placements & Empowering Administration</i>
</p>
