package com.example.backend.repository;

import com.example.backend.model.security.UserHashSalt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface HashSaltRepository extends JpaRepository<UserHashSalt, Long> {
    Optional<UserHashSalt> findByUserId(Long userId);
}
