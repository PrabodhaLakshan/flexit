package com.flexit.service;

import com.flexit.dto.AuthResponse;
import com.flexit.dto.GoogleLoginRequest;
import com.flexit.dto.LoginRequest;
import com.flexit.dto.SignupRequest;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.flexit.exception.InvalidCredentialsException;
import com.flexit.exception.UserAlreadyExistsException;
import com.flexit.model.User;
import com.flexit.model.UserRole;
import com.flexit.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Collections;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final GoogleIdTokenVerifier googleIdTokenVerifier;

    public AuthService(UserRepository userRepository,
                       @Value("${google.oauth.client-id}") String googleClientId) {
        this.userRepository = userRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
        this.googleIdTokenVerifier = new GoogleIdTokenVerifier.Builder(
                new NetHttpTransport(),
                GsonFactory.getDefaultInstance()
        )
                .setAudience(Collections.singletonList(googleClientId))
                .build();
    }

    public AuthResponse register(SignupRequest request) {
        String normalizedEmail = request.getEmail().trim().toLowerCase();

        if (userRepository.existsByEmailIgnoreCase(normalizedEmail)) {
            throw new UserAlreadyExistsException("Email is already registered");
        }

        User user = new User();
        user.setFullName(request.getFullName().trim());
        user.setEmail(normalizedEmail);
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        user.setRole(UserRole.USER);
        user.setCreatedAt(LocalDateTime.now());

        User savedUser = userRepository.save(user);
        UserRole role = resolveRole(savedUser);

        return new AuthResponse(
                "Account created successfully",
                savedUser.getId(),
                savedUser.getFullName(),
            savedUser.getEmail(),
            role.name()
        );
    }

    public AuthResponse login(LoginRequest request) {
        String normalizedEmail = request.getEmail().trim().toLowerCase();

        User user = userRepository.findByEmailIgnoreCase(normalizedEmail)
                .orElseThrow(() -> new InvalidCredentialsException("Invalid email or password"));

        if (user.getPasswordHash() == null || user.getPasswordHash().isBlank()) {
            throw new InvalidCredentialsException("Use Google Login for this account");
        }

        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new InvalidCredentialsException("Invalid email or password");
        }

        UserRole role = resolveRole(user);

        return new AuthResponse(
                "Login successful",
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                role.name()
        );
    }

    public AuthResponse googleLogin(GoogleLoginRequest request) {
        GoogleIdToken idToken = verifyGoogleToken(request.getIdToken());
        GoogleIdToken.Payload payload = idToken.getPayload();

        String email = payload.getEmail();
        Boolean emailVerified = payload.getEmailVerified();

        if (email == null || !Boolean.TRUE.equals(emailVerified)) {
            throw new InvalidCredentialsException("Google account email is not verified");
        }

        String normalizedEmail = email.trim().toLowerCase();
        String fullName = extractFullName(payload, normalizedEmail);

        User user = userRepository.findByEmailIgnoreCase(normalizedEmail)
                .orElseGet(() -> createGoogleUser(normalizedEmail, fullName));

        UserRole role = resolveRole(user);

        return new AuthResponse(
                "Google login successful",
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                role.name()
        );
    }

    private GoogleIdToken verifyGoogleToken(String tokenValue) {
        try {
            GoogleIdToken idToken = googleIdTokenVerifier.verify(tokenValue);
            if (idToken == null) {
                throw new InvalidCredentialsException("Invalid Google token");
            }

            String issuer = idToken.getPayload().getIssuer();
            if (!"accounts.google.com".equals(issuer)
                    && !"https://accounts.google.com".equals(issuer)) {
                throw new InvalidCredentialsException("Invalid Google token issuer");
            }

            return idToken;
        } catch (InvalidCredentialsException ex) {
            throw ex;
        } catch (Exception ex) {
            throw new InvalidCredentialsException("Google token verification failed");
        }
    }

    private String extractFullName(GoogleIdToken.Payload payload, String fallbackEmail) {
        Object nameValue = payload.get("name");
        if (nameValue instanceof String name && !name.isBlank()) {
            return name.trim();
        }

        int atIndex = fallbackEmail.indexOf('@');
        if (atIndex > 0) {
            return fallbackEmail.substring(0, atIndex);
        }

        return "Google User";
    }

    private User createGoogleUser(String normalizedEmail, String fullName) {
        User user = new User();
        user.setFullName(fullName);
        user.setEmail(normalizedEmail);
        user.setPasswordHash(null);
        user.setRole(UserRole.USER);
        user.setCreatedAt(LocalDateTime.now());
        return userRepository.save(user);
    }

    private UserRole resolveRole(User user) {
        return user.getRole() == null ? UserRole.USER : user.getRole();
    }
}
