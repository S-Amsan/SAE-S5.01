package com.example.backend.controller;

import com.example.backend.model.Competition;
import com.example.backend.model.security.MyUserDetails;
import com.example.backend.repository.CompetitionRepository;
import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/competition")
public class CompetitionController {

    @Autowired
    private CompetitionRepository competitionRepository;

    @GetMapping("/all")
    public List<Competition> getAllCompetitions() {
        return competitionRepository.findAll();
    }

    @GetMapping("/following")
    public List<Competition> getMyCompetitions(
        @AuthenticationPrincipal MyUserDetails userDetails
    ) {
        return competitionRepository.findAllByParticipants(
            userDetails.getUser()
        );
    }

    @GetMapping("/latest")
    public Competition getLatestCompetition() {
        return competitionRepository.findFirstByDeadlineAfterOrderByCreationDate(
            new Date()
        );
    }
}
