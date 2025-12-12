package com.example.backend.repository;

import com.example.backend.model.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);
    Optional<User> findByPseudo(String pseudo);
    Optional<User> findByPhone(String phone);

    boolean existsByEmail(String email);
    boolean existsByPseudo(String pseudo);
    boolean existsByPhone(String phone);
}
