package com.example.backend.repository;

import com.example.backend.model.Competition;
import com.example.backend.model.User;
import java.util.Date;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompetitionRepository
    extends JpaRepository<Competition, Long> {
    Competition findFirstByDeadlineAfterOrderByCreationDate(Date deadlineAfter);

    /**
     * With the join-entity mapping (Competition.participants is a Set<CompetitionParticipant>),
     * the derived query must traverse the association: participants.user
     */
    List<Competition> findAllByParticipantsUser(User user);
}
