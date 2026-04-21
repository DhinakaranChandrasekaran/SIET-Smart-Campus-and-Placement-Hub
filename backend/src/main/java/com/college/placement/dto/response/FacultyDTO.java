package com.college.placement.dto.response;

/**
 * Faculty DTO
 * Matches frontend department staff structure
 */
public class FacultyDTO {

    private Long id;
    private String name;
    private String position;
    private Integer joiningYear;
    private String photo;

    public FacultyDTO() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public Integer getJoiningYear() {
        return joiningYear;
    }

    public void setJoiningYear(Integer joiningYear) {
        this.joiningYear = joiningYear;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }
}
