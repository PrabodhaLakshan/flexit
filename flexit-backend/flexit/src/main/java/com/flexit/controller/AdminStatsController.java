package com.flexit.controller;

import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class AdminStatsController {

    private final MongoTemplate mongoTemplate;

    public AdminStatsController(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Long>> getDashboardStats() {

        // Count all resources (no enum fields involved)
        long totalResources = mongoTemplate.count(new Query(), "resources");

        // Count users whose role field (stored as string in MongoDB) equals "USER"
        Query userQuery = new Query(Criteria.where("role").is("USER"));
        long activeUsers = mongoTemplate.count(userQuery, "users");

        // Count tickets with status OPEN or IN_PROGRESS (raw string match)
        Query alertQuery = new Query(
                new Criteria().orOperator(
                        Criteria.where("status").is("OPEN"),
                        Criteria.where("status").is("IN_PROGRESS")
                )
        );
        long systemAlerts = mongoTemplate.count(alertQuery, "tickets");

        return ResponseEntity.ok(Map.of(
                "totalResources", totalResources,
                "activeUsers", activeUsers,
                "systemAlerts", systemAlerts
        ));
    }
}
