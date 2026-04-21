package com.college.placement.dto.response;

/**
 * PlacementStats DTO
 * Matches frontend placementStats structure
 */
public class PlacementStatsDTO {

    private Integer totalOffersMade;
    private Integer totalCompaniesVisited;
    private String highestPackage;
    private String averagePackage;
    private String placementRate;

    public PlacementStatsDTO() {
    }

    public Integer getTotalOffersMade() {
        return totalOffersMade;
    }

    public void setTotalOffersMade(Integer totalOffersMade) {
        this.totalOffersMade = totalOffersMade;
    }

    public Integer getTotalCompaniesVisited() {
        return totalCompaniesVisited;
    }

    public void setTotalCompaniesVisited(Integer totalCompaniesVisited) {
        this.totalCompaniesVisited = totalCompaniesVisited;
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

    public String getPlacementRate() {
        return placementRate;
    }

    public void setPlacementRate(String placementRate) {
        this.placementRate = placementRate;
    }
}
