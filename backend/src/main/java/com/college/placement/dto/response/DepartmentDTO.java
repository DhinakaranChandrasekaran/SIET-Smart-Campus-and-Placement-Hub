package com.college.placement.dto.response;

import java.util.ArrayList;
import java.util.List;

/**
 * Department DTO
 * Matches frontend departments structure exactly
 */
public class DepartmentDTO {

    private String id;
    private String name;
    private String image;
    private Long studentCount;
    // Static content (about, vision, mission, objectives) moved to frontend
    private HodDTO hod;
    private List<FacultyDTO> staff = new ArrayList<>();

    // Inner class for HOD
    public static class HodDTO {
        private String name;
        private String designation;
        private String photo;
        private Integer joiningYear;
        private HodProfileDTO profile;

        public HodDTO() {
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getDesignation() {
            return designation;
        }

        public void setDesignation(String designation) {
            this.designation = designation;
        }

        public String getPhoto() {
            return photo;
        }

        public void setPhoto(String photo) {
            this.photo = photo;
        }

        public Integer getJoiningYear() {
            return joiningYear;
        }

        public void setJoiningYear(Integer joiningYear) {
            this.joiningYear = joiningYear;
        }

        public HodProfileDTO getProfile() {
            return profile;
        }

        public void setProfile(HodProfileDTO profile) {
            this.profile = profile;
        }
    }

    // Inner class for HOD Profile
    public static class HodProfileDTO {
        private String description;
        private List<String> academicBackground = new ArrayList<>();
        private List<ExperienceDTO> experience = new ArrayList<>();
        private String summary;

        public HodProfileDTO() {
        }

        public String getDescription() {
            return description;
        }

        public void setDescription(String description) {
            this.description = description;
        }

        public List<String> getAcademicBackground() {
            return academicBackground;
        }

        public void setAcademicBackground(List<String> academicBackground) {
            this.academicBackground = academicBackground;
        }

        public List<ExperienceDTO> getExperience() {
            return experience;
        }

        public void setExperience(List<ExperienceDTO> experience) {
            this.experience = experience;
        }

        public String getSummary() {
            return summary;
        }

        public void setSummary(String summary) {
            this.summary = summary;
        }
    }

    // Inner class for Experience
    public static class ExperienceDTO {
        private String title;
        private String period;
        private String description;

        public ExperienceDTO() {
        }

        public String getTitle() {
            return title;
        }

        public void setTitle(String title) {
            this.title = title;
        }

        public String getPeriod() {
            return period;
        }

        public void setPeriod(String period) {
            this.period = period;
        }

        public String getDescription() {
            return description;
        }

        public void setDescription(String description) {
            this.description = description;
        }
    }

    // Main DTO Constructors
    public DepartmentDTO() {
    }

    // Main DTO Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Long getStudentCount() {
        return studentCount;
    }

    public void setStudentCount(Long studentCount) {
        this.studentCount = studentCount;
    }

    public HodDTO getHod() {
        return hod;
    }

    public void setHod(HodDTO hod) {
        this.hod = hod;
    }

    public List<FacultyDTO> getStaff() {
        return staff;
    }

    public void setStaff(List<FacultyDTO> staff) {
        this.staff = staff;
    }
}
