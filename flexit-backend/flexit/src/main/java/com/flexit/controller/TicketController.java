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
    public ResponseEntity<IncidentTicket> create(@Valid @RequestBody IncidentTicket ticket) {
        return ResponseEntity.ok(ticketService.createTicket(ticket));
    }

    @GetMapping
    public ResponseEntity<List<IncidentTicket>> getAll() {
        return ResponseEntity.ok(ticketService.getAllTickets());
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<IncidentTicket> updateStatus(
            @PathVariable String id,
            @RequestParam TicketStatus status,
            @RequestParam(required = false) String notes,
            @RequestParam(required = false) String technicianId) {
        return ResponseEntity.ok(ticketService.updateTicketStatus(id, status, notes, technicianId));
    }

    @PostMapping("/{id}/comments")
    public ResponseEntity<IncidentTicket> addComment(@PathVariable String id, @RequestBody Comment comment) {
        return ResponseEntity.ok(ticketService.addComment(id, comment));
    }

    @PostMapping(value = "/create", consumes = {"multipart/form-data"})
public ResponseEntity<IncidentTicket> createTicket(
        @RequestPart("ticket") @Valid IncidentTicket ticket,
        @RequestPart(value = "files", required = false) List<MultipartFile> files) {
    
    return ResponseEntity.ok(ticketService.createTicketWithFiles(ticket, files));
}
}