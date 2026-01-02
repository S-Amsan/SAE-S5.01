package com.example.backend.controller;

import com.example.backend.model.User;
import com.example.backend.model.http.req.AccountUpdateRequest;
import com.example.backend.model.security.MyUserDetails;
import com.example.backend.repository.CompetitionParticipantRepository;
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
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private CompetitionParticipantRepository competitionParticipantRepository;

    @GetMapping("/user/all")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/user/{email}")
    public ResponseEntity<User> getUserByEmail(@PathVariable String email) {
        Optional<User> maybeUser = userService.getUserByEmail(email);

        if (maybeUser.isPresent()) {
            return ResponseEntity.ok(maybeUser.get());
        }

        return ResponseEntity.notFound().build();
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

    @GetMapping("/user/points/total")
    public ResponseEntity<Integer> getTotalCompetitionPoints(
        @AuthenticationPrincipal MyUserDetails userDetails
    ) {
        var participants = competitionParticipantRepository.findAllByUser(
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
