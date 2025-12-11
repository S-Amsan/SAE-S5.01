package com.example.backend.repository;

import com.example.backend.model.security.UserHashSalt;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HashSaltRepository extends JpaRepository<UserHashSalt, Long> {}
