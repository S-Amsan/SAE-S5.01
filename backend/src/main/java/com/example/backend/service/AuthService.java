package com.example.backend.service;

import com.example.backend.exceptions.AccountAlreadyExistsException;
import com.example.backend.model.User;
import com.example.backend.model.http.req.LoginRequest;
import com.example.backend.model.http.req.SignUpRequest;
import com.example.backend.model.http.res.AuthenticationResponse;
import com.example.backend.model.http.res.ImageUploadResponse;
import com.example.backend.model.security.UserHashSalt;
import com.example.backend.repository.HashSaltRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.security.PasswordService;
import java.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private ImageUploadService imageUploadService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private HashSaltRepository hashSaltRepository;

    @Autowired
    private PasswordService passwordService;

    @Autowired
    private JwtService jwtService;

    public ResponseEntity<AuthenticationResponse> login(LoginRequest request) {
        User user = userRepository
            .findByEmail(request.getEmail())
            .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        UserHashSalt hs = hashSaltRepository
            .findByUserId(user.getId())
            .orElseThrow(() ->
                new RuntimeException("Erreur interne : hash introuvable")
            );

        boolean ok = passwordService.verifyPassword(
            request.getPassword(),
            hs.getSalt(),
            hs.getHash()
        );

        if (!ok) {
            throw new RuntimeException("Mot de passe incorrect");
        }

        String token = jwtService.generateToken(
            request.getEmail()
        );

        return ResponseEntity.ok(
            new AuthenticationResponse(user.getId(), user.getPseudo(), token)
        );
    }

    public ResponseEntity<AuthenticationResponse> signup(
        SignUpRequest request
    ) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new AccountAlreadyExistsException(
                AccountAlreadyExistsException.Type.EMAIL,
                request.getEmail()
            );
        }

        if (userRepository.existsByPseudo(request.getPseudo())) {
            throw new AccountAlreadyExistsException(
                AccountAlreadyExistsException.Type.PSEUDO,
                request.getPseudo()
            );
        }

        User user = new User(request.getPseudo(), request.getEmail());
        user.setPhone(request.getPhone());
        user.setName(request.getName());
        user.setAge(request.getAge());

        ImageUploadResponse imageUploadResponse;

        try {
            imageUploadResponse = imageUploadService.upload(
                request.getAvatarImage()
            );
        } catch (IOException e) {
            throw new RuntimeException("Failed to upload avatar image", e);
        }

        if (imageUploadResponse.getError() != null) {
            throw new RuntimeException(
                "Error uploading avatar image: " +
                    imageUploadResponse.getError()
            );
        }

        user.setPhotoProfileUrl(
            ImageUploadService.endpoint.toString() +
                '/' +
                imageUploadResponse.getFilename()
        );

        userRepository.save(user);

        PasswordService.HashSalt hashsalt = passwordService.generate(
            request.getPassword()
        );
        UserHashSalt userHashSalt = new UserHashSalt(user.getId(), hashsalt);
        hashSaltRepository.save(userHashSalt);

        String token = jwtService.generateToken(
            request.getEmail()
        );

        return ResponseEntity.ok(
            new AuthenticationResponse(user.getId(), user.getPseudo(), token)
        );
    }

    public boolean pseudoExists(String pseudo) {
        return userRepository.existsByPseudo(pseudo);
    }

    public boolean emailExists(String email) {
        return userRepository.existsByEmail(email);
    }

    public boolean phoneExists(String phone) {
        return userRepository.existsByPhone(phone);
    }
}
