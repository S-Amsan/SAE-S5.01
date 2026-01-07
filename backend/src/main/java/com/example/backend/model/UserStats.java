package com.example.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import java.time.LocalDate;
import lombok.Data;

/**
 * Dedicated entity to store per-user counters (points, trophies, flames).
 *
 * Notes:
 * - Kept separate from {@link User} to avoid bloating the users table and to keep concerns separated.
 * - Uses a one-to-one relationship with {@link User}. The stats row cannot exist without a user.
 */
@Data
@Entity
@Table(name = "user_stats")
public class UserStats {

    /**
     * Shared primary key with User:
     * - Primary Key: user_id
     * - Foreign Key: user_id -> users.id
     */
    @Id
    private Long userId;

    @JsonBackReference
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @MapsId
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private int points = 0;

    @Column(nullable = false)
    private int trophies = 0;

    @Column(nullable = false)
    private int flames = 0;

    @Column(nullable = true)
    private LocalDate lastActionDate;

    public UserStats() {}

    public UserStats(User user) {
        this.user = user;
    }

    public UserStats(User user, int points, int trophies, int flames) {
        this.user = user;
        this.points = points;
        this.trophies = trophies;
        this.flames = flames;
    }
}
