-- ===================================================================
-- SIET Profile Management System - Complete Database Setup
-- Database: siet_profile (MySQL)
-- Generated from JPA Entity Models
-- ===================================================================

-- ===================================================================
-- DATABASE CREATION
-- ===================================================================
CREATE DATABASE IF NOT EXISTS siet_profile;
USE siet_profile;

-- ===================================================================
-- TABLE: students (Primary entity - Student.java)
-- ===================================================================
CREATE TABLE IF NOT EXISTS students (
    register_number VARCHAR(50) PRIMARY KEY,

    -- Authentication
    password VARCHAR(255),
    reset_token VARCHAR(255),
    reset_token_expiry DATETIME,
    last_login DATETIME,

    -- Personal Details
    name VARCHAR(255),
    dob DATE,
    department VARCHAR(255),
    blood_group VARCHAR(10),
    address TEXT,
    academic_year VARCHAR(20),
    year_of_passing VARCHAR(10),
    photo_path VARCHAR(500),

    -- SSLC Details
    sslc_board VARCHAR(100),
    sslc_institution VARCHAR(255),
    sslc_year VARCHAR(10),
    sslc_percentage VARCHAR(10),

    -- HSC Details
    hsc_board VARCHAR(100),
    hsc_institution VARCHAR(255),
    hsc_year VARCHAR(10),
    hsc_percentage VARCHAR(10),

    -- UG Details
    ug_department VARCHAR(255),
    ug_institution VARCHAR(255),
    ug_year VARCHAR(10),
    ug_cgpa VARCHAR(10),

    -- SGPA & CGPA
    sgpa_data TEXT,
    overall_cgpa VARCHAR(10),

    -- Skills
    skills TEXT,

    -- Social Links
    linkedin VARCHAR(500),
    github_profile VARCHAR(500),
    leetcode_profile VARCHAR(500),

    -- Files
    resume_path VARCHAR(500),
    four_page_resume_path VARCHAR(500),

    -- Training
    training_batch VARCHAR(50),

    -- Activities
    extracurricular_activities TEXT,
    cocurricular_activities TEXT,

    -- Contact
    email VARCHAR(255),
    phone VARCHAR(255),

    -- Placement Portal
    placement_portal_label VARCHAR(100),
    placement_portal_url VARCHAR(500),

    -- Metadata
    approved_at DATETIME,
    created_at DATETIME,
    updated_at DATETIME
);

-- ===================================================================
-- TABLE: users (User.java - Admin, HOD, Student login accounts)
-- ===================================================================
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    identifier VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    phone VARCHAR(20),
    is_active BOOLEAN DEFAULT TRUE,
    reset_token VARCHAR(255),
    reset_token_expiry DATETIME,
    last_login DATETIME,
    created_at DATETIME,
    updated_at DATETIME,
    student_register_number VARCHAR(50),
    FOREIGN KEY (student_register_number) REFERENCES students(register_number)
);

-- ===================================================================
-- TABLE: departments (Department.java)
-- ===================================================================
CREATE TABLE IF NOT EXISTS departments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    image_path VARCHAR(500),
    hod_name VARCHAR(255),
    hod_designation VARCHAR(255),
    hod_photo_path VARCHAR(500),
    hod_description TEXT,
    hod_academic_background TEXT,
    hod_experience TEXT,
    hod_summary TEXT,
    hod_joining_year INT,
    created_at DATETIME,
    updated_at DATETIME
);

-- ===================================================================
-- TABLE: faculty (Faculty.java)
-- ===================================================================
CREATE TABLE IF NOT EXISTS faculty (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    department_code VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL,
    joining_year INT,
    photo_path VARCHAR(500),
    display_order INT,
    created_at DATETIME,
    FOREIGN KEY (department_code) REFERENCES departments(code)
);

-- ===================================================================
-- TABLE: certifications (Certification.java)
-- ===================================================================
CREATE TABLE IF NOT EXISTS certifications (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_reg_no VARCHAR(50) NOT NULL,
    certification_name VARCHAR(255),
    domain VARCHAR(255),
    date VARCHAR(255),
    file_path VARCHAR(500),
    FOREIGN KEY (student_reg_no) REFERENCES students(register_number)
);

