package com.example.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.util.Date;
import java.util.Set;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;

@Data
@Entity
@Table(name = "competitions")
public class Competition {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Join-entity relationship to store per-user, per-competition data (e.g. points).
     * Backed by table: competition_participants
     *
     * Marked as @JsonIgnore to avoid serializing a potentially large graph and/or
     * triggering lazy-loading / recursive structures in API responses.
     */
    @JsonIgnore
    @OneToMany(
        mappedBy = "competition",
        cascade = CascadeType.ALL,
        orphanRemoval = true
    )
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Set<CompetitionParticipant> participants;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Date deadline;

    @Column(nullable = false)
    private int goalPoints;

    @Column(nullable = false)
    private int qualified;

    @Column(nullable = false)
    private int inscriptionCost;

    @CreationTimestamp
    @Column(nullable = false)
    private Date creationDate;

    public Competition() {}
}
