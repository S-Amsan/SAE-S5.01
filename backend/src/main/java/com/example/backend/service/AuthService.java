package com.example.backend.service;

import com.example.backend.model.User;
import com.example.backend.model.http.req.LoginRequest;
import com.example.backend.model.http.req.SignUpRequest;
import com.example.backend.model.http.res.UserResponse;
import com.example.backend.model.security.UserHashSalt;
import com.example.backend.repository.HashSaltRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.security.PasswordService;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final HashSaltRepository hashSaltRepository;
    private final PasswordService passwordService;

    public AuthService(
            UserRepository userRepository,
            HashSaltRepository hashSaltRepository,
            PasswordService passwordService
    ) {
        this.userRepository = userRepository;
        this.hashSaltRepository = hashSaltRepository;
        this.passwordService = passwordService;
    }

    // ===========================
    //   SIGNUP JSON (Étapes)
    // ===========================
    public UserResponse register(SignUpRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email déjà utilisé");
        }

        if (userRepository.existsByPseudo(request.getPseudo())) {
            throw new RuntimeException("Pseudo déjà utilisé");
        }

        if (userRepository.existsByPhone(request.getPhone())) {
            throw new RuntimeException("Téléphone déjà utilisé");
        }

        User user = new User();
        user.setPseudo(request.getPseudo());
        user.setEmail(request.getEmail());
        user.setPhone(request.getPhone());
        user.setAge(request.getAge());
        user.setActif(true);

        user = userRepository.save(user);

        PasswordService.HashSalt hs = passwordService.generate(request.getPassword());

        UserHashSalt record = new UserHashSalt(
                user.getId(),
                hs.getHash(),
                hs.getSalt()
        );

        hashSaltRepository.save(record);

        return new UserResponse(user);
    }

    // ===========================
    //       LOGIN
    // ===========================
    public UserResponse login(LoginRequest request) {

        User user = userRepository
                .findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Email ou mot de passe incorrect"));

        UserHashSalt hs = hashSaltRepository
                .findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException("Erreur interne : hash introuvable"));

        boolean ok = passwordService.verifyPassword(
                request.getPassword(),
                hs.getSalt(),
                hs.getHash()
        );

        if (!ok) {
            throw new RuntimeException("Email ou mot de passe incorrect");
        }

        return new UserResponse(user);
    }

    // ===========================
    //   CHECK UNIQUENESS
    // ===========================
    public boolean pseudoExists(String pseudo) {
        return userRepository.existsByPseudo(pseudo);
    }

    public boolean emailExists(String email) {
        return userRepository.existsByEmail(email);
    }

    public boolean phoneExists(String phone) {
        return userRepository.existsByPhone(phone);
    }

    // ===========================
    //   MULTIPART FINAL SIGNUP
    // ===========================
    public UserResponse registerMultipart(
            String pseudo,
            String email,
            String password,
            String phone,
            Integer age,
            String parrainCode,
            String name,
            MultipartFile photo
    ) {

        if (userRepository.existsByEmail(email)) {
            throw new RuntimeException("Email déjà utilisé");
        }
        if (userRepository.existsByPseudo(pseudo)) {
            throw new RuntimeException("Pseudo déjà utilisé");
        }
        if (userRepository.existsByPhone(phone)) {
            throw new RuntimeException("Téléphone déjà utilisé");
        }

        User user = new User();
        user.setPseudo(pseudo);
        user.setEmail(email);
        user.setPhone(phone);
        user.setAge(age);
        user.setActif(true);

        user = userRepository.save(user);

        // Password
        PasswordService.HashSalt hs = passwordService.generate(password);

        UserHashSalt record = new UserHashSalt(
                user.getId(),
                hs.getHash(),
                hs.getSalt()
        );
        hashSaltRepository.save(record);

        // PHOTO HANDLING
        if (photo != null && !photo.isEmpty()) {
            try {
                String filename = "profile_" + user.getId() + ".jpg";
                Path uploadPath = Paths.get("uploads/" + filename);

                Files.createDirectories(uploadPath.getParent());
                Files.write(uploadPath, photo.getBytes());

                user.setPhotoProfile(filename);
                userRepository.save(user);

            } catch (Exception e) {
                throw new RuntimeException("Erreur upload photo : " + e.getMessage());
            }
        }

        return new UserResponse(user);
    }
}
