package com.flexit.dto;

import java.util.List;

public class UserManagementSummaryResponse {

    private long userCount;
    private long technicianCount;
    private long adminCount;
    private List<RegisteredTechnicianResponse> technicians;
    private List<RegisteredUserResponse> users;

    public UserManagementSummaryResponse() {
    }

    public UserManagementSummaryResponse(long userCount,
                                         long technicianCount,
                                         long adminCount,
                                         List<RegisteredTechnicianResponse> technicians,
                                         List<RegisteredUserResponse> users) {
        this.userCount = userCount;
        this.technicianCount = technicianCount;
        this.adminCount = adminCount;
        this.technicians = technicians;
        this.users = users;
    }

    public long getUserCount() {
        return userCount;
    }

    public void setUserCount(long userCount) {
        this.userCount = userCount;
    }

    public long getTechnicianCount() {
        return technicianCount;
    }

    public void setTechnicianCount(long technicianCount) {
        this.technicianCount = technicianCount;
    }

    public long getAdminCount() {
        return adminCount;
    }

    public void setAdminCount(long adminCount) {
        this.adminCount = adminCount;
    }

    public List<RegisteredTechnicianResponse> getTechnicians() {
        return technicians;
    }

    public void setTechnicians(List<RegisteredTechnicianResponse> technicians) {
        this.technicians = technicians;
    }

    public List<RegisteredUserResponse> getUsers() {
        return users;
    }

    public void setUsers(List<RegisteredUserResponse> users) {
        this.users = users;
    }
}
