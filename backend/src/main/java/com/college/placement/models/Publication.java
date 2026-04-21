package com.college.placement.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

/**
 * Publication Entity
 * NO LOMBOK - Explicit getters and setters
 */
@Entity
@Table(name = "publications")
public class Publication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_reg_no", nullable = false)
    @JsonIgnore
    private Student student;

    private String title;

    private String journal;

    @Column(columnDefinition = "TEXT")
    private String authors; // Comma-separated: "Dhina,Karan"

    @Column(name = "abstract", columnDefinition = "TEXT")
    private String publicationAbstract;

    private String date;

    @Column(name = "paper_pdf_path", length = 500)
    private String paperPdfPath;

    @Column(name = "certificate_pdf_path", length = 500)
    private String certificatePdfPath;

    // Constructors
    public Publication() {
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

    public String getJournal() {
        return journal;
    }

    public void setJournal(String journal) {
        this.journal = journal;
    }

    public String getAuthors() {
        return authors;
    }

    public void setAuthors(String authors) {
        this.authors = authors;
    }

    public String getPublicationAbstract() {
        return publicationAbstract;
    }

    public void setPublicationAbstract(String publicationAbstract) {
        this.publicationAbstract = publicationAbstract;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getPaperPdfPath() {
        return paperPdfPath;
    }

    public void setPaperPdfPath(String paperPdfPath) {
        this.paperPdfPath = paperPdfPath;
    }

    public String getCertificatePdfPath() {
        return certificatePdfPath;
    }

    public void setCertificatePdfPath(String certificatePdfPath) {
        this.certificatePdfPath = certificatePdfPath;
    }
}
