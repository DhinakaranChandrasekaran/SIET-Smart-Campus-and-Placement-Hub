package com.college.placement.dto.request;

/**
 * Request DTO for filtering students
 */
public class StudentFilterRequest {
    private String batch; // Academic year filter
    private String trainingBatch; // Training batch filter (Java, Python, etc.)
    private String regNo; // Register number search
    private String name; // Name search
    private Double minCgpa; // Minimum CGPA
    private Integer minProjects; // Minimum projects count
    private String projectDomain; // Project domain filter
    private String technologies; // Technologies filter (comma-separated)

    // Getters and Setters
    public String getBatch() {
        return batch;
    }

    public void setBatch(String batch) {
        this.batch = batch;
    }

    public String getTrainingBatch() {
        return trainingBatch;
    }

    public void setTrainingBatch(String trainingBatch) {
        this.trainingBatch = trainingBatch;
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

    public Double getMinCgpa() {
        return minCgpa;
    }

    public void setMinCgpa(Double minCgpa) {
        this.minCgpa = minCgpa;
    }

    public Integer getMinProjects() {
        return minProjects;
    }

    public void setMinProjects(Integer minProjects) {
        this.minProjects = minProjects;
    }

    public String getProjectDomain() {
        return projectDomain;
    }

    public void setProjectDomain(String projectDomain) {
        this.projectDomain = projectDomain;
    }

    public String getTechnologies() {
        return technologies;
    }

    public void setTechnologies(String technologies) {
        this.technologies = technologies;
    }
}
