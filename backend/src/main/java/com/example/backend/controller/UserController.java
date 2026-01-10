package com.example.backend.controller;

import com.example.backend.model.*;
import com.example.backend.model.action.Action;
import com.example.backend.model.http.req.AccountUpdateRequest;
import com.example.backend.model.http.res.UserStatsResponse;
import com.example.backend.model.security.MyUserDetails;
import com.example.backend.service.ActionService;
import com.example.backend.service.CompetitionService;
import com.example.backend.service.EventService;
import com.example.backend.service.UserService;
import com.example.backend.service.notification.NotificationService;
import com.example.backend.service.stats.UserStatsService;
import jakarta.validation.Valid;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserStatsService userStatsService;

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private ActionService actionService;

    @Autowired
    private CompetitionService competitionService;

    @Autowired
    private EventService eventService;

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

    @GetMapping("/stats/my")
    public ResponseEntity<UserStatsResponse> getMyStats(
        @AuthenticationPrincipal MyUserDetails userDetails
    ) {
        var maybeResponse = userStatsService.getUserStats(
            userDetails.getUser().getId()
        );

        if (maybeResponse.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(maybeResponse.get());
    }

    @GetMapping("/stats/{userId}")
    public ResponseEntity<UserStatsResponse> getStats(
        @PathVariable Long userId
    ) {
        var maybeResponse = userStatsService.getUserStats(userId);

        if (maybeResponse.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(maybeResponse.get());
    }

    @GetMapping("/notifications")
    public List<Notification> getMyNotifications(
        @AuthenticationPrincipal MyUserDetails userDetails
    ) {
        return
            notificationService.getNotificationsForUser(userDetails.getUser())
        ;
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
        var maybeTotal = competitionService.getTotalCompetitionPoints(
            userDetails.getUser(),
            competitionId
        );

        if (maybeTotal.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(maybeTotal.get());
    }

    @GetMapping("/points/event/{eventId}")
    public ResponseEntity<Integer> getTotalEventPoints(
        @AuthenticationPrincipal MyUserDetails userDetails,
        @PathVariable Long eventId
    ) {
        var maybeTotal = eventService.getTotalEventPoints(
            userDetails.getUser(),
            eventId
        );

        if (maybeTotal.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(maybeTotal.get());
    }

    @GetMapping("/actions")
    public List<Action> getUserActions(
        @AuthenticationPrincipal MyUserDetails userDetails
    ) {
        return actionService.getActionsForUser(userDetails.getUser());
    }
}
