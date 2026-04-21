package com.college.placement.services;

import com.college.placement.dto.response.PlacementStatsDTO;
import com.college.placement.repositories.PlacementRecordRepository;
import com.college.placement.repositories.RecruiterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * PlacementStats Service
 * Calculates placement statistics
 */
@Service
public class PlacementStatsService {

    @Autowired
    private PlacementRecordRepository placementRecordRepository;

    @Autowired
    private RecruiterRepository recruiterRepository;

    /**
     * Get overall placement statistics
     */
    public PlacementStatsDTO getOverallStats() {
        PlacementStatsDTO stats = new PlacementStatsDTO();

        // Total offers
        Long totalOffers = placementRecordRepository.count();
        stats.setTotalOffersMade(totalOffers.intValue());

        // Companies visited
        Long companiesCount = recruiterRepository.count();
        stats.setTotalCompaniesVisited(companiesCount.intValue());

        // These would be calculated from actual data
        // For now, using default values matching frontend
        stats.setHighestPackage("24 LPA");
        stats.setAveragePackage("6.5 LPA");
        stats.setPlacementRate("95%");

        return stats;
    }

    /**
     * Get statistics by batch
     */
    public PlacementStatsDTO getStatsByBatch(String batch) {
        PlacementStatsDTO stats = new PlacementStatsDTO();

        Long totalOffers = placementRecordRepository.countByBatch(batch);
        stats.setTotalOffersMade(totalOffers.intValue());

        // Calculate other stats based on batch data
        stats.setTotalCompaniesVisited(0); // Would calculate from actual data
        stats.setHighestPackage("0 LPA");
        stats.setAveragePackage("0 LPA");
        stats.setPlacementRate("0%");

        return stats;
    }
}
