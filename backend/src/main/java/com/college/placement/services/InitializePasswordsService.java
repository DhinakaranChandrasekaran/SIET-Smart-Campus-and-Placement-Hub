package com.college.placement.services;

import com.college.placement.models.Student;
import com.college.placement.models.User;
import com.college.placement.repositories.StudentRepository;
import com.college.placement.repositories.UserRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Initialize Passwords Service - UNIFIED
 * Creates user records for students and hashes all passwords
 * Students: identifier = register_number, password = register_number (BCrypt)
 * Admins: identifier = email, password = admin123 (BCrypt)
 */
@Service
public class InitializePasswordsService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostConstruct
    public void initializePasswords() {
        createStudentUsers();
        initializeUserPasswords();
    }

    /**
     * Create user records for all students
     * identifier = register_number
     * password = register_number (BCrypt encrypted)
     */
    private void createStudentUsers() {
        List<Student> students = studentRepository.findAll();
        int created = 0;
        int updated = 0;

        for (Student student : students) {
            if (student.getRegisterNumber() == null || student.getRegisterNumber().isEmpty()) {
                continue;
            }

            // Check if user already exists
            User existingUser = userRepository.findByIdentifier(student.getRegisterNumber()).orElse(null);

            if (existingUser == null) {
                // Create new user record
                User user = new User();
                user.setIdentifier(student.getRegisterNumber()); // Register number as login ID
                user.setEmail(student.getEmail());
                user.setName(student.getName());
                user.setRole("STUDENT");
                user.setStudentRegisterNumber(student.getRegisterNumber());
                user.setIsActive(true);

                // Password = register_number (BCrypt encrypted)
                String hashedPassword = passwordEncoder.encode(student.getRegisterNumber());
                user.setPassword(hashedPassword);

                userRepository.save(user);
                created++;
            } else {
                // Update existing user if password is temp or missing
                if (existingUser.getPassword() == null ||
                        existingUser.getPassword().isEmpty() ||
                        existingUser.getPassword().equals("$2a$10$TEMP")) {

                    String hashedPassword = passwordEncoder.encode(student.getRegisterNumber());
                    existingUser.setPassword(hashedPassword);
                    userRepository.save(existingUser);
                    updated++;
                }
            }
        }

        System.out.println("✅ Created " + created + " student user records");
        System.out.println("✅ Updated " + updated + " student passwords");
        System.out.println("📝 Students login with: REGISTER NUMBER (password = register number)");
    }

    /**
     * Initialize admin user passwords
     * Default password = "admin123" (BCrypt encrypted)
     */
    private void initializeUserPasswords() {
        List<User> users = userRepository.findAll();
        int count = 0;

        for (User user : users) {
            // Only update admin users with temp passwords
            if (!user.getRole().equals("STUDENT") &&
                    (user.getPassword() == null ||
                            user.getPassword().isEmpty() ||
                            user.getPassword().equals("TEMP_PASSWORD") ||
                            user.getPassword().equals("$2a$10$TEMP"))) {

                // Set default password = "admin123"
                String hashedPassword = passwordEncoder.encode("admin123");
                user.setPassword(hashedPassword);

                // Set identifier = email for admins if not set
                if (user.getIdentifier() == null || user.getIdentifier().isEmpty()) {
                    user.setIdentifier(user.getEmail());
                }

                userRepository.save(user);
                count++;
            }
        }

        if (count > 0) {
            System.out.println("✅ Initialized " + count + " admin passwords (default: admin123)");
            System.out.println("📝 Admins login with: EMAIL (password = admin123)");
            System.out.println("⚠️  IMPORTANT: Change default admin passwords after first login!");
        }
    }
}
