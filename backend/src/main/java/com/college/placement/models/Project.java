package com.college.placement.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

/**
 * Project Entity
 * NO LOMBOK - Explicit getters and setters
 */
@Entity
@Table(name = "projects")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_reg_no", nullable = false)
    @JsonIgnore
    private Student student;

    private String title;

    private String domain;

    @Column(columnDefinition = "TEXT")
    private String languages; // Comma-separated: "HTML,CSS,Node.js"

    @Column(name = "abstract", columnDefinition = "TEXT")
    private String projectAbstract;

    @Column(name = "demo_video_path", length = 500)
    private String demoVideoPath;

    @Column(name = "report_pdf_path", length = 500)
    private String reportPdfPath;

    // Constructors
    public Project() {
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDomain() {
        return domain;
    }

    public void setDomain(String domain) {
        this.domain = domain;
    }

    public String getLanguages() {
        return languages;
    }

    public void setLanguages(String languages) {
        this.languages = languages;
    }

    public String getProjectAbstract() {
        return projectAbstract;
    }

    public void setProjectAbstract(String projectAbstract) {
        this.projectAbstract = projectAbstract;
    }

    public String getDemoVideoPath() {
        return demoVideoPath;
    }

    public void setDemoVideoPath(String demoVideoPath) {
        this.demoVideoPath = demoVideoPath;
    }

    public String getReportPdfPath() {
        return reportPdfPath;
    }

    public void setReportPdfPath(String reportPdfPath) {
        this.reportPdfPath = reportPdfPath;
    }
}
