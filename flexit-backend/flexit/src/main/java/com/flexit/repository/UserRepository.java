package com.flexit.repository;

import com.flexit.model.User;

import java.util.List;
import java.util.Optional;

public interface UserRepository {
    User save(User user);

    Optional<User> findByEmailIgnoreCase(String email);

    boolean existsByEmailIgnoreCase(String email);

    Optional<User> findById(String id);

    List<User> findAll();

    void delete(User user);
}
