package com.example.backend.model;

import com.example.backend.model.partner.Partner;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "cards")
public class Card {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private String photoUrl;

    @Column(nullable = false)
    private Integer points;

    @ManyToOne(optional = true)
    @JoinColumn(name = "partner_id", nullable = true)
    private Partner partner = null;

    public Card() {}
}
