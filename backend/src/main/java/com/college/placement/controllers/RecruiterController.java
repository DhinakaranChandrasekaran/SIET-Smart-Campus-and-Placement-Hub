package com.college.placement.controllers;

import com.college.placement.dto.response.RecruiterDTO;
import com.college.placement.services.RecruiterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Recruiter Controller
 */
@RestController
@RequestMapping("/recruiters")
public class RecruiterController {

    @Autowired
    private RecruiterService recruiterService;

    /**
     * Get all recruiters
     * GET /recruiters
     */
    @GetMapping
    public ResponseEntity<List<RecruiterDTO>> getAllRecruiters() {
        return ResponseEntity.ok(recruiterService.getAllRecruiters());
    }

    /**
     * Get recruiters by year
     * GET /recruiters/year/{year}
     */
    @GetMapping("/year/{year}")
    public ResponseEntity<List<RecruiterDTO>> getRecruitersByYear(@PathVariable Integer year) {
        return ResponseEntity.ok(recruiterService.getRecruitersByYear(year));
    }
}
