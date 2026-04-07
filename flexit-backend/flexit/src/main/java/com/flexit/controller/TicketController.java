package com.flexit.controller;

import com.flexit.model.*;
import com.flexit.service.TicketService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/tickets")
@CrossOrigin(origins = "http://localhost:5173")
public class TicketController {
    private final TicketService ticketService;

    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    @PostMapping
    public ResponseEntity<IncidentTicket> createTicket(@Valid @RequestBody IncidentTicket ticket) {
        // Note: Real file upload would involve MultipartFile; 
        // using String URLs here for logic simplicity
        return ResponseEntity.ok(ticketService.createTicket(ticket, ticket.getAttachmentUrls()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<IncidentTicket> getTicket(@PathVariable String id) {
        return ResponseEntity.ok(ticketService.getTicketById(id));
    }

    // Workflow for Admin/Technicians
    @PatchMapping("/{id}/status")
    public ResponseEntity<IncidentTicket> updateStatus(
            @PathVariable String id,
            @RequestParam TicketStatus status,
            @RequestParam(required = false) String notes,
            @RequestParam(required = false) String technicianId) {
        return ResponseEntity.ok(ticketService.updateTicketStatus(id, status, notes, technicianId));
    }

    // Comments API
    @PostMapping("/{id}/comments")
    public ResponseEntity<IncidentTicket> addComment(@PathVariable String id, @RequestBody Comment comment) {
        return ResponseEntity.ok(ticketService.addComment(id, comment));
    }

    @DeleteMapping("/{id}/comments/{commentId}")
    public ResponseEntity<Void> deleteComment(
            @PathVariable String id, 
            @PathVariable String commentId,
            @RequestParam String userId) {
        ticketService.deleteComment(id, commentId, userId);
        return ResponseEntity.noContent().build();
    }
}
