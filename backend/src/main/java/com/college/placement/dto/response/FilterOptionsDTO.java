package com.college.placement.dto.response;

import java.util.List;

/**
 * DTO containing all filter dropdown options
 */
public class FilterOptionsDTO {
    private List<String> projectDomains;
    private List<String> technologies;
    private List<String> departments;

    public FilterOptionsDTO() {
    }

    public FilterOptionsDTO(List<String> projectDomains, List<String> technologies, List<String> departments) {
        this.projectDomains = projectDomains;
        this.technologies = technologies;
        this.departments = departments;
    }

    public List<String> getProjectDomains() {
        return projectDomains;
    }

    public void setProjectDomains(List<String> projectDomains) {
        this.projectDomains = projectDomains;
    }

    public List<String> getTechnologies() {
        return technologies;
    }

    public void setTechnologies(List<String> technologies) {
        this.technologies = technologies;
    }

    public List<String> getDepartments() {
        return departments;
    }

    public void setDepartments(List<String> departments) {
        this.departments = departments;
    }
}
