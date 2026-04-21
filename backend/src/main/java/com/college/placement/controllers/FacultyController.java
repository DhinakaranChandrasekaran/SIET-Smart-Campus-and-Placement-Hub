package com.college.placement.controllers;

import com.college.placement.dto.response.FacultyDTO;
import com.college.placement.services.FacultyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Faculty Controller
 */
@RestController
@RequestMapping("/faculty")
public class FacultyController {

    @Autowired
    private FacultyService facultyService;

    /**
     * Get all faculty
     * GET /faculty
     */
    @GetMapping
    public ResponseEntity<List<FacultyDTO>> getAllFaculty() {
        return ResponseEntity.ok(facultyService.getAllFaculty());
    }

    /**
     * Get faculty by department code
     * GET /faculty/department/{code}
     */
    @GetMapping("/department/{code}")
    public ResponseEntity<List<FacultyDTO>> getFacultyByDepartment(@PathVariable String code) {
        return ResponseEntity.ok(facultyService.getFacultyByDepartment(code));
    }
}
