package com.example.backend.controller;

import com.example.backend.model.Notification;
import com.example.backend.model.User;
import com.example.backend.model.UserStats;
import com.example.backend.model.http.req.AccountUpdateRequest;
import com.example.backend.model.http.res.UserStatsResponse;
import com.example.backend.model.security.MyUserDetails;
import com.example.backend.repository.NotificationRepository;
import com.example.backend.repository.UserStatsRepository;
import com.example.backend.repository.competition.CompetitionParticipantRepository;
import com.example.backend.repository.competition.CompetitionRepository;
import com.example.backend.service.UserService;
import jakarta.validation.Valid;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserStatsRepository userStatsRepository;

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private CompetitionParticipantRepository competitionParticipantRepository;

    @Autowired
    private CompetitionRepository competitionRepository;

    @GetMapping("/all")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{email}")
    public ResponseEntity<User> getUserByEmail(@PathVariable String email) {
        Optional<User> maybeUser = userService.getUserByEmail(email);

        if (maybeUser.isPresent()) {
            return ResponseEntity.ok(maybeUser.get());
        }

        return ResponseEntity.notFound().build();
    }

    @GetMapping("/stats")
    public ResponseEntity<UserStatsResponse> getMyStats(
        @AuthenticationPrincipal MyUserDetails userDetails
    ) {
        Long userId = userDetails.getUser().getId();
        Optional<UserStats> maybeStats = userStatsRepository.findByUserId(
            userId
        );

        return ResponseEntity.ok(
            new UserStatsResponse(maybeStats.orElse(null))
        );
    }

    @GetMapping("/notifications")
    public ResponseEntity<List<Notification>> getMyNotifications(
        @AuthenticationPrincipal MyUserDetails userDetails
    ) {
        Long userId = userDetails.getUser().getId();
        return ResponseEntity.ok(
            notificationRepository.findByUserIdOrderByReceivedAtDesc(userId)
        );
    }

    @PostMapping("/update")
    public ResponseEntity<String> updateAccountInfo(
        @Valid AccountUpdateRequest request,
        @AuthenticationPrincipal MyUserDetails userDetails
    ) throws IOException {
        if (userService.updateAccount(userDetails.getUser(), request)) {
            return ResponseEntity.ok("Account updated successfully");
        }

        return ResponseEntity.ok("Account didn't need to be updated");
    }

    @GetMapping("/points/{competitionId}")
    public ResponseEntity<Integer> getTotalCompetitionPoints(
        @AuthenticationPrincipal MyUserDetails userDetails,
        @PathVariable Long competitionId
    ) {
        var maybeCompetition = competitionRepository.findById(competitionId);

        if (maybeCompetition.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        var competition = maybeCompetition.get();

        var participants =
            competitionParticipantRepository.findAllByCompetitionAndUser(
                competition,
                userDetails.getUser()
            );

        if (participants.isEmpty()) {
            return ResponseEntity.ok(null);
        }

        int total = participants
            .stream()
            .mapToInt(p -> p.getPoints())
            .sum();

        return ResponseEntity.ok(total);
    }
}
