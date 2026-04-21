package com.college.placement.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.time.LocalDateTime;

/**
 * Faculty Entity
 * Stores faculty/staff members by department
 * NO LOMBOK - Explicit getters and setters
 */
@Entity
@Table(name = "faculty")
public class Faculty {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "department_code", referencedColumnName = "code", nullable = false)
    @JsonIgnore
    private Department department;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String position; // "Professor", "Assistant Professor"

    @Column(name = "joining_year")
    private Integer joiningYear;

    @Column(name = "photo_path", length = 500)
    private String photoPath;

    @Column(name = "display_order")
    private Integer displayOrder;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    // Constructors
    public Faculty() {
        this.createdAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Department getDepartment() {
        return department;
    }

    public void setDepartment(Department department) {
        this.department = department;
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

    public Integer getJoiningYear() {
        return joiningYear;
    }

    public void setJoiningYear(Integer joiningYear) {
        this.joiningYear = joiningYear;
    }

    public String getPhotoPath() {
        return photoPath;
    }

    public void setPhotoPath(String photoPath) {
        this.photoPath = photoPath;
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
}
