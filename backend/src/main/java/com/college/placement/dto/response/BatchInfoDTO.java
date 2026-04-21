package com.college.placement.dto.response;

/**
 * DTO for batch information with computed status
 */
public class BatchInfoDTO {
    private String label;
    private String status; // "Completed", "Ongoing", "Upcoming"

    public BatchInfoDTO() {
    }

    public BatchInfoDTO(String label, String status) {
        this.label = label;
        this.status = status;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
