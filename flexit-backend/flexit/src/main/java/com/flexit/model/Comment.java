package com.flexit.model;

import java.time.LocalDateTime;
import java.util.UUID;

public class Comment {
    private String id = UUID.randomUUID().toString();
    private String userId; 
    private String userName;
    private String text;
    private LocalDateTime createdAt = LocalDateTime.now();

    // Getters and Setters
}