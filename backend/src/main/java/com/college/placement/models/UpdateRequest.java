package com.college.placement.models;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "update_requests")
public class UpdateRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "student_reg_no", nullable = false)
    private String studentRegNo;

    @Column(name = "student_name")
    private String studentName;

    @Column(name = "submitted_data", columnDefinition = "TEXT")
    private String submittedData; // JSON string of all submitted data

    @Column(name = "submitted_on")
    private LocalDateTime submittedOn;

    @Column(name = "status", length = 20)
    private String status; // pending, approved, rejected

    @Column(name = "reviewed_by")
    private String reviewedBy;

    @Column(name = "reviewed_on")
    private LocalDateTime reviewedOn;

    @Column(name = "review_comments", columnDefinition = "TEXT")
    private String reviewComments;

    // Constructors
    public UpdateRequest() {
        this.submittedOn = LocalDateTime.now();
        this.status = "pending";
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStudentRegNo() {
        return studentRegNo;
    }

    public void setStudentRegNo(String studentRegNo) {
        this.studentRegNo = studentRegNo;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public String getSubmittedData() {
        return submittedData;
    }

    public void setSubmittedData(String submittedData) {
        this.submittedData = submittedData;
    }

    public LocalDateTime getSubmittedOn() {
        return submittedOn;
    }

    public void setSubmittedOn(LocalDateTime submittedOn) {
        this.submittedOn = submittedOn;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getReviewedBy() {
        return reviewedBy;
    }

    public void setReviewedBy(String reviewedBy) {
        this.reviewedBy = reviewedBy;
    }

    public LocalDateTime getReviewedOn() {
        return reviewedOn;
    }

    public void setReviewedOn(LocalDateTime reviewedOn) {
        this.reviewedOn = reviewedOn;
    }

    public String getReviewComments() {
        return reviewComments;
    }

    public void setReviewComments(String reviewComments) {
        this.reviewComments = reviewComments;
    }
}
