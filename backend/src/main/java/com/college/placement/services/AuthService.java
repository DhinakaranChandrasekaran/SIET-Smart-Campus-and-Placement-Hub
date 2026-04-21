package com.college.placement.services;

import com.college.placement.dto.request.LoginRequest;
import com.college.placement.dto.response.LoginResponse;
import com.college.placement.models.Faculty;
import com.college.placement.models.PlacementOfficer;
import com.college.placement.models.Student;
import com.college.placement.models.User;
import com.college.placement.repositories.FacultyRepository;
import com.college.placement.repositories.PlacementOfficerRepository;
import com.college.placement.repositories.StudentRepository;
import com.college.placement.repositories.UserRepository;
import com.college.placement.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

/**
 * Authentication Service - UNIFIED
 * Students login with REGISTER NUMBER
 * Admin login with EMAIL (admin@siet.ac.in)
 * Faculty/HOD/Officers/Trainers login with name-based @siet.ac.in email
 * 
 * Flow for faculty/HOD/officers:
 * 1. User enters email like "priya@siet.ac.in"
 * 2. If User exists in users table → normal login
 * 3. If NOT found → search Faculty/PlacementOfficer tables by name prefix
 * 4. Auto-create User entry with default password and appropriate role
 */
@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private FacultyRepository facultyRepository;

    @Autowired
    private PlacementOfficerRepository placementOfficerRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    private static final String DEFAULT_STAFF_PASSWORD = "siet@123";

    /**
     * Unified login for all users
     */
    public LoginResponse login(LoginRequest request) {
        String identifier = request.getIdentifier();
        String password = request.getPassword();

        // Try to find existing user
        Optional<User> existingUser = userRepository.findByIdentifier(identifier);

        if (existingUser.isPresent()) {
            return authenticateUser(existingUser.get(), password);
        }

        // If identifier is @siet.ac.in email and user not found,
        // try to auto-register from Faculty/PlacementOfficer tables
        if (identifier.endsWith("@siet.ac.in")) {
            User autoCreatedUser = tryAutoRegisterStaff(identifier, password);
            if (autoCreatedUser != null) {
                return authenticateUser(autoCreatedUser, password);
            }
        }

        throw new RuntimeException("User not found with identifier: " + identifier);
    }

    /**
     * Authenticate an existing user
     */
    private LoginResponse authenticateUser(User user, String password) {
        // Check if account is active
        if (!user.getIsActive()) {
            throw new RuntimeException("Account is deactivated. Please contact administrator.");
        }

        // Verify BCrypt password
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        // Update last login
        user.setLastLogin(LocalDateTime.now());
        userRepository.save(user);

        // Generate JWT token
        String token = jwtTokenProvider.generateToken(user.getIdentifier(), user.getRole());

        // Create response
        LoginResponse response = new LoginResponse();
        response.setToken(token);
        response.setIdentifier(user.getIdentifier());
        response.setName(user.getName());
        response.setRole(user.getRole());
        response.setEmail(user.getEmail());

        // If student, include student-specific data
        if ("STUDENT".equals(user.getRole()) && user.getStudentRegisterNumber() != null) {
            Student student = studentRepository.findById(user.getStudentRegisterNumber())
                    .orElse(null);

            if (student != null) {
                response.setDepartment(student.getDepartment());
                response.setPhotoPath(student.getPhotoPath());
                response.setRegisterNumber(student.getRegisterNumber());
                response.setAcademicYear(student.getAcademicYear());
            }
        }

        return response;
    }

    /**
     * Try to auto-register a staff member (faculty/HOD/officer/trainer)
     * based on their @siet.ac.in email
     * 
     * Email format: {name-prefix}@siet.ac.in
     * e.g., "priya@siet.ac.in" matches Faculty named "Dr. Priya S"
     * "ramesh@siet.ac.in" matches Faculty named "Ramesh Kumar"
     */
    private User tryAutoRegisterStaff(String email, String password) {
        // Extract name prefix from email (before @)
        String namePrefix = email.split("@")[0].trim().toLowerCase();

        // Don't auto-register admin accounts
        if ("admin".equals(namePrefix)) {
            return null;
        }

        // Search Faculty table
        List<Faculty> matchingFaculty = facultyRepository.findByNameContainingIgnoreCase(namePrefix);
        if (!matchingFaculty.isEmpty()) {
            Faculty faculty = matchingFaculty.get(0);
            String role = determineRole(faculty.getPosition());

            User newUser = createStaffUser(email, faculty.getName(), role);
            System.out.println("✅ Auto-registered faculty: " + faculty.getName() + " as " + role);
            return newUser;
        }

        // Search PlacementOfficer table
        List<PlacementOfficer> matchingOfficers = placementOfficerRepository.findByNameContainingIgnoreCase(namePrefix);
        if (!matchingOfficers.isEmpty()) {
            PlacementOfficer officer = matchingOfficers.get(0);
            String role = "HEAD".equals(officer.getType()) ? "PLACEMENT_OFFICER" : "TRAINER";

            User newUser = createStaffUser(email, officer.getName(), role);
            System.out.println("✅ Auto-registered officer: " + officer.getName() + " as " + role);
            return newUser;
        }

        return null; // No matching staff found
    }

    /**
     * Determine role from faculty position
     */
    private String determineRole(String position) {
        if (position == null)
            return "FACULTY";
        String pos = position.toLowerCase();
        if (pos.contains("hod") || pos.contains("head of department"))
            return "HOD";
        if (pos.contains("principal"))
            return "PRINCIPAL";
        if (pos.contains("dean"))
            return "DEAN";
        return "FACULTY";
    }

    /**
     * Create a User entry for a staff member
     */
    private User createStaffUser(String email, String name, String role) {
        User user = new User();
        user.setIdentifier(email);
        user.setEmail(email);
        user.setName(name);
        user.setRole(role);
        user.setPassword(passwordEncoder.encode(DEFAULT_STAFF_PASSWORD));
        user.setIsActive(true);
        return userRepository.save(user);
    }
}
