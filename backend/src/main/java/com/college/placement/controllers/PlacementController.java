package com.college.placement.controllers;

import com.college.placement.dto.response.PlacementOfficerDTO;
import com.college.placement.dto.response.PlacementStatsDTO;
import com.college.placement.services.PlacementDriveService;
import com.college.placement.services.PlacementOfficerService;
import com.college.placement.services.PlacementStatsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * Unified Placement Controller
 * Provides endpoints for placement-related data under /placement
 */
@RestController
@RequestMapping("/placements")
public class PlacementController {

    @Autowired
    private PlacementStatsService placementStatsService;

    @Autowired
    private PlacementOfficerService placementOfficerService;

    @Autowired
    private PlacementDriveService placementDriveService;

    /**
     * Get placement statistics
     * GET /placements/stats
     */
    @GetMapping("/stats")
    public ResponseEntity<PlacementStatsDTO> getStats() {
        return ResponseEntity.ok(placementStatsService.getOverallStats());
    }

    /**
     * Get statistics by batch
     * GET /placements/stats/batch/{batch}
     */
    @GetMapping("/stats/batch/{batch}")
    public ResponseEntity<PlacementStatsDTO> getStatsByBatch(@PathVariable String batch) {
        return ResponseEntity.ok(placementStatsService.getStatsByBatch(batch));
    }

    /**
     * Get today's placement drive
     * GET /placements/today-drive
     */
    @GetMapping("/today-drive")
    public ResponseEntity<Map<String, Object>> getTodayDrive() {
        return ResponseEntity.ok(placementDriveService.getTodayDrive());
    }

    /**
     * Get all placement officers (grouped by heads and trainers)
     * GET /placement/officers
     */
    @GetMapping("/officers")
    public ResponseEntity<Map<String, List<PlacementOfficerDTO>>> getOfficers() {
        return ResponseEntity.ok(placementOfficerService.getAllOfficersGrouped());
    }

    /**
     * Get only placement heads
     * GET /placement/officers/heads
     */
    @GetMapping("/officers/heads")
    public ResponseEntity<List<PlacementOfficerDTO>> getHeads() {
        return ResponseEntity.ok(placementOfficerService.getHeads());
    }

    /**
     * Get only placement trainers
     * GET /placement/officers/trainers
     */
    @GetMapping("/officers/trainers")
    public ResponseEntity<List<PlacementOfficerDTO>> getTrainers() {
        return ResponseEntity.ok(placementOfficerService.getTrainers());
    }
}
