package com.college.placement.repositories;

import com.college.placement.models.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {

    // Find all projects by student
    List<Project> findByStudent_RegisterNumber(String registerNumber);

    // Get all distinct project domains
    @Query("SELECT DISTINCT p.domain FROM Project p WHERE p.domain IS NOT NULL ORDER BY p.domain")
    List<String> findDistinctDomains();
}
