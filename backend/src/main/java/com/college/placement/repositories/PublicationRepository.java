package com.college.placement.repositories;

import com.college.placement.models.Publication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PublicationRepository extends JpaRepository<Publication, Long> {

    // Find all publications by student
    List<Publication> findByStudent_RegisterNumber(String registerNumber);
}
