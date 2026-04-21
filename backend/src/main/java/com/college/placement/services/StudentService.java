package com.college.placement.services;

import com.college.placement.dto.request.StudentFilterRequest;
import com.college.placement.dto.response.BatchInfoDTO;
import com.college.placement.dto.response.FilterOptionsDTO;
import com.college.placement.dto.response.StudentDTO;
import com.college.placement.models.*;
import com.college.placement.repositories.ProjectRepository;
import com.college.placement.repositories.StudentRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Year;
import java.util.*;
import java.util.stream.Collectors;

/**
 * Student Service
 * Handles all student-related business logic
 */
@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private ProjectRepository projectRepository;

    private final ObjectMapper objectMapper = new ObjectMapper();

    /**
     * Get student by register number
     */
    public StudentDTO getStudentByRegisterNumber(String regNo) {
        Student student = studentRepository.findById(regNo)
                .orElseThrow(() -> new RuntimeException("Student not found with register number: " + regNo));
        return convertToDTO(student);
    }

    /**
     * Get all students
     */
    public List<StudentDTO> getAllStudents() {
        List<Student> students = studentRepository.findAll();
        return students.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Get students by department
     */
    public List<StudentDTO> getStudentsByDepartment(String department) {
        List<Student> students = studentRepository.findByDepartment(department);
        return students.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Get students by academic year (batch)
     */
    public List<StudentDTO> getStudentsByYear(String year) {
        List<Student> students = studentRepository.findByAcademicYear(year);
        return students.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Get students by training batch
     */
    public List<StudentDTO> getStudentsByTrainingBatch(String batch) {
        List<Student> students = studentRepository.findByTrainingBatch(batch);
        return students.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Search students by name
     */
    public List<StudentDTO> searchStudentsByName(String name) {
        List<Student> students = studentRepository.searchByName(name);
        return students.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Get all distinct academic years (batches)
     */
    public List<String> getAllDistinctBatches() {
        return studentRepository.findDistinctAcademicYears();
    }

    /**
     * Get all distinct departments
     */
    public List<String> getAllDistinctDepartments() {
        return studentRepository.findDistinctDepartments();
    }

    /**
     * Get distinct departments for a specific batch
     */
    public List<String> getDepartmentsByBatch(String batch) {
        return studentRepository.findDistinctDepartmentsByAcademicYear(batch);
    }

    /**
     * Get all distinct training batches
     */
    public List<String> getAllDistinctTrainingBatches() {
        return studentRepository.findDistinctTrainingBatches();
    }

    /**
     * Get batches with computed status (Completed, Ongoing, Upcoming)
     */
    public List<BatchInfoDTO> getBatchesWithStatus() {
        List<String> batches = studentRepository.findDistinctAcademicYears();
        int currentYear = Year.now().getValue();

        return batches.stream()
                .map(batch -> {
                    String status = computeBatchStatus(batch, currentYear);
                    return new BatchInfoDTO(batch, status);
                })
                .collect(Collectors.toList());
    }

    /**
     * Compute batch status based on end year
     */
    private String computeBatchStatus(String batch, int currentYear) {
        try {
            // Extract end year from batch (e.g., "2018–2022" -> 2022)
            String[] parts = batch.split("[–-]");
            if (parts.length >= 2) {
                int endYear = Integer.parseInt(parts[1].trim());
                if (endYear < currentYear) {
                    return "Completed";
                } else if (endYear == currentYear || endYear == currentYear + 1) {
                    return "Ongoing";
                } else {
                    return "Upcoming";
                }
            }
        } catch (Exception e) {
            // If parsing fails, default to Upcoming
        }
        return "Upcoming";
    }

    /**
     * Get filter options for admin shortlisting
     */
    public FilterOptionsDTO getFilterOptions() {
        // Get distinct project domains
        List<String> projectDomains = projectRepository.findDistinctDomains();

        // Get distinct skills/technologies
        List<String> rawSkills = studentRepository.findAllSkillsRaw();
        Set<String> uniqueSkills = new TreeSet<>();
        for (String skills : rawSkills) {
            if (skills != null && !skills.isEmpty()) {
                Arrays.stream(skills.split(","))
                        .map(String::trim)
                        .filter(s -> !s.isEmpty())
                        .forEach(uniqueSkills::add);
            }
        }

        // Get distinct departments
        List<String> departments = studentRepository.findDistinctDepartments();

        return new FilterOptionsDTO(projectDomains, new ArrayList<>(uniqueSkills), departments);
    }

    /**
     * Filter students based on criteria (server-side filtering)
     */
    public List<StudentDTO> filterStudents(StudentFilterRequest request) {
        List<Student> students;

        // Start with batch + training batch filter if both provided
        if (request.getBatch() != null && !request.getBatch().isEmpty()
                && request.getTrainingBatch() != null && !request.getTrainingBatch().isEmpty()) {
            students = studentRepository.findByAcademicYearAndTrainingBatch(
                    request.getBatch(), request.getTrainingBatch());
        } else if (request.getBatch() != null && !request.getBatch().isEmpty()) {
            students = studentRepository.findByAcademicYear(request.getBatch());
        } else if (request.getTrainingBatch() != null && !request.getTrainingBatch().isEmpty()) {
            students = studentRepository.findByTrainingBatch(request.getTrainingBatch());
        } else {
            students = studentRepository.findAll();
        }

        // Apply additional filters in memory
        return students.stream()
                .filter(s -> filterByRegNo(s, request.getRegNo()))
                .filter(s -> filterByName(s, request.getName()))
                .filter(s -> filterByMinCgpa(s, request.getMinCgpa()))
                .filter(s -> filterByMinProjects(s, request.getMinProjects()))
                .filter(s -> filterByProjectDomain(s, request.getProjectDomain()))
                .filter(s -> filterByTechnologies(s, request.getTechnologies()))
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private boolean filterByRegNo(Student student, String regNo) {
        if (regNo == null || regNo.isEmpty())
            return true;
        return student.getRegisterNumber().contains(regNo);
    }

    private boolean filterByName(Student student, String name) {
        if (name == null || name.isEmpty())
            return true;
        return student.getName().toLowerCase().contains(name.toLowerCase());
    }

    private boolean filterByMinCgpa(Student student, Double minCgpa) {
        if (minCgpa == null)
            return true;
        String cgpaStr = student.getOverallCgpa();
        if (cgpaStr == null || cgpaStr.isEmpty())
            return false;
        try {
            Double cgpa = Double.parseDouble(cgpaStr);
            return cgpa >= minCgpa;
        } catch (NumberFormatException e) {
            return false;
        }
    }

    private boolean filterByMinProjects(Student student, Integer minProjects) {
        if (minProjects == null || minProjects <= 0)
            return true;
        int projectCount = student.getProjects() != null ? student.getProjects().size() : 0;
        return projectCount >= minProjects;
    }

    private boolean filterByProjectDomain(Student student, String projectDomain) {
        if (projectDomain == null || projectDomain.isEmpty())
            return true;
        if (student.getProjects() == null || student.getProjects().isEmpty())
            return false;
        return student.getProjects().stream()
                .anyMatch(p -> p.getDomain() != null &&
                        p.getDomain().toLowerCase().contains(projectDomain.toLowerCase()));
    }

    private boolean filterByTechnologies(Student student, String technologies) {
        if (technologies == null || technologies.isEmpty())
            return true;
        String skills = student.getSkills();
        if (skills == null || skills.isEmpty())
            return false;

        String[] searchTechs = technologies.toLowerCase().split(",");
        String skillsLower = skills.toLowerCase();

        return Arrays.stream(searchTechs)
                .map(String::trim)
                .anyMatch(tech -> skillsLower.contains(tech));
    }

    // ==================== CONVERSION METHODS ====================

    /**
     * Convert Student entity to StudentDTO
     */
    private StudentDTO convertToDTO(Student student) {
        StudentDTO dto = new StudentDTO();

        // Personal Details
        dto.setRegisterNumber(student.getRegisterNumber());
        dto.setName(student.getName());
        dto.setDob(student.getDateOfBirth() != null ? student.getDateOfBirth().toString() : null);
        dto.setDepartment(student.getDepartment());
        dto.setBloodGroup(student.getBloodGroup());
        dto.setAddress(student.getAddress());
        dto.setAcademicYear(student.getAcademicYear());
        dto.setYearOfPassing(student.getYearOfPassing());
        dto.setPhotoPath(student.getPhotoPath());
        dto.setEmail(student.getEmail()); // Top-level email for dashboard

        // Academic Details - SSLC
        StudentDTO.AcademicDetail sslc = new StudentDTO.AcademicDetail();
        sslc.setBoard(student.getSslcBoard());
        sslc.setInstitution(student.getSslcInstitution());
        sslc.setYear(student.getSslcYear());
        sslc.setPercentage(student.getSslcPercentage());
        dto.setSslc(sslc);

        // Academic Details - HSC
        StudentDTO.AcademicDetail hsc = new StudentDTO.AcademicDetail();
        hsc.setBoard(student.getHscBoard());
        hsc.setInstitution(student.getHscInstitution());
        hsc.setYear(student.getHscYear());
        hsc.setPercentage(student.getHscPercentage());
        dto.setHsc(hsc);

        // Academic Details - UG
        StudentDTO.AcademicDetail ug = new StudentDTO.AcademicDetail();
        ug.setDepartment(student.getUgDepartment());
        ug.setInstitution(student.getUgInstitution());
        ug.setYear(student.getUgYear());
        ug.setCgpa(student.getUgCgpa());
        dto.setUg(ug);

        // SGPA List - Parse JSON array
        if (student.getSgpaData() != null && !student.getSgpaData().isEmpty()) {
            try {
                List<Double> sgpaList = objectMapper.readValue(
                        student.getSgpaData(),
                        new TypeReference<List<Double>>() {
                        });
                dto.setSgpaList(sgpaList);
            } catch (Exception e) {
                dto.setSgpaList(new ArrayList<>());
            }
        }
        dto.setOverallCgpa(student.getOverallCgpa());

        // Skills - Parse comma-separated
        if (student.getSkills() != null && !student.getSkills().isEmpty()) {
            List<String> skills = Arrays.asList(student.getSkills().split(","));
            dto.setSkills(skills.stream().map(String::trim).collect(Collectors.toList()));
        }

        // Certifications
        List<StudentDTO.CertificationDTO> certDTOs = student.getCertifications().stream()
                .map(this::convertCertificationToDTO)
                .collect(Collectors.toList());
        dto.setCertifications(certDTOs);

        // Projects - Get ALL projects
        List<StudentDTO.ProjectDTO> projDTOs = student.getProjects().stream()
                .map(this::convertProjectToDTO)
                .collect(Collectors.toList());
        dto.setProjects(projDTOs);

        // Publications - Get ALL publications
        List<StudentDTO.PublicationDTO> pubDTOs = student.getPublications().stream()
                .map(this::convertPublicationToDTO)
                .collect(Collectors.toList());
        dto.setPublications(pubDTOs);

        // Patents
        List<StudentDTO.PatentDTO> patentDTOs = student.getPatents().stream()
                .map(this::convertPatentToDTO)
                .collect(Collectors.toList());
        dto.setPatents(patentDTOs);

        // Resume
        StudentDTO.ResumeDTO resume = new StudentDTO.ResumeDTO();
        resume.setName(student.getName() + "_Resume.pdf");
        resume.setFile(student.getResumePath());
        resume.setFourPageFile(student.getFourPageResumePath());
        dto.setResume(resume);

        // Placement Portal
        StudentDTO.PlacementPortalDTO portal = new StudentDTO.PlacementPortalDTO();
        portal.setLabel(student.getPlacementPortalLabel());
        portal.setUrl(student.getPlacementPortalUrl());
        dto.setPlacementPortal(portal);

        // Social Links
        dto.setLinkedin(student.getLinkedin());
        dto.setGithubProfile(student.getGithubProfile());
        dto.setLeetcodeProfile(student.getLeetcodeProfile());

        // Activities - Parse comma-separated
        if (student.getExtracurricularActivities() != null && !student.getExtracurricularActivities().isEmpty()) {
            List<String> extra = Arrays.asList(student.getExtracurricularActivities().split(","));
            dto.setExtracurricularActivities(extra.stream().map(String::trim).collect(Collectors.toList()));
        }

        if (student.getCoCurricularActivities() != null && !student.getCoCurricularActivities().isEmpty()) {
            List<String> co = Arrays.asList(student.getCoCurricularActivities().split(","));
            dto.setCoCurricularActivities(co.stream().map(String::trim).collect(Collectors.toList()));
        }

        // Contact
        StudentDTO.ContactDTO contact = new StudentDTO.ContactDTO();
        contact.setEmail(student.getEmail());
        contact.setPhone(student.getPhone());
        dto.setContact(contact);

        // Training Batch
        dto.setTrainingBatch(student.getTrainingBatch());

        return dto;
    }

    /**
     * Convert Certification entity to DTO
     */
    private StudentDTO.CertificationDTO convertCertificationToDTO(Certification cert) {
        StudentDTO.CertificationDTO dto = new StudentDTO.CertificationDTO();
        dto.setCourse(cert.getCourse());
        dto.setDomain(cert.getDomain());
        dto.setDate(cert.getDate());
        dto.setFilePath(cert.getFilePath());
        return dto;
    }

    /**
     * Convert Project entity to DTO
     */
    private StudentDTO.ProjectDTO convertProjectToDTO(Project project) {
        StudentDTO.ProjectDTO dto = new StudentDTO.ProjectDTO();
        dto.setTitle(project.getTitle());
        dto.setDomain(project.getDomain());

        // Parse languages
        if (project.getLanguages() != null && !project.getLanguages().isEmpty()) {
            List<String> languages = Arrays.asList(project.getLanguages().split(","));
            dto.setLanguages(languages.stream().map(String::trim).collect(Collectors.toList()));
        }

        dto.setAbstractText(project.getProjectAbstract());
        dto.setDemoVideo(project.getDemoVideoPath());
        dto.setReportPdf(project.getReportPdfPath());
        return dto;
    }

    /**
     * Convert Publication entity to DTO
     */
    private StudentDTO.PublicationDTO convertPublicationToDTO(Publication pub) {
        StudentDTO.PublicationDTO dto = new StudentDTO.PublicationDTO();
        dto.setTitle(pub.getTitle());
        dto.setJournal(pub.getJournal());

        // Parse authors
        if (pub.getAuthors() != null && !pub.getAuthors().isEmpty()) {
            List<String> authors = Arrays.asList(pub.getAuthors().split(","));
            dto.setAuthors(authors.stream().map(String::trim).collect(Collectors.toList()));
        }

        dto.setAbstractText(pub.getPublicationAbstract());
        dto.setDate(pub.getDate());
        dto.setPaperPdf(pub.getPaperPdfPath());
        dto.setCertificatePdf(pub.getCertificatePdfPath());
        return dto;
    }

    /**
     * Convert Patent entity to DTO
     */
    private StudentDTO.PatentDTO convertPatentToDTO(Patent patent) {
        StudentDTO.PatentDTO dto = new StudentDTO.PatentDTO();
        dto.setTitle(patent.getTitle());
        dto.setPatentNumber(patent.getPatentNumber());
        dto.setFilingDate(patent.getFilingDate());
        dto.setAbstractText(patent.getPatentAbstract());

        // Parse inventors
        if (patent.getInventors() != null && !patent.getInventors().isEmpty()) {
            List<String> inventors = Arrays.asList(patent.getInventors().split(","));
            dto.setInventors(inventors.stream().map(String::trim).collect(Collectors.toList()));
        }

        dto.setDomain(patent.getDomain());
        dto.setPublicationDate(patent.getPublicationDate());
        dto.setCertificateUrl(patent.getCertificateUrl());
        dto.setPatentLink(patent.getPatentLink());
        return dto;
    }
}
