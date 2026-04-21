package com.college.placement.services;

import com.college.placement.dto.response.PlacementRecordDTO;
import com.college.placement.models.PlacementRecord;
import com.college.placement.models.Student;
import com.college.placement.repositories.PlacementRecordRepository;
import com.college.placement.repositories.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * PlacementRecord Service
 */
@Service
public class PlacementRecordService {

    @Autowired
    private PlacementRecordRepository placementRecordRepository;

    @Autowired
    private StudentRepository studentRepository;

    /**
     * Get all placement records
     */
    public List<PlacementRecordDTO> getAllRecords() {
        return placementRecordRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Get records by batch
     */
    public List<PlacementRecordDTO> getRecordsByBatch(String batch) {
        return placementRecordRepository.findByBatch(batch).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Get records by company
     */
    public List<PlacementRecordDTO> getRecordsByCompany(String company) {
        return placementRecordRepository.findByCompany(company).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Convert entity to DTO
     */
    private PlacementRecordDTO convertToDTO(PlacementRecord record) {
        PlacementRecordDTO dto = new PlacementRecordDTO();
        dto.setId(record.getId());
        dto.setRegNo(record.getStudentRegNo());

        // Fetch student name and department from Student entity
        Optional<Student> studentOpt = studentRepository.findById(record.getStudentRegNo());
        if (studentOpt.isPresent()) {
            Student student = studentOpt.get();
            dto.setName(student.getName());
            dto.setDepartment(student.getDepartment());
        } else {
            dto.setName("Unknown");
            dto.setDepartment("Unknown");
        }

        dto.setCompany(record.getCompany());
        dto.setJobRole(record.getJobRole());
        // Format package as "X LPA" or "X.X LPA"
        if (record.getPackageAmount() != null) {
            String pkgStr = record.getPackageAmount().stripTrailingZeros().toPlainString();
            dto.setPackageAmount(pkgStr + " LPA");
        } else {
            dto.setPackageAmount("N/A");
        }
        dto.setBatch(record.getBatch());
        return dto;
    }
}
