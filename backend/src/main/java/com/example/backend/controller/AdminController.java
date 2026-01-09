package com.example.backend.controller;

import com.example.backend.model.Report;
import com.example.backend.model.User;
import com.example.backend.model.security.MyUserDetails;
import com.example.backend.service.AdminService;
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
}
