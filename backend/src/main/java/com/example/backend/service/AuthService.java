package com.example.backend.service;

import com.example.backend.exceptions.AccountAlreadyExistsException;
import com.example.backend.exceptions.LoginException;
import com.example.backend.model.User;
import com.example.backend.model.http.req.LoginRequest;
import com.example.backend.model.http.req.SignUpRequest;
import com.example.backend.model.http.res.AuthenticationResponse;
import com.example.backend.model.http.res.FileUploadResponse;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.security.JwtService;
import java.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private FileUploadService fileUploadService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public ResponseEntity<AuthenticationResponse> login(LoginRequest request) {
        User user = userRepository
            .findByEmail(request.getEmail())
            .orElseThrow(() -> new LoginException("Utilisateur non trouvé"));

        boolean ok = passwordEncoder.matches(
            request.getPassword(),
            user.getPasswordHash()
        );

        if (!ok) {
            throw new LoginException("Mot de passe incorrect");
        }

        String token = jwtService.generateToken(request.getEmail());

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
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));

        FileUploadResponse fileUploadResponse;

        try {
            fileUploadResponse = fileUploadService.upload(
                request.getAvatarImage()
            );
        } catch (IOException e) {
            throw new LoginException("Failed to upload avatar image", e);
        }

        if (fileUploadResponse.getError() != null) {
            throw new LoginException(
                "Error uploading avatar image: " + fileUploadResponse.getError()
            );
        }

        user.setPhotoProfileUrl(
            FileUploadService.endpoint.toString() +
                '/' +
                fileUploadResponse.getFilename()
        );

        userRepository.save(user);

        String token = jwtService.generateToken(request.getEmail());

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
