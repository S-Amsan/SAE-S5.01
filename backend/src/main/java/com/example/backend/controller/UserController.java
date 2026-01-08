package com.example.backend.controller;

import com.example.backend.model.Notification;
import com.example.backend.model.User;
import com.example.backend.model.UserStats;
import com.example.backend.model.action.Action;
import com.example.backend.model.http.req.AccountUpdateRequest;
import com.example.backend.model.http.res.UserStatsResponse;
import com.example.backend.model.security.MyUserDetails;
import com.example.backend.repository.NotificationRepository;
import com.example.backend.repository.PostRepository;
import com.example.backend.repository.UserStatsRepository;
import com.example.backend.repository.action.ActionRepository;
import com.example.backend.repository.competition.CompetitionParticipantRepository;
import com.example.backend.repository.competition.CompetitionRepository;
import com.example.backend.repository.event.EventParticipantRepository;
import com.example.backend.repository.event.EventRepository;
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

    @Autowired
    private EventParticipantRepository eventParticipantRepository;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private ActionRepository actionRepository;

    @GetMapping("/all")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<User> getUserByEmail(@PathVariable String email) {
        Optional<User> maybeUser = userService.getUserByEmail(email);

        if (maybeUser.isPresent()) {
            return ResponseEntity.ok(maybeUser.get());
        }

        return ResponseEntity.notFound().build();
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<User> getUserByEmail(@PathVariable Long id) {
        Optional<User> maybeUser = userService.getUserById(id);

        if (maybeUser.isPresent()) {
            return ResponseEntity.ok(maybeUser.get());
        }

        return ResponseEntity.notFound().build();
    }

    @GetMapping("/stats")
    public ResponseEntity<UserStatsResponse> getMyStats(
        @AuthenticationPrincipal MyUserDetails userDetails
    ) {
        User user = userDetails.getUser();
        Optional<UserStats> maybeStats = userStatsRepository.findByUserId(
            user.getId()
        );

        if (maybeStats.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        UserStats stats = maybeStats.get();

        UserStatsResponse response = UserStatsResponse.builder()
            .points(stats.getPoints())
            .trophies(stats.getTrophies())
            .flames(stats.getFlames())
            .ecoActions(postRepository.countByUserAndValidatedTrue(user))
            .recoveredObjects(
                postRepository.countByValidatedTrueAndObjectIsNotNull()
            )
            .build();

        return ResponseEntity.ok(response);
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

    @GetMapping("/points/competition/{competitionId}")
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

    @GetMapping("/points/event/{eventId}")
    public ResponseEntity<Integer> getTotalEventPoints(
        @AuthenticationPrincipal MyUserDetails userDetails,
        @PathVariable Long eventId
    ) {
        var maybeEvent = eventRepository.findById(eventId);

        if (maybeEvent.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        var event = maybeEvent.get();

        var participants = eventParticipantRepository.findAllByEventAndUser(
            event,
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

    @GetMapping("/actions")
    public List<Action> getUserActions(
        @AuthenticationPrincipal MyUserDetails userDetails
    ) {
        return actionRepository.findAllByUser(userDetails.getUser());
    }
}
