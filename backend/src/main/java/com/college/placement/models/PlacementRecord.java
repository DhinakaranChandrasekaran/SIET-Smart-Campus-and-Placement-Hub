package com.college.placement.models;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * PlacementRecord Entity
 * Stores actual placement records of students
 * NO LOMBOK - Explicit getters and setters
 */
@Entity
@Table(name = "placement_records")
public class PlacementRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "student_reg_no", length = 50, nullable = false)
    private String studentRegNo;

    @Column(name = "company_name", nullable = false)
    private String company;

    @Column(name = "job_role")
    private String jobRole;

    @Column(name = "package_lpa")
    private BigDecimal packageAmount; // stored as DECIMAL in database

    @Column(length = 50)
    private String batch; // "2022–2026"

    @Column(name = "placement_date")
    private LocalDate placedDate;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // Constructors
    public PlacementRecord() {
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

    public String getStudentRegNo() {
        return studentRegNo;
    }

    public void setStudentRegNo(String studentRegNo) {
        this.studentRegNo = studentRegNo;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getJobRole() {
        return jobRole;
    }

    public void setJobRole(String jobRole) {
        this.jobRole = jobRole;
    }

    public BigDecimal getPackageAmount() {
        return packageAmount;
    }

    public void setPackageAmount(BigDecimal packageAmount) {
        this.packageAmount = packageAmount;
    }

    public String getBatch() {
        return batch;
    }

    public void setBatch(String batch) {
        this.batch = batch;
    }

    public LocalDate getPlacedDate() {
        return placedDate;
    }

    public void setPlacedDate(LocalDate placedDate) {
        this.placedDate = placedDate;
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
