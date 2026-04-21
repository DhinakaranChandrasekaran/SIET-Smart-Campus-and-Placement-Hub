package com.college.placement.models;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * Department Entity
 * Stores department information with HOD details
 * NO LOMBOK - Explicit getters and setters
 */
@Entity
@Table(name = "departments")
public class Department {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false, length = 50)
    private String code; // "cse", "agri"

    @Column(nullable = false)
    private String name;

    @Column(name = "image_path", length = 500)
    private String imagePath;

    // HOD Details
    @Column(name = "hod_name")
    private String hodName;

    @Column(name = "hod_designation")
    private String hodDesignation;

    @Column(name = "hod_photo_path", length = 500)
    private String hodPhotoPath;

    @Column(name = "hod_description", columnDefinition = "TEXT")
    private String hodDescription;

    @Column(name = "hod_academic_background", columnDefinition = "TEXT")
    private String hodAcademicBackground; // JSON array

    @Column(name = "hod_experience", columnDefinition = "TEXT")
    private String hodExperience; // JSON array of experience objects

    @Column(name = "hod_summary", columnDefinition = "TEXT")
    private String hodSummary;

    @Column(name = "hod_joining_year")
    private Integer hodJoiningYear;

    @OneToMany(mappedBy = "department", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Faculty> staff = new ArrayList<>();

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // Constructors
    public Department() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public String getHodName() {
        return hodName;
    }

    public void setHodName(String hodName) {
        this.hodName = hodName;
    }

    public String getHodDesignation() {
        return hodDesignation;
    }

    public void setHodDesignation(String hodDesignation) {
        this.hodDesignation = hodDesignation;
    }

    public String getHodPhotoPath() {
        return hodPhotoPath;
    }

    public void setHodPhotoPath(String hodPhotoPath) {
        this.hodPhotoPath = hodPhotoPath;
    }

    public String getHodDescription() {
        return hodDescription;
    }

    public void setHodDescription(String hodDescription) {
        this.hodDescription = hodDescription;
    }

    public String getHodAcademicBackground() {
        return hodAcademicBackground;
    }

    public void setHodAcademicBackground(String hodAcademicBackground) {
        this.hodAcademicBackground = hodAcademicBackground;
    }

    public String getHodExperience() {
        return hodExperience;
    }

    public void setHodExperience(String hodExperience) {
        this.hodExperience = hodExperience;
    }

    public String getHodSummary() {
        return hodSummary;
    }

    public void setHodSummary(String hodSummary) {
        this.hodSummary = hodSummary;
    }

    public Integer getHodJoiningYear() {
        return hodJoiningYear;
    }

    public void setHodJoiningYear(Integer hodJoiningYear) {
        this.hodJoiningYear = hodJoiningYear;
    }

    public List<Faculty> getStaff() {
        return staff;
    }

    public void setStaff(List<Faculty> staff) {
        this.staff = staff;
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

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
