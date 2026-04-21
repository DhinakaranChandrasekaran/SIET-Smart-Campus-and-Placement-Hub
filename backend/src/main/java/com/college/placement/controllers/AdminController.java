package com.college.placement.controllers;

import com.college.placement.dto.response.AnalyticsDTO;
import com.college.placement.dto.response.DashboardDTO;
import com.college.placement.dto.response.StudentDTO;
import com.college.placement.models.*;
import com.college.placement.repositories.*;
import com.college.placement.services.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

/**
 * Admin Controller
 * Handles admin-specific endpoints for CRUD operations
 */
@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private FacultyRepository facultyRepository;

    @Autowired
    private DepartmentRepository departmentRepository;

    @Autowired
    private PlacementOfficerRepository placementOfficerRepository;

    @Autowired
    private RecruiterRepository recruiterRepository;

    @Autowired
    private PlacementDriveRepository placementDriveRepository;

    @Autowired
    private PlacementRecordRepository placementRecordRepository;

    @Value("${student.default-password}")
    private String defaultStudentPassword;

    // ==================== DASHBOARD ====================

    @GetMapping("/dashboard")
    public ResponseEntity<DashboardDTO> getDashboardStats() {
        DashboardDTO stats = adminService.getDashboardStats();
        return ResponseEntity.ok(stats);
    }

    @GetMapping("/analytics")
    public ResponseEntity<AnalyticsDTO> getAnalytics() {
        AnalyticsDTO analytics = adminService.getAnalytics();
        return ResponseEntity.ok(analytics);
    }

    // ==================== STUDENTS ====================

    @GetMapping("/students")
    public ResponseEntity<List<StudentDTO>> getAllStudents() {
        List<StudentDTO> students = adminService.getAllStudentsForAdmin();
        return ResponseEntity.ok(students);
    }

    @PostMapping("/students")
    public ResponseEntity<?> createStudent(@RequestBody Map<String, Object> data) {
        try {
            Student student = new Student();
            student.setRegisterNumber((String) data.get("registerNumber"));
            student.setName((String) data.get("name"));
            student.setEmail((String) data.get("email"));
            student.setPhone((String) data.get("phone"));
            student.setDepartment((String) data.get("department"));
            student.setAcademicYear((String) data.get("academicYear"));
            student.setAddress((String) data.get("address"));
            student.setBloodGroup((String) data.get("bloodGroup"));
            student.setPhotoPath((String) data.get("photoPath"));

            if (data.get("dateOfBirth") != null && !data.get("dateOfBirth").toString().isEmpty()) {
                student.setDateOfBirth(LocalDate.parse((String) data.get("dateOfBirth")));
            }

            // Set default password from configuration
            student.setPassword(defaultStudentPassword);

            studentRepository.save(student);
            return ResponseEntity.ok(Map.of("status", "success", "message", "Student added successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to add student: " + e.getMessage());
        }
    }

    @PutMapping("/students/{regNo}")
    public ResponseEntity<StudentDTO> updateStudent(
            @PathVariable String regNo,
            @RequestBody Map<String, Object> updates) {
        try {
            StudentDTO updated = adminService.updateStudentDirectly(regNo, updates);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            throw new RuntimeException("Failed to update student: " + e.getMessage());
        }
    }

    @DeleteMapping("/students/{regNo}")
    public ResponseEntity<Map<String, String>> deleteStudent(@PathVariable String regNo) {
        try {
            adminService.deleteStudent(regNo);
            return ResponseEntity.ok(Map.of("status", "success", "message", "Student deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("status", "error", "message", e.getMessage()));
        }
    }

    // ==================== PLACEMENT RECORDS ====================

    @DeleteMapping("/placement-records/{id}")
    public ResponseEntity<?> deletePlacementRecord(@PathVariable Long id) {
        try {
            placementRecordRepository.deleteById(id);
            return ResponseEntity.ok(Map.of("status", "success", "message", "Placement record deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to delete placement record: " + e.getMessage());
        }
    }

    // ==================== HOD (updates Department entity) ====================

    @PostMapping("/hod")
    public ResponseEntity<?> updateHod(@RequestBody Map<String, Object> data) {
        try {
            String deptCode = (String) data.get("departmentCode");
            java.util.Optional<Department> deptOptional = departmentRepository.findByCode(deptCode);

            if (deptOptional.isEmpty()) {
                return ResponseEntity.badRequest().body("Department not found: " + deptCode);
            }

            Department dept = deptOptional.get();
            dept.setHodName((String) data.get("hodName"));
            dept.setHodDesignation((String) data.get("hodDesignation"));
            dept.setHodDescription((String) data.get("hodDescription"));
            dept.setHodAcademicBackground((String) data.get("hodAcademicBackground"));
            dept.setHodExperience((String) data.get("hodExperience"));
            dept.setHodSummary((String) data.get("hodSummary"));
            dept.setHodPhotoPath((String) data.get("hodPhotoPath"));
            if (data.get("hodJoiningYear") != null) {
                dept.setHodJoiningYear(Integer.parseInt(data.get("hodJoiningYear").toString()));
            }

            departmentRepository.save(dept);
            return ResponseEntity.ok(Map.of("status", "success", "message", "HOD updated successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to update HOD: " + e.getMessage());
        }
    }

    // ==================== FACULTY ====================

    @PostMapping("/faculty")
    public ResponseEntity<?> createFaculty(@RequestBody Map<String, Object> data) {
        try {
            Faculty faculty = new Faculty();
            faculty.setName((String) data.get("name"));
            faculty.setPosition((String) data.get("position"));

            if (data.get("joiningYear") != null) {
                faculty.setJoiningYear(Integer.parseInt(data.get("joiningYear").toString()));
            }
            if (data.get("displayOrder") != null) {
                faculty.setDisplayOrder(Integer.parseInt(data.get("displayOrder").toString()));
            }
            faculty.setPhotoPath((String) data.get("photoPath"));

            // Find and set department
            String deptCode = (String) data.get("departmentCode");
            java.util.Optional<Department> deptOptional = departmentRepository.findByCode(deptCode);
            if (deptOptional.isPresent()) {
                faculty.setDepartment(deptOptional.get());
            } else {
                return ResponseEntity.badRequest().body("Department not found: " + deptCode);
            }

            facultyRepository.save(faculty);
            return ResponseEntity.ok(Map.of("status", "success", "message", "Faculty added successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to add faculty: " + e.getMessage());
        }
    }

    @DeleteMapping("/faculty/{id}")
    public ResponseEntity<?> deleteFaculty(@PathVariable Long id) {
        try {
            facultyRepository.deleteById(id);
            return ResponseEntity.ok(Map.of("status", "success", "message", "Faculty deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to delete faculty: " + e.getMessage());
        }
    }

    @DeleteMapping("/hod/delete/{deptCode}")
    public ResponseEntity<?> deleteHod(@PathVariable String deptCode) {
        try {
            java.util.Optional<Department> deptOptional = departmentRepository.findByCode(deptCode);
            if (deptOptional.isEmpty()) {
                return ResponseEntity.badRequest().body("Department not found: " + deptCode);
            }

            Department dept = deptOptional.get();
            dept.setHodName(null);
            dept.setHodDesignation(null);
            dept.setHodPhotoPath(null);
            dept.setHodDescription(null);
            dept.setHodAcademicBackground(null);
            dept.setHodExperience(null);
            dept.setHodSummary(null);
            dept.setHodJoiningYear(null);
            departmentRepository.save(dept);

            return ResponseEntity.ok(Map.of("status", "success", "message", "HOD removed successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to delete HOD: " + e.getMessage());
        }
    }

    // ==================== PLACEMENT OFFICERS (Heads & Trainers)
    // ====================

    @PostMapping("/placement-officers")
    public ResponseEntity<?> createPlacementOfficer(@RequestBody Map<String, Object> data) {
        try {
            PlacementOfficer officer = new PlacementOfficer();
            officer.setName((String) data.get("name"));
            officer.setPosition((String) data.get("position"));
            officer.setType((String) data.get("type")); // "HEAD" or "TRAINER"
            officer.setTrainingBatch((String) data.get("trainingBatch"));

            if (data.get("displayOrder") != null) {
                officer.setDisplayOrder(Integer.parseInt(data.get("displayOrder").toString()));
            }
            officer.setPhotoPath((String) data.get("photoPath"));

            placementOfficerRepository.save(officer);
            return ResponseEntity.ok(Map.of("status", "success", "message", "Placement officer added successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to add placement officer: " + e.getMessage());
        }
    }

    @DeleteMapping("/placement-officers/{id}")
    public ResponseEntity<?> deletePlacementOfficer(@PathVariable Long id) {
        try {
            placementOfficerRepository.deleteById(id);
            return ResponseEntity.ok(Map.of("status", "success", "message", "Placement officer deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to delete placement officer: " + e.getMessage());
        }
    }

    // ==================== RECRUITERS (Companies) ====================

    @PostMapping("/recruiters")
    public ResponseEntity<?> createRecruiter(@RequestBody Map<String, Object> data) {
        try {
            Recruiter recruiter = new Recruiter();
            recruiter.setCompanyName((String) data.get("companyName"));
            recruiter.setIndustry((String) data.get("industry"));
            recruiter.setLogoPath((String) data.get("logoPath"));

            if (data.get("year") != null) {
                recruiter.setYear(Integer.parseInt(data.get("year").toString()));
            }
            recruiter.setAvgPackage((String) data.get("avgPackage"));

            recruiterRepository.save(recruiter);
            return ResponseEntity.ok(Map.of("status", "success", "message", "Company added successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to add company: " + e.getMessage());
        }
    }

    // ==================== PLACEMENT DRIVES ====================

    @PostMapping("/placement-drives")
    public ResponseEntity<?> createPlacementDrive(@RequestBody Map<String, Object> data) {
        try {
            PlacementDrive drive = new PlacementDrive();
            drive.setCompanyName((String) data.get("companyName"));
            drive.setVenue((String) data.get("venue"));
            drive.setPackageOffered((String) data.get("packageOffered"));
            drive.setReportingTime((String) data.get("reportingTime"));
            drive.setImagePath((String) data.get("imagePath"));

            if (data.get("driveDate") != null && !data.get("driveDate").toString().isEmpty()) {
                drive.setDriveDate(LocalDate.parse((String) data.get("driveDate")));
            }

            placementDriveRepository.save(drive);
            return ResponseEntity.ok(Map.of("status", "success", "message", "Placement drive added successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to add placement drive: " + e.getMessage());
        }
    }

    // ==================== PLACEMENT RECORDS ====================

    @PostMapping("/placement-records")
    public ResponseEntity<?> createPlacementRecord(@RequestBody Map<String, Object> data) {
        try {
            PlacementRecord record = new PlacementRecord();
            record.setStudentRegNo((String) data.get("studentRegNo"));
            record.setCompany((String) data.get("company"));
            record.setJobRole((String) data.get("jobRole"));
            record.setBatch((String) data.get("batch"));

            if (data.get("packageAmount") != null) {
                record.setPackageAmount(new BigDecimal(data.get("packageAmount").toString()));
            }
            if (data.get("placedDate") != null && !data.get("placedDate").toString().isEmpty()) {
                record.setPlacedDate(LocalDate.parse((String) data.get("placedDate")));
            }

            placementRecordRepository.save(record);
            return ResponseEntity.ok(Map.of("status", "success", "message", "Placement record added successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to add placement record: " + e.getMessage());
        }
    }

    // ==================== GET BY ID ENDPOINTS (for fetch data feature)
    // ====================

    @GetMapping("/faculty/{id}")
    public ResponseEntity<?> getFacultyById(@PathVariable Long id) {
        try {
            return facultyRepository.findById(id)
                    .map(faculty -> {
                        Map<String, Object> data = new java.util.HashMap<>();
                        data.put("id", faculty.getId());
                        data.put("name", faculty.getName());
                        data.put("position", faculty.getPosition());
                        data.put("joiningYear", faculty.getJoiningYear());
                        data.put("photoPath", faculty.getPhotoPath());
                        data.put("displayOrder", faculty.getDisplayOrder());
                        data.put("departmentCode",
                                faculty.getDepartment() != null ? faculty.getDepartment().getCode() : null);
                        return ResponseEntity.ok(data);
                    })
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to fetch faculty: " + e.getMessage());
        }
    }

    @GetMapping("/placement-records/{id}")
    public ResponseEntity<?> getPlacementRecordById(@PathVariable Long id) {
        try {
            return placementRecordRepository.findById(id)
                    .map(record -> {
                        Map<String, Object> data = new java.util.HashMap<>();
                        data.put("id", record.getId());
                        data.put("studentRegNo", record.getStudentRegNo());
                        data.put("company", record.getCompany());
                        data.put("jobRole", record.getJobRole());
                        data.put("packageAmount", record.getPackageAmount());
                        data.put("batch", record.getBatch());
                        data.put("placedDate", record.getPlacedDate());
                        return ResponseEntity.ok(data);
                    })
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to fetch placement record: " + e.getMessage());
        }
    }

    @GetMapping("/placement-records/by-regno/{regNo}")
    public ResponseEntity<?> getPlacementRecordByRegNo(@PathVariable String regNo) {
        try {
            java.util.List<PlacementRecord> records = placementRecordRepository.findByStudentRegNo(regNo);
            if (records.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            PlacementRecord record = records.get(0);
            Map<String, Object> data = new java.util.HashMap<>();
            data.put("id", record.getId());
            data.put("studentRegNo", record.getStudentRegNo());
            data.put("company", record.getCompany());
            data.put("jobRole", record.getJobRole());
            data.put("packageAmount", record.getPackageAmount());
            data.put("batch", record.getBatch());
            data.put("placedDate", record.getPlacedDate());
            return ResponseEntity.ok(data);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to fetch placement record: " + e.getMessage());
        }
    }

    @GetMapping("/placement-officers/{id}")
    public ResponseEntity<?> getPlacementOfficerById(@PathVariable Long id) {
        try {
            return placementOfficerRepository.findById(id)
                    .map(officer -> {
                        Map<String, Object> data = new java.util.HashMap<>();
                        data.put("id", officer.getId());
                        data.put("name", officer.getName());
                        data.put("position", officer.getPosition());
                        data.put("type", officer.getType());
                        data.put("photoPath", officer.getPhotoPath());
                        data.put("trainingBatch", officer.getTrainingBatch());
                        data.put("displayOrder", officer.getDisplayOrder());
                        return ResponseEntity.ok(data);
                    })
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to fetch placement officer: " + e.getMessage());
        }
    }

    @GetMapping("/recruiters/{id}")
    public ResponseEntity<?> getRecruiterById(@PathVariable Long id) {
        try {
            return recruiterRepository.findById(id)
                    .map(recruiter -> {
                        Map<String, Object> data = new java.util.HashMap<>();
                        data.put("id", recruiter.getId());
                        data.put("companyName", recruiter.getCompanyName());
                        data.put("industry", recruiter.getIndustry());
                        data.put("avgPackage", recruiter.getAvgPackage());
                        data.put("year", recruiter.getYear());
                        data.put("logoPath", recruiter.getLogoPath());
                        return ResponseEntity.ok(data);
                    })
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to fetch recruiter: " + e.getMessage());
        }
    }

    @GetMapping("/placement-drives/{id}")
    public ResponseEntity<?> getPlacementDriveById(@PathVariable Long id) {
        try {
            return placementDriveRepository.findById(id)
                    .map(drive -> {
                        Map<String, Object> data = new java.util.HashMap<>();
                        data.put("id", drive.getId());
                        data.put("companyName", drive.getCompanyName());
                        data.put("driveDate", drive.getDriveDate());
                        data.put("venue", drive.getVenue());
                        data.put("packageOffered", drive.getPackageOffered());
                        data.put("reportingTime", drive.getReportingTime());
                        data.put("imagePath", drive.getImagePath());
                        return ResponseEntity.ok(data);
                    })
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to fetch placement drive: " + e.getMessage());
        }
    }

    @GetMapping("/hod/{deptCode}")
    public ResponseEntity<?> getHodByDepartment(@PathVariable String deptCode) {
        try {
            // Try to find by code first, then by name (for full department names)
            java.util.Optional<Department> deptOpt = departmentRepository.findByCode(deptCode);
            if (deptOpt.isEmpty()) {
                deptOpt = departmentRepository.findByNameIgnoreCase(deptCode);
            }

            return deptOpt.map(dept -> {
                Map<String, Object> data = new java.util.HashMap<>();
                data.put("departmentCode", dept.getCode());
                data.put("hodName", dept.getHodName());
                data.put("hodDesignation", dept.getHodDesignation());
                data.put("hodJoiningYear", dept.getHodJoiningYear());
                data.put("hodPhotoPath", dept.getHodPhotoPath());
                data.put("hodDescription", dept.getHodDescription());
                data.put("hodAcademicBackground", dept.getHodAcademicBackground());
                data.put("hodExperience", dept.getHodExperience());
                data.put("hodSummary", dept.getHodSummary());
                return ResponseEntity.ok(data);
            })
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to fetch HOD: " + e.getMessage());
        }
    }

    // ==================== PUT (Update) ENDPOINTS ====================

    @PutMapping("/faculty/{id}")
    public ResponseEntity<?> updateFaculty(@PathVariable Long id, @RequestBody Map<String, Object> data) {
        try {
            return facultyRepository.findById(id)
                    .map(faculty -> {
                        if (data.get("name") != null)
                            faculty.setName((String) data.get("name"));
                        if (data.get("position") != null)
                            faculty.setPosition((String) data.get("position"));
                        if (data.get("joiningYear") != null)
                            faculty.setJoiningYear(Integer.parseInt(data.get("joiningYear").toString()));
                        if (data.get("photoPath") != null)
                            faculty.setPhotoPath((String) data.get("photoPath"));
                        if (data.get("displayOrder") != null)
                            faculty.setDisplayOrder(Integer.parseInt(data.get("displayOrder").toString()));

                        if (data.get("departmentCode") != null) {
                            String deptCode = (String) data.get("departmentCode");
                            departmentRepository.findByCode(deptCode).ifPresent(faculty::setDepartment);
                        }

                        facultyRepository.save(faculty);
                        return ResponseEntity
                                .ok(Map.of("status", "success", "message", "Faculty updated successfully"));
                    })
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to update faculty: " + e.getMessage());
        }
    }

    @PutMapping("/placement-records/{id}")
    public ResponseEntity<?> updatePlacementRecord(@PathVariable Long id, @RequestBody Map<String, Object> data) {
        try {
            return placementRecordRepository.findById(id)
                    .map(record -> {
                        if (data.get("studentRegNo") != null)
                            record.setStudentRegNo((String) data.get("studentRegNo"));
                        if (data.get("company") != null)
                            record.setCompany((String) data.get("company"));
                        if (data.get("jobRole") != null)
                            record.setJobRole((String) data.get("jobRole"));
                        if (data.get("batch") != null)
                            record.setBatch((String) data.get("batch"));
                        if (data.get("packageAmount") != null)
                            record.setPackageAmount(new BigDecimal(data.get("packageAmount").toString()));

                        placementRecordRepository.save(record);
                        return ResponseEntity
                                .ok(Map.of("status", "success", "message", "Placement record updated successfully"));
                    })
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to update placement record: " + e.getMessage());
        }
    }

    @PutMapping("/placement-officers/{id}")
    public ResponseEntity<?> updatePlacementOfficer(@PathVariable Long id, @RequestBody Map<String, Object> data) {
        try {
            return placementOfficerRepository.findById(id)
                    .map(officer -> {
                        if (data.get("name") != null)
                            officer.setName((String) data.get("name"));
                        if (data.get("position") != null)
                            officer.setPosition((String) data.get("position"));
                        if (data.get("type") != null)
                            officer.setType((String) data.get("type"));
                        if (data.get("photoPath") != null)
                            officer.setPhotoPath((String) data.get("photoPath"));
                        if (data.get("trainingBatch") != null)
                            officer.setTrainingBatch((String) data.get("trainingBatch"));
                        if (data.get("displayOrder") != null)
                            officer.setDisplayOrder(Integer.parseInt(data.get("displayOrder").toString()));

                        placementOfficerRepository.save(officer);
                        return ResponseEntity
                                .ok(Map.of("status", "success", "message", "Placement officer updated successfully"));
                    })
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to update placement officer: " + e.getMessage());
        }
    }

    @PutMapping("/recruiters/{id}")
    public ResponseEntity<?> updateRecruiter(@PathVariable Long id, @RequestBody Map<String, Object> data) {
        try {
            return recruiterRepository.findById(id)
                    .map(recruiter -> {
                        if (data.get("companyName") != null)
                            recruiter.setCompanyName((String) data.get("companyName"));
                        if (data.get("industry") != null)
                            recruiter.setIndustry((String) data.get("industry"));
                        if (data.get("avgPackage") != null)
                            recruiter.setAvgPackage((String) data.get("avgPackage"));
                        if (data.get("year") != null)
                            recruiter.setYear(Integer.parseInt(data.get("year").toString()));
                        if (data.get("logoPath") != null)
                            recruiter.setLogoPath((String) data.get("logoPath"));

                        recruiterRepository.save(recruiter);
                        return ResponseEntity
                                .ok(Map.of("status", "success", "message", "Company updated successfully"));
                    })
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to update company: " + e.getMessage());
        }
    }

    @PutMapping("/placement-drives/{id}")
    public ResponseEntity<?> updatePlacementDrive(@PathVariable Long id, @RequestBody Map<String, Object> data) {
        try {
            return placementDriveRepository.findById(id)
                    .map(drive -> {
                        if (data.get("companyName") != null)
                            drive.setCompanyName((String) data.get("companyName"));
                        if (data.get("venue") != null)
                            drive.setVenue((String) data.get("venue"));
                        if (data.get("packageOffered") != null)
                            drive.setPackageOffered((String) data.get("packageOffered"));
                        if (data.get("reportingTime") != null)
                            drive.setReportingTime((String) data.get("reportingTime"));
                        if (data.get("imagePath") != null)
                            drive.setImagePath((String) data.get("imagePath"));
                        if (data.get("driveDate") != null && !data.get("driveDate").toString().isEmpty()) {
                            drive.setDriveDate(LocalDate.parse(data.get("driveDate").toString()));
                        }

                        placementDriveRepository.save(drive);
                        return ResponseEntity
                                .ok(Map.of("status", "success", "message", "Placement drive updated successfully"));
                    })
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to update placement drive: " + e.getMessage());
        }
    }

    @PutMapping("/hod/{deptCode}")
    public ResponseEntity<?> updateHodByCode(@PathVariable String deptCode, @RequestBody Map<String, Object> data) {
        try {
            return departmentRepository.findByCode(deptCode)
                    .map(dept -> {
                        if (data.get("hodName") != null)
                            dept.setHodName((String) data.get("hodName"));
                        if (data.get("hodDesignation") != null)
                            dept.setHodDesignation((String) data.get("hodDesignation"));
                        if (data.get("hodDescription") != null)
                            dept.setHodDescription((String) data.get("hodDescription"));
                        if (data.get("hodAcademicBackground") != null)
                            dept.setHodAcademicBackground((String) data.get("hodAcademicBackground"));
                        if (data.get("hodExperience") != null)
                            dept.setHodExperience((String) data.get("hodExperience"));
                        if (data.get("hodSummary") != null)
                            dept.setHodSummary((String) data.get("hodSummary"));
                        if (data.get("hodPhotoPath") != null)
                            dept.setHodPhotoPath((String) data.get("hodPhotoPath"));
                        if (data.get("hodJoiningYear") != null)
                            dept.setHodJoiningYear(Integer.parseInt(data.get("hodJoiningYear").toString()));

                        departmentRepository.save(dept);
                        return ResponseEntity.ok(Map.of("status", "success", "message", "HOD updated successfully"));
                    })
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to update HOD: " + e.getMessage());
        }
    }
}
