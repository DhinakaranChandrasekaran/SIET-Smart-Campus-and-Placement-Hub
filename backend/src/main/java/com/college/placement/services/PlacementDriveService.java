package com.college.placement.services;

import com.college.placement.models.PlacementDrive;
import com.college.placement.repositories.PlacementDriveRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

/**
 * PlacementDrive Service
 */

@Service
public class PlacementDriveService {

    @Autowired
    private PlacementDriveRepository placementDriveRepository;

    /**
     * Get today's placement drive from database
     */
    public Map<String, Object> getTodayDrive() {
        Map<String, Object> result = new HashMap<>();

        try {
            Optional<PlacementDrive> driveOpt = placementDriveRepository.findTodayDrive(LocalDate.now());

            if (driveOpt.isPresent()) {
                PlacementDrive drive = driveOpt.get();
                result.put("available", true);
                result.put("company", drive.getCompanyName());
                result.put("companyLogo", drive.getImagePath() != null ? drive.getImagePath() : "");
                result.put("date", drive.getDriveDate().format(DateTimeFormatter.ofPattern("dd MMM yyyy")));
                result.put("package", drive.getPackageOffered() != null ? drive.getPackageOffered() : "");
                result.put("reportingTime", drive.getReportingTime() != null ? drive.getReportingTime() : "");
                result.put("venue", drive.getVenue() != null ? drive.getVenue() : "");
            } else {
                // No drive scheduled for today in database
                result.put("available", false);
            }
        } catch (Exception e) {
            // Database error
            result.put("available", false);
            result.put("error", e.getMessage());
        }

        return result;
    }
}
