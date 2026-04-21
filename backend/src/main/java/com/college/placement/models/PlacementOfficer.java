package com.college.placement.models;

import jakarta.persistence.*;
import java.time.LocalDateTime;

/**
 * PlacementOfficer Entity
 * Stores placement officers (heads and trainers)
 * NO LOMBOK - Explicit getters and setters
 */
@Entity
@Table(name = "placement_officers")
public class PlacementOfficer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(name = "designation", nullable = false)
    private String position; // "Placement Head", "Placement Trainer"

    @Column(name = "photo_path", length = 500)
    private String photoPath;

    @Column(length = 20)
    private String type; // "HEAD" or "TRAINER" - may be null if not set

    @Column(name = "display_order")
    private Integer displayOrder;

    @Column(name = "training_batch", length = 50)
    private String trainingBatch; // e.g., "Batch A", "Batch B", "2022-2026"

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    // Constructors
    public PlacementOfficer() {
        // createdAt will be null if column doesn't exist in database
    }

    // Getters and Setters
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

    public String getPhotoPath() {
        return photoPath;
    }

    public void setPhotoPath(String photoPath) {
        this.photoPath = photoPath;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Integer getDisplayOrder() {
        return displayOrder;
    }

    public void setDisplayOrder(Integer displayOrder) {
        this.displayOrder = displayOrder;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public String getTrainingBatch() {
        return trainingBatch;
    }

    public void setTrainingBatch(String trainingBatch) {
        this.trainingBatch = trainingBatch;
    }
}
