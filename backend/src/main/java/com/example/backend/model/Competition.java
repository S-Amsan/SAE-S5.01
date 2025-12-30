package com.example.backend.model;

import jakarta.persistence.*;
import java.util.Date;
import lombok.Data;

@Data
@Entity
@Table(name = "competitions")
public class Competition {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Date deadline;

    @Column(nullable = false)
    private int goalPoints;

    @Column(nullable = false)
    private int participants;

    @Column(nullable = false)
    private int qualified;

    @Column(nullable = false)
    private int inscriptionCost;

    public Competition() {}
}
