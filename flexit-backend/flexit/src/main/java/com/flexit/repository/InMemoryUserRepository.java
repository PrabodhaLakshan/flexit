package com.flexit.repository;

import com.flexit.model.User;
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
public class InMemoryUserRepository implements UserRepository {

    private final ConcurrentMap<String, User> usersById = new ConcurrentHashMap<>();

    @Override
    public User save(User user) {
        if (user.getId() == null || user.getId().isBlank()) {
            user.setId(UUID.randomUUID().toString());
        }

        usersById.put(user.getId(), cloneUser(user));
        return cloneUser(user);
    }

    @Override
    public Optional<User> findByEmailIgnoreCase(String email) {
        if (email == null) {
            return Optional.empty();
        }

        String normalizedEmail = email.trim().toLowerCase(Locale.ROOT);
        return usersById.values().stream()
                .filter(user -> user.getEmail() != null && user.getEmail().trim().toLowerCase(Locale.ROOT).equals(normalizedEmail))
                .map(this::cloneUser)
                .findFirst();
    }

    @Override
    public boolean existsByEmailIgnoreCase(String email) {
        return findByEmailIgnoreCase(email).isPresent();
    }

    @Override
    public Optional<User> findById(String id) {
        User user = usersById.get(id);
        return Optional.ofNullable(user).map(this::cloneUser);
    }

    @Override
    public List<User> findAll() {
        return usersById.values().stream()
                .map(this::cloneUser)
                .sorted(Comparator.comparing(User::getCreatedAt, Comparator.nullsLast(Comparator.naturalOrder())))
                .toList();
    }

    @Override
    public void delete(User user) {
        if (user != null && user.getId() != null) {
            usersById.remove(user.getId());
        }
    }

    private User cloneUser(User source) {
        return new User(
                source.getId(),
                source.getFullName(),
                source.getEmail(),
                source.getPasswordHash(),
                source.getCreatedAt()
        );
    }
}