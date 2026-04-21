package com.college.placement.repositories;

import com.college.placement.models.UpdateRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UpdateRequestRepository extends JpaRepository<UpdateRequest, Long> {

    // Find all update requests by student registration number
    List<UpdateRequest> findByStudentRegNo(String studentRegNo);

    // Find all pending update requests
    List<UpdateRequest> findByStatus(String status);

    // Find all update requests ordered by submission date
    List<UpdateRequest> findAllByOrderBySubmittedOnDesc();

    // Count by status
    long countByStatus(String status);
}
