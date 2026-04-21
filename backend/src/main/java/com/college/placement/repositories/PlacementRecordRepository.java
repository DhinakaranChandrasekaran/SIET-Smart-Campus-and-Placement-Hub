package com.college.placement.repositories;

import com.college.placement.models.PlacementRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * PlacementRecord Repository
 */
@Repository
public interface PlacementRecordRepository extends JpaRepository<PlacementRecord, Long> {

    // Find by batch
    List<PlacementRecord> findByBatch(String batch);

    // Find by company
    List<PlacementRecord> findByCompany(String company);

    // Find by student register number
    List<PlacementRecord> findByStudentRegNo(String studentRegNo);

    // Count by batch
    @Query("SELECT COUNT(p) FROM PlacementRecord p WHERE p.batch = :batch")
    Long countByBatch(@Param("batch") String batch);

    // Get all batches (distinct)
    @Query("SELECT DISTINCT p.batch FROM PlacementRecord p ORDER BY p.batch DESC")
    List<String> findAllDistinctBatches();

    // Get all companies (distinct)
    @Query("SELECT DISTINCT p.company FROM PlacementRecord p ORDER BY p.company")
    List<String> findAllDistinctCompanies();

    // Count distinct students placed
    @Query("SELECT COUNT(DISTINCT p.studentRegNo) FROM PlacementRecord p")
    long countDistinctStudents();

    // Get top companies by number of hires
    @Query("SELECT p.company, COUNT(p) AS hireCount FROM PlacementRecord p GROUP BY p.company ORDER BY hireCount DESC")
    List<Object[]> getTopCompaniesByHires();
}