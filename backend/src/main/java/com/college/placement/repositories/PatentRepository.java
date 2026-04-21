package com.college.placement.repositories;

import com.college.placement.models.Patent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PatentRepository extends JpaRepository<Patent, Long> {

    // Find all patents by student
    List<Patent> findByStudent_RegisterNumber(String registerNumber);
}
