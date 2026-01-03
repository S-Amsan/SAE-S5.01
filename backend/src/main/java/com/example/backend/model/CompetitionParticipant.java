package com.example.backend.model;

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

/**
 * Join entity for Competition <-> User with extra attributes (points).
 *
 * Backed by table "competition_participants".
 *
 * Important: we ignore back-references during JSON serialization to prevent
 * infinite recursion and accidental lazy-loading hangs when returning entities.
 */
@Getter
@Setter
@Entity
@Table(name = "competition_participants")
public class CompetitionParticipant {

    @EmbeddedId
    private CompetitionParticipantId id = new CompetitionParticipantId();

    /**
     * Owning competition (back-reference). Ignored in JSON to prevent recursion:
     * Competition -> participants -> CompetitionParticipant -> competition -> ...
     */
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @MapsId("competitionId")
    @JoinColumn(name = "competition_id", nullable = false)
    private Competition competition;

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
    private User user;

    @Column(nullable = false)
    private int points = 0;

    public CompetitionParticipant() {}

    public CompetitionParticipant(Competition competition, User user) {
        this.competition = competition;
        this.user = user;
        this.id = new CompetitionParticipantId(
            competition != null ? competition.getId() : null,
            user != null ? user.getId() : null
        );
    }
}
