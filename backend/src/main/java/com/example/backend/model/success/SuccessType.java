package com.example.backend.model.success;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "success_types")
public class SuccessType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private String imageUrl;

    public SuccessType() {}
}
