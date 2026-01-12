package com.example.backend.model.donation;

import com.example.backend.model.partner.Partner;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "donations")
public class Donation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String slug;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String fullTitle;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private String fullDescription;

    @Column(nullable = false)
    private Integer points;

    @Column(nullable = false)
    private String imageUrl;

    @Column(nullable = false)
    private String cardImageUrl;

    @Column(nullable = false)
    private String bannerImageUrl;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DonationType type;

    @ManyToOne(optional = false)
    @JoinColumn(name = "partner_id", nullable = false)
    private Partner partner;

    public Donation() {}
}
