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
    List<Competition> findAllByParticipants(User user);
}