-- ===================================================================
-- TABLE: projects (Project.java)
-- ===================================================================
CREATE TABLE IF NOT EXISTS projects (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_reg_no VARCHAR(50) NOT NULL,
    title VARCHAR(255),
    domain VARCHAR(255),
    languages TEXT,
    `abstract` TEXT,
    demo_video_path VARCHAR(500),
    report_pdf_path VARCHAR(500),
    FOREIGN KEY (student_reg_no) REFERENCES students(register_number)
);

-- ===================================================================
-- TABLE: publications (Publication.java)
-- ===================================================================
CREATE TABLE IF NOT EXISTS publications (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_reg_no VARCHAR(50) NOT NULL,
    title VARCHAR(255),
    journal VARCHAR(255),
    authors TEXT,
    `abstract` TEXT,
    date VARCHAR(255),
    paper_pdf_path VARCHAR(500),
    certificate_pdf_path VARCHAR(500),
    FOREIGN KEY (student_reg_no) REFERENCES students(register_number)
);

-- ===================================================================
-- TABLE: patents (Patent.java)
-- ===================================================================
CREATE TABLE IF NOT EXISTS patents (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_reg_no VARCHAR(50) NOT NULL,
    title VARCHAR(255),
    patent_number VARCHAR(100),
    filing_date VARCHAR(50),
    `abstract` TEXT,
    inventors TEXT,
    domain VARCHAR(255),
    publication_date VARCHAR(50),
    certificate_url VARCHAR(500),
    patent_link VARCHAR(500),
    FOREIGN KEY (student_reg_no) REFERENCES students(register_number)
);

-- ===================================================================
-- TABLE: recruiters (Recruiter.java)
-- ===================================================================
CREATE TABLE IF NOT EXISTS recruiters (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    company_name VARCHAR(255) NOT NULL,
    logo_path VARCHAR(500),
    industry VARCHAR(100),
    year INT,
    avg_package VARCHAR(50),
    created_at DATETIME
);

-- ===================================================================
-- TABLE: placement_drives (PlacementDrive.java)
-- ===================================================================
CREATE TABLE IF NOT EXISTS placement_drives (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    company_name VARCHAR(255) NOT NULL,
    drive_date DATE NOT NULL,
    image_path VARCHAR(500),
    `package` VARCHAR(100),
    reporting_time VARCHAR(50),
    venue VARCHAR(255),
    created_at DATETIME
);

-- ===================================================================
-- TABLE: placement_officers (PlacementOfficer.java)
-- ===================================================================
CREATE TABLE IF NOT EXISTS placement_officers (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    designation VARCHAR(255) NOT NULL,
    photo_path VARCHAR(500),
    type VARCHAR(20),
    display_order INT,
    training_batch VARCHAR(50),
    created_at DATETIME
);

-- ===================================================================
-- TABLE: placement_records (PlacementRecord.java)
-- ===================================================================
CREATE TABLE IF NOT EXISTS placement_records (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_reg_no VARCHAR(50) NOT NULL,
    company_name VARCHAR(255) NOT NULL,
    job_role VARCHAR(255),
    package_lpa DECIMAL(10,2),
    batch VARCHAR(50),
    placement_date DATE,
    created_at DATETIME,
    updated_at DATETIME
);

-- ===================================================================
-- TABLE: update_requests (UpdateRequest.java)
-- ===================================================================
CREATE TABLE IF NOT EXISTS update_requests (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_reg_no VARCHAR(255) NOT NULL,
    student_name VARCHAR(255),
    submitted_data TEXT,
    submitted_on DATETIME,
    status VARCHAR(20) DEFAULT 'pending',
    reviewed_by VARCHAR(255),
    reviewed_on DATETIME,
    review_comments TEXT
);


-- ===================================================================
-- ===================================================================
-- DATA INSERTION - Students
-- (From query_results.txt - 30 students across 7 departments)
-- NOTE: Passwords are set by InitializePasswordsService on app startup
-- ===================================================================
-- ===================================================================

