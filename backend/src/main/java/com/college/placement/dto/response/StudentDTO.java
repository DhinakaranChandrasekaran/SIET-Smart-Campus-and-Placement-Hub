package com.college.placement.dto.response;

import java.util.ArrayList;
import java.util.List;

/**
 * Student DTO - Complete student profile for API responses
 * Matches frontend studentData.js structure
 * NO LOMBOK - Explicit getters and setters
 */
public class StudentDTO {

    // Personal Details
    private String registerNumber;
    private String name;
    private String dob;
    private String department;
    private String bloodGroup;
    private String address;
    private String academicYear;
    private String yearOfPassing;
    private String photoPath;
    private String email; // Top-level email for dashboard

    // Academic Details - SSLC
    private AcademicDetail sslc;

    // Academic Details - HSC
    private AcademicDetail hsc;

    // Academic Details - UG
    private AcademicDetail ug;

    // SGPA List
    private List<Double> sgpaList = new ArrayList<>();
    private String overallCgpa;

    // Skills
    private List<String> skills = new ArrayList<>();

    // Certifications
    private List<CertificationDTO> certifications = new ArrayList<>();

    // Projects
    private List<ProjectDTO> projects = new ArrayList<>();

    // Publications
    private List<PublicationDTO> publications = new ArrayList<>();

    // Patents
    private List<PatentDTO> patents = new ArrayList<>();

    // Resume
    private ResumeDTO resume;

    // Placement Portal
    private PlacementPortalDTO placementPortal;

    // Social Links
    private String linkedin;
    private String githubProfile;
    private String leetcodeProfile;

    // Activities
    private List<String> extracurricularActivities = new ArrayList<>();
    private List<String> coCurricularActivities = new ArrayList<>();

    // Contact
    private ContactDTO contact;

    // Training Batch
    private String trainingBatch;

    // Constructors
    public StudentDTO() {
    }

    // Inner Classes for nested objects
    public static class AcademicDetail {
        private String board;
        private String institution;
        private String year;
        private String percentage;
        private String department; // Only for UG
        private String cgpa; // Only for UG

        public AcademicDetail() {
        }

        // Getters and Setters
        public String getBoard() {
            return board;
        }

        public void setBoard(String board) {
            this.board = board;
        }

        public String getInstitution() {
            return institution;
        }

        public void setInstitution(String institution) {
            this.institution = institution;
        }

        public String getYear() {
            return year;
        }

        public void setYear(String year) {
            this.year = year;
        }

        public String getPercentage() {
            return percentage;
        }

        public void setPercentage(String percentage) {
            this.percentage = percentage;
        }

        public String getDepartment() {
            return department;
        }

        public void setDepartment(String department) {
            this.department = department;
        }

        public String getCgpa() {
            return cgpa;
        }

        public void setCgpa(String cgpa) {
            this.cgpa = cgpa;
        }
    }

    public static class CertificationDTO {
        private String course;
        private String domain;
        private String date;
        private String filePath;

        public CertificationDTO() {
        }

        public String getCourse() {
            return course;
        }

        public void setCourse(String course) {
            this.course = course;
        }

        public String getDomain() {
            return domain;
        }

        public void setDomain(String domain) {
            this.domain = domain;
        }

        public String getDate() {
            return date;
        }

        public void setDate(String date) {
            this.date = date;
        }

        public String getFilePath() {
            return filePath;
        }

        public void setFilePath(String filePath) {
            this.filePath = filePath;
        }
    }

    public static class ProjectDTO {
        private String title;
        private String domain;
        private List<String> languages = new ArrayList<>();
        private String abstractText;
        private String demoVideo;
        private String reportPdf;

        public ProjectDTO() {
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

        public List<String> getLanguages() {
            return languages;
        }

        public void setLanguages(List<String> languages) {
            this.languages = languages;
        }

        public String getAbstractText() {
            return abstractText;
        }

        public void setAbstractText(String abstractText) {
            this.abstractText = abstractText;
        }

        public String getDemoVideo() {
            return demoVideo;
        }

        public void setDemoVideo(String demoVideo) {
            this.demoVideo = demoVideo;
        }

        public String getReportPdf() {
            return reportPdf;
        }

        public void setReportPdf(String reportPdf) {
            this.reportPdf = reportPdf;
        }
    }

    public static class PublicationDTO {
        private String title;
        private String journal;
        private List<String> authors = new ArrayList<>();
        private String abstractText;
        private String date;
        private String paperPdf;
        private String certificatePdf;

        public PublicationDTO() {
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

        public List<String> getAuthors() {
            return authors;
        }

        public void setAuthors(List<String> authors) {
            this.authors = authors;
        }

        public String getAbstractText() {
            return abstractText;
        }

        public void setAbstractText(String abstractText) {
            this.abstractText = abstractText;
        }

        public String getDate() {
            return date;
        }

        public void setDate(String date) {
            this.date = date;
        }

        public String getPaperPdf() {
            return paperPdf;
        }

        public void setPaperPdf(String paperPdf) {
            this.paperPdf = paperPdf;
        }

        public String getCertificatePdf() {
            return certificatePdf;
        }

        public void setCertificatePdf(String certificatePdf) {
            this.certificatePdf = certificatePdf;
        }
    }

    public static class PatentDTO {
        private String title;
        private String patentNumber;
        private String filingDate;
        private String abstractText;
        private List<String> inventors = new ArrayList<>();
        private String domain;
        private String publicationDate;
        private String certificateUrl;
        private String patentLink;

