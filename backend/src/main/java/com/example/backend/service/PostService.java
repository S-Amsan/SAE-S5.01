package com.example.backend.service;

import com.example.backend.model.Post;
import com.example.backend.model.User;
import com.example.backend.model.http.req.PostPublishRequest;
import com.example.backend.repository.PostRepository;
import java.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class PostService {

    @Autowired
    private ImageUploadService imageUploadService;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private ActionService actionService;

    public Post publish(PostPublishRequest request, User user)
        throws IOException {
        var response = imageUploadService.upload(request.getImage());

        if (response.getError() != null) {
            throw new RuntimeException(
                "Error uploading post image: " + response.getError()
            );
        }

        Post post = new Post();

        post.setUser(user);
        post.setName(request.getName());
        post.setDescription(request.getDescription());
        post.setImageUrl(
            ImageUploadService.endpoint.toString() +
                '/' +
                response.getFilename()
        );

        return postRepository.save(post);
    }

    private void incrementVotesIfNeededAndUpdateAction(Post post, User user) {
        if (
            !post.getLikes().contains(user) &&
            !post.getDislikes().contains(user)
        ) {
            user.setVotes(user.getVotes() + 1);

            actionService.onPostLike(user);
        }
    }

    public ResponseEntity<Void> like(Long postId, User user) {
        var maybePost = postRepository.findById(postId);

        if (maybePost.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        var post = maybePost.get();
        incrementVotesIfNeededAndUpdateAction(post, user);
        post.like(user);

        postRepository.save(post);

        return ResponseEntity.ok().build();
    }

    public ResponseEntity<Void> dislike(Long postId, User user) {
        var maybePost = postRepository.findById(postId);

        if (maybePost.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        var post = maybePost.get();
        incrementVotesIfNeededAndUpdateAction(post, user);
        post.dislike(user);

        postRepository.save(post);

        return ResponseEntity.ok().build();
    }
}
