package com.college.placement.dto.response;

/**
 * PlacementRecord DTO
 * Matches frontend placementRecords structure
 * NO LOMBOK - Explicit getters and setters
 */
public class PlacementRecordDTO {

    private Long id;
    private String regNo;
    private String name;
    private String department;
    private String company;
    private String jobRole;
    private String packageAmount; // "4.5 LPA"
    private String batch;

    // Constructors
    public PlacementRecordDTO() {
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRegNo() {
        return regNo;
    }

    public void setRegNo(String regNo) {
        this.regNo = regNo;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
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

    public String getPackageAmount() {
        return packageAmount;
    }

    public void setPackageAmount(String packageAmount) {
        this.packageAmount = packageAmount;
    }

    public String getBatch() {
        return batch;
    }

    public void setBatch(String batch) {
        this.batch = batch;
    }
}
