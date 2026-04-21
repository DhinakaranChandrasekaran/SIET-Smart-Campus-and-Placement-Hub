package com.college.placement.services;

import com.college.placement.dto.response.FacultyDTO;
import com.college.placement.models.Faculty;
import com.college.placement.repositories.FacultyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Faculty Service
 */
@Service
public class FacultyService {

    @Autowired
    private FacultyRepository facultyRepository;

    /**
     * Get all faculty
     */
    public List<FacultyDTO> getAllFaculty() {
        return facultyRepository.findAllByOrderByDisplayOrderAsc().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Get faculty by department code
     */
    public List<FacultyDTO> getFacultyByDepartment(String code) {
        return facultyRepository.findByDepartmentCode(code).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Convert entity to DTO
     */
    private FacultyDTO convertToDTO(Faculty faculty) {
        FacultyDTO dto = new FacultyDTO();
        dto.setName(faculty.getName());
        dto.setPosition(faculty.getPosition());
        dto.setJoiningYear(faculty.getJoiningYear());
        dto.setPhoto(faculty.getPhotoPath());
        return dto;
    }
}
