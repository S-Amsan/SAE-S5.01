package com.example.backend.controller;

import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @PostMapping("/user")
    public User createUser(
        @RequestParam String pseudo,
        @RequestParam String email,
        @RequestParam String password,
        @RequestParam(required = false) String phone
    ) {
        User user = new User(pseudo, email, password);
        user.setPhone(phone);

        return userRepository.save(user);
    }
}
