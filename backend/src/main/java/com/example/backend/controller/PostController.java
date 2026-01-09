package com.example.backend.controller;

import com.example.backend.model.Post;
import com.example.backend.model.Report;
import com.example.backend.model.http.req.PostPublishRequest;
import com.example.backend.model.http.req.PostReportRequest;
import com.example.backend.model.security.MyUserDetails;
import com.example.backend.repository.PostRepository;
import com.example.backend.service.PostService;
import jakarta.validation.Valid;
import java.io.IOException;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PostController {

    @Autowired
    private PostService postService;

    @Autowired
    private PostRepository postRepository;

    @GetMapping("/posts")
    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    @PostMapping("/post")
    public ResponseEntity<Post> publishPost(
        @Valid PostPublishRequest request,
        @AuthenticationPrincipal MyUserDetails user
    ) throws IOException {
        Post post = postService.publish(request, user.getUser());

        return ResponseEntity.ok(post);
    }

    @PostMapping("/post/{postId}/report")
    public ResponseEntity<Report> reportPost(
        @PathVariable Long postId,
        @Valid PostReportRequest request,
        @AuthenticationPrincipal MyUserDetails user
    ) {
        return postService.report(postId, request, user.getUser());
    }

    @PostMapping("/post/{postId}/like")
    public ResponseEntity<Void> likePost(
        @PathVariable Long postId,
        @AuthenticationPrincipal MyUserDetails user
    ) {
        return postService.like(postId, user.getUser());
    }

    @GetMapping("/post/{postId}/liked")
    public ResponseEntity<Boolean> isPostLiked(
        @PathVariable Long postId,
        @AuthenticationPrincipal MyUserDetails user
    ) {
        return postService.isLikedBy(postId, user.getUser());
    }

    @PostMapping("/post/{postId}/dislike")
    public ResponseEntity<Void> dislikePost(
        @PathVariable Long postId,
        @AuthenticationPrincipal MyUserDetails user
    ) {
        return postService.dislike(postId, user.getUser());
    }

    @GetMapping("/post/{postId}/disliked")
    public ResponseEntity<Boolean> isPostDisliked(
        @PathVariable Long postId,
        @AuthenticationPrincipal MyUserDetails user
    ) {
        return postService.isDislikedBy(postId, user.getUser());
    }
}
