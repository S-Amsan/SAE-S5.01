package com.example.backend.controller;

import com.example.backend.model.*;
import com.example.backend.model.document.*;
import com.example.backend.model.http.req.CardPublishRequest;
import com.example.backend.model.security.MyUserDetails;
import com.example.backend.service.AdminService;
import jakarta.validation.Valid;
import java.util.function.Supplier;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    private <T> ResponseEntity<T> createResponse(Supplier<T> f, User user) {
        if (user.isAdmin()) {
            return ResponseEntity.ok(f.get());
        } else {
            return ResponseEntity.status(403).body(null);
        }
    }

    @PostMapping("/check_report/{reportId}")
    public ResponseEntity<Report> checkReport(
        @PathVariable Long reportId,
        @AuthenticationPrincipal MyUserDetails userDetails
    ) {
        return createResponse(
            () -> adminService.checkReport(reportId),
            userDetails.getUser()
        );
    }

    @PostMapping("/invalidate_post/{postId}")
    public ResponseEntity<Post> invalidatePost(
        @PathVariable Long postId,
        @AuthenticationPrincipal MyUserDetails userDetails
    ) {
        return createResponse(
            () -> adminService.invalidatePost(postId),
            userDetails.getUser()
        );
    }

    @PostMapping("/ban/{userId}")
    public ResponseEntity<User> banUser(
        @PathVariable Long userId,
        @AuthenticationPrincipal MyUserDetails userDetails
    ) {
        return createResponse(
            () -> adminService.banUser(userId),
            userDetails.getUser()
        );
    }

    @PostMapping("/unban/{userId}")
    public ResponseEntity<User> unbanUser(
        @PathVariable Long userId,
        @AuthenticationPrincipal MyUserDetails userDetails
    ) {
        return createResponse(
            () -> adminService.unbanUser(userId),
            userDetails.getUser()
        );
    }

    @PostMapping("/document/{documentId}/validate")
    public ResponseEntity<Document> validateDocument(
        @PathVariable Long documentId,
        @AuthenticationPrincipal MyUserDetails userDetails
    ) {
        return createResponse(
            () -> adminService.validateDocument(documentId),
            userDetails.getUser()
        );
    }

    @PostMapping("/document/{documentId}/invalidate")
    public ResponseEntity<Document> invalidateDocument(
        @PathVariable Long documentId,
        @AuthenticationPrincipal MyUserDetails userDetails
    ) {
        return createResponse(
            () -> adminService.invalidateDocument(documentId),
            userDetails.getUser()
        );
    }

    @PostMapping("/card/publish")
    public ResponseEntity<Card> publishCard(
        @Valid CardPublishRequest request,
        @AuthenticationPrincipal MyUserDetails userDetails
    ) {
        return createResponse(
            () -> adminService.publishCard(request),
            userDetails.getUser()
        );
    }

    @DeleteMapping("/card/{cardId}")
    public ResponseEntity<Card> deleteCard(
        @PathVariable Long cardId,
        @AuthenticationPrincipal MyUserDetails userDetails
    ) {
        return createResponse(
            () -> adminService.deleteCard(cardId),
            userDetails.getUser()
        );
    }
}
