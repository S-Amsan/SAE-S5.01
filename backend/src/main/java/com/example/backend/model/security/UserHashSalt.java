package com.example.backend.model.security;

import com.example.backend.service.security.PasswordService;
import jakarta.persistence.*;
import jakarta.persistence.Column;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "hash_salt")
public class UserHashSalt {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column
    private Long id;

    // TODO: Use user id as actual id
    @Column(name = "user_id")
    private Long userId;

    @Column(nullable = false)
    private String hash;

    @Column(nullable = false)
    private String salt;

    public UserHashSalt() {}

    public UserHashSalt(Long userId, PasswordService.HashSalt hashsalt) {
        this(userId, hashsalt.getHash(), hashsalt.getSalt());
    }

    public UserHashSalt(Long userId, String hash, String salt) {
        this.userId = userId;
        this.hash = hash;
        this.salt = salt;
    }
}
