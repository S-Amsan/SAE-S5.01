package com.example.backend.controller;

import com.example.backend.model.Success;
import com.example.backend.model.competition.Competition;
import com.example.backend.model.security.MyUserDetails;
import com.example.backend.repository.SuccessRepository;
import com.example.backend.repository.competition.CompetitionParticipantRepository;
import com.example.backend.repository.competition.CompetitionRepository;
import com.example.backend.service.CompetitionService;
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
    private CompetitionService competitionService;

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
        return competitionService.getLatestCompetition();
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
