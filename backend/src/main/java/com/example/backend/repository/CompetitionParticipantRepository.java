package com.example.backend.repository;

import com.example.backend.model.Competition;
import com.example.backend.model.CompetitionParticipant;
import com.example.backend.model.CompetitionParticipantId;
import com.example.backend.model.User;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompetitionParticipantRepository
    extends JpaRepository<CompetitionParticipant, CompetitionParticipantId> {

    List<CompetitionParticipant> findAllByCompetition(Competition competition);

    List<CompetitionParticipant> findAllByUser(User user);

    Optional<CompetitionParticipant> findByCompetitionAndUser(
        Competition competition,
        User user
    );

    boolean existsByCompetitionAndUser(Competition competition, User user);
}
