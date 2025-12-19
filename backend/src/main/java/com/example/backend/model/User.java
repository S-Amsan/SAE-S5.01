package com.example.backend.model;

import jakarta.persistence.*;
import java.time.Instant;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Data
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column
    private Long id;

    @Column(unique = true, nullable = false, length = 50)
    private String pseudo;

    @Column(unique = true, nullable = false, length = 255)
    private String email;

    @Column(unique = true, nullable = true, length = 20)
    private String phone;

    @Column(name = "photo_profile_url")
    private String photoProfileUrl;

    @CreationTimestamp
    @Column(name = "date_creation", updatable = false)
    private Instant dateCreation;

    @UpdateTimestamp
    @Column(name = "date_modification")
    private Instant dateModification;

    @Column
    private boolean actif = true;

    @Column
    private Integer age;

    @Column
    private String name;

    public User() {}

    public User(String pseudo, String email) {
        this.pseudo = pseudo;
        this.email = email;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }
}
