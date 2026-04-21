package com.college.placement.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

/**
 * Patent Entity
 * NO LOMBOK - Explicit getters and setters
 */
@Entity
@Table(name = "patents")
public class Patent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_reg_no", nullable = false)
    @JsonIgnore
    private Student student;

    private String title;

    @Column(name = "patent_number", length = 100)
    private String patentNumber;

    @Column(name = "filing_date", length = 50)
    private String filingDate;

    @Column(name = "abstract", columnDefinition = "TEXT")
    private String patentAbstract;

    @Column(columnDefinition = "TEXT")
    private String inventors; // Comma-separated: "Dhinakaran C,Dr. Smith"

    private String domain;

    @Column(name = "publication_date", length = 50)
    private String publicationDate;

    @Column(name = "certificate_url", length = 500)
    private String certificateUrl;

    @Column(name = "patent_link", length = 500)
    private String patentLink;

    // Constructors
    public Patent() {
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

    public String getPatentNumber() {
        return patentNumber;
    }

    public void setPatentNumber(String patentNumber) {
        this.patentNumber = patentNumber;
    }

    public String getFilingDate() {
        return filingDate;
    }

    public void setFilingDate(String filingDate) {
        this.filingDate = filingDate;
    }

    public String getPatentAbstract() {
        return patentAbstract;
    }

    public void setPatentAbstract(String patentAbstract) {
        this.patentAbstract = patentAbstract;
    }

    public String getInventors() {
        return inventors;
    }

    public void setInventors(String inventors) {
        this.inventors = inventors;
    }

    public String getDomain() {
        return domain;
    }

    public void setDomain(String domain) {
        this.domain = domain;
    }

    public String getPublicationDate() {
        return publicationDate;
    }

    public void setPublicationDate(String publicationDate) {
        this.publicationDate = publicationDate;
    }

    public String getCertificateUrl() {
        return certificateUrl;
    }

    public void setCertificateUrl(String certificateUrl) {
        this.certificateUrl = certificateUrl;
    }

    public String getPatentLink() {
        return patentLink;
    }

    public void setPatentLink(String patentLink) {
        this.patentLink = patentLink;
    }
}
