package com.flexit.model;

import jakarta.validation.constraints.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "tickets")
public class IncidentTicket {
    @Id
    private String id;
    
    @NotBlank(message = "Resource ID is required")
    private String resourceId;
    
    @NotBlank(message = "Category is required")
    private String category;
    
    @NotBlank(message = "Description is required")
    private String description;
    
    @NotNull(message = "Priority is required")
    private TicketPriority priority;
    
    @NotBlank(message = "Contact details are required")
    private String contactDetails;

    // Supports up to 3 image URLs/Paths
    private List<String> attachmentUrls = new ArrayList<>(); 
    
    private TicketStatus status = TicketStatus.OPEN;
    private String assignedTechnicianId;
    private String resolutionNotes;
    private String rejectionReason;
    private List<Comment> comments = new ArrayList<>();
    
    private String createdByUserId; // Linked to User (Module A)
    private LocalDateTime createdAt = LocalDateTime.now();

    // Getters and Setters
}