-- ==================== CSE DEPARTMENT (104) ====================
INSERT INTO students (register_number, name, email, department, training_batch, created_at, updated_at) VALUES
('714023104003', 'Surya Prakash R', 'suryaprakashr@srishakthi.ac.in', 'COMPUTER SCIENCE AND ENGINEERING', NULL, NOW(), NOW()),
('714023104004', 'Kavitha S', 'kavithas@srishakthi.ac.in', 'COMPUTER SCIENCE AND ENGINEERING', NULL, NOW(), NOW()),
('714023104005', 'Gopal Krishnan R', 'gopalkrishnanr@srishakthi.ac.in', 'COMPUTER SCIENCE AND ENGINEERING', NULL, NOW(), NOW()),
('714023104020', 'Dhinakaran C', 'dhinakaranc@srishakthi.ac.in', 'COMPUTER SCIENCE AND ENGINEERING', 'AI/ML Specialization - Batch 2024', NOW(), NOW()),
('714023104035', 'Harini M', 'harinim@srishakthi.ac.in', 'COMPUTER SCIENCE AND ENGINEERING', 'MERN Stack Development - Batch 2024', NOW(), NOW())
ON DUPLICATE KEY UPDATE name=VALUES(name), email=VALUES(email);

-- ==================== ECE DEPARTMENT (105) ====================
INSERT INTO students (register_number, name, email, department, created_at, updated_at) VALUES
('714023105001', 'Karthik Raja M', 'karthikrajam@srishakthi.ac.in', 'ELECTRONICS AND COMMUNICATION ENGINEERING', NOW(), NOW()),
('714023105002', 'Swetha V', 'swethav@srishakthi.ac.in', 'ELECTRONICS AND COMMUNICATION ENGINEERING', NOW(), NOW()),
('714023105003', 'Rajesh T', 'rajesht@srishakthi.ac.in', 'ELECTRONICS AND COMMUNICATION ENGINEERING', NOW(), NOW()),
('714023105004', 'Divya R', 'divyar@srishakthi.ac.in', 'ELECTRONICS AND COMMUNICATION ENGINEERING', NOW(), NOW()),
('714023105005', 'Vignesh K', 'vigneshk@srishakthi.ac.in', 'ELECTRONICS AND COMMUNICATION ENGINEERING', NOW(), NOW())
ON DUPLICATE KEY UPDATE name=VALUES(name), email=VALUES(email);

-- ==================== EEE DEPARTMENT (106) ====================
INSERT INTO students (register_number, name, email, department, created_at, updated_at) VALUES
('714023106001', 'Arun Kumar S', 'arunkumars@srishakthi.ac.in', 'ELECTRICAL AND ELECTRONICS ENGINEERING', NOW(), NOW()),
('714023106002', 'Priya Dharshini R', 'priyadharshinir@srishakthi.ac.in', 'ELECTRICAL AND ELECTRONICS ENGINEERING', NOW(), NOW()),
('714023106003', 'Manoj Kumar V', 'manojkumarv@srishakthi.ac.in', 'ELECTRICAL AND ELECTRONICS ENGINEERING', NOW(), NOW()),
('714023106004', 'Sangeetha P', 'sangeethap@srishakthi.ac.in', 'ELECTRICAL AND ELECTRONICS ENGINEERING', NOW(), NOW()),
('714023106005', 'Karthik R', 'karthikr@srishakthi.ac.in', 'ELECTRICAL AND ELECTRONICS ENGINEERING', NOW(), NOW())
ON DUPLICATE KEY UPDATE name=VALUES(name), email=VALUES(email);

