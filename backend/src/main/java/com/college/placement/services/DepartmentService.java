package com.college.placement.services;

import com.college.placement.dto.response.DepartmentDTO;
import com.college.placement.dto.response.FacultyDTO;
import com.college.placement.models.Department;
import com.college.placement.models.Faculty;
import com.college.placement.repositories.DepartmentRepository;
import com.college.placement.repositories.StudentRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Department Service
 */
@Service
public class DepartmentService {

    @Autowired
    private DepartmentRepository departmentRepository;

    @Autowired
    private StudentRepository studentRepository;

    private final ObjectMapper objectMapper = new ObjectMapper();

    /**
     * Get all departments
     */
    @Transactional(readOnly = true)
    public List<DepartmentDTO> getAllDepartments() {
        return departmentRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Get department by code
     */
    @Transactional(readOnly = true)
    public DepartmentDTO getDepartmentByCode(String code) {
        Department department = departmentRepository.findByCode(code)
                .orElseThrow(() -> new RuntimeException("Department not found: " + code));
        return convertToDTO(department);
    }

    /**
     * Convert entity to DTO
     */
    private DepartmentDTO convertToDTO(Department dept) {
        DepartmentDTO dto = new DepartmentDTO();

        dto.setId(dept.getCode());
        dto.setName(dept.getName());
        dto.setImage(dept.getImagePath());

        // Count students in this department (using name since students store full name)
        long studentCount = studentRepository.countByDepartment(dept.getName());
        dto.setStudentCount(studentCount);

        // Static content (about, vision, mission, objectives) now in frontend

        // HOD details
        DepartmentDTO.HodDTO hod = new DepartmentDTO.HodDTO();
        hod.setName(dept.getHodName());
        hod.setDesignation(dept.getHodDesignation());
        hod.setPhoto(dept.getHodPhotoPath());
        hod.setJoiningYear(dept.getHodJoiningYear());

        // HOD Profile
        DepartmentDTO.HodProfileDTO profile = new DepartmentDTO.HodProfileDTO();
        profile.setDescription(dept.getHodDescription());

        // Parse academic background (JSON array)
        if (dept.getHodAcademicBackground() != null && !dept.getHodAcademicBackground().isEmpty()) {
            try {
                List<String> academicBg = objectMapper.readValue(dept.getHodAcademicBackground(),
                        new TypeReference<List<String>>() {
                        });
                profile.setAcademicBackground(academicBg);
            } catch (Exception e) {
                profile.setAcademicBackground(new ArrayList<>());
            }
        }

        // Parse experience (JSON array of objects)
        if (dept.getHodExperience() != null && !dept.getHodExperience().isEmpty()) {
            try {
                List<DepartmentDTO.ExperienceDTO> experience = objectMapper.readValue(
                        dept.getHodExperience(),
                        new TypeReference<List<DepartmentDTO.ExperienceDTO>>() {
                        });
                profile.setExperience(experience);
            } catch (Exception e) {
                profile.setExperience(new ArrayList<>());
            }
        }

        profile.setSummary(dept.getHodSummary());
        hod.setProfile(profile);
        dto.setHod(hod);

        // Staff
        List<FacultyDTO> staff = dept.getStaff().stream()
                .map(this::convertFacultyToDTO)
                .collect(Collectors.toList());
        dto.setStaff(staff);

        return dto;
    }

    /**
     * Convert Faculty entity to DTO
     */
    private FacultyDTO convertFacultyToDTO(Faculty faculty) {
        FacultyDTO dto = new FacultyDTO();
        dto.setId(faculty.getId());
        dto.setName(faculty.getName());
        dto.setPosition(faculty.getPosition());
        dto.setJoiningYear(faculty.getJoiningYear());
        dto.setPhoto(faculty.getPhotoPath());
        return dto;
    }
}
