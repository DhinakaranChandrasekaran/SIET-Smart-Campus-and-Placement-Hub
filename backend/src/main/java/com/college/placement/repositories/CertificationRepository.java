package com.college.placement.repositories;

import com.college.placement.models.Certification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CertificationRepository extends JpaRepository<Certification, Long> {

    // Find all certifications by student
    List<Certification> findByStudent_RegisterNumber(String registerNumber);
}
