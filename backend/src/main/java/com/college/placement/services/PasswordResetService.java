package com.college.placement.services;

import com.college.placement.models.Student;
import com.college.placement.models.User;
import com.college.placement.repositories.StudentRepository;
import com.college.placement.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

/**
 * Password Reset Service
 * Handles password reset for both students and users
 */
@Service
public class PasswordResetService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private EmailService emailService;

    /**
     * Request password reset
     * Generates token and sends email
     * 
     * @param identifier - register_number for students, email for users
     */
    public void requestPasswordReset(String identifier) {
        String resetToken = UUID.randomUUID().toString();
        LocalDateTime expiry = LocalDateTime.now().plusHours(1); // 1 hour expiry

        // Check if student (no @ symbol)
        if (!identifier.contains("@")) {
            Student student = studentRepository.findById(identifier)
                    .orElseThrow(() -> new RuntimeException("Student not found"));

            student.setResetToken(resetToken);
            student.setResetTokenExpiry(expiry);
            studentRepository.save(student);

            // Send email
            emailService.sendPasswordResetEmail(student.getEmail(), resetToken, student.getName());
        }
        // User (has @ symbol)
        else {
            User user = userRepository.findByEmail(identifier)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            user.setResetToken(resetToken);
            user.setResetTokenExpiry(expiry);
            userRepository.save(user);

            // Send email
            emailService.sendPasswordResetEmail(user.getEmail(), resetToken, user.getName());
        }
    }

    /**
     * Reset password with token
     * 
     * @param token       - Reset token from email
     * @param newPassword - New password (will be BCrypt encrypted)
     */
    public void resetPassword(String token, String newPassword) {
        // Try to find student with token
        Optional<Student> studentOpt = studentRepository.findByResetToken(token);
        if (studentOpt.isPresent()) {
            Student student = studentOpt.get();

            // Check if token expired
            if (student.getResetTokenExpiry().isBefore(LocalDateTime.now())) {
                throw new RuntimeException("Reset token has expired. Please request a new one.");
            }

            // Update password (BCrypt encrypted)
            student.setPassword(passwordEncoder.encode(newPassword));
            student.setResetToken(null);
            student.setResetTokenExpiry(null);
            studentRepository.save(student);

            // CRITICAL: Also update the user record (used for login)
            Optional<User> userOpt = userRepository.findByIdentifier(student.getRegisterNumber());
            if (userOpt.isPresent()) {
                User user = userOpt.get();
                user.setPassword(passwordEncoder.encode(newPassword));
                userRepository.save(user);
            }
            return;
        }

        // Try to find user with token
        Optional<User> userOpt = userRepository.findByResetToken(token);
        if (userOpt.isPresent()) {
            User user = userOpt.get();

            // Check if token expired
            if (user.getResetTokenExpiry().isBefore(LocalDateTime.now())) {
                throw new RuntimeException("Reset token has expired. Please request a new one.");
            }

            // Update password (BCrypt encrypted)
            user.setPassword(passwordEncoder.encode(newPassword));
            user.setResetToken(null);
            user.setResetTokenExpiry(null);
            userRepository.save(user);
            return;
        }

        throw new RuntimeException("Invalid reset token");
    }

    /**
     * Validate reset token
     * 
     * @param token - Reset token to validate
     * @return true if valid and not expired
     */
    public boolean validateToken(String token) {
        // Check student
        Optional<Student> student = studentRepository.findByResetToken(token);
        if (student.isPresent()) {
            return student.get().getResetTokenExpiry().isAfter(LocalDateTime.now());
        }

        // Check user
        Optional<User> user = userRepository.findByResetToken(token);
        if (user.isPresent()) {
            return user.get().getResetTokenExpiry().isAfter(LocalDateTime.now());
        }

        return false;
    }
}
