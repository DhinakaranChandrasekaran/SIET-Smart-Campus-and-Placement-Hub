package com.college.placement.dto.response;

/**
 * Dashboard Statistics DTO
 * Contains summary data for admin dashboard
 */
public class DashboardDTO {

    private long totalStudents;
    private long totalDepartments;
    private long pendingUpdateRequests;
    private long approvedUpdateRequests;
    private long rejectedUpdateRequests;
    private long totalPlacementRecords;
    private String placementRate;
    private String highestPackage;
    private String averagePackage;
    private long totalCompanies;

    // Constructors
    public DashboardDTO() {
    }

    // Getters and Setters
    public long getTotalStudents() {
        return totalStudents;
    }

    public void setTotalStudents(long totalStudents) {
        this.totalStudents = totalStudents;
    }

    public long getTotalDepartments() {
        return totalDepartments;
    }

    public void setTotalDepartments(long totalDepartments) {
        this.totalDepartments = totalDepartments;
    }

    public long getPendingUpdateRequests() {
        return pendingUpdateRequests;
    }

    public void setPendingUpdateRequests(long pendingUpdateRequests) {
        this.pendingUpdateRequests = pendingUpdateRequests;
    }

    public long getApprovedUpdateRequests() {
        return approvedUpdateRequests;
    }

    public void setApprovedUpdateRequests(long approvedUpdateRequests) {
        this.approvedUpdateRequests = approvedUpdateRequests;
    }

    public long getRejectedUpdateRequests() {
        return rejectedUpdateRequests;
    }

    public void setRejectedUpdateRequests(long rejectedUpdateRequests) {
        this.rejectedUpdateRequests = rejectedUpdateRequests;
    }

    public long getTotalPlacementRecords() {
        return totalPlacementRecords;
    }

    public void setTotalPlacementRecords(long totalPlacementRecords) {
        this.totalPlacementRecords = totalPlacementRecords;
    }

    public String getPlacementRate() {
        return placementRate;
    }

    public void setPlacementRate(String placementRate) {
        this.placementRate = placementRate;
    }

    public String getHighestPackage() {
        return highestPackage;
    }

    public void setHighestPackage(String highestPackage) {
        this.highestPackage = highestPackage;
    }

    public String getAveragePackage() {
        return averagePackage;
    }

    public void setAveragePackage(String averagePackage) {
        this.averagePackage = averagePackage;
    }

    public long getTotalCompanies() {
        return totalCompanies;
    }

    public void setTotalCompanies(long totalCompanies) {
        this.totalCompanies = totalCompanies;
    }
}
