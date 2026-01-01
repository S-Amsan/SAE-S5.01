package com.example.backend.model;

import jakarta.persistence.*;
import java.util.Date;
import java.util.Set;

import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

@Data
@Entity
@Table(name = "competitions")
public class Competition {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToMany
    @JoinTable(name = "competition_participants",
            joinColumns = @JoinColumn(name = "competition_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id"))
    private Set<User> participants;

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