-- ==================== MECH DEPARTMENT (112) ====================
INSERT INTO students (register_number, name, email, department, created_at, updated_at) VALUES
('714023112001', 'Divya Lakshmi N', 'divyalakshmin@srishakthi.ac.in', 'MECHANICAL ENGINEERING', NOW(), NOW()),
('714023112002', 'Suresh Babu G', 'sureshbabug@srishakthi.ac.in', 'MECHANICAL ENGINEERING', NOW(), NOW()),
('714023112003', 'Anitha K', 'anithak@srishakthi.ac.in', 'MECHANICAL ENGINEERING', NOW(), NOW()),
('714023112004', 'Bharath Kumar S', 'bharathkumars@srishakthi.ac.in', 'MECHANICAL ENGINEERING', NOW(), NOW()),
('714023112005', 'Ramya S', 'ramyas@srishakthi.ac.in', 'MECHANICAL ENGINEERING', NOW(), NOW())
ON DUPLICATE KEY UPDATE name=VALUES(name), email=VALUES(email);

-- ==================== CIVIL DEPARTMENT (114) ====================
INSERT INTO students (register_number, name, email, department, created_at, updated_at) VALUES
('714023114001', 'Vijay Anand K', 'vijayanandk@srishakthi.ac.in', 'CIVIL ENGINEERING', NOW(), NOW()),
('714023114002', 'Nithya Sri P', 'nithyasrip@srishakthi.ac.in', 'CIVIL ENGINEERING', NOW(), NOW()),
('714023114003', 'Ashwin S', 'ashwins@srishakthi.ac.in', 'CIVIL ENGINEERING', NOW(), NOW()),
('714023114004', 'Preethi M', 'preethim@srishakthi.ac.in', 'CIVIL ENGINEERING', NOW(), NOW()),
('714023114005', 'Mohan Raj G', 'mohanrajg@srishakthi.ac.in', 'CIVIL ENGINEERING', NOW(), NOW())
ON DUPLICATE KEY UPDATE name=VALUES(name), email=VALUES(email);

-- ==================== IT DEPARTMENT (116) ====================
INSERT INTO students (register_number, name, email, department, created_at, updated_at) VALUES
('714023116001', 'Ravi Chandran T', 'ravichandrant@srishakthi.ac.in', 'INFORMATION TECHNOLOGY', NOW(), NOW()),
('714023116002', 'Lakshmi Priya S', 'lakshmipriyas@srishakthi.ac.in', 'INFORMATION TECHNOLOGY', NOW(), NOW()),
('714023116003', 'Saravanan M', 'saravanam@srishakthi.ac.in', 'INFORMATION TECHNOLOGY', NOW(), NOW()),
('714023116004', 'Deepika V', 'deepikav@srishakthi.ac.in', 'INFORMATION TECHNOLOGY', NOW(), NOW()),
('714023116005', 'Prakash R', 'prakashr@srishakthi.ac.in', 'INFORMATION TECHNOLOGY', NOW(), NOW())
ON DUPLICATE KEY UPDATE name=VALUES(name), email=VALUES(email);

-- ==================== AIDS DEPARTMENT (120) ====================
INSERT INTO students (register_number, name, email, department, created_at, updated_at) VALUES
('714023120001', 'Meera Krishnan A', 'meerakrishnana@srishakthi.ac.in', 'ARTIFICIAL INTELLIGENCE AND DATA SCIENCE', NOW(), NOW()),
('714023120002', 'Sathish Kumar R', 'sathishkumarr@srishakthi.ac.in', 'ARTIFICIAL INTELLIGENCE AND DATA SCIENCE', NOW(), NOW()),
('714023120003', 'Janani V', 'jananiv@srishakthi.ac.in', 'ARTIFICIAL INTELLIGENCE AND DATA SCIENCE', NOW(), NOW()),
('714023120004', 'Naveen Kumar D', 'naveenkumard@srishakthi.ac.in', 'ARTIFICIAL INTELLIGENCE AND DATA SCIENCE', NOW(), NOW()),
('714023120005', 'Pooja R', 'poojar@srishakthi.ac.in', 'ARTIFICIAL INTELLIGENCE AND DATA SCIENCE', NOW(), NOW())
ON DUPLICATE KEY UPDATE name=VALUES(name), email=VALUES(email);


-- ===================================================================
-- DATA INSERTION - Admin & HOD Users
-- NOTE: Passwords are BCrypt hashed by InitializePasswordsService
-- Default admin password: admin123, Student password: register_number
-- ===================================================================

