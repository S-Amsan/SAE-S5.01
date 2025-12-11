package com.example.backend.service;

import com.example.backend.model.User;
import com.example.backend.model.http.req.*;
import com.example.backend.model.http.res.*;
import com.example.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserResponse register(SignUpRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email déjà utilisé");
        }

        User user = new User();
        user.setPseudo(request.getPseudo());
        user.setEmail(request.getEmail());
        // user.setPassword(request.getPassword());
        user.setPhone(request.getPhone());
        user.setActif(true);

        return new UserResponse(userRepository.save(user));
    }

    public UserResponse login(LoginRequest request) {
        User user = userRepository
            .findByEmail(request.getEmail())
            .orElseThrow(() ->
                new RuntimeException("Email ou mot de passe incorrect")
            );

        // if (!user.getPassword().equals(request.getPassword())) {
        //     throw new RuntimeException("Email ou mot de passe incorrect");
        // }

        UserResponse response = new UserResponse();
        response.setId(user.getId());
        response.setEmail(user.getEmail());
        response.setPseudo(user.getPseudo());
        response.setPhone(user.getPhone());
        response.setPhotoProfile(user.getPhotoProfile());
        response.setActif(user.isActif());

        return response;
    }
}
