package com.college.placement.controllers;

import com.college.placement.dto.request.LoginRequest;
import com.college.placement.dto.response.LoginResponse;
import com.college.placement.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Authentication Controller
 * Handles login for both students and admin
 */
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    /**
     * Login endpoint
     * POST /auth/login
     * 
     * For Students: identifier = registerNumber, password = registerNumber
     * For Admin: identifier = admin@siet.ac.in, password = admin
     */
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        try {
            LoginResponse response = authService.login(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            throw new RuntimeException("Login failed: " + e.getMessage());
        }
    }

    /**
     * Verify token endpoint
     * GET /auth/verify
     */
    @GetMapping("/verify")
    public ResponseEntity<String> verifyToken(@RequestHeader("Authorization") String token) {
        // Token verification logic can be added here
        return ResponseEntity.ok("Token is valid");
    }
}
