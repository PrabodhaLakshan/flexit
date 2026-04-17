package com.flexit.repository;

import com.flexit.model.Resource;
import com.flexit.model.ResourceType;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Locale;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

@Repository
public class InMemoryResourceRepository implements ResourceRepository {

    private final ConcurrentMap<String, Resource> resourcesById = new ConcurrentHashMap<>();

    @Override
    public Resource save(Resource resource) {
        if (resource.getId() == null || resource.getId().isBlank()) {
            resource.setId(UUID.randomUUID().toString());
        }

        resourcesById.put(resource.getId(), cloneResource(resource));
        return cloneResource(resource);
    }

    @Override
    public List<Resource> findAll() {
        return resourcesById.values().stream()
                .map(this::cloneResource)
                .sorted(Comparator.comparing(Resource::getName, Comparator.nullsLast(String::compareToIgnoreCase)))
                .toList();
    }

    @Override
    public Optional<Resource> findById(String id) {
        Resource resource = resourcesById.get(id);
        return Optional.ofNullable(resource).map(this::cloneResource);
    }

    @Override
    public void delete(Resource resource) {
        if (resource != null && resource.getId() != null) {
            resourcesById.remove(resource.getId());
        }
    }

    @Override
    public List<Resource> findByType(ResourceType type) {
        return resourcesById.values().stream()
                .filter(resource -> resource.getType() == type)
                .map(this::cloneResource)
                .toList();
    }

    @Override
    public List<Resource> findByLocationContainingIgnoreCase(String location) {
        if (location == null || location.isBlank()) {
            return List.of();
        }

        String normalizedLocation = location.trim().toLowerCase(Locale.ROOT);
        return resourcesById.values().stream()
                .filter(resource -> resource.getLocation() != null && resource.getLocation().toLowerCase(Locale.ROOT).contains(normalizedLocation))
                .map(this::cloneResource)
                .toList();
    }

    @Override
    public List<Resource> findByCapacityGreaterThanEqual(Integer capacity) {
        if (capacity == null) {
            return List.of();
        }

        return resourcesById.values().stream()
                .filter(resource -> resource.getCapacity() != null && resource.getCapacity() >= capacity)
                .map(this::cloneResource)
                .toList();
    }

    private Resource cloneResource(Resource source) {
        return new Resource(
                source.getId(),
                source.getName(),
                source.getType(),
                source.getCapacity(),
                source.getLocation(),
                source.getAvailabilityStart(),
                source.getAvailabilityEnd(),
                source.getStatus(),
                source.getDescription()
        );
    }
}