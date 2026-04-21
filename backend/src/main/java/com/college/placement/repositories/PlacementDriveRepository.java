package com.college.placement.repositories;

import com.college.placement.models.PlacementDrive;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

/**
 * PlacementDrive Repository
 */
@Repository
public interface PlacementDriveRepository extends JpaRepository<PlacementDrive, Long> {

    // Find by date
    List<PlacementDrive> findByDriveDate(LocalDate date);

    // Find today's drive
    @Query("SELECT p FROM PlacementDrive p WHERE p.driveDate = :today")
    Optional<PlacementDrive> findTodayDrive(@Param("today") LocalDate today);

    // Find upcoming drives
    @Query("SELECT p FROM PlacementDrive p WHERE p.driveDate >= :today ORDER BY p.driveDate ASC")
    List<PlacementDrive> findUpcomingDrives(@Param("today") LocalDate today);

    // Find recent drives
    @Query("SELECT p FROM PlacementDrive p ORDER BY p.driveDate DESC")
    List<PlacementDrive> findRecentDrives();
}
