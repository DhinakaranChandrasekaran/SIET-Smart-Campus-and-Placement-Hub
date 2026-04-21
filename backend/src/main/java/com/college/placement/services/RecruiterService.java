package com.college.placement.services;

import com.college.placement.dto.response.RecruiterDTO;
import com.college.placement.models.Recruiter;
import com.college.placement.repositories.RecruiterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Recruiter Service
 */
@Service
public class RecruiterService {

    @Autowired
    private RecruiterRepository recruiterRepository;

    /**
     * Get all recruiters
     */
    public List<RecruiterDTO> getAllRecruiters() {
        return recruiterRepository.findAllByOrderByYearDesc().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Get recruiters by year
     */
    public List<RecruiterDTO> getRecruitersByYear(Integer year) {
        return recruiterRepository.findByYear(year).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Convert entity to DTO
     */
    private RecruiterDTO convertToDTO(Recruiter recruiter) {
        RecruiterDTO dto = new RecruiterDTO();
        dto.setName(recruiter.getCompanyName());
        dto.setLogo(recruiter.getLogoPath());
        dto.setIndustry(recruiter.getIndustry() != null ? recruiter.getIndustry() : "IT Services");
        // Use actual avgPackage from database, or default if null
        dto.setAvgPackage(recruiter.getAvgPackage() != null ? recruiter.getAvgPackage() : "4.5 LPA");
        dto.setVisitingSince(recruiter.getYear() != null ? recruiter.getYear().toString() : "2020");
        return dto;
    }
}
