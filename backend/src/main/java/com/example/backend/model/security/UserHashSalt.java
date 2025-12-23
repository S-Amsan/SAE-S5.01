package com.example.backend.model.security;

import com.example.backend.model.User;
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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(nullable = false)
    private String hash;

    @Column(nullable = false)
    private String salt;

    public UserHashSalt() {}

    public UserHashSalt(User user, PasswordService.HashSalt hashsalt) {
        this(user, hashsalt.getHash(), hashsalt.getSalt());
    }

    public UserHashSalt(User user, String hash, String salt) {
        this.user = user;
        this.hash = hash;
        this.salt = salt;
    }
}
