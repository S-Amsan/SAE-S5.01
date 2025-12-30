package com.example.backend.repository;

import com.example.backend.model.Competition;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompetitionRepository
    extends JpaRepository<Competition, Long> {}
