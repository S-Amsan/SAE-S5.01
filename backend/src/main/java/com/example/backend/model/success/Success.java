package com.example.backend.model.success;

import com.example.backend.model.User;
import jakarta.persistence.*;
import java.time.LocalDate;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Data
@Entity
@Table(name = "success")
public class Success {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "success_type_id", nullable = false)
    private SuccessType type;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;

    @CreationTimestamp
    @Column(nullable = false)
    private LocalDate acquiredAt;

    public Success() {}
}
