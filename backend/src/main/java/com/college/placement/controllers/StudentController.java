package com.college.placement.controllers;

import com.college.placement.dto.request.StudentFilterRequest;
import com.college.placement.dto.response.BatchInfoDTO;
import com.college.placement.dto.response.FilterOptionsDTO;
import com.college.placement.dto.response.StudentDTO;
import com.college.placement.services.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Student Controller
 * Handles all student-related endpoints
 */
@RestController
@RequestMapping("/students")
public class StudentController {

    @Autowired
    private StudentService studentService;

    /**
     * Get student by register number
     * GET /students/{regNo}
     */
    @GetMapping("/{regNo}")
    public ResponseEntity<StudentDTO> getStudent(@PathVariable String regNo) {
        StudentDTO student = studentService.getStudentByRegisterNumber(regNo);
        return ResponseEntity.ok(student);
    }

    /**
     * Get all students
     * GET /students
     */
    @GetMapping
    public ResponseEntity<List<StudentDTO>> getAllStudents() {
        List<StudentDTO> students = studentService.getAllStudents();
        return ResponseEntity.ok(students);
    }

    /**
     * Get students by department
     * GET /students/department/{dept}
     */
    @GetMapping("/department/{dept}")
    public ResponseEntity<List<StudentDTO>> getStudentsByDepartment(@PathVariable String dept) {
        List<StudentDTO> students = studentService.getStudentsByDepartment(dept);
        return ResponseEntity.ok(students);
    }

    /**
     * Get students by year of passing
     * GET /students/year/{year}
     */
    @GetMapping("/year/{year}")
    public ResponseEntity<List<StudentDTO>> getStudentsByYear(@PathVariable String year) {
        List<StudentDTO> students = studentService.getStudentsByYear(year);
        return ResponseEntity.ok(students);
    }

    /**
     * Get students by training batch
     * GET /students/training/{batch}
     */
    @GetMapping("/training/{batch}")
    public ResponseEntity<List<StudentDTO>> getStudentsByTraining(@PathVariable String batch) {
        List<StudentDTO> students = studentService.getStudentsByTrainingBatch(batch);
        return ResponseEntity.ok(students);
    }

    /**
     * Search students by name
     * GET /students/search?name={name}
     */
    @GetMapping("/search")
    public ResponseEntity<List<StudentDTO>> searchStudents(@RequestParam String name) {
        List<StudentDTO> students = studentService.searchStudentsByName(name);
        return ResponseEntity.ok(students);
    }

    /**
     * Get all distinct academic years (batches)
     * GET /students/batches
     */
    @GetMapping("/batches")
    public ResponseEntity<List<String>> getAllBatches() {
        List<String> batches = studentService.getAllDistinctBatches();
        return ResponseEntity.ok(batches);
    }

    /**
     * Get all distinct departments for a specific batch
     * GET /students/departments?batch={batch}
     */
    @GetMapping("/departments")
    public ResponseEntity<List<String>> getDepartmentsByBatch(@RequestParam(required = false) String batch) {
        List<String> departments;
        if (batch != null && !batch.isEmpty()) {
            departments = studentService.getDepartmentsByBatch(batch);
        } else {
            departments = studentService.getAllDistinctDepartments();
        }
        return ResponseEntity.ok(departments);
    }

    /**
     * Get batches with computed status (Completed, Ongoing, Upcoming)
     * GET /students/batches-with-status
     */
    @GetMapping("/batches-with-status")
    public ResponseEntity<List<BatchInfoDTO>> getBatchesWithStatus() {
        List<BatchInfoDTO> batches = studentService.getBatchesWithStatus();
        return ResponseEntity.ok(batches);
    }

    /**
     * Get all distinct training batches (Java, Python, etc.)
     * GET /students/training-batches
     */
    @GetMapping("/training-batches")
    public ResponseEntity<List<String>> getTrainingBatches() {
        List<String> batches = studentService.getAllDistinctTrainingBatches();
        return ResponseEntity.ok(batches);
    }

    /**
     * Get filter options for admin shortlisting
     * GET /students/filter-options
     */
    @GetMapping("/filter-options")
    public ResponseEntity<FilterOptionsDTO> getFilterOptions() {
        FilterOptionsDTO options = studentService.getFilterOptions();
        return ResponseEntity.ok(options);
    }

    /**
     * Filter students based on criteria (server-side filtering)
     * POST /students/filter
     */
    @PostMapping("/filter")
    public ResponseEntity<List<StudentDTO>> filterStudents(@RequestBody StudentFilterRequest request) {
        List<StudentDTO> students = studentService.filterStudents(request);
        return ResponseEntity.ok(students);
    }
}
