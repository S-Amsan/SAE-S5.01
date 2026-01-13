package com.example.backend.model.event;

import com.example.backend.model.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

/**
 * Join entity for Event <-> User with extra attributes (points).
 *
 * Backed by table "event_participants".
 *
 * Important: we ignore back-references during JSON serialization to prevent
 * infinite recursion and accidental lazy-loading hangs when returning entities.
 */
@Getter
@Setter
@Entity
@Table(name = "event_participants")
public class EventParticipant {

    @EmbeddedId
    private EventParticipantId id = new EventParticipantId();

    /**
     * Owning event (back-reference). Ignored in JSON to prevent recursion:
     * Event -> participants -> EventParticipant -> event -> ...
     */
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @MapsId("eventId")
    @JoinColumn(name = "event_id", nullable = false)
    private Event event;

    /**
     * Participant user (back-reference). Ignored in JSON to avoid large graphs and
     * possible recursion (User may reference participations).
     *
     * If you need user data in API responses, return a DTO that includes what you
     * want (e.g., userId/pseudo/points).
     */
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @MapsId("userId")
    @JoinColumn(name = "user_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;

    @Column(nullable = false)
    private int points = 0;

    public EventParticipant() {}

    public EventParticipant(Event event, User user) {
        this.event = event;
        this.user = user;
        this.id = new EventParticipantId(
            event != null ? event.getId() : null,
            user != null ? user.getId() : null
        );
    }
}
