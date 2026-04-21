package com.college.placement.controllers;

import com.college.placement.models.UpdateRequest;
import com.college.placement.services.UpdateRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * Update Request Controller
 * Handles student update request submissions and admin review operations
 */
@RestController
@RequestMapping("/update-requests")
public class UpdateRequestController {

    @Autowired
    private UpdateRequestService updateRequestService;

    /**
     * Submit a new update request
     * POST /api/update-requests
     */
    @PostMapping
    public ResponseEntity<?> submitUpdateRequest(@RequestBody Map<String, Object> requestData) {
        try {
            String studentRegNo = (String) requestData.get("studentRegNo");
            String studentName = (String) requestData.get("studentName");
            Object submittedData = requestData.get("submittedData");

            if (studentRegNo == null || studentName == null || submittedData == null) {
                return ResponseEntity.badRequest().body("Missing required fields");
            }

            UpdateRequest savedRequest = updateRequestService.submitUpdateRequest(studentRegNo, studentName,
                    submittedData);
            return ResponseEntity.ok(savedRequest);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }

    /**
     * Get all update requests
     * GET /api/update-requests
     */
    @GetMapping
    public ResponseEntity<List<UpdateRequest>> getAllUpdateRequests() {
        List<UpdateRequest> requests = updateRequestService.getAllUpdateRequests();
        return ResponseEntity.ok(requests);
    }

    /**
     * Get update requests by student registration number
     * GET /api/update-requests/student/{regNo}
     */
    @GetMapping("/student/{regNo}")
    public ResponseEntity<List<UpdateRequest>> getUpdateRequestsByStudent(@PathVariable String regNo) {
        List<UpdateRequest> requests = updateRequestService.getUpdateRequestsByStudentRegNo(regNo);
        return ResponseEntity.ok(requests);
    }

    /**
     * Get pending update requests
     * GET /api/update-requests/pending
     */
    @GetMapping("/pending")
    public ResponseEntity<List<UpdateRequest>> getPendingUpdateRequests() {
        List<UpdateRequest> requests = updateRequestService.getPendingUpdateRequests();
        return ResponseEntity.ok(requests);
    }

    /**
     * Approve an update request
     * PUT /api/update-requests/{id}/approve
     */
    @PutMapping("/{id}/approve")
    public ResponseEntity<UpdateRequest> approveUpdateRequest(
            @PathVariable Long id,
            @RequestBody Map<String, String> reviewData) {

        String reviewedBy = reviewData.get("reviewedBy");
        String comments = reviewData.get("comments");

        UpdateRequest approved = updateRequestService.approveUpdateRequest(id, reviewedBy, comments);
        return ResponseEntity.ok(approved);
    }

    /**
     * Reject an update request
     * PUT /api/update-requests/{id}/reject
     */
    @PutMapping("/{id}/reject")
    public ResponseEntity<UpdateRequest> rejectUpdateRequest(
            @PathVariable Long id,
            @RequestBody Map<String, String> reviewData) {

        String reviewedBy = reviewData.get("reviewedBy");
        String comments = reviewData.get("comments");

        UpdateRequest rejected = updateRequestService.rejectUpdateRequest(id, reviewedBy, comments);
        return ResponseEntity.ok(rejected);
    }
}
