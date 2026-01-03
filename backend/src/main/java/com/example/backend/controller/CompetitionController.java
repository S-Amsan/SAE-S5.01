package com.example.backend.controller;

import com.example.backend.model.Competition;
import com.example.backend.model.Success;
import com.example.backend.model.security.MyUserDetails;
import com.example.backend.repository.CompetitionParticipantRepository;
import com.example.backend.repository.CompetitionRepository;
import com.example.backend.repository.SuccessRepository;
import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/competition")
public class CompetitionController {

    @Autowired
    private CompetitionRepository competitionRepository;

    @Autowired
    private CompetitionParticipantRepository competitionParticipantRepository;

    @Autowired
    private SuccessRepository successRepository;

    @GetMapping("/all")
    public List<Competition> getAllCompetitions() {
        return competitionRepository.findAll();
    }

    @GetMapping("/following")
    public List<Competition> getMyCompetitions(
        @AuthenticationPrincipal MyUserDetails userDetails
    ) {
        return competitionRepository.findAllByParticipantsUser(
            userDetails.getUser()
        );
    }

    @GetMapping("/latest")
    public Competition getLatestCompetition() {
        return competitionRepository.findFirstByDeadlineAfterOrderByCreationDate(
            new Date()
        );
    }

    @GetMapping("/success")
    public List<Success> getAllSuccess() {
        return successRepository.findAll();
    }

    @GetMapping("/{competitionId}/participantsCount")
    public ResponseEntity<Integer> getParticipantsCount(
        @PathVariable Long competitionId
    ) {
        var maybeCompetition = competitionRepository.findById(competitionId);
        if (maybeCompetition.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        var competition = maybeCompetition.get();
        return ResponseEntity.ok(competition.getParticipants().size());
    }

    @GetMapping("/{competitionId}/qualifiedParticipantsCount")
    public ResponseEntity<Integer> getQualifiedParticipantsCount(
        @PathVariable Long competitionId
    ) {
        var maybeCompetition = competitionRepository.findById(competitionId);
        if (maybeCompetition.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        var competition = maybeCompetition.get();
        return ResponseEntity.ok(
            competitionParticipantRepository
                .findAllByCompetitionAndPointsGreaterThanEqual(
                    competition,
                    competition.getGoalPoints()
                )
                .size()
        );
    }
}
