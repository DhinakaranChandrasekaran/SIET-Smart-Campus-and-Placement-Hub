package com.college.placement.repositories;

import com.college.placement.models.Faculty;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Faculty Repository
 */
@Repository
public interface FacultyRepository extends JpaRepository<Faculty, Long> {

    // Find by department code
    @Query("SELECT f FROM Faculty f WHERE f.department.code = :code ORDER BY f.displayOrder ASC")
    List<Faculty> findByDepartmentCode(@Param("code") String code);

    // Find all ordered by display order
    List<Faculty> findAllByOrderByDisplayOrderAsc();

    // Find by name (case-insensitive)
    List<Faculty> findByNameIgnoreCase(String name);

    // Find by name containing (case-insensitive)
    List<Faculty> findByNameContainingIgnoreCase(String name);
}
