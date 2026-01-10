package com.example.backend.model.partner;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "partners")
public class Partner {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private PartnerType type;

    @Column(nullable = false)
    private String imageUrl;

    public Partner() {}
}
