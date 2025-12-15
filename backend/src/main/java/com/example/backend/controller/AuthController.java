package com.example.backend.controller;

import com.example.backend.service.AuthService;
import com.example.backend.model.http.req.LoginRequest;
import com.example.backend.model.http.res.UserResponse;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.ResponseEntity;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // =============================
    //   LOGIN
    // =============================
    @PostMapping("/login")
    public UserResponse login(@RequestBody LoginRequest request) {
        return authService.login(request);
    }

    // =============================
    //   INSCRIPTION MULTIPART
    // =============================
    @PostMapping(value = "/signupMultipart", consumes = "multipart/form-data")
    public UserResponse registerMultipart(
            @RequestParam String pseudo,
            @RequestParam String email,
            @RequestParam String password,
            @RequestParam String phone,
            @RequestParam(required = false) Integer age,
            @RequestParam(required = false) String parrainCode,
            @RequestParam String name,
            @RequestParam(required = false) MultipartFile photo
    ) {
        return authService.registerMultipart(
                pseudo, email, password, phone, age, parrainCode, name, photo
        );
    }

    // =============================
    //   Vérification unicité
    // =============================
    @GetMapping("/check")
    public ResponseEntity<?> check(
            @RequestParam(required = false) String pseudo,
            @RequestParam(required = false) String email,
            @RequestParam(required = false) String phone
    ) {

        return ResponseEntity.ok(
                Map.of(
                        "pseudoTaken", pseudo != null && authService.pseudoExists(pseudo),
                        "emailTaken", email != null && authService.emailExists(email),
                        "phoneTaken", phone != null && authService.phoneExists(phone)
                )
        );
    }
}
