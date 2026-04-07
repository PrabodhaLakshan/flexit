package com.flexit.repository;

import com.flexit.model.IncidentTicket;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TicketRepository extends MongoRepository<IncidentTicket, String> {
    List<IncidentTicket> findByCreatedByUserId(String userId);
    List<IncidentTicket> findByAssignedTechnicianId(String technicianId);
}