package com.college.placement.services;

import com.college.placement.dto.response.PlacementOfficerDTO;
import com.college.placement.models.PlacementOfficer;
import com.college.placement.repositories.PlacementOfficerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * PlacementOfficer Service
 */
@Service
public class PlacementOfficerService {

    @Autowired
    private PlacementOfficerRepository placementOfficerRepository;

    /**
     * Get all officers grouped by type (heads and trainers)
     */
    public Map<String, List<PlacementOfficerDTO>> getAllOfficersGrouped() {
        Map<String, List<PlacementOfficerDTO>> result = new HashMap<>();

        List<PlacementOfficerDTO> heads = placementOfficerRepository
                .findByTypeOrderByDisplayOrderAsc("HEAD").stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());

        List<PlacementOfficerDTO> trainers = placementOfficerRepository
                .findByTypeOrderByDisplayOrderAsc("TRAINER").stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());

        result.put("heads", heads);
        result.put("trainers", trainers);

        return result;
    }

    /**
     * Get only heads
     */
    public List<PlacementOfficerDTO> getHeads() {
        return placementOfficerRepository.findByTypeOrderByDisplayOrderAsc("HEAD").stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Get only trainers
     */
    public List<PlacementOfficerDTO> getTrainers() {
        return placementOfficerRepository.findByTypeOrderByDisplayOrderAsc("TRAINER").stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Convert entity to DTO
     */
    private PlacementOfficerDTO convertToDTO(PlacementOfficer officer) {
        PlacementOfficerDTO dto = new PlacementOfficerDTO();
        dto.setId(officer.getId());
        dto.setName(officer.getName());
        dto.setPosition(officer.getPosition());
        dto.setPhoto(officer.getPhotoPath());
        dto.setTrainingBatch(officer.getTrainingBatch());
        return dto;
    }
}
