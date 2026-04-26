package com.flexit.dto;

import java.time.LocalDateTime;
import java.util.List;

public class RegisteredTechnicianResponse {

    private String id;
    private String userCode;
    private String fullName;
    private String email;
    private String contactNumber;
    private List<String> categories;
    private String assignedArea;
    private LocalDateTime createdAt;

    public RegisteredTechnicianResponse() {
    }

    public RegisteredTechnicianResponse(String id,
                                        String userCode,
                                        String fullName,
                                        String email,
                                        String contactNumber,
                                        List<String> categories,
                                        String assignedArea,
                                        LocalDateTime createdAt) {
        this.id = id;
        this.userCode = userCode;
        this.fullName = fullName;
        this.email = email;
        this.contactNumber = contactNumber;
        this.categories = categories;
        this.assignedArea = assignedArea;
        this.createdAt = createdAt;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserCode() {
        return userCode;
    }

    public void setUserCode(String userCode) {
        this.userCode = userCode;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }

    public List<String> getCategories() {
        return categories;
    }

    public void setCategories(List<String> categories) {
        this.categories = categories;
    }

    public String getAssignedArea() {
        return assignedArea;
    }

    public void setAssignedArea(String assignedArea) {
        this.assignedArea = assignedArea;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
