package com.college.placement.repositories;

import com.college.placement.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * User Repository - For Admin Users
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    /**
     * Find user by identifier (register_number for students, email for admins)
     */
    Optional<User> findByIdentifier(String identifier);

    /**
     * Find user by email
     */
    Optional<User> findByEmail(String email);

    /**
     * Find user by reset token
     */
    Optional<User> findByResetToken(String resetToken);

    /**
     * Check if email exists
     */
    boolean existsByEmail(String email);
}
