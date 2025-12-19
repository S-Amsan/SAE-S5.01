package com.example.backend.service;

import com.example.backend.model.User;
import com.example.backend.model.http.req.AccountUpdateRequest;
import com.example.backend.model.security.UserHashSalt;
import com.example.backend.repository.HashSaltRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.security.PasswordService;
import com.example.backend.service.security.PasswordService.HashSalt;
import java.io.IOException;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordService passwordService;

    @Autowired
    private HashSaltRepository hashSaltRepository;

    @Autowired
    private ImageUploadService imageUploadService;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public boolean updateAccount(User user, AccountUpdateRequest request)
        throws IOException {
        boolean update = false;

        {
            if (!request.getPseudo().equals(user.getPseudo())) {
                // Pseudo update needed
                update = true;
                user.setPseudo(request.getPseudo());
            }
        }

        {
            if (!request.getEmail().equals(user.getEmail())) {
                // Email update needed
                update = true;
                user.setEmail(request.getEmail());
            }
        }

        {
            if (!request.getName().equals(user.getName())) {
                // Name update needed
                update = true;
                user.setName(request.getName());
            }
        }

        {
            HashSalt new_hs = passwordService.generate(request.getPassword());
            UserHashSalt userHashSalt = hashSaltRepository
                .findByUserId(user.getId())
                .get();
            HashSalt old_hs = new HashSalt(
                userHashSalt.getSalt(),
                userHashSalt.getHash()
            );

            if (!new_hs.equals(old_hs)) {
                // Password update needed
                update = true;
                userHashSalt.setHash(new_hs.getHash());
                userHashSalt.setSalt(new_hs.getSalt());
                hashSaltRepository.save(userHashSalt);
            }
        }

        {
            if (!request.getPhone().equals(user.getPhone())) {
                // Phone update needed
                update = true;
                user.setPhone(request.getPhone());
            }
        }

        {
            if (!request.getAge().equals(user.getAge())) {
                // Age update needed
                update = true;
                user.setAge(request.getAge());
            }
        }

        {
            String oldUrl = user.getPhotoProfileUrl();
            String newUrl = imageUploadService
                .upload(request.getAvatarImage())
                .getUrl();

            if (!oldUrl.equals(newUrl)) {
                // Photo update needed
                imageUploadService.delete(oldUrl);
                user.setPhotoProfileUrl(newUrl);
            } else {
                imageUploadService.delete(newUrl);
            }
        }

        if (update) {
            userRepository.save(user);
        }

        return update;
    }
}
