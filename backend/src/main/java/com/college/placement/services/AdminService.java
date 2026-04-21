package com.college.placement.services;

import com.college.placement.dto.response.AnalyticsDTO;
import com.college.placement.dto.response.DashboardDTO;
import com.college.placement.dto.response.StudentDTO;
import com.college.placement.models.Student;
import com.college.placement.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

/**
 * Admin Service
 * Handles admin-specific business logic
 */
@Service
public class AdminService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private DepartmentRepository departmentRepository;

    @Autowired
    private UpdateRequestRepository updateRequestRepository;

    @Autowired
    private PlacementRecordRepository placementRecordRepository;

    @Autowired
    private RecruiterRepository recruiterRepository;

    @Autowired
    private StudentService studentService;

    @Autowired
    private EmailService emailService;

    /**
     * Get dashboard statistics
     */
    public DashboardDTO getDashboardStats() {
        DashboardDTO stats = new DashboardDTO();

        // Student stats
        stats.setTotalStudents(studentRepository.count());
        stats.setTotalDepartments(departmentRepository.count());

        // Update request stats
        stats.setPendingUpdateRequests(updateRequestRepository.countByStatus("pending"));
        stats.setApprovedUpdateRequests(updateRequestRepository.countByStatus("approved"));
        stats.setRejectedUpdateRequests(updateRequestRepository.countByStatus("rejected"));

        // Placement stats
        stats.setTotalPlacementRecords(placementRecordRepository.count());
        stats.setTotalCompanies(recruiterRepository.count());

        // Calculate placement rate (simplified)
        long totalStudents = stats.getTotalStudents();
        long placedStudents = placementRecordRepository.countDistinctStudents();
        if (totalStudents > 0) {
            double rate = (double) placedStudents / totalStudents * 100;
            stats.setPlacementRate(String.format("%.1f%%", rate));
        } else {
            stats.setPlacementRate("0%");
        }

        // Package stats
        stats.setHighestPackage("24 LPA");
        stats.setAveragePackage("6.5 LPA");

        return stats;
    }

    /**
     * Get analytics data for charts
     */
    public AnalyticsDTO getAnalytics() {
        AnalyticsDTO analytics = new AnalyticsDTO();

        // Department-wise student distribution
        List<AnalyticsDTO.DepartmentStats> deptStats = new ArrayList<>();
        List<Object[]> deptData = studentRepository.getStudentCountByDepartment();
        for (Object[] row : deptData) {
            String dept = (String) row[0];
            Long count = (Long) row[1];
            deptStats.add(new AnalyticsDTO.DepartmentStats(dept, count, 0));
        }
        analytics.setDepartmentWiseStudents(deptStats);

        // Batch-wise placement stats
        List<AnalyticsDTO.BatchStats> batchStats = new ArrayList<>();
        List<String> batches = studentRepository.findDistinctBatches();
        for (String batch : batches) {
            long total = studentRepository.countByBatch(batch);
            long placed = placementRecordRepository.countByBatch(batch);
            String rate = total > 0 ? String.format("%.1f%%", (double) placed / total * 100) : "0%";
            batchStats.add(new AnalyticsDTO.BatchStats(batch, total, placed, rate));
        }
        analytics.setBatchWisePlacements(batchStats);

        // Top companies
        List<AnalyticsDTO.CompanyStats> companyStats = new ArrayList<>();
        List<Object[]> companyData = placementRecordRepository.getTopCompaniesByHires();
        for (Object[] row : companyData) {
            String company = (String) row[0];
            Long count = (Long) row[1];
            companyStats.add(new AnalyticsDTO.CompanyStats(company, count, "5 LPA"));
        }
        analytics.setTopCompanies(companyStats);

        // Request status breakdown
        Map<String, Long> statusBreakdown = new HashMap<>();
        statusBreakdown.put("pending", updateRequestRepository.countByStatus("pending"));
        statusBreakdown.put("approved", updateRequestRepository.countByStatus("approved"));
        statusBreakdown.put("rejected", updateRequestRepository.countByStatus("rejected"));
        analytics.setRequestStatusBreakdown(statusBreakdown);

        return analytics;
    }

    /**
     * Get all students with pagination support
     */
    public List<StudentDTO> getAllStudentsForAdmin() {
        return studentService.getAllStudents();
    }

    /**
     * Update student directly (admin privilege)
     */
    @Transactional
    public StudentDTO updateStudentDirectly(String regNo, Map<String, Object> updates) {
        Student student = studentRepository.findByRegisterNumber(regNo)
                .orElseThrow(() -> new RuntimeException("Student not found: " + regNo));

        // Apply updates only for fields that are present in the request
        if (updates.containsKey("name")) {
            student.setName((String) updates.get("name"));
        }
        if (updates.containsKey("email")) {
            student.setEmail((String) updates.get("email"));
        }
        if (updates.containsKey("phone")) {
            student.setPhone((String) updates.get("phone"));
        }
        if (updates.containsKey("department")) {
            student.setDepartment((String) updates.get("department"));
        }
        if (updates.containsKey("address")) {
            student.setAddress((String) updates.get("address"));
        }
        if (updates.containsKey("academicYear")) {
            student.setAcademicYear((String) updates.get("academicYear"));
        }
        if (updates.containsKey("dateOfBirth") && updates.get("dateOfBirth") != null) {
            String dob = (String) updates.get("dateOfBirth");
            if (!dob.isEmpty()) {
                student.setDateOfBirth(java.time.LocalDate.parse(dob));
            }
        }
        if (updates.containsKey("bloodGroup")) {
            student.setBloodGroup((String) updates.get("bloodGroup"));
        }
        if (updates.containsKey("photoPath")) {
            student.setPhotoPath((String) updates.get("photoPath"));
        }

        studentRepository.save(student);

        // Send email notification to student about profile update
        if (student.getEmail() != null && !student.getEmail().isEmpty()) {
            emailService.sendProfileUpdatedEmail(student.getName(), student.getEmail());
        }

        return studentService.getStudentByRegisterNumber(regNo);
    }

    /**
     * Delete student (admin privilege)
     */
    @Transactional
    public void deleteStudent(String regNo) {
        Student student = studentRepository.findByRegisterNumber(regNo)
                .orElseThrow(() -> new RuntimeException("Student not found: " + regNo));
        studentRepository.delete(student);
    }
}
