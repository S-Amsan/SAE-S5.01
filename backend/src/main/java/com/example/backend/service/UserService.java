package com.example.backend.service;

import com.example.backend.model.User;
import com.example.backend.model.http.req.AccountUpdateRequest;
import com.example.backend.repository.UserRepository;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FileUploadService fileUploadService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public boolean updateAccount(User user, AccountUpdateRequest request)
        throws IOException {
        boolean update = false;

        if (request.getPseudo() != null) {
            if (!request.getPseudo().equals(user.getPseudo())) {
                // Pseudo update needed
                update = true;
                user.setPseudo(request.getPseudo());
            }
        }

        if (request.getEmail() != null) {
            if (!request.getEmail().equals(user.getEmail())) {
                // Email update needed
                update = true;
                user.setEmail(request.getEmail());
            }
        }

        if (request.getName() != null) {
            if (!request.getName().equals(user.getName())) {
                // Name update needed
                update = true;
                user.setName(request.getName());
            }
        }

        if (request.getPassword() != null) {
            String newHash = passwordEncoder.encode(request.getPassword());
            String oldHash = user.getPasswordHash();

            if (!newHash.equals(oldHash)) {
                // Password update needed
                update = true;
                user.setPasswordHash(newHash);
            }
        }

        if (request.getPhone() != null) {
            if (!request.getPhone().equals(user.getPhone())) {
                // Phone update needed
                update = true;
                user.setPhone(request.getPhone());
            }
        }

        if (request.getAge() != null) {
            if (!request.getAge().equals(user.getAge())) {
                // Age update needed
                update = true;
                user.setAge(request.getAge());
            }
        }

        if (request.getAvatarImage() != null) {
            String oldUrl = user.getPhotoProfileUrl();
            String newUrl = fileUploadService
                .upload(request.getAvatarImage())
                .getUrl();

            if (!oldUrl.equals(newUrl)) {
                // Photo update needed
                fileUploadService.delete(oldUrl);
                user.setPhotoProfileUrl(newUrl);
            } else {
                fileUploadService.delete(newUrl);
            }
        }

        if (update) {
            userRepository.save(user);
        }

        return update;
    }

    public User changeBanStatusOf(User user, boolean banned) {
        user.setBanned(banned);
        return userRepository.save(user);
    }
}
