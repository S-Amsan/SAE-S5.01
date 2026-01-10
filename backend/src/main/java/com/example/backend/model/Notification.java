package com.example.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.Data;

@Data
@Entity
@Table(name = "notifications")
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false, length = 255)
    private String title;

    @Lob
    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(length = 255)
    private String imageUrl;

    @Column(nullable = false)
    private LocalDateTime receivedAt;

    @Column(nullable = false, length = 50)
    private String status;

    @Column(nullable = false, length = 50)
    private String type;

    public Notification() {}
}
