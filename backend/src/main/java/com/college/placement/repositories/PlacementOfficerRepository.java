package com.college.placement.repositories;

import com.college.placement.models.PlacementOfficer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * PlacementOfficer Repository
 */
@Repository
public interface PlacementOfficerRepository extends JpaRepository<PlacementOfficer, Long> {

    // Find by type
    List<PlacementOfficer> findByType(String type);

    // Find heads ordered by display order
    List<PlacementOfficer> findByTypeOrderByDisplayOrderAsc(String type);

    // Find all ordered by display order
    List<PlacementOfficer> findAllByOrderByDisplayOrderAsc();

    // Find by name (case-insensitive)
    List<PlacementOfficer> findByNameIgnoreCase(String name);

    // Find by name containing (case-insensitive)
    List<PlacementOfficer> findByNameContainingIgnoreCase(String name);
}
