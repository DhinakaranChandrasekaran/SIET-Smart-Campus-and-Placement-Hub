package com.college.placement.dto.response;

/**
 * Recruiter DTO
 * Matches frontend companyRecruiters structure
 */
public class RecruiterDTO {

    private String name;
    private String logo;
    private String industry;
    private String avgPackage;
    private String visitingSince;

    public RecruiterDTO() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLogo() {
        return logo;
    }

    public void setLogo(String logo) {
        this.logo = logo;
    }

    public String getIndustry() {
        return industry;
    }

    public void setIndustry(String industry) {
        this.industry = industry;
    }

    public String getAvgPackage() {
        return avgPackage;
    }

    public void setAvgPackage(String avgPackage) {
        this.avgPackage = avgPackage;
    }

    public String getVisitingSince() {
        return visitingSince;
    }

    public void setVisitingSince(String visitingSince) {
        this.visitingSince = visitingSince;
    }
}
