package com.college.placement.controllers;

import com.college.placement.services.PasswordResetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * Password Reset Controller
 * Handles forgot password and reset password requests
 */
@RestController
@RequestMapping("/auth")
public class PasswordResetController {

    @Autowired
    private PasswordResetService passwordResetService;

    /**
     * Request password reset
     * POST /auth/forgot-password
     * Body: { "identifier": "register_number or email" }
     */
    @PostMapping("/forgot-password")
    public ResponseEntity<Map<String, String>> forgotPassword(@RequestBody Map<String, String> request) {
        try {
            String identifier = request.get("identifier");
            passwordResetService.requestPasswordReset(identifier);
            return ResponseEntity.ok(Map.of(
                    "message", "Password reset email sent successfully",
                    "status", "success"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                    "message", e.getMessage(),
                    "status", "error"));
        }
    }

    /**
     * Reset password with token
     * POST /auth/reset-password
     * Body: { "token": "reset_token", "newPassword": "new_password" }
     */
    @PostMapping("/reset-password")
    public ResponseEntity<Map<String, String>> resetPassword(@RequestBody Map<String, String> request) {
        try {
            String token = request.get("token");
            String newPassword = request.get("newPassword");
            passwordResetService.resetPassword(token, newPassword);
            return ResponseEntity.ok(Map.of(
                    "message", "Password reset successful",
                    "status", "success"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                    "message", e.getMessage(),
                    "status", "error"));
        }
    }

    /**
     * Validate reset token
     * GET /auth/validate-token/{token}
     */
    @GetMapping("/validate-token/{token}")
    public ResponseEntity<Map<String, Object>> validateToken(@PathVariable String token) {
        boolean valid = passwordResetService.validateToken(token);
        return ResponseEntity.ok(Map.of(
                "valid", valid,
                "message", valid ? "Token is valid" : "Token is invalid or expired"));
    }
}
