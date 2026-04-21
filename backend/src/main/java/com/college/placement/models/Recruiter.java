package com.college.placement.models;

import jakarta.persistence.*;
import java.time.LocalDateTime;

/**
 * Recruiter Entity
 * Stores company recruiters information
 * NO LOMBOK - Explicit getters and setters
 */
@Entity
@Table(name = "recruiters")
public class Recruiter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "company_name", nullable = false)
    private String companyName;

    @Column(name = "logo_path", length = 500)
    private String logoPath;

    @Column(length = 100)
    private String industry;

    private Integer year;

    @Column(name = "avg_package", length = 50)
    private String avgPackage;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    // Constructors
    public Recruiter() {
        this.createdAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getLogoPath() {
        return logoPath;
    }

    public void setLogoPath(String logoPath) {
        this.logoPath = logoPath;
    }

    public String getIndustry() {
        return industry;
    }

    public void setIndustry(String industry) {
        this.industry = industry;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public String getAvgPackage() {
        return avgPackage;
    }

    public void setAvgPackage(String avgPackage) {
        this.avgPackage = avgPackage;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
