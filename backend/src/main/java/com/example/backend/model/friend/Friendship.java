package com.example.backend.model.friend;

import com.example.backend.model.User;
import jakarta.persistence.*;
import java.time.Instant;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.annotations.UpdateTimestamp;

@Data
@Entity
@Table(
    name = "friendships",
    uniqueConstraints = {
        @UniqueConstraint(
            name = "uk_friendships_requester_addressee",
            columnNames = { "requester_id", "addressee_id" }
        ),
    }
)
public class Friendship {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * The user who initiated the friend request.
     */
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "requester_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User requester;

    /**
     * The user who received the request.
     */
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "addressee_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User addressee;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private FriendshipStatus status = FriendshipStatus.PENDING;

    /**
     * When the request was created/sent.
     *
     * This field matches service expectations for `requestedAt`.
     */
    @CreationTimestamp
    @Column(name = "requested_at", nullable = false, updatable = false)
    private Instant requestedAt;

    /**
     * When the request was accepted/rejected (nullable).
     */
    @Column(name = "responded_at")
    private Instant respondedAt;

    /**
     * Tracks the last time this row was updated (status changes, re-requests, etc.).
     *
     * This field matches DTO/service expectations for `updatedAt`.
     */
    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;

    public Friendship() {}

    public Friendship(User requester, User addressee, FriendshipStatus status) {
        this.requester = requester;
        this.addressee = addressee;
        this.status = status;
    }
}
