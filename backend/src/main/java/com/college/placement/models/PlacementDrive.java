package com.college.placement.models;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * PlacementDrive Entity
 * Stores placement drive information (today's drive, upcoming drives)
 * NO LOMBOK - Explicit getters and setters
 */
@Entity
@Table(name = "placement_drives")
public class PlacementDrive {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "company_name", nullable = false)
    private String companyName;

    @Column(name = "drive_date", nullable = false)
    private LocalDate driveDate;

    @Column(name = "image_path", length = 500)
    private String imagePath;

    @Column(name = "package", length = 100)
    private String packageOffered;

    @Column(name = "reporting_time", length = 50)
    private String reportingTime;

    @Column(length = 255)
    private String venue;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    // Constructors
    public PlacementDrive() {
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

    public LocalDate getDriveDate() {
        return driveDate;
    }

    public void setDriveDate(LocalDate driveDate) {
        this.driveDate = driveDate;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public String getPackageOffered() {
        return packageOffered;
    }

    public void setPackageOffered(String packageOffered) {
        this.packageOffered = packageOffered;
    }

    public String getReportingTime() {
        return reportingTime;
    }

    public void setReportingTime(String reportingTime) {
        this.reportingTime = reportingTime;
    }

    public String getVenue() {
        return venue;
    }

    public void setVenue(String venue) {
        this.venue = venue;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
