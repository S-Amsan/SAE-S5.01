package com.example.backend.model;

import com.example.backend.model.competition.CompetitionParticipant;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Set<CompetitionParticipant> competitions;

    @JsonManagedReference
    @OneToOne(
        mappedBy = "user",
        fetch = FetchType.LAZY,
        cascade = CascadeType.ALL,
        orphanRemoval = true
    )
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private UserStats stats = new UserStats(this);

    @JsonIgnore
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Set<Post> posts;

    public User() {
        this.stats = new UserStats(this);
    }

    public User(String pseudo, String email) {
        this.pseudo = pseudo;
        this.email = email;
        this.stats = new UserStats(this);
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    @PrePersist
    @PreUpdate
    private void ensureStats() {
        if (this.stats == null) {
            this.stats = new UserStats(this);
        } else if (this.stats.getUser() == null) {
            this.stats.setUser(this);
        }
    }
}