-- Admin User
INSERT INTO users (identifier, email, password, name, role, is_active, created_at, updated_at) VALUES
('admin@siet.ac.in', 'admin@siet.ac.in', 'TEMP_PASSWORD', 'System Admin', 'ADMIN', TRUE, NOW(), NOW())
ON DUPLICATE KEY UPDATE name=VALUES(name);

-- HOD Users (7 departments)
INSERT INTO users (identifier, email, password, name, role, is_active, created_at, updated_at) VALUES
('hod.cse@siet.ac.in', 'hod.cse@siet.ac.in', 'TEMP_PASSWORD', 'Dr. Ramesh Kumar', 'HOD', TRUE, NOW(), NOW()),
('hod.ece@siet.ac.in', 'hod.ece@siet.ac.in', 'TEMP_PASSWORD', 'Dr. Lakshmi Priya', 'HOD', TRUE, NOW(), NOW()),
('hod.eee@siet.ac.in', 'hod.eee@siet.ac.in', 'TEMP_PASSWORD', 'Dr. Senthil Murugan', 'HOD', TRUE, NOW(), NOW()),
('hod.mech@siet.ac.in', 'hod.mech@siet.ac.in', 'TEMP_PASSWORD', 'Dr. Anand Babu', 'HOD', TRUE, NOW(), NOW()),
('hod.civil@siet.ac.in', 'hod.civil@siet.ac.in', 'TEMP_PASSWORD', 'Dr. Kavitha Devi', 'HOD', TRUE, NOW(), NOW()),
('hod.it@siet.ac.in', 'hod.it@siet.ac.in', 'TEMP_PASSWORD', 'Dr. Vijay Shankar', 'HOD', TRUE, NOW(), NOW()),
('hod.aids@siet.ac.in', 'hod.aids@siet.ac.in', 'TEMP_PASSWORD', 'Dr. Deepa Lakshmi', 'HOD', TRUE, NOW(), NOW())
ON DUPLICATE KEY UPDATE name=VALUES(name);

-- NOTE: Student user records are auto-created by InitializePasswordsService
-- on application startup. No need to insert them manually here.


-- ===================================================================
-- DIAGNOSTIC QUERIES (Original queries preserved)
-- ===================================================================

-- Verify specific students
SELECT '===== DHINAKARAN C (714023104020) =====';
SELECT register_number, name, email, department, training_batch FROM students WHERE register_number='714023104020';

SELECT '===== HARINI M (714023104035) =====';
SELECT register_number, name, email, department, training_batch FROM students WHERE register_number='714023104035';

-- Verify admin user
SELECT '===== ADMIN USER =====';
SELECT id, identifier, email, name, role FROM users WHERE role='ADMIN';

-- List all students
SELECT '===== ALL STUDENT EMAILS =====';
SELECT register_number, name, email FROM students ORDER BY register_number;

-- List all users
SELECT '===== ALL USER RECORDS =====';
SELECT id, identifier, email, name, role FROM users ORDER BY role, identifier;

-- Table record counts
SELECT '===== TABLE RECORD COUNTS =====';
SELECT 'students' AS table_name, COUNT(*) AS record_count FROM students
UNION ALL SELECT 'users', COUNT(*) FROM users
UNION ALL SELECT 'departments', COUNT(*) FROM departments
UNION ALL SELECT 'faculty', COUNT(*) FROM faculty
UNION ALL SELECT 'certifications', COUNT(*) FROM certifications
UNION ALL SELECT 'projects', COUNT(*) FROM projects
UNION ALL SELECT 'publications', COUNT(*) FROM publications
UNION ALL SELECT 'patents', COUNT(*) FROM patents
UNION ALL SELECT 'recruiters', COUNT(*) FROM recruiters
UNION ALL SELECT 'placement_drives', COUNT(*) FROM placement_drives
UNION ALL SELECT 'placement_officers', COUNT(*) FROM placement_officers
UNION ALL SELECT 'placement_records', COUNT(*) FROM placement_records
UNION ALL SELECT 'update_requests', COUNT(*) FROM update_requests;
