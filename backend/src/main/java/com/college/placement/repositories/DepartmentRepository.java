package com.college.placement.repositories;

import com.college.placement.models.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Department Repository
 */
@Repository
public interface DepartmentRepository extends JpaRepository<Department, Long> {

    // Find by code
    Optional<Department> findByCode(String code);

    // Find by name (case insensitive)
    Optional<Department> findByNameIgnoreCase(String name);

    // Check if code exists
    boolean existsByCode(String code);
}
