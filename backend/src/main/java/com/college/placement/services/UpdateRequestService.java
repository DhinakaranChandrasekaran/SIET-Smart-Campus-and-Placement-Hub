package com.college.placement.services;

import com.college.placement.models.*;
import com.college.placement.repositories.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
public class UpdateRequestService {

    @Autowired
    private UpdateRequestRepository updateRequestRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private CertificationRepository certificationRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private PublicationRepository publicationRepository;

    @Autowired
    private PatentRepository patentRepository;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Autowired
    private EmailService emailService;

    /**
     * Submit a new update request
     */
    public UpdateRequest submitUpdateRequest(String studentRegNo, String studentName, Object submittedData) {
        try {
            UpdateRequest request = new UpdateRequest();
            request.setStudentRegNo(studentRegNo);
            request.setStudentName(studentName);

            // Convert submitted data to JSON string
            String jsonData = objectMapper.writeValueAsString(submittedData);
            request.setSubmittedData(jsonData);

            return updateRequestRepository.save(request);
        } catch (Exception e) {
            throw new RuntimeException("Error submitting update request: " + e.getMessage());
        }
    }

    /**
     * Get all update requests
     */
    public List<UpdateRequest> getAllUpdateRequests() {
        return updateRequestRepository.findAllByOrderBySubmittedOnDesc();
    }

    /**
     * Get update requests by student registration number
     */
    public List<UpdateRequest> getUpdateRequestsByStudentRegNo(String studentRegNo) {
        return updateRequestRepository.findByStudentRegNo(studentRegNo);
    }

    /**
     * Get pending update requests
     */
    public List<UpdateRequest> getPendingUpdateRequests() {
        return updateRequestRepository.findByStatus("pending");
    }

    /**
     * Approve an update request and apply changes to student data
     */
    @Transactional
    public UpdateRequest approveUpdateRequest(Long requestId, String reviewedBy, String comments) {
        UpdateRequest request = updateRequestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Update request not found"));

        // Apply the changes to the actual student data
        try {
            applyChangesToStudent(request);
        } catch (Exception e) {
            throw new RuntimeException("Error applying changes to student data: " + e.getMessage());
        }

        // Mark request as approved
        request.setStatus("approved");
        request.setReviewedBy(reviewedBy);
        request.setReviewComments(comments);
        request.setReviewedOn(java.time.LocalDateTime.now());

        UpdateRequest saved = updateRequestRepository.save(request);

        // Send profile updated email to student
        Student student = studentRepository.findById(request.getStudentRegNo()).orElse(null);
        if (student != null && student.getEmail() != null && !student.getEmail().isEmpty()) {
            emailService.sendProfileUpdatedEmail(student.getName(), student.getEmail());
        }

        return saved;
    }

    /**
     * Reject an update request (no changes applied)
     */
    public UpdateRequest rejectUpdateRequest(Long requestId, String reviewedBy, String comments) {
        UpdateRequest request = updateRequestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Update request not found"));

        // Just mark as rejected, don't apply changes
        request.setStatus("rejected");
        request.setReviewedBy(reviewedBy);
        request.setReviewComments(comments);
        request.setReviewedOn(java.time.LocalDateTime.now());

        UpdateRequest saved = updateRequestRepository.save(request);

        // Send rejection email to student
        Student student = studentRepository.findById(request.getStudentRegNo()).orElse(null);
        if (student != null && student.getEmail() != null && !student.getEmail().isEmpty()) {
            emailService.sendRejectionEmailToStudent(student.getName(), student.getEmail(), comments);
        }

        return saved;
    }

