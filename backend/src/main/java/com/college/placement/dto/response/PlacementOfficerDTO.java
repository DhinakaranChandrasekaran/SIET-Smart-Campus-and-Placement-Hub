package com.college.placement.dto.response;

/**
 * PlacementOfficer DTO
 * Matches frontend placementOfficers structure
 */
public class PlacementOfficerDTO {

    private Long id;
    private String name;
    private String position;
    private String photo;
    private String trainingBatch;

    public PlacementOfficerDTO() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public String getTrainingBatch() {
        return trainingBatch;
    }

    public void setTrainingBatch(String trainingBatch) {
        this.trainingBatch = trainingBatch;
    }
}
