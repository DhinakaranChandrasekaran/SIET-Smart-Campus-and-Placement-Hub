package com.college.placement.controllers;

import com.college.placement.dto.response.PlacementRecordDTO;
import com.college.placement.services.PlacementRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * PlacementRecord Controller
 */
@RestController
@RequestMapping("/placements/records")
public class PlacementRecordController {

    @Autowired
    private PlacementRecordService placementRecordService;

    /**
     * Get all placement records
     * GET /placements/records
     */
    @GetMapping
    public ResponseEntity<List<PlacementRecordDTO>> getAllRecords() {
        return ResponseEntity.ok(placementRecordService.getAllRecords());
    }

    /**
     * Get records by batch
     * GET /placements/records/batch/{batch}
     */
    @GetMapping("/batch/{batch}")
    public ResponseEntity<List<PlacementRecordDTO>> getRecordsByBatch(@PathVariable String batch) {
        return ResponseEntity.ok(placementRecordService.getRecordsByBatch(batch));
    }

    /**
     * Get records by company
     * GET /placements/records/company/{company}
     */
    @GetMapping("/company/{company}")
    public ResponseEntity<List<PlacementRecordDTO>> getRecordsByCompany(@PathVariable String company) {
        return ResponseEntity.ok(placementRecordService.getRecordsByCompany(company));
    }
}
