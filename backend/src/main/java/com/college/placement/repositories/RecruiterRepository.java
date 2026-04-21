package com.college.placement.repositories;

import com.college.placement.models.Recruiter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Recruiter Repository
 */
@Repository
public interface RecruiterRepository extends JpaRepository<Recruiter, Long> {

    // Find by year
    List<Recruiter> findByYear(Integer year);

    // Find all ordered by year descending
    List<Recruiter> findAllByOrderByYearDesc();

    // Find by company name
    List<Recruiter> findByCompanyName(String companyName);
}
