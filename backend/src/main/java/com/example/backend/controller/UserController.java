package com.example.backend.controller;

import com.example.backend.model.User;
import com.example.backend.model.http.req.AccountUpdateRequest;
import com.example.backend.service.UserService;
import jakarta.validation.Valid;
import java.io.IOException;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @PostMapping("/update")
    public ResponseEntity<String> updateAccountInfo(
        @Valid AccountUpdateRequest request,
        @AuthenticationPrincipal User user
    ) throws IOException {
        if (userService.updateAccount(user, request)) {
            return ResponseEntity.ok("Account updated successfully");
        }

        return ResponseEntity.ok("Account didn't need to be updated");
    }
}
