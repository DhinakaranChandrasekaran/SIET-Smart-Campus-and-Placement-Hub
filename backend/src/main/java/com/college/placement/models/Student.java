package com.college.placement.models;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * Student Entity - Complete profile matching frontend structure
 * NO LOMBOK - Explicit getters and setters
 */
@Entity
@Table(name = "students")
public class Student {

    @Id
    @Column(name = "register_number", length = 50)
    private String registerNumber;

    // ==================== AUTHENTICATION ====================
    @Column(name = "password", length = 255)
    private String password;

    @Column(name = "reset_token", length = 255)
    private String resetToken;

    @Column(name = "reset_token_expiry")
    private LocalDateTime resetTokenExpiry;

    @Column(name = "last_login")
    private LocalDateTime lastLogin;

    // ==================== PERSONAL DETAILS ====================
    private String name;

    @Column(name = "dob")
    private LocalDate dateOfBirth;

    private String department;

    @Column(name = "blood_group", length = 10)
    private String bloodGroup;

    @Column(columnDefinition = "TEXT")
    private String address;

    @Column(name = "academic_year", length = 20)
    private String academicYear;

    @Column(name = "year_of_passing", length = 10)
    private String yearOfPassing;

    @Column(name = "photo_path", length = 500)
    private String photoPath;

    // ==================== ACADEMIC DETAILS - SSLC ====================
    @Column(name = "sslc_board", length = 100)
    private String sslcBoard;

    @Column(name = "sslc_institution")
    private String sslcInstitution;

    @Column(name = "sslc_year", length = 10)
    private String sslcYear;

    @Column(name = "sslc_percentage", length = 10)
    private String sslcPercentage;

    // ==================== ACADEMIC DETAILS - HSC ====================
    @Column(name = "hsc_board", length = 100)
    private String hscBoard;

    @Column(name = "hsc_institution")
    private String hscInstitution;

    @Column(name = "hsc_year", length = 10)
    private String hscYear;

    @Column(name = "hsc_percentage", length = 10)
    private String hscPercentage;

    // ==================== ACADEMIC DETAILS - UG ====================
    @Column(name = "ug_department")
    private String ugDepartment;

    @Column(name = "ug_institution")
    private String ugInstitution;

    @Column(name = "ug_year", length = 10)
    private String ugYear;

    @Column(name = "ug_cgpa", length = 10)
    private String ugCgpa;

    // ==================== SGPA & CGPA ====================
    @Column(name = "sgpa_data", columnDefinition = "TEXT")
    private String sgpaData; // JSON array: "[8.2, 8.3, 8.1, 8.5, 8.4, 8.6, 8.7, 9.0]"

    @Column(name = "overall_cgpa", length = 10)
    private String overallCgpa;

    // ==================== SKILLS ====================
    @Column(columnDefinition = "TEXT")
    private String skills; // Comma-separated: "Java,C++,Python,HTML,CSS,JavaScript"

    // ==================== SOCIAL LINKS ====================
    @Column(length = 500)
    private String linkedin;

    @Column(name = "github_profile", length = 500)
    private String githubProfile;

    @Column(name = "leetcode_profile", length = 500)
    private String leetcodeProfile;

    // ==================== FILES ====================
    @Column(name = "resume_path", length = 500)
    private String resumePath;

    @Column(name = "four_page_resume_path", length = 500)
    private String fourPageResumePath;

    // ==================== TRAINING ====================
    @Column(name = "training_batch", length = 50)
    private String trainingBatch; // "Java", "Python", "Cloud", "MERN Stack", "DevOps"

    // ==================== ACTIVITIES ====================
    @Column(name = "extracurricular_activities", columnDefinition = "TEXT")
    private String extracurricularActivities; // Comma-separated

    @Column(name = "cocurricular_activities", columnDefinition = "TEXT")
    private String coCurricularActivities; // Comma-separated

    // ==================== CONTACT ====================
    private String email;

    private String phone;

    // ==================== PLACEMENT PORTAL ====================
    @Column(name = "placement_portal_label", length = 100)
    private String placementPortalLabel;

    @Column(name = "placement_portal_url", length = 500)
    private String placementPortalUrl;

    // ==================== RELATIONSHIPS ====================
    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Certification> certifications = new ArrayList<>();

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Project> projects = new ArrayList<>();

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Publication> publications = new ArrayList<>();

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Patent> patents = new ArrayList<>();

    // ==================== METADATA ====================
    @Column(name = "approved_at")
    private LocalDateTime approvedAt;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // ==================== CONSTRUCTORS ====================
    public Student() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    // ==================== GETTERS AND SETTERS ====================

    public String getRegisterNumber() {
        return registerNumber;
    }

