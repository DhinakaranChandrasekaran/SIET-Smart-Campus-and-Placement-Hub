package com.college.placement.dto.response;

/**
 * Login Response DTO
 * NO LOMBOK - Explicit getters and setters
 */
public class LoginResponse {

    private String token;
    private String identifier; // Register Number or Email
    private String name;
    private String role; // "STUDENT" or "ADMIN"
    private String email; // User email address
    private String department; // Only for students
    private String photoPath; // Only for students

    // Additional student fields
    private String registerNumber; // Student register number
    private String academicYear; // Student batch/academic year

    // Constructors
    public LoginResponse() {
    }

    public LoginResponse(String token, String identifier, String name, String role, String department) {
        this.token = token;
        this.identifier = identifier;
        this.name = name;
        this.role = role;
        this.department = department;
    }

    // Getters and Setters
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getIdentifier() {
        return identifier;
    }

    public void setIdentifier(String identifier) {
        this.identifier = identifier;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getPhotoPath() {
        return photoPath;
    }

    public void setPhotoPath(String photoPath) {
        this.photoPath = photoPath;
    }

    public String getRegisterNumber() {
        return registerNumber;
    }

    public void setRegisterNumber(String registerNumber) {
        this.registerNumber = registerNumber;
    }

    public String getAcademicYear() {
        return academicYear;
    }

    public void setAcademicYear(String academicYear) {
        this.academicYear = academicYear;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