        public PatentDTO() {
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

        public String getAbstractText() {
            return abstractText;
        }

        public void setAbstractText(String abstractText) {
            this.abstractText = abstractText;
        }

        public List<String> getInventors() {
            return inventors;
        }

        public void setInventors(List<String> inventors) {
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

    public static class ResumeDTO {
        private String name;
        private String file;
        private String fourPageFile;

        public ResumeDTO() {
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getFile() {
            return file;
        }

        public void setFile(String file) {
            this.file = file;
        }

        public String getFourPageFile() {
            return fourPageFile;
        }

        public void setFourPageFile(String fourPageFile) {
            this.fourPageFile = fourPageFile;
        }
    }

    public static class PlacementPortalDTO {
        private String label;
        private String url;

        public PlacementPortalDTO() {
        }

        public String getLabel() {
            return label;
        }

        public void setLabel(String label) {
            this.label = label;
        }

        public String getUrl() {
            return url;
        }

        public void setUrl(String url) {
            this.url = url;
        }
    }

    public static class ContactDTO {
        private String email;
        private String phone;

        public ContactDTO() {
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getPhone() {
            return phone;
        }

        public void setPhone(String phone) {
            this.phone = phone;
        }
    }

    // Main DTO Getters and Setters
    public String getRegisterNumber() {
        return registerNumber;
    }

    public void setRegisterNumber(String registerNumber) {
        this.registerNumber = registerNumber;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDob() {
        return dob;
    }

    public void setDob(String dob) {
        this.dob = dob;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getBloodGroup() {
        return bloodGroup;
    }

    public void setBloodGroup(String bloodGroup) {
        this.bloodGroup = bloodGroup;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getAcademicYear() {
        return academicYear;
    }

    public void setAcademicYear(String academicYear) {
        this.academicYear = academicYear;
    }

    public String getYearOfPassing() {
        return yearOfPassing;
    }

    public void setYearOfPassing(String yearOfPassing) {
        this.yearOfPassing = yearOfPassing;
    }

    public String getPhotoPath() {
        return photoPath;
    }

    public void setPhotoPath(String photoPath) {
        this.photoPath = photoPath;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public AcademicDetail getSslc() {
        return sslc;
    }

    public void setSslc(AcademicDetail sslc) {
        this.sslc = sslc;
    }

    public AcademicDetail getHsc() {
        return hsc;
    }

    public void setHsc(AcademicDetail hsc) {
        this.hsc = hsc;
    }

    public AcademicDetail getUg() {
        return ug;
    }

    public void setUg(AcademicDetail ug) {
        this.ug = ug;
    }

    public List<Double> getSgpaList() {
        return sgpaList;
    }

    public void setSgpaList(List<Double> sgpaList) {
        this.sgpaList = sgpaList;
    }

    public String getOverallCgpa() {
        return overallCgpa;
    }

    public void setOverallCgpa(String overallCgpa) {
        this.overallCgpa = overallCgpa;
    }

    public List<String> getSkills() {
        return skills;
    }

    public void setSkills(List<String> skills) {
        this.skills = skills;
    }

    public List<CertificationDTO> getCertifications() {
        return certifications;
    }

    public void setCertifications(List<CertificationDTO> certifications) {
        this.certifications = certifications;
    }

    public List<ProjectDTO> getProjects() {
        return projects;
    }

    public void setProjects(List<ProjectDTO> projects) {
        this.projects = projects;
    }

    public List<PublicationDTO> getPublications() {
        return publications;
    }

    public void setPublications(List<PublicationDTO> publications) {
        this.publications = publications;
    }

    public List<PatentDTO> getPatents() {
        return patents;
    }

    public void setPatents(List<PatentDTO> patents) {
        this.patents = patents;
    }

    public ResumeDTO getResume() {
        return resume;
    }

    public void setResume(ResumeDTO resume) {
        this.resume = resume;
    }

    public PlacementPortalDTO getPlacementPortal() {
        return placementPortal;
    }

    public void setPlacementPortal(PlacementPortalDTO placementPortal) {
        this.placementPortal = placementPortal;
    }

    public String getLinkedin() {
        return linkedin;
    }

    public void setLinkedin(String linkedin) {
        this.linkedin = linkedin;
    }

    public String getGithubProfile() {
        return githubProfile;
    }

    public void setGithubProfile(String githubProfile) {
        this.githubProfile = githubProfile;
    }

    public String getLeetcodeProfile() {
        return leetcodeProfile;
    }

    public void setLeetcodeProfile(String leetcodeProfile) {
        this.leetcodeProfile = leetcodeProfile;
    }

    public List<String> getExtracurricularActivities() {
        return extracurricularActivities;
    }

    public void setExtracurricularActivities(List<String> extracurricularActivities) {
        this.extracurricularActivities = extracurricularActivities;
    }

    public List<String> getCoCurricularActivities() {
        return coCurricularActivities;
    }

    public void setCoCurricularActivities(List<String> coCurricularActivities) {
        this.coCurricularActivities = coCurricularActivities;
    }

    public ContactDTO getContact() {
        return contact;
    }

    public void setContact(ContactDTO contact) {
        this.contact = contact;
    }

    public String getTrainingBatch() {
        return trainingBatch;
    }

    public void setTrainingBatch(String trainingBatch) {
        this.trainingBatch = trainingBatch;
    }
}
