package com.example.backend.service;

import com.example.backend.model.User;
import com.example.backend.model.competition.Competition;
import com.example.backend.model.competition.CompetitionParticipant;
import com.example.backend.repository.competition.CompetitionParticipantRepository;
import com.example.backend.repository.competition.CompetitionRepository;
import java.util.Date;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CompetitionService {

    @Autowired
    private CompetitionRepository competitionRepository;

    @Autowired
    private CompetitionParticipantRepository competitionParticipantRepository;

    public Competition getLatestCompetition() {
        return competitionRepository.findFirstByDeadlineAfterOrderByCreationDate(
            new Date()
        );
    }

    public void updateCurrentCompetitionStats(User user, int diff) {
        Competition currentCompetition = getLatestCompetition();

        if (currentCompetition == null) {
            return;
        }

        var maybeParticipantData =
            competitionParticipantRepository.findByCompetitionAndUser(
                currentCompetition,
                user
            );

        if (maybeParticipantData.isEmpty()) {
            return;
        }

        CompetitionParticipant participantData = maybeParticipantData.get();

        participantData.setPoints(participantData.getPoints() + diff);
        competitionParticipantRepository.save(participantData);
    }
}