    public void setRegisterNumber(String registerNumber) {
        this.registerNumber = registerNumber;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getBloodGroup() {
        return bloodGroup;
    }

    public void setBloodGroup(String bloodGroup) {
        this.bloodGroup = bloodGroup;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getAcademicYear() {
        return academicYear;
    }

    public void setAcademicYear(String academicYear) {
        this.academicYear = academicYear;
    }

    public String getYearOfPassing() {
        return yearOfPassing;
    }

    public void setYearOfPassing(String yearOfPassing) {
        this.yearOfPassing = yearOfPassing;
    }

    public String getPhotoPath() {
        return photoPath;
    }

    public void setPhotoPath(String photoPath) {
        this.photoPath = photoPath;
    }

    // SSLC Getters/Setters
    public String getSslcBoard() {
        return sslcBoard;
    }

    public void setSslcBoard(String sslcBoard) {
        this.sslcBoard = sslcBoard;
    }

    public String getSslcInstitution() {
        return sslcInstitution;
    }

    public void setSslcInstitution(String sslcInstitution) {
        this.sslcInstitution = sslcInstitution;
    }

    public String getSslcYear() {
        return sslcYear;
    }

    public void setSslcYear(String sslcYear) {
        this.sslcYear = sslcYear;
    }

    public String getSslcPercentage() {
        return sslcPercentage;
    }

    public void setSslcPercentage(String sslcPercentage) {
        this.sslcPercentage = sslcPercentage;
    }

    // HSC Getters/Setters
    public String getHscBoard() {
        return hscBoard;
    }

    public void setHscBoard(String hscBoard) {
        this.hscBoard = hscBoard;
    }

    public String getHscInstitution() {
        return hscInstitution;
    }

    public void setHscInstitution(String hscInstitution) {
        this.hscInstitution = hscInstitution;
    }

    public String getHscYear() {
        return hscYear;
    }

    public void setHscYear(String hscYear) {
        this.hscYear = hscYear;
    }

    public String getHscPercentage() {
        return hscPercentage;
    }

    public void setHscPercentage(String hscPercentage) {
        this.hscPercentage = hscPercentage;
    }

    // UG Getters/Setters
    public String getUgDepartment() {
        return ugDepartment;
    }

    public void setUgDepartment(String ugDepartment) {
        this.ugDepartment = ugDepartment;
    }

    public String getUgInstitution() {
        return ugInstitution;
    }

    public void setUgInstitution(String ugInstitution) {
        this.ugInstitution = ugInstitution;
    }

    public String getUgYear() {
        return ugYear;
    }

    public void setUgYear(String ugYear) {
        this.ugYear = ugYear;
    }

    public String getUgCgpa() {
        return ugCgpa;
    }

    public void setUgCgpa(String ugCgpa) {
        this.ugCgpa = ugCgpa;
    }

    // SGPA & CGPA Getters/Setters
    public String getSgpaData() {
        return sgpaData;
    }

    public void setSgpaData(String sgpaData) {
        this.sgpaData = sgpaData;
    }

    public String getOverallCgpa() {
        return overallCgpa;
    }

    public void setOverallCgpa(String overallCgpa) {
        this.overallCgpa = overallCgpa;
    }

    // Skills Getter/Setter
    public String getSkills() {
        return skills;
    }

    public void setSkills(String skills) {
        this.skills = skills;
    }

    // Social Links Getters/Setters
    public String getLinkedin() {
        return linkedin;
    }

    public void setLinkedin(String linkedin) {
        this.linkedin = linkedin;
    }

    public String getGithubProfile() {
        return githubProfile;
    }

    public void setGithubProfile(String githubProfile) {
        this.githubProfile = githubProfile;
    }

    public String getLeetcodeProfile() {
        return leetcodeProfile;
    }

    public void setLeetcodeProfile(String leetcodeProfile) {
        this.leetcodeProfile = leetcodeProfile;
    }

    // Files Getters/Setters
    public String getResumePath() {
        return resumePath;
    }

    public void setResumePath(String resumePath) {
        this.resumePath = resumePath;
    }

    public String getFourPageResumePath() {
        return fourPageResumePath;
    }

    public void setFourPageResumePath(String fourPageResumePath) {
        this.fourPageResumePath = fourPageResumePath;
    }

    // Training Getter/Setter
    public String getTrainingBatch() {
        return trainingBatch;
    }

    public void setTrainingBatch(String trainingBatch) {
        this.trainingBatch = trainingBatch;
    }

    // Activities Getters/Setters
    public String getExtracurricularActivities() {
        return extracurricularActivities;
    }

    public void setExtracurricularActivities(String extracurricularActivities) {
        this.extracurricularActivities = extracurricularActivities;
    }

    public String getCoCurricularActivities() {
        return coCurricularActivities;
    }

    public void setCoCurricularActivities(String coCurricularActivities) {
        this.coCurricularActivities = coCurricularActivities;
    }

    // Contact Getters/Setters
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    // Placement Portal Getters/Setters
    public String getPlacementPortalLabel() {
        return placementPortalLabel;
    }

    public void setPlacementPortalLabel(String placementPortalLabel) {
        this.placementPortalLabel = placementPortalLabel;
    }

    public String getPlacementPortalUrl() {
        return placementPortalUrl;
    }

    public void setPlacementPortalUrl(String placementPortalUrl) {
        this.placementPortalUrl = placementPortalUrl;
    }

    // Relationships Getters/Setters
    public List<Certification> getCertifications() {
        return certifications;
    }

    public void setCertifications(List<Certification> certifications) {
        this.certifications = certifications;
    }

    public List<Project> getProjects() {
        return projects;
    }

    public void setProjects(List<Project> projects) {
        this.projects = projects;
    }

    public List<Publication> getPublications() {
        return publications;
    }

    public void setPublications(List<Publication> publications) {
        this.publications = publications;
    }

    public List<Patent> getPatents() {
        return patents;
    }

    public void setPatents(List<Patent> patents) {
        this.patents = patents;
    }

    // Metadata Getters/Setters
    public LocalDateTime getApprovedAt() {
        return approvedAt;
    }

    public void setApprovedAt(LocalDateTime approvedAt) {
        this.approvedAt = approvedAt;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    // Authentication Getters/Setters
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getResetToken() {
        return resetToken;
    }

    public void setResetToken(String resetToken) {
        this.resetToken = resetToken;
    }

    public LocalDateTime getResetTokenExpiry() {
        return resetTokenExpiry;
    }

    public void setResetTokenExpiry(LocalDateTime resetTokenExpiry) {
        this.resetTokenExpiry = resetTokenExpiry;
    }

    public LocalDateTime getLastLogin() {
        return lastLogin;
    }

    public void setLastLogin(LocalDateTime lastLogin) {
        this.lastLogin = lastLogin;
    }

    // ==================== HELPER METHODS ====================

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
