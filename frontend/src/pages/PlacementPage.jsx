import React from "react";
import PlacementGallery from "../components/placement/PlacementGallery";
import TodayDrive from "../components/placement/TodayDrive";
import PlacementOfficersPreview from "../components/placement/PlacementOfficersPreview";
import PlacementOverview from "../components/placement/PlacementOverview";
import CompanyRecruiters from "../components/placement/CompanyRecruiters";
import PlacementRecords from "../components/placement/PlacementRecords";
import TrainingActivities from "../components/placement/TrainingActivities";

const PlacementPage = () => {
    return (
        <div>
            {/* 1. Placement Gallery */}
            <PlacementGallery />

            {/* 2. Today's Drive */}
            <TodayDrive />

            {/* 3. Placement Officers Preview */}
            <PlacementOfficersPreview />

            {/* 4. Overview & Statistics */}
            <PlacementOverview />

            {/* 5. Company Recruiters */}
            <CompanyRecruiters />

            {/* 6. Student Placement Records */}
            <PlacementRecords />

            {/* 7. Training & Placement Activities */}
            <TrainingActivities />
        </div>
    );
};

export default PlacementPage;
