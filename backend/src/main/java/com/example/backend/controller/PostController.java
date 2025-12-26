package com.example.backend.controller;

import com.example.backend.model.Post;
import com.example.backend.model.http.req.PostPublishRequest;
import com.example.backend.model.security.MyUserDetails;
import com.example.backend.service.PostService;
import jakarta.validation.Valid;
import java.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController("/post")
public class PostController {

    @Autowired
    private PostService postService;

    @PostMapping
    public ResponseEntity<Post> publishPost(
        @Valid PostPublishRequest request,
        @AuthenticationPrincipal MyUserDetails user
    ) throws IOException {
        return ResponseEntity.ok().body(
            postService.publish(request, user.getUser())
        );
    }
}
