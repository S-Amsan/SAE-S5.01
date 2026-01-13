package com.example.backend.model;

import com.example.backend.model.competition.CompetitionParticipant;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.time.Instant;
import java.util.Set;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Data
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false, length = 50)
    private String pseudo;

    @Column(nullable = false)
    private String passwordHash;

    @Column(unique = true, nullable = false, length = 255)
    private String email;

    @Column(unique = true, nullable = true, length = 20)
    private String phone;

    @Column(nullable = true)
    private String photoProfileUrl = null;

    @Column(nullable = true)
    private String profileBannerUrl = null;

    @CreationTimestamp
    @Column(updatable = false, nullable = false)
    private Instant dateCreation;

    @UpdateTimestamp
    @Column(nullable = true)
    private Instant dateModification;

    @Column(nullable = true)
    private Integer age;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private boolean isAdmin;

    @Column(nullable = false)
    private boolean banned = false;

    @JsonIgnore
    @OneToMany(
        mappedBy = "user",
        cascade = CascadeType.ALL,
        orphanRemoval = true
    )
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Set<CompetitionParticipant> competitions;

    @JsonIgnore
    @OneToMany(
        mappedBy = "user",
        fetch = FetchType.LAZY,
        cascade = CascadeType.ALL,
        orphanRemoval = true
    )
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Set<Post> posts;

    public User() {}

    public User(String pseudo, String email) {
        this.pseudo = pseudo;
        this.email = email;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }
}
