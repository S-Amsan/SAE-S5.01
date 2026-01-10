package com.example.backend.model.document;

import com.example.backend.model.Card;
import com.example.backend.model.User;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

@Data
@Entity
@Table(name = "documents")
public class Document {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "card_id", nullable = false)
    private Card card;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String fileUrl;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DocumentState state = DocumentState.WAITING;

    @CreationTimestamp
    @Column(nullable = false)
    private LocalDateTime date;

    public Document() {}
}
