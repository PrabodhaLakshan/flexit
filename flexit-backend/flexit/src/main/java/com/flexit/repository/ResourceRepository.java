package com.flexit.repository;

import com.flexit.model.Resource;
import com.flexit.model.ResourceType;

import java.util.List;
import java.util.Optional;

public interface ResourceRepository {

    Resource save(Resource resource);

    List<Resource> findAll();

    Optional<Resource> findById(String id);

    void delete(Resource resource);

    List<Resource> findByType(ResourceType type);

    List<Resource> findByLocationContainingIgnoreCase(String location);

    List<Resource> findByCapacityGreaterThanEqual(Integer capacity);
}

