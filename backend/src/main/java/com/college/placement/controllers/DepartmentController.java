package com.college.placement.controllers;

import com.college.placement.dto.response.DepartmentDTO;
import com.college.placement.services.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Department Controller
 */
@RestController
@RequestMapping("/departments")
public class DepartmentController {

    @Autowired
    private DepartmentService departmentService;

    /**
     * Get all departments
     * GET /departments
     */
    @GetMapping
    public ResponseEntity<List<DepartmentDTO>> getAllDepartments() {
        return ResponseEntity.ok(departmentService.getAllDepartments());
    }

    /**
     * Get department by code
     * GET /departments/{code}
     */
    @GetMapping("/{code}")
    public ResponseEntity<DepartmentDTO> getDepartmentByCode(@PathVariable String code) {
        return ResponseEntity.ok(departmentService.getDepartmentByCode(code));
    }
}