    /**
     * Apply approved changes to the actual student data
     */
    @SuppressWarnings("unchecked")
    private void applyChangesToStudent(UpdateRequest request) throws Exception {
        // Parse the submitted data JSON
        Map<String, Object> data = objectMapper.readValue(
                request.getSubmittedData(),
                Map.class);

        String studentRegNo = request.getStudentRegNo();

        // Find the student
        Student student = studentRepository.findById(studentRegNo)
                .orElseThrow(() -> new RuntimeException("Student not found: " + studentRegNo));

        // Update basic fields
        if (data.containsKey("address"))
            student.setAddress((String) data.get("address"));
        if (data.containsKey("phone"))
            student.setPhone((String) data.get("phone"));
        if (data.containsKey("email"))
            student.setEmail((String) data.get("email"));

        // Update SSLC details
        if (data.containsKey("sslcBoard"))
            student.setSslcBoard((String) data.get("sslcBoard"));
        if (data.containsKey("sslcInstitution"))
            student.setSslcInstitution((String) data.get("sslcInstitution"));
        if (data.containsKey("sslcYear"))
            student.setSslcYear((String) data.get("sslcYear"));
        if (data.containsKey("sslcPercentage"))
            student.setSslcPercentage((String) data.get("sslcPercentage"));

        // Update HSC details
        if (data.containsKey("hscBoard"))
            student.setHscBoard((String) data.get("hscBoard"));
        if (data.containsKey("hscInstitution"))
            student.setHscInstitution((String) data.get("hscInstitution"));
        if (data.containsKey("hscYear"))
            student.setHscYear((String) data.get("hscYear"));
        if (data.containsKey("hscPercentage"))
            student.setHscPercentage((String) data.get("hscPercentage"));

        // Update UG details
        if (data.containsKey("ugDepartment"))
            student.setUgDepartment((String) data.get("ugDepartment"));
        if (data.containsKey("ugInstitution"))
            student.setUgInstitution((String) data.get("ugInstitution"));
        if (data.containsKey("ugYear"))
            student.setUgYear((String) data.get("ugYear"));
        if (data.containsKey("ugCgpa"))
            student.setUgCgpa((String) data.get("ugCgpa"));

        // Update CGPA
        if (data.containsKey("overallCgpa"))
            student.setOverallCgpa((String) data.get("overallCgpa"));

        // Update SGPA data
        if (data.containsKey("sgpaList")) {
            List<Object> sgpaList = (List<Object>) data.get("sgpaList");
            String sgpaJson = objectMapper.writeValueAsString(sgpaList);
            student.setSgpaData(sgpaJson);
        }

        // Update skills
        if (data.containsKey("skills")) {
            List<String> skills = (List<String>) data.get("skills");
            String skillsString = String.join(",", skills);
            student.setSkills(skillsString);
        }

        // Update social links
        if (data.containsKey("linkedin"))
            student.setLinkedin((String) data.get("linkedin"));
        if (data.containsKey("githubProfile"))
            student.setGithubProfile((String) data.get("githubProfile"));
        if (data.containsKey("leetcodeProfile"))
            student.setLeetcodeProfile((String) data.get("leetcodeProfile"));

        // Update activities
        if (data.containsKey("extracurricularActivities")) {
            List<String> activities = (List<String>) data.get("extracurricularActivities");
            String activitiesString = String.join("\n", activities);
            student.setExtracurricularActivities(activitiesString);
        }

        if (data.containsKey("coCurricularActivities")) {
            List<String> activities = (List<String>) data.get("coCurricularActivities");
            String activitiesString = String.join("\n", activities);
            student.setCoCurricularActivities(activitiesString);
        }

        // Save the updated student
        studentRepository.save(student);

        // ==================== HANDLE RELATED ENTITIES ====================

        // Handle Certifications Array (new format)
        if (data.containsKey("certificationsArray") && data.get("certificationsArray") != null) {
            List<Map<String, Object>> certsArray = (List<Map<String, Object>>) data.get("certificationsArray");
            for (Map<String, Object> certData : certsArray) {
                String course = (String) certData.get("course");
                if (course == null || course.trim().isEmpty())
                    continue;

                Certification cert = new Certification();
                cert.setStudent(student);
                cert.setCourse(course);
                cert.setDomain((String) certData.get("domain"));
                cert.setDate((String) certData.get("date"));
                cert.setFilePath((String) certData.get("filePath"));
                certificationRepository.save(cert);
                System.out.println("✅ Saved certification: " + course);
            }
        }
        // Fallback: old text-based certifications format
        else if (data.containsKey("certifications") && data.get("certifications") != null) {
            String certsText = (String) data.get("certifications");
            if (certsText != null && !certsText.trim().isEmpty()) {
                String[] lines = certsText.split("\n");
                for (String line : lines) {
                    line = line.trim();
                    if (line.isEmpty())
                        continue;
                    Certification cert = new Certification();
                    cert.setStudent(student);
                    try {
                        if (line.contains("(") && line.contains(")")) {
                            cert.setCourse(line.substring(0, line.indexOf("(")).trim());
                            cert.setDomain(line.substring(line.indexOf("(") + 1, line.indexOf(")")).trim());
                            if (line.indexOf(")") < line.length() - 1) {
                                cert.setDate(line.substring(line.indexOf(")") + 1).replaceAll("^\\s*-\\s*", "").trim());
                            }
                        } else {
                            cert.setCourse(line);
                        }
                    } catch (Exception ex) {
                        cert.setCourse(line);
                    }
                    certificationRepository.save(cert);
                    System.out.println("✅ Saved certification: " + cert.getCourse());
                }
            }
        }

        // Handle Projects Array (new format)
        if (data.containsKey("projectsArray") && data.get("projectsArray") != null) {
            List<Map<String, Object>> projArray = (List<Map<String, Object>>) data.get("projectsArray");
            for (Map<String, Object> projData : projArray) {
                String title = (String) projData.get("title");
                if (title == null || title.trim().isEmpty())
                    continue;

                Project project = new Project();
                project.setStudent(student);
                project.setTitle(title);
                project.setDomain((String) projData.get("domain"));
                project.setProjectAbstract((String) projData.get("abstract"));
                project.setDemoVideoPath((String) projData.get("demoVideoPath"));
                project.setReportPdfPath((String) projData.get("reportPdfPath"));

                if (projData.containsKey("languages") && projData.get("languages") != null) {
                    List<String> languages = (List<String>) projData.get("languages");
                    project.setLanguages(String.join(",", languages));
                }

                projectRepository.save(project);
                System.out.println("✅ Saved project: " + title);
            }
        }
        // Fallback: old single project format
        else if (data.containsKey("projectTitle") && data.get("projectTitle") != null) {
            String projectTitle = (String) data.get("projectTitle");
            if (projectTitle != null && !projectTitle.trim().isEmpty()) {
                Project project = new Project();
                project.setStudent(student);
                project.setTitle(projectTitle);
                project.setDomain((String) data.get("projectDomain"));
                project.setProjectAbstract((String) data.get("projectAbstract"));
                project.setDemoVideoPath((String) data.get("projectDemoVideo"));
                project.setReportPdfPath((String) data.get("projectReportPdf"));
                if (data.containsKey("projectLanguages")) {
                    List<String> languages = (List<String>) data.get("projectLanguages");
                    project.setLanguages(String.join(",", languages));
                }
                projectRepository.save(project);
                System.out.println("✅ Saved project: " + projectTitle);
            }
        }

        // Handle Publications Array (new format)
        if (data.containsKey("publicationsArray") && data.get("publicationsArray") != null) {
            List<Map<String, Object>> pubsArray = (List<Map<String, Object>>) data.get("publicationsArray");
            for (Map<String, Object> pubData : pubsArray) {
                String title = (String) pubData.get("title");
                if (title == null || title.trim().isEmpty())
                    continue;

                Publication publication = new Publication();
                publication.setStudent(student);
                publication.setTitle(title);
                publication.setJournal((String) pubData.get("journal"));
                publication.setPublicationAbstract((String) pubData.get("abstract"));
                publication.setDate((String) pubData.get("date"));
                publication.setPaperPdfPath((String) pubData.get("paperPdfPath"));
                publication.setCertificatePdfPath((String) pubData.get("certificatePdfPath"));

                if (pubData.containsKey("authors") && pubData.get("authors") != null) {
                    List<String> authors = (List<String>) pubData.get("authors");
                    publication.setAuthors(String.join(",", authors));
                }

                publicationRepository.save(publication);
                System.out.println("✅ Saved publication: " + title);
            }
        }
        // Fallback: old single publication format
        else if (data.containsKey("publicationTitle") && data.get("publicationTitle") != null) {
            String pubTitle = (String) data.get("publicationTitle");
            if (pubTitle != null && !pubTitle.trim().isEmpty()) {
                Publication publication = new Publication();
                publication.setStudent(student);
                publication.setTitle(pubTitle);
                publication.setJournal((String) data.get("publicationJournal"));
                publication.setPublicationAbstract((String) data.get("publicationAbstract"));
                publication.setDate((String) data.get("publicationDate"));
                publication.setPaperPdfPath((String) data.get("publicationPaperPdf"));
                publication.setCertificatePdfPath((String) data.get("publicationCertificatePdf"));
                if (data.containsKey("publicationAuthors")) {
                    List<String> authors = (List<String>) data.get("publicationAuthors");
                    publication.setAuthors(String.join(",", authors));
                }
                publicationRepository.save(publication);
                System.out.println("✅ Saved publication: " + pubTitle);
            }
        }

        // Handle Patents Array (new format)
        if (data.containsKey("patentsArray") && data.get("patentsArray") != null) {
            List<Map<String, Object>> patArray = (List<Map<String, Object>>) data.get("patentsArray");
            for (Map<String, Object> patData : patArray) {
                String title = (String) patData.get("title");
                if (title == null || title.trim().isEmpty())
                    continue;

                Patent patent = new Patent();
                patent.setStudent(student);
                patent.setTitle(title);
                patent.setPatentNumber((String) patData.get("patentNumber"));
                patent.setFilingDate((String) patData.get("filingDate"));
                patent.setPatentAbstract((String) patData.get("abstract"));
                patent.setDomain((String) patData.get("domain"));
                patent.setPublicationDate((String) patData.get("publicationDate"));
                patent.setCertificateUrl((String) patData.get("certificateUrl"));
                patent.setPatentLink((String) patData.get("patentLink"));

                if (patData.containsKey("inventors") && patData.get("inventors") != null) {
                    List<String> inventors = (List<String>) patData.get("inventors");
                    patent.setInventors(String.join(",", inventors));
                }

                patentRepository.save(patent);
                System.out.println("✅ Saved patent: " + title);
            }
        }
        // Fallback: old single patent format
        else if (data.containsKey("patentTitle") && data.get("patentTitle") != null) {
            String patentTitle = (String) data.get("patentTitle");
            if (patentTitle != null && !patentTitle.trim().isEmpty()) {
                Patent patent = new Patent();
                patent.setStudent(student);
                patent.setTitle(patentTitle);
                patent.setPatentNumber((String) data.get("patentNumber"));
                patent.setFilingDate((String) data.get("patentFilingDate"));
                patent.setPatentAbstract((String) data.get("patentAbstract"));
                patent.setDomain((String) data.get("patentDomain"));
                patent.setPublicationDate((String) data.get("patentPublicationDate"));
                patent.setCertificateUrl((String) data.get("patentCertificateUrl"));
                patent.setPatentLink((String) data.get("patentLink"));
                if (data.containsKey("patentInventors")) {
                    List<String> inventors = (List<String>) data.get("patentInventors");
                    patent.setInventors(String.join(",", inventors));
                }
                patentRepository.save(patent);
                System.out.println("✅ Saved patent: " + patentTitle);
            }
        }

        // Handle resume file path
        if (data.containsKey("resumeFilePath")) {
            student.setResumePath((String) data.get("resumeFilePath"));
            studentRepository.save(student);
        }

        // Handle four-page resume file path
        if (data.containsKey("fourPageResumeFilePath")) {
            student.setFourPageResumePath((String) data.get("fourPageResumeFilePath"));
            studentRepository.save(student);
        }

        System.out.println("✅ Successfully applied ALL changes for student: " + studentRegNo);
    }
}